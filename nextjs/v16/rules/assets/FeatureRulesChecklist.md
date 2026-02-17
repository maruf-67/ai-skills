# Feature Rules Checklist (portal-front aligned)

- Use `src/components/features/<feature>` for feature UI.
- Keep API calls in `src/services/*` only.
- Use `@/lib/api` + `unwrapResponse` for response extraction.
- Prefer typed service return values and avoid `any`.
- Keep forms on `React Hook Form` + `Zod`.
- Use shared UI primitives from `src/components/ui/*`.
- Keep route naming aligned with domain modules.
