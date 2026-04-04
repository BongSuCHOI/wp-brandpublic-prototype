# HTML Class Name Inventory — prototype-02-v2/index.html
## Complete reference for CSS rewrite

---

## MISMATCH SUMMARY (HTML vs CSS)

The HTML uses BEM with **section-scoped block names** (e.g., `about-card`, `service-card`, `review-card`, `diff-card`, `process-step`, `faq-item`), while the CSS uses **generic shared card classes** (e.g., `card--feature`, `card--service`, `card--review`) and **different inner/container names** (`__inner` vs `__container`).

---

## 1. NAVIGATION

### HTML Structure:
```
nav.nav
  div.nav__container
    a.nav__logo
      span.nav__logo-mark
    ul.nav__links#navLinks
      li > a.nav__link
    a.nav__cta
    button.nav__hamburger#navHamburger
      span.nav__hamburger-line  (x3)
```

### Classes Used:
| HTML Class | Element | CSS Equivalent | Mismatch? |
|---|---|---|---|
| `nav` | `<nav>` | `.nav` | NO |
| `nav__container` | `<div>` | `.nav__inner` | YES |
| `nav__logo` | `<a>` | `.nav__logo` | NO |
| `nav__logo-mark` | `<span>` | `.nav__logo span` | YES |
| `nav__links` | `<ul>` | `.nav__links` | NO |
| `nav__link` | `<a>` | `.nav__links li a` | YES |
| `nav__cta` | `<a>` | `.nav__cta` | NO |
| `nav__hamburger` | `<button>` | `.nav__hamburger` | NO |
| `nav__hamburger-line` | `<span>` (x3) | `.nav__hamburger span` | YES |

### CSS-only classes (NOT in HTML):
- `.nav__mobile` — no mobile menu in HTML
- `.nav__mobile-links` — no mobile menu in HTML
- `.nav.is-scrolled` — JS toggled
- `.nav__hamburger.is-active` — JS toggled

---

## 2. HERO

### HTML Structure:
```
section.hero#hero
  div.hero__mesh
  div.hero__container
    div.hero__content
      span.hero__badge.fade-up
      h1.hero__title.fade-up
      p.hero__subtitle.fade-up
      div.hero__ctas.fade-up
        a.btn.btn--primary
        a.btn.btn--outline
    div.hero__image-wrap.fade-up
      img.hero__image
```

### Classes Used:
| HTML Class | Element | CSS Equivalent | Mismatch? |
|---|---|---|---|
| `hero` | `<section>` | `.hero` | NO |
| `hero__mesh` | `<div>` | `.hero::before` / `.hero::after` | YES |
| `hero__container` | `<div>` | `.hero__inner` | YES |
| `hero__content` | `<div>` | `.hero__content` | NO |
| `hero__badge` | `<span>` | `.hero__label` | YES |
| `hero__title` | `<h1>` | `.hero__title` | NO |
| `hero__subtitle` | `<p>` | `.hero__subtitle` | NO |
| `hero__ctas` | `<div>` | `.hero__actions` | YES |
| `hero__image-wrap` | `<div>` | `.hero__visual` | YES |
| `hero__image` | `<img>` | `.hero__visual img` | YES |

### CSS-only classes (NOT in HTML):
- `.hero__label::before` — decorative element in CSS
- `.hero__title em` — no `<em>` in HTML
- `.hero__visual::before` — decorative pseudo-element

---

## 3. STATS

### HTML Structure:
```
section.stats#stats
  div.stats__container
    div.stats__grid
      div.stat.fade-up  (x3)
        span.stat__number[data-target]
        span.stat__suffix
        span.stat__label
        div.stat__underline
```

### Classes Used:
| HTML Class | Element | CSS Equivalent | Mismatch? |
|---|---|---|---|
| `stats` | `<section>` | `.stats` | NO |
| `stats__container` | `<div>` | `.stats__inner` | YES |
| `stats__grid` | `<div>` | *(not in CSS)* | YES |
| `stat` | `<div>` (x3) | `.stats__item` | YES |
| `stat__number` | `<span>` | `.stats__number` | YES |
| `stat__suffix` | `<span>` | `.stats__suffix` | YES |
| `stat__label` | `<span>` | `.stats__label` | YES |
| `stat__underline` | `<div>` | `.stats__divider` | YES |

---

## 4. ABOUT

### HTML Structure:
```
section.about#about
  div.about__container
    div.section-header.fade-up
      h2.section-title
      p.section-desc
    div.about__grid
      div.about-card.fade-up  (x3)
        div.about-card__icon > svg
        h3.about-card__title
        p.about-card__desc
```

### Classes Used:
| HTML Class | Element | CSS Equivalent | Mismatch? |
|---|---|---|---|
| `about` | `<section>` | `.about` | NO |
| `about__container` | `<div>` | `.about__inner` | YES |
| `section-header` | `<div>` | `.about__header` | YES |
| `section-title` | `<h2>` | `.section-title` | NO |
| `section-desc` | `<p>` | `.section-desc` | NO |
| `about__grid` | `<div>` | `.about__cards` | YES |
| `about-card` | `<div>` (x3) | `.card--feature` | YES |
| `about-card__icon` | `<div>` | `.card__icon` | YES |
| `about-card__title` | `<h3>` | `.card__title` | YES |
| `about-card__desc` | `<p>` | `.card__desc` | YES |

---

## 5. SERVICES

### HTML Structure:
```
section.services#services
  div.services__container
    div.section-header.fade-up
      h2.section-title
      p.section-desc
    div.services__grid
      div.service-card.fade-up  (x6)
        div.service-card__icon > svg
        h3.service-card__title
        p.service-card__desc
```

### Classes Used:
| HTML Class | Element | CSS Equivalent | Mismatch? |
|---|---|---|---|
| `services` | `<section>` | `.services` | NO |
| `services__container` | `<div>` | `.services__inner` | YES |
| `section-header` | `<div>` | `.services__header` | YES |
| `services__grid` | `<div>` | `.services__grid` | NO |
| `service-card` | `<div>` (x6) | `.card--service` | YES |
| `service-card__icon` | `<div>` | `.card__icon` | YES |
| `service-card__title` | `<h3>` | `.card__title` | YES |
| `service-card__desc` | `<p>` | `.card__desc` | YES |

### CSS-only classes (NOT in HTML):
- `.card__num` — no numbered cards in HTML
- `.card--service::before` — decorative hover pseudo-element

---

## 6. DIFFERENTIATION (DIFF)

### HTML Structure:
```
section.diff#diff
  div.diff__container
    div.section-header.fade-up
      h2.section-title
      p.section-desc
    div.diff__grid
      div.diff-card.fade-up  (x3)
        span.diff-card__number
        div.diff-card__icon > svg
        h3.diff-card__title
        p.diff-card__desc
```

### Classes Used:
| HTML Class | Element | CSS Equivalent | Mismatch? |
|---|---|---|---|
| `diff` | `<section>` | `.diff` | NO |
| `diff__container` | `<div>` | `.diff__inner` | YES |
| `section-header` | `<div>` | `.diff__header` | YES |
| `diff__grid` | `<div>` | `.diff__points` | YES |
| `diff-card` | `<div>` (x3) | `.diff__point` | YES |
| `diff-card__number` | `<span>` | *(not in CSS)* | YES |
| `diff-card__icon` | `<div>` | `.diff__icon` | YES |
| `diff-card__title` | `<h3>` | `.diff__point-title` | YES |
| `diff-card__desc` | `<p>` | `.diff__point-desc` | YES |

---

## 7. REVIEWS

### HTML Structure:
```
section.reviews#reviews
  div.reviews__container
    div.section-header.fade-up
      h2.section-title
      p.section-desc
    div.reviews__grid
      div.review-card.fade-up  (x3)
        div.review-card__stars > svg (x5)
        p.review-card__text
        div.review-card__author
          div.review-card__avatar
          div.review-card__info
            strong.review-card__name
            span.review-card__role
```

### Classes Used:
| HTML Class | Element | CSS Equivalent | Mismatch? |
|---|---|---|---|
| `reviews` | `<section>` | `.reviews` | NO |
| `reviews__container` | `<div>` | `.reviews__inner` | YES |
| `section-header` | `<div>` | `.reviews__header` | YES |
| `reviews__grid` | `<div>` | `.reviews__grid` | NO |
| `review-card` | `<div>` (x3) | `.card--review` | YES |
| `review-card__stars` | `<div>` | `.card__stars` | YES |
| `review-card__text` | `<p>` | `.card__review-text` | YES |
| `review-card__author` | `<div>` | `.card__reviewer` | YES |
| `review-card__avatar` | `<div>` | `.card__avatar` | YES |
| `review-card__info` | `<div>` | `.card__reviewer-info` | YES |
| `review-card__name` | `<strong>` | `.card__reviewer-name` | YES |
| `review-card__role` | `<span>` | `.card__reviewer-role` | YES |

---

## 8. PROCESS

### HTML Structure:
```
section.process#process
  div.process__container
    div.section-header.fade-up
      h2.section-title
      p.section-desc
    div.process__timeline
      div.process__line
      div.process-step.fade-up  (x4)
        div.process-step__circle
        h3.process-step__title
        p.process-step__desc
```

### Classes Used:
| HTML Class | Element | CSS Equivalent | Mismatch? |
|---|---|---|---|
| `process` | `<section>` | `.process` | NO |
| `process__container` | `<div>` | `.process__inner` | YES |
| `section-header` | `<div>` | `.process__header` | YES |
| `process__timeline` | `<div>` | `.process__steps` | YES |
| `process__line` | `<div>` | `.process__connector` | YES |
| `process-step` | `<div>` (x4) | `.process__step` | YES |
| `process-step__circle` | `<div>` | `.process__step-circle` | YES |
| `process-step__title` | `<h3>` | `.process__step-title` | YES |
| `process-step__desc` | `<p>` | `.process__step-desc` | YES |

---

## 9. FAQ

### HTML Structure:
```
section.faq#faq
  div.faq__container
    div.section-header.fade-up
      h2.section-title
      p.section-desc
    div.faq__list[role="list"]
      div.faq-item.fade-up[role="listitem"]  (x5)
        button.faq-item__trigger
          span.faq-item__question
          span.faq-item__icon > svg
        div.faq-item__panel[hidden]
          p.faq-item__answer
```

### Classes Used:
| HTML Class | Element | CSS Equivalent | Mismatch? |
|---|---|---|---|
| `faq` | `<section>` | `.faq` | NO |
| `faq__container` | `<div>` | `.faq__inner` | YES |
| `section-header` | `<div>` | `.faq__header` | YES |
| `faq__list` | `<div>` | `.faq__list` | NO |
| `faq-item` | `<div>` (x5) | `.faq__item` | YES |
| `faq-item__trigger` | `<button>` | *(not directly styled — CSS uses .faq__question)* | YES |
| `faq-item__question` | `<span>` | `.faq__question` | YES |
| `faq-item__icon` | `<span>` | `.faq__chevron` | YES |
| `faq-item__panel` | `<div>` | *(not in CSS — CSS uses .faq__answer)* | YES |
| `faq-item__answer` | `<p>` | `.faq__answer` | YES |

### CSS-only classes (NOT in HTML):
- `.faq__item.is-active` — JS toggled
- `.faq__item.is-active .faq__question`
- `.faq__item.is-active .faq__chevron`
- `.faq__item.is-active .faq__answer`

---

## 10. CTA

### HTML Structure:
```
section.cta#cta
  div.cta__bg-image[role="img"]
  div.cta__overlay
  div.cta__container
    div.cta__content.fade-up
      h2.cta__title
      p.cta__desc
      a.btn.btn--primary.btn--large
```

### Classes Used:
| HTML Class | Element | CSS Equivalent | Mismatch? |
|---|---|---|---|
| `cta` | `<section>` | `.cta` | NO |
| `cta__bg-image` | `<div>` | `.cta__bg` | YES |
| `cta__overlay` | `<div>` | *(not in CSS — CSS uses ::before/::after on .cta__bg)* | YES |
| `cta__container` | `<div>` | `.cta__inner` | YES |
| `cta__content` | `<div>` | `.cta__content` | NO |
| `cta__title` | `<h2>` | `.cta__title` | NO |
| `cta__desc` | `<p>` | `.cta__desc` | NO |

---

## 11. FOOTER

### HTML Structure:
```
footer.footer
  div.footer__container
    div.footer__top
      div.footer__brand
        a.footer__logo
        p.footer__tagline
      div.footer__nav
        div.footer__col  (x3)
          h4.footer__heading
          ul.footer__list > li > a
    div.footer__bottom
      p.footer__copy
      div.footer__social
        a.footer__social-link  (x3) > svg
```

### Classes Used:
| HTML Class | Element | CSS Equivalent | Mismatch? |
|---|---|---|---|
| `footer` | `<footer>` | `.footer` | NO |
| `footer__container` | `<div>` | `.footer__inner` | YES |
| `footer__top` | `<div>` | `.footer__top` | NO |
| `footer__brand` | `<div>` | `.footer__brand` | NO |
| `footer__logo` | `<a>` | `.footer__logo` | NO |
| `footer__tagline` | `<p>` | `.footer__tagline` | NO |
| `footer__nav` | `<div>` | `.footer__nav` | NO |
| `footer__col` | `<div>` (x3) | `.footer__nav-col` | YES |
| `footer__heading` | `<h4>` | `.footer__nav-heading` | YES |
| `footer__list` | `<ul>` | `.footer__nav-col ul` | YES |
| `footer__bottom` | `<div>` | `.footer__bottom` | NO |
| `footer__copy` | `<p>` | `.footer__copy` | NO |
| `footer__social` | `<div>` | `.footer__social` | NO |
| `footer__social-link` | `<a>` (x3) | `.footer__social-link` | NO |

---

## 12. SHARED / UTILITY CLASSES

| HTML Class | Used On | CSS Equivalent | Mismatch? |
|---|---|---|---|
| `fade-up` | Many elements | `.fade-up` | NO |
| `btn` | `<a>` buttons | `.btn` | NO |
| `btn--primary` | `<a>` buttons | `.btn--primary` | NO |
| `btn--outline` | `<a>` buttons | `.btn--outline` | NO |
| `btn--large` | CTA button | `.btn--large` | NO |
| `section-title` | `<h2>` in all sections | `.section-title` | NO |
| `section-desc` | `<p>` in all sections | `.section-desc` | NO |
| `section-header` | `<div>` wrappers in about/services/diff/reviews/process/faq | *(not in CSS — CSS uses per-section __header)* | YES |

---

## 13. CSS-ONLY CLASSES (not referenced in HTML)

These classes exist in style.css but have NO corresponding HTML element:

| CSS Class | Purpose |
|---|---|
| `.container` | Generic container |
| `.section-label` | Section label badge |
| `.section-desc--center` | Centered description variant |
| `.hide-mobile` | Mobile visibility utility |
| `.card__num` | Numbered card element |
| `.nav__mobile` | Mobile slide-out menu |
| `.nav__mobile-links` | Mobile menu links |
| `.skip-link` | Accessibility skip link |
| `.skeleton` | Loading skeleton |
| `.accent-line` | Decorative line |
| `.section-divider` | Section separator |
| `.badge` | Badge component |
| `.grid-align-center` | Grid alignment utility |
| `.text-center` | Text centering utility |
| `.max-text` | Max-width text constraint |
| `.max-text--center` | Centered max-width text |
| `.sr-only` | Screen reader only |

---

## 14. COMPLETE MISMATCH MAP (HTML → CSS rename needed)

This is the definitive mapping. To fix the CSS, either:
- **Option A**: Rename CSS selectors to match HTML classes
- **Option B**: Rename HTML classes to match CSS selectors

### Option A: CSS selectors to rename:

```
.nav__inner              →  .nav__container
.nav__logo span          →  .nav__logo-mark
.nav__links li a         →  .nav__link
.nav__hamburger span     →  .nav__hamburger-line

.hero__inner             →  .hero__container
.hero__label             →  .hero__badge
.hero__actions           →  .hero__ctas
.hero__visual            →  .hero__image-wrap
.hero__visual img        →  .hero__image

.stats__inner            →  .stats__container
.stats__item             →  .stat
.stats__number           →  .stat__number
.stats__suffix           →  .stat__suffix
.stats__label            →  .stat__label
.stats__divider          →  .stat__underline

.about__inner            →  .about__container
.about__header           →  .section-header  (scoped to .about)
.about__cards            →  .about__grid
.card--feature           →  .about-card
.card__icon (in about)   →  .about-card__icon
.card__title (in about)  →  .about-card__title
.card__desc (in about)   →  .about-card__desc

.services__inner         →  .services__container
.services__header        →  .section-header  (scoped to .services)
.card--service           →  .service-card
.card__icon (in services)→  .service-card__icon
.card__title (in services)→ .service-card__title
.card__desc (in services)→  .service-card__desc

.diff__inner             →  .diff__container
.diff__header            →  .section-header  (scoped to .diff)
.diff__points            →  .diff__grid
.diff__point             →  .diff-card
.diff__icon              →  .diff-card__icon
.diff__point-title       →  .diff-card__title
.diff__point-desc        →  .diff-card__desc
                          +  .diff-card__number (NEW - not in CSS)

.reviews__inner          →  .reviews__container
.reviews__header         →  .section-header  (scoped to .reviews)
.card--review            →  .review-card
.card__stars             →  .review-card__stars
.card__review-text       →  .review-card__text
.card__reviewer          →  .review-card__author
.card__avatar            →  .review-card__avatar
.card__reviewer-info     →  .review-card__info
.card__reviewer-name     →  .review-card__name
.card__reviewer-role     →  .review-card__role

.process__inner          →  .process__container
.process__header         →  .section-header  (scoped to .process)
.process__steps          →  .process__timeline
.process__connector      →  .process__line
.process__step           →  .process-step
.process__step-circle    →  .process-step__circle
.process__step-title     →  .process-step__title
.process__step-desc      →  .process-step__desc

.faq__inner              →  .faq__container
.faq__header             →  .section-header  (scoped to .faq)
.faq__item               →  .faq-item
.faq__question           →  .faq-item__question
.faq__chevron            →  .faq-item__icon
.faq__answer             →  .faq-item__answer
                          +  .faq-item__trigger (NEW)
                          +  .faq-item__panel (NEW)

.cta__bg                 →  .cta__bg-image
.cta__inner              →  .cta__container
                          +  .cta__overlay (NEW)

.footer__inner           →  .footer__container
.footer__nav-col         →  .footer__col
.footer__nav-heading     →  .footer__heading
.footer__nav-col ul      →  .footer__list
```
