---
name: auth-flow
description: Laravel Sanctum SPA + Token auth for digital-library. Covers cookie-based web auth and token-based mobile API auth with Next.js and Flutter clients.
---

# Auth Flow — Laravel Sanctum (API Side)

## Guard Strategy

Two Sanctum guards:
- **sanctum** (default) — SPA cookie-based for Next.js
- **sanctum-token** — Token-based for Flutter mobile

## SPA Configuration (Next.js)

### config/sanctum.php
```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'app.book.dev.com,book.dev.com')),
'guard' => 'web',
'expiration' => 525600, // 1 year
'token_prefix' => env('SANCTUM_TOKEN_PREFIX', ''),
```

### CORS (config/cors.php)
```php
'supports_credentials' => true,
'allowed_origins' => [env('FRONTEND_URL', 'http://app.book.dev.com')],
```

### SPA Endpoints
```
GET  /sanctum/csrf-cookie              → sets XSRF-TOKEN cookie
POST /v1/front/login                   → { email/phone/username, password, remember }
POST /v1/front/logout                  → invalidate session
GET  /v1/front/me                      → current user
POST /v1/front/register                → { name, email, phone, password }
POST /v1/front/auth/verify-email-otp   → verify email
POST /v1/front/auth/resend-verification-otp
```

### CSRF
- `XSRF-TOKEN` cookie set by `/sanctum/csrf-cookie`
- Client sends `X-XSRF-TOKEN` header (Axios `withXSRFToken: true`)
- 419 status = CSRF mismatch → client retries

## Token Auth Configuration (Flutter)

### Token Endpoints
```
POST /v1/front/auth/login    → { email, password } → { token, user }
POST /v1/front/auth/logout   → revoke current token
```

### Token Creation
```php
$token = $user->createToken('flutter-token')->plainTextToken;
```

### Token Validation
- Sanctum middleware on route groups
- `auth:sanctum` guard for SPA, token check for API
- Routes differentiate by prefix or middleware

## Auth Controller Structure
- `app/Http/Controllers/API/Front/AuthController.php`
- Login validates: `email` OR `phone` OR `username` + `password`
- Returns user resource + appropriate auth mechanism

## Session/Auth Hint
- Next.js sets `auth_session_hint=true` cookie on login
- Cleared on logout
- Avoids unnecessary `/me` calls for guests on homepage
- Laravel sessions tracked via `laravel_session` or `digital_library_session` cookie

## Route Protection
Laravel routes use `auth:sanctum` middleware for protected endpoints:
```php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    // ... other protected routes
});
```
