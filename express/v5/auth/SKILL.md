---
name: auth
description: Use this when implementing token auth, OAuth flows, and permission-safe request handling in Express v5.
---

# Authentication & Security

## Trigger
Use this when implementing user login, JWT generation/verification, token authorization guards, or external platform signature verifications.

## Best Practices

### Stateless Token-First (Bearer Auth)
- Authenticate requests by reading the `Authorization: Bearer <token>` header.
- Centralize claims verification using a helper middleware that attaches decoded user claims to the request (e.g. `req.claims`).
- Expose typed helpers (e.g. `getRequiredUserId(req)`) to access claims safely without repeated casts.

### Dual-Token (Session Auth)
- Use a short-lived access token combined with a long-lived refresh token.
- Refresh tokens must be stored in secure, `httpOnly`, `sameSite: 'lax'` (or strict) cookies.
- Maintain a blacklist (in Redis/caching layer) to revoke tokens instantly on logout.

### External Signature Verification (Webhooks)
- Always verify incoming webhook signatures (e.g., Slack's `x-slack-signature` or Microsoft Teams' signatures) at the earliest route middleware.
- Verify request signatures using raw bodies (`express.raw()`) rather than pre-parsed JSON bodies to prevent hash mismatches.

## Reusable Blueprints

### Stateless JWT Middleware Blueprint
```ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';
import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(401, 'Missing or invalid authorization header');
    }

    const token = authHeader.substring(7);
    const claims = verifyToken(token);

    req.claims = claims;
    next();
  } catch (error) {
    next(error);
  }
};
```

### Signature Verification (Raw Body Middleware)
```ts
import { Request, Response, NextFunction } from 'express';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { AppError } from '../utils/AppError.js';

export const verifyWebhookSignature = (req: Request, res: Response, next: NextFunction) => {
  const signature = req.headers['x-signature'] as string;
  const timestamp = req.headers['x-timestamp'] as string;
  const secret = process.env.WEBHOOK_SECRET;

  if (!signature || !timestamp || !secret) {
    return next(new AppError(401, 'Unauthorized webhook request'));
  }

  const rawBody = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : JSON.stringify(req.body);
  const basestring = `v0:${timestamp}:${rawBody}`;
  const hmac = createHmac('sha256', secret).update(basestring).digest('hex');

  if (!timingSafeEqual(Buffer.from(`v0=${hmac}`), Buffer.from(signature))) {
    return next(new AppError(401, 'Invalid signature'));
  }

  next();
};
```

## Avoid
- Trusting client-side claims (roles or user IDs) without cryptographic verification.
- Passing sensitive auth tokens in query strings or unencrypted URLs.
- Parsing body payloads as JSON before verifying platform HMAC signatures.
