# Authentication

## AuthProvider

The application uses a custom `AuthProvider` (`src/contexts/AuthContext.tsx`) for managing session state.

- **State**: `user` (User object) and `isAuthenticated` (boolean).
- **Storage**: Cookies (`token`, `user`) via `cookies-next`.
- **Logic**: 
  - `login(user, token)`: Sets cookies and redirects.
  - `logout()`: Clears cookies and redirects to `/`.
  - Auto-initializes state from cookies on load.

## Usage

```tsx
'use client';
import { useAuth } from '@/contexts/AuthContext';

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

- Middleware (if present) or `layout.tsx` logic should protect routes.
- The `api` interceptor handles 401s by redirecting to `/login`.
