---
name: flutter-data-fetching
description: Micro-skill for Flutter repository-based API access, Dio or http client integration, cancellation, background isolate parsing, and typed responses.
---

# Flutter Data Fetching and Networking

## When to use

Use for REST API integrations, repository design, DTO mapping, background JSON parsing, and handling platform network permissions.

## Do

- Keep network/HTTP calls strictly inside repository or data source boundaries.
- Use `Dio` (preferred repository pattern) or the `http` package, and wrap calls in a try-catch block for network exceptions.
- Validate HTTP status codes (e.g. 200/201 as success) and throw explicit exceptions on failure. Never return `null` on failure.
- Offload parsing of large JSON payloads (execution time > 16ms) to a background isolate using Flutter's `compute()` function to avoid dropping UI frames.
- Use timeouts and cancellation tokens for long-running network operations.
- Map DTOs to strongly-typed Domain Models before exposing them to the UI.
- Configure platform network permissions:
  - **Android:** Add Internet permission (`android.permission.INTERNET`) to `AndroidManifest.xml`.
  - **macOS:** Enable client network access (`com.apple.security.network.client`) in Entitlements files.

## Don't

- Do not execute raw network requests or parse JSON directly inside UI widgets.
- Do not return untyped/dynamic payloads from repository methods.
- Do not catch network errors and silently return `null` (this prevents the UI from rendering error/retry states).

## Minimal Correct Pattern

```text
Notifier -> Repository -> Dio/http client -> Background parse (compute) -> DTO to Domain model -> AsyncValue/UI State
```
