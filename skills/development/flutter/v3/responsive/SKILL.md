---
name: flutter-responsive
description: Use `LayoutBuilder`, `MediaQuery`, or `Expanded/Flexible` to create adaptive layouts for mobile, tablet, and desktop. Use when building UI that must adapt to different screen sizes and window dimensions.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: 2026-06-23
  source: merged(flutter/skills@main + local)
---

# Flutter Responsive and Adaptive UI

## Contents
- [Space Measurement Guidelines](#space-measurement-guidelines)
- [Widget Sizing and Constraints](#widget-sizing-and-constraints)
- [Device and Orientation Behaviors](#device-and-orientation-behaviors)
- [Workflow: Adaptive Layout](#workflow-adaptive-layout)

## Space Measurement Guidelines

Determine available space accurately to ensure layouts adapt to the app window, not just the physical device.

- **Use `MediaQuery.sizeOf(context)`** to get the size of the entire app window.
- **Use `LayoutBuilder`** to make layout decisions based on the parent widget's allocated space. Evaluate `constraints.maxWidth` to determine the appropriate widget tree.
- **Do not use `MediaQuery.orientationOf` or `OrientationBuilder`** near the top of the widget tree to switch layouts. Device orientation does not accurately reflect available app window space.
- **Do not check for hardware types** (e.g., "phone" vs. "tablet"). Flutter apps run in resizable windows, multi-window modes, and picture-in-picture. Base all layout decisions on available window space.

## Widget Sizing and Constraints

Understand and apply Flutter's core layout rule: **Constraints go down. Sizes go up. Parent sets position.**

- **Distribute Space**: Use `Expanded` and `Flexible` within `Row`, `Column`, or `Flex` widgets.
  - `Expanded` forces a child to fill all remaining available space.
  - `Flexible` allows a child to size itself up to a specific limit. Use the `flex` factor to define the ratio of space among siblings.
- **Constrain Width**: Prevent widgets from consuming all horizontal space on large screens. Wrap in `ConstrainedBox` or `Container` and define a `maxWidth` in `BoxConstraints`.
- **Lazy Rendering**: Always use `ListView.builder` or `GridView.builder` for large or unknown-length lists.

## Device and Orientation Behaviors

- Support resizable windows, folding devices, and multiple input types (touch, mouse, trackpad, keyboard).
- Use `StatefulShellRoute.indexedStack` (go_router) for persistent bottom navigation that adapts to large screens (side rail on tablet/desktop).
- Do **not** build separate widget trees for Android and iOS.

## Workflow: Adaptive Layout

```dart
// Width breakpoints
const double kCompactBreakpoint = 600.0;
const double kExpandedBreakpoint = 840.0;

Widget build(BuildContext context) {
  return LayoutBuilder(
    builder: (context, constraints) {
      if (constraints.maxWidth >= kExpandedBreakpoint) {
        return DesktopLayout();
      } else if (constraints.maxWidth >= kCompactBreakpoint) {
        return TabletLayout();
      }
      return MobileLayout();
    },
  );
}
```

## Minimal Correct Pattern

```text
MediaQuery.sizeOf / LayoutBuilder constraints
  → width class check
    → layout/navigation selection
      → adaptive components (ConstrainedBox + Center for forms)
```

## Do

- Evaluate available space using `LayoutBuilder` (parent-allocated) or `MediaQuery.sizeOf(context)` (app window).
- Define explicit width breakpoints (e.g., `kCompactBreakpoint = 600.0`) to switch between layouts.
- Optimize list/form widths on large screens by wrapping in `ConstrainedBox` with `maxWidth`, inside a `Center`.
- Use adaptive navigation: bottom bar on mobile, rail/drawer on larger screens.

## Don't

- Do not lock layouts to a single device size or hardcode device dimensions.
- Do not use physical device checks (phone vs. tablet) or lock screen orientation.
- Do not use `MediaQuery.orientationOf` at the root to switch layouts.
- Do not build separate application trees for Android and iOS.
