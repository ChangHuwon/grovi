# GROVI Page Harness

`grovesoft.net`에 추가될 신규 페이지 **GROVI** 구축을 위한 AI 코딩 에이전트(harness engineering) 작업 패키지.

## 무엇인가

GROVI는 그로브의 AI 기반 시스템 구축·운영·에이전트 개발 방법론입니다. 본 하네스는 해당 방법론을 소개하는 단일 페이지(`/grovi`)를 Claude Code 등의 AI 코딩 에이전트로 구현할 수 있도록 정리된 작업 패키지입니다.

## 사용 방법

```bash
# 1. 본 디렉토리를 작업 환경으로 복사
cp -r grovi-harness ~/projects/

cd ~/projects/grovi-harness

# 2. Claude Code 실행
claude

# 3. 첫 메시지로 다음과 같이 지시
# "Read CLAUDE.md and start building the page following the spec."
```

Claude Code는 자동으로 `CLAUDE.md`를 읽고 작업을 시작합니다.

## 파일 구성

| 경로 | 역할 |
|---|---|
| `CLAUDE.md` | AI 에이전트 작업 지침 (진입점) |
| `spec/page-spec.md` | 페이지 전체 사양 — 섹션·레이아웃·인터랙션 |
| `spec/content.json` | 모든 텍스트 콘텐츠 (단일 소스) |
| `spec/design-system.md` | 시각 언어 가이드 (ELIX 페이지 톤앤무드 영감) |
| `src/index.html` | 구현 대상 (현재 스켈레톤) |
| `src/styles/tokens.css` | CSS 디자인 토큰 (확정) |
| `assets/diagrams/` | 4종 SVG 다이어그램 (작업 필요) |
| `evals/checklist.md` | 완성도 검수 체크리스트 |

## 핵심 결정 사항 (변경 불가)

- **카피 톤**: 객관·전문 도큐먼트 (마케팅 컨버전 트리거 최소화)
- **시각 톤**: `eluocnc.com/ko/elix` 페이지 결 (딥 네이비, 대형 타이포, 슬래시 모티프, 패널형 섹션)
- **기술 스택**: 순수 HTML/CSS/JS (프레임워크 없음)
- **컬러**: 인디고 메인 + 화이트 베이스 + 트랙별 보조 컬러 (절제 사용)
- **언어**: 한글 1차

## 변경 이력

| 버전 | 일자 | 변경 내용 |
|---|---|---|
| v1.0 | 2026-05-20 | 초기 하네스 패키지 |
