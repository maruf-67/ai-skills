---
name: flutter-layout-fixing
description: Micro-skill for diagnosing and fixing common layout errors (RenderFlex overflows, unbounded heights/widths, and ParentData issues).
---

# Resolving Flutter Layout Errors

## When to use

Use when resolving layout violations such as "Vertical viewport was given unbounded height", "RenderFlex overflowed", "An InputDecorator...cannot have an unbounded width", or "Incorrect use of ParentData widget".

## Do

- Follow Flutter's layout contract: **Constraints go down. Sizes go up. Parent sets position.**
- **Diagnose & Fix specific errors:**
  - **"Vertical viewport was given unbounded height":** Wrap the nested scrollable (e.g. `ListView`, `GridView`) in an `Expanded` (if inside a `Column`/`Row`) or a `SizedBox` with a fixed height.
  - **"An InputDecorator...cannot have an unbounded width":** Wrap the `TextField` or `TextFormField` in an `Expanded` or `Flexible` widget if placed inside a `Row`.
  - **"RenderFlex overflowed":** Wrap overflowing text or child widgets in `Expanded` (to fit remaining width) or `Flexible` (to shrink if needed), or configure overflow properties like `TextOverflow.ellipsis`.
  - **"Incorrect use of ParentData widget":** Ensure widgets like `Expanded`, `Flexible`, and `Positioned` are immediate descendants of their required layout parents (`Row`/`Column`/`Flex` or `Stack`).
- Look for the root constraint violation at the top of the stack trace and ignore secondary "RenderBox was not laid out" errors.

## Don't

- Do not use absolute positioning or hardcoded margins/paddings to resolve layout overflows (use flex layouts instead).
- Do not place infinite scrollables directly inside flex containers without size limits.

## Minimal Correct Pattern

### Fixing Scrollable in Column
```dart
// Correct: Wrap ListView in Expanded
Column(
  children: [
    const Text('Header'),
    Expanded(
      child: ListView.builder(
        itemCount: 10,
        itemBuilder: (context, idx) => ListTile(title: Text('Item $idx')),
      ),
    ),
  ],
)
```

### Fixing TextField in Row
```dart
// Correct: Wrap TextField in Expanded
Row(
  children: [
    const Icon(Icons.search),
    Expanded(
      child: TextField(),
    ),
  ],
)
```
