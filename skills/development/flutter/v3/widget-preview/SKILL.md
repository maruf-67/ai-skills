---
name: flutter-widget-preview
description: Adds interactive widget previews using the `@Preview` annotation system. Use when creating new UI components or updating existing screens to ensure consistent design and interactive isolated testing.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: 2026-06-23
  source: merged(flutter/skills@main + local)
---

# Previewing Flutter Widgets

## Contents
- [Preview Guidelines](#preview-guidelines)
- [Handling Limitations](#handling-limitations)
- [Workflows](#workflows)

## Preview Guidelines

Use the Flutter Widget Previewer to render widgets in real-time, isolated from the full application context.

- **Target Elements**: Apply the `@Preview` annotation to top-level functions, static methods within a class, or public widget constructors/factories that have no required arguments and return a `Widget` or `WidgetBuilder`.
- **Imports**: Always import `package:flutter/widget_previews.dart` to access preview annotations.
- **Custom Annotations**: Extend the `Preview` class to create custom annotations that inject common properties (e.g., themes, wrappers) across multiple widgets.
- **Multiple Configurations**: Apply multiple `@Preview` annotations to a single target to generate multiple preview instances. Alternatively, extend `MultiPreview` to encapsulate common multi-preview configurations.
- **Runtime Transformations**: Override the `transform()` method in custom `Preview` or `MultiPreview` classes to modify preview configurations dynamically at runtime.

## Handling Limitations

The Widget Previewer runs in a **web environment** — adhere to these constraints:

- **No Native APIs**: Do not use native plugins or APIs from `dart:io` or `dart:ffi`. Use conditional imports to mock or bypass these in preview mode.
- **Asset Paths**: Use package-based paths for assets loaded via `dart:ui` `fromAsset` APIs (e.g., `packages/my_package_name/assets/my_image.png`).
- **Public Callbacks**: Ensure all callback arguments are public and constant to satisfy code generation requirements.
- **Constraints**: Apply explicit constraints using the `size` parameter in `@Preview` if your widget is unconstrained.
- **Non-constant**: Do not use non-constant variables or private methods as preview targets or annotation properties.

## Workflows

### Basic Widget Preview
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

### Multiple Configurations (Light & Dark)
```dart
@Preview(name: 'Light Mode', theme: PreviewThemeData.light())
@Preview(name: 'Dark Mode', theme: PreviewThemeData.dark())
Widget cardPreview() {
  return const ProductCard(title: 'Widget');
}
```

### Custom MultiPreview Annotation
```dart
class LightAndDark extends MultiPreview {
  const LightAndDark();

  @override
  List<Preview> get previews => [
    const Preview(name: 'Light', theme: PreviewThemeData.light()),
    const Preview(name: 'Dark', theme: PreviewThemeData.dark()),
  ];
}

@LightAndDark()
Widget myWidgetPreview() => const MyWidget();
```

### Running Previews
```bash
# Start the widget preview tool
flutter widget-preview start
```

## Do

- Import `package:flutter/widget_previews.dart`.
- Use `size` parameter to constrain unconstrained widgets.
- Mock `dart:io`/`dart:ffi` dependencies with conditional imports.
- Group related previews using the `group` parameter.

## Don't

- Do not use native APIs without mocking in preview targets.
- Do not use non-constant variables as annotation properties.
- Do not preview widgets with mandatory dependencies on platform channels.
