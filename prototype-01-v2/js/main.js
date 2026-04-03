/* ============================================
   BRAND PUBLIC — Prototype 01 v2 Sharp Editorial
   GSAP Animations & Interactions
   ============================================ */

(function () {
  'use strict';

  /* ---------- Reduced Motion Check ---------- */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile Navigation Toggle ---------- */
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileMenu.classList.add('open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        hamburgerBtn.classList.add('active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile menu on link click
    var mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- FAQ Accordion ---------- */
  var faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq__question');
    var answer = item.querySelector('.faq__answer');

    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove('active');
        var otherBtn = otherItem.querySelector('.faq__question');
        var otherAnswer = otherItem.querySelector('.faq__answer');
        if (otherBtn) {
          otherBtn.setAttribute('aria-expanded', 'false');
        }
        if (otherAnswer) {
          otherAnswer.hidden = true;
          if (!prefersReduced && typeof gsap !== 'undefined') {
            gsap.to(otherAnswer, { height: 0, duration: 0.25, ease: 'power2.out' });
          }
        }
      });

      // Open clicked (if it wasn't already open)
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;

        if (!prefersReduced && typeof gsap !== 'undefined') {
          gsap.fromTo(
            answer,
            { height: 0 },
            { height: 'auto', duration: 0.3, ease: 'power2.out' }
          );
        }
      }
    });
  });

  /* ---------- Exit if reduced motion or no GSAP ---------- */
  if (prefersReduced || typeof gsap === 'undefined') {
    // Make all fade-up elements visible immediately
    document.querySelectorAll('.fade-up').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  /* ---------- GSAP Plugin Registration ---------- */
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------- Fade-up Animations ---------- */
  var fadeElements = document.querySelectorAll('.fade-up');

  fadeElements.forEach(function (el) {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true
      }
    });
  });

  /* ---------- Staggered Card Reveals ---------- */
  var cardGroups = [
    '.about__cards .card',
    '.services__grid .card',
    '.diff__points .diff__point',
    '.reviews__grid .card',
    '.process__steps .process__step'
  ];

  cardGroups.forEach(function (selector) {
    var cards = document.querySelectorAll(selector);
    if (cards.length === 0) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cards[0].closest('section') || cards[0],
        start: 'top 80%',
        once: true
      }
    });
  });

  /* ---------- CountUp Animation for Stats ---------- */
  var statNumbers = document.querySelectorAll('.stats__number');

  statNumbers.forEach(function (numEl) {
    var target = parseInt(numEl.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    var counter = { val: 0 };

    gsap.to(counter, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: numEl,
        start: 'top 85%',
        once: true
      },
      onUpdate: function () {
        numEl.textContent = Math.round(counter.val);
      }
    });
  });

  /* ---------- Smooth Scroll for Nav Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navHeight = document.querySelector('.nav')
          ? document.querySelector('.nav').offsetHeight
          : 0;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: top,
          behavior: prefersReduced ? 'auto' : 'smooth'
        });
      }
    });
  });

  /* ---------- Nav Background on Scroll ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: function (self) {
        if (self.direction === 1 && self.scroll() > 80) {
          nav.style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)';
        } else if (self.scroll() <= 80) {
          nav.style.boxShadow = 'none';
        }
      }
    });
  }
})();
