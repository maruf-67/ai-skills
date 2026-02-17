#!/usr/bin/env bash
set -euo pipefail

echo "Checking auth conventions..."

grep -R "getRequiredUserId\|getRequiredUserRole" -n src/modules/*/*.controller.ts >/dev/null
grep -R "authenticateToken" -n src/modules/*/*.routes.ts >/dev/null

echo "Auth convention checks passed"
