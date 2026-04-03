/* Brand Public 시안 02 - 메인 스크립트 */

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initScrollAnimations();
    initCountUp();
    initFAQ();
});

function initNav() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

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
    gsap.registerPlugin(ScrollTrigger);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach((el) => {
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

    const cardGroups = [
        { selector: '.pain-card', trigger: '.pain-grid' },
        { selector: '.stat-card', trigger: '.stats-grid' },
        { selector: '.service-card', trigger: '.services-grid' },
        { selector: '.diff-card', trigger: '.diff-grid' },
        { selector: '.review-card', trigger: '.reviews-grid' },
        { selector: '.process-step', trigger: '.process-grid' },
        { selector: '.faq-item', trigger: '.faq-list' },
        { selector: '.about-feature', trigger: '.about-features' }
    ];

    cardGroups.forEach(({ selector, trigger }) => {
        const cards = document.querySelectorAll(selector);
        if (cards.length) {
            gsap.to(cards, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
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
    counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target) {
    const duration = 2000;
    const start = performance.now();
    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
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
