---
name: rules
description: Core coding standards, naming conventions, and validation rules for Next.js 16.
---

# General Rules & Patterns

## Project Standards

- **Source Root**: All application code must be inside `src/`.
- **Naming**: 
  - Components: `PascalCase.tsx`
  - Hooks: `useCamelCase.ts`
  - Services: `camelCase.service.ts`
- **Aliases**: Strictly use `@/*` for internal imports.

## Technical Requirements

- **TypeScript**: 
  - Strict mode enabled.
  - No `any`; use specific interfaces or `unknown`.
  - Use `type` for simple data structures, `interface` for extendable objects.
- **Validation**: 
  - All form schemas must use `Zod`.
  - API responses should be validated or typed using `Zod` or explicit interfaces.
- **Forms**: 
  - Powered by `React Hook Form`.
  - Use `zodResolver` for validation bridging.
  - Use shared form controls from `src/components/ui/*` for consistent UX.
  - For dropdowns, use the shared `Select`/`Async*Select` wrappers; avoid native `<select>` in feature modules.

## Styling Guidelines

- **Tailwind CSS v4**: CSS-first configuration.
- **Conditional Classes**: Use the `cn()` utility (`clsx` + `tailwind-merge`).
- **Brand Consistency**: 
  - Reference `surfaceBaseClasses`, `cardClasses`, etc., from `src/lib/utils.ts`.
  - Use CSS variables for brand colors (`--color-primary-*`).

## State Management Ethics

- **Local State**: Use `useState` for UI-only state.
- **Global State**: Use Context API for `Auth`, `Theme`, `Notifications`.
- **URL State**: Use `useSearchParams` for filterable list views to support bookmarking.
