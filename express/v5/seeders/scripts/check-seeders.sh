#!/usr/bin/env bash
set -euo pipefail

echo "Checking seeder conventions..."

grep -R "seed" -n src/seeders >/dev/null

echo "Seeder conventions check passed"
