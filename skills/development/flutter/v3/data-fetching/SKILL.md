---
name: flutter-data-fetching
description: Use the `http` or `Dio` package to execute GET, POST, PUT, or DELETE requests. Use when fetching from or sending data to a REST API, implementing repository-based API access, background isolate parsing, and typed responses.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: 2026-06-23
  source: merged(flutter/skills@main + local)
---

# Flutter Data Fetching and Networking

## Contents
- [Configuration & Permissions](#configuration--permissions)
- [Request Execution & Response Handling](#request-execution--response-handling)
- [Background Parsing](#background-parsing)
- [Repository Pattern](#repository-pattern)

## Configuration & Permissions

Configure the environment and platform-specific permissions required for network access.

1. Add the networking package:
   ```bash
   # Preferred for repository pattern (interceptors, cancellation, FormData)
   flutter pub add dio

   # Official Dart http package (lighter weight)
   flutter pub add http
   ```
2. Configure **Android** — add the Internet permission to `android/app/src/main/AndroidManifest.xml`:
   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   ```
3. Configure **macOS** entitlements in both `macos/Runner/DebugProfile.entitlements` and `macos/Runner/Release.entitlements`:
   ```xml
   <key>com.apple.security.network.client</key>
   <true/>
   ```

## Request Execution & Response Handling

Execute HTTP operations and map responses to strongly typed Dart objects.

- **URIs**: Always parse URL strings using `Uri.parse('your_url')` (http package) or base-URL + path (Dio).
- **Headers**: Inject authorization and content-type headers via the `headers` parameter map.
- **Payloads**: For POST and PUT requests, encode the body using `jsonEncode()` from `dart:convert`.
- **Status Validation**: Evaluate `response.statusCode`. Treat `200 OK` (GET/PUT/DELETE) and `201 CREATED` (POST) as success.
- **Error Handling**: Throw explicit exceptions for non-success status codes. **Never return `null` on failure** — this prevents `FutureBuilder` from triggering its error state and causes infinite loading.
- **Deserialization**: Parse the raw string using `jsonDecode(response.body)` and map it to a custom Dart object via a factory constructor (e.g., `fromJson`).
- **Timeouts & Cancellation**: Use `Dio`'s `CancelToken` and `connectTimeout`/`receiveTimeout` for long-running operations.

```dart
// lib/data/services/posts_service.dart
import 'package:dio/dio.dart';

class PostsService {
  final Dio _dio;
  PostsService(this._dio);

  Future<List<PostDto>> fetchPosts() async {
    final response = await _dio.get('/posts');
    if (response.statusCode == 200) {
      return (response.data as List)
          .map((json) => PostDto.fromJson(json))
          .toList();
    }
    throw Exception('Failed to load posts: ${response.statusCode}');
  }
}
```

## Background Parsing

Offload expensive JSON parsing to a separate Isolate to prevent UI jank (frame drops >16ms).

- Import `package:flutter/foundation.dart`.
- Use the `compute()` function to run the parsing logic in a background isolate.
- Ensure the parsing function is a **top-level function or static method** (closures and instance methods cannot be passed to isolates).

```dart
import 'package:flutter/foundation.dart';

List<PostDto> _parsePostsInBackground(String responseBody) {
  final parsed = jsonDecode(responseBody) as List;
  return parsed.map((json) => PostDto.fromJson(json)).toList();
}

// In repository:
final posts = await compute(_parsePostsInBackground, response.body);
```

## Repository Pattern

Keep all network/HTTP calls strictly inside repository or data source boundaries.

```text
Notifier (Riverpod AsyncNotifier)
  → Repository (typed contracts)
    → Dio/http Service
      → Background parse (compute)
        → DTO to Domain model
          → AsyncValue / UI State
```

## Don't

- Do not execute raw network requests inside UI widgets.
- Do not return untyped/dynamic payloads from repository methods.
- Do not catch network errors and silently return `null`.
- Do not mix Dio and http package in the same data boundary.
