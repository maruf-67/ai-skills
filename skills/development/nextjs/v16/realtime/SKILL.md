---
name: realtime
description: "Digital Library realtime notifications \u2014 Ably integration, notification\
  \ system, push notifications. Use when implementing or debugging realtime features."
type: Skill
title: realtime
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nextjs/v16/realtime/SKILL.md
tags:
- development
- nextjs
- v16
- realtime
timestamp: '2026-06-29T19:13:46Z'
---

# Realtime Notifications — Digital Library

## Architecture

```
[LARAVEL Backend]                         [ABLY]                      [NEXT.JS Frontend]
                  │                         │                            │
Event Listeners   │                         │                            │
  PurchasePaid    │                         │                            │
  ReviewReply     │                         │                            │
  ...             │                         │                            │
      │           │                         │                            │
      ▼           │                         │                            │
NotificationService::publishToUser()        │                            │
  → Creates NotificationEvent + UserNotification (DB)                    │
  → Dispatches PublishRealtimeNotificationJob                            │
    → Fires NotificationPublished event                                  │
      → ShouldBroadcastNow               → Ably channel                  │
        private:user::{id}::notifications  ──────────────────────►       │
                                          event: notification.published  │
                                                                         ▼
                                                                 RealtimeProvider
                                                                   → useChannel hook
                                                                   → Parse notification
                                                                   → Zustand store
                                                                   → sonner toast
```

## Ably Integration

### Client Setup (`src/providers/realtime-provider.tsx`)
```tsx
const client = new Ably.Realtime({
  authCallback: async (data, callback) => {
    const res = await fetch('/v1/front/realtime/ably/token-request');
    const { token_request } = await res.json();
    callback(null, token_request);
  },
  autoConnect: false, // Don't connect until authenticated
});
```

- **Single Ably.Realtime client** created at provider level
- **autoConnect: false** — connects only when `user` is present
- **Connection syncs with Auth** — closes Ably connection on logout
- **Channel**: `private:user::{userId}::notifications`

### Token Request (Laravel)
```
GET /v1/front/realtime/ably/token-request  (auth: sanctum)
→ {
    token_request: AblyRest::auth->createTokenRequest(...),
    channels: ['private:user::{id}::notifications']
  }
```

### Broadcasting Config (Laravel)
- **Default driver**: `ably` (from `BROADCAST_CONNECTION` env)
- Supports: `reverb` (Laravel's native WebSocket), `pusher`, `ably`, `log`
- Ably key from `ABLY_KEY` env, public key from `ABLY_PUBLIC_KEY`

## Notification System

### Backend Flow
```
Event (PurchasePaid, ReviewReplyCreated, etc.)
  → Listener (PublishPurchasePaidNotification, etc.)
    → NotificationService::publishToUser($recipient, $payload)
      → Creates NotificationEvent (event data)
      → Creates UserNotification (user pivot)
      → Dispatches PublishRealtimeNotificationJob
        → Fires NotificationPublished event (ShouldBroadcastNow)
          → Broadcasts on PrivateChannel("user::{id}::notifications")
            → Event name: 'notification.published'
```

### NotificationPublished Event (`app/Events/Realtime/NotificationPublished.php`)
- `ShouldBroadcastNow` — immediate, no queue
- `ShouldDispatchAfterCommit` — only after DB commit
- Channel resolution:
  - User-scoped: `PrivateChannel("user::{userId}::notifications")`
  - Admin broadcast: `PrivateChannel("admin::broadcast")`
  - Other channels by name

### Broadcast Payload
```php
{
  event_type, category, title, message, action_url,
  channel, data (payload array), timestamp,
  notification_id, status, read_at
}
```

## Frontend Notification Handling

### RealtimeProvider + NotificationHandler
```tsx
<RealtimeProvider>
  {/* Connects Ably client when authenticated */}
  <NotificationHandler />
  {/* Subscribes to private:user::{id}::notifications */}
</RealtimeProvider>
```

- `NotificationHandler` uses `useChannel` from `ably/react`
- Parses payload (handles direct + Laravel-Echo-style wrapped payloads)
- Creates `NotificationDto` → `addNotification()` on Zustand store
- Fires `toast.notification()` (sonner toast) with optional "View" button

### Channel Name Convention
`private:user::{userId}::notifications`
- Ably channel names get a `private:` prefix automatically

### Notification Store (`src/store/notification-store.ts`)
- Zustand store with: `notifications[]`, `pagination`, `unreadCount`, `isLoading`
- `addNotification()` — deduplicates by ID (socket + API polling)
- `fetchUnreadCount()` — API call with 2-second debounce
- CRUD: `markAsRead`, `markAllAsRead`, `markMultipleRead`, `deleteNotification`, `deleteMultiple`, `clearReadNotifications`

### Notification API (Laravel)
```
GET    /v1/front/notifications                 → list (paginated, filterable)
GET    /v1/front/notifications/unread-count    → unread count
PATCH  /v1/front/notifications/mark-all-read   → mark all read
PATCH  /v1/front/notifications/{id}/mark-read  → mark one read
DELETE /v1/front/notifications/{id}            → delete one
DELETE /v1/front/notifications/clear-read      → clear all read
```

### Notification Categories
- `commerce` → shopping bag icon (purchases)
- `interaction` → message square icon (reviews, replies)
- `system` → alert triangle icon (system alerts)

## Push Notifications
- FCM (Firebase Cloud Messaging) for mobile push
- Push tokens registered via `POST /v1/front/notifications/push-tokens`
- `PublishPushNotificationJob` dispatched alongside realtime event

## Database Models

### NotificationEvent
| Field | Type | Description |
|-------|------|-------------|
| event_uuid | UUID | Unique event identifier |
| event_type | string | e.g. `purchase.success` |
| category | string | `commerce`, `interaction`, `system` |
| title, message | text | Notification content |
| action_url | string | Deep link URL |
| channel | string | Broadcast channel |
| payload | JSON | Arbitrary event data |
| published_at | timestamp | |

### UserNotification (pivot)
| Field | Type | Description |
|-------|------|-------------|
| user_id | FK | Recipient |
| notification_event_id | FK | Event |
| status | enum | `unread`, `read` |
| read_at | timestamp | |

## Key Files

### Next.js
- `src/providers/realtime-provider.tsx` — Ably client + notification handler (165 lines)
- `src/store/notification-store.ts` — Notification Zustand store (146 lines)
- `src/services/notification.service.ts` — Notification API client (110 lines)
- `src/types/notification.ts` — NotificationDto type (29 lines)
- `src/lib/schemas/notification.schema.ts` — Zod schemas (47 lines)
- `src/shared/notifications.tsx` — Toast system (106 lines)
- `src/shared/layouts/navbar/notification-panel.tsx` — UI dropdown (177 lines)

### Laravel
- `app/Events/Realtime/NotificationPublished.php` — Broadcast event
- `app/Domains/Realtime/Services/RealtimeService.php` — Auth payload + Ably token
- `app/Domains/Realtime/Services/NotificationService.php` — Publish logic (405 lines)
- `app/Http/Controllers/API/Realtime/NotificationController.php` — API CRUD
- `app/Jobs/Realtime/PublishPushNotificationJob.php` — FCM push
- `app/Listeners/Purchases/PublishPurchasePaidNotification.php` — Purchase listener
- `app/Domains/Realtime/Models/NotificationEvent.php` — Event model
- `app/Domains/Realtime/Models/UserNotification.php` — User pivot model
- `config/broadcasting.php` — Ably/Pusher/Reverb config
- `routes/api/v1/front.php` — Route definitions
