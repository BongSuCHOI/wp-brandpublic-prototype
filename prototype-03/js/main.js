/* =============================================
   Brand Public Prototype 03 — Main JS
   GSAP Animations + Navigation
   ============================================= */

(function () {
  'use strict';

  // ---- Reduced motion check FIRST ----
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    return;
  }

  // ---- GSAP load check ----
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  // ---- Register Plugin ----
  gsap.registerPlugin(ScrollTrigger);

  // =========================================
  // NAVIGATION — Scroll & Mobile
  // =========================================

  var nav = document.getElementById('nav');
  var hamburger = document.getElementById('navHamburger');
  var navMenu = document.getElementById('navMenu');

  // Scroll-based nav style
  function updateNav() {
    if (window.scrollY > 100) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Hamburger toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.contains('nav__hamburger--active');

      if (isOpen) {
        // Close menu
        gsap.to(navMenu, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: function () {
            navMenu.classList.remove('nav__menu--open');
            navMenu.style.opacity = '';
            navMenu.style.transform = '';
          }
        });
        hamburger.classList.remove('nav__hamburger--active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        // Open menu
        navMenu.classList.add('nav__menu--open');
        hamburger.classList.add('nav__hamburger--active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        gsap.fromTo(navMenu,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );

        gsap.fromTo('#navMenu .nav__link',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out', delay: 0.15 }
        );
      }
    });

    // Close mobile menu on link click
    var navLinks = navMenu.querySelectorAll('.nav__link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (hamburger.classList.contains('nav__hamburger--active')) {
          hamburger.click();
        }
      });
    });
  }

  // =========================================
  // PAGE LOAD SEQUENCE
  // =========================================

  var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Nav slide down
  heroTl.fromTo(nav,
    { y: -80 },
    { y: 0, duration: 0.4 }
  );

  // 2. Hero label
  heroTl.fromTo('.hero__label',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.4 },
    '-=0.1'
  );

  // 3. Hero title — split by chars
  var heroTitleEl = document.getElementById('heroTitle');
  if (heroTitleEl) {
    var titleText = heroTitleEl.innerHTML;
    var lines = heroTitleEl.innerHTML.split('<br>');
    var chars = [];

    heroTitleEl.innerHTML = lines.map(function (line) {
      var lineChars = line.trim().split('').map(function (char) {
        if (char === ' ') return '<span class="hero__char">&nbsp;</span>';
        return '<span class="hero__char">' + char + '</span>';
      }).join('');
      return lineChars;
    }).join('<br>');

    chars = heroTitleEl.querySelectorAll('.hero__char');

    heroTl.fromTo(chars,
      { opacity: 0, y: 40, rotateX: -40 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.4, stagger: 0.03 },
      '-=0.2'
    );
  }

  // 4. Subtitle
  heroTl.fromTo('.hero__subtitle',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.4 },
    '-=0.15'
  );

  // 5. CTA buttons
  heroTl.fromTo('.hero__cta',
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.7)' },
    '-=0.15'
  );

  heroTl.fromTo('.hero__cta-secondary',
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.7)' },
    '-=0.25'
  );

  // 6. Client logos stagger
  heroTl.fromTo('.hero__logo-placeholder',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 },
    '-=0.1'
  );

  // =========================================
  // SECTION 2: SOCIAL PROOF — Number Counting
  // =========================================

  var socialNumbers = document.querySelectorAll('.social-proof__number');
  socialNumbers.forEach(function (numEl) {
    var target = parseInt(numEl.getAttribute('data-target'), 10);
    var suffix = numEl.getAttribute('data-suffix') || '';

    ScrollTrigger.create({
      trigger: numEl,
      start: 'top 88%',
      once: true,
      onEnter: function () {
        gsap.fromTo(numEl,
          { textContent: 0 },
          {
            textContent: target,
            duration: 0.45,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function () {
              numEl.textContent = Math.round(parseFloat(numEl.textContent)) + suffix;
            }
          }
        );
      }
    });
  });

  // Social proof section fade in
  gsap.fromTo('.social-proof__label',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.social-proof', start: 'top 80%', once: true }
    }
  );

  gsap.fromTo('.social-proof__title',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.social-proof', start: 'top 80%', once: true }
    }
  );

  // =========================================
  // SECTION 3: PROBLEM — Line by line reveal
  // =========================================

  gsap.fromTo('.problem__label',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.problem', start: 'top 80%', once: true }
    }
  );

  gsap.fromTo('.problem__title',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.problem', start: 'top 80%', once: true }
    }
  );

  gsap.fromTo('.problem__line',
    { opacity: 0, x: -30 },
    {
      opacity: 1, x: 0, duration: 0.4, stagger: 0.12,
      scrollTrigger: { trigger: '.problem__lines', start: 'top 85%', once: true }
    }
  );

  gsap.fromTo('.problem__empathy',
    { opacity: 0, y: 15 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.problem__empathy', start: 'top 90%', once: true }
    }
  );

  // =========================================
  // SECTION 4: SERVICES — Card stagger
  // =========================================

  gsap.fromTo('.services__label',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.services', start: 'top 80%', once: true }
    }
  );

  gsap.fromTo('.services__title',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.services', start: 'top 80%', once: true }
    }
  );

  gsap.fromTo('.services__card',
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.08,
      scrollTrigger: { trigger: '.services__grid', start: 'top 85%', once: true }
    }
  );

  // =========================================
  // SECTION 5: HOW IT WORKS — Steps sequential
  // =========================================

  gsap.fromTo('.how-it-works__label',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.how-it-works', start: 'top 80%', once: true }
    }
  );

  gsap.fromTo('.how-it-works__title',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.how-it-works', start: 'top 80%', once: true }
    }
  );

  gsap.fromTo('.how-it-works__step',
    { opacity: 0, y: 25 },
    {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.15,
      scrollTrigger: { trigger: '.how-it-works__steps', start: 'top 85%', once: true }
    }
  );

  // Connector line grow
  gsap.fromTo('.how-it-works__connector',
    { scaleX: 0 },
    {
      scaleX: 1, duration: 0.3, stagger: 0.15,
      scrollTrigger: { trigger: '.how-it-works__steps', start: 'top 85%', once: true }
    }
  );

  // =========================================
  // SECTION 6: PORTFOLIO — Parallax cards
  // =========================================

  gsap.fromTo('.portfolio__label',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.portfolio', start: 'top 80%', once: true }
    }
  );

  gsap.fromTo('.portfolio__title',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.portfolio', start: 'top 80%', once: true }
    }
  );

  // Portfolio cards with parallax speed difference
  var portfolioCards = document.querySelectorAll('.portfolio__card');
  portfolioCards.forEach(function (card, i) {
    var speedOffset = (i % 3) * 15;

    gsap.fromTo(card,
      { opacity: 0, y: 40 + speedOffset },
      {
        opacity: 1, y: 0, duration: 0.45,
        scrollTrigger: { trigger: card, start: 'top 88%', once: true }
      }
    );
  });

  // =========================================
  // SECTION 7: TESTIMONIALS — Fade + slide up
  // =========================================

  gsap.fromTo('.testimonials__label',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.testimonials', start: 'top 80%', once: true }
    }
  );

  gsap.fromTo('.testimonials__title',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.testimonials', start: 'top 80%', once: true }
    }
  );

  gsap.fromTo('.testimonials__card',
    { opacity: 0, y: 25 },
    {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.1,
      scrollTrigger: { trigger: '.testimonials__grid', start: 'top 85%', once: true }
    }
  );

  // =========================================
  // SECTION 8: FINAL CTA
  // =========================================

  gsap.fromTo('.final-cta__label',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.final-cta', start: 'top 80%', once: true }
    }
  );

  gsap.fromTo('.final-cta__title',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.final-cta', start: 'top 80%', once: true }
    }
  );

  gsap.fromTo('.final-cta__desc',
    { opacity: 0, y: 15 },
    {
      opacity: 1, y: 0, duration: 0.4,
      scrollTrigger: { trigger: '.final-cta', start: 'top 80%', once: true }
    }
  );

  gsap.fromTo('.final-cta__button',
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '.final-cta__button', start: 'top 90%', once: true }
    }
  );

  // CTA button pulse glow
  var finalBtn = document.querySelector('.final-cta__button');
  if (finalBtn) {
    gsap.to(finalBtn, {
      boxShadow: '0 4px 24px rgba(255,107,53,0.5)',
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      scrollTrigger: {
        trigger: '.final-cta',
        start: 'top 80%',
        toggleActions: 'play pause play pause'
      }
    });
  }

  // =========================================
  // SMOOTH SCROLL for anchor links
  // =========================================

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navHeight = document.querySelector('.nav').offsetHeight;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }
    });
  });

})();
