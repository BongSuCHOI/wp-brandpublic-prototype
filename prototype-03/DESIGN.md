# DESIGN.md — Brand Public Prototype 03

> 이 파일은 prototype-03의 시각적 정체성을 정의합니다.
> AI 코딩 에이전트는 이 파일을 읽고 일관된 디자인으로 구현합니다.
> AGENTS.md가 코드 방향을 결정하듯, 이 파일이 디자인 방향을 결정합니다.

---

## Style

**스타일:** Swiss Editorial + Motion-First Modern (하이브리드)
**키워드:** 신뢰, 트렌디, 데이터기반, 정밀한 그리드, 역동적 모션, 화이트 캔버스
**무드:** "이 회사에 맡기면 매출이 오르겠다"는 신뢰와 "최신 트렌드를 알고 있다"는 크리에이티브 에너지가 공존. 체계적인 스위스 그리드에 GSAP 모션으로 생동감을 부여. 타이포그래피가 주도하는 에디토리얼 랜딩페이지.

---

## Color Tokens

```css
:root {
  /* Primary — 딥 네이비 (신뢰, 권위) */
  --color-primary: #0F172A;
  --color-primary-foreground: #FFFFFF;

  /* Secondary — 인디고 (데이터, 기술) */
  --color-secondary: #6366F1;
  --color-secondary-foreground: #FFFFFF;

  /* Accent — 비비드 코랄 (에너지, 행동 유도, CTA) */
  --color-accent: #FF6B35;
  --color-accent-foreground: #FFFFFF;

  /* Backgrounds */
  --color-background: #FFFFFF;
  --color-foreground: #0F172A;

  /* Card */
  --color-card: #FFFFFF;
  --color-card-foreground: #0F172A;

  /* Muted */
  --color-muted: #F1F5F9;
  --color-muted-foreground: #64748B;

  /* Utility */
  --color-border: #E2E8F0;
  --color-destructive: #DC2626;
  --color-success: #22C55E;
  --color-ring: #0F172A;
}
```

### 다크모드

prototype-03는 라이트 전용. 다크모드 미지원.

---

## Typography

### 폰트

| 용도 | 폰트 | 폴백 | 비고 |
|------|------|------|------|
| 영문 디스플레이 | Bebas Neue | Impact, sans-serif | 올캡스, 헤드라인/라벨/빅 텍스트 |
| 한글 + 본문 | Pretendard | -apple-system, sans-serif | 전체 한글 텍스트, 바디 |
| 모노/숫자 | JetBrains Mono | 'Fira Code', monospace | 데이터 섹션 숫자, ROAS, 통계 |

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css" rel="stylesheet">
```

### 타이포그래피 스케일

```css
:root {
  --font-display: 'Bebas Neue', Impact, sans-serif;
  --font-body: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Size — modular scale 1.25 */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 2rem;      /* 32px */
  --font-size-4xl: 2.75rem;   /* 44px */
  --font-size-5xl: 3.75rem;   /* 60px */
  --font-size-6xl: 5rem;      /* 80px — hero display */
  --font-size-7xl: 7rem;      /* 112px — hero big impact */

  --line-height-tight: 1.15;
  --line-height-normal: 1.6;
  --line-height-relaxed: 1.75;

  --letter-spacing-display: 0.02em;  /* Bebas Neue: 살짝 넓힘 */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.1em;      /* 라벨/섹션 태그 */
}
```

### 타이포그래피 위계

1. **Hero H1**: Bebas Neue, 5rem~7rem, --color-primary, letter-spacing: 0.02em
2. **Section H2**: Pretendard Bold, 2rem~3rem, --color-primary
3. **Section Label (Tag)**: Pretendard Medium, 0.75rem, --color-accent, letter-spacing: 0.1em, text-transform: uppercase
4. **Body**: Pretendard Regular, 1rem~1.125rem, --color-foreground
5. **Data/Numbers**: JetBrains Mono Bold, --color-primary
6. **Caption**: Pretendard Regular, 0.875rem, --color-muted-foreground

---

## Motion

```css
:root {
  /* Duration */
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 450ms;
  --duration-section: 600ms;  /* 섹션 전체 트랜지션 */

  /* Easing */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

### 규칙
- 마이크로인터랙션: 150-300ms
- 섹션 진입: 300-600ms
- 500ms 이상 금지
- `transform` + `opacity`만 애니메이션 (compositor-friendly)
- `prefers-reduced-motion` 시 모션 비활성화

### GSAP 모션 레벨: FULL

**페이지 로드 시퀀스:**
1. 네비게이션이 위에서 슬라이드 다운 (duration: 400ms)
2. Hero 텍스트가 오버랩되며 등장 — 스플릿 텍스트 (글자 단위, stagger: 0.03)
3. 서브헤드라인 페이드인 + 위로 슬라이드
4. CTA 버튼 스케일업 + 펄스 글로우
5. 클라이언트 로고 그리드가 스태거 되며 등장

**스크롤 트리거:**
- Social Proof: 숫자 카운팅 애니메이션 (gsap.to + snap)
- Problem: 텍스트 라인별 오버랩 등장
- Services: 카드 스태거 (stagger: 0.08) + 호버 시 lift
- How It Works: 스텝 순차 등장 + 연결 라인 그로우
- Portfolio: 카드 패럴랙스 (속도차) + 호버 확장
- Testimonials: 페이드인 + 살짝 위로 슬라이드
- Final CTA: 버튼 펄스 + 배경 미묘한 그라데이션 쉬프트

**호버 마이크로인터랙션:**
- 버튼: translateY(-2px) + shadow 증가 + border-radius 살짝 변화
- 카드: translateY(-4px) + shadow-lg
- 네비 링크: underline 길이 width 애니메이션

### GSAP 안전 패턴 (필수 준수)
- CSS에 `opacity: 0` 절대 금지
- `gsap.set()` 금지, 항상 `fromTo` 사용
- `typeof gsap` 체크를 `registerPlugin`보다 먼저
- reduced motion 체크를 GSAP 체크보다 먼저
- fallback: GSAP 미로드 시 `style.opacity = '1'`

---

## Spatial Rules

### 여백 전략
관대한 여백. 섹션 간 `padding: 120px 0` (데스크톱), `padding: 80px 0` (모바일). 컨텐츠 컨테이너 `max-width: 1280px`, `margin: 0 auto`, `padding: 0 24px`. Hero 섹션은 `min-height: 100vh`.

### 그리드
12컬럼 그리드 (CSS Grid). 서비스 카드: 4컬럼 (데스크톱) → 2컬럼 (태블릿) → 1컬럼 (모바일). 비대칭 레이아웃 선호 — 7:5, 8:4 비율 활용.

### 반응형 브레이크포인트
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  --max-width-content: 65ch;
  --max-width-page: 1280px;
  --max-width-section: 1280px;
  --nav-height: 72px;
}
```

---

## Backgrounds & Visual Details

### 배경 전략
기본: 순수 화이트 #FFFFFF. 섹션 교차 배경: 매 2번째 섹션마다 `--color-muted` (#F1F5F9) 적용. Hero 섹션: 미세한 radial-gradient 오버레이 (중앙 약간 밝음, 가장자리 약간 어두움). Final CTA: 네이비 배경 (#0F172A) + 화이트 텍스트.

### 텍스처/이펙트
- Hero: 미세한 dot grid 패턴 (opacity: 3%, SVG background)
- 네비 스크롤: `backdrop-filter: blur(12px)` + `background: rgba(255,255,255,0.85)`
- 카드: 호버 시 미세한 `box-shadow` 리프트
- CTA 버튼: 코랄 오렌지 배경, 호버 시 살짝 밝아지는 그라데이션

### 보더/그림자
- 기본 보더: `1px solid var(--color-border)`
- 카드 보더: 없음 (shadow로 분리)
- 카드 그림자: `0 1px 3px rgba(0,0,0,0.04)`, 호버: `0 8px 30px rgba(0,0,0,0.08)`
- CTA 그림자: `0 4px 14px rgba(255,107,53,0.3)`

---

## Anti-Patterns (Project-specific)

- 보라색/파란색 그라데이션 절대 금지 (이 프로젝트는 코랄 오렌지가 악센트)
- Inter, Roboto, system-ui 폰트 금지 (Bebas Neue + Pretendard 만 사용)
- 둥근 카드 과다 사용 금지 — `border-radius: 16px` 이상 피하기, 8~12px 유지
- `transition: all` 금지 — 속성 명시적으로 나열
- CSS에 `opacity: 0` 금지 (GSAP fromTo로만 초기 상태 설정)
- `gsap.set()` 금지
- 이모지를 아이콘 대신 사용 금지
- 이미지에 width/height 누락 금지
- 500ms 이상 애니메이션 금지
- 신뢰를 해치는 과도한 장식 피하기 — "미니멀한 임팩트" 유지

---

## Components

### 버튼 계층

**Primary CTA (주요 행동):**
```css
.btn-primary {
  background: var(--color-accent);
  color: var(--color-accent-foreground);
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: var(--font-size-base);
  box-shadow: 0 4px 14px rgba(255,107,53,0.3);
  /* 호버: translateY(-2px), shadow 증가 */
}
```

**Secondary (보조):**
```css
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1.5px solid var(--color-border);
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 500;
  /* 호버: border-color → var(--color-primary) */
}
```

**Ghost (텍스트 링크):**
```css
.btn-ghost {
  background: transparent;
  color: var(--color-muted-foreground);
  padding: 8px 16px;
  /* 호버: color → var(--color-primary) */
}
```

### 카드

```css
.card {
  background: var(--color-card);
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
}
```

### 섹션 라벨 (Tag)

```css
.section-label {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: var(--space-3);
}
```

---

## References

- https://stripe.com — 모션 퍼스트 랜딩페이지 참고. 스크롤 트리거 애니메이션, 숫자 카운팅
- https://www.apple.com/iphone/ — 에디토리얼 타이포그래피 스케일 참고. 대비 극대화
- https://linear.app — Swiss 그리드 시스템 참고. 정밀한 정렬과 여백

---

## Framework Notes

- 순수 HTML/CSS/JS. 프레임워크 없음.
- GSAP 3.x + ScrollTrigger 플러그인 (CDN)
- Three.js는 필요시 Hero 배경에만 사용 (선택적)
- Pretendard는 CDN (orioncactus CDN)
- GSAP 안전 패턴 필수 준수 (static-prototype-github-pages 스킬 참조)
- BEM 네이밍 컨벤션 사용
- CSS Custom Properties로 모든 토큰 관리
- 반응형은 모바일 퍼스트 (Mobile First)
