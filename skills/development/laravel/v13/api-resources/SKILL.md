---
name: laravel-v13-api-resources
description: Patterns for API Resources, JSON responses, and transformers in Laravel v13.
  Use when creating API response formats, resource classes, or collection transformers.
type: Skill
title: laravel-v13-api-resources
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/laravel/v13/api-resources/SKILL.md
tags:
- development
- laravel
- v13
- api
- resources
timestamp: '2026-07-22T00:00:00Z'
---

# Laravel v13 API Resources

## Resource Structure

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'is_published' => $this->is_published,
            'published_at' => $this->published_at?->toISOString(),
            'user' => new UserResource($this->whenLoaded('user')),
            'comments_count' => $this->whenCounted('comments'),
            'created_at' => $this->created_at->toISOString(),
        ];
    }
}
```

## Collection Resource

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PostCollection extends ResourceCollection
{
    public $collects = PostResource::class;

    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection,
            'meta' => [
                'total' => $this->collection->count(),
            ],
        ];
    }
}
```

## Controller Usage

```php
use App\Http\Resources\PostResource;
use App\Http\Resources\PostCollection;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->paginate(15);
        return new PostCollection($posts);
    }

    public function show(Post $post)
    {
        $post->load('user', 'comments');
        return new PostResource($post);
    }
}
```

## Conditional Loading

```php
public function toArray(Request $request): array
{
    return [
        'id' => $this->id,
        // Only include when relationship is loaded
        'user' => new UserResource($this->whenLoaded('user')),
        // Only include when count is available
        'comments_count' => $this->whenCounted('comments'),
        // Only include for specific requests
        'internal_id' => $this->when(
            $request->user()?->isAdmin(),
            fn () => $this->internal_id
        ),
    ];
}
```

## Error Responses

```php
// In controller
return response()->json([
    'message' => 'Validation failed',
    'errors' => $validator->errors(),
], 422);

// Standard error format
return response()->json([
    'message' => 'Not found',
], 404);
```

## Do / Don't

### Do
- Use Resources for consistent API response formatting.
- Use `whenLoaded()` to conditionally include relationships.
- Use `whenCounted()` for count-only data.
- Return proper HTTP status codes.

### Don't
- Do not expose internal IDs or sensitive data in resources.
- Do not put business logic in resources.
- Do not use Resources for non-API responses.
