---
name: flutter-auth-jwt
description: Micro-skill for Flutter mobile JWT bearer authentication flows with refresh
  strategy and protected endpoint contracts.
type: Skill
title: flutter-auth-jwt
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/flutter/v3/auth-jwt/SKILL.md
tags:
- development
- flutter
- v3
- auth-jwt
timestamp: '2026-06-29T19:13:46Z'
---

# Flutter Auth (JWT)

## When to use

Use when Flutter app consumes token-first APIs that use JWT access tokens and refresh strategy.

## Do

- Keep access token short-lived and refresh controlled.
- Store tokens using secure storage and clear on logout/revoke.
- Keep refresh and retry behavior centralized in API client layer.

## Don't

- Do not mix JWT refresh logic with Sanctum session assumptions.
- Do not scatter token refresh logic across feature widgets.

## Related skills

- `../../../express/v5/auth/SKILL.md`
