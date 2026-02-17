#!/usr/bin/env bash
set -euo pipefail

echo "Checking styling/theme conventions..."

grep -R "from '@/lib/utils'" -n src/components src/app >/dev/null || true
grep -R "ThemeContext" -n src/contexts src/app >/dev/null

echo "Styling checks completed"
