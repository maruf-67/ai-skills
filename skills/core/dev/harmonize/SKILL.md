---
name: harmonize
version: "1.0.0"
description: "Runs native linters and performs an 'Architectural Polish' to ensure unified coding style across Laravel and Nuxt. Triggers on /ai-os:dev-harmonize."
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
- Frontend: Run `npm run lint` or `npx eslint --fix`.

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
