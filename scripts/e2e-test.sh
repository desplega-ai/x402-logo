#!/usr/bin/env bash
#
# E2E test script for x402-logo SVG generation workflow.
# Requires: curl, jq, a running dev server on $BASE_URL (default: http://localhost:3000)
#
# Usage:
#   ./scripts/e2e-test.sh              # run against localhost:3000
#   BASE_URL=https://x402.example.com ./scripts/e2e-test.sh  # run against deployed URL
#
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"
PASSED=0
FAILED=0
TOTAL=0

pass() { ((PASSED++)); ((TOTAL++)); echo "  PASS: $1"; }
fail() { ((FAILED++)); ((TOTAL++)); echo "  FAIL: $1"; }

echo "Running E2E tests against $BASE_URL"
echo "======================================"
echo ""

# --- Test 1: List styles ---
echo "[1/8] GET /api/styles"
STYLES=$(curl -sf "$BASE_URL/api/styles" 2>/dev/null || echo '{"error":"request_failed"}')
STYLE_COUNT=$(echo "$STYLES" | jq '.styles | length' 2>/dev/null || echo 0)
if [ "$STYLE_COUNT" -gt 0 ]; then
  pass "Returned $STYLE_COUNT styles"
  FIRST_STYLE=$(echo "$STYLES" | jq -r '.styles[0].name')
else
  fail "No styles returned"
  FIRST_STYLE=""
fi

# --- Test 2: Generate with valid style ---
echo "[2/8] POST /api/generate (valid request)"
if [ -n "$FIRST_STYLE" ]; then
  GEN_BODY=$(jq -n --arg s "$FIRST_STYLE" '{styleName: $s, brandName: "E2ETest", brandVoice: "Bold and modern"}')
  GEN_RESULT=$(curl -sf -X POST "$BASE_URL/api/generate" \
    -H "Content-Type: application/json" \
    -d "$GEN_BODY" 2>/dev/null || echo '{"error":"request_failed"}')
  JOB_ID=$(echo "$GEN_RESULT" | jq -r '.jobId // empty')
  RUN_ID=$(echo "$GEN_RESULT" | jq -r '.runId // empty')
  if [ -n "$JOB_ID" ] && [ -n "$RUN_ID" ]; then
    pass "Job created: $JOB_ID (run: $RUN_ID)"
  else
    fail "Missing jobId or runId: $(echo "$GEN_RESULT" | jq -c '.')"
  fi
else
  fail "Skipped (no styles available)"
  JOB_ID=""
fi

# --- Test 3: Generate with invalid style ---
echo "[3/8] POST /api/generate (invalid style -> 404)"
ERR_RESULT=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/api/generate" \
  -H "Content-Type: application/json" \
  -d '{"styleName": "NonExistentStyle_12345"}')
if [ "$ERR_RESULT" = "404" ]; then
  pass "Returns 404 for unknown style"
else
  fail "Expected 404, got $ERR_RESULT"
fi

# --- Test 4: Generate with invalid body ---
echo "[4/8] POST /api/generate (invalid body -> 400)"
ERR_RESULT=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/api/generate" \
  -H "Content-Type: application/json" \
  -d '{}')
if [ "$ERR_RESULT" = "400" ]; then
  pass "Returns 400 for invalid body"
else
  fail "Expected 400, got $ERR_RESULT"
fi

# --- Test 5: Poll job status until completion ---
echo "[5/8] GET /api/generate/{jobId}/status (poll until done)"
if [ -n "$JOB_ID" ]; then
  MAX_POLLS=20
  POLL_INTERVAL=3
  FINAL_STATUS="timeout"
  for i in $(seq 1 $MAX_POLLS); do
    STATUS_RESULT=$(curl -sf "$BASE_URL/api/generate/$JOB_ID/status" 2>/dev/null || echo '{"status":"error"}')
    STATUS=$(echo "$STATUS_RESULT" | jq -r '.status')
    if [ "$STATUS" = "completed" ]; then
      ASSET_TOKEN=$(echo "$STATUS_RESULT" | jq -r '.token // empty')
      SVG_DATA=$(echo "$STATUS_RESULT" | jq -r '.svg // empty')
      FINAL_STATUS="completed"
      break
    elif [ "$STATUS" = "failed" ]; then
      FINAL_STATUS="failed"
      FAIL_ERROR=$(echo "$STATUS_RESULT" | jq -r '.error // "unknown"')
      break
    fi
    sleep $POLL_INTERVAL
  done

  if [ "$FINAL_STATUS" = "completed" ]; then
    SVG_LEN=${#SVG_DATA}
    pass "Job completed after polling (SVG: ${SVG_LEN} chars, token: $ASSET_TOKEN)"
  elif [ "$FINAL_STATUS" = "failed" ]; then
    fail "Job failed: $FAIL_ERROR"
  else
    fail "Job timed out after $((MAX_POLLS * POLL_INTERVAL))s (last status: $STATUS)"
  fi
else
  fail "Skipped (no job to poll)"
  ASSET_TOKEN=""
fi

# --- Test 6: Retrieve asset by token ---
echo "[6/8] GET /api/asset/{token}"
if [ -n "${ASSET_TOKEN:-}" ]; then
  ASSET_RESULT=$(curl -sf "$BASE_URL/api/asset/$ASSET_TOKEN" 2>/dev/null || echo '{"error":"request_failed"}')
  ASSET_SVG=$(echo "$ASSET_RESULT" | jq -r '.svg // empty')
  if [ -n "$ASSET_SVG" ] && echo "$ASSET_SVG" | grep -q '<svg'; then
    pass "Asset retrieved, contains valid SVG"
  else
    fail "Asset missing or invalid SVG"
  fi
else
  fail "Skipped (no asset token)"
fi

# --- Test 7: Asset 404 for invalid token ---
echo "[7/8] GET /api/asset/{invalid} -> 404"
ERR_RESULT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/asset/00000000-0000-0000-0000-000000000000")
if [ "$ERR_RESULT" = "404" ]; then
  pass "Returns 404 for unknown token"
else
  fail "Expected 404, got $ERR_RESULT"
fi

# --- Test 8: Job status 404 for invalid ID ---
echo "[8/8] GET /api/generate/{invalid}/status -> 404"
ERR_RESULT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/generate/nonexistent123/status")
if [ "$ERR_RESULT" = "404" ]; then
  pass "Returns 404 for unknown job"
else
  fail "Expected 404, got $ERR_RESULT"
fi

# --- Summary ---
echo ""
echo "======================================"
echo "Results: $PASSED/$TOTAL passed, $FAILED failed"
if [ "$FAILED" -gt 0 ]; then
  echo "SOME TESTS FAILED"
  exit 1
else
  echo "ALL TESTS PASSED"
  exit 0
fi
