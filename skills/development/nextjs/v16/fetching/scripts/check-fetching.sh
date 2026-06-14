#!/usr/bin/env bash
set -euo pipefail

echo "Checking fetching/service conventions..."

grep -R "@/lib/api" -n src/services >/dev/null
grep -R "from 'axios'" -n src/services && {
  echo "Raw axios import found in services";
  exit 1;
} || true

echo "Fetching checks completed"
