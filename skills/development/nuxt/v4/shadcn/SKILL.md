---
name: nuxt-v4-shadcn
description: shadcn-vue integration for Nuxt 4+ with Tailwind CSS v4. Covers installation,
  theming with CSS variables, component patterns, form validation, and admin panel
  architecture. Built on Reka UI primitives.
type: Skill
title: nuxt-v4-shadcn
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nuxt/v4/shadcn/SKILL.md
tags:
- development
- nuxt
- v4
- shadcn
- tailwind
- ui
timestamp: '2026-07-22T00:00:00Z'
---

# shadcn-vue for Nuxt 4+ (Tailwind CSS v4)

## When to Use

- Building admin panels or dashboards with consistent UI components
- Need accessible, customizable components (Button, Card, Table, Dialog, etc.)
- Want shadcn/ui patterns in a Vue/Nuxt project
- Building forms with validation (Zod/Valibot)
- Need dark mode support out of the box

## Installation

### 1. Create Nuxt Project
```bash
pnpm create nuxt@latest my-project
cd my-project
```

### 2. Add Tailwind CSS v4
```bash
pnpm add tailwindcss @tailwindcss/vite -D
```

### 3. Configure CSS
Replace `app/assets/css/tailwind.css` with:
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));
```

### 4. Update nuxt.config.ts
```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['shadcn-nuxt'],
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },
})
```

### 5. Add SSR Width Plugin (prevents hydration errors)
```ts
// app/plugins/ssr-width.ts
import { provideSSRWidth } from '@vueuse/core'

export default defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(1024, nuxtApp.vueApp)
})
```

### 6. Run CLI
```bash
pnpm dlx nuxi prepare
pnpm dlx shadcn-vue@latest init
```

Select base color: `Neutral` (recommended)

### 7. Add Components
```bash
pnpm dlx shadcn-vue@latest add button
pnpm dlx shadcn-vue@latest add card
pnpm dlx shadcn-vue@latest add input
pnpm dlx shadcn-vue@latest add table
pnpm dlx shadcn-vue@latest add dialog
pnpm dlx shadcn-vue@latest add form
pnpm dlx shadcn-vue@latest add toast
pnpm dlx shadcn-vue@latest add tabs
pnpm dlx shadcn-vue@latest add sidebar
```

## Theme Configuration (CSS Variables)

### `app/assets/css/tailwind.css`
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Dark Mode Setup

### Color Mode Provider
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['shadcn-nuxt', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: '',
  },
})
```

### Toggle Component
```vue
<script setup lang="ts">
const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <Button variant="outline" size="icon" @click="toggleTheme">
    <Icon v-if="colorMode.value === 'dark'" name="lucide:sun" class="size-5" />
    <Icon v-else name="lucide:moon" class="size-5" />
  </Button>
</template>
```

## Component Usage

### Basic Components
```vue
<template>
  <!-- Button -->
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="destructive">Delete</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>

  <!-- Sizes -->
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
  <Button size="icon"><Icon name="lucide:plus" /></Button>
</template>
```

### Card
```vue
<template>
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card description</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Card content goes here.</p>
    </CardContent>
    <CardFooter class="flex justify-end gap-2">
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </CardFooter>
  </Card>
</template>
```

### Data Table
```vue
<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Product {
  id: number
  name: string
  price: number
  status: 'active' | 'draft'
}

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
  { key: 'status', label: 'Status' },
]

defineProps<{ data: Product[] }>()
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead v-for="col in columns" :key="col.key">
          {{ col.label }}
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in data" :key="row.id">
        <TableCell>{{ row.name }}</TableCell>
        <TableCell>${{ row.price }}</TableCell>
        <TableCell>
          <Badge :variant="row.status === 'active' ? 'default' : 'secondary'">
            {{ row.status }}
          </Badge>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
```

### Dialog (Modal)
```vue
<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button>Open Dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogDescription>
          Are you sure you want to proceed?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" @click="open = false">Cancel</Button>
        <Button @click="open = false">Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

### Form with Zod Validation
```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const schema = toTypedSchema(z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
}))

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  await $fetch('/api/auth/register', {
    method: 'POST',
    body: values,
  })
})
</script>

<template>
  <Card class="w-full max-w-md">
    <CardHeader>
      <CardTitle>Register</CardTitle>
      <CardDescription>Create your account</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="name">Name</Label>
          <Input id="name" v-model="name" v-bind="nameAttrs" placeholder="John Doe" />
          <p v-if="errors.name" class="text-sm text-destructive">{{ errors.name }}</p>
        </div>
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="email" v-bind="emailAttrs" type="email" placeholder="john@example.com" />
          <p v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</p>
        </div>
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="password" v-bind="passwordAttrs" type="password" />
          <p v-if="errors.password" class="text-sm text-destructive">{{ errors.password }}</p>
        </div>
        <Button type="submit" class="w-full" :disabled="isSubmitting">
          {{ isSubmitting ? 'Creating account...' : 'Register' }}
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
```

### Toast Notifications
```vue
<script setup lang="ts">
import { toast } from 'vue-sonner'

function showToast() {
  toast.success('Changes saved successfully!')
}

function showError() {
  toast.error('Something went wrong. Please try again.')
}
</script>

<template>
  <Button @click="showToast">Show Toast</Button>
  <Button variant="destructive" @click="showError">Show Error</Button>
</template>
```

## Admin Panel Architecture

### Layout Structure
```text
app/
  layouts/
    admin.vue           # Admin layout with sidebar
  components/
    ui/                 # shadcn components (auto-generated)
    admin/
      Sidebar.vue       # Navigation sidebar
      Header.vue        # Top header with user menu
      Breadcrumb.vue    # Breadcrumb navigation
  pages/
    admin/
      index.vue         # Dashboard
      users/
        index.vue       # User list
        [id].vue        # User detail
      settings.vue      # Settings page
```

### Admin Layout
```vue
<!-- app/layouts/admin.vue -->
<template>
  <div class="flex min-h-screen">
    <AdminSidebar />
    <div class="flex-1 flex flex-col">
      <AdminHeader />
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
```

### Sidebar Component
```vue
<!-- app/components/admin/Sidebar.vue -->
<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: 'Dashboard', icon: 'lucide:layout-dashboard', href: '/admin' },
  { label: 'Users', icon: 'lucide:users', href: '/admin/users' },
  { label: 'Products', icon: 'lucide:package', href: '/admin/products' },
  { label: 'Settings', icon: 'lucide:settings', href: '/admin/settings' },
]
</script>

<template>
  <aside class="w-64 border-r border-border bg-sidebar">
    <div class="p-4">
      <h2 class="text-lg font-semibold text-sidebar-foreground">Admin</h2>
    </div>
    <nav class="px-2">
      <NuxtLink
        v-for="item in navItems"
        :key="item.href"
        :to="item.href"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent"
        :class="{ 'bg-sidebar-accent': route.path === item.href }"
      >
        <Icon :name="item.icon" class="size-4" />
        {{ item.label }}
      </NuxtLink>
    </nav>
  </aside>
</template>
```

## Do / Don't

### Do
- Use CSS variables for theming (not hardcoded colors).
- Use `@theme inline` to map variables to Tailwind utilities.
- Wrap app in color mode provider for dark mode.
- Use `vue-sonner` for toast notifications.
- Use Zod for form validation with `vee-validate`.

### Don't
- Do not hardcode colors in components.
- Do not skip the `tw-animate-css` import.
- Do not use `@nuxtjs/tailwindcss` module (use `@tailwindcss/vite` instead for v4).
- Do not forget the SSR width plugin for hydration.
