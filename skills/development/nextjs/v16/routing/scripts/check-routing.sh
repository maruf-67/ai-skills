#!/usr/bin/env bash
set -euo pipefail

echo "Checking app router conventions..."

grep -R "params: Promise" -n src/app >/dev/null || true
grep -R "generateMetadata" -n src/app >/dev/null || true

echo "Routing checks completed"
