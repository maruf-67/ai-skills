---
name: flutter-routing
description: Micro-skill for go_router route contracts, guarded navigation, and nested flow handling in Flutter apps.
---

# Flutter Routing

## When to use

Use for route definitions, deep links, guarded pages, and nested navigation flows.

## Do

- Prefer `go_router` for route contracts and declarative navigation.
- Keep route guards in routing/controller boundaries.
- Keep nested flows isolated with dedicated navigation scopes.

## Don't

- Do not mix unrelated route concerns in page widgets.
- Do not hide auth/entitlement guard logic in random components.

## Minimal Correct Pattern

```
Route request -> guard check -> route resolve -> page render
```
