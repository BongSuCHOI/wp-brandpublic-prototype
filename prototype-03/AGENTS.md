# AGENTS.md — Brand Public Prototype 03

> AI 코딩 에이전트를 위한 개발 가이드. 이 파일을 먼저 읽고 작업을 시작하세요.
> 디자인 결정은 DESIGN.md를 참조하세요.

---

## Project Overview

**프로젝트:** 브랜드퍼블릭 (Brand Public) 랜딩페이지 프로토타입 03
**목적:** 마케팅 솔루션 회사의 메인 랜딩페이지. 신뢰(데이터) + 트렌디(크리에이티브) 공존.
**기술 스택:** HTML5, CSS3 (BEM), Vanilla JS, GSAP 3 + ScrollTrigger, Three.js (선택적)
**디자인:** DESIGN.md 참조 (Swiss Editorial + Motion-First Modern)

---

## Directory Structure

```
prototype-03/
├── DESIGN.md          # 디자인 시스템 (CSS 토큰, 폰트, 색상, 모션)
├── AGENTS.md          # 이 파일 — 개발 가이드
├── index.html         # 메인 HTML
├── css/
│   └── style.css      # 전체 스타일 (BEM)
├── js/
│   └── main.js        # 전체 JS (GSAP, 네비, 인터랙션)
└── assets/            # 이미지, 아이콘 등
```

---

## Section Architecture (8 Sections)

| # | Section ID | HTML class prefix | 내용 | 배경 |
|---|-----------|-------------------|------|------|
| 1 | `hero` | `.hero` | 헤드라인, 서브헤드, CTA, 클라이언트 로고 | White + dot grid |
| 2 | `social-proof` | `.social-proof` | 숫자 카운팅 (매출, 브랜드 수, ROAS) | Muted (#F1F5F9) |
| 3 | `problem` | `.problem` | 페인 포인트 공감 | White |
| 4 | `services` | `.services` | 8개 핵심 서비스 카드 그리드 | Muted |
| 5 | `how-it-works` | `.how-it-works` | 3단계 프로세스 | White |
| 6 | `portfolio` | `.portfolio` | 사례 2~3개 (목업) | Muted |
| 7 | `testimonials` | `.testimonials` | 고객 후기 2~3개 (목업) | White |
| 8 | `final-cta` | `.final-cta` | 문의하기 CTA | Navy (#0F172A) |

---

## Navigation

- **위치:** `position: fixed`, `top: 0`, `z-index: 100`
- **초기:** 투명 배경, 화이트 텍스트 (Hero 위에서)
- **스크롤 후:** `backdrop-filter: blur(12px)` + `background: rgba(255,255,255,0.85)` + 네이비 텍스트
- **전환:** 스크롤 100px 지점에서 GSAP 또는 IntersectionObserver로 토글
- **좌측:** 로고 "BRAND PUBLIC" (Bebas Neue)
- **우측:** 회사 소개, 서비스, 문의하기
- **모바일:** 햄버거 메뉴 (GSAP 애니메이션으로 열림)

---

## CTA Strategy

| 위치 | 텍스트 | 스타일 | 액션 |
|------|--------|--------|------|
| Hero | "무료 상담받기" | Primary (코랄) | `#contact` 스크롤 |
| Final CTA | "3초만에 문의하기" | Primary (코랄, 큰 버튼) | `#contact` 스크롤 |
| 네비 | "문의하기" | Ghost 텍스트 | `#contact` 스크롤 |

> 모든 CTA는 현재는 버튼만 구현. 실제 문의 페이지로의 연결은 추후 구현.

---

## Development Rules

### CSS
1. BEM 네이밍: `.block__element--modifier`
2. 모든 값은 CSS Custom Properties 사용 (DESIGN.md 토큰)
3. 모바일 퍼스트: `@media (min-width: ...)` 사용
4. `transition: all` 금지 — 속성 명시적 나열
5. `opacity: 0` 금지 — GSAP에서만 관리

### JS / GSAP
1. GSAP 안전 패턴 필수 준수 (아래 섹션 참조)
2. IIFE로 스코프 격리
3. `typeof gsap` 체크 → `prefers-reduced-motion` 체크 → `registerPlugin` 순서
4. `gsap.set()` 금지, 항상 `fromTo` 사용
5. GSAP 미로드 시 fallback 제공
6. `once: true` 옵션으로 한 번만 실행되도록 설정

### HTML
1. Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
2. ARIA 속성: 네비에 `aria-label`, 버튼에 `aria-label`, 모바일 메뉴에 `aria-expanded`
3. `alt` 텍스트 필수 (목업 이미지에도 설명적 alt)
4. `<button>` for actions, `<a>` for navigation
5. `font-display: swap` (Google Fonts 기본)
6. `width` + `height` 속성 필수 (이미지)

---

## GSAP Safe Pattern (복붙용)

```javascript
(function () {
  'use strict';

  // 1. Reduced motion 체크
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // 모션 없이 즉시 표시
    return;
  }

  // 2. GSAP 로드 체크
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  // 3. 플러그인 등록
  gsap.registerPlugin(ScrollTrigger);

  // 4. fromTo로 초기 상태 + 최종 상태 함께 설정
  gsap.fromTo('.element',
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.element',
        start: 'top 88%',
        once: true
      }
    }
  );
})();
```

---

## Data (Mockup)

### 클라이언트 로고 (Hero)
목업. SVG 텍스트 또는 placeholder 블록으로 표현. 5~6개.

### Social Proof 숫자
- "누적 매출 성장" → 120억+
- "관리 브랜드" → 300+개
- "평균 ROAS" → 480%
- "고객 만족도" → 98%

### 서비스 목록 (8개)
1. 스마트스토어 마케팅
2. 네이버 플레이스 관리
3. 퍼포먼스 마케팅
4. 바이럴 마케팅
5. 브랜드 전략 및 디자인
6. 이벤트 프로모션
7. 인스타그램 전략
8. 데이터 분석 & 인사이트

### How It Works (3단계)
1. 무료 상담 — 비즈니스 분석 및 목표 설정
2. 전략 수립 — 데이터 기반 맞춤 전략 기획
3. 실행 & 분석 — 캠페인 실행 및 실시간 성과 최적화

### Portfolio (목업 3개)
- "스마트스토어 OOO" — 매출 340% 성장
- "플레이스 OOO" — 방문자 520% 증가
- "퍼포먼스 OOO" — ROAS 680% 달성

### Testimonials (목업 3개)
- 이름, 직책, 회사명 포함
- 한국어 후기 텍스트

---

## Performance Targets

| 항목 | 목표 |
|------|------|
| 전체 페이지 무게 | < 2MB |
| JavaScript | < 200KB (GSAP CDN 제외) |
| LCP | < 2.5s |
| 폴드 아래 지연 로드 | 이미지, Three.js |
|CLS | < 0.1 |

---

## Verification

### 구현 완료 후 체크
1. `python3 -m http.server 8080` 로 로컬 서버 실행
2. 브라우저에서 콘솔 에러 0 확인
3. 모든 섹션이 정상 렌더링 확인
4. GSAP 애니메이션이 정상 작동 확인
5. 모바일 반응형 확인 (375px, 768px, 1024px)
6. `prefers-reduced-motion` 테스트

### GSAP 안전 패턴 grep 검증
```bash
# CSS에서 opacity:0 검출
grep -n "opacity.*:.*0" css/style.css
# gsap.set 검출
grep -n "gsap\.set" js/main.js
# typeof 체크 확인
grep -n "typeof gsap" js/main.js
```
