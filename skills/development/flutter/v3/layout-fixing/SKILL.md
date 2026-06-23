---
name: flutter-layout-fixing
description: Fixes Flutter layout errors (overflows, unbounded constraints) using Dart and Flutter MCP tools. Use when addressing "RenderFlex overflowed", "Vertical viewport was given unbounded height", or similar layout issues.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: 2026-06-23
  source: merged(flutter/skills@main + local)
---

# Resolving Flutter Layout Errors

## Contents
- [Constraint Violation Diagnostics](#constraint-violation-diagnostics)
- [Layout Error Resolution Workflow](#layout-error-resolution-workflow)
- [MCP-Assisted Debugging](#mcp-assisted-debugging)

## Constraint Violation Diagnostics

Flutter layout operates on a strict rule: **Constraints go down. Sizes go up. Parent sets position.** Layout errors occur when this negotiation fails due to unbounded constraints or unconstrained children.

| Error | Cause | Fix |
|-------|-------|-----|
| `"Vertical viewport was given unbounded height"` | `ListView`/`GridView` inside unconstrained vertical parent (`Column`) | Wrap in `Expanded` or `SizedBox` with fixed height |
| `"An InputDecorator...cannot have an unbounded width"` | `TextField`/`TextFormField` inside unconstrained horizontal parent (`Row`) | Wrap in `Expanded` or `Flexible` |
| `"RenderFlex overflowed"` | Child of `Row`/`Column` requests size larger than parent's constraints | Wrap overflowing child in `Expanded`, `Flexible`, or set `TextOverflow.ellipsis` |
| `"Incorrect use of ParentData widget"` | `Expanded`/`Positioned` not a direct descendant of its required ancestor | Move widget to be a direct child of `Row`/`Column`/`Stack` |
| `"RenderBox was not laid out"` | Cascading side-effect of above errors | Fix the root constraint violation at the top of the stack trace |

## Layout Error Resolution Workflow

### Fixing Scrollable in Column
```dart
// ✅ Correct: Wrap ListView in Expanded
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
// ✅ Correct: Wrap TextField in Expanded
Row(
  children: [
    const Icon(Icons.search),
    Expanded(
      child: TextField(),
    ),
  ],
)
```

### Fixing RenderFlex Overflow
```dart
// ✅ Correct: Wrap overflowing text
Row(
  children: [
    const Icon(Icons.info),
    Expanded(
      child: Text(
        'Very long text that may overflow the available space',
        overflow: TextOverflow.ellipsis,
      ),
    ),
  ],
)
```

## MCP-Assisted Debugging

Use the Dart/Flutter MCP server tools to diagnose layout issues interactively.

1. Execute `get_widget_tree` to inspect the widget hierarchy and identify unconstrained parents.
2. Look for the root constraint violation at the **top of the stack trace** — ignore secondary `"RenderBox was not laid out"` cascades.
3. Use `get_render_tree` (if available) to inspect the render object constraints.

## Do

- Follow the constraint contract: Constraints go down → Sizes go up → Parent sets position.
- Look at the top of the error stack trace for the root constraint violation.
- Use `Expanded` to fill remaining flex space; use `Flexible` to shrink/expand up to a limit.
- Use `ConstrainedBox` to impose explicit max/min constraints.

## Don't

- Do not use absolute positioning or hardcoded margins/paddings to mask layout overflows.
- Do not place infinite scrollables directly inside flex containers without size limits.
- Do not ignore secondary "RenderBox was not laid out" errors until the root violation is fixed.
