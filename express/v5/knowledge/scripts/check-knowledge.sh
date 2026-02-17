#!/usr/bin/env bash
set -euo pipefail

echo "Checking knowledge module conventions..."

grep -R "allowedUsers\|isPublic\|created_by" -n src/modules/knowledge >/dev/null

echo "Knowledge convention checks passed"
