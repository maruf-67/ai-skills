---
name: nuxt-v4-composables-patterns
description: Composable architecture patterns for Nuxt 4+ — reusable hooks, API integration,
  form handling, and feature-scoped composables.
type: Skill
title: nuxt-v4-composables-patterns
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nuxt/v4/composables/SKILL.md
tags:
- development
- nuxt
- v4
- composables
- hooks
timestamp: '2026-07-22T00:00:00Z'
---

# Composable Patterns — Nuxt 4+

## Directory Structure

```text
app/composables/           # Global composables (shared across features)
  useApi.ts                # API client wrapper
  useAuth.ts               # Auth composable (or use store)
  useDebounce.ts           # Generic utility composable
  usePagination.ts         # Pagination logic

app/features/[feature]/
  composables/             # Feature-scoped composables
    useProducts.ts
    useProductFilters.ts
```

## API Composable Pattern

```ts
// composables/useApi.ts
export function useApi() {
  const config = useRuntimeConfig()
  const token = useCookie('auth_token')

  async function request<T>(url: string, options?: RequestInit): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
    }

    const response = await $fetch<T>(url, {
      baseURL: config.public.backendUrl,
      headers,
      ...options,
    })

    return response
  }

  return { request }
}
```

## CRUD Composable Pattern

```ts
// features/products/composables/useProducts.ts
export function useProducts() {
  const { request } = useApi()
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProducts(params?: Record<string, string | number>) {
    loading.value = true
    error.value = null
    try {
      products.value = await request<Product[]>('/api/products', { query: params })
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  async function createProduct(data: CreateProductInput): Promise<Product> {
    const product = await request<Product>('/api/products', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    products.value.push(product)
    return product
  }

  async function updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    const product = await request<Product>(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    const idx = products.value.findIndex(p => p.id === id)
    if (idx !== -1) products.value[idx] = product
    return product
  }

  async function deleteProduct(id: number): Promise<void> {
    await request(`/api/products/${id}`, { method: 'DELETE' })
    products.value = products.value.filter(p => p.id !== id)
  }

  return { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct }
}
```

## Pagination Composable

```ts
// composables/usePagination.ts
export function usePagination<T>(fetchFn: (page: number, limit: number) => Promise<T[]>) {
  const page = ref(1)
  const limit = ref(20)
  const data = ref<T[]>([]) as Ref<T[]>
  const loading = ref(false)
  const hasMore = ref(true)

  async function load() {
    if (loading.value || !hasMore.value) return
    loading.value = true
    try {
      const items = await fetchFn(page.value, limit.value)
      data.value.push(...items)
      hasMore.value = items.length === limit.value
      page.value++
    } finally {
      loading.value = false
    }
  }

  function reset() {
    page.value = 1
    data.value = []
    hasMore.value = true
  }

  return { data, loading, hasMore, load, reset }
}
```

## Form Composable

```ts
// composables/useFormField.ts
export function useFormField<T>(initialValue: T) {
  const value = ref<T>(initialValue)
  const error = ref<string | null>(null)
  const touched = ref(false)

  function validate(rule: (val: T) => string | null) {
    error.value = rule(value.value)
    return error.value === null
  }

  function reset() {
    value.value = initialValue
    error.value = null
    touched.value = false
  }

  return { value, error, touched, validate, reset }
}
```

## Debounce Composable

```ts
// composables/useDebounce.ts
export function useDebounce<T>(value: Ref<T>, delay: number = 300): Ref<T> {
  const debounced = ref(value.value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout>

  watch(value, (newVal) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debounced.value = newVal
    }, delay)
  })

  return debounced
}
```

## Usage in Components

```vue
<script setup lang="ts">
const { products, loading, fetchProducts, deleteProduct } = useProducts()
const search = ref('')
const debouncedSearch = useDebounce(search, 300)

onMounted(() => fetchProducts())

watch(debouncedSearch, (val) => {
  fetchProducts({ search: val })
})

async function handleDelete(id: number) {
  if (confirm('Are you sure?')) {
    await deleteProduct(id)
  }
}
</script>

<template>
  <div>
    <input v-model="search" placeholder="Search products..." />
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="product in products" :key="product.id">
        {{ product.name }}
        <button @click="handleDelete(product.id)">Delete</button>
      </div>
    </div>
  </div>
</template>
```

## Do / Don't

### Do
- Name composables with `use` prefix.
- Return refs (not raw values) for reactivity.
- Keep composables small and focused.
- Use feature-scoped composables when shared logic isn't needed.
- Compose composables from other composables.

### Don't
- Do not put side effects in composables without clear ownership.
- Do not access `window`/`document` without guarding for SSR.
- Do not return objects with many unrelated methods.
- Do not duplicate Nuxt built-in composables (`useFetch`, `useState`).
