# State Management

## Context API

We use React Context for global application state. Avoid external state libraries (Redux, Zustand) unless complexity demands it.

### Core Providers

All providers are wrapped in `src/app/layout.tsx`.

1. **AuthContext** (`src/contexts/AuthContext.tsx`)
   - Manages: `user`, `isAuthenticated`, `loading`.
   - Actions: `login`, `logout`, `updateUser`.
   - Persistence: Cookies (`token`, `user`).
   
2. **ThemeContext** (`src/contexts/ThemeContext.tsx`)
   - Manages: `theme` ('light' | 'dark' | 'system').
   - Logic: 
     - Detects system preference.
     - Toggles `.dark` class on `<html>` or `<body>`.
     - Persists to `localStorage`.

3. **SidebarContext** (`src/contexts/SidebarContext.tsx`)
   - Manages: `isCollapsed`.
   - Actions: `toggleSidebar`, `collapseSidebar`, `expandSidebar`.

4. **NotificationContext** (`src/contexts/NotificationContext.tsx`)
   - (Assumed based on naming) Likely manages toast notifications or a notification center state.

### Usage Pattern

Create a custom hook for each context to ensure type safety and handle `undefined` checks.

```tsx
// Pattern
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
```
