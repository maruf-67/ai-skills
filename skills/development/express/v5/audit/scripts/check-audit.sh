#!/usr/bin/env bash
set -euo pipefail

echo "Checking audit conventions..."

grep -R "auditPlugin" -n src/modules/*/*.model.ts src/common/models/plugins >/dev/null

echo "Audit convention checks passed"
