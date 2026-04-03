     1|/* ========================================
     2|   Brand Public — Warm Professional
     3|   GSAP Animations & Interactivity
     4|   ======================================== */
     5|
     6|(function () {
     7|  'use strict';
     8|
     9|  /* ---------- Reduced Motion Check ---------- */
    10|  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    11|
    12|  if (prefersReducedMotion) {
    13|    document.querySelectorAll('.fade-up').forEach(function (el) {
    14|      el.style.opacity = '1';
    15|      el.style.transform = 'none';
    16|    });
    17|    return;
    18|  }
    19|
    20|  /* ---------- Register GSAP Plugin ---------- */
    21|  gsap.registerPlugin(ScrollTrigger);
    22|
    23|  /* ---------- Fade-Up Animations ---------- */
    24|  const fadeUpElements = document.querySelectorAll('.fade-up');
    25|
    26|  fadeUpElements.forEach(function (el) {
    27|    gsap.set(el, { opacity: 0, y: 30 });
    28|  });
    29|
    30|  /* Hero elements - staggered reveal */
    31|  const heroFadeUps = document.querySelectorAll('.hero .fade-up');
    32|  if (heroFadeUps.length) {
    33|    gsap.to(heroFadeUps, {
    34|      opacity: 1,
    35|      y: 0,
    36|      duration: 0.8,
    37|      stagger: 0.12,
    38|      ease: 'power3.out',
    39|      delay: 0.3
    40|    });
    41|  }
    42|
    43|  /* Scroll-triggered fade-ups with stagger per section */
    44|  const sections = [
    45|    '.stats .fade-up',
    46|    '.about .fade-up',
    47|    '.services .fade-up',
    48|    '.diff .fade-up',
    49|    '.reviews .fade-up',
    50|    '.process .fade-up',
    51|    '.faq .fade-up',
    52|    '.cta .fade-up'
    53|  ];
    54|
    55|  sections.forEach(function (selector) {
    56|    const items = document.querySelectorAll(selector);
    57|    if (items.length === 0) return;
    58|
    59|    gsap.to(items, {
    60|      scrollTrigger: {
    61|        trigger: items[0].closest('section') || items[0],
    62|        start: 'top 85%',
    63|        once: true
    64|      },
    65|      opacity: 1,
    66|      y: 0,
    67|      duration: 0.7,
    68|      stagger: 0.08,
    69|      ease: 'power3.out'
    70|    });
    71|  });
    72|
    73|  /* ---------- CountUp Animation ---------- */
    74|  const statNumbers = document.querySelectorAll('.stat__number');
    75|
    76|  statNumbers.forEach(function (el) {
    77|    var target = parseInt(el.getAttribute('data-target'), 10);
    78|    if (isNaN(target)) return;
    79|
    80|    gsap.to(el, {
    81|      scrollTrigger: {
    82|        trigger: el,
    83|        start: 'top 85%',
    84|        once: true
    85|      },
    86|      innerText: target,
    87|      duration: 2,
    88|      ease: 'power2.out',
    89|      snap: { innerText: 1 },
    90|      onUpdate: function () {
    91|        el.textContent = Math.round(parseFloat(el.textContent));
    92|      }
    93|    });
    94|  });
    95|
    96|  /* ---------- Process Timeline Animation ---------- */
    97|  var processLine = document.querySelector('.process__line');
    98|  var processCircles = document.querySelectorAll('.process-step__circle');
    99|
   100|  if (processLine && processCircles.length) {
   101|    ScrollTrigger.create({
   102|      trigger: '.process__timeline',
   103|      start: 'top 75%',
   104|      once: true,
   105|      onEnter: function () {
   106|        processLine.classList.add('is-filled');
   107|
   108|        processCircles.forEach(function (circle, i) {
   109|          setTimeout(function () {
   110|            circle.classList.add('is-active');
   111|          }, i * 300);
   112|        });
   113|      }
   114|    });
   115|  }
   116|
   117|  /* ---------- FAQ Accordion ---------- */
   118|  var faqTriggers = document.querySelectorAll('.faq-item__trigger');
   119|
   120|  faqTriggers.forEach(function (trigger) {
   121|    trigger.addEventListener('click', function () {
   122|      var expanded = trigger.getAttribute('aria-expanded') === 'true';
   123|      var panel = document.getElementById(trigger.getAttribute('aria-controls'));
   124|
   125|      if (!panel) return;
   126|
   127|      if (expanded) {
   128|        /* Close */
   129|        trigger.setAttribute('aria-expanded', 'false');
   130|        panel.classList.remove('is-open');
   131|        panel.setAttribute('hidden', '');
   132|      } else {
   133|        /* Close other open items */
   134|        faqTriggers.forEach(function (otherTrigger) {
   135|          if (otherTrigger !== trigger) {
   136|            otherTrigger.setAttribute('aria-expanded', 'false');
   137|            var otherPanel = document.getElementById(otherTrigger.getAttribute('aria-controls'));
   138|            if (otherPanel) {
   139|              otherPanel.classList.remove('is-open');
   140|              otherPanel.setAttribute('hidden', '');
   141|            }
   142|          }
   143|        });
   144|
   145|        /* Open this item */
   146|        trigger.setAttribute('aria-expanded', 'true');
   147|        panel.removeAttribute('hidden');
   148|
   149|        /* Force reflow for transition */
   150|        void panel.offsetHeight;
   151|
   152|        panel.classList.add('is-open');
   153|      }
   154|    });
   155|  });
   156|
   157|  /* ---------- Mobile Navigation ---------- */
   158|  var hamburger = document.getElementById('navHamburger');
   159|  var navLinks = document.getElementById('navLinks');
   160|
   161|  if (hamburger && navLinks) {
   162|    hamburger.addEventListener('click', function () {
   163|      var isOpen = navLinks.classList.contains('is-open');
   164|
   165|      if (isOpen) {
   166|        navLinks.classList.remove('is-open');
   167|        hamburger.classList.remove('is-active');
   168|        hamburger.setAttribute('aria-expanded', 'false');
   169|      } else {
   170|        navLinks.classList.add('is-open');
   171|        hamburger.classList.add('is-active');
   172|        hamburger.setAttribute('aria-expanded', 'true');
   173|      }
   174|    });
   175|
   176|    /* Close nav on link click */
   177|    navLinks.querySelectorAll('.nav__link').forEach(function (link) {
   178|      link.addEventListener('click', function () {
   179|        navLinks.classList.remove('is-open');
   180|        hamburger.classList.remove('is-active');
   181|        hamburger.setAttribute('aria-expanded', 'false');
   182|      });
   183|    });
   184|
   185|    /* Close nav on CTA click */
   186|    var navCta = document.querySelector('.nav__cta');
   187|    if (navCta) {
   188|      navCta.addEventListener('click', function () {
   189|        navLinks.classList.remove('is-open');
   190|        hamburger.classList.remove('is-active');
   191|        hamburger.setAttribute('aria-expanded', 'false');
   192|      });
   193|    }
   194|  }
   195|
   196|  /* ---------- Smooth Scroll for Anchor Links ---------- */
   197|  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
   198|    anchor.addEventListener('click', function (e) {
   199|      var targetId = this.getAttribute('href');
   200|      if (targetId === '#') return;
   201|
   202|      var targetEl = document.querySelector(targetId);
   203|      if (targetEl) {
   204|        e.preventDefault();
   205|        var navHeight = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 0;
   206|        var targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
   207|
   208|        window.scrollTo({
   209|          top: targetPosition,
   210|          behavior: 'smooth'
   211|        });
   212|      }
   213|    });
   214|  });
   215|
   216|  /* ---------- Nav background on scroll ---------- */
   217|  var nav = document.querySelector('.nav');
   218|  if (nav) {
   219|    ScrollTrigger.create({
   220|      start: 80,
   221|      onUpdate: function (self) {
   222|        if (self.direction === 1 && window.scrollY > 80) {
   223|          nav.style.backgroundColor = 'rgba(250, 249, 246, 0.95)';
   224|        } else if (window.scrollY <= 80) {
   225|          nav.style.backgroundColor = 'rgba(250, 249, 246, 0.85)';
   226|        }
   227|      }
   228|    });
   229|  }
   230|
   231|  /* ---------- Service card hover parallax subtle ---------- */
   232|  var serviceCards = document.querySelectorAll('.service-card, .about-card, .diff-card');
   233|  serviceCards.forEach(function (card) {
   234|    card.addEventListener('mouseenter', function () {
   235|      gsap.to(card, {
   236|        scale: 1.01,
   237|        duration: 0.25,
   238|        ease: 'power2.out'
   239|      });
   240|    });
   241|
   242|    card.addEventListener('mouseleave', function () {
   243|      gsap.to(card, {
   244|        scale: 1,
   245|        duration: 0.25,
   246|        ease: 'power2.out'
   247|      });
   248|    });
   249|  });
   250|
   251|})();
   252|