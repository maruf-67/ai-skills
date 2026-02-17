---
name: laravel-v12-social-login
description: Patterns for implementing social authentication using Laravel Socialite. Use this when working on Google login or adding new providers.
---

# Laravel v12 Social Login

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

## Key Constraints
- **User Types**: Distinguish between `admin` and `doctor` login flows if necessary, or default to `doctor` for public registration.
- **Stateless**: Use `Socialite::driver('google')->stateless()` for API-based auth.
- **Token Generation**: Return a Sanctum token upon successful login.

## Error Handling
- Use `api-responses` skill patterns.
- Handle `InvalidStateException` and provider errors gracefully.
