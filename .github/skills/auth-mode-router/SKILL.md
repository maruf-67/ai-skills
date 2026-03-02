---
name: auth-mode-router
description: Use to choose the correct auth skill combination across Next.js, Laravel, and Express without mixing incompatible browser auth patterns.
---

# Auth Mode Router Skill

## When to use
Use whenever login, session, token, guards, middleware, or protected API behavior is involved.

## Decision matrix
- Laravel v12 + Next.js v16 web SPA -> Sanctum session mode:
  - `../../../laravel/v12/auth-sanctum/SKILL.md`
  - `../../../nextjs/v16/auth/SKILL.md`
- Express v5 + Next.js v16 token-first APIs -> JWT/Bearer mode:
  - `../../../express/v5/auth/SKILL.md`
  - `../../../nextjs/v16/auth-jwt/SKILL.md`
- Mixed Laravel + Express -> scope auth by service boundary, do not merge patterns.

## Hard rules
1. Never store JWT browser-side for Sanctum-first SPA architecture unless explicitly required.
2. Keep CSRF/session expectations aligned with backend framework mode.
3. Keep token refresh/retry logic in shared service/client layers, not page-level duplicates.

## Canonical reference
- `../../../context.md` (Auth Mode Selection Matrix)
