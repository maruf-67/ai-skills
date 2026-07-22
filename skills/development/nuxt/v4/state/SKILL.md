---
name: nuxt-v4-state
description: State management patterns for Nuxt 4+ using Pinia, useState, and composables.
  Covers global state, feature stores, SSR-safe state, and persistence.
type: Skill
title: nuxt-v4-state
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nuxt/v4/state/SKILL.md
tags:
- development
- nuxt
- v4
- state
- pinia
timestamp: '2026-07-22T00:00:00Z'
---

# State Management — Nuxt 4+

## Decision Matrix

| Scope | Tool | Use Case |
|-------|------|----------|
| Request-scoped | `useState` | SSR-safe state shared across components in one request |
| Feature-scoped | Pinia store | Domain state with actions, getters, persistence |
| Global app | Pinia store | Auth, theme, notifications |
| URL state | `useRoute()` / `useRouter()` | Filters, pagination, search queries |

## Pinia (Primary State Manager)

### Setup
```ts
// stores/auth.ts
import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
  role: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = useCookie('auth_token', { maxAge: 60 * 60 * 24 })

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function login(credentials: { email: string; password: string }) {
    const data = await $fetch<{ user: User; token: string }>('/api/auth/login', {
      method: 'POST',
      body: credentials,
    })
    user.value = data.user
    token.value = data.token
  }

  async function fetchUser() {
    if (!token.value) return
    try {
      user.value = await $fetch<User>('/api/auth/me', {
        headers: { Authorization: `Bearer ${token.value}` },
      })
    } catch {
      user.value = null
      token.value = null
    }
  }

  function logout() {
    user.value = null
    token.value = null
    return navigateTo('/login')
  }

  return { user, token, isAuthenticated, isAdmin, login, fetchUser, logout }
})
```

### Usage in Components
```vue
<script setup lang="ts">
const auth = useAuthStore()

// Auto-fetch user on app init
onMounted(() => auth.fetchUser())
</script>

<template>
  <div v-if="auth.isAuthenticated">
    <p>Welcome, {{ auth.user?.name }}</p>
    <button @click="auth.logout()">Logout</button>
  </div>
</template>
```

## useState (Nuxt-Scoped State)

### Pattern
```ts
// composables/useSelectedTeam.ts
export const useSelectedTeam = () => useState<string | null>('selected-team', () => null)
```

### Usage
```vue
<script setup lang="ts">
const selectedTeam = useSelectedTeam()

function selectTeam(teamId: string) {
  selectedTeam.value = teamId
}
</script>
```

## Feature Store Pattern

```ts
// stores/products.ts
export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const filters = ref({ search: '', category: '' })

  const filteredProducts = computed(() =>
    products.value.filter(p =>
      p.name.toLowerCase().includes(filters.value.search.toLowerCase()) &&
      (!filters.value.category || p.category === filters.value.category)
    )
  )

  async function fetchProducts() {
    loading.value = true
    try {
      products.value = await $fetch<Product[]>('/api/products', {
        query: filters.value,
      })
    } finally {
      loading.value = false
    }
  }

  async function createProduct(data: CreateProductInput) {
    const product = await $fetch<Product>('/api/products', {
      method: 'POST',
      body: data,
    })
    products.value.push(product)
    return product
  }

  return { products, loading, filters, filteredProducts, fetchProducts, createProduct }
})
```

## URL State (Dashboard Filtering)

```vue
<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const filters = computed({
  get: () => ({
    search: (route.query.search as string) || '',
    page: Number(route.query.page) || 1,
  }),
  set: (val) => {
    router.replace({ query: { ...route.query, ...val } })
  },
})
</script>
```

## SSR Safety Rules

- `useState` is SSR-safe; Pinia stores are SSR-safe when initialized per-request.
- Never use `ref()` at module scope for request-dependent data.
- Use `useCookie()` for persistence that must survive page refreshes.
- Initialize stores in `onMounted` or `onBeforeMount` for client-only data.

## Do / Don't

### Do
- Use Pinia for feature-scoped state with actions/getters.
- Use `useState` for request-scoped SSR-safe state.
- Use `useCookie` for persistence across refreshes.
- Keep stores small and focused on one domain.
- Use computed properties for derived state.

### Don't
- Do not put all state in one giant store.
- Do not use `ref()` at module scope for request data.
- Do not access `window` or `document` in stores without guarding.
- Do not mutate state outside of actions.
