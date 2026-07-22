---
name: laravel-v13-eloquent
description: Patterns for Eloquent models, relationships, migrations, factories, and database
  operations in Laravel v13. Use when creating or modifying models, defining relationships,
  writing migrations, or working with database queries.
type: Skill
title: laravel-v13-eloquent
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/laravel/v13/eloquent/SKILL.md
tags:
- development
- laravel
- v13
- eloquent
- database
timestamp: '2026-07-22T00:00:00Z'
---

# Laravel v13 Eloquent & Database

## Model Structure

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'body', 'user_id'];

    protected $casts = [
        'published_at' => 'datetime',
        'is_published' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
```

## Relationships

### One-to-Many
```php
// Parent: has many children
public function comments(): HasMany
{
    return $this->hasMany(Comment::class);
}

// Child: belongs to parent
public function post(): BelongsTo
{
    return $this->belongsTo(Post::class);
}
```

### Many-to-Many
```php
public function roles(): BelongsToMany
{
    return $this->belongsToMany(Role::class);
}
```

### Has-Many-Through
```php
public function comments(): HasManyThrough
{
    return $this->hasManyThrough(Comment::class, Post::class);
}
```

## Migrations

```php
// Create table
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->string('title');
    $table->text('body')->nullable();
    $table->boolean('is_published')->default(false);
    $table->timestamp('published_at')->nullable();
    $table->timestamps();
    $table->softDeletes();

    $table->index(['user_id', 'is_published']);
});
```

### Foreign Key Actions
```php
// Cascade delete
$table->foreignId('user_id')->constrained()->cascadeOnDelete();

// Set null on delete
$table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();

// Both actions
$table->foreignId('user_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
```

## Enum Casting

```php
use App\Enums\PostStatus;

protected function casts(): array
{
    return [
        'status' => PostStatus::class,
    ];
}

// Usage
if ($post->status === PostStatus::Published) {
    // ...
}
```

## Query Patterns

### Local Scopes
```php
public function scopePublished($query)
{
    return $query->where('is_published', true);
}

// Usage: Post::published()->get();
```

### Eager Loading
```php
$posts = Post::with(['user', 'comments'])->get();
$posts = Post::withCount('comments')->get();
```

### Lazy Loading Prevention
```php
// In AppServiceProvider boot()
Model::preventLazyLoading(!app()->isProduction());
```

## Factories

```php
// Definition
public function definition(): array
{
    return [
        'title' => fake()->sentence(),
        'body' => fake()->paragraphs(3, true),
        'is_published' => fake()->boolean(80),
    ];
}

// With relationships
$user = User::factory()->has(Post::factory()->count(3))->create();
$posts = Post::factory()->count(5)->forUser()->create();
```

## Do / Don't

### Do
- Use `$fillable` to guard mass-assignment attributes.
- Define return types on relationship methods.
- Use `constrained()` for foreign keys to leverage model table resolution.
- Use local scopes for reusable query logic.
- Use factories for test data generation.

### Don't
- Do not use `$guarded = []` in production without careful review.
- Do not forget to handle soft deletes when needed.
- Do not N+1 query — use eager loading or `withCount`.
- Do not put business logic in models beyond scope helpers.
