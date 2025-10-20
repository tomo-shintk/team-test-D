document.addEventListener('DOMContentLoaded', ()=>{
  // simple tilt on mouse move
  const card = document.querySelector('.card');
  if(!card) return;
  card.addEventListener('mousemove', (e)=>{
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*8).toFixed(2)}deg)`;
  });
  card.addEventListener('mouseleave', ()=>{ card.style.transform = '' });

  // keyboard navigation: left/right to move between pages
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowRight'){
      const next = document.querySelector('.btn[href]');
      if(next) window.location = next.href;
    }
    if(e.key === 'ArrowLeft'){
      // try to find link to previous - crude: look for page1..page5
      const links = Array.from(document.querySelectorAll('a'));
      const prev = links.find(a=>/page\d+\/index\.html$/.test(a.getAttribute('href')) && a.textContent.includes('最初へ'));
      if(prev) window.location = prev.href;
    }
  });
});
