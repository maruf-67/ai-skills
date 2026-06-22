---
name: flutter-localization
description: Micro-skill for configuring MaterialApp and ARB files for internationalization (i18n) and localization (l10n) in Flutter.
---

# Internationalizing Flutter Applications

## When to use

Use when setting up localization (i18n) for a new Flutter project, adding new supported locales, or authoring dynamic ARB translation assets.

## Do

- Add `flutter_localizations` (SDK dependency) and `intl` packages to the dependencies section in your `pubspec.yaml`.
- Set `generate: true` under the `flutter` block in `pubspec.yaml`.
- Create the configuration file `l10n.yaml` in the root of the project to define the input directory (`lib/l10n`), template ARB file, and output class settings.
- Define localized string keys in `.arb` files (e.g. `lib/l10n/app_en.arb` and `lib/l10n/app_es.arb`).
- Use the generated class (typically `AppLocalizations`) to retrieve translated keys via `AppLocalizations.of(context)!.key`.
- Inject localization delegates and supported locales into `MaterialApp` or `CupertinoApp`.
- Use standard ICU formatting rules for plurals (e.g., `{count, plural, ...}`) and selectors (e.g., `{gender, select, ...}`) inside `.arb` files.

## Don't

- Do not hardcode user-facing strings directly in the layout widgets (always define them in the template `.arb` file).
- Do not forget to re-run `flutter pub get` after editing `.arb` files to regenerate the translation classes.

## Minimal Correct Pattern

### `l10n.yaml` Configuration
```yaml
arb-dir: lib/l10n
template-arb-file: app_en.arb
output-localization-file: app_localizations.dart
synthetic-package: true
```

### English ARB file (`lib/l10n/app_en.arb`)
```json
{
  "greeting": "Hello, {name}!",
  "@greeting": {
    "description": "Greeting with dynamic name",
    "placeholders": {
      "name": {
        "type": "String",
        "example": "Jane"
      }
    }
  }
}
```

### UI Integration
```dart
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class WelcomeWidget extends StatelessWidget {
  const WelcomeWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    return Text(l10n.greeting('Alice'));
  }
}
```
