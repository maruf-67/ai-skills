#!/usr/bin/env bash
set -euo pipefail

echo "Checking notification/socket conventions..."

grep -R "sendNotificationToUser\|getSocketIOInstance" -n src/modules src/config >/dev/null

echo "Notification convention checks passed"
