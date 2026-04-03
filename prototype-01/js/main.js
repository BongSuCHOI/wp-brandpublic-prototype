/* ========================================
   Brand Public 시안 01 - 메인 스크립트
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initScrollAnimations();
    initCountUp();
    initFAQ();
});

/* --- 네비게이션 --- */
function initNav() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');

    // 스크롤 시 스타일 변경
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // 모바일 메뉴 토글
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // 메뉴 링크 클릭 시 닫기
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}

/* --- GSAP ScrollTrigger 애니메이션 --- */
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // 공통 fade-up 애니메이션
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach((el, i) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // 카드 stagger 애니메이션
    const cardGroups = [
        { selector: '.service-card', trigger: '.services-grid' },
        { selector: '.diff-card', trigger: '.diff-grid' },
        { selector: '.review-card', trigger: '.reviews-slider' },
        { selector: '.process-step', trigger: '.process-grid' },
        { selector: '.faq-item', trigger: '.faq-list' }
    ];

    cardGroups.forEach(({ selector, trigger }) => {
        const cards = document.querySelectorAll(selector);
        if (cards.length) {
            gsap.to(cards, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: trigger,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }
    });
}

/* --- 카운트업 애니메이션 --- */
function initCountUp() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, target) {
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

/* --- FAQ 아코디언 --- */
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // 모든 항목 닫기
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.maxHeight = '0';
            });

            // 클릭한 항목 토글
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}
