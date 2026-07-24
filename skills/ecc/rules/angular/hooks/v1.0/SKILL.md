---
name: rule-angular-hooks
description: "ECC rule: hooks for angular"
type: Skill
title: hooks
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/angular/hooks.md
tags:
- ecc
- rule
- angular
timestamp: '2026-07-23T07:08:11Z'
---

---
paths:
  - "**/*.component.ts"
  - "**/*.component.html"
  - "**/*.service.ts"
  - "**/*.directive.ts"
  - "**/*.pipe.ts"
  - "**/*.spec.ts"
---
# Angular Hooks

> This file extends [common/hooks.md](../common/hooks.md) with Angular specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **Prettier**: Auto-format `.ts` and `.html` files after edit
- **ESLint / ng lint**: Run `ng lint` after editing Angular source files to catch decorator misuse, template errors, and style violations
- **TypeScript check**: Run `tsc --noEmit` after editing `.ts` files
- **Build check**: Run `ng build` after generating or significantly changing Angular code to catch template and type errors early

## Stop Hooks

- **Lint audit**: Run `ng lint` across modified files before session ends to catch any outstanding violations

