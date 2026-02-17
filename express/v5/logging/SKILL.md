```skill
---
name: express-v5-logging
description: Use this when implementing structured logging and consistent error handling in Express v5 APIs.
---

# Logging & Error Handling

## Trigger
Use this when introducing new operational logs, error classes, or error-handling middleware behavior.

## Best Practices
- Keep structured logs with contextual metadata (`module`, `userId`, `requestId`).
- Separate operational errors from programmer/system errors.
- Use a global error handler for consistent API error envelopes.
- Keep async controllers wrapped so thrown errors propagate cleanly.
- Avoid logging secrets or full tokens.

## Your Usage (portal-api)
- Logging stack uses `winston` + rotating files and `morgan` bridge stream.
- `AppError` is the operational error primitive.
- Global handler in `src/common/middlewares/errorHandler.ts` normalizes responses.
- Controllers use `catchAsync` for async error forwarding.

## Reusable Blueprint
1. Throw `AppError` for expected domain failures.
2. Let global handler map error to response payload.
3. Log internal details server-side with request context.

## Avoid
- Sending raw stack traces in production responses.
- Mixing ad-hoc `console.log` with structured logger paths.
- Returning different error payload shapes between modules.
```
