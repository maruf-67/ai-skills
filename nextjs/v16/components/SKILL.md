---
name: components
description: Micro-skill for component architecture, variant management, and feature-driven modules.
---

# Component Architecture

## Module Organization (`src/components/`)

### 1. Reusable UI (`ui/`)
Generic, logic-less components like `Button`, `Input`, `Modal`, and `DataTable`. 
- **Variant Management**: Driven by `class-variance-authority` (CVA).
- **Styling**: Base classes should be grouped in `src/lib/utils.ts` for consistency.

### 2. Layout Structure (`layout/`)
Application-wide structural components:
- `Sidebar.tsx`: Includes logic for collapsing and mobile menus.
- `Header.tsx`: Contains theme toggles, notification bell, and user profiles.
- `AdminLayout.tsx`: Orchestrates the dashboard view with breadcrumbs.

### 3. Feature Modules (`features/`)
Domain-specific modules (e.g., `knowledge`, `users`) that encapsulate logic, state, and UI.
**Internal Standard Structure:**
- `[Feature]List.tsx`: Uses `DataTable` for display.
- `[Feature]Form.tsx`: Managed by `React Hook Form` + `Zod`.
- `use[Feature].ts`: Encapsulates fetching and mutation state.
- `index.ts`: Exposes the module's public API.

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
