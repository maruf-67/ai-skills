---
name: flutter-responsive
description: Micro-skill for Flutter adaptive responsive layouts using LayoutBuilder, MediaQuery, width classes, and orientation-aware density.
---

# Flutter Responsive and Adaptive UI

## When to use

Use for mobile/tablet layout adaptation, breakpoint strategy, adaptive navigation, and orientation behavior.

## Do

- Use `LayoutBuilder` for width-class decisions.
- Use `MediaQuery` for device metrics and system insets.
- Use orientation changes only where density or arrangement needs to change.
- Define and reuse explicit width classes.

## Don't

- Do not lock layouts to one device size.
- Do not build separate app trees for Android and iOS.

## Minimal Correct Pattern

```
constraints -> width class -> navigation/layout selection -> adaptive components
```
