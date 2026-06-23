---
name: flutter-integration-test
description: Configures Flutter Driver for app interaction and converts MCP actions into permanent integration tests. Use when adding integration testing, exploring UI components via MCP, or automating user flows with the integration_test package.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: 2026-06-23
  source: merged(flutter/skills@main + local)
---

# Implementing Flutter Integration Tests

## Contents
- [Project Setup and Dependencies](#project-setup-and-dependencies)
- [Interactive Exploration via MCP](#interactive-exploration-via-mcp)
- [Test Authoring Guidelines](#test-authoring-guidelines)
- [Execution and Profiling](#execution-and-profiling)

## Project Setup and Dependencies

Configure the project to support integration testing and Flutter Driver extensions.

1. Add required development dependencies to `pubspec.yaml`:
   ```bash
   flutter pub add 'dev:integration_test:{"sdk":"flutter"}'
   flutter pub add 'dev:flutter_test:{"sdk":"flutter"}'
   ```
2. Enable the Flutter Driver extension in your application entry point (typically `lib/main.dart` or a dedicated `lib/main_test.dart`):
   - Import `package:flutter_driver/driver_extension.dart`.
   - Call `enableFlutterDriverExtension();` before `runApp()`.
3. Call `IntegrationTestWidgetsFlutterBinding.ensureInitialized()` at the start of `main()`.
4. Add `Key` parameters (e.g., `ValueKey('login_button')`) to critical widgets to ensure reliable targeting.
5. Place all integration test files in the `integration_test/` directory at the project root.

## Interactive Exploration via MCP

Use the Dart/Flutter MCP server tools to interactively explore and manipulate the application state before writing static tests.

- **Launch**: Execute `launch_app` with `target: "lib/main_test.dart"` to start the application and acquire the DTD URI.
- **Inspect**: Execute `get_widget_tree` to discover available `Key`s, `Text` nodes, and widget `Type`s.
- **Interact**: Execute `tap`, `enter_text`, and `scroll` to simulate user flows.
- **Wait**: Always execute `waitFor` or verify state with `get_health` when navigating or triggering animations.
- **Troubleshoot Unmounted Widgets**: If a widget is not found in the tree, it may be lazily loaded in a `SliverList` or `ListView`. Execute `scroll` or `scrollIntoView` to force the widget to mount before interacting with it.

## Test Authoring Guidelines

- Name all test files using the `<name>_test.dart` convention.
- Initialize the binding: `IntegrationTestWidgetsFlutterBinding.ensureInitialized();` in `main()`.
- Use a host driver script (`test_driver/integration_test.dart` calling `integrationDriver()`) to coordinate the test run.
- Do **not** use mock services if the goal is end-to-end verification; mock only third-party services (payment gateways, etc.).
- For web testing: start `chromedriver --port=4444` before executing `flutter drive`.

```dart
// integration_test/app_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:my_app/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('End-to-End App Test', () {
    testWidgets('verify login flow', (WidgetTester tester) async {
      app.main();
      await tester.pumpAndSettle();

      final loginButton = find.byKey(const ValueKey('login_button'));
      expect(loginButton, findsOneWidget);

      await tester.tap(loginButton);
      await tester.pumpAndSettle();
    });
  });
}
```

```dart
// test_driver/integration_test.dart
import 'package:integration_test/integration_test_driver.dart';

Future<void> main() => integrationDriver();
```

## Execution and Profiling

```bash
# Run on device/emulator
flutter drive \
  --driver=test_driver/integration_test.dart \
  --target=integration_test/app_test.dart

# Run on web (start chromedriver first)
chromedriver --port=4444 &
flutter drive \
  --driver=test_driver/integration_test.dart \
  --target=integration_test/app_test.dart \
  -d web-server
```
