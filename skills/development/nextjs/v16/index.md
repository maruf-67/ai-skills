# Next.js v16+ Skills

This guide covers standardized patterns for Next.js 16 projects using the App Router with a domain-driven, modular architecture.


## Contents

- [Core Skill (trigger-based)](./SKILL.md)
- [General Rules & Patterns](./rules/SKILL.md)
- [Data Fetching & Services](./fetching/SKILL.md)
- [Component Architecture](./components/SKILL.md)
- [Authentication (Sanctum SPA Session)](./auth/SKILL.md)
- [Authentication (JWT / Bearer)](./auth-jwt/SKILL.md)
- [Page Routing](./routing/SKILL.md)
- [State Management](./state/SKILL.md)
- [Styling & Theming](./styling/SKILL.md)

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
