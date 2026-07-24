---
name: cmd-hookify-list
description: "List all configured hookify rules"
type: Skill
title: hookify-list
resource: file:///home/almaruf67/Codes/ai-os/ECC/commands/hookify-list.md
tags:
- ecc
- command
timestamp: '2026-07-23T07:08:12Z'
---

Find and display all hookify rules in a formatted table.

## Steps

1. Find all `.claude/hookify.*.local.md` files
2. Read each file's frontmatter:
   - `name`
   - `enabled`
   - `event`
   - `action`
   - `pattern`
3. Display them as a table:

| Rule | Enabled | Event | Pattern | File |
|------|---------|-------|---------|------|

4. Show the rule count and remind the user that `/hookify-configure` can change state later.
