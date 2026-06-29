---
name: rules
description: Core coding standards, naming conventions, import boundaries, feature
  isolation rules, and validation rules for Next.js 16.
type: Skill
title: rules
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nextjs/v16/rules/SKILL.md
tags:
- development
- nextjs
- v16
- rules
timestamp: '2026-06-29T19:13:46Z'
---

# General Rules & Patterns

## Project Standards & Imports

- **Source Root**: All application code must be inside `src/`.
- **Absolute Path Aliases**: Usage of absolute path aliases (e.g., `@/components/`) is MANDATORY.
- **Parent-Relative Imports**: Parent-relative imports (`../`, `../../`) are strictly FORBIDDEN.
- **Naming**: 
  - Components: `PascalCase.tsx`
  - Hooks: `useCamelCase.ts`
  - Services/API: `camelCase.ts` or `camelCase.service.ts`

## Shared vs. Feature Matrix (The Rule of Three)

- **Default Scope:** All UI components, hooks, constants, types, and schemas MUST originate within `src/features/[feature]/`.
- **Promotion:** Any logic or component requested by 2 different features MUST be promoted to the global shared layer (e.g., `src/components/`, `src/hooks/`, `src/schemas/`).
- **Cross-Import Ban:** Direct imports between features are FORBIDDEN. Communication between features must happen through the shared layer or via prop-drilling at the page level.

## Code Segregation (Helpers vs. Lib)

- **Helpers:** Pure TypeScript functions that transform input to output without side effects. Helpers MUST NOT contain any package imports (e.g., `isBrowser()`).
- **Lib:** Contains configured instances of external libraries (axios, date-fns). Any custom functions or setups containing package imports belong in `src/lib/` (e.g., `isToday()` using date-fns).
- **Zod Schemas:** Feature-specific validation schemas must be placed in `features/[feature]/schemas/`. Both API/action layers and UI elements must import from this single source to prevent duplication.

## Technical Requirements & Boundaries

- **TypeScript**: Strict mode enabled. No `any`. Use specific interfaces or `unknown`.
- **No HTTP in UI:** The UI layer is FORBIDDEN from using `axios` or `fetch` directly. Components must only consume API hooks or actions defined inside the `features/[feature]/` layer.
- **Secret Isolation:** Use the `server-only` package in API, repository, and database files to prevent accidental leakages to the client.

## Quality & Automation Workflows (productivity scripts)

Leverage the standard automation tools configured in the boilerplate:
- **`pnpm run lint:fix`** (or `pnpm lint:fix`): Auto-fixes linting and formatting. Run this before committing.
- **`pnpm run knip`** (or `pnpm knip`): Automatically detects unused dependencies, files, and exports. Run periodically to reduce bundle size.
- **`pnpm run analyze`** (or `pnpm analyze`): Run bundle size analysis to optimize client-side weights.
- **`pnpm run commit`** (or `pnpm commit`): Use the Conventional Commits CLI to keep changelogs clean and automated.
