#!/usr/bin/env bash
set -euo pipefail

echo "Checking logging/error-handling conventions..."

grep -R "AppError\|catchAsync" -n src/modules/*/*.controller.ts src/common >/dev/null

echo "Logging/error-handling convention checks passed"
