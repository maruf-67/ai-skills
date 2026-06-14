---
name: laravel-v12
description: Use for Laravel 12 backend tasks including routing, domain services, API responses, Filament admin, permissions, and auth mode selection.
---

# Laravel v12 Wrapper Skill

## When to use
Use for Laravel 12 feature delivery, API design, service layer updates, permission checks, and auth strategy work.

## Required routing
1. Start from `../../../skills/development/laravel/v12/index.md`.
2. Apply the relevant skill:
   - api-responses: `../../../skills/development/laravel/v12/api-responses/SKILL.md`
   - domain-architecture: `../../../skills/development/laravel/v12/domain-architecture/SKILL.md`
   - routing: `../../../skills/development/laravel/v12/routing/SKILL.md`
   - permissions: `../../../skills/development/laravel/v12/permissions/SKILL.md`
   - filament-panel: `../../../skills/development/laravel/v12/filament-panel/SKILL.md`
   - filament-resources: `../../../skills/development/laravel/v12/filament-resources/SKILL.md`
   - filament-testing: `../../../skills/development/laravel/v12/filament-testing/SKILL.md`
   - auth-sanctum: `../../../skills/development/laravel/v12/auth-sanctum/SKILL.md`
   - auth-jwt: `../../../skills/development/laravel/v12/auth-jwt/SKILL.md`

## Do
- Keep controllers thin and domain logic in services/actions.
- Keep validation and authorization explicit at boundaries.
- Keep response contracts consistent and typed/documented.

## Don’t
- Don’t blend Sanctum and JWT flows in the same service boundary without explicit architecture requirements.
- Don’t introduce framework-version-incompatible patterns.
