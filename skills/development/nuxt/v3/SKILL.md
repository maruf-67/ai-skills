---
name: nuxt-v3
description: Use this when building or reviewing Nuxt v3 projects with Vue 3 and TypeScript. Covers project structure, server/client directories, SSR compatibility, auto-imports, and feature boundaries.
---

# Nuxt v3 Core Skills

## Core Architecture (Version-Locked)

### Directory Layout
- **App Configuration (`nuxt.config.ts`)**: Central location for modules, runtime configuration, head settings, and builder configurations.
- **Pages Directory (`pages/`)**: File-system based routing. Dynamic routes use square brackets (e.g. `[id].vue`).
- **Server Directory (`server/`)**: Defines server-side API endpoints (`server/api/`), middleware (`server/middleware/`), and utilities (`server/utils/`).
- **Composables Directory (`composables/`)**: Holds stateful helper functions. Automatically imported by Nuxt.
- **Components Directory (`components/`)**: Visual elements, automatically imported based on name structure (e.g. `components/ui/Button.vue` -> `<UiButton />`).

### Server vs Client Routing
- Keep server-only operations inside `server/api/`. Do not fetch databases directly in page templates.
- Use `<ClientOnly>` wrappers when consuming third-party client-only libraries (e.g. charts, sliders) that break during Node SSR.

### Auto-Imports
- Leverage Nuxt's auto-imported composables (like `ref`, `computed`, `useFetch`, `useState`) without explicit imports.
- Prefix custom composable exports cleanly and avoid name clashes with built-ins.

---

## Component Architecture

### Domain Features (`components/features/`)
Isolate complex domain features inside organized feature folders:
- `components/features/[domain]/[Feature]List.vue` - Data table representation.
- `components/features/[domain]/[Feature]Form.vue` - Entity editing form.
- `components/features/[domain]/use[Feature].ts` - Custom composable for logic.

### Base UI Components (`components/ui/`)
- Pure presentational components (buttons, text fields, tables) styled with Tailwind.
- Keep them reusable and framework-agnostic.

---

## Required Micro-skill Routing

- architecture: `./architecture/SKILL.md`
- routing: `./routing/SKILL.md`
- state: `./state/SKILL.md`
- data fetching: `./fetching/SKILL.md`
- styling: `./styling/SKILL.md`
- responsive: `./responsive/SKILL.md`

## Auth Routing

- Laravel backend with Sanctum PAT/Session -> `./auth/SKILL.md`
- Express/JWT backend -> `./auth/SKILL.md` (JWT mode)

---

## Do / Don't

### Do
- Write `<script setup lang="ts">` for all single file components (SFCs).
- Verify type definitions using Zod schemas for external API contracts.
- Handle loading states and async hydration issues explicitly.

### Don't
- Do not bypass Vue reactive properties using raw DOM operations.
- Do not mix client and server data fetching patterns within one view logic.
- Do not import CSS files globally inside random page files; register them in `nuxt.config.ts`.
