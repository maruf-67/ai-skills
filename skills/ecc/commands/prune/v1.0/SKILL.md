---
name: cmd-prune
description: "Delete pending instincts older than 30 days that were never promoted"
type: Skill
title: prune
resource: file:///home/almaruf67/Codes/ai-os/ECC/commands/prune.md
tags:
- ecc
- command
timestamp: '2026-08-03T21:09:42Z'
---

# Prune Pending Instincts

Remove expired pending instincts that were auto-generated but never reviewed or promoted.

## Implementation

Run the instinct CLI using the plugin root path:

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/scripts/instinct-cli.py" prune
```

Or if `CLAUDE_PLUGIN_ROOT` is not set (manual installation):

```bash
python3 ~/.claude/skills/continuous-learning-v2/scripts/instinct-cli.py prune
```

## Usage

```
/prune                    # Delete instincts older than 30 days
/prune --max-age 60      # Custom age threshold (days)
/prune --dry-run         # Preview without deleting
```
