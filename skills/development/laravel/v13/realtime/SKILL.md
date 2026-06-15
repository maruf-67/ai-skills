---
name: realtime
description: Laravel realtime notifications — Ably broadcasting, event system, notification publishing. Use when implementing or debugging backend realtime features.
---

# Realtime Notifications — Laravel Backend

## Broadcasting Setup

### Default Driver: Ably
`BROADCAST_CONNECTION=ably` in `.env`

### config/broadcasting.php
```php
'ably' => [
    'driver' => 'ably',
    'key' => env('ABLY_KEY'),
    'public_key' => env('ABLY_PUBLIC_KEY'),
],
```

Also supports: `reverb` (Laravel Reverb), `pusher` (Pusher Channels), `log`, `null`

## Event Broadcasting

### NotificationPublished Event
`app/Events/Realtime/NotificationPublished.php`
- Implements `ShouldBroadcastNow` (immediate, no queue)
- Implements `ShouldDispatchAfterCommit` (only after DB commit)
- Broadcast name: `notification.published`

### Channel Resolution
| Condition | Channel |
|-----------|---------|
| User-scoped notification | `PrivateChannel("user::{userId}::notifications")` |
| Admin broadcast | `PrivateChannel("admin::broadcast")` |
| Channel starts with `user::` | `PrivateChannel(channelName)` |
| Other | `Channel(channelName)` (public) |

### Broadcast Payload
```php
[
    'event_type' => 'purchase.success',
    'category' => 'commerce',
    'title' => 'Purchase Successful',
    'message' => 'You have purchased...',
    'action_url' => '/library',
    'channel' => 'user::{id}::notifications',
    'data' => ['purchase_no' => 'PUR-...'],
    'timestamp' => now()->toIso8601String(),
    'notification_id' => $notification->id,
    'status' => 'unread',
    'read_at' => null,
]
```

## Realtime Auth Tokens

### Ably Token Request
```
GET /v1/front/realtime/ably/token-request (auth: sanctum)
→ {
    token_request: AblyRest::auth->createTokenRequest(...),
    channels: ['private:user::{id}::notifications']
  }
```

### Generic Realtime Token
```
GET /v1/front/realtime/token (auth: sanctum)
→ {
    token: 'base64(JSON).HMAC',
    channels: ['user::{id}::notifications', 'admin::broadcast (if admin)'],
    expires_at: ISO8601 (30 min),
    broadcaster: 'ably',
    connection: { ... resolved config }
  }
```

## Notification Publishing Flow

### Service (`app/Domains/Realtime/Services/NotificationService.php`)
1. `publishToUser($recipient, $payload)`:
   - Creates `NotificationEvent` (event data)
   - Creates `UserNotification` (user pivot, status: unread)
   - Dispatches `PublishRealtimeNotificationJob` which fires `NotificationPublished` event
   - Also dispatches `PublishPushNotificationJob` for FCM

2. `publishToChannel($channel, $payload)`:
   - Channel-scoped event (no specific user)

3. `publishCriticalWebsiteAlert()`:
   - Sends to all admin users + `admin::broadcast` channel

### Event Listeners (Producers)
| Listener | Event | Notification Type |
|----------|-------|-------------------|
| `PublishPurchaseCreatedNotification` | `PurchaseCreated` | `purchase.created` |
| `PublishPurchasePaidNotification` | `PurchasePaid` | `purchase.success` |
| `NotifyReviewParticipants` | `ReviewReplyCreated` | `review.reply` |

## Related Files
- `app/Events/Realtime/NotificationPublished.php` — Broadcast event
- `app/Domains/Realtime/Services/RealtimeService.php` — Auth + token generation
- `app/Domains/Realtime/Services/NotificationService.php` — Publish logic
- `app/Http/Controllers/API/Realtime/NotificationController.php` — API CRUD
- `app/Jobs/Realtime/PublishRealtimeNotificationJob.php` — Queue job
- `app/Jobs/Realtime/PublishPushNotificationJob.php` — FCM push
- `app/Domains/Realtime/Models/NotificationEvent.php` — Event model
- `app/Domains/Realtime/Models/UserNotification.php` — User pivot
- `config/broadcasting.php` — Driver config
- `app/Listeners/Purchases/PublishPurchasePaidNotification.php` — Example listener
