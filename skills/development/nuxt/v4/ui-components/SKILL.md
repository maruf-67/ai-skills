---
name: nuxt-v4-ui-components
description: Component architecture, Nuxt UI integration, shadcn-like patterns, compound
  components, and reusable UI primitives for Nuxt 4+.
type: Skill
title: nuxt-v4-ui-components
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nuxt/v4/ui-components/SKILL.md
tags:
- development
- nuxt
- v4
- components
- nuxt-ui
timestamp: '2026-07-22T00:00:00Z'
---

# Component Architecture — Nuxt 4+

## Directory Organization

### 1. Base UI Components (`app/components/ui/`)
Logic-less components styled with Tailwind Variants or Nuxt UI.
```text
app/components/ui/
  Button.vue
  Input.vue
  Select.vue
  Badge.vue
  Card.vue
  DataTable.vue
```

### 2. Shared Components (`app/components/shared/`)
Reusable cross-feature components promoted via the Rule of Three.
```text
app/components/shared/
  ConfirmDialog.vue
  EmptyState.vue
  PageHeader.vue
  SearchInput.vue
```

### 3. Feature Components (`app/components/features/[feature]/`)
Domain-specific components inside their feature directory.
```text
app/components/features/
  auth/
    LoginForm.vue
    RegisterForm.vue
  dashboard/
    StatsCard.vue
    ActivityFeed.vue
  products/
    ProductCard.vue
    ProductForm.vue
    ProductTable.vue
```

## Component Patterns

### Base Component with Variants
```vue
<!-- app/components/ui/Button.vue -->
<script setup lang="ts">
import { cn } from '~/lib/utils'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
})

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary-600',
  secondary: 'bg-secondary text-white hover:bg-secondary-600',
  outline: 'border border-border text-text hover:bg-surface',
  ghost: 'text-text-muted hover:bg-surface hover:text-text',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}
</script>

<template>
  <button
    :class="cn(
      'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
      'disabled:pointer-events-none disabled:opacity-50',
      variantClasses[variant],
      sizeClasses[size],
    )"
    :disabled="disabled || loading"
  >
    <svg v-if="loading" class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    <slot />
  </button>
</template>
```

### Compound Component Pattern
```vue
<!-- app/components/shared/DataTable.vue -->
<script setup lang="ts" generic="T">
interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface Props {
  columns: Column[]
  data: T[]
  loading?: boolean
}

const props = defineProps<Props>()
const sortKey = ref<string>('')
const sortDir = ref<'asc' | 'desc'>('asc')

function toggleSort(key: string) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-border">
    <table class="w-full">
      <thead class="bg-surface">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            class="px-4 py-3 text-left text-sm font-medium text-text-muted cursor-pointer hover:text-text"
            @click="col.sortable && toggleSort(col.key)"
          >
            <div class="flex items-center gap-1">
              {{ col.label }}
              <span v-if="sortKey === col.key">
                {{ sortDir === 'asc' ? '↑' : '↓' }}
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-border">
        <tr v-if="loading">
          <td :colspan="columns.length" class="px-4 py-8 text-center text-text-muted">
            Loading...
          </td>
        </tr>
        <tr v-else-if="data.length === 0">
          <td :colspan="columns.length" class="px-4 py-8 text-center text-text-muted">
            No data available
          </td>
        </tr>
        <tr v-else v-for="(row, idx) in data" :key="idx" class="hover:bg-surface/50">
          <slot name="row" :row="row" :columns="columns" />
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

### Form Component with Validation
```vue
<!-- app/components/features/auth/LoginForm.vue -->
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const emit = defineEmits<{ submit: [credentials: { email: string; password: string }] }>()

const schema = toTypedSchema(z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
}))

const { defineField, handleSubmit, errors, isSubmitting } = useForm({ validationSchema: schema })

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-text mb-1">Email</label>
      <input
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        class="w-full rounded-lg border border-border bg-background px-3 py-2 text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <p v-if="errors.email" class="mt-1 text-sm text-error">{{ errors.email }}</p>
    </div>
    <div>
      <label class="block text-sm font-medium text-text mb-1">Password</label>
      <input
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        class="w-full rounded-lg border border-border bg-background px-3 py-2 text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <p v-if="errors.password" class="mt-1 text-sm text-error">{{ errors.password }}</p>
    </div>
    <UButton type="submit" :loading="isSubmitting" block>
      Sign In
    </UButton>
  </form>
</template>
```

## Composition Rules

- **No Boolean Proliferation**: Avoid `isSmall`, `hasIcon`, `isDark` props. Use compound patterns or slots.
- **Children over Render Props**: Use `<slot>` for composition, not `renderItem` props.
- **Decoupled Providers**: Keep state logic in composables/stores, not in components.
- **Auto-Imports**: Nuxt auto-imports components from `app/components/`. Use `<UiButton>` not `import UiButton from ...`.

## Do / Don't

### Do
- Use `defineProps<{ ... }>()` with TypeScript.
- Use `cn()` for conditional classes.
- Keep components small and focused.
- Use slots for composition.
- Promote shared components via Rule of Three.

### Don't
- Do not put business logic in components.
- Do not use `v-if` and `v-for` on the same element.
- Do not mutate props directly.
- Do not use inline styles when Tailwind classes work.
