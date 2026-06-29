---
name: flutter-state
description: Micro-skill for Riverpod state architecture with AsyncNotifier, AsyncValue
  rendering, and side-effect boundaries.
type: Skill
title: flutter-state
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/flutter/v3/state/SKILL.md
tags:
- development
- flutter
- v3
- state
timestamp: '2026-06-29T19:13:46Z'
---

# Flutter State (Riverpod)

## When to use

Use when building controllers/notifiers, async state flows, and UI state rendering contracts.

## Do

- Use `AsyncNotifier` or `Notifier` based on task type.
- Expose `AsyncValue<T>` to UI and render loading/error/data states explicitly.
- Keep mutation methods in notifier classes and call via `ref.read(provider.notifier)`.

## Don't

- Do not put side effects directly in widget build methods.
- Do not bypass provider boundaries with mutable global state.

## Minimal Correct Pattern

```
UI watches AsyncValue -> notifier method triggers async work -> state updates -> UI reacts
```
