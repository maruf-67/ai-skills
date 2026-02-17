#!/usr/bin/env bash
set -euo pipefail

echo "Checking auth/session conventions..."

grep -R "useAuth" -n src/app src/components src/contexts >/dev/null
grep -R "auth.service" -n src/services src/app >/dev/null || true

echo "Auth checks completed"
