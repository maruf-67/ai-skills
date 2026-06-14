---
name: filament-testing
description: Pest and Filament testing patterns for Laravel v13. Use this for panel access, resource CRUD flows, validation, and action authorization coverage.
---

# Laravel v13 Filament Testing (Pest)

Use this skill when validating Filament panel access, resource form/table behavior, custom actions, and authorization.

## Required Composition
- Always combine with `pest-testing` skill for test structure and assertions.
- Pair with:
  - `../filament-resources/SKILL.md` for resource behavior
  - `../permissions/SKILL.md` for authorization expectations

## MCP-First Context Workflow
1. Use Laravel Boost `search-docs` for Filament testing queries (`testing resources`, `testing schemas`, `actions authorization`).
2. Use Context7 Filament `5.x` testing docs for current Livewire test APIs.
3. Run the smallest relevant test subset first, then expand if needed.

## Coverage Expectations
- Panel access: authorized admin can access, unauthorized user cannot.
- Resource CRUD: create/edit flows validate expected rules.
- Form validation: invalid states assert form errors.
- Action authorization: forbidden users cannot run sensitive record/bulk actions.
- Domain side effects: assert business outcomes from service/action execution.

## Test Shape
- Use Pest tests in `tests/Feature` (or `tests/Browser` when browser-level behavior is required).
- Use factories/states for realistic data setup.
- Use explicit assertions (`assertForbidden`, `assertSuccessful`, `assertHasFormErrors`, notification and redirect assertions).

```php
livewire(CreateUser::class)
    ->fillForm([
        'email' => null,
    ])
    ->call('create')
    ->assertHasFormErrors([
        'email' => 'required',
    ]);
```

## Execution Order
1. Focused tests with `php artisan test --compact --filter=...`
2. File-level run for changed feature scope
3. `vendor/bin/pint --dirty` before handoff

## Don’t
- Don’t skip authorization assertions for admin actions.
- Don’t verify only happy paths; include failure and permission-denial paths.
- Don’t place core business-rule assertions only in UI tests when domain/service tests can assert them more directly.
