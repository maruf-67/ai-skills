#!/usr/bin/env bash
set -euo pipefail

echo "Checking routing/controller conventions..."

grep -R "catchAsync" -n src/modules/*/*.controller.ts >/dev/null
grep -R "sendSuccess" -n src/modules/*/*.controller.ts >/dev/null

echo "Routing/controller convention checks passed"
