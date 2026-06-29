---
name: flutter-localization
description: Add `flutter_localizations` and `intl` dependencies, enable "generate
  true" in `pubspec.yaml`, and create `l10n.yaml` configuration. Use when initializing
  or extending localization (i18n/l10n) support in a Flutter project.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: 2026-06-23
  source: merged(flutter/skills@main + local)
type: Skill
title: flutter-localization
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/flutter/v3/localization/SKILL.md
tags:
- development
- flutter
- v3
- localization
timestamp: '2026-06-29T19:13:46Z'
---

# Internationalizing Flutter Applications

## Contents
- [Core Concepts](#core-concepts)
- [Setup Workflow](#setup-workflow)
- [ARB File Authoring](#arb-file-authoring)
- [UI Integration](#ui-integration)

## Core Concepts

Flutter handles i18n/l10n via the `flutter_localizations` and `intl` packages. The standard approach uses **App Resource Bundle (`.arb`)** files to define localized strings, which are compiled into a generated `AppLocalizations` class for type-safe access within the widget tree.

## Setup Workflow

### 1. Add Dependencies
```bash
flutter pub add flutter_localizations --sdk=flutter
flutter pub add intl:any
```

Verify `pubspec.yaml`:
```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  intl: any
```

### 2. Enable Code Generation
```yaml
# pubspec.yaml
flutter:
  generate: true
```

### 3. Create Configuration File
Create `l10n.yaml` in the **root directory** of the Flutter project:
```yaml
arb-dir: lib/l10n
template-arb-file: app_en.arb
output-localization-file: app_localizations.dart
synthetic-package: true
```

### 4. Configure App Entry Point
```dart
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      supportedLocales: AppLocalizations.supportedLocales,
      home: const HomeScreen(),
    );
  }
}
```

## ARB File Authoring

### Template (`lib/l10n/app_en.arb`)
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
  },
  "itemCount": "{count, plural, =0{No items} =1{1 item} other{{count} items}}",
  "@itemCount": {
    "description": "Plural count of items",
    "placeholders": {
      "count": { "type": "int" }
    }
  }
}
```

### Translation (`lib/l10n/app_es.arb`)
```json
{
  "greeting": "¡Hola, {name}!",
  "itemCount": "{count, plural, =0{Sin artículos} =1{1 artículo} other{{count} artículos}}"
}
```

## UI Integration

```dart
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

## Do

- Use standard ICU formatting rules for plurals (`{count, plural, ...}`) and selectors (`{gender, select, ...}`) inside `.arb` files.
- Re-run `flutter pub get` after editing `.arb` files to regenerate translation classes.
- Store all localized strings in `.arb` files — never hardcode user-facing strings in widgets.

## Don't

- Do not hardcode user-facing strings directly in layout widgets.
- Do not forget `generate: true` in `pubspec.yaml`.
- Do not bypass the `AppLocalizations` class to format dates/numbers — use the `intl` package's `DateFormat`, `NumberFormat`, etc.
