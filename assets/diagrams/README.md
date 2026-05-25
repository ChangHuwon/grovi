# GROVI 다이어그램 사양

본 페이지에는 4종의 SVG 다이어그램이 필요합니다. AI 에이전트는 v1으로 프로그래매틱 SVG를 생성하고, 추후 디자이너가 v2를 교체하는 것을 가정합니다.

---

## 공통 사양

- **포맷**: SVG (인라인 또는 별도 파일)
- **컬러**: 컬러 시스템 (CSS 변수) 참조
- **반응형**: viewBox 사용, `width="100%"` 또는 max-width 지정
- **접근성**: `<title>` + `<desc>` 필수
- **백그라운드**: 투명 (배경은 섹션에서 처리)
- **다크 섹션 호환**: 다크 배경에서도 시인성 확보 (트랙 컬러는 `--color-XXX-on-dark` 변수 사용)

---

## 1. framework.svg

**섹션**: Framework (Section 2 — 02/08)
**배경 컨텍스트**: Light

### 콘텐츠

전체 7단계 × 3트랙 프레임워크의 정제된 시각 표현.

**노드 (원형)**:
- Discover, Design, Build, Release (Build 트랙)
- Operate, Optimize, Analyze (Opts 트랙)
- Agentize (Agent 트랙)

**트랙 영역 (둥근 박스 배경)**:
- Build 트랙: Discover ~ Release 감싸기, `--color-build-bg` 채움
- Opts 트랙: Operate, Optimize, Analyze 감싸기, `--color-opts-bg` 채움
- Agent 트랙: Agentize 감싸기, `--color-agent-bg` 채움
- Analyze는 Opts와 Agent의 경계에 위치 (시각적 오버랩)

**화살표**:
- Discover → Design → Build → Release → Operate → Analyze → Agentize (가로 플로우)
- Operate → Optimize (아래로)
- Optimize → Analyze (위로)
- **Update 루프**: Analyze에서 점선으로 좌측으로 가서 Discover/Design으로 회귀
- **Standalone Entry**: Agentize 위에서 들어오는 점선 화살표 (오렌지), 라벨 "Standalone Project"

**라벨**:
- 각 노드 이름 (영문)
- 각 트랙 영역 라벨 (Build, Opts, Agent — 박스 내부 좌상단)
- "Update" 라벨 (Update 루프 위)
- "Standalone Project (신규 프로젝트)" — Agentize 위

### 권장 viewBox

`viewBox="0 0 1200 500"` (가로형)

### Reference

`GROVI_page_wireframe_v2.pptx` 슬라이드 3 참조.

---

## 2. build-flow.svg

**섹션**: Build Flow (Section 3 — 03/08)
**배경 컨텍스트**: Dark

### 콘텐츠

Build 트랙의 4단계 시퀀스를 명확히 표현.

**구조**:
- 4개 단계 박스 (둥근 사각형 또는 라벨 + 원형)
- 단계 간 화살표 (트랙 블루 컬러, `--color-build-accent`)
- 단계 간 핸드오프 라벨 (선택): "요구 정의서", "아키텍처/명세", "빌드 아티팩트"

**단계명**: 01 Discover, 02 Design, 03 Build, 04 Release

**비교**: 페이지 본문에서 sub-process 리스트가 별도로 표시되므로, 다이어그램은 단계 시퀀스만 명확히 보이면 됨.

### 권장 viewBox

`viewBox="0 0 1200 240"` (가로형, 슬림)

---

## 3. opts-flow.svg

**섹션**: Opts Flow (Section 5 — 05/08)
**배경 컨텍스트**: Dark

### 콘텐츠

Opts 트랙의 3단계 + Update 루프.

**구조**:
- 3개 단계 박스: 01 Operate, 02 Optimize, 03 Analyze
- 단계 간 화살표 (트랙 그린, `--color-opts-accent`)
- **Update 루프** — Analyze에서 좌측 하단으로 점선 회귀, "Update 루프 → Discover · Design 환류" 라벨
- 분기 표시 (선택): Analyze에서 Agent 트랙으로 향하는 화살표 힌트

### 권장 viewBox

`viewBox="0 0 1200 320"` (가로형, Update 루프 공간 포함)

---

## 4. agent-flow.svg

**섹션**: Agent Flow (Section 7 — 07/08)
**배경 컨텍스트**: Dark

### 콘텐츠

Agent 트랙의 듀얼 진입점 + 4단계.

**구조**:
- **듀얼 진입점** (좌측):
  - "Analyze (Opts) — 기존 시스템 환류" — 그린 점선 보더
  - "Standalone Project — 신규 프로젝트" — 오렌지 솔리드 보더
- **합류점** (●) — 두 진입점에서 합류
- **4개 단계 박스**: 01 Strategy, 02 Design, 03 Build, 04 Deploy
- 단계 간 화살표 (오렌지, `--color-agent-accent`)
- Deploy 박스 또는 우측에 **Graduated Autonomy 3단계** (Shadow → Suggest → Act) 시각화

### 권장 viewBox

`viewBox="0 0 1300 320"` (가로 확장, 듀얼 진입 공간 포함)

---

## 구현 우선순위

### v1 (AI 에이전트 작업)

프로그래매틱 SVG로 와이어프레임 수준. 다음만 충족하면 OK:

- 모든 노드·박스·화살표·라벨이 식별 가능
- 트랙 컬러 시스템 적용
- 반응형 (viewBox 기반)
- 접근성 텍스트 포함

코드 예시 (framework.svg 일부):

```html
<svg viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="framework-title framework-desc">
  <title id="framework-title">GROVI 프레임워크 다이어그램</title>
  <desc id="framework-desc">
    7개 스테이지를 Build, Opts, Agent 3개 트랙으로 묶고, Analyze에서 Discover로 환류하는 Update 루프와 Agentize로 직접 진입하는 Standalone Project 경로를 표시.
  </desc>

  <!-- Build 트랙 영역 -->
  <rect x="50" y="100" width="500" height="180" rx="16" fill="#DBEAFE" stroke="#60A5FA" opacity="0.4"/>
  <text x="65" y="125" font-family="JetBrains Mono" font-size="11" fill="#2563EB" font-weight="600">BUILD</text>

  <!-- 노드: Discover -->
  <circle cx="120" cy="200" r="28" fill="#4338CA"/>
  <text x="120" y="170" text-anchor="middle" font-size="13">Discover</text>

  <!-- ...나머지 노드, 화살표, Update 루프, Standalone 화살표 -->
</svg>
```

### v2 (디자이너 작업)

별도 디자인 도구로 정교한 SVG 제작. 본 폴더에 같은 이름으로 교체.

---

## 파일명 컨벤션

| 파일 | v1 | v2 |
|---|---|---|
| Framework | `framework.svg` | `framework.svg` (동일 이름으로 교체) |
| Build | `build-flow.svg` | `build-flow.svg` |
| Opts | `opts-flow.svg` | `opts-flow.svg` |
| Agent | `agent-flow.svg` | `agent-flow.svg` |

v1 백업이 필요하면 `*-v1.svg`로 보관.
