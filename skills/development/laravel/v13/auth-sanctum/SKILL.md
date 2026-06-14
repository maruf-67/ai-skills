---
name: auth-sanctum
description: Use this for Laravel v13 authentication when web clients are SPA frontends and should use Sanctum session cookies, with PAT endpoints for mobile/desktop clients.
---

# Laravel v13 Authentication (Sanctum)

## When To Use
- First-party web SPA clients (Next.js/Vue/React) authenticate against Laravel.
- You need secure browser auth via session cookies.
- You also need mobile/desktop API access via personal access tokens.

## Core Model
- **Web**: Sanctum SPA stateful session (`statefulApi`, CSRF cookie flow, `withCredentials`).
- **Mobile/Desktop**: dedicated PAT issuance endpoints (`/token`) with expiry + device naming.

## Required Backend Setup
- Enable `statefulApi()` in `bootstrap/app.php` middleware config.
- Configure `SANCTUM_STATEFUL_DOMAINS` correctly.
- Set session cookie domain/security for your subdomain model.
- Keep CORS origins explicit and `supports_credentials=true`.

## Endpoint Pattern
- Web login endpoint creates authenticated session (no access token in JSON).
- Web logout invalidates session and regenerates CSRF token.
- PAT endpoint validates credentials + returns token for non-browser clients only.

## Security Defaults
- Add login throttling (`throttle:5,1` or stricter by risk profile).
- Do not store bearer tokens in browser JS for web SPA mode.
- Set PAT expiry and revoke controls (all/current/device).

## Do / Don’t
### Do
- Keep validation in Form Requests.
- Keep auth/domain logic in Services.
- Use guards/middleware consistently (`auth.api`, `user.type`, permissions).

### Don’t
- Return long-lived bearer tokens from web login/OAuth callback endpoints.
- Mix web token-in-localStorage with Sanctum session mode.
- Leave PATs without expiration or revocation strategy.
