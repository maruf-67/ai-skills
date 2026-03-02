---
name: express-v5-wrapper
description: Use for Express.js v5 backend tasks with TypeScript, layered architecture, validation, auth, and predictable API contracts.
---

# Express v5 Wrapper Skill

## When to use
Use for route/module creation, request validation, controller/service/model changes, middleware wiring, and API contract updates.

## Required routing
1. Apply core guidance from `../../../express/v5/SKILL.md`.
2. Add subskills as needed:
   - auth: `../../../express/v5/auth/SKILL.md`
   - routing: `../../../express/v5/routing/SKILL.md`
   - database: `../../../express/v5/database/SKILL.md`
   - logging: `../../../express/v5/logging/SKILL.md`
   - caching: `../../../express/v5/caching/SKILL.md`

## Do
- Keep flow: route -> validation -> controller -> service -> model.
- Keep controllers thin and services framework-agnostic.
- Preserve response envelope and shared error conventions.

## Don’t
- Don’t bypass validation middleware.
- Don’t duplicate auth extraction in controllers.
- Don’t introduce ad-hoc response shapes.
