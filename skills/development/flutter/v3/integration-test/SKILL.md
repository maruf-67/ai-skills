---
name: flutter-integration-test
description: Micro-skill for configuring Flutter Driver and authoring/executing end-to-end integration tests.
---

# Flutter Integration Testing

## When to use

Use when configuring the project for end-to-end (E2E) testing, UI automation with the `integration_test` package, or testing complex user flows.

## Do

- Place integration test files in the `integration_test/` directory at the project root.
- Add `integration_test` and `flutter_test` dependencies to your `dev_dependencies` referencing the Flutter SDK.
- Call `IntegrationTestWidgetsFlutterBinding.ensureInitialized()` at the start of `main()`.
- Use a host driver script (typically `test_driver/integration_test.dart` calling `integrationDriver()`) to coordinate the test run.
- Add descriptive `ValueKey`s to target widgets to ensure robust selector matching.
- Run tests on real devices/emulators using `flutter drive`:
  - E.g.: `flutter drive --driver=test_driver/integration_test.dart --target=integration_test/app_test.dart`
- For web testing: Start `chromedriver --port=4444` before executing the `flutter drive` command.

## Don't

- Do not use mock services if the goal is end-to-end verification; mock only when third-party services (like payment gateways) are involved.
- Do not forget to await asynchronous setup tasks (like database connection seeding) before loading the app widget.

## Minimal Correct Pattern

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
