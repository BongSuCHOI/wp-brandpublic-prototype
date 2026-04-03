# Brand Public v2 Design Brief

## Reference: Intercom Design System
Based on VoltAgent/awesome-design-md/design-md/intercom/DESIGN.md

## Common Design Tokens (Both Versions)

### Base Colors
- Background: #faf9f6 (warm off-white)
- Surface: #ffffff
- Text Primary: #111111 (off-black)
- Text Secondary: #626260 (black 60)
- Text Muted: #9c9fa5
- Border: #dedbd6 (warm oat)

### Typography Rules (Intercom-inspired)
- Heading line-height: 1.00 (tight)
- Negative letter-spacing on headings (proportional to size)
- Body line-height: 1.50
- Button scale(1.1) hover, scale(0.85) active

### Interaction
- Hover: scale(1.1) on buttons
- Active: scale(0.85)
- Transition: 200-250ms cubic-bezier(0.4, 0, 0.2, 1)
- No transition: all (explicit properties only)

### Shadows
- Minimal shadows (Intercom style)
- Depth through border colors and surface tints
- Blue-tinted multi-layer shadows for elevated cards (Stripe influence)

### Anti-Patterns (Premium UI Skill)
- NO purple gradients + white background (AI cliché)
- NO Inter/Roboto/Space Grotesk as primary
- NO flat card grid everywhere
- NO emoji as icons
- NO transition: all

---

## Version 01: "Sharp Editorial"

### Concept
Editorial magazine meets B2B marketing agency. Sharp geometry, asymmetric layouts, confident typography.

### Accent Color
- Primary Accent: #ff5600 (Fin Orange - from Intercom)
- CTA: #111111 (off-black button, white text)
- CTA Hover: white bg, dark text, scale(1.1)

### Fonts
- Display/Heading (English): 'Syne' (Google Fonts, free)
- Body (English): 'Manrope' (Google Fonts, free)
- Korean: 'Pretendard' (OFL free)

### Layout Personality
- Asymmetric hero (text left, visual right with overlap)
- Editorial-style section breaks
- Full-width dark sections alternating with white
- Cards: 4px radius, 1px solid #dedbd6 border, no shadow
- Buttons: 4px radius (sharp rectangles)
- Generous whitespace, measured and purposeful

### Key Visual Details
- Large display headings with aggressive negative tracking
- Warm oat borders instead of shadows
- Accent color used sparingly (labels, links, small details)
- Dark sections: #111111 bg, white text

### CSS Variables
```css
:root {
  --bg: #faf9f6;
  --surface: #ffffff;
  --text: #111111;
  --text-secondary: #626260;
  --text-muted: #9c9fa5;
  --border: #dedbd6;
  --accent: #ff5600;
  --accent-hover: #e04d00;
  --dark-bg: #111111;
  --dark-surface: #1a1a1a;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

---

## Version 02: "Warm Professional"

### Concept
Warm, approachable, trustworthy. Softer geometry, richer colors, card-driven layout. Premium B2B with personality.

### Accent Color
- Primary Accent: #0F766E (Teal 700) — trustworthy, modern
- CTA: #0F766E bg, white text
- CTA Secondary: outlined with teal border

### Fonts
- Display/Heading (English): 'Outfit' (Google Fonts, free)
- Body (English): 'Work Sans' (Google Fonts, free)
- Korean: 'Pretendard' (OFL free)

### Layout Personality
- Symmetric, centered hero
- Card-driven sections with subtle elevation
- Rounded geometry (12px cards, 8px buttons)
- Blue-tinted shadows (Stripe influence)
- Warmer, more inviting feel

### Key Visual Details
- Medium negative tracking on headings
- Cards with subtle blue-tinted shadows
- Teal accent for links, badges, highlights
- Gradient mesh background on hero section
- Rounded, friendly buttons

### CSS Variables
```css
:root {
  --bg: #faf9f6;
  --surface: #ffffff;
  --text: #111111;
  --text-secondary: #52525b;
  --text-muted: #9c9fa5;
  --border: #e7e5e4;
  --accent: #0F766E;
  --accent-light: #ccfbf1;
  --accent-hover: #0d6963;
  --dark-bg: #1c1917;
  --dark-surface: #292524;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-card: 0 1px 3px rgba(50,50,93,0.08), 0 4px 12px rgba(0,0,0,0.04);
  --shadow-elevated: 0 4px 12px rgba(50,50,93,0.12), 0 8px 24px rgba(0,0,0,0.06);
}
```

---

## Shared Section Structure (brandpublic.co.kr)

Both versions must include these 11 sections in order:
1. Navigation (sticky, blur backdrop)
2. Hero (main headline + CTA + visual)
3. Stats (counter animation: 885+ users, 540+ contracts, 98% satisfaction)
4. About / Why (신뢰와 성과를 동시에)
5. Services (6 service cards: performance ads, branding, content marketing, SNS, platform, data analysis)
6. Differentiation (3 points: 십분의일만의 특별함)
7. Reviews/Testimonials (3 reviews with avatars)
8. Process (4-step marketing process)
9. FAQ (5 items, accordion)
10. CTA (final call-to-action)
11. Footer

## Image Requirements
- Hero: Abstract professional business/marketing visual (NOT stock photo people)
- CTA: Background gradient or abstract pattern
- Service cards: Icon backgrounds or subtle illustrations
- Reviews: Placeholder avatars (initials-based CSS avatars)

## GSAP Animations (Both)
- ScrollTrigger for fade-in on scroll
- CountUp animation for stats
- Staggered card reveals
- Smooth scroll to sections
- prefers-reduced-motion respected
