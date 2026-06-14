#!/usr/bin/env bash
set -euo pipefail

echo "Checking database/model conventions..."

grep -R "new Schema" -n src/modules/*/*.model.ts >/dev/null

echo "Model schema definitions detected"
