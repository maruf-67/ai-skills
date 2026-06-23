---
name: components
description: Micro-skill for component architecture, React composition patterns, CVA styling, React 19 rules, and Plop component generation.
---

# Component Architecture & Composition

## Directory Organization

### 1. Global Components (`src/components/`)
Shared, reusable pieces requested by more than one feature (promoted via the "Rule of Three").
- **shadcn/ui separation:** Keep raw shadcn/ui base elements in `components/ui/` and custom reusable UI components outside of it (e.g. `components/shared/` or `components/layout/`).
- **Variant Management:** Managed using CVA (`class-variance-authority`).
- **Styling:** Centralized primitives in `src/lib/utils.ts`.

### 2. Feature Components (`src/features/[feature]/`)
All domain-specific components reside inside their respective feature directory.
Standard structure:
- `api/`: Fetching and mutation functions.
- `components/`: UI views and components for this feature.
- `constants/`: Feature constants and configurations.
- `data/`: Feature static mock data or config values.
- `helpers/`: Pure functions with no external imports.
- `hooks/`: Domain React hooks (e.g. wrapper queries).
- `schemas/`: Zod validation schemas.
- `stores/`: Zustand stores.
- `types/`: Domain-specific types.
- `index.ts`: The feature's public exports API.

## React Composition Rules (Vercel Standards)

- **Avoid Boolean Props Proliferation:** Do not add countless boolean flags (e.g. `isSmall`, `hasIcon`, `isDark`) to customize component features. Prefer compound component patterns or slot composition.
- **Compound Components:** Build complex components with shared React Context so siblings communicate (e.g. `<Select><Select.Trigger/><Select.Content/></Select>`).
- **Children over Render Props:** Pass standard React components via `children` rather than custom `renderHeader` or `renderItem` props.
- **Decoupled Providers:** Decouple context state from the UI component. Providers should only know how to manage state; consumers consume it.
- **React 19 Standards:**
  - Do not use `forwardRef`. Pass `ref` as a standard prop directly into functional components.
  - Use `use(Context)` instead of `useContext` for dynamic, conditional context consumption.

## Scaffolding & Automation (Plop Component Generator)

Avoid repetitive setup work (creating component files, CSS files, tests, and stories):
- Configure plop templates inside `plop-templates/` for your project structure.
- Run the generator script:
  ```bash
  pnpm run generate
  ```
  This command will prompt you for the component name and domain feature, automatically creating:
  - `MyComponent.tsx`
  - `MyComponent.test.tsx`
  - `MyComponent.stories.tsx`

## Design Patterns

### Generic Data Tables
Leverage the standardized `DataTable` component for all list views. It supports:
- **Manual Pagination**: Pass `rowCount` and `onPageChange` for server-side handling.
- **Dynamic Columns**: Use the `render` prop for custom cell contents (Badges, Buttons).

### Complex Forms
- Use `Controller` for third-party components like `React Select` or `Tiptap Editor`.
- Implement `AsyncCreatableMultiSelect` for dynamic tagging systems.
- For single-select inputs, use the shared `src/components/ui/Select` wrapper instead of native `<select>` or direct feature-level `react-select` usage.
- Prefer `options={[{ value, label }]}` with controlled `value` + `onChange` for consistent behavior and styling across modules.

## Component Directives
- **'use client'**: Required for any component using hooks (`useState`, `useEffect`) or browser APIs.
- **Server Components**: Prefer for root route layouts and pages where high-performance SEO is required.
