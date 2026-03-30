---
name: laravel-v13
description: Use for Laravel 13 backend tasks including routing, domain services, API responses, Filament admin, permissions, and auth mode selection.
---

# Laravel v13 Wrapper Skill

## When to use
Use for Laravel 13 feature delivery, API design, service layer updates, permission checks, and auth strategy work.

## Required routing
1. Start from `../../../laravel/v13/index.md`.
2. Apply the relevant skill:
   - api-responses: `../../../laravel/v13/api-responses/SKILL.md`
   - domain-architecture: `../../../laravel/v13/domain-architecture/SKILL.md`
   - routing: `../../../laravel/v13/routing/SKILL.md`
   - permissions: `../../../laravel/v13/permissions/SKILL.md`
   - filament-panel: `../../../laravel/v13/filament-panel/SKILL.md`
   - filament-resources: `../../../laravel/v13/filament-resources/SKILL.md`
   - filament-testing: `../../../laravel/v13/filament-testing/SKILL.md`
   - auth-sanctum: `../../../laravel/v13/auth-sanctum/SKILL.md`
   - auth-jwt: `../../../laravel/v13/auth-jwt/SKILL.md`

## Do
- Keep controllers thin and domain logic in services/actions.
- Keep validation and authorization explicit at boundaries.
- Keep response contracts consistent and typed/documented.

## Don’t
- Don’t blend Sanctum and JWT flows in the same service boundary without explicit architecture requirements.
- Don’t introduce framework-version-incompatible patterns.
