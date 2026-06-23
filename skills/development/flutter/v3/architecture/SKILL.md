---
name: flutter-architecture
description: Architects a Flutter application using the recommended layered approach (UI, Logic, Data) with MVVM, Riverpod state, and Repository pattern. Use when structuring a new project or refactoring for scalability.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: 2026-06-23
  source: merged(flutter/skills@main + local)
---

# Flutter Architecture (MVVM + Layered)

## Contents
- [Architectural Layers](#architectural-layers)
- [Project Structure](#project-structure)
- [Workflow: Implementing a New Feature](#workflow-implementing-a-new-feature)

## Architectural Layers

Enforce strict **Separation of Concerns** by dividing the application into distinct layers. Never mix UI rendering with business logic or data fetching.

### UI Layer (Presentation)
Implement the MVVM pattern to manage UI state and logic.
- **Views/Widgets**: Write reusable, lean widgets. Restrict logic to UI-specific operations (animations, layout constraints, simple routing). Pass all required data from the ViewModel/Notifier.
- **ViewModels / Notifiers (Riverpod)**: Manage UI state and handle user interactions. Extend `AsyncNotifier` or `Notifier` to expose state. Inject Repositories via the constructor. Expose immutable state snapshots.
- Keep `AsyncValue`-driven UI states explicit for loading/error/data.

### Data Layer
Implement the **Repository pattern** to isolate data access logic and provide a single source of truth.
- **Services**: Create stateless classes to wrap external APIs (Dio/http clients, local databases, platform plugins). Return raw API models (DTOs).
- **Repositories**: Consume one or more Services. Transform DTOs into clean Domain Models. Handle caching, offline sync, and retry logic. Expose Domain Models to ViewModels.

### Logic Layer (Domain — Optional)
- **Use Cases**: Implement only if business logic clutters the ViewModel or must be reused across multiple ViewModels. Extract into dedicated Use Case (interactor) classes.

## Project Structure

Organize using a hybrid approach: group UI components by feature, group Data/Domain components by type.

```text
lib/
├── data/
│   ├── models/         # DTO / API response models
│   ├── repositories/   # Repository implementations
│   └── services/       # Dio/http clients, local storage wrappers
├── domain/
│   ├── models/         # Clean domain models
│   └── use_cases/      # Optional: complex reusable logic
├── features/
│   └── <feature>/
│       ├── presentation/
│       │   ├── screens/     # Full-page widgets
│       │   └── widgets/     # Feature-specific reusable widgets
│       └── providers/       # Riverpod providers / notifiers
├── core/
│   ├── providers/      # App-wide Riverpod providers
│   ├── theme/          # App theme and tokens
│   └── router/         # go_router config
└── main.dart
```

## Do

- Keep AsyncValue-driven UI states explicit for loading/error/data.
- Use typed models and typed repository contracts.
- Use adaptive navigation based on width class.
- Keep side effects and retries outside widgets.
- Inject Repositories/Services into ViewModels/Notifiers via constructors.

## Don't

- Do not place business or entitlement logic in widgets.
- Do not let features or ViewModels import raw API/network clients directly.
- Do not mix presentation state with persistence or cache state.
- Do not mix auth token strategies in one boundary.

## Minimal Correct Pattern

```text
UI (Views/Widgets)
  → ViewModels/Notifiers (Riverpod AsyncNotifier)
    → Repositories (typed contracts)
      → Services (Dio/http client)
        → API/Storage
```

## Workflow: Implementing a New Feature

1. Define domain types and repository contract interface.
2. Implement Service class wrapping the external API.
3. Implement Repository consuming the Service, mapping DTOs → Domain Models.
4. Create Riverpod provider/notifier injecting the repository.
5. Build feature screens/widgets consuming AsyncValue from the provider.
6. Wire route in go_router.
7. Write widget tests for presentation layer.
