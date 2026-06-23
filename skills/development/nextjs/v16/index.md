# Next.js v16+ Skills

This guide covers standardized patterns for Next.js 16 projects using the App Router with a domain-driven, modular architecture.

## Package Manager

**Always use `pnpm`** — never npm or yarn.

```bash
pnpm install          # install dependencies
pnpm add <package>    # add a package
pnpm dlx <tool>       # run one-shot tool (replaces npx)
pnpm dev              # start dev server
pnpm build            # production build
```

## New Project Bootstrap

For **new projects**, start from the ViraStack production boilerplate:
- [Boilerplate Scaffold](./boilerplate/SKILL.md) — clone, configure, and go

## Contents

- [Core Skill (trigger-based)](./SKILL.md)
- [New Project Boilerplate](./boilerplate/SKILL.md)
- [General Rules & Patterns](./rules/SKILL.md)
- [Data Fetching & Services](./fetching/SKILL.md)
- [Caching & Cache Components](./cache/SKILL.md)
- [Component Architecture](./components/SKILL.md)
- [Authentication (Sanctum SPA Session)](./auth/SKILL.md)
- [Authentication (JWT / Bearer)](./auth-jwt/SKILL.md)
- [Page Routing](./routing/SKILL.md)
- [State Management](./state/SKILL.md)
- [Styling & Theming](./styling/SKILL.md)
- [Reader Module](./reader/SKILL.md)

## Subskill Support Files

Each subskill folder includes:
- `SKILL.md` for assignment and execution rules
- `assets/` for reusable typed templates
- `references/` for project-aligned file mappings
- `scripts/` for quick convention checks

## Feature Delivery Checklist (Reusable)
1. Define feature types/contracts.
2. Add or extend service functions.
3. Add hook/context orchestration as needed.
4. Implement feature components with shared UI primitives.
5. Wire pages/routes with explicit server/client boundaries.
6. Validate with lint + type-check + relevant tests.
