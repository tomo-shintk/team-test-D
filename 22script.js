// 22script.js - particles + simple predictions
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;
const particles = [];

function rand(min,max){return Math.random()*(max-min)+min}

class Particle{
  constructor(){
    this.x = rand(0,W);
    this.y = rand(0,H);
    this.r = rand(1,3.5);
    this.vx = rand(-0.4,0.4);
    this.vy = rand(-0.6,0.6);
    this.h = rand(300,350);
    this.alpha = rand(0.4,0.95);
  }
  update(){
    this.x += this.vx;
    this.y += this.vy;
    if(this.x< -10) this.x = W+10;
    if(this.x> W+10) this.x = -10;
    if(this.y< -10) this.y = H+10;
    if(this.y> H+10) this.y = -10;
  }
  draw(){
    ctx.beginPath();
    ctx.fillStyle = `hsla(${this.h},70%,75%,${this.alpha})`;
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fill();
  }
}

function initParticles(n=120){
  particles.length=0;
  for(let i=0;i<n;i++) particles.push(new Particle());
}

function resize(){
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
}

addEventListener('resize',()=>{resize();initParticles( Math.floor((W*H)/9000) );});

function loop(){
  ctx.clearRect(0,0,W,H);
  // soft background
  const g = ctx.createLinearGradient(0,0,W,H);
  g.addColorStop(0,'#FFF7FB');
  g.addColorStop(1,'#FFF0F5');
  ctx.fillStyle=g;
  ctx.fillRect(0,0,W,H);

  // particles
  particles.forEach(p=>{p.update();p.draw();});

  // connect
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a=particles[i], b=particles[j];
      const dx=a.x-b.x, dy=a.y-b.y; const d2 = dx*dx+dy*dy;
      if(d2<9000){
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,182,193,${0.35 - d2/20000})`;
        ctx.lineWidth=0.6;
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(loop);
}

initParticles(Math.floor((W*H)/9000));
loop();

// prediction logic
const lists = {
  future:["フルーツサンドの進化版（レイヤードスイーツ）","発酵スナック（発酵チップス）","植物性お団子（ヴィーガン和菓子）","和風クロワッサン（味噌キャラメル）","泡立て飲料（ミルクフォームティー系）"],
  japan:["寿司","ラーメン","カレーライス","たこ焼き","うどん"],
  miyazaki:["チキン南蛮","地鶏の炭火焼","冷や汁","マンゴースイーツ","肉巻きおにぎり"]
}

function pickRandom(arr){return arr[Math.floor(Math.random()*arr.length)];}

document.querySelectorAll('button.small').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const target = btn.dataset.target;
    const card = btn.closest('.card');
    const p = card.querySelector('.result');
    // cute reveal
    p.textContent = '考え中…';
    btn.disabled = true;
    setTimeout(()=>{
      const pick = pickRandom(lists[target]);
      p.textContent = pick;
      btn.disabled = false;
      // tiny sparkle effect
      sparkleAt(card);
    }, 900 + Math.random()*900);
  });
});

function sparkleAt(elem){
  const rect = elem.getBoundingClientRect();
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '💗';
  heart.style.left = (rect.left + rect.width*Math.random())+'px';
  heart.style.top = (rect.top + rect.height*Math.random())+'px';
  heart.style.position = 'fixed';
  heart.style.fontSize = `${12 + Math.random()*18}px`;
  heart.style.opacity = '0';
  document.body.appendChild(heart);
  // animate
  const dur = 900 + Math.random()*800;
  heart.animate([
    {transform:'translateY(0) scale(0.6)',opacity:0},
    {transform:'translateY(-30px) scale(1)',opacity:1},
    {transform:'translateY(-80px) scale(1.2)',opacity:0}
  ],{duration:dur,easing:'cubic-bezier(.2,.8,.2,1)'});
  setTimeout(()=>heart.remove(),dur+50);
}

// Fade-in cards on load
window.addEventListener('load',()=>{
  document.querySelectorAll('.card').forEach((c,i)=>{
    c.style.opacity=0;
    c.style.transform='translateY(10px)';
    setTimeout(()=>{ c.style.transition='all 520ms cubic-bezier(.22,.9,.3,1)'; c.style.opacity=1; c.style.transform='translateY(0)'; }, 240+ i*160);
  });
});
