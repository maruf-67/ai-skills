---
name: nextjs-v16
description: Use this when building or reviewing Next.js v16 App Router projects with TypeScript. Covers server/client boundaries, data fetching/caching, routing contracts, and feature-layer architecture.
---

# Next.js v16 (App Router) Skills

## Core Architecture (Version-Locked)

### Project Structure
- **App Router (`src/app`)**: Central hub for routes, layouts, metadata, and route handlers.
- **Route Groups**: Organize code without impacting URLs using `(group)` folders (e.g., `(main)`, `(dashboard)`).
- **Source Root**: All logic resides in `src/`. Use `@/*` path aliases for clean imports.

### Routing Patterns
- **Async Route Params**: Handle `params` consistently in pages/layouts/route handlers per current App Router behavior.
  ```tsx
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // ... logic
  }
  ```
- **Error Handling**: Prefer segment-level `error.tsx` and `not-found.tsx` for precise failure boundaries.
## Required Subskill Routing

- rules: `./rules/SKILL.md`
- fetching: `./fetching/SKILL.md`
- cache: `./cache/SKILL.md`
- components: `./components/SKILL.md`
- routing: `./routing/SKILL.md`
- state: `./state/SKILL.md`
- styling: `./styling/SKILL.md`
- auth-sanctum: `./auth/SKILL.md`
- auth-jwt: `./auth-jwt/SKILL.md`

## Component Architecture & Boundaries

### Project Layout (`src/`)
- **App Router (`src/app`)**: Strictly for routing and layouts. All business logic, UI components, and domain hooks MUST reside in `src/features`.
- **Feature Modules (`src/features/[feature-name]/`)**: Domain modules must isolate all internal concerns:
  - `api/`: API integration and fetching functions (no raw axios in UI).
  - `components/`: Feature-specific views and widgets.
  - `constants/`: Feature-specific static data or configuration.
  - `data/`: Static mock data or configuration values.
  - `helpers/`: Pure functions (no package imports).
  - `hooks/`: Domain React hooks (e.g. TanStack Query calls).
  - `schemas/`: Zod validation schemas.
  - `stores/`: Zustand stores.
  - `types/`: Domain-specific types.
  - `index.ts`: The feature's public API. All other internals are private.

### Reusable UI (`src/components/`)
- **Base Components**: Logic-less components styled with CVA (e.g. Button, Input). Keep shadcn/ui base elements in `components/ui/` and custom reusable UI components outside of it.
- **DataTable**: Centralized table component.

### Styling & Theming
- **Tailwind CSS v4**: CSS-first configuration using `@theme inline` in `globals.css`.
- **Brand Tokens**:centralized CSS variables (`--color-primary-*`) and utility class groups in `src/lib/utils.ts`.
- **Utility-First**: Use `cn()` helper for merging Tailwind classes safely.

## Data Management

### Server Actions
- All mutations MUST use Server Actions defined in dedicated `actions.ts` files within `src/features`.
- Direct database access inside actions is forbidden; actions must call the API layer only.
- Inline Server Actions inside components are strictly FORBIDDEN.
- CSRF: Verify Origin/Referer headers in Server Actions. Use `action.bind` to lock IDs on the server-side.

### API Client (`src/lib/api.ts`)
- Configured Axios instance with `withCredentials: true`.
- Interceptors handle JWT injection.
- Secret Isolation: Use the `server-only` package in API and database files.

### State Management
- **Context API**: Preferred for global states like `Auth`, `Theme`, and `Notifications`.
- **Safety**: Expose contexts via custom hooks that throw descriptive errors if used outside their Providers.

## Coding Standards
- **TypeScript**: Strict typing is mandatory. Prefer `unknown` or specific interfaces over `any`.
- **Validation**: `Zod` is the source of truth for both form validation and API response typing.
- **Forms**: Managed by `React Hook Form`. Use `Controller` for complex third-party inputs.
- **React 19 / Next.js 16 Rules**:
  - Do not use `forwardRef`. Standard component functions now accept `ref` directly as a prop.
  - Use `use(Context)` instead of `useContext` for dynamic context consumption in conditional blocks.
  - Prefer async `params` and `searchParams` extraction (e.g. `const { slug } = await params`).

## Reusable New-Feature Flow
1. Define feature types/contracts.
2. Build/extend service layer functions.
3. Add hook or context orchestration.
4. Implement feature UI with shared primitives.
5. Wire route/page with server/client boundaries explicit.
6. Validate with lint + type-check + relevant tests.
