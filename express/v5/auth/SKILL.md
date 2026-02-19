---
name: express-v5-auth
description: Use this when implementing token auth, OAuth flows, and permission-safe request handling in Express v5.
---

# Authentication & Security

## Trigger
Use this when implementing login flows, token guards, role checks, or OAuth callbacks.

## Best Practices
- Use dual-token auth (short-lived access + long-lived refresh token).
- Keep refresh tokens in secure `httpOnly` cookies.
- Enforce domain and role restrictions server-side.
- Centralize auth context extraction and permission checks.
- Block revoked tokens via blacklist/cache checks.

## Your Usage (portal-api)
- JWT middleware in `src/common/middlewares/authMiddleware.ts`.
- Google OAuth via Passport with callback exchange flow (state-based handoff).
- Shared auth extraction in `src/common/utils/authRequest.ts`.
- Role model remains `admin | user` and checks are enforced in backend services/controllers.

## Reusable Blueprint
1. Verify token and attach typed auth user context.
2. Enforce role/ownership constraints before service mutation.
3. Use shared helpers (`getRequiredUserId`, `getRequiredUserRole`) in controllers.
4. Return normalized auth/session response.

## Avoid
- Putting sensitive tokens in redirect query strings.
- Duplicating auth parsing logic in every module.
- Trusting client role/ownership claims without server validation.
