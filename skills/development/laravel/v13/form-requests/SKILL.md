---
name: laravel-v13-form-requests
description: Patterns for Form Request validation in Laravel v13.
  Use when creating validation rules, authorization logic, or input sanitization.
type: Skill
title: laravel-v13-form-requests
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/laravel/v13/form-requests/SKILL.md
tags:
- development
- laravel
- v13
- validation
- form-requests
timestamp: '2026-07-22T00:00:00Z'
---

# Laravel v13 Form Requests

## Form Request Structure

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Post::class);
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:50'],
            'published_at' => ['nullable', 'date', 'after:now'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'A post title is required.',
            'body.required' => 'Post content is required.',
        ];
    }
}
```

## Controller Usage

```php
class PostController extends Controller
{
    public function store(StorePostRequest $request)
    {
        $validated = $request->validated();
        $post = Post::create($validated);

        return new PostResource($post);
    }
}
```

## Conditional Rules

```php
public function rules(): array
{
    $rules = [
        'email' => ['required', 'email'],
    ];

    if ($this->routeIs('update')) {
        $rules['email'][] = Rule::unique('users')->ignore($this->route('user'));
    }

    return $rules;
}
```

## Nested Validation

```php
public function rules(): array
{
    return [
        'address' => ['required', 'array'],
        'address.street' => ['required', 'string'],
        'address.city' => ['required', 'string'],
        'address.zip' => ['required', 'string', 'regex:/^\d{5}$/'],
    ];
}
```

## Custom Messages

```php
public function messages(): array
{
    return [
        'email.required' => 'Please provide your email address.',
        'email.email' => 'Please provide a valid email address.',
        'password.min' => 'Password must be at least :min characters.',
    ];
}
```

## Do / Don't

### Do
- Use Form Requests for complex validation logic.
- Put authorization in `authorize()`.
- Use `validated()` to get only validated data.
- Use custom messages for user-friendly errors.

### Don't
- Do not put business logic in Form Requests.
- Do not forget to handle authorization.
- Do not use inline validation when Form Requests are clearer.
