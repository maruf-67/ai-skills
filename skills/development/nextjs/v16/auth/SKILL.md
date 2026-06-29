---
name: auth
description: Use this when implementing Sanctum SPA session authentication in Next.js
  v16 with App Router (Laravel + Next.js web clients).
type: Skill
title: auth
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nextjs/v16/auth/SKILL.md
tags:
- development
- nextjs
- v16
- auth
timestamp: '2026-06-29T19:13:46Z'
---

# Authentication

> If your project is token-first (Express + JWT / Bearer), use `nextjs/v16/auth-jwt/SKILL.md` instead.

## Auth Provider Pattern

Use a dedicated auth context (`src/contexts/AuthContext.tsx`) as the single UI auth state source.

- **State**: `user`, `loading`, and auth actions.
- **Web Session Model (Preferred)**: backend-managed httpOnly cookie/session + CSRF-protected credentialed requests.
- **Non-browser Model**: use PAT endpoints for mobile/desktop; do not mix bearer-token storage into web SPA flow.
- **Client Logic**:
    - `login()` establishes backend session and then fetches profile.
    - `logout()` performs backend logout and clears in-memory UI auth state.
    - initialize current user from trusted backend endpoint when app boots.

## Usage

```tsx
'use client';
import { useAuth } from '@/contexts';

export default function Dashboard() {
    const { user, logout } = useAuth();
    
    return (
        <div>
            <h1>Welcome, {user?.name}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
```

## Route Protection

- Protect private route groups at layout/middleware boundaries.
- Keep role checks server-trust-based (do not rely on UI-only role checks for security).
- Use API client interceptors for 401 redirect/session re-check behavior.

## Do / Don’t
### Do
- Keep auth API calls inside `src/services/*`.
- Use typed auth responses (`user`, `permissions`, `role`) and shared contracts.
- Set `withCredentials: true` and include CSRF flow (`/sanctum/csrf-cookie`) before state-changing auth calls.

### Don’t
- Store sensitive tokens in localStorage or JS-readable cookies when backend cookies are available.
- Call backend auth endpoints directly from random page components.
