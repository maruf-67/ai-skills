---
name: flutter-auth-sanctum
description: Micro-skill for Flutter mobile integration with Laravel Sanctum PAT authentication and protected API usage.
---

# Flutter Auth (Sanctum PAT)

## When to use

Use when Flutter app consumes Laravel APIs using Sanctum personal access tokens.

## Do

- Issue and store PAT securely per device.
- Send `Authorization: Bearer <token>` for protected endpoints.
- Handle token revocation and logout cleanup deterministically.

## Don't

- Do not apply browser session cookie assumptions in Flutter mobile auth.
- Do not persist tokens in insecure storage.

## Related skills

- `../../../laravel/v13/auth-sanctum/SKILL.md`
