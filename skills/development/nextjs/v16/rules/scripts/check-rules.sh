#!/usr/bin/env bash
set -euo pipefail

echo "Running core rules checks..."

grep -R "from 'axios'" -n src/app src/components && {
  echo "Direct axios import found in UI layer";
  exit 1;
} || true

pnpm type-check

echo "Rules checks completed"
