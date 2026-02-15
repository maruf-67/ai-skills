# General Rules & Patterns

## Project Structure

- **App Router**: Use `src/app` for routes and layouts.
- **Src Directory**: All source code resides in `src/`.
- **Aliases**: Use `@/*` to reference `src/*` (e.g., `@/components/ui/Button`).

## Coding Standards

- **TypeScript**: 
  - Strict mode is enabled (`"strict": true`).
  - `noEmit` is set (Next.js handles build).
  - **Path Aliases**: configured in `tsconfig.json` (`"@/*": ["./src/*"]`).
  - Avoid `any`. Use explicit types for props and state.
- **Styling**:
  - Use **Tailwind CSS v4**.
  - Use `clsx` and `tailwind-merge` for conditional classes.
  - Use the `cn` utility for merging classes.
- **Validation**: Use **Zod** for schema validation (forms, API responses).
- **Forms**: Use **React Hook Form** with Zod resolvers.

## State Management

- Use React Context for global state (Auth, Theme, Notifications).
- Use local state (`useState`, `useReducer`) for component-specific logic.
- Avoid Redux unless absolutely necessary for complex global state.

## Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`).
- **Hooks**: camelCase, starting with `use` (e.g., `useAuth.ts`).
- **Utilities**: camelCase (e.g., `formatDate.ts`).
- **Services**: camelCase, ending with `service` (e.g., `userService.ts`).
