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
- **Client-Side Navigation**: Use `useParams` and `useRouter` from `next/navigation` in `'use client'` components.

### Data Fetching & Cache Conventions
- Default fetch caching is static-friendly; opt into dynamic when needed:
  - `cache: 'no-store'` for request-time dynamic data.
  - `next: { revalidate: N }` for time-based revalidation.
  - keep cache policy explicit for non-trivial routes.

## Component Architecture

### Domain-Driven Features (`src/components/features/`)
Each domain feature (e.g., `knowledge`, `prototypes`) must be isolated in its own directory following this strict structure:
- `index.ts`: Public API, exporting the main components and types.
- `[Feature]List.tsx`: Data display using the generic `DataTable`.
- `[Feature]Form.tsx`: Creation/Editing logic using `React Hook Form` and `Zod`.
- `[Feature]Card.tsx`: Grid/List preview component.
- `types.ts`: Domain-specific TypeScript interfaces.
- `use[Feature].ts`: Custom hook for state and API orchestration.

### Generic UI Library (`src/components/ui/`)
- **Base Components**: Reusable pieces (Button, Input, Modal) styled with `class-variance-authority` (CVA).
- **DataTable**: A powerful, generic table component supporting client/server pagination, sorting, and custom row actions.
- **Form Controls**: Specialized components like `AsyncMultiSelect` (React Select), `RichTextEditor` (TipTap), and `ImageUpload`.

### Styling & Theming
- **Tailwind CSS v4**: CSS-first configuration using `@theme inline` in `globals.css`.
- **Brand Tokens**: Leverage centralized color tokens (`--color-primary-*`, `--color-brand-*`) and utility class groups in `src/lib/utils.ts`.
- **Utility-First**: Use `cn()` helper for merging Tailwind classes safely.

## Data Management

### Service Layer (`src/services/`)
- **Encapsulation**: All API communication is abstracted into service objects.
- **Request Deduplication**: Use typed in-flight caches to prevent redundant calls during rapid re-renders.

### API Client (`src/lib/api.ts`)
- **Axios Instance**: Configured with `withCredentials: true`.
- **Auth Interceptors**: Automatically inject JWT from cookies.
- **Token Refresh**: Robust 401/403 handling that queues failed requests, refreshes the token, and retries the queue.

### State Management
- **Context API**: Preferred for global states like `Auth`, `Theme`, and `Notifications`.
- **Safety**: Expose contexts via custom hooks that throw descriptive errors if used outside their Providers.

## Coding Standards
- **TypeScript**: Strict typing is mandatory. Prefer `unknown` or specific interfaces over `any`.
- **Validation**: `Zod` is the source of truth for both form validation and API response typing.
- **Forms**: Managed by `React Hook Form`. Use `Controller` for complex third-party inputs.

## Reusable New-Feature Flow
1. Define feature types/contracts.
2. Build/extend service layer functions.
3. Add hook or context orchestration.
4. Implement feature UI with shared primitives.
5. Wire route/page with server/client boundaries explicit.
6. Validate with lint + type-check + relevant tests.
