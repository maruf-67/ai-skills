```skill
---
name: express-v5-notifications
description: Use this when implementing Socket.IO-backed user notifications in an Express v5 backend.
---

# Real-time Notifications

## Trigger
Use this when implementing event delivery, unread counts, or user-scoped real-time updates.

## Best Practices
- Keep Socket.IO as delivery transport; keep source-of-truth in DB.
- Emit to user-scoped rooms (`user_<id>`) to avoid broadcast leakage.
- Authenticate socket handshakes with JWT and attach typed socket context.
- Emit stable event contracts and version payloads when needed.
- Keep mutation actions via HTTP/API; use socket primarily for push updates.

## Your Usage (portal-api)
- Socket setup is centralized in `src/config/socketio.ts`.
- Notification business logic remains in `src/modules/notifications/notification.service.ts`.
- Service emits events after persistence, not before.
- Authenticated users are tracked via joined rooms and lifecycle events.

## Reusable Blueprint
1. Persist notification.
2. Emit targeted event to recipient room.
3. Update read status via API and emit change event.
4. Keep client event names stable and documented.

## Avoid
- Emitting notifications before DB write success.
- Sending sensitive payloads to global rooms.
- Mixing socket mutation logic deeply into controller code.
```
