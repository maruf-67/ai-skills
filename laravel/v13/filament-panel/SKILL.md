---
name: filament-panel
description: Filament v5 panel configuration patterns for Laravel v13. Use this for AdminPanelProvider setup, middleware/auth, discovery, and panel-level access rules.
---

# Laravel v13 Filament Panel (v5)

Use this skill when adding or changing Filament panel providers, panel path/auth configuration, panel middleware, and panel discovery behavior.

## MCP-First Context Workflow
1. Confirm framework/package versions using Laravel Boost `application-info`.
2. Read panel configuration docs using Laravel Boost `search-docs` (queries like `panel configuration`, `middleware`, `panel provider`).
3. Refresh uncertain behavior with Context7 Filament `5.x` docs.
4. If docs and project code differ, follow project code patterns.

## Panel Baseline
- Provider location: `app/Providers/Filament/*PanelProvider.php`
- Default admin path: `/admin` (change only with explicit requirement)
- Discovery paths:
  - `app/Filament/Resources`
  - `app/Filament/Pages`
  - `app/Filament/Widgets`
- Authentication model: session/cookie auth for admin panel; no browser bearer token flow.

## Minimal Pattern
```php
public function panel(Panel $panel): Panel
{
    return $panel
        ->id('admin')
        ->path('admin')
        ->middleware([
            // ...
        ])
        ->authMiddleware([
            // ...
        ]);
}
```

## Do
- Keep panel provider focused on panel wiring (id, path, discovery, middleware, auth middleware).
- Keep authorization explicit at panel/resource/action boundaries.
- Register only required plugins/widgets/resources for the panel.
- Reuse existing middleware and auth conventions from `bootstrap/app.php` and current panel providers.

## Don’t
- Don’t move domain/business logic into panel providers.
- Don’t bypass backend authorization because a user reached the panel UI.
- Don’t mix PAT/JWT browser flows into a session-based admin panel without explicit architecture change.

## Cross-Skill Routing
- Resource CRUD and custom actions: `../filament-resources/SKILL.md`
- Filament/Pest tests: `../filament-testing/SKILL.md`
- Permission checks: `../permissions/SKILL.md`
- Domain orchestration boundaries: `../domain-architecture/SKILL.md`
