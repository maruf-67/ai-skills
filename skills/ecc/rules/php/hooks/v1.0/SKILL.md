---
name: rule-php-hooks
description: "ECC rule: hooks for php"
type: Skill
title: hooks
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/php/hooks.md
tags:
- ecc
- rule
- php
timestamp: '2026-07-23T07:08:12Z'
---

---
paths:
  - "**/*.php"
  - "**/composer.json"
  - "**/phpstan.neon"
  - "**/phpstan.neon.dist"
  - "**/psalm.xml"
---
# PHP Hooks

> This file extends [common/hooks.md](../common/hooks.md) with PHP specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **Pint / PHP-CS-Fixer**: Auto-format edited `.php` files.
- **PHPStan / Psalm**: Run static analysis after PHP edits in typed codebases.
- **PHPUnit / Pest**: Run targeted tests for touched files or modules when edits affect behavior.

## Warnings

- Warn on `var_dump`, `dd`, `dump`, or `die()` left in edited files.
- Warn when edited PHP files add raw SQL or disable CSRF/session protections.

