#!/usr/bin/env bash
set -euo pipefail

echo "Checking context/state conventions..."

grep -R "createContext" -n src/contexts >/dev/null
grep -R "useContext" -n src/contexts >/dev/null

echo "State checks completed"
