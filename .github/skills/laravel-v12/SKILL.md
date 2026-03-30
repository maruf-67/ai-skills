---
name: laravel-v12
description: Use for Laravel 12 backend tasks including routing, domain services, API responses, Filament admin, permissions, and auth mode selection.
---

# Laravel v12 Wrapper Skill

## When to use
Use for Laravel 12 feature delivery, API design, service layer updates, permission checks, and auth strategy work.

## Required routing
1. Start from `../../../laravel/v12/index.md`.
2. Apply the relevant skill:
   - api-responses: `../../../laravel/v12/api-responses/SKILL.md`
   - domain-architecture: `../../../laravel/v12/domain-architecture/SKILL.md`
   - routing: `../../../laravel/v12/routing/SKILL.md`
   - permissions: `../../../laravel/v12/permissions/SKILL.md`
   - filament-panel: `../../../laravel/v12/filament-panel/SKILL.md`
   - filament-resources: `../../../laravel/v12/filament-resources/SKILL.md`
   - filament-testing: `../../../laravel/v12/filament-testing/SKILL.md`
   - auth-sanctum: `../../../laravel/v12/auth-sanctum/SKILL.md`
   - auth-jwt: `../../../laravel/v12/auth-jwt/SKILL.md`

## Do
- Keep controllers thin and domain logic in services/actions.
- Keep validation and authorization explicit at boundaries.
- Keep response contracts consistent and typed/documented.

## Don’t
- Don’t blend Sanctum and JWT flows in the same service boundary without explicit architecture requirements.
- Don’t introduce framework-version-incompatible patterns.
