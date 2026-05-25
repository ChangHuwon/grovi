# GROVI 페이지 사양

본 문서는 GROVI 페이지의 전체 구조와 각 섹션 사양을 정의합니다. `content.json`이 텍스트 콘텐츠를, `design-system.md`가 시각 언어를 담당하고, 본 문서는 **레이아웃과 동작**을 담당합니다.

---

## 페이지 개요

- **경로**: `/grovi`
- **타입**: 단일 페이지, 롱 스크롤
- **섹션 수**: 9개 (Hero, Framework, Build×2, Opts×2, Agent×2, Footer)
- **패널 카운트**: 8개 (Hero=01, Framework=02, Build Flow=03, Build Detail=04, Opts Flow=05, Opts Detail=06, Agent Flow=07, Agent Detail=08, Footer는 카운트 외)

---

## 글로벌 레이아웃

### Document 구조 (개념)

```
<body>
  <header class="global-nav">
    <a class="logo">GROVE</a>
    <nav>[About] [Services] [Works] [Contact]</nav>
  </header>

  <nav class="services-sub-nav">
    [GROVI*] [Web & Mobile Platform] [Grove Java Framework] ...
  </nav>

  <div class="panel-counter">
    <!-- 우측 고정, 현재 스크롤 위치 표시 -->
  </div>

  <main>
    <section id="hero">...</section>
    <section id="framework">...</section>
    <section id="build-flow">...</section>
    <section id="build-detail">...</section>
    <section id="opts-flow">...</section>
    <section id="opts-detail">...</section>
    <section id="agent-flow">...</section>
    <section id="agent-detail">...</section>
  </main>

  <footer id="footer">...</footer>
</body>
```

### Global Nav

- 페이지 상단 고정 (sticky)
- 높이: 64px
- 배경: 다크 섹션에서는 투명/블러, 라이트 섹션에서는 화이트 (`backdrop-filter: blur(10px)`)
- 스크롤 시 미세하게 축소 (선택)

### Services Sub-Nav

- Global Nav 아래
- 6개 항목 가로 배열, 가운데 정렬
- GROVI 항목에 active state (인디고 underline)
- Sticky 여부: GNB 아래에 stick 또는 첫 섹션 진입 후 hide (사용자 판단)

### Panel Counter

- Desktop: 우측 고정, 세로 중앙 (`right: 2rem, top: 50%`)
- 현재 패널 번호 강조, 전체 패널 수는 흐릿하게
- 스크롤 따라 자동 업데이트 (IntersectionObserver)
- Mobile: hide 또는 각 섹션 상단 inline

---

## Section 1 — Hero

**ID**: `hero` · **Panel**: `01/08` · **배경**: Dark

### 레이아웃

```
┌─ Dark Navy Background ──────────────────────────────┐
│                                                       │
│  // GROVI Methodology                  01 / 08 →     │
│                                                       │
│                                                       │
│  GROVI                                               │
│  (압도적으로 큰 타이포 — clamp(8rem, 16vw, 16rem))      │
│                                                       │
│                                                       │
│  AI로 더 빠르게, 방법론으로 더 단단하게.                │
│  그로브의 AI 기반 구축·운영·에이전트 방법론.             │
│                                                       │
│                                                       │
│                                            ↓ scroll  │
└──────────────────────────────────────────────────────┘
```

### 컴포넌트

| 요소 | 콘텐츠 | 스타일 |
|---|---|---|
| Annotation | `// GROVI Methodology` | 슬래시 모티프 |
| H1 | `GROVI` | `--text-hero`, weight 800, 화이트 |
| Subtitle | content.sections.hero.subtitle | `--text-display`, weight 700, 화이트 |
| Sub-copy | content.sections.hero.subCopy | `--text-body-lg`, secondary on dark |

### 동작

- 최소 높이 `100vh`
- 좌측 정렬 (ELIX 패턴)
- Annotation은 상단 좌측 또는 H1 위
- 진입 시 H1 부드럽게 페이드 인 (200ms 후 시작, 600ms 동안)
- 하단에 스크롤 인디케이터 (선택)

---

## Section 2 — 전체 프레임워크

**ID**: `framework` · **Panel**: `02/08` · **배경**: Light

### 레이아웃

```
┌─ Light Background ──────────────────────────────────┐
│  // 01. Framework                      02 / 08      │
│                                                       │
│  시스템 라이프사이클의 AI 기반 실행·관리.              │
│  (--text-display)                                    │
│                                                       │
│  [본문 한 문단 — 최대폭 720px, 좌측 정렬]             │
│                                                       │
│  ┌──────────────────────────────────────────────┐  │
│  │                                                │  │
│  │     [프레임워크 다이어그램 SVG]                  │  │
│  │     7노드 × 3트랙 + Update 루프 + Standalone    │  │
│  │                                                │  │
│  └──────────────────────────────────────────────┘  │
│                                                       │
│  Stage Index — 4×2 그리드 또는 가로 8개              │
│  ┌──────┬──────┬──────┬──────┐                      │
│  │Discover│Design│Build│Release│                     │
│  │ desc  │ desc │ desc │ desc │                      │
│  ├──────┼──────┼──────┼──────┤                      │
│  │Operate│Optimize│Analyze│Agentize│                  │
│  │ desc  │ desc │ desc │ desc │                      │
│  └──────┴──────┴──────┴──────┘                      │
└──────────────────────────────────────────────────────┘
```

### 컴포넌트

| 요소 | 콘텐츠 |
|---|---|
| Annotation | `// 01. Framework` |
| Title | content.sections.framework.title |
| Body | content.sections.framework.body |
| Diagram | `assets/diagrams/framework.svg` |
| Stage Index | content.sections.framework.stageIndex (8 items) |

### 동작

- 다이어그램 진입 시 SVG 요소 단계별 fade-in (선택, v2)
- Stage Index 항목은 hover 시 컬러 시프트 (인디고)
- Stage Index 클릭 시 해당 트랙 섹션으로 anchor scroll (선택)

---

## Section 3 — Build 트랙 Flow

**ID**: `build-flow` · **Panel**: `03/08` · **배경**: Dark

### 레이아웃

```
┌─ Dark Navy Background ──────────────────────────────┐
│  // 02. Build Track                    03 / 08      │
│                                                       │
│  Build 트랙 — 요구 정의에서 배포까지.                  │
│                                                       │
│  [트랙 도입 카피]                                     │
│                                                       │
│  ┌─[Build Track 컨테이너 — 블루 보더]──────────────┐│
│  │                                                  ││
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐         ││
│  │  │ 01   │→│ 02   │→│ 03   │→│ 04   │         ││
│  │  │Discover│ │Design│ │Build │ │Release│        ││
│  │  ├──────┤ ├──────┤ ├──────┤ ├──────┤         ││
│  │  │•...  │ │•...  │ │•...  │ │•...  │         ││
│  │  │•...  │ │•...  │ │•...  │ │•...  │         ││
│  │  └──────┘ └──────┘ └──────┘ └──────┘         ││
│  │                                                  ││
│  └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

### 컴포넌트

| 요소 | 콘텐츠 |
|---|---|
| Annotation | `// 02. Build Track` |
| Title | content.sections.tracks[0].title |
| Intro | content.sections.tracks[0].intro |
| 4 Phase Boxes | content.sections.tracks[0].phases (각 5개 sub-processes) |

### 동작

- Phase Box 사이에 화살표 (트랙 블루 컬러)
- Hover 시 박스 lift
- 모바일: 세로 스택, 화살표 ↓ 방향

---

## Section 4 — Build 트랙 Detail

**ID**: `build-detail` · **Panel**: `04/08` · **배경**: Light

### 레이아웃

```
┌─ Light Background ──────────────────────────────────┐
│  // 02. Build Track · Detail           04 / 08      │
│                                                       │
│  단계별 상세                                          │
│                                                       │
│  ┌──────────────────┐  ┌──────────────────┐         │
│  │ Discover         │  │ Design           │         │
│  │ ─────────────────│  │ ─────────────────│         │
│  │ 목적   ...        │  │ 목적   ...        │         │
│  │ 활동   ...        │  │ 활동   ...        │         │
│  │ AI 활용 ...       │  │ AI 활용 ...       │         │
│  │ 산출물 ...        │  │ 산출물 ...        │         │
│  └──────────────────┘  └──────────────────┘         │
│                                                       │
│  ┌──────────────────┐  ┌──────────────────┐         │
│  │ Build            │  │ Release          │         │
│  │ ─────────────────│  │ ─────────────────│         │
│  │ ...              │  │ ...              │         │
│  └──────────────────┘  └──────────────────┘         │
└──────────────────────────────────────────────────────┘
```

### 컴포넌트

- 4개 카드, 2×2 그리드 (Desktop), 세로 스택 (Mobile)
- 각 카드는 좌측에 트랙 컬러 vertical strip
- 카드 내부: 단계 이름 (큰 폰트) + 4축 (목적/주요 활동/AI 활용/산출물)

### 4축 표시 형식

```
목적       만들 시스템이 무엇을 해결해야 하는지 정의
주요 활동  환경 분석, 이해관계자 인터뷰, ...
AI 활용    인터뷰 요약, 시장·경쟁 리서치, ...
산출물     비즈니스 요구 정의서, 페르소나, ...
```

라벨은 인디고, 본문은 진한 회색. 좌측 라벨 컬럼 폭 80-100px.

---

## Section 5 — Opts 트랙 Flow

**ID**: `opts-flow` · **Panel**: `05/08` · **배경**: Dark

Build Flow와 동일한 구조, 단 다음 차이:

- 3개 Phase Box (Operate, Optimize, Analyze) — 박스 폭이 Build보다 크게
- 박스 아래에 **Update 루프** 시각화: 점선 화살표가 Analyze에서 좌측으로 가서 다시 Operate (또는 페이지 상단의 Framework 다이어그램으로 회귀하는 의미) 방향으로 위로 회귀
- 트랙 컬러: 그린

### 추가 시각 요소

```
┌─ Update Loop ──────────────────────────────────┐
│                                                  │
│  ┌──────┐    ┌──────┐    ┌──────┐              │
│  │Operate│ → │Optimize│→│Analyze│              │
│  └──────┘    └──────┘    └──────┘              │
│      ↑                       │                  │
│      │  Update 루프            │                  │
│      └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘                  │
│         → Discover · Design 환류                 │
│                                                  │
└────────────────────────────────────────────────┘
```

점선 + 컬러 강조 + 라벨 (`Update 루프 → Discover · Design 환류`).

---

## Section 6 — Opts 트랙 Detail

**ID**: `opts-detail` · **Panel**: `06/08` · **배경**: Light

Build Detail과 동일 구조. 단 3개 카드 (가로 3열 또는 세로 3개).

---

## Section 7 — Agent 트랙 Flow

**ID**: `agent-flow` · **Panel**: `07/08` · **배경**: Dark

가장 복잡한 섹션. 듀얼 진입점 + 4개 Phase Box.

### 레이아웃

```
┌─ Dark Background, Agent Track 컨테이너 (오렌지 보더) ─┐
│                                                       │
│  ┌─[진입 1]─┐                                          │
│  │Analyze   │ ─ ─ ─┐                                  │
│  │(Opts)   │       │                                  │
│  │기존 환류 │       ▼                                  │
│  └─────────┘   ●합류점─→ ┌──────┐→┌──────┐→┌──────┐→┌──────┐ │
│                          │  01  │ │  02  │ │  03  │ │  04  │ │
│  ┌─[진입 2]─┐       ▲    │Strategy│ │Design│ │Build │ │Deploy│ │
│  │Standalone│       │    ├──────┤ ├──────┤ ├──────┤ ├──────┤ │
│  │ Project │ ──────┘    │•...  │ │•...  │ │•...  │ │•Shadow│ │
│  │신규 프로젝트│              │•...  │ │•...  │ │•...  │ │•Suggest│ │
│  └─────────┘            └──────┘ └──────┘ └──────┘ │•Act │ │
│                                                     └──────┘ │
└──────────────────────────────────────────────────────────────┘
```

### 듀얼 진입점

- 좌측에 두 진입 박스 세로 배치
- 진입 1 (Analyze from Opts): 그린 보더 (점선), Opts와의 연결성 표현
- 진입 2 (Standalone): 오렌지 보더 (실선), Agent 트랙 네이티브
- 두 박스에서 각각 화살표가 작은 ● 합류점으로 모이고, 합류점에서 Strategy로 진입

### Phase Boxes

4개 Phase Box (Strategy, Design, Build, Deploy). Build 트랙과 동일 패턴. Deploy 박스는 Shadow → Suggest → Act 단계가 sub-process로 표시.

---

## Section 8 — Agent 트랙 Detail

**ID**: `agent-detail` · **Panel**: `08/08` · **배경**: Light

Build Detail과 동일 구조. 4개 카드 (Strategy, Design, Build, Deploy).

---

## Footer

**ID**: `footer` · **배경**: Dark

### 레이아웃

```
┌─ Dark Background ──────────────────────────────────┐
│                                                       │
│                                                       │
│           도움이 필요하신가요?                          │
│           (--text-display, 중앙 정렬)                  │
│                                                       │
│           전문가와 이야기해 보세요.                     │
│                                                       │
│                  [ Contact us → ]                     │
│                  (CTA Button)                         │
│                                                       │
│                                                       │
│  ────────────────────────────────────────────       │
│           GROVE · grovesoft.net · © 2026             │
└──────────────────────────────────────────────────────┘
```

### 컴포넌트

| 요소 | 콘텐츠 |
|---|---|
| Heading | content.sections.footer.heading (`도움이 필요하신가요?`) |
| Subheading | content.sections.footer.subheading |
| CTA Button | `Contact us → ` , href: `/contact/` |
| Site Footer | `GROVE · grovesoft.net · © 2026` |

### 동작

- 사이트 표준 SERVICES 푸터 패턴 유지 (다른 페이지와 일관성)
- 별도 마케팅 모듈, 사례 쇼케이스 추가 금지
- CTA 버튼은 인디고 채움, 호버 시 lift

---

## 인터랙션 요약

| 인터랙션 | 동작 |
|---|---|
| 스크롤 진입 | 섹션 콘텐츠 fade-in-up (IntersectionObserver) |
| Panel Counter 업데이트 | 현재 가시 섹션에 맞춰 자동 업데이트 |
| Phase Box hover | translate-y(-2px) + shadow 강화 |
| Stage Detail Card hover | 동일 |
| CTA Button hover | 컬러 시프트 + lift |
| Sub-nav hover | 텍스트 컬러 시프트 (active 제외) |
| Stage Index 클릭 (옵션) | 해당 트랙 섹션으로 smooth scroll |

---

## 반응형 동작

| 섹션 | Desktop (≥1280) | Tablet (768-1279) | Mobile (<768) |
|---|---|---|---|
| Hero | 좌측 정렬, 큰 GROVI | 동일, 폰트 축소 | 더 큰 비율로 표시 |
| Framework Diagram | 전체 너비 | 90% 너비 | 가로 스크롤 또는 세로 재배치 |
| Stage Index | 4×2 그리드 | 2×4 그리드 | 1×8 세로 스택 |
| Track Phase Boxes (4개) | 4 가로 | 2×2 그리드 | 1×4 세로 스택 |
| Track Phase Boxes (3개) | 3 가로 | 3 가로 | 1×3 세로 스택 |
| Detail Cards | 2×2 그리드 또는 4 가로 | 2×2 그리드 | 1×N 세로 스택 |
| Panel Counter | 우측 고정 | 우측 고정 | 섹션 상단 inline 표시 |

---

## 성능·접근성 기준

- **로딩**: 첫 화면 < 2s (로컬 기준), Lighthouse Performance > 85
- **접근성**: Lighthouse Accessibility > 95, WCAG AA 콘트라스트
- **SEO**: meta tag 완비, semantic HTML, OpenGraph
- **모바일**: 터치 타겟 최소 44×44px

---

## 단계별 구현 가이드

### Phase 1: 셸 구축
- index.html 골격
- tokens.css 적용
- GNB, sub-nav, footer 사이트 표준 패턴
- Panel Counter 컴포넌트

### Phase 2: Hero
- 큰 GROVI 타이포
- 카피 배치
- 진입 애니메이션

### Phase 3: Framework
- 본문 + 다이어그램 placeholder
- Stage Index 그리드

### Phase 4: 트랙 섹션 (Build → Opts → Agent)
- 각각 Flow + Detail 두 섹션씩
- Phase Box 컴포넌트 재사용
- Stage Detail Card 컴포넌트 재사용

### Phase 5: 다이어그램
- framework.svg 생성 (프로그래매틱 v1)
- build-flow.svg
- opts-flow.svg (Update 루프 강조)
- agent-flow.svg (듀얼 진입 + 4 phases)

### Phase 6: 인터랙션
- Scroll 진입 애니메이션
- Panel Counter 자동 업데이트
- Hover states

### Phase 7: 반응형
- Tablet, Mobile breakpoint 적용
- 다이어그램 반응형 처리

### Phase 8: 검수
- `evals/checklist.md` 항목별 통과 확인
- 콘솔 에러 0
- Lighthouse 점검
