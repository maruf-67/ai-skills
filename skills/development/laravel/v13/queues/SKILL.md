---
name: laravel-v13-queues
description: Patterns for queues, jobs, dispatching, and queue configuration in Laravel v13.
  Use when creating jobs, configuring queue workers, or implementing background processing.
type: Skill
title: laravel-v13-queues
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/laravel/v13/queues/SKILL.md
tags:
- development
- laravel
- v13
- queues
- jobs
timestamp: '2026-07-22T00:00:00Z'
---

# Laravel v13 Queues & Jobs

## Job Structure

```php
<?php

namespace App\Jobs;

use App\Models\Podcast;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessPodcast implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $timeout = 120;
    public int $backoff = 30;

    public function __construct(
        public Podcast $podcast,
    ) {}

    public function handle(): void
    {
        // Process the podcast...
    }

    public function failed(\Throwable $exception): void
    {
        // Handle failure...
    }
}
```

## Dispatching Jobs

```php
// Basic dispatch
ProcessPodcast::dispatch($podcast);

// Delayed dispatch
ProcessPodcast::dispatch($podcast)->delay(now()->addMinutes(10));

// On specific queue
ProcessPodcast::dispatch($podcast)->onQueue('podcasts');

// After chain
ProcessPodcast::dispatch($podcast)
    ->then(fn () => Log::info('Done'))
    ->catch(fn ($e) => Log::error($e))
    ->finally(fn () => Log::info('Finished'));
```

## Job Chaining

```php
use Illuminate\Support\Facades\Bus;

Bus::batch([
    new ProcessPodcast($podcast),
    new SendNotification($podcast),
])->then(function (Batch $batch) {
    // All jobs completed...
})->catch(function (Batch $batch, \Throwable $e) {
    // First batch job failure...
})->finally(function (Batch $batch) {
    // All jobs have completed or failed...
})->dispatch();
```

## Queue Configuration

```php
// config/queue.php
'connections' => [
    'redis' => [
        'driver' => 'redis',
        'connection' => 'default',
        'queue' => env('REDIS_QUEUE', 'default'),
        'retry_after' => 90,
        'block_for' => null,
    ],
],
```

## Queue Worker

```bash
php artisan queue:work redis --queue=high,default,low
php artisan queue:work --tries=3 --timeout=90
php artisan queue:restart
```

## Unique Jobs

```php
class ProcessPodcast implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public Podcast $podcast,
    ) {}

    public function uniqueId(): string
    {
        return $this->podcast->id;
    }
}
```

## Do / Don't

### Do
- Use `ShouldQueue` interface for async jobs.
- Set reasonable `tries` and `timeout` values.
- Implement `failed()` method for cleanup.
- Use job chaining for multi-step workflows.
- Use `uniqueId()` to prevent duplicate jobs.

### Don't
- Do not put synchronous logic in queued jobs without testing.
- Do not forget to handle exceptions in `failed()`.
- Do not dispatch jobs inside constructors.
- Do not use `Queue::fake()` without restoring in tearDown.
