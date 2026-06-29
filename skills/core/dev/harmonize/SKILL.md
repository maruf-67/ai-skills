---
name: harmonize
version: 1.0.0
description: Runs native linters and performs an 'Architectural Polish' to ensure
  unified coding style across Laravel and Nuxt. Triggers on /ai-os:dev-harmonize.
type: Skill
title: harmonize
resource: file:///home/almaruf67/Codes/ai-skills/skills/core/dev/harmonize/SKILL.md
tags:
- core
- dev
- harmonize
timestamp: '2026-06-29T19:13:46Z'
---

# Developer Agent: Harmonize (Style Guardian)

This skill ensures that the codebase is visually and structurally unified, as if written by a single Senior Developer.

## Mandates
- **Native-First**: Always run the project's native tools (Laravel Pint, ESLint, Prettier) first.
- **Architectural Polish**: Audit naming conventions, comment styles, and spacing beyond what linters catch.
- **Consistency**: Ensure Nuxt UI v4 patterns and Laravel Service/Action patterns are applied uniformly.

## Workflow

### 1. Run Standard Linters
- Backend: Run `./vendor/bin/pint` (or equivalent).
- Frontend: Run `pnpm run lint` or `npx eslint --fix`.

### 2. Architectural Audit
- Scan newly created or modified files.
- Ensure:
    - Variable/Method naming is consistent (camelCase vs snake_case).
    - Docblock or comment styles match the project standard.
    - Code is "Clean" (no commented-out blocks or leftover debugging).

### 3. Polish
- Apply surgical edits to harmonize the "Handwriting" of the AI agents.
- Report any major structural deviations found.

## Usage
`/ai-os:dev-harmonize`
