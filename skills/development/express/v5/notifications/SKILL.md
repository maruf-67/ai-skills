---
name: express-v5-notifications
description: Use this when implementing real-time Socket.IO notifications or queue-based
  messaging integrations in an Express v5 backend.
type: Skill
title: express-v5-notifications
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/express/v5/notifications/SKILL.md
tags:
- development
- express
- v5
- notifications
timestamp: '2026-06-29T19:13:46Z'
---

# Real-time Notifications & Integrations

## Trigger
Use this when implementing real-time event delivery, unread notification counts, webhook replies, background queues, or client-scoped push updates.

## Best Practices

### Socket.IO-Backed Client Updates
- Keep Socket.IO strictly as a delivery transport; keep the source of truth in the database.
- Emit events to user-scoped rooms (`user_<id>`) rather than global broadcasts to prevent data leakage.
- Authenticate socket handshakes via JWT and attach parsed user context to the socket object.
- Keep mutation actions via HTTP/API routes; use sockets only for pushing real-time notifications.

### Queue-Backed Message Integrations (Webhooks & Gateways)
- Keep webhook event handlers light: normalize/verify, return `200 OK` (or appropriate response) immediately, and queue the reply processing.
- Use a background job queue (e.g. BullMQ with Redis) to handle message retries, processing, and outbound deliveries.
- Isolate platform adapters from database layer queries to simplify adding new integrations.

## Reusable Blueprints

### Queue-Backed Webhook Controller (Slack/Telegram Gateway)
```ts
import { Request, Response } from 'express';
import { catchAsync } from '../../../common/utils/catchAsync.js';
import { sendSuccess } from '../../../common/utils/ApiResponse.js';
import { queueJob } from '../../../jobs/index.js';

export const handleWebhookEvent = catchAsync(async (req: Request, res: Response) => {
  const event = req.body;

  // Acknowledge receipt immediately to avoid platform timeout retries
  sendSuccess(res, {}, 'Event received');

  // Offload heavy processing to background workers
  await queueJob('process-webhook-message', { event });
});
```

### Socket.IO Server Setup
```ts
import { Server } from 'socket.io';
import http from 'http';
import { verifyToken } from '../common/utils/jwt.js';

export const initSocketServer = (server: http.Server) => {
  const io = new Server(server);

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const claims = verifyToken(token);
      socket.data.user = claims;
      next();
    } catch {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.data.user.userId;
    socket.join(`user_${userId}`);
  });

  return io;
};
```

## Avoid
- Emitting notifications to clients before the data has been successfully written to the database.
- Performing heavy processing, external HTTP requests, or database saves inside the synchronous webhook handler thread.
- Broadcasting sensitive data payloads to public socket channels.
