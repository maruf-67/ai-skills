```skill
---
name: express-v5-structure
description: Use this when defining or reviewing Express v5 project/module structure and layering rules.
---

# Project Structure

## Trigger
Use this guide when adding a backend module, refactoring module boundaries, or reviewing architecture consistency.

## Best Practices
- Keep module flow fixed: `schema -> model -> service -> controller -> routes`.
- Keep shared concerns in `src/common/*` (middlewares, utils, plugins).
- Keep API mount centralized in `src/routes/index.ts`.
- Reuse existing module naming and folder patterns before adding new abstractions.
- Prefer small module-local changes over cross-cutting refactors.

## Your Usage (portal-api)
- Entry points: `src/app.ts` and `src/server.ts`.
- Modules live in `src/modules/*` (`auth`, `users`, `knowledge`, `workspace`, etc.).
- Shared runtime concerns live in `src/common/*`.
- Router mount stays under `/api/v1/*` via `src/routes/index.ts`.

## Reusable Blueprint
```txt
src/
├── app.ts
├── server.ts
├── routes/
│   └── index.ts
├── modules/
│   └── <feature>/
│       ├── <feature>.schema.ts
│       ├── <feature>.model.ts
│       ├── <feature>.service.ts
│       ├── <feature>.controller.ts
│       └── <feature>.routes.ts
├── common/
│   ├── middlewares/
│   ├── models/plugins/
│   └── utils/
└── config/
```

## Avoid
- Putting business rules in controllers.
- Bypassing validation middleware.
- Defining one-off response formats per module.
```
