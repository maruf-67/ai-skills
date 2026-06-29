---
name: express-v5-logging
description: Use this when implementing structured logging and consistent error handling
  in Express v5 APIs with Winston or Pino.
type: Skill
title: express-v5-logging
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/express/v5/logging/SKILL.md
tags:
- development
- express
- v5
- logging
timestamp: '2026-06-29T19:13:46Z'
---

# Logging & Error Handling

## Trigger
Use this when introducing logging configurations, error handling middleware, or throwing custom application errors.

## Best Practices
- Keep structured logs with contextual metadata (`module`, `userId`, `requestId`).
- Separate operational errors (expected client/validation issues) from programmer/system errors (database down, reference error).
- Use a global error handler middleware to catch all unhandled route errors and normalize the API response envelope.
- Wrap asynchronous controllers (e.g. using `catchAsync`) so promise rejections propagate to the error middleware automatically.
- Never log secrets, private keys, passwords, or full Authorization tokens.

## Stack Choices

### Winston & Morgan Stack
- Use Winston for system and application logging.
- Bridge HTTP request logging to Winston streams using Morgan middleware.
- Configure log files with daily rotations for persistency.

### Pino & pino-http Stack
- Use Pino for high-performance, low-overhead structured JSON logging.
- Use `pino-http` middleware to log HTTP request lifecycles.
- Standardize log serializers for request, response, and error objects.

## Reusable Blueprints

### Pino Configuration Blueprint
```ts
import pino from 'pino';

export const logger = pino({
  name: 'gateway',
  level: process.env.LOG_LEVEL || 'info',
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err,
  },
});
```

### Global Error Handler Middleware
```ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';
import { logger } from '../utils/logger.js';

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error({ err }, 'Unhandled error');

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};
```

## Avoid
- Mixing direct `console.log` statements with structured loggers.
- Exposing raw system stack traces in production HTTP responses.
- Inconsistent error structures across different API modules.
