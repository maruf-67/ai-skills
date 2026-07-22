---
name: laravel-v13-events
description: Patterns for events, listeners, and event dispatching in Laravel v13.
  Use when creating domain events, defining listeners, or implementing event-driven architecture.
type: Skill
title: laravel-v13-events
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/laravel/v13/events/SKILL.md
tags:
- development
- laravel
- v13
- events
- listeners
timestamp: '2026-07-22T00:00:00Z'
---

# Laravel v13 Events & Listeners

## Event Structure

```php
<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderShipped
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public Order $order,
    ) {}
}
```

## Listener Structure

```php
<?php

namespace App\Listeners;

use App\Events\OrderShipped;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendShipmentNotification implements ShouldQueue
{
    public function handle(OrderShipped $event): void
    {
        // Send notification...
    }
}
```

## Registering Events

### EventServiceProvider
```php
protected $listen = [
    OrderShipped::class => [
        SendShipmentNotification::class,
        UpdateInventory::class,
    ],
];
```

### Closure Listeners
```php
use App\Events\PodcastProcessed;
use function Illuminate\Events\queueable;
use Illuminate\Support\Facades\Event;

Event::listen(queueable(function (PodcastProcessed $event) {
    // Handle event...
}));

// With failure handling
Event::listen(queueable(function (PodcastProcessed $event) {
    // ...
})->catch(function (PodcastProcessed $event, \Throwable $e) {
    // Handle failure...
}));
```

## Dispatching Events

```php
// From anywhere
event(new OrderShipped($order));

// From a model (if using dispatchesEvents)
protected $dispatchesEvents = [
    'created' => OrderCreated::class,
    'updated' => OrderUpdated::class,
];
```

## Event Subscribers

```php
<?php

namespace App\Listeners;

class UserEventSubscriber
{
    public function handleUserCreated(UserCreated $event): void
    {
        // ...
    }

    public function handleUserUpdated(UserUpdated $event): void
    {
        // ...
    }

    public function subscribe(object $events): void
    {
        $events->listen(
            UserCreated::class,
            [self::class, 'handleUserCreated']
        );
        $events->listen(
            UserUpdated::class,
            [self::class, 'handleUserUpdated']
        );
    }
}
```

## Do / Don't

### Do
- Use events for decoupled side effects (notifications, logging, analytics).
- Implement `ShouldQueue` for slow listeners.
- Use `InteractsWithQueue` trait for manual job control.
- Keep events small and focused on domain facts.

### Don't
- Do not use events for synchronous business logic.
- Do not put database mutations in listeners without transactions.
- Do not forget to test events with `Event::fake()`.
