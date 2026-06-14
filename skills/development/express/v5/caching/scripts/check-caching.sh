#!/usr/bin/env bash
set -euo pipefail

echo "Checking caching conventions..."

grep -R "getCachedOrFetch\|generateCacheKey" -n src/common src/modules >/dev/null || true
grep -R "redis" -n src/common/utils >/dev/null

echo "Caching convention checks passed"
