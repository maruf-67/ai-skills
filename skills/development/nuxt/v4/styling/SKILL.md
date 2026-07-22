---
name: nuxt-v4-styling
description: Styling, theming, and Tailwind CSS v4 configuration for Nuxt 4+ projects.
  Covers CSS-first configuration, @theme directive, dark mode, Nuxt UI integration,
  and brand token management.
type: Skill
title: nuxt-v4-styling
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nuxt/v4/styling/SKILL.md
tags:
- development
- nuxt
- v4
- styling
- tailwind
timestamp: '2026-07-22T00:00:00Z'
---

# Styling & Theming — Nuxt 4+ with Tailwind CSS v4

## Tailwind CSS v4 (CSS-First Configuration)

No `tailwind.config.{ts,js}` file. All configuration lives in CSS.

### Entry Point: `assets/css/main.css`
```css
@import "tailwindcss";
@import "@nuxt/ui";
```

### Theme Configuration with `@theme`
```css
@import "tailwindcss";

@theme {
  --font-display: "Inter", "sans-serif";
  --font-mono: "JetBrains Mono", monospace;

  --breakpoint-3xl: 1920px;

  --color-primary-50: oklch(0.97 0.02 250);
  --color-primary-100: oklch(0.93 0.04 250);
  --color-primary-200: oklch(0.87 0.08 250);
  --color-primary-300: oklch(0.78 0.12 250);
  --color-primary-400: oklch(0.68 0.16 250);
  --color-primary-500: oklch(0.58 0.20 250);
  --color-primary-600: oklch(0.48 0.20 250);
  --color-primary-700: oklch(0.40 0.18 250);
  --color-primary-800: oklch(0.32 0.14 250);
  --color-primary-900: oklch(0.24 0.10 250);
  --color-primary-950: oklch(0.16 0.06 250);

  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
}
```

### Dark Mode (Class-Based)
```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

```vue
<!-- Toggle dark mode -->
<script setup lang="ts">
const colorMode = useColorMode()

function toggleDark() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button @click="toggleDark">
    {{ colorMode.value === 'dark' ? 'Light' : 'Dark' }} mode
  </button>
</template>
```

### Dark Mode CSS Variables
```css
:root {
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
}

.dark {
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-border: #334155;
}
```

### Usage in Components
```vue
<template>
  <div class="bg-background text-text min-h-screen">
    <div class="bg-surface border border-border rounded-lg p-4">
      <p class="text-text-muted">Muted text</p>
    </div>
  </div>
</template>
```

### Conditional Classes
Use `cn()` helper for safe class merging:
```ts
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

```vue
<script setup lang="ts">
const props = defineProps<{ variant?: 'primary' | 'secondary'; active?: boolean }>()

const classes = computed(() => cn(
  'px-4 py-2 rounded-lg transition-colors',
  props.variant === 'primary' && 'bg-primary text-white',
  props.variant === 'secondary' && 'bg-secondary text-white',
  props.active && 'ring-2 ring-primary',
))
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>
```

## Nuxt UI v4 Integration

### Installation
```bash
pnpm add @nuxt/ui
```

### Configuration
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  ui: {
    prefix: 'U',
    colorMode: true,
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
      transitions: true,
    },
  },
})
```

### Required UApp Wrapper
```vue
<!-- app.vue -->
<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
```

### Semantic Colors
| Color       | Purpose                                     |
| ----------- | ------------------------------------------- |
| `primary`   | CTAs, active states, brand                  |
| `secondary` | Secondary buttons, alternatives             |
| `success`   | Success messages, positive states           |
| `info`      | Info alerts, help text                      |
| `warning`   | Warnings, pending states                    |
| `error`     | Errors, destructive actions                 |
| `neutral`   | Text, borders, disabled states              |

### Theme Customization (app.config.ts)
```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'indigo',
      secondary: 'violet',
      success: 'emerald',
      error: 'rose',
    },
    button: {
      slots: {
        base: 'font-semibold rounded-lg',
      },
    },
  },
})
```

### Component Usage
```vue
<template>
  <UButton color="primary" variant="solid">Primary</UButton>
  <UButton color="neutral" variant="outline">Outline</UButton>
  <UCard>
    <template #header>
      <h3>Card Title</h3>
    </template>
    <p>Card content</p>
  </UCard>
  <UTable :columns="columns" :rows="rows" />
</template>
```

## Do / Don't

### Do
- Use `@theme` for design tokens, not `tailwind.config.ts`.
- Use `cn()` for conditional class merging.
- Use semantic color names from Nuxt UI.
- Define all 11 shades for custom colors.
- Wrap app in `<UApp>` for overlays to work.

### Don't
- Do not create `tailwind.config.ts` in v4.
- Do not hardcode hex values in components.
- Do not skip dark mode variants.
- Do not mix Nuxt UI colors with raw Tailwind colors.
