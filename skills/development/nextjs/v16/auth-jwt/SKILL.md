---
name: auth-jwt
description: Use this when implementing JWT / Bearer-token authentication in Next.js
  v16 (typically with Express or other token-first APIs).
type: Skill
title: auth-jwt
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nextjs/v16/auth-jwt/SKILL.md
tags:
- development
- nextjs
- v16
- auth-jwt
timestamp: '2026-06-29T19:13:46Z'
---

# Authentication (JWT / Bearer Mode)

## When To Use
- Backend issues access tokens in JSON responses.
- API expects `Authorization: Bearer <token>`.
- You are integrating token-first auth (e.g., Express + Next.js).

## Core Pattern
- Keep a dedicated auth context as the single UI auth state source.
- Keep token handling in a centralized API client/service layer.
- Use response interceptors to handle 401 and optional refresh logic.

## Storage Guidance
- Prefer in-memory state first when possible.
- If persistence is required, prefer secure backend cookie strategies over localStorage.
- Never mix JWT storage patterns into Sanctum SPA session projects unless explicitly required.

## Route Protection
- Guard routes via layout/middleware and context state checks.
- Treat backend authorization as the source of truth.

## Do / Don’t
### Do
- Keep auth calls in service layer (`src/services/*`).
- Use typed response contracts for token and user payloads.
- Centralize refresh/retry logic in one API client.

### Don’t
- Scatter token parsing/storage logic across page components.
- Rely on frontend role checks for security decisions.
- Store sensitive long-lived tokens in localStorage unless there is no secure backend cookie option.
