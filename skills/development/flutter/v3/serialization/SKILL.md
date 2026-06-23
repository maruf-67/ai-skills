---
name: flutter-serialization
description: Create model classes with `fromJson` and `toJson` methods using `dart:convert`. Use when manually mapping JSON keys to class properties, handling API responses, or implementing type-safe data models.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: 2026-06-23
  source: merged(flutter/skills@main + local)
---

# Serializing JSON in Flutter

## Contents
- [Core Guidelines](#core-guidelines)
- [Workflow: Implementing a Serializable Model](#workflow-implementing-a-serializable-model)
- [Background Parsing](#background-parsing)

## Core Guidelines

- **Import `dart:convert`**: Use `jsonEncode` and `jsonDecode` from Flutter's built-in library.
- **Enforce Type Safety**: Always cast the `dynamic` result of `jsonDecode()` to the expected type: `Map<String, dynamic>` for objects, `List<dynamic>` for arrays.
- **Encapsulate Serialization**: Define model classes with a `factory fromJson()` constructor and `toJson()` method.
- **Use Pattern Matching**: Use Dart's switch pattern matching in `fromJson` to validate property types and handle malformed payloads.
- **Throw on Failure**: Throw a `FormatException` if the JSON structure doesn't match the model contract. Do **not** return `null` on failure.
- **Background Parsing**: Offload large JSON parsing (>16ms) to a background isolate using `compute()`.

## Workflow: Implementing a Serializable Model

**Task Progress:**
- [ ] Define the plain model class with `final` properties.
- [ ] Implement `factory Model.fromJson(Map<String, dynamic> json)`.
- [ ] Implement `Map<String, dynamic> toJson()`.
- [ ] Write unit tests for both serialization methods.

```dart
import 'dart:convert';

class User {
  final int id;
  final String name;
  final String? email; // nullable field

  const User({required this.id, required this.name, this.email});

  /// Deserialize from JSON using pattern matching (Dart 3.0+)
  factory User.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'id': int id,
        'name': String name,
      } =>
        User(
          id: id,
          name: name,
          email: json['email'] as String?,
        ),
      _ => throw const FormatException('Failed to deserialize User model.'),
    };
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      if (email != null) 'email': email,
    };
  }
}

// Usage
void example() {
  final json = jsonDecode('{"id": 1, "name": "Alice", "email": "alice@example.com"}');
  final user = User.fromJson(json as Map<String, dynamic>);
  final serialized = jsonEncode(user.toJson());
}
```

## Background Parsing

Offload expensive JSON parsing to a separate Isolate to prevent UI jank.

```dart
import 'dart:convert';
import 'package:flutter/foundation.dart';

List<User> _parseUsers(String responseBody) {
  final parsed = jsonDecode(responseBody) as List;
  return parsed.map((json) => User.fromJson(json as Map<String, dynamic>)).toList();
}

// In repository:
final users = await compute(_parseUsers, response.body);
```

## Do

- Use `final` properties on model classes for immutability.
- Throw `FormatException` when JSON structure is invalid.
- Use `compute()` for parsing arrays with more than ~50 items.
- Write unit tests for `fromJson` and `toJson` with both valid and malformed payloads.

## Don't

- Do not use `dynamic` typing inside ViewModels or the UI layer.
- Do not silently catch format exceptions — surface them as user-friendly error states.
- Do not write serialization logic inside widgets or ViewModels.
