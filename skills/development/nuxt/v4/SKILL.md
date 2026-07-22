---
name: nuxt-v4
description: Use this when building or reviewing Nuxt 4+ applications with Vue 3 and TypeScript.
  Covers Nuxt 4 directory structure, server/client boundaries, auto-imports, SSR-safe
  state, data fetching, middleware, plugins, and feature boundaries. Based on latest
  Nuxt 4 conventions and onmax/nuxt-skills patterns.
type: Skill
title: nuxt-v4
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nuxt/v4/SKILL.md
tags:
- development
- nuxt
- v4
timestamp: '2026-07-22T00:00:00Z'
---

# Nuxt v4+ Core Skills

## Start here

1. Inspect `package.json`, the lockfile, `nuxt.config.*`, and the directory layout before choosing an API. Nuxt features move, so verify the installed version instead of assuming the latest release.
2. Open only the reference that owns the task.
3. Prefer the smallest Nuxt primitive that preserves SSR, hydration, and generated types.
4. Run `nuxt prepare` after config, module, alias, or generated-type changes, then verify the affected runtime path.

## Core Architecture (Version-Locked)

### Nuxt 4 Directory Layout
```text
app/
  app.vue
  assets/
  components/
  composables/
  layouts/
  middleware/
  pages/
  plugins/
server/
  api/
  middleware/
  plugins/
  routes/
  utils/
shared/
public/
nuxt.config.ts
```

- **App Configuration (`nuxt.config.ts`)**: Central location for modules, runtime configuration, head settings, and builder configurations.
- **Pages Directory (`app/pages/`)**: File-system based routing. Dynamic routes use square brackets (e.g. `[id].vue`).
- **Server Directory (`server/`)**: Defines server-side API endpoints (`server/api/`), middleware (`server/middleware/`), and utilities (`server/utils/`).
- **Composables Directory (`app/composables/`)**: Holds stateful helper functions. Automatically imported by Nuxt.
- **Components Directory (`app/components/`)**: Visual elements, automatically imported based on name structure (e.g. `components/ui/Button.vue` -> `<UiButton />`).
- **Shared Directory (`shared/`)**: Universal code shared between client and server.

### Path Aliases
- `~` and `@` resolve from the application source directory (`app/`).
- `~~` and `@@` resolve from the project root.

### Server vs Client Routing
- Keep server-only operations inside `server/api/`. Do not fetch databases directly in page templates.
- Use `<ClientOnly>` wrappers when consuming third-party client-only libraries (e.g. charts, sliders) that break during Node SSR.

### Auto-Imports
- Leverage Nuxt's auto-imported composables (like `ref`, `computed`, `useFetch`, `useState`) without explicit imports.
- Prefix custom composable exports cleanly and avoid name clashes with built-ins.

---

## Reference map

- Project structure, upgrades, deployment mode, and testing: [references/project-setup.md](references/project-setup.md)
- Data fetching, state, request context, cookies, head, and hydration: [references/nuxt-composables.md](references/nuxt-composables.md)
- Pages, layouts, navigation, route metadata, and errors: [references/routing.md](references/routing.md)
- Route middleware, app plugins, and runtime hooks: [references/middleware-plugins.md](references/middleware-plugins.md)
- API routes, server middleware, validation, caching, and Nitro: [references/server.md](references/server.md)
- Built-in components, assets, images, and lazy hydration: [references/nuxt-components.md](references/nuxt-components.md)
- Nuxt config, runtime config, route rules, layers, modules, Vite, and Nitro options: [references/nuxt-config.md](references/nuxt-config.md)

---

## Component Architecture

### Domain Features (`app/components/features/`)
Isolate complex domain features inside organized feature folders:
- `app/components/features/[domain]/[Feature]List.vue` - Data table representation.
- `app/components/features/[domain]/[Feature]Form.vue` - Entity editing form.
- `app/components/features/[domain]/use[Feature].ts` - Custom composable for logic.

### Base UI Components (`app/components/ui/`)
- Pure presentational components (buttons, text fields, tables) styled with Tailwind.
- Keep them reusable and framework-agnostic.

---

## Ownership boundaries

- Use the `nuxt-modules` skill for authoring or publishing a Nuxt module.
- Use the relevant module skill for Nuxt UI, Nuxt Content, Nuxt Studio, NuxtHub, Nuxt Image, Nuxt Scripts, Nuxt SEO, or another installed module.
- Use official VueUse guidance for VueUse composables.
- Use Vue guidance for component-local reactivity that has no Nuxt lifecycle or rendering concern.

---

## Baseline

```vue
<script setup lang="ts">
const { data: products, status, error } = await useFetch('/api/products')

useSeoMeta({
  title: 'Products',
  description: 'Browse the product catalog.',
})
</script>

<template>
  <main>
    <p v-if="status === 'pending'">Loading…</p>
    <p v-else-if="error">Could not load products.</p>
    <ProductList v-else :products="products ?? []" />
  </main>
</template>
```

---

## Auth Routing

- Laravel backend with Sanctum PAT/Session -> `./auth/SKILL.md`
- Express/JWT backend -> `./auth/SKILL.md` (JWT mode)

---

## Do / Don't

### Do
- Write `<script setup lang="ts">` for all single file components (SFCs).
- Verify type definitions using Zod schemas for external API contracts.
- Handle loading states and async hydration issues explicitly.
- Use `useFetch` or `useAsyncData` for SSR-safe data fetching.
- Use `useState` for SSR-safe shared state.
- Run `nuxt prepare` after config changes.

### Don't
- Do not bypass Vue reactive properties using raw DOM operations.
- Do not mix client and server data fetching patterns within one view logic.
- Do not import CSS files globally inside random page files; register them in `nuxt.config.ts`.
- Do not store secret auth tokens in browser local storage.
- Do not call `$fetch` directly during component setup without `useFetch` or `useAsyncData`.
- Do not expose private runtime config values through `runtimeConfig.public`.
