---
name: flutter-widget-test
description: Micro-skill for writing component-level widget tests in Flutter using WidgetTester, finders, and matchers.
---

# Writing Flutter Widget Tests

## When to use

Use when writing unit-like component tests to verify UI rendering, layout presence, and user interactions (taps, text input, scrolling) in isolation.

## Do

- Put all test files in the `test/` directory at the project root, named with the `_test.dart` suffix.
- Add `flutter_test` dependency to the `dev_dependencies` section of your `pubspec.yaml`.
- Use the `testWidgets` function to configure and run the widget test environment, which provides a `WidgetTester` instance.
- Wrap the widget under test in parent widgets if it requires inherited data (e.g. `MaterialApp`, `MediaQuery`, or state providers).
- Use `find` selectors (e.g., `find.byKey`, `find.text`, `find.byType`) to locate elements.
- Rebuild the widget tree using `await tester.pump()` after standard events (like button taps) or `await tester.pumpAndSettle()` for animations/transitions.
- Scroll to off-screen elements in scrollable lists using `await tester.scrollUntilVisible(itemFinder, 500.0, scrollable: listFinder)` to ensure they mount.

## Don't

- Do not perform real network or platform channel operations; mock or isolate dependencies using state overrides or mocks.
- Do not forget to call `tester.pump()` or `tester.pumpAndSettle()` after simulating an interaction, otherwise the UI state change will not be processed.
- Do not write overly broad integration tests in widget tests; keep them component-focused.

## Minimal Correct Pattern

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('Increment counter widget test', (WidgetTester tester) async {
    // 1. Build the widget
    await tester.pumpWidget(
      const MaterialApp(
        home: CounterScreen(),
      ),
    );

    // 2. Verify initial state
    expect(find.text('0'), findsOneWidget);

    // 3. Emulate interaction
    await tester.tap(find.byType(FloatingActionButton));

    // 4. Pump state changes
    await tester.pump();

    // 5. Verify updated state
    expect(find.text('1'), findsOneWidget);
  });
}
```
