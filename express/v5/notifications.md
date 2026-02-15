# Real-time Notifications

## Architecture

Real-time notifications are implemented using **Socket.IO** integrated with the Notification Service.

-   **Library**: `socket.io` (v4+).
-   **Transport**: WebSocket (with polling fallback).
-   **Security**: JWT Authentication via Handshake Auth.

## Socket.IO Setup (`src/config/socketio.ts`)

The Socket.IO server is initialized with:
-   **CORS**: Configured from `FRONTEND_URL` env var.
-   **Path**: `/socket.io/` (explicit).
-   **Auth Middleware**:
    -   Intercepts connection handshake.
    -   Verifies `socket.handshake.auth.token` (JWT Access Token).
    -   Attaches `userId`, `email`, `role` to `socket.data`.
    -   Joins private room `user_{userId}` and `authenticated_users`.

### Usage in Service

The `NotificationService` (`src/modules/notifications/notification.service.ts`) handles the logic:

1.  **Injection**: `setSocketIOInstance` injects the IO server on startup.
2.  **Creation**:
    -   `createNotification(data)`: Saves to MongoDB -> Emits `notification:received` to `user_{userId}`.
3.  **Updates**:
    -   `markAsRead(id)`: Updates DB -> Emits `notification:updated` (type: `NOTIFICATION_READ`).

### Client Events

| Event Name | Direction | Payload | Description |
| :--- | :--- | :--- | :--- |
| `user:online` | Server -> Client | `{ userId, userEmail }` | Broadcast to `authenticated_users` when user connects. |
| `user:offline` | Server -> Client | `{ userId }` | Broadcast on disconnect. |
| `notification:received` | Server -> Client | `{ notification }` | New notification created. |
| `notification:updated` | Server -> Client | `{ type, notificationId }` | Notification read/deleted. |
| `notification:mark-read` | Client -> Server | `{ notificationId }` | Client request to mark as read (logging only, use HTTP for action). |

## Integration Pattern

To send a real-time update from any module:

```typescript
import { getSocketIOInstance, sendNotificationToUser } from '../../config/socketio.js';

const io = getSocketIOInstance();
if (io) {
    sendNotificationToUser(io, userId, { type: 'CUSTOM_EVENT', data: ... });
}
```
