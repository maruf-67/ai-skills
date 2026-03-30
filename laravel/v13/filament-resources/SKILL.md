---
name: filament-resources
description: Filament v5 resource, form, table, and action patterns for Laravel v13. Use this for admin CRUD, relation managers, and policy-aligned actions.
---

# Laravel v13 Filament Resources & Actions (v5)

Use this skill for `app/Filament/Resources/**`, resource pages, relation managers, and table/form actions.

## MCP-First Context Workflow
1. Use Laravel Boost `database-schema` before creating or updating resource fields.
2. Use Laravel Boost `list-routes` if resource pages/actions require route awareness.
3. Use Laravel Boost `search-docs` for resource/form/table/action queries.
4. Use Context7 Filament `5.x` docs for resource APIs (`configure(Table $table)`, actions, relation managers, form lifecycle hooks).

## Resource Design Rules
- Keep resources UI-focused; keep heavy business rules in domain services/actions.
- Use Eloquent relationships and eager loading to avoid N+1 issues in tables and relation managers.
- Keep sensitive operations (refunds, status transitions, entitlement changes) delegated to domain actions/services.
- Prefer built-in create/edit/delete actions unless custom behavior is required.

## Authorization Rules
- Enforce access through policies and Filament authorization hooks (`canAccess`, action authorization, bulk action record authorization).
- Never rely only on UI visibility for security.
- Reuse existing permission enums/guards/middleware conventions.

## Form & Table Patterns
- Forms: use schema-based components and explicit validation.
- Tables: define columns, filters, record actions, and toolbar bulk actions explicitly.
- Mutation hooks: use lifecycle hooks like `mutateFormDataBeforeCreate()` only for transformation, not business orchestration.

```php
public static function configure(Table $table): Table
{
    return $table
        ->columns([
            TextColumn::make('name'),
        ])
        ->recordActions([
            EditAction::make(),
        ])
        ->toolbarActions([
            BulkActionGroup::make([
                DeleteBulkAction::make(),
            ]),
        ]);
}
```

## API Contract Safety
If a Filament action also affects public API behavior:
- Keep response contracts stable via API Resources and standardized response envelopes.
- Route backend-side mutations through the existing domain/service layer.

## Cross-Skill Routing
- Panel-level wiring: `../filament-panel/SKILL.md`
- Filament test strategy: `../filament-testing/SKILL.md`
- API response envelope standard: `../api-responses/SKILL.md`
- Audit columns and `Loggable`: `../auditing-loggable/SKILL.md`
