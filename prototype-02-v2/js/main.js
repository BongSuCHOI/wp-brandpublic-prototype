/* ========================================
   Brand Public — Warm Professional
   GSAP Animations & Interactivity
   ======================================== */

(function () {
  'use strict';

  /* ---------- Reduced Motion Check ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('.fade-up').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  /* ---------- Register GSAP Plugin ---------- */
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Fade-Up Animations ---------- */
  const fadeUpElements = document.querySelectorAll('.fade-up');

  fadeUpElements.forEach(function (el) {
    gsap.set(el, { opacity: 0, y: 30 });
  });

  /* Hero elements - staggered reveal */
  const heroFadeUps = document.querySelectorAll('.hero .fade-up');
  if (heroFadeUps.length) {
    gsap.to(heroFadeUps, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.3
    });
  }

  /* Scroll-triggered fade-ups with stagger per section */
  const sections = [
    '.stats .fade-up',
    '.about .fade-up',
    '.services .fade-up',
    '.diff .fade-up',
    '.reviews .fade-up',
    '.process .fade-up',
    '.faq .fade-up',
    '.cta .fade-up'
  ];

  sections.forEach(function (selector) {
    const items = document.querySelectorAll(selector);
    if (items.length === 0) return;

    gsap.to(items, {
      scrollTrigger: {
        trigger: items[0].closest('section') || items[0],
        start: 'top 85%',
        once: true
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out'
    });
  });

  /* ---------- CountUp Animation ---------- */
  const statNumbers = document.querySelectorAll('.stat__number');

  statNumbers.forEach(function (el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      },
      innerText: target,
      duration: 2,
      ease: 'power2.out',
      snap: { innerText: 1 },
      onUpdate: function () {
        el.textContent = Math.round(parseFloat(el.textContent));
      }
    });
  });

  /* ---------- Process Timeline Animation ---------- */
  var processLine = document.querySelector('.process__line');
  var processCircles = document.querySelectorAll('.process-step__circle');

  if (processLine && processCircles.length) {
    ScrollTrigger.create({
      trigger: '.process__timeline',
      start: 'top 75%',
      once: true,
      onEnter: function () {
        processLine.classList.add('is-filled');

        processCircles.forEach(function (circle, i) {
          setTimeout(function () {
            circle.classList.add('is-active');
          }, i * 300);
        });
      }
    });
  }

  /* ---------- FAQ Accordion ---------- */
  var faqTriggers = document.querySelectorAll('.faq-item__trigger');

  faqTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(trigger.getAttribute('aria-controls'));

      if (!panel) return;

      if (expanded) {
        /* Close */
        trigger.setAttribute('aria-expanded', 'false');
        panel.classList.remove('is-open');
        panel.setAttribute('hidden', '');
      } else {
        /* Close other open items */
        faqTriggers.forEach(function (otherTrigger) {
          if (otherTrigger !== trigger) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            var otherPanel = document.getElementById(otherTrigger.getAttribute('aria-controls'));
            if (otherPanel) {
              otherPanel.classList.remove('is-open');
              otherPanel.setAttribute('hidden', '');
            }
          }
        });

        /* Open this item */
        trigger.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('hidden');

        /* Force reflow for transition */
        void panel.offsetHeight;

        panel.classList.add('is-open');
      }
    });
  });

  /* ---------- Mobile Navigation ---------- */
  var hamburger = document.getElementById('navHamburger');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.contains('is-open');

      if (isOpen) {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      } else {
        navLinks.classList.add('is-open');
        hamburger.classList.add('is-active');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    });

    /* Close nav on link click */
    navLinks.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    /* Close nav on CTA click */
    var navCta = document.querySelector('.nav__cta');
    if (navCta) {
      navCta.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    }
  }

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        var navHeight = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 0;
        var targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------- Nav background on scroll ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    ScrollTrigger.create({
      start: 80,
      onUpdate: function (self) {
        if (self.direction === 1 && window.scrollY > 80) {
          nav.style.backgroundColor = 'rgba(250, 249, 246, 0.95)';
        } else if (window.scrollY <= 80) {
          nav.style.backgroundColor = 'rgba(250, 249, 246, 0.85)';
        }
      }
    });
  }

  /* ---------- Service card hover parallax subtle ---------- */
  var serviceCards = document.querySelectorAll('.service-card, .about-card, .diff-card');
  serviceCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      gsap.to(card, {
        scale: 1.01,
        duration: 0.25,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', function () {
      gsap.to(card, {
        scale: 1,
        duration: 0.25,
        ease: 'power2.out'
      });
    });
  });

})();
