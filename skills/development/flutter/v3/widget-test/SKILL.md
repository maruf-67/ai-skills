---
name: flutter-widget-test
description: Implement a component-level test using `WidgetTester` to verify UI rendering
  and user interactions. Use when validating that a specific widget displays correct
  data and responds to events as expected.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: 2026-06-23
  source: merged(flutter/skills@main + local)
type: Skill
title: flutter-widget-test
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/flutter/v3/widget-test/SKILL.md
tags:
- development
- flutter
- v3
- widget-test
timestamp: '2026-06-29T19:13:46Z'
---

# Writing Flutter Widget Tests

## Contents
- [Setup & Configuration](#setup--configuration)
- [Core Components](#core-components)
- [Workflow: Implementing a Widget Test](#workflow-implementing-a-widget-test)
- [Interaction & State Management](#interaction--state-management)

## Setup & Configuration

1. Add `flutter_test` to `dev_dependencies` in `pubspec.yaml` (included by default in new Flutter projects).
2. Place all test files in the `test/` directory at the project root.
3. Suffix all test file names with `_test.dart` (e.g., `counter_test.dart`).

## Core Components

- **`WidgetTester`**: Primary interface for building and interacting with widgets in the test environment. Provided by `testWidgets()`.
- **`Finder`**: Locates widgets in the test environment.
  - `find.text('Submit')` — by visible text
  - `find.byType(TextField)` — by widget type
  - `find.byKey(const Key('submit_btn'))` — by key (most stable)
  - `find.byWidgetPredicate((w) => w is Text && w.data!.startsWith('A'))` — by predicate
- **`Matcher`**: Verifies widget presence/state.
  - `findsOneWidget` — exactly one match
  - `findsNothing` — no matches
  - `findsNWidgets(2)` — exactly N matches
  - `matchesGoldenFile('snapshot.png')` — pixel comparison

## Workflow: Implementing a Widget Test

**Task Progress:**
- [ ] Step 1: Define the test using `testWidgets('description', ...)`.
- [ ] Step 2: Build the widget with `await tester.pumpWidget(MyWidget())`.
- [ ] Step 3: Locate elements using `Finder` objects.
- [ ] Step 4: Verify initial state with `expect(finder, matcher)`.
- [ ] Step 5: Simulate interactions (tap, scroll, enter text).
- [ ] Step 6: Rebuild the tree with `await tester.pump()` or `pumpAndSettle()`.
- [ ] Step 7: Verify updated state.

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

## Interaction & State Management

```dart
// Scrolling to off-screen elements
await tester.scrollUntilVisible(
  find.text('Item 50'),
  500.0,
  scrollable: find.byType(Scrollable),
);

// Entering text
await tester.enterText(find.byType(TextField), 'Hello World');
await tester.pump();

// Drag
await tester.drag(find.byKey(const Key('list')), const Offset(0, -300));
await tester.pumpAndSettle();
```

## Do

- Wrap widget under test in `MaterialApp` or `Directionality` if it needs inherited data.
- Use `await tester.pump()` after standard events; `pumpAndSettle()` for animations/transitions.
- Use `ValueKey`s for the most robust element targeting.
- Mock or isolate dependencies — never perform real network or platform channel operations.
- Scroll to off-screen elements in scrollable lists before asserting on them.

## Don't

- Do not perform real network or platform channel operations in widget tests.
- Do not forget to call `pump()` or `pumpAndSettle()` after interaction — UI state changes will not be processed.
- Do not write integration-level flows in widget tests — keep them component-focused.
