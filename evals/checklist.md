# GROVI 페이지 완성도 검수 체크리스트

본 체크리스트의 모든 항목이 통과해야 "완료" 상태입니다. AI 코딩 에이전트는 각 섹션 구현 후 해당 항목을 검수하고, 전체 완성 후 한 번 더 통합 검수합니다.

---

## A. 콘텐츠 정확성

- [ ] 모든 텍스트가 `spec/content.json`과 한 글자도 다르지 않음 (조사·구두점 포함)
- [ ] Hero H1 = `GROVI`
- [ ] Hero 서브타이틀 = `AI로 더 빠르게, 방법론으로 더 단단하게.`
- [ ] Hero 보조 카피 = `그로브의 AI 기반 구축·운영·에이전트 방법론.`
- [ ] Framework 섹션 타이틀 = `시스템 라이프사이클의 AI 기반 실행·관리.` (마침표 포함)
- [ ] Build 트랙 타이틀 = `Build 트랙 — 요구 정의에서 배포까지.`
- [ ] Opts 트랙 타이틀 = `Opts 트랙 — 운영에서 고도화까지.`
- [ ] Agent 트랙 타이틀 = `Agent 트랙 — 시스템에서 에이전트로.`
- [ ] Stage Index 8개 모두 표시 (Discover, Design, Build, Release, Operate, Optimize, Analyze, Agentize)
- [ ] Build 트랙의 4개 단계 모두 5개 sub-process 정확히 표시
- [ ] Opts 트랙의 3개 단계 모두 5개 sub-process 정확히 표시
- [ ] Agent 트랙의 4개 단계 모두 5개 sub-process 정확히 표시
- [ ] Footer 헤딩 = `도움이 필요하신가요?`
- [ ] 임의로 추가된 카피·태그라인·CTA 텍스트 없음

---

## B. 섹션 구조

- [ ] 9개 섹션 모두 구현 (Hero, Framework, Build×2, Opts×2, Agent×2, Footer)
- [ ] 각 섹션 최소 `100vh` 높이 (단 Footer는 예외)
- [ ] 다크 ↔ 라이트 배경 교차 패턴 적용 (디자인 시스템 참조)
- [ ] 각 섹션에 슬래시 어노테이션 (`//`) 표시
- [ ] 트랙 섹션은 Flow + Detail 2장씩 구분
- [ ] Agent 트랙에 듀얼 진입점 (Analyze + Standalone) 시각화

---

## C. 시각 시스템 (Design System 정합성)

- [ ] 메인 컬러: 딥 네이비 (`#000033`) 다크 섹션, 화이트 라이트 섹션
- [ ] 액센트: 인디고 (`#4338CA`)
- [ ] 트랙별 컬러 식별: Build 블루 / Opts 그린 / Agent 오렌지
- [ ] Hero "GROVI" 타이포 — `clamp(5rem, 16vw, 16rem)` 압도적 사이즈
- [ ] 섹션 타이틀 — `--text-display` (clamp 적용)
- [ ] Pretendard 폰트 적용 확인 (혹은 시스템 폰트 fallback)
- [ ] 슬래시 어노테이션 — 모노스페이스 폰트, 인디고 컬러, uppercase, letter-spacing 0.15em
- [ ] Phase Box 컴포넌트 — 상단 컬러 strip, 번호 + 이름 + sub-process bullet list
- [ ] Stage Detail Card — 좌측 컬러 strip, 4축 라벨 정렬

---

## D. 다이어그램

- [ ] `assets/diagrams/framework.svg` 존재, 표시됨 (v1 프로그래매틱 SVG도 OK)
- [ ] `assets/diagrams/build-flow.svg` 존재, 표시됨
- [ ] `assets/diagrams/opts-flow.svg` 존재, Update 루프 시각화 포함
- [ ] `assets/diagrams/agent-flow.svg` 존재, 듀얼 진입점 시각화 포함
- [ ] 모든 SVG에 `<title>` 또는 `<desc>` 접근성 텍스트 포함
- [ ] 다이어그램 컬러가 트랙 컬러 시스템과 일치

---

## E. 반응형 (3-tier)

- [ ] **Desktop ≥1280px**: 디자인 의도대로 표시, 가로 레이아웃 유지
- [ ] **Tablet 768-1279px**: 트랙 박스 2×2 또는 3 가로 적응, 폰트 사이즈 자동 조정
- [ ] **Mobile <768px**: 세로 스택, Hero 타이포 한 화면 가득, 다이어그램 적응
- [ ] Panel Counter — Mobile에서 적절히 처리 (hide 또는 inline)
- [ ] 모든 텍스트 모바일에서 가독성 유지 (최소 14px)
- [ ] 가로 스크롤 발생 없음 (모든 브레이크포인트)

---

## F. 인터랙션

- [ ] 스크롤 진입 시 콘텐츠 fade-in (IntersectionObserver 권장)
- [ ] Panel Counter 자동 업데이트 (현재 가시 섹션 반영)
- [ ] Phase Box / Card hover — lift 효과
- [ ] CTA Button hover — 컬러 시프트 + lift
- [ ] Sub-nav active 상태 강조 (GROVI에 underline)
- [ ] Smooth scroll for anchor navigation
- [ ] `prefers-reduced-motion: reduce` 사용자에게 애니메이션 비활성화

---

## G. 접근성

- [ ] `<html lang="ko">` 명시
- [ ] Skip-to-content 링크 (`<a class="skip-link">`)
- [ ] Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- [ ] 모든 이미지/SVG에 alt text 또는 aria-label
- [ ] 키보드로 페이지 전체 내비 가능 (Tab, Enter, Esc)
- [ ] `:focus-visible` 스타일 명확
- [ ] 컬러 콘트라스트 WCAG AA 이상 (본문 4.5:1, 헤더 3:1)
- [ ] Lighthouse Accessibility 점수 ≥ 95

---

## H. 성능

- [ ] 페이지 로딩 < 2초 (로컬, 캐시 비활성화 기준)
- [ ] Lighthouse Performance 점수 ≥ 85
- [ ] 콘솔 에러 0개
- [ ] 콘솔 경고 ≤ 2개 (의미 있는 것만)
- [ ] 이미지·SVG 최적화 (불필요한 메타 제거)
- [ ] CSS·JS 파일 크기 합리적

---

## I. SEO·메타

- [ ] `<title>` = `GROVI | AI 기반 시스템 구축·운영·에이전트 방법론`
- [ ] `<meta name="description">` 설정
- [ ] Open Graph 메타 (og:title, og:description, og:type, og:locale) 완비
- [ ] `<meta name="viewport">` 모바일 최적화
- [ ] `<meta name="theme-color">` = `#000033`
- [ ] 적절한 heading 위계 (h1 → h2 → h3, 건너뛰기 없음)

---

## J. 코드 품질

- [ ] HTML 검증 통과 (W3C Validator)
- [ ] CSS 검증 통과
- [ ] BEM 또는 일관된 클래스 네이밍 컨벤션 적용
- [ ] 인라인 스타일 최소화
- [ ] JS 모듈 분리 (필요 시)
- [ ] 주석으로 복잡한 로직 설명
- [ ] 죽은 코드·미사용 셀렉터 없음

---

## K. 사이트 정합성

- [ ] Global Nav가 grovesoft.net 표준 패턴과 일관 (구조·스타일)
- [ ] Services Sub-Nav 6개 항목 (GROVI 활성)
- [ ] Footer가 SERVICES 페이지 패턴과 일관
- [ ] 컬러·폰트가 기존 사이트와 충돌 없음 (브랜드 일관성)

---

## L. 톤앤무드 (ELIX 영감)

- [ ] 딥 네이비 배경의 임팩트 있는 Hero
- [ ] 슬래시 어노테이션 (`//`) 일관 사용
- [ ] 패널형 섹션 진행감 (각 섹션이 독립적 시각 단위)
- [ ] 대형 타이포 (헤로·섹션 타이틀)
- [ ] SVG 다이어그램이 섹션의 시각적 주연
- [ ] 다크 ↔ 라이트 교차로 리듬 생성
- [ ] 마케팅 광고 톤 카피 없음 (객관·전문 톤 유지)

---

## 검수 명령 (참고)

```bash
# 로컬 서버 실행
python -m http.server 8000
# 또는
npx serve src/

# Lighthouse (Chrome DevTools 또는 CLI)
npx lighthouse http://localhost:8000 --view

# HTML 검증
# https://validator.w3.org/ 에 src/index.html 업로드
```

---

## 최종 확인

모든 섹션의 모든 항목이 ✅ 상태가 되면 사용자에게 보고:

```
✅ GROVI 페이지 v1 완성

검수 결과:
- 콘텐츠: 100% 정확
- 섹션: 9/9 완료
- 다이어그램: 4/4 (v1 수준)
- 반응형: Desktop/Tablet/Mobile 통과
- 접근성: Lighthouse 95+
- 성능: Lighthouse 85+

다음 단계로 디자이너 정식 다이어그램 교체 또는 추가 폴리싱 가능.
```
