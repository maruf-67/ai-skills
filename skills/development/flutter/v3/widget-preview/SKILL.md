---
name: flutter-widget-preview
description: Micro-skill for configuring and previewing isolated Flutter components using the widget_previews system.
---

# Previewing Flutter Widgets

## When to use

Use when developing UI components in isolation, enabling real-time canvas previewing in supported IDEs (Android Studio, IntelliJ, VS Code) or the CLI via `flutter widget-preview start`.

## Do

- Import `package:flutter/widget_previews.dart` to access preview annotations.
- Apply the `@Preview` annotation to top-level functions, static methods, or parameter-less public constructors that return a `Widget` or `WidgetBuilder`.
- Use the `size` parameter in the `@Preview` annotation to provide explicit constraints if the target widget is unconstrained.
- Extend `Preview` or `MultiPreview` classes to encapsulate theme and configuration settings (like light/dark modes) for multiple previews.
- Override the `transform()` method in custom `Preview` classes to dynamically resolve names or inject runtime themes.
- Mock native dependencies (e.g. `dart:io` or `dart:ffi` APIs) as the preview environment runs on the web platform.

## Don't

- Do not use native APIs or transitive dependencies on native plugins without mocking (these fail in the web preview runner).
- Do not use non-constant variables or private methods as preview targets or annotation properties.

## Minimal Correct Pattern

```dart
import 'package:flutter/widget_previews.dart';
import 'package:flutter/material.dart';

@Preview(name: 'Primary Button', group: 'Buttons', size: Size(200, 50))
Widget primaryButtonPreview() {
  return ElevatedButton(
    onPressed: () {},
    child: const Text('Submit'),
  );
}
```
