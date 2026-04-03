document.addEventListener('DOMContentLoaded', () => {
    // GSAP가 로드될 때까지 대기
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        // GSAP 미로드 시: 모든 fade-up 요소를 바로 표시
        document.querySelectorAll('.fade-up').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        initNav();
        initCountUp();
        initFAQ();
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    initNav();
    initScrollAnimations();
    initCountUp();
    initFAQ();
});

function initNav() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (!nav || !toggle || !menu) return;
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}

function initScrollAnimations() {
    // 개별 fade-up 요소 (카드 그룹 제외)
    const exclude = '.service-card, .diff-card, .review-card, .process-step, .faq-item, .stat-card, .pain-card, .about-feature';
    document.querySelectorAll('.fade-up:not(' + exclude + ')').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
            }
        );
    });

    // 카드 그룹 stagger
    [
        { sel: '.pain-card', trig: '.pain-grid' },
        { sel: '.stat-card', trig: '.stats-grid' },
        { sel: '.service-card', trig: '.services-grid' },
        { sel: '.diff-card', trig: '.diff-grid' },
        { sel: '.review-card', trig: '.reviews-grid' },
        { sel: '.process-step', trig: '.process-grid' },
        { sel: '.faq-item', trig: '.faq-list' },
        { sel: '.about-feature', trig: '.about-features' }
    ].forEach(({ sel, trig }) => {
        const cards = document.querySelectorAll(sel);
        if (cards.length && document.querySelector(trig)) {
            cards.forEach(card => {
                gsap.fromTo(card,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
                    }
                );
            });
        }
    });
}

function initCountUp() {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(el, parseInt(el.dataset.target));
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(el);
    });
}

function animateCounter(el, target) {
    const duration = 2000, start = performance.now();
    (function update(now) {
        const p = Math.min((now - start) / duration, 1);
        const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = Math.floor(e * target).toLocaleString();
        if (p < 1) requestAnimationFrame(update);
    })(start);
}

function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.maxHeight = '0';
            });
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}
