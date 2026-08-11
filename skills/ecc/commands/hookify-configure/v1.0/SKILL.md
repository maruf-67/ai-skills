---
name: cmd-hookify-configure
description: "Enable or disable hookify rules interactively"
type: Skill
title: hookify-configure
resource: file:///home/almaruf67/Codes/ai-os/ECC/commands/hookify-configure.md
tags:
- ecc
- command
timestamp: '2026-08-03T21:09:42Z'
---

Interactively enable or disable existing hookify rules.

## Steps

1. Find all `.claude/hookify.*.local.md` files
2. Read the current state of each rule
3. Present the list with current enabled / disabled status
4. Ask which rules to toggle
5. Update the `enabled:` field in the selected rule files
6. Confirm the changes
