---
name: flutter-architecture
description: Micro-skill for Flutter architecture boundaries, feature modules, and service/repository layering.
---

# Flutter Architecture

## When to use

Use when creating or refactoring folder structure, module boundaries, or domain layering to ensure a clean separation of concerns.

## Do

- **UI Layer (Presentation):**
  - Implement MVVM. Keep Views lean and presentation-focused.
  - Expose immutable state snapshots from ViewModels.
  - Inject Repositories/Services into ViewModels/Notifiers via constructors or provider references.
- **Data Layer:**
  - Implement the Repository pattern to isolate data access logic and provide a single source of truth.
  - Create stateless Service classes to wrap external APIs (HTTP clients, local databases, plugins).
  - Transform raw API models (DTOs) into clean Domain Models inside Repositories.
- **Logic Layer (Domain):**
  - Use dedicated Use Case (interactor) classes only if business logic is reused across multiple view models/controllers or becomes complex.
- **Structure:**
  - Group UI components by feature domain, and group Data/Domain components by type (e.g., `data/models`, `data/repositories`, `data/services`).

## Don't

- Do not place business or entitlement logic in widgets.
- Do not let features or ViewModels import raw API/network clients directly.
- Do not mix presentation state with persistence or cache state.

## Minimal Correct Pattern

```text
UI (Views) -> ViewModels/Notifiers -> Repositories -> Services -> API/Storage
```
