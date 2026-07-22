---
name: laravel-v13-testing
description: Patterns for testing with Pest and PHPUnit in Laravel v13.
  Use when writing feature tests, unit tests, or setting up test infrastructure.
type: Skill
title: laravel-v13-testing
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/laravel/v13/testing/SKILL.md
tags:
- development
- laravel
- v13
- testing
- pest
timestamp: '2026-07-22T00:00:00Z'
---

# Laravel v13 Testing (Pest)

## Feature Test

```php
<?php

use App\Models\User;

it('can fetch posts', function () {
    $user = User::factory()->create();
    $posts = Post::factory()->count(3)->for($user)->create();

    $response = $this->actingAs($user)
        ->getJson('/api/v1/posts');

    $response->assertOk()
        ->assertJsonCount(3, 'data');
});

it('requires authentication', function () {
    $this->getJson('/api/v1/posts')
        ->assertUnauthorized();
});
```

## Unit Test

```php
<?php

use App\Services\PaymentService;

it('calculates total with tax', function () {
    $service = new PaymentService();
    $total = $service->calculateTotal(100, 0.1);

    expect($total)->toBe(110.0);
});
```

## API Testing

```php
it('creates a post via API', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->postJson('/api/v1/posts', [
            'title' => 'Test Post',
            'body' => 'Test body content',
        ]);

    $response->assertCreated()
        ->assertJsonFragment(['title' => 'Test Post']);

    $this->assertDatabaseHas('posts', ['title' => 'Test Post']);
});
```

## Faking Services

```php
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notifications;
use Illuminate\Support\Facades\Queue;

it('sends notification on order creation', function () {
    Notifications::fake();

    $order = Order::factory()->create();

    Notifications::assertSentTo(
        $order->user,
        OrderCreatedNotification::class
    );
});

it('dispatches job on order creation', function () {
    Queue::fake();

    $order = Order::factory()->create();

    Queue::assertPushed(ProcessOrder::class);
});
```

## Database Assertions

```php
it('deletes related records', function () {
    $post = Post::factory()->hasComments(3)->create();

    $post->delete();

    $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    $this->assertDatabaseCount('comments', 0);
});
```

## Test Organization

```php
// tests/Feature/PostTest.php
it('can list posts', function () { ... });
it('can create a post', function () { ... });
it('can update a post', function () { ... });
it('can delete a post', function () { ... });

// tests/Feature/AuthTest.php
it('requires authentication for protected routes', function () { ... });
it('can login with valid credentials', function () { ... });
```

## Do / Don't

### Do
- Use `actingAs()` for authenticated requests.
- Use `assertDatabaseHas()` for state verification.
- Use `Mail::fake()`, `Queue::fake()`, `Events::fake()` for isolation.
- Write descriptive test names with `it('does X when Y')`.
- Use `refresh()` on models to verify state changes.

### Don't
- Do not test framework internals.
- Do not rely on test order or shared state.
- Do not use `withoutExceptionHandling()` in production tests.
- Do not skip assertions — every test should verify something.
