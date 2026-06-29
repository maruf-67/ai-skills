---
name: auth-flow
description: Flutter Sanctum token-based auth for digital-library mobile app. Use
  when implementing or debugging mobile authentication against the Laravel API.
type: Skill
title: auth-flow
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/flutter/v3/auth-flow/SKILL.md
tags:
- development
- flutter
- v3
- auth-flow
timestamp: '2026-06-29T19:13:46Z'
---

# Auth Flow — Flutter Mobile (Sanctum Token)

## Architecture

Unlike the Next.js web client (cookie-based Sanctum SPA), the Flutter app uses **token-based authentication** against the Laravel API.

## Login Flow

```
LoginScreen
  → AuthProvider.login(email, password)
    → Dio POST /v1/front/auth/login { email, password }
      → Response: { data: { token, user } }
    → Store token in secure storage (flutter_secure_storage)
    → Set Dio default header: Authorization: Bearer $token
    → Set user in provider state
    → Navigate to home
```

### Token Storage
- **flutter_secure_storage** for the plain-text Sanctum token
- Never stored in SharedPreferences or in-memory only
- Cleared on logout or token expiry

### Authenticated Requests
```dart
final dio = Dio(BaseOptions(
  baseUrl: apiUrl,
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer $token',
  },
));
```

## Logout Flow
```
Logout
  → AuthProvider.logout()
    → Dio POST /v1/front/auth/logout (Bearer token)
      → Server revokes current Sanctum token
    → Clear secure storage
    → Clear provider state
    → Navigate to login screen
```

## Token Endpoints (Laravel)
```
POST /v1/front/auth/login    → { email, password } → { token, user }
POST /v1/front/auth/logout   → revoke current token
GET  /v1/front/me            → current user (token-auth)
```

## Register Flow
```
RegisterScreen
  → AuthProvider.register(name, email, phone, password)
    → Dio POST /v1/front/register { name, email, phone, password }
    → Navigate to OTP verification screen
    → OTP verified → auto-login (token issued)
```

## Route Protection
- App uses a `AuthGuard` or redirect logic in the router
- Unauthenticated users see login/register screens
- Authenticated users see main app content
- Token expiry → redirect to login

## Key Differences from Web (Next.js) Auth
| Aspect | Web (Next.js) | Mobile (Flutter) |
|--------|---------------|-------------------|
| Auth mechanism | Sanctum SPA (cookies) | Sanctum token |
| CSRF | Required (XSRF-TOKEN) | Not needed |
| Credentials transport | Cookies (auto) | Bearer header (explicit) |
| Session management | Laravel session cookie | Token in secure storage |
| Login endpoint | POST /v1/front/login | POST /v1/front/auth/login |
| Logout endpoint | POST /v1/front/logout | POST /v1/front/auth/logout |
| Route guard | Server cookies or auth context | Token existence check |

## Related Files (Flutter)
- `lib/services/auth_service.dart` — Dio-based auth API
- `lib/providers/auth_provider.dart` — Auth state management
- `lib/screens/auth/login_screen.dart` — Login UI
- `lib/config/dio_config.dart` — Dio client factory with token interceptor
