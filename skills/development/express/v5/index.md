# Express.js v5 Skills

Version-locked guidance for Express 5 + TypeScript backends.
Primary alignment target: `portal-api`, but rules are written to be reusable in new projects.

## Package Manager

**Always use `pnpm`** — never npm or yarn.

```bash
pnpm install          # install dependencies
pnpm add <package>    # add a package
pnpm dev              # start dev server
pnpm build            # production build
pnpm type-check       # run TypeScript type check
pnpm lint             # run ESLint
pnpm test             # run tests
```

## Start Here
- [Core Skill (trigger-based)](./SKILL.md)

## Skill Modules
- [Project Structure](./structure/SKILL.md)
- [Routing & Controllers](./routing/SKILL.md)
- [Database & Models](./database/SKILL.md)
- [Authentication & Security](./auth/SKILL.md)
- [Real-time Notifications](./notifications/SKILL.md)
- [Caching & Redis](./caching/SKILL.md)
- [Audit System](./audit/SKILL.md)
- [Knowledge Module](./knowledge/SKILL.md)
- [Database Seeders](./seeders/SKILL.md)
- [Logging & Error Handling](./logging/SKILL.md)
- [Deployment](./deployment/SKILL.md)

## Feature Delivery Checklist (Reusable)
1. Confirm endpoint contract and validation schema.
2. Implement service rules before controller mapping.
3. Keep controller thin and standardized.
4. Wire route middleware in canonical order.
5. Validate with lint + type-check + relevant tests.
