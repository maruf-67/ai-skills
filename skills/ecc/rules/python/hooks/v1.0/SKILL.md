---
name: rule-python-hooks
description: "ECC rule: hooks for python"
type: Skill
title: hooks
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/python/hooks.md
tags:
- ecc
- rule
- python
timestamp: '2026-07-23T07:08:12Z'
---

---
paths:
  - "**/*.py"
  - "**/*.pyi"
---
# Python Hooks

> This file extends [common/hooks.md](../common/hooks.md) with Python specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **black/ruff**: Auto-format `.py` files after edit
- **mypy/pyright**: Run type checking after editing `.py` files

## Warnings

- Warn about `print()` statements in edited files (use `logging` module instead)

