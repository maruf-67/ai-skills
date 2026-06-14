---
name: flutter-data-fetching
description: Micro-skill for Flutter repository-based API access, Dio integration, cancellation, and typed response handling.
---

# Flutter Data Fetching

## When to use

Use for API integration, repository design, DTO mapping, retry policies, and cancellation handling.

## Do

- Keep HTTP calls inside repository or datasource boundaries.
- Use typed response models and explicit failure mapping.
- Use cancellation and timeouts for long-running calls.

## Don't

- Do not perform raw network calls from widgets.
- Do not return dynamic/untyped payloads from repositories.

## Minimal Correct Pattern

```
Notifier -> Repository -> Dio client -> DTO parse -> domain model -> AsyncValue state
```
