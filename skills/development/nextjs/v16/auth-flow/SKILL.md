---
name: auth-flow
description: "Cross-platform auth flow \u2014 Next.js (Sanctum SPA) \u2194 Laravel\
  \ (Sanctum) \u2194 Flutter (Sanctum token). Use when implementing or debugging authentication\
  \ across the digital-library stack."
type: Skill
title: auth-flow
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nextjs/v16/auth-flow/SKILL.md
tags:
- development
- nextjs
- v16
- auth-flow
timestamp: '2026-06-29T19:13:46Z'
---

# Auth Flow — Digital Library (Cross-Platform)

## Architecture Overview

```
[NEXT.JS]                          [LARAVEL]                         [FLUTTER]
Axios + withCredentials             Sanctum SPA + Token              Dio + Token header
  │                                    │                                │
  ├─ GET /sanctum/csrf-cookie ────────┤                                │
  ├─ POST /v1/front/login (XSRF) ─────┤                                │
  ├─ POST /v1/front/logout ───────────┤                                │
  │                                    ├─ POST /v1/front/auth/login ───┤ (token)
  │                                    ├─ POST /v1/front/auth/logout ──┤
  │                                    │                                │
  └─ Cookies: laravel_session ────────┘                                │
       XSRF-TOKEN                                                      │
                                                                       └─ Bearer token ─┘
```

## Next.js → Laravel (Sanctum SPA — Cookie-Based)

### CSRF Flow
1. Before any unsafe method (POST/PUT/PATCH/DELETE), check for `XSRF-TOKEN` cookie
2. If missing, `GET /sanctum/csrf-cookie` sets the `XSRF-TOKEN` encrypted cookie
3. Axios `withCredentials: true` + `withXSRFToken: true` auto-attaches `X-XSRF-TOKEN` header
4. On 419 (CSRF mismatch), auto-retry: re-fetch CSRF cookie + replay the request

### Login
```
SignInForm → useAuth().login(payload)
  → getCsrfCookie()               GET /sanctum/csrf-cookie
  → apiClient.post('/v1/front/login')   POST (XSRF-TOKEN header)
  → unwrapResponse() + Zod validation
  → setUser() + setAuthHint(true)   cookie auth_session_hint=true
```

### Session Check (Deferred)
- **Optimized**: On homepage (`/`) with NO `auth_session_hint` cookie → skip `/me` call entirely
- **Else**: `GET /v1/front/me` → Zod validate → set user or null
- **Entitlements**: When user is set, auto-fetch `GET /v1/front/library/entitlements`

### Route Protection
- **Server-side** (paid content only): Read cookies directly in Server Component → redirect to `/sign-in?next=...`
- **Client-side**: `useAuth()` → `isAuthenticated` → conditional render or `useEffect` redirect

### Logout
```
logout()
  → POST /v1/front/logout  (no CSRF pre-fetch needed)
  → setUser(null)
  → setAuthHint(false)
```

### Registration + OTP
```
POST /v1/front/register   → { unverified, email, expires_in_seconds, debug_otp }
POST /v1/front/auth/verify-email-otp     → { user }
POST /v1/front/auth/resend-verification-otp
```

### Google OAuth
```
loginWithGoogle()
  → GET /v1/front/auth/google/redirect → { url }
  → window.location.href = url
  → User returns to /google/callback?code=...&next=...
  → GET /v1/front/auth/google/callback?code=... → { user }
  → setUser() + redirect next
```

### API Client (`src/shared/api-client.ts`)
- Axios instance: `withCredentials: true`, `withXSRFToken: true`
- `getCsrfCookie()`: `GET /sanctum/csrf-cookie`
- Request interceptor: auto-fetch CSRF before unsafe methods
- Response interceptor: 419 → retry, 429 → toast rate limit
- `unwrapResponse()`: strips `{success, data, message, errors, version}` → returns `data`
- `extractApiError()`: normalizes Axios errors to `{status, message, errors}`

### Response Validation
- All auth responses validated at runtime with Zod (`src/lib/schemas/auth.schema.ts`)
- `validateResponse()` logs dev warnings but doesn't throw

## Laravel Sanctum (API Side)

### Configuration
- **Guard**: `sanctum` (SPA) + `sanctum-token` (token-based for Flutter)
- **CORS**: `supports_credentials: true` for SPA cookie sharing
- **Stateful Domains**: `app.book.dev.com`, `book.dev.com`

### SPA Endpoints (Cookie-Based)
```
GET  /sanctum/csrf-cookie         → sets XSRF-TOKEN cookie
POST /v1/front/login              → email/phone/username + password
POST /v1/front/logout             → invalidate session
GET  /v1/front/me                 → current user
```

### Token Endpoints (for Flutter)
```
POST /v1/front/auth/login         → { token, user }
POST /v1/front/auth/logout        → revoke current token
```

## Flutter → Laravel (Sanctum Token-Based)

### Login
```
Dio POST /v1/front/auth/login { email, password }
  → Response: { data: { token, user } }
  → Store token in secure storage
  → Attach as Bearer token to all subsequent requests
```

### Authenticated Requests
```dart
dio.options.headers['Authorization'] = 'Bearer $token';
```

### Logout
```
Dio POST /v1/front/auth/logout (Bearer token)
  → Server revokes token
  → Clear secure storage
```

## Auth Hint Cookie Pattern
- Next.js sets `auth_session_hint=true` cookie on successful login
- Checked on app load to avoid unnecessary 401 on homepage
- Cleared on logout
- Laravel session cookie names: `laravel_session`, `digital_library_session`

## Key Files

### Next.js
- `src/providers/auth-provider.tsx` — Auth context provider (200 lines)
- `src/shared/api-client.ts` — Axios + Sanctum CSRF interceptor (167 lines)
- `src/services/auth.service.ts` — API methods (198 lines)
- `src/types/auth.ts` — AuthUser type (114 lines)
- `src/components/features/auth/SignInForm.tsx` — Login form (191 lines)

### Laravel
- `routes/api/v1/front.php` — Auth route definitions
- `app/Http/Controllers/API/Front/AuthController.php`
- `config/sanctum.php` — Sanctum SPA + CORS config

### Flutter
- `lib/services/auth_service.dart` — Dio-based auth service
- `lib/providers/auth_provider.dart` — Auth state management
