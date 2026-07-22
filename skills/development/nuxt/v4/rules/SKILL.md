---
name: nuxt-v4-rules
description: Core coding standards, naming conventions, import boundaries, feature isolation
  rules, and validation rules for Nuxt 4+.
type: Skill
title: nuxt-v4-rules
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nuxt/v4/rules/SKILL.md
tags:
- development
- nuxt
- v4
- rules
- standards
timestamp: '2026-07-22T00:00:00Z'
---

# General Rules & Patterns — Nuxt 4+

## Project Standards & Imports

- **Source Root**: All application code must be inside `app/`.
- **Absolute Path Aliases**: Use `~/` or `@/` for imports from the app directory.
- **Parent-Relative Imports**: Avoid `../` chains; use absolute aliases instead.
- **Naming Conventions**:
  - Components: `PascalCase.vue`
  - Composables: `useCamelCase.ts`
  - Utils: `camelCase.ts`
  - Stores: `useCamelCase.ts` (Pinia pattern)
  - Server routes: `camelCase.get.ts` / `camelCase.post.ts`

## Directory Structure (Modular Architecture)

```text
app/
  app.vue
  assets/css/main.css
  components/
    ui/              # Base UI components (shadcn/Nuxt UI wrappers)
    shared/          # Reusable cross-feature components
    features/
      auth/          # Auth-specific components
      dashboard/     # Dashboard-specific components
      products/      # Product-specific components
  composables/       # Global composables (shared across features)
  layouts/
    default.vue
    dashboard.vue
  middleware/
    auth.ts
    admin.ts
  pages/
    index.vue
    login.vue
    dashboard/
      index.vue
      products/
        index.vue
        [id].vue
  plugins/
    auth.ts
    analytics.ts
  stores/            # Pinia stores
    auth.ts
    products.ts
    ui.ts
  lib/               # Utility functions, API client, helpers
    utils.ts
    api.ts
    constants.ts
server/
  api/
    auth/
      login.post.ts
      logout.post.ts
      me.get.ts
    products/
      index.get.ts
      index.post.ts
      [id].get.ts
      [id].put.ts
      [id].delete.ts
  middleware/
    auth.ts
  utils/
shared/
  types/
    index.ts
    product.ts
    user.ts
  schemas/
    product.ts
    auth.ts
```

## Feature Isolation (Rule of Three)

- **Default Scope**: All components, composables, stores, and types MUST originate within their feature directory.
- **Promotion**: Any logic requested by 2+ features MUST be promoted to the shared layer (`components/shared/`, `composables/`, `lib/`).
- **Cross-Import Ban**: Direct imports between feature directories are FORBIDDEN. Communication happens through shared layer or prop-drilling at the page level.

## Code Segregation

- **Composables**: Stateful hooks that use Nuxt lifecycle (`useState`, `useFetch`, `useCookie`). Pure utilities do NOT belong here.
- **Lib/Utils**: Pure functions with no Nuxt/Vue dependencies. No `ref`, no `useState`, no side effects.
- **Server Utils**: Server-only functions in `server/utils/`. Never import from `app/`.
- **Schemas**: Zod validation schemas in `shared/schemas/`. Single source of truth for form validation and API contracts.

## TypeScript Rules

- **Strict Mode**: Enabled. No `any`. Use specific interfaces or `unknown`.
- **Type Exports**: All shared types in `shared/types/` with barrel exports via `index.ts`.
- **Component Props**: Always use `defineProps<{ ... }>()` with TypeScript generics.
- **Emits**: Always use `defineEmits<{ ... }>()` with typed payloads.

## Server/Client Boundaries

- **Server Components**: Default for pages and layouts. High-performance SEO.
- **Client Components**: Add `<script setup lang="ts">` with `useNuxtApp()` or browser APIs.
- **`<ClientOnly>`**: Wrap third-party client-only libraries (charts, sliders).
- **Server API**: All database and external API calls go through `server/api/`.
- **No Direct Fetch in UI**: Components must use composables or store actions, not raw `$fetch`.

## Validation

- **Zod Schemas**: Single source of truth for both client forms and server validation.
- **Server Validation**: Use `readValidatedBody(event, schema.parse)` in server routes.
- **Client Validation**: Use `@vorms/core` or `vee-validate` with Zod resolver.

## Quality & Automation

```bash
pnpm lint:fix        # Auto-fix linting and formatting
pnpm typecheck       # Type-check the project
pnpm test            # Run test suite
pnpm build           # Production build verification
```

## Do / Don't

### Do
- Use absolute aliases (`~/`, `@/`) for all imports.
- Keep feature code isolated until promoted by the Rule of Three.
- Use Zod for validation (forms + API).
- Define explicit TypeScript types for all props and emits.
- Run `nuxt prepare` after config changes.

### Don't
- Do not use parent-relative imports (`../`).
- Do not import between feature directories directly.
- Do not put business logic in pages; use composables and stores.
- Do not use `any` type.
- Do not skip `nuxt typecheck` before committing.
