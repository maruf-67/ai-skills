---
name: nextjs-v16
description: Use for Next.js 16 App Router tasks. Enforces server/client boundaries, routing contracts, cache strategy, and typed feature architecture.
---

# Next.js v16 Wrapper Skill

## When to use
Use for Next.js 16+ feature work, refactors, bug fixes, routing, data fetching, state, and styling tasks.

## Required routing
1. Apply Next.js 16 guidance from `../../../nextjs/v16/SKILL.md`.
2. Use micro-skills only as needed:
   - rules: `../../../nextjs/v16/rules/SKILL.md`
   - fetching: `../../../nextjs/v16/fetching/SKILL.md`
   - components: `../../../nextjs/v16/components/SKILL.md`
   - routing: `../../../nextjs/v16/routing/SKILL.md`
   - state: `../../../nextjs/v16/state/SKILL.md`
   - styling: `../../../nextjs/v16/styling/SKILL.md`

## Auth routing
- For Laravel SPA session auth use `../auth-mode-router/SKILL.md` -> Sanctum path.
- For token-first APIs use `../auth-mode-router/SKILL.md` -> JWT path.

## Do
- Keep App Router contracts and server/client boundaries explicit.
- Keep typed service and feature-layer patterns aligned with project structure.
- Prefer additive updates and stable public contracts.

## Don’t
- Don’t import Next 13/14 assumptions into Next 16 work.
- Don’t mix Sanctum browser session flow with JWT storage patterns unless architecture requires it.
