# Session Log — Brand Public Prototype

---

## 세션 7 — ScrollTrigger 점프 버그 수정 및 배포
- **날짜**: 2025-04-04
- **내용**:
  - 시안 01-v2, 02-v2에서 스크롤 시 요소가 덜컹거리는 ScrollTrigger 점프 버그 수정
  - 원인: `fromTo()`가 ScrollTrigger 발동 시에만 초기 상태를 적용 → 뷰포트 내 이미 보이는 요소가 갑자기 opacity:0으로 전환
  - 해결: `gsap.registerPlugin(ScrollTrigger)` 직후 `gsap.set()`으로 모든 `.fade-up` 요소를 초기 상태(opacity:0, y:30/40)로 즉시 설정
  - GSAP 미로드 시 fallback 유지 (모든 요소 opacity:1)
  - 라이브 QA 통과: 콘솔 에러 0, 스크롤 부드러움 정상
  - GitHub Pages 배포 완료
