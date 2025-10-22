document.addEventListener('DOMContentLoaded', () => {
    // スクロールアニメーション
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition - 100) {
                element.classList.add('aos-animate');
            }
        });
    };

    // スクロールイベントリスナーを追加
    window.addEventListener('scroll', animateOnScroll);
    
    // 初期表示時のアニメーション
    animateOnScroll();

    // コンタクトフォームの処理
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // ここでは簡単なアラートを表示します
            alert('メッセージを受け付けました！\n実際のフォーム送信機能は実装されていません。');
            
            // フォームをリセット
            contactForm.reset();
        });
    }

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ナビゲーションバーのスクロール制御
    let lastScroll = 0;
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.style.transform = 'translateY(0)';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 50) {
            // スクロールダウン時
            nav.style.transform = 'translateY(-100%)';
        } else {
            // スクロールアップ時
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // カードのホバーエフェクト
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.transform = `
                perspective(1000px)
                rotateX(${(y - rect.height / 2) / 20}deg)
                rotateY(${-(x - rect.width / 2) / 20}deg)
                translateZ(10px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateZ(0)';
        });
    });
});