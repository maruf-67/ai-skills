---
name: state
description: Micro-skill for global state management using React Context API.
---

# State Management

## Context API Standard

The application uses React Context for all global states to avoid the overhead of heavy state libraries.

### Core Providers

All providers are initialized in the root `src/app/layout.tsx`.

1. **AuthContext**: Manages user sessions.
   - **State**: `user`, `isAuthenticated`, `loading`.
   - **Persistence**: Managed via `cookies-next`.
   - **Actions**: `login`, `logout`, `updateUser`.

2. **ThemeContext**: Handles brand-consistent dark/light modes.
   - **State**: `theme` ('light' | 'dark' | 'system'), `resolvedTheme`.
   - **Logic**: Injects `.dark` class and persists choice to `localStorage`.

3. **NotificationContext**: Orchestrates the notification center.
   - **State**: `notifications` array, `unreadCount`, `isConnected`.
   - **Actions**: `markAsRead`, `deleteNotification`, `fetchNotifications`.
   - **Integration**: Supports real-time updates (if implemented via WebSockets/SSE).

### Custom Hook Pattern

Always wrap `useContext` in a custom hook to provide a clean API and built-in safety checks.

```tsx
// src/contexts/FeatureContext.tsx
export function useFeature() {
    const context = useContext(FeatureContext);
    if (context === undefined) {
        throw new Error('useFeature must be used within a FeatureProvider');
    }
    return context;
}
```

## URL State
For dashboard views (filtering, pagination), prefer `useSearchParams` to keep the UI state in sync with the URL, allowing for shareable links.
