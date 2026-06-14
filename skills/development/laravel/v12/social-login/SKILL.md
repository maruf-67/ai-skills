---
name: social-login
description: Patterns for implementing social authentication using Laravel Socialite. Use this when working on Google login or adding new providers.
---

# Laravel v12 Social Login

> Choose auth mode first:
> - Sanctum session web + PAT clients: `../auth-sanctum/SKILL.md`
> - JWT/Bearer token-first architecture: `../auth-jwt/SKILL.md`

This skill guides the implementation of social authentication using Laravel Socialite, specifically modeled after the project's `GoogleAuthController`.

## Core Implementation
- **Controller**: `App\Http\Controllers\API\GoogleAuthController` handles the OAuth flow.
- **Provider**: Uses `laravel/socialite`.

## Workflow
1.  **Redirect**: Frontend calls `redirectToGoogle` (returns JSON with auth URL).
2.  **Callback**: Google redirects to `handleGoogleCallback`.
3.  **User Creation/Linking**: 
    - Check if user exists by email.
    - If yes, link social account (update `google_id`, `avatar`).
    - If no, create new user with default `user_type` ('doctor' for frontend).
4.  **Web Session Finalization (Recommended)**:
    - Log user in via `Auth::guard('web')->login($user)`.
    - Regenerate session when available.
    - Return normalized user/role/permissions payload (no bearer token for web SPA).

5. **PAT Finalization (Non-browser Clients)**:
   - Use dedicated PAT issuance endpoint(s) for mobile/desktop clients.
   - Do not return long-lived bearer tokens from web OAuth callback endpoints.

## Key Constraints
- **User Types**: Distinguish between `admin` and `doctor` login flows if necessary, or default to `doctor` for public registration.
- **Stateless**: Use `Socialite::driver('google')->stateless()` for API-based auth.
- **Session First for Web**: Prefer Sanctum SPA session auth for web callbacks.
- **Token Generation**: Issue Sanctum PAT only from dedicated non-browser token endpoints.

## Error Handling
- Use `api-responses` skill patterns.
- Handle `InvalidStateException` and provider errors gracefully.
