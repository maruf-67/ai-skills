#!/usr/bin/env bash
set -euo pipefail

echo "Checking component architecture conventions..."

grep -R "'use client'\|\"use client\"" -n src/components >/dev/null || true
grep -R "@/components/ui" -n src/components/features >/dev/null

echo "Component checks completed"
