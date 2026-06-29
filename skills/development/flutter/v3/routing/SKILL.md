---
name: flutter-routing
description: Configure `MaterialApp.router` using `go_router` for URL-based navigation,
  deep linking, route guards, and nested/shell navigation. Use when developing apps
  that require specific deep linking and browser history support.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: 2026-06-23
  source: merged(flutter/skills@main + local)
type: Skill
title: flutter-routing
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/flutter/v3/routing/SKILL.md
tags:
- development
- flutter
- v3
- routing
timestamp: '2026-06-29T19:13:46Z'
---

# Flutter Routing and Deep Linking (go_router)

## Contents
- [Core Concepts](#core-concepts)
- [Workflow: Initializing Router](#workflow-initializing-router)
- [Route Guards & Auth](#route-guards--auth)
- [Nested Navigation](#nested-navigation)
- [Deep Linking Configuration](#deep-linking-configuration)
- [Verification Commands](#verification-commands)

## Core Concepts

Use the `go_router` package for declarative routing in Flutter.

- **GoRouter**: Central configuration object defining the application's route tree.
- **GoRoute**: A standard route mapping a URL path to a Flutter screen.
- **ShellRoute / StatefulShellRoute**: Wraps child routes in a persistent UI shell (e.g., `BottomNavigationBar`). `StatefulShellRoute` maintains state of parallel navigation branches.
- **Path URL Strategy**: Removes the default `#` fragment from web URLs for clean deep linking.

## Workflow: Initializing Router

```bash
flutter pub add go_router
```

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_web_plugins/url_strategy.dart';

void main() {
  // Remove '#' from web URLs
  usePathUrlStrategy();
  runApp(const MyApp());
}

final GoRouter _router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomeScreen(),
      routes: [
        GoRoute(
          path: 'details/:id',
          builder: (context, state) => DetailsScreen(
            id: state.pathParameters['id']!,
          ),
        ),
      ],
    ),
  ],
  errorBuilder: (context, state) => ErrorScreen(error: state.error),
);

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
    );
  }
}
```

## Route Guards & Auth

Centralize auth/entitlement logic in the `redirect` parameter of `GoRouter`:

```dart
final GoRouter _router = GoRouter(
  redirect: (context, state) async {
    final isAuthenticated = ref.read(authProvider).isAuthenticated;
    final isLoginRoute = state.matchedLocation == '/login';

    if (!isAuthenticated && !isLoginRoute) return '/login';
    if (isAuthenticated && isLoginRoute) return '/';
    return null; // no redirect
  },
  routes: [...],
);
```

## Nested Navigation

Use `StatefulShellRoute.indexedStack` with `StatefulNavigationShell` for persistent bottom navigation bars:

```dart
StatefulShellRoute.indexedStack(
  builder: (context, state, navigationShell) => ScaffoldWithNavBar(
    navigationShell: navigationShell,
  ),
  branches: [
    StatefulShellBranch(routes: [GoRoute(path: '/home', ...)]),
    StatefulShellBranch(routes: [GoRoute(path: '/search', ...)]),
    StatefulShellBranch(routes: [GoRoute(path: '/profile', ...)]),
  ],
)
```

## Deep Linking Configuration

### Android (`android/app/src/main/AndroidManifest.xml`)
```xml
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="https" android:host="yourdomain.com" />
</intent-filter>
```
Host `assetlinks.json` at: `https://yourdomain.com/.well-known/assetlinks.json`

### iOS (`ios/Runner/Info.plist`)
```xml
<key>FlutterDeepLinkingEnabled</key>
<true/>
```
Configure `associated-domains` in `Runner.entitlements` and host `apple-app-site-association` at: `https://yourdomain.com/.well-known/apple-app-site-association`

## Verification Commands

```bash
# Android deep link test
adb shell 'am start -a android.intent.action.VIEW -c android.intent.category.BROWSABLE \
  -d "https://yourdomain.com/details/123"' com.yourcompany.yourapp

# iOS deep link test
xcrun simctl openurl booted https://yourdomain.com/details/123
```

## Do

- Use `context.go()` for declarative/URL routing and `context.push()` only for temporary views.
- Implement route guards in the `redirect` parameter — keep auth logic out of page widgets.
- Use `StatefulShellRoute` to preserve tab state on bottom navigation.

## Don't

- Do not mix routing concerns or hardcode navigation operations inside page widgets.
- Do not hide auth/entitlement logic inside components.
- Do not let different tabs recreate their state on navigation.
