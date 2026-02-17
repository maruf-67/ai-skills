#!/usr/bin/env bash
set -euo pipefail

MODULE_NAME="${1:-}"
if [[ -z "$MODULE_NAME" ]]; then
  echo "Usage: $0 <module-name>"
  exit 1
fi

BASE="src/modules/$MODULE_NAME"
required=(
  "$BASE/$MODULE_NAME.schema.ts"
  "$BASE/$MODULE_NAME.model.ts"
  "$BASE/$MODULE_NAME.service.ts"
  "$BASE/$MODULE_NAME.controller.ts"
  "$BASE/$MODULE_NAME.routes.ts"
)

for file in "${required[@]}"; do
  [[ -f "$file" ]] || { echo "Missing: $file"; exit 1; }
done

echo "Structure OK for module: $MODULE_NAME"
