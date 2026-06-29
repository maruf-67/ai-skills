---
name: nuxt-v3-auth
description: Auth patterns for Nuxt v3 including middleware guards, Laravel Sanctum
  cookies, and JWT storage.
type: Skill
title: nuxt-v3-auth
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nuxt/v3/auth/SKILL.md
tags:
- development
- nuxt
- v3
- auth
timestamp: '2026-06-29T19:13:46Z'
---

# Nuxt v3 Authentication & Security

## When to use
Use when implementing user login, token refresh interceptors, cookie authentication, or route-level middleware protection.

## Decision Matrix & Setup

| Backend | Auth Mode | Storage / Transportation | Setup |
|---|---|---|---|
| **Laravel v12/v13** | Sanctum Session | Secure `httpOnly` Cookies | CSRF handshake before request; CORS enabled with credentials. |
| **Express v5** | JWT Bearer | `useCookie` token storage | Inject `Authorization: Bearer <token>` in header interceptors. |

## Do
- Secure private pages using route middleware located in `middleware/auth.ts`.
- Fetch the user session when the application initializes (e.g. in `app.vue` or router lifecycle).
- Set `credentials: 'include'` on all `$fetch` configurations if using cookie-based auth.
- Clean up all local states, cookies, and cached data on logout.

## Don't
- Do not store secret auth tokens in browser local storage. Always prefer cookies for client state storage.
- Do not replicate auth status checks inside widgets. Centralize it inside Pinia or Reactivity helpers.
- Do not expose secret client keys in frontend code; run sensitive requests through `server/api/` proxy routes.

## Minimal correct pattern

### Auth Route Guard: `middleware/auth.ts`
```ts
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  
  if (!authStore.isAuthenticated) {
    return navigateTo('/login', { replace: true });
  }
});
```

### Pinia Auth Store using cookie state: `stores/auth.ts`
```ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any | null>(null);
  const tokenCookie = useCookie('auth_token', { maxAge: 60 * 60 * 24 }); // 24hr

  const isAuthenticated = computed(() => !!tokenCookie.value);

  async function login(credentials: Record<string, string>) {
    const data = await $fetch<any>('/api/v1/auth/login', {
      method: 'POST',
      body: credentials
    });
    
    tokenCookie.value = data.token;
    user.value = data.user;
  }

  function logout() {
    tokenCookie.value = null;
    user.value = null;
    return navigateTo('/login');
  }

  return { user, isAuthenticated, login, logout };
});
```
