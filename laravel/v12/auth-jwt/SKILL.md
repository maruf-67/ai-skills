---
name: auth-jwt
description: Use this for Laravel v12 token-first authentication where API clients authenticate using JWT/Bearer tokens rather than Sanctum SPA sessions.
---

# Laravel v12 Authentication (JWT / Bearer)

## When To Use
- API is explicitly JWT/Bearer token-first.
- Clients are mostly mobile, desktop, third-party, or server-to-server.
- Session-cookie SPA auth is not the primary web model.

## Core Model
- Login issues access token (and refresh token if architecture supports it).
- Protected routes require `Authorization: Bearer <token>`.
- Refresh/revocation strategy is mandatory for production readiness.

## Required Patterns
- Keep token issuance/refresh/revocation in dedicated service layer.
- Define token TTL policy and rotation behavior explicitly.
- Add rate limiting to login/refresh endpoints.
- Ensure robust invalidation on logout/password reset/security events.

## Security Defaults
- Separate access and refresh token lifetimes.
- Store refresh tokens securely (hashed/persisted when applicable).
- Never rely on frontend-only token validation for authorization.

## Do / Don’t
### Do
- Keep Form Requests + service-driven auth flow.
- Return typed payloads and consistent error responses.
- Add targeted auth tests for login, refresh, logout, and invalid-token paths.

### Don’t
- Use JWT browser storage when secure session-cookie model is available and preferred.
- Leave refresh endpoints unthrottled.
- Use indefinite token lifetimes without compensating controls.
