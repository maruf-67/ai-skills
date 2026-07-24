---
name: rule-typescript-hooks
description: "ECC rule: hooks for typescript"
type: Skill
title: hooks
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/typescript/hooks.md
tags:
- ecc
- rule
- typescript
timestamp: '2026-07-23T07:08:12Z'
---

---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
---
# TypeScript/JavaScript Hooks

> This file extends [common/hooks.md](../common/hooks.md) with TypeScript/JavaScript specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **Prettier**: Auto-format JS/TS files after edit
- **TypeScript check**: Run `tsc` after editing `.ts`/`.tsx` files
- **console.log warning**: Warn about `console.log` in edited files

## Stop Hooks

- **console.log audit**: Check all modified files for `console.log` before session ends

