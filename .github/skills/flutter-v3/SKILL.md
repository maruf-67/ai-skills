---
name: flutter-v3
description: Use for Flutter Android and iOS tasks with Riverpod state, go_router navigation, adaptive responsive UI, and repository-first data access.
---

# Flutter 3 Wrapper Skill

## When to use

Use for Flutter mobile feature work, refactors, bug fixes, architecture reviews, and responsive UI tasks.

## Required routing

1. Apply Flutter 3 guidance from `../../../flutter/v3/SKILL.md`.
2. Use micro-skills as needed:
   - architecture: `../../../flutter/v3/architecture/SKILL.md`
   - routing: `../../../flutter/v3/routing/SKILL.md`
   - state: `../../../flutter/v3/state/SKILL.md`
   - data-fetching: `../../../flutter/v3/data-fetching/SKILL.md`
   - styling: `../../../flutter/v3/styling/SKILL.md`
   - responsive: `../../../flutter/v3/responsive/SKILL.md`

## Auth routing

- For Laravel Sanctum PAT mode use `../../../flutter/v3/auth-sanctum/SKILL.md`.
- For token-first APIs use `../../../flutter/v3/auth-jwt/SKILL.md`.

## Do

- Keep UI and business boundaries explicit.
- Keep async state predictable with Riverpod patterns.
- Keep adaptive behavior explicit by width class and orientation.

## Don’t

- Don’t bypass repository and controller/notifier boundaries.
- Don’t mix Sanctum and JWT patterns in one auth boundary.
