---
name: flutter-responsive
description: Micro-skill for Flutter adaptive responsive layouts using LayoutBuilder, MediaQuery, width classes, constraints, and large-screen optimization.
---

# Flutter Responsive and Adaptive UI

## When to use

Use for mobile/tablet/desktop layout adaptation, width breakpoints, constraint-based sizing, and orientation behavior.

## Do

- Evaluate available space using `LayoutBuilder` (for parent-allocated space) or `MediaQuery.sizeOf(context)` (for entire app window).
- Define explicit width breakpoints (e.g., `largeScreenMinWidth = 600.0`) to switch between small-screen and large-screen layouts.
- Understand constraint flow: **Constraints go down. Sizes go up. Parent sets position.**
- Use `Expanded` to force a child to fill remaining flex space, and `Flexible` to allow a child to size itself up to a flex limit.
- Optimize list/form widths on large screens by wrapping them in `ConstrainedBox` with a `maxWidth` constraint, wrapped in a `Center` widget.
- Use `ListView.builder` or `GridView.builder` for lazy rendering of large lists.
- Support resizable windows, folding devices, and multiple inputs (touch, mice, trackpads, keyboards).

## Don't

- Do not lock layouts to a single device size or hardcode device dimensions.
- Do not use physical device checks (e.g. checking if it is a phone or tablet) or lock screen orientation.
- Do not use `MediaQuery.orientationOf` at the root of the widget tree to switch layouts (use `LayoutBuilder` constraints instead).
- Do not build separate application trees for Android and iOS.

## Minimal Correct Pattern

```text
MediaQuery.sizeOf / LayoutBuilder constraints -> width class -> layout/navigation selection -> adaptive components
```
