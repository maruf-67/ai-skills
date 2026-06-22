---
name: flutter-serialization
description: Micro-skill for manual and pattern-matching based JSON serialization and deserialization in Dart/Flutter.
---

# Serializing JSON in Flutter

## When to use

Use when writing serialization methods (`fromJson` and `toJson`) for model classes and deserializing JSON payloads received from API responses or local storage.

## Do

- Import `dart:convert` to access helper functions like `jsonEncode` and `jsonDecode`.
- Cast the output of `jsonDecode` to `Map<String, dynamic>` (for objects) or `List<dynamic>` (for arrays) before mapping.
- Implement a `factory Model.fromJson(Map<String, dynamic> json)` constructor for deserialization, and a `Map<String, dynamic> toJson()` method for serialization.
- Use Dart's modern switch pattern matching in `fromJson` to validate property types and handle malformed payloads safely.
- Throw a `FormatException` if the JSON structure does not match the model's contract.
- Run parsing of large JSON structures (larger than 16ms frames) in a background isolate using Flutter's `compute()` function to avoid UI stutter.

## Don't

- Do not use dynamic typing or untyped structures inside ViewModels or the UI.
- Do not let parsing errors crash the app; always catch format exceptions and surface them as user-friendly messages or fallback states.

## Minimal Correct Pattern

```dart
import 'dart:convert';

class User {
  final int id;
  final String name;

  const User({required this.id, required this.name});

  factory User.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'id': int id,
        'name': String name,
      } =>
        User(id: id, name: name),
      _ => throw const FormatException('Failed to deserialize User model.'),
    };
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
    };
  }
}
```
