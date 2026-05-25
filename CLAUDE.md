# GROVI 페이지 구축 — Claude Code 작업 지침

이 문서는 본 디렉토리에서 작업을 시작하는 AI 코딩 에이전트가 가장 먼저 읽어야 하는 파일입니다.

## 목표

`grovesoft.net`에 추가될 신규 페이지 **GROVI**를 구축합니다. GROVI는 그로브의 AI 기반 시스템 구축·운영·에이전트 개발 방법론을 소개하는 페이지입니다.

**최종 산출물**:
- `src/index.html` — 완성된 페이지 (단일 파일 또는 모듈 구조 — 본인 판단)
- `src/styles/` — 스타일시트
- `src/scripts/` — 인터랙션 스크립트
- `assets/diagrams/*.svg` — 4종 다이어그램

## 작업 원칙 — Spec-driven

1. **`spec/page-spec.md`** 먼저 정독. 페이지 전체 구조와 각 섹션의 의도를 파악.
2. **`spec/content.json`** — 모든 텍스트 콘텐츠의 단일 소스. 절대 임의로 수정·변형하지 말 것. 문구를 추가하거나 줄여야 한다면 사용자에게 확인.
3. **`spec/design-system.md`** — 시각 언어와 톤앤무드 가이드 (ELIX 페이지 영감).
4. **`src/styles/tokens.css`** — 디자인 토큰 (컬러·타이포·스페이싱). 이미 정의되어 있음, 수정 자제.
5. **`evals/checklist.md`** — 자체 검수 체크리스트. 각 섹션 완료 후 항목별 확인.

## 작업 순서

섹션 단위로 점진 구현:

1. 페이지 셸 구축 — `index.html` 기본 골격, GNB, sub-nav, 푸터, 메타
2. **Section 1: Hero** — 큰 GROVI 로고타입, 카피
3. **Section 2: 전체 프레임워크** — 7스테이지 × 3트랙 다이어그램 + 스테이지 인덱스
4. **Section 3-4: Build 트랙** — 플로우 + 4단계 상세
5. **Section 5-6: Opts 트랙** — 플로우 (Update 루프 강조) + 3단계 상세
6. **Section 7-8: Agent 트랙** — 듀얼 진입 플로우 + 4단계 상세
7. **Footer** — Contact CTA
8. 반응형·접근성·인터랙션 마무리

각 섹션 완료마다 브라우저에서 확인 → 다음 진행. 한 번에 다 만들지 말 것.

## 기술 제약

- **순수 HTML/CSS/JS만 사용**. React, Vue, Next, Svelte 등 프레임워크 금지. 빌드 도구도 없음 (페이지를 그대로 열어서 작동해야 함).
- **외부 의존**: 폰트 CDN(Pretendard 권장), 그 외 외부 라이브러리 사용 시 사용자에게 사전 확인.
- **단일 페이지 롱 스크롤**. 라우팅 없음.
- **반응형 3-tier**: Desktop ≥1280 / Tablet ≥768 / Mobile ≥375.
- **접근성**: semantic HTML, alt text, ARIA labels, 키보드 내비, WCAG AA 콘트라스트.
- **언어**: 한글 1차. 영문 표기는 스테이지·트랙명 등 고유명사 한정.

## 톤앤무드 핵심

본 페이지는 **eluocnc.com/ko/elix** 페이지의 시각 언어를 차용합니다. 자세한 사항은 `spec/design-system.md` 참조. 요약하면:

- **딥 네이비 + 화이트** 베이스, 트랙별 보조 컬러 (블루·그린·오렌지) 절제 사용
- **대형 타이포그래피** — 헤드라인은 압도적으로 크게
- `//` 슬래시 모티프 — 섹션 라벨, 어노테이션에 활용
- **패널형 섹션 진행** — 각 섹션이 하나의 독립된 시각 단위
- **우측 페이지네이션** (01/08 형식) — 스크롤 위치 표시
- **SVG 다이어그램이 주연** — 각 섹션의 중심 시각 요소
- **카피 톤은 객관·전문** — 마케팅 컨버전 트리거 없음

## 다이어그램 (별도 작업 필요)

4종의 SVG 다이어그램이 페이지의 핵심 시각 요소입니다. `assets/diagrams/README.md`에 사양이 정리되어 있습니다.

본인이 작업 가능한 수준에서:
1. **v1 단계**: 프로그래매틱 SVG로 와이어프레임 수준 다이어그램을 직접 생성. 노드·박스·화살표·라벨만 명확하면 OK.
2. **v2 단계**: 디자이너가 정교한 다이어그램을 제공하면 교체. 현재 단계에서는 v1으로 페이지가 완전 동작하게 만드는 것이 목표.

## 평가 기준 (Done의 정의)

`evals/checklist.md`의 모든 항목 통과:

- [ ] 9개 섹션 모두 구현 (Hero / Framework / Build×2 / Opts×2 / Agent×2 / Footer)
- [ ] 모든 텍스트가 `content.json`과 정확히 일치
- [ ] 3개 반응형 브레이크포인트에서 레이아웃 깨짐 없음
- [ ] 4종 다이어그램 (최소 v1 수준) 표시
- [ ] 키보드만으로 페이지 전체 내비 가능
- [ ] 콘솔 에러 없음
- [ ] 페이지 로딩 < 2s (로컬 기준)

## 외부 의존 (사람이 결정해야 하는 항목)

진행 중 다음 항목에 도달하면 사용자에게 질문:

1. 정확한 사이트 글로벌 GNB 구조 (현재 가정으로 진행)
2. Services sub-nav의 GROVI 추가 위치 (1번 또는 별도)
3. Contact 폼 백엔드 (현재는 URL 링크 처리)
4. 디자이너로부터 정식 다이어그램 SVG 수령 시점

## 디렉토리 구조

```
grovi-harness/
├── CLAUDE.md                # 본 파일 (작업 지침)
├── README.md                # 프로젝트 개요
├── spec/
│   ├── page-spec.md         # 페이지 전체 사양
│   ├── content.json         # 모든 텍스트 콘텐츠 (단일 소스)
│   └── design-system.md     # 시각 언어 가이드
├── src/
│   ├── index.html           # 출력 대상 (현재 스켈레톤)
│   ├── styles/
│   │   └── tokens.css       # CSS 변수 (수정 자제)
│   └── scripts/
│       └── .gitkeep
├── assets/
│   ├── diagrams/
│   │   └── README.md        # 다이어그램 사양
│   └── icons/
│       └── .gitkeep
└── evals/
    └── checklist.md         # 자체 검수 체크리스트
```

## 시작 명령

```bash
# 1. 페이지 사양 정독
cat spec/page-spec.md

# 2. 콘텐츠 데이터 확인
cat spec/content.json

# 3. 디자인 시스템 확인
cat spec/design-system.md

# 4. 디자인 토큰 확인 (수정하지 말 것)
cat src/styles/tokens.css

# 5. 체크리스트로 done 정의 확인
cat evals/checklist.md

# 6. 시작 — Hero 섹션부터 구현
```

준비됐다면 시작하세요. 막히는 부분이 있으면 사용자에게 즉시 질문 — 임의 결정하지 말 것.
