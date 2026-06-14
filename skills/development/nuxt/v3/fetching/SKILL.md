---
name: nuxt-v3-fetching
description: SSR-safe data fetching patterns in Nuxt v3 including useFetch, useAsyncData, keys, and event-based requests.
---

# Nuxt v3 Data Fetching & Services

## When to use
Use when retrieving page data during SSR, loading dynamic details, refreshing list entities, or executing mutating actions like posts/updates.

## Do
- Use `useFetch` for declarative fetching directly inside components. It automatically handles key generation and deduplication.
- Use `useAsyncData` when combining multiple API requests or performing complex fetch operations before rendering.
- Always provide a unique key (as the first parameter or option) when the fetch URL or params depend on dynamic state variables.
- Use `$fetch` (Nuxt's underlying HTTP client) for user-triggered mutations (e.g. form submissions, button click requests).

## Don't
- Do not call `$fetch` inside `setup()` lifecycle directly without wrapping in `useAsyncData`; this executes twice (SSR + Client-side mount), causing mismatch bugs.
- Do not block initial page rendering with slow fetches. Use `{ lazy: true }` or `useLazyFetch` to render a fallback loader immediately.
- Do not leave errors unhandled. Extract error details and map them to UI notification banners.

## Minimal correct pattern

### SSR List Fetching: `pages/patients/index.vue`
```vue
<script setup lang="ts">
interface Patient {
  id: string;
  name: string;
  age: number;
}

const page = ref(1);

// Key changes dynamically when page value changes, trigger auto-refresh
const { data, pending, error, refresh } = await useFetch<Patient[]>('/api/v1/patients', {
  key: `patients-list-page-${page.value}`,
  query: { page },
  lazy: true
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Patients</h1>
    <div v-if="pending" class="text-gray-500">Loading patients...</div>
    <div v-else-if="error" class="text-red-500">Error: {{ error.message }}</div>
    <div v-else>
      <ul class="space-y-2">
        <li v-for="patient in data" :key="patient.id" class="border p-2 rounded shadow">
          {{ patient.name }} - Age: {{ patient.age }}
        </li>
      </ul>
      <div class="mt-4 flex gap-2">
        <button :disabled="page <= 1" @click="page--" class="px-3 py-1 border rounded">Prev</button>
        <button @click="page++" class="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  </div>
</template>
```

### Event Mutation: `components/forms/PatientForm.vue`
```ts
const patientName = ref('');
const submitStatus = ref('');

const handleSubmit = async () => {
  try {
    submitStatus.value = 'submitting';
    
    // We use $fetch because this runs purely in response to a user click
    const result = await $fetch('/api/v1/patients', {
      method: 'POST',
      body: { name: patientName.value }
    });
    
    submitStatus.value = 'success';
  } catch (error: any) {
    submitStatus.value = 'error';
  }
};
```
