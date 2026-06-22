---
name: express-v5-routing
description: Use this when creating routes/controllers and enforcing middleware order in Express v5.
---

# Routing & Controllers

## Trigger
Use this when creating/updating routes, controller handlers, or middleware ordering.

## Best Practices
- Keep route wiring declarative and thin; business logic stays in services.
- Use canonical middleware order: `authenticate -> authorize -> validate -> controller`.
- Wrap controllers with `catchAsync` and throw `AppError` for operational failures.
- Return responses with shared response helpers for a stable API envelope.
- Keep controller code free of DB query composition where possible.

## Your Usage (portal-api)
- Module routers in `src/modules/*/*.routes.ts`, mounted in `src/routes/index.ts`.
- Controllers follow `catchAsync` + `sendSuccess` patterns.
- Auth context extraction is centralized via `src/common/utils/authRequest.ts` (`getRequiredUserId`, `getRequiredUserRole`).

## Reusable Blueprint
```ts
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'user'),
  validateRequest(MySchema),
  MyController.getById,
);
```

## Avoid
- Repeating `(req as any).user` in controllers.
- Running validation inside service logic.
- Returning custom one-off response shapes per endpoint.
