#!/usr/bin/env bash
# GROVI 페이지 자동 검수 스크립트 — ELIX-style redesign
cd /home/user/grovi || exit 1

HTML="src/index.html"
PASS=0; FAIL=0

ok()   { echo "  ✓ $1"; PASS=$((PASS+1)); }
fail() { echo "  ✗ $1"; FAIL=$((FAIL+1)); }

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " GROVI 검수 ($(date '+%H:%M:%S'))"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# A. 파일 존재
echo "[A] 파일 존재"
[ -f "$HTML" ]                              && ok "src/index.html"   || fail "src/index.html 없음"
[ -f "src/styles/tokens.css" ]              && ok "tokens.css"       || fail "tokens.css 없음"
[ -f "src/styles/components.css" ]          && ok "components.css"   || fail "components.css 없음"
[ -f "src/styles/sections.css" ]            && ok "sections.css"     || fail "sections.css 없음"
[ -f "src/scripts/main.js" ]                && ok "main.js"          || fail "main.js 없음"

# B. 섹션 구조
echo "[B] 섹션 ID"
if [ -f "$HTML" ]; then
  for id in hero framework build-flow build-detail opts-flow opts-detail agent-flow agent-detail footer; do
    grep -q "id=\"$id\"" "$HTML" && ok "#$id" || fail "#$id 없음"
  done
fi

# C. 콘텐츠 정확도
echo "[C] 콘텐츠"
if [ -f "$HTML" ]; then
  grep -q "GROVI"                                          "$HTML" && ok "GROVI 타이틀"          || fail "GROVI 타이틀 없음"
  grep -q "AI로 더 빠르게, 방법론으로 더 단단하게"        "$HTML" && ok "Hero 서브타이틀"       || fail "Hero 서브타이틀 불일치"
  grep -q "그로브의 AI 기반 구축·운영·에이전트 방법론"    "$HTML" && ok "Hero 보조카피"         || fail "Hero 보조카피 불일치"
  grep -q "시스템 라이프사이클의 AI 기반 실행·관리"       "$HTML" && ok "Framework 타이틀"      || fail "Framework 타이틀 불일치"
  grep -q "Build 트랙 — 요구 정의에서 배포까지"           "$HTML" && ok "Build 타이틀"          || fail "Build 타이틀 불일치"
  grep -q "Opts 트랙 — 운영에서 고도화까지"               "$HTML" && ok "Opts 타이틀"           || fail "Opts 타이틀 불일치"
  grep -q "Agent 트랙 — 시스템에서 에이전트로"            "$HTML" && ok "Agent 타이틀"          || fail "Agent 타이틀 불일치"
  grep -q "도움이 필요하신가요"                           "$HTML" && ok "Footer 헤딩"           || fail "Footer 헤딩 불일치"
fi

# D. ELIX 디자인 패턴
echo "[D] ELIX 디자인 패턴"
if [ -f "$HTML" ]; then
  grep -q "tokens.css"       "$HTML" && ok "tokens.css 링크"     || fail "tokens.css 미링크"
  grep -q "pretendard"       "$HTML" && ok "Pretendard 폰트"     || fail "Pretendard 미로드"
  grep -q "annotation"       "$HTML" && ok "annotation 클래스"   || fail "annotation 없음"
  grep -q "panel-counter"    "$HTML" && ok "panel-counter"       || fail "panel-counter 없음"
  grep -q "section--dark"    "$HTML" && ok "section--dark"       || fail "section--dark 없음"
  grep -q "section--light"   "$HTML" && ok "section--light"      || fail "section--light 없음"
fi
# ELIX 핵심 패턴 — CSS 검사
CSS_ALL="src/styles/components.css src/styles/sections.css"
grep -h "split-section\|visual-panel" $CSS_ALL 2>/dev/null | grep -q "." \
  && ok "split-section 레이아웃"  || fail "split-section 없음"
grep -h "CCFF00\|color-yellow"    src/styles/tokens.css src/styles/components.css 2>/dev/null | grep -q "." \
  && ok "네온 옐로우 (#CCFF00)"   || fail "네온 옐로우 없음"
grep -h "track-slash\|track-name" $CSS_ALL 2>/dev/null | grep -q "." \
  && ok "/TRACK 슬래시 레이블"    || fail "/TRACK 슬래시 없음"
grep -h "orb\|radial-gradient"    $CSS_ALL 2>/dev/null | grep -q "." \
  && ok "CSS Orb 구 비주얼"       || fail "CSS Orb 없음"

# E. 접근성
echo "[E] 접근성"
if [ -f "$HTML" ]; then
  grep -q 'lang="ko"'       "$HTML" && ok "lang=ko"         || fail "lang=ko 없음"
  grep -q "skip-link"       "$HTML" && ok "skip-link"        || fail "skip-link 없음"
  grep -q "<main"           "$HTML" && ok "<main>"           || fail "<main> 없음"
  grep -q "<header"         "$HTML" && ok "<header>"         || fail "<header> 없음"
  grep -q "<footer"         "$HTML" && ok "<footer>"         || fail "<footer> 없음"
fi
grep -q "focus-visible" src/styles/components.css 2>/dev/null \
  && ok ":focus-visible"  || fail ":focus-visible 없음"

# F. SVG 다이어그램 (스키매틱 스타일 확인)
echo "[F] 다이어그램"
for svg in framework build-flow opts-flow agent-flow; do
  [ -f "assets/diagrams/${svg}.svg" ] && ok "${svg}.svg 존재" || fail "${svg}.svg 없음"
done
# 스키매틱 스타일 확인 (circle nodes + navy color)
grep -l "0D1B6E" assets/diagrams/*.svg 2>/dev/null | wc -l | grep -q "[4-9]" \
  && ok "스키매틱 네이비 컬러 (#0D1B6E)" || fail "스키매틱 컬러 불일치"
grep -l "<circle" assets/diagrams/*.svg 2>/dev/null | wc -l | grep -q "[3-9]" \
  && ok "원형 노드 (circle elements)" || fail "원형 노드 없음"

# G. 반응형
echo "[G] 반응형"
grep -h "767px\|768px\|1279px\|1280px" src/styles/components.css src/styles/sections.css 2>/dev/null | grep -q "." \
  && ok "미디어쿼리 (768/1280)" || fail "미디어쿼리 없음"

# 요약
echo ""
TOTAL=$((PASS+FAIL))
if [ "$FAIL" -eq 0 ]; then
  echo "✅ 전체 통과: ${PASS}/${TOTAL}"
else
  echo "⚠️  통과: ${PASS}/${TOTAL}  |  실패: ${FAIL}/${TOTAL}"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
