#!/usr/bin/env bash
set -euo pipefail

echo "Running deployment quality checks..."

pnpm type-check
pnpm lint
pnpm validate:deployment

echo "Deployment checks completed"
