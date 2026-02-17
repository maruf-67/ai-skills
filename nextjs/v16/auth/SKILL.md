---
name: auth
description: Use this when implementing authentication/session flows in Next.js v16 with App Router and a backend-issued JWT/cookie model.
---

# Authentication

## Auth Provider Pattern

Use a dedicated auth context (`src/contexts/AuthContext.tsx`) as the single UI auth state source.

- **State**: `user`, `loading`, and auth actions.
- **Session Model**: Prefer backend-managed httpOnly cookie/session + secure exchange endpoint.
- **Client Logic**:
    - `login(user, accessToken)` updates local app state.
    - `logout()` clears state and performs backend/session cleanup.
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
- Use API client interceptors for 401 refresh/redirect fallback behavior.

## Do / Don’t
### Do
- Keep auth API calls inside `src/services/*`.
- Use typed auth responses (`accessToken`, `user`) and shared contracts.

### Don’t
- Store sensitive tokens in localStorage when backend cookies are available.
- Call backend auth endpoints directly from random page components.
