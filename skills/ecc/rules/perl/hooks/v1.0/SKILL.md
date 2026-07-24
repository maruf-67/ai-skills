---
name: rule-perl-hooks
description: "ECC rule: hooks for perl"
type: Skill
title: hooks
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/perl/hooks.md
tags:
- ecc
- rule
- perl
timestamp: '2026-07-23T07:08:12Z'
---

---
paths:
  - "**/*.pl"
  - "**/*.pm"
  - "**/*.t"
  - "**/*.psgi"
  - "**/*.cgi"
---
# Perl Hooks

> This file extends [common/hooks.md](../common/hooks.md) with Perl-specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **perltidy**: Auto-format `.pl` and `.pm` files after edit
- **perlcritic**: Run lint check after editing `.pm` files

## Warnings

- Warn about `print` in non-script `.pm` files — use `say` or a logging module (e.g., `Log::Any`)

