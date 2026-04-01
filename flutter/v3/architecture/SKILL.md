---
name: flutter-architecture
description: Micro-skill for Flutter architecture boundaries, feature modules, and service/repository layering.
---

# Flutter Architecture

## When to use

Use when creating or refactoring folder structure, module boundaries, or domain layering.

## Do

- Keep feature modules isolated by domain.
- Keep repositories as the only data boundary for controllers.
- Keep platform integrations behind services.

## Don't

- Do not place business logic in widgets.
- Do not let features import raw API clients.

## Minimal Correct Pattern

```
features/* -> controllers -> engine/services -> repositories -> api/storage
```
