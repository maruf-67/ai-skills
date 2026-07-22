---
name: nuxt-v4-data-fetching
description: Data fetching hierarchy for Nuxt 4+ — useFetch for SSR page data, $fetch for
  client actions, and axios for complex interceptor needs. Covers token injection, FormData
  handling, error interceptors, and migration patterns.
type: Skill
title: nuxt-v4-data-fetching
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nuxt/v4/data-fetching/SKILL.md
tags:
- development
- nuxt
- v4
- data-fetching
- useFetch
- fetch
- axios
timestamp: '2026-07-22T00:00:00Z'
---

# Data Fetching Hierarchy — Nuxt 4+

## Decision Matrix

| Tool | When to Use | SSR Safe | Bundle Cost |
|------|-------------|----------|-------------|
| **`useFetch`** | Initial page data loading | Yes (payload transfer) | 0 KB (built-in) |
| **`useAsyncData`** | Custom logic, SDK calls, shared cache | Yes (payload transfer) | 0 KB (built-in) |
| **`$fetch`** | Form submissions, click handlers, mutations | No (runs twice on SSR) | 0 KB (built-in) |
| **`$fetch` (in server)** | Server API routes, server middleware | N/A | 0 KB (built-in) |
| **Axios** | Complex interceptors, retry logic, upload progress | No | ~13 KB minified |

## Rule of Thumb

```
Page loads data     → useFetch
User clicks/submits → $fetch
Need interceptors   → axios (or wrap $fetch)
```

---

## 1. `useFetch` — SSR Page Data (Recommended Default)

### Basic Usage
```vue
<script setup lang="ts">
const { data: products, status, error } = await useFetch('/api/products')
</script>

<template>
  <div v-if="status === 'pending'">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <div v-else>
    <div v-for="p in products" :key="p.id">{{ p.name }}</div>
  </div>
</template>
```

### With Query Parameters (Reactive)
```vue
<script setup lang="ts">
const page = ref(1)
const search = ref('')

const { data, status } = await useFetch('/api/products', {
  query: { page, search },
})
</script>
```

### Deferred Request (Client-Only Trigger)
```vue
<script setup lang="ts">
const { data, status, execute } = await useFetch('/api/products', {
  immediate: false,
})

// Trigger manually
onMounted(() => execute())
</script>
```

### Watch Sources (Auto-Refetch)
```vue
<script setup lang="ts">
const filters = ref({ category: '', status: '' })

const { data } = await useFetch('/api/products', {
  query: filters,
  watch: [filters],
})
</script>
```

### Transform Response
```vue
<script setup lang="ts">
const { data: products } = await useFetch('/api/products', {
  transform: (res) => res.data.map(p => ({
    id: p.id,
    label: `${p.name} - $${p.price}`,
  })),
})
</script>
```

---

## 2. `$fetch` — Client-Side Actions (Mutations)

### Form Submission
```vue
<script setup lang="ts">
const form = reactive({ name: '', email: '' })
const loading = ref(false)

async function handleSubmit() {
  loading.value = true
  try {
    await $fetch('/api/users', {
      method: 'POST',
      body: form,
    })
    navigateTo('/users')
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.name" />
    <input v-model="form.email" type="email" />
    <button type="submit" :disabled="loading">Submit</button>
  </form>
</template>
```

### With Auth Token
```vue
<script setup lang="ts">
const token = useCookie('auth_token')

async function fetchData() {
  const data = await $fetch('/api/products', {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  })
  return data
}
</script>
```

### FormData Upload
```vue
<script setup lang="ts">
async function uploadFile(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('name', 'My File')

  await $fetch('/api/upload', {
    method: 'POST',
    body: formData,
    // Do NOT set Content-Type — browser sets it with boundary
  })
}
</script>
```

### Delete with Confirmation
```vue
<script setup lang="ts">
async function deleteProduct(id: number) {
  if (!confirm('Are you sure?')) return

  await $fetch(`/api/products/${id}`, {
    method: 'DELETE',
  })
}
</script>
```

---

## 3. Axios — Complex Interceptor Needs

### When to Use Axios Over $fetch

- Request/response interceptors (token injection, error handling)
- Automatic retry logic
- Upload progress tracking
- Request cancellation with `AbortController` patterns
- Complex error transformation

### Setup: `composables/useApi.ts`

```ts
import axios from 'axios'
import { useCookie } from '#app'
import { useRuntimeConfig } from '#app'

export const useApi = () => {
  const config = useRuntimeConfig()
  const token = useCookie('token').value || ''
  const baseURL = config.public.apiUrl

  const api = axios.create({
    baseURL,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  // Request interceptor — dynamic Content-Type
  api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'] // browser sets boundary
    } else {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  })

  // Response interceptor — error handling
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status

      if (status === 422) {
        const messages = Object.values(error.response.data.data).flat().join('\n')
        throw new Error(messages)
      }

      if (status === 401) {
        useCookie('token').value = null
        navigateTo('/login')
        throw new Error('Unauthorized')
      }

      throw error
    }
  )

  return api
}
```

### Usage in Components
```vue
<script setup lang="ts">
const api = useApi()

// GET with params
const { data } = await api.get('/products', {
  params: { page: 1, search: 'cat' },
})

// POST with body
await api.post('/products', { name: 'New Product' })

// POST with FormData
const formData = new FormData()
formData.append('image', file)
await api.post('/products/upload', formData)

// DELETE
await api.delete(`/products/${id}`)
```

---

## Migration Path: Axios → $fetch

### Before (Axios)
```ts
const api = axios.create({ baseURL: '/api' })
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token.value}`
  return config
})

const data = await api.get('/products', { params: { page: 1 } })
// Returns: { data: { data: [...], meta: {...} }, status: 200, ... }
```

### After ($fetch with wrapper)
```ts
// composables/useApi.ts
export function useApi() {
  const config = useRuntimeConfig()
  const token = useCookie('auth_token')

  async function request<T>(url: string, options?: any): Promise<T> {
    return await $fetch<T>(url, {
      baseURL: config.public.apiUrl,
      headers: {
        Authorization: token.value ? `Bearer ${token.value}` : undefined,
      },
      ...options,
    })
  }

  return { request }
}

// Usage
const { request } = useApi()
const data = await request('/products', { params: { page: 1 } })
```

### Key Differences

| Aspect | Axios | $fetch |
|--------|-------|--------|
| Response shape | `{ data, status, headers }` | Direct data (or raw response) |
| Error handling | `.catch(err => err.response.data)` | `catch(err => err.data)` |
| Interceptors | Built-in | Manual wrapper |
| FormData | Auto Content-Type | Manual (don't set header) |
| SSR payload | Not transferred | Not transferred (use `useFetch` instead) |

---

## Auth Pattern: Sanctum SPA with $fetch

```ts
// composables/useSanctum.ts
export function useSanctum() {
  const config = useRuntimeConfig()
  const user = useState('sanctum-user', () => null)

  async function login(email: string, password: string) {
    // 1. Get CSRF cookie
    await $fetch(`${config.public.backendUrl}/sanctum/csrf-cookie`, {
      credentials: 'include',
    })

    // 2. Submit login
    await $fetch(`${config.public.backendUrl}/v1/auth/login`, {
      method: 'POST',
      body: { email, password },
      credentials: 'include',
    })

    // 3. Fetch user
    await fetchUser()
  }

  async function fetchUser() {
    try {
      user.value = await $fetch(`${config.public.backendUrl}/v1/auth/me`, {
        credentials: 'include',
      })
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
    navigateTo('/login')
  }

  return { user, login, logout, fetchUser }
}
```

---

## Complete CRUD Composable Pattern

```ts
// composables/useCrud.ts
export function useCrud<T>(resource: string) {
  const config = useRuntimeConfig()
  const token = useCookie('auth_token')

  const headers = computed(() => ({
    Authorization: token.value ? `Bearer ${token.value}` : undefined,
  }))

  async function list(params?: Record<string, any>) {
    return await $fetch<{ data: T[] }>(`/api/${resource}`, {
      baseURL: config.public.apiUrl,
      headers: headers.value,
      params,
    })
  }

  async function get(id: number | string) {
    return await $fetch<T>(`/api/${resource}/${id}`, {
      baseURL: config.public.apiUrl,
      headers: headers.value,
    })
  }

  async function create(data: Partial<T>) {
    return await $fetch<T>(`/api/${resource}`, {
      baseURL: config.public.apiUrl,
      headers: headers.value,
      method: 'POST',
      body: data,
    })
  }

  async function update(id: number | string, data: Partial<T>) {
    return await $fetch<T>(`/api/${resource}/${id}`, {
      baseURL: config.public.apiUrl,
      headers: headers.value,
      method: 'PUT',
      body: data,
    })
  }

  async function remove(id: number | string) {
    await $fetch(`/api/${resource}/${id}`, {
      baseURL: config.public.apiUrl,
      headers: headers.value,
      method: 'DELETE',
    })
  }

  return { list, get, create, update, remove }
}

// Usage in component
const products = useCrud<Product>('products')
const { data } = await products.list({ page: 1 })
await products.create({ name: 'New Product' })
await products.update(1, { name: 'Updated' })
await products.remove(1)
```

---

## Do / Don't

### Do
- Use `useFetch` for initial page data (SSR-safe, deduplication).
- Use `$fetch` for form submissions and user-triggered actions.
- Use `credentials: 'include'` for cookie-based auth (Sanctum).
- Keep axios only if you need complex interceptors or retry logic.
- Wrap `$fetch` in a composable for consistent auth injection.

### Don't
- Do not call `$fetch` directly in `<script setup>` without `useFetch` (duplicates on SSR).
- Do not set `Content-Type` manually for FormData uploads.
- Do not store tokens in localStorage (use httpOnly cookies).
- Do not mix axios and `$fetch` in the same project without clear boundaries.
- Do not use axios for simple GET requests — `useFetch` is lighter and SSR-safe.
