# Nuxt v4+ Skill Map

## Core
- [Core Skill (trigger-based)](./SKILL.md)
- [Rules & Coding Standards](./rules/SKILL.md)

## Architecture & Patterns
- [Project Setup & Testing](./references/project-setup.md)
- [Routing & Pages](./references/routing.md)
- [Middleware & Plugins](./references/middleware-plugins.md)
- [Server Routes & Nitro](./references/server.md)
- [Configuration](./references/nuxt-config.md)

## Data & State
- [Data Fetching Hierarchy (useFetch / $fetch / axios)](./data-fetching/SKILL.md)
- [Composables & Data Fetching](./references/nuxt-composables.md)
- [Composable Patterns (CRUD, API, Forms)](./composables/SKILL.md)
- [State Management (Pinia + useState)](./state/SKILL.md)

## UI & Styling
- [Components & Rendering](./references/nuxt-components.md)
- [shadcn-vue + Tailwind CSS v4](./shadcn/SKILL.md) — Admin panels, forms, tables, dialogs
- [Component Architecture (Nuxt UI, shadcn-like)](./ui-components/SKILL.md)
- [Styling & Tailwind CSS v4](./styling/SKILL.md)

## Auth
- [Authentication (Sanctum + JWT)](./auth/SKILL.md)

## Usage Order
1. Start with `./SKILL.md` for core architecture.
2. Read `./rules/SKILL.md` for coding standards.
3. Apply micro-skills required by the task.
4. Use `./shadcn/SKILL.md` for admin panels with shadcn-vue + Tailwind 4.
5. Use `./styling/SKILL.md` for custom Tailwind 4 theming.
6. Use `./state/SKILL.md` for state management patterns.
7. Use `./ui-components/SKILL.md` for component architecture.
8. Use `./composables/SKILL.md` for reusable logic patterns.
9. Resolve auth mode per backend boundary before implementation.
