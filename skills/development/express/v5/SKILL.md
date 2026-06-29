---
name: express-v5-core
description: Use this when implementing or reviewing Node backend APIs with Express.js
  v5 and TypeScript. Covers route layering, validation, error handling, auth, and
  module-safe feature delivery.
type: Skill
title: express-v5-core
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/express/v5/SKILL.md
tags:
- development
- express
- v5
timestamp: '2026-06-29T19:13:46Z'
---

# Express.js v5 Core Skill

## Trigger Map
Use this skill when the task includes any of:
- Add/modify an API endpoint
- Create/update a module (`schema -> model -> service -> controller -> routes`)
- Add auth/permission checks
- Add shared middleware/util behavior

## Required Conventions
1. Keep request flow: `route -> validation -> controller -> service -> model -> response`.
2. Controllers remain thin and never hold business rules.
3. Services never depend on `req`/`res`.
4. Use typed helpers and shared utilities over repeated casts.
5. Prefer operational `AppError` for expected failures.

## Express v5 Notes
- Promise rejections in route handlers are propagated, but keep project wrappers like `catchAsync` when already standardized.
- Keep middleware ordering explicit (auth before permission, validation before controller).
- Preserve idempotency and access checks server-side.

## Do / Don’t
### Do
- Validate input at boundary (Zod/middleware).
- Enforce role/ownership in service layer.
- Return consistent response envelope via shared helpers.

### Don’t
- Bypass validation middleware.
- Add ad-hoc response formats.
- Duplicate auth extraction logic inside each controller.

## For New Features (Reusable Across Projects)
1. Define contract first (request/response + validation).
2. Add storage/model constraints.
3. Implement service with access and domain rules.
4. Keep controller mapping-only.
5. Wire routes with middleware in correct order.
6. Run lint/type-check/tests.
