---
name: nuxt-v4-auth
description: Authentication patterns for Nuxt 4+ including Laravel Sanctum SPA cookies,
  JWT bearer tokens, route middleware guards, and session management. Covers both
  cookie-based and token-based auth with backend integration.
type: Skill
title: nuxt-v4-auth
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nuxt/v4/auth/SKILL.md
tags:
- development
- nuxt
- v4
- auth
- sanctum
timestamp: '2026-07-22T00:00:00Z'
---

# Nuxt v4+ Authentication & Security

## When to use
Use when implementing user login, token refresh interceptors, cookie authentication, or route-level middleware protection in Nuxt 4+ applications.

## Decision Matrix & Setup

| Backend | Auth Mode | Storage / Transportation | Setup |
|---|---|---|---|
| **Laravel v13** | Sanctum Session | Secure `httpOnly` Cookies | CSRF handshake before request; CORS enabled with credentials. |
| **Laravel v13** | Sanctum PAT | Bearer Token | Token stored in cookie or memory; `Authorization: Bearer <token>` header. |
| **Express/JWT** | JWT Bearer | `useCookie` token storage | Inject `Authorization: Bearer <token>` in header interceptors. |

## Laravel Sanctum SPA Integration

### Backend Requirements (Laravel v13)
```php
// bootstrap/app.php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->statefulApi();
})
```

```env
SANCTUM_STATEFUL_DOMAINS=your-domain.com,localhost:3000
FRONTEND_URL=http://localhost:3000
```

### Nuxt Client Configuration

#### `composables/useSanctumAuth.ts`
```ts
export function useSanctumAuth() {
  const config = useRuntimeConfig()
  const user = useState<User | null>('sanctum-user', () => null)
  const isLoggedIn = computed(() => !!user.value)

  async function login(credentials: { email: string; password: string }) {
    // Step 1: Get CSRF cookie
    await $fetch(`${config.public.backendUrl}/sanctum/csrf-cookie`, {
      credentials: 'include',
    })

    // Step 2: Submit login
    await $fetch(`${config.public.backendUrl}/v1/auth/login`, {
      method: 'POST',
      body: credentials,
      credentials: 'include',
    })

    // Step 3: Fetch user
    await fetchUser()
  }

  async function fetchUser() {
    try {
      user.value = await $fetch<User>(
        `${config.public.backendUrl}/v1/auth/me`,
        { credentials: 'include' }
      )
    } catch {
      user.value = null
    }
  }

  async function logout() {
    await $fetch(`${config.public.backendUrl}/v1/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    user.value = null
    return navigateTo('/login')
  }

  return { user, isLoggedIn, login, logout, fetchUser }
}
```

#### `nuxt.config.ts`
```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      backendUrl: process.env.BACKEND_URL || 'http://localhost:8000',
    },
  },
})
```

### Route Middleware: `middleware/auth.ts`
```ts
export default defineNuxtRouteMiddleware(async () => {
  const { isLoggedIn, fetchUser } = useSanctumAuth()

  if (!isLoggedIn.value) {
    await fetchUser()
    if (!isLoggedIn.value) {
      return navigateTo('/login')
    }
  }
})
```

### Page Usage
```vue
<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { user, logout } = useSanctumAuth()
</script>

<template>
  <div>
    <p>Welcome, {{ user?.name }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>
```

## JWT Bearer Token Integration

### `composables/useJwtAuth.ts`
```ts
export function useJwtAuth() {
  const config = useRuntimeConfig()
  const token = useCookie('auth_token', { maxAge: 60 * 60 * 24 })
  const user = useState<User | null>('jwt-user', () => null)
  const isLoggedIn = computed(() => !!token.value)

  async function login(credentials: { email: string; password: string }) {
    const data = await $fetch<{ token: string; user: User }>(
      `${config.public.backendUrl}/api/auth/login`,
      { method: 'POST', body: credentials }
    )
    token.value = data.token
    user.value = data.user
  }

  async function logout() {
    await $fetch(`${config.public.backendUrl}/api/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
    })
    token.value = null
    user.value = null
    return navigateTo('/login')
  }

  return { user, isLoggedIn, login, logout, token }
}
```

### `$fetch` with Auth Header
```ts
const { token } = useJwtAuth()

const data = await $fetch('/api/protected-resource', {
  headers: { Authorization: `Bearer ${token.value}` },
})
```

## Do
- Secure private pages using route middleware located in `middleware/auth.ts`.
- Fetch the user session when the application initializes (e.g. in `app.vue` or router lifecycle).
- Set `credentials: 'include'` on all `$fetch` configurations if using cookie-based auth.
- Clean up all local states, cookies, and cached data on logout.
- Use `useCookie` for token storage (SSR-aware, httpOnly when possible).
- Centralize auth status in a composable or store.

## Don't
- Do not store secret auth tokens in browser local storage. Always prefer cookies for client state storage.
- Do not replicate auth status checks inside widgets. Centralize it inside a composable or store.
- Do not expose secret client keys in frontend code; run sensitive requests through `server/api/` proxy routes.
- Do not mix web token-in-localStorage with Sanctum session mode.
- Do not leave tokens without expiration or revocation strategy.
