// ========================================
// ほんわかスイーツガイド - インタラクティブ機能
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // スクロールアニメーション
  initScrollAnimation();
  
  // スムーススクロール
  initSmoothScroll();
  
  // カードホバーエフェクト
  initCardEffects();
  
  // ヘッダーのスクロール効果
  initHeaderEffect();
  
  // パララックス効果
  initParallax();
});

// ========================================
// スクロールアニメーション
// ========================================
function initScrollAnimation() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // 順番にアニメーションを適用
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // アニメーション対象要素を監視
  const animateElements = document.querySelectorAll('[data-animate]');
  animateElements.forEach((element) => {
    observer.observe(element);
  });
}

// ========================================
// スムーススクロール
// ========================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// カードエフェクト
// ========================================
function initCardEffects() {
  const cards = document.querySelectorAll('.shop-card');
  
  cards.forEach(card => {
    // マウスムーブで傾き効果
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
    
    // クリック時のリップルエフェクト
    card.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      card.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // リップルエフェクトのスタイルを追加
  const style = document.createElement('style');
  style.textContent = `
    .shop-card {
      position: relative;
      overflow: hidden;
    }
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(102, 187, 106, 0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }
    @keyframes ripple-animation {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// ========================================
// ヘッダースクロールエフェクト
// ========================================
function initHeaderEffect() {
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 16px rgba(102, 187, 106, 0.2)';
    } else {
      header.style.boxShadow = '0 2px 8px rgba(102, 187, 106, 0.1)';
    }
    
    lastScroll = currentScroll;
  });
}

// ========================================
// パララックス効果
// ========================================
function initParallax() {
  const hero = document.querySelector('.hero');
  
  if (!hero) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    hero.style.transform = `translateY(${rate}px)`;
  });
}

// ========================================
// ショップアイコンのアニメーション
// ========================================
function animateShopIcons() {
  const icons = document.querySelectorAll('.shop-icon');
  
  icons.forEach((icon, index) => {
    // ランダムな遅延でアニメーションを開始
    setTimeout(() => {
      icon.style.animation = 'float 3s ease-in-out infinite';
      icon.style.animationDelay = `${index * 0.2}s`;
    }, index * 100);
  });
}

// アイコンアニメーションを実行
setTimeout(animateShopIcons, 500);

// ========================================
// タグのインタラクティブ効果
// ========================================
const tags = document.querySelectorAll('.tag');

tags.forEach(tag => {
  tag.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // クリックしたタグを強調
    tag.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
      tag.style.transform = 'scale(1)';
    }, 200);
  });
});

// ========================================
// スクロールに応じた要素の表示
// ========================================
window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // ページ下部に近づいたらCTAをハイライト
  if (scrollPosition > documentHeight - 500) {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
      ctaButton.style.animation = 'pulse 1s ease-in-out infinite';
    }
  }
});

// パルスアニメーションを追加
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;
document.head.appendChild(pulseStyle);

// ========================================
// ローディングアニメーション
// ========================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ========================================
// コンソールメッセージ
// ========================================
console.log('%c🍰 ほんわかスイーツガイドへようこそ! 🍓', 'color: #66bb6a; font-size: 20px; font-weight: bold;');
console.log('%c美味しいスイーツを見つけてください♪', 'color: #ff6b9d; font-size: 14px;');
