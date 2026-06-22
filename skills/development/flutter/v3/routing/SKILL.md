---
name: flutter-routing
description: Micro-skill for go_router route contracts, guarded navigation, nested flow handling, and deep linking configuration.
---

# Flutter Routing and Deep Linking

## When to use

Use for route definitions, deep links, guarded pages, and nested navigation flows using `go_router`.

## Do

- Use `go_router` for route contracts and declarative navigation.
- Call `usePathUrlStrategy()` in `main()` to remove the `#` fragment from web URLs.
- Implement route guards using `GoRouter`'s `redirect` parameter to centralize auth/entitlement logic.
- Use `StatefulShellRoute.indexedStack` with `StatefulNavigationShell` for persistent bottom navigation bars to preserve the state of tab branches.
- Use `context.go()` for declarative/relative URL routing and `context.push()` only when pushing temporary views.
- **Deep Linking Configuration:**
  - **Android:** Configure `<intent-filter>` in `AndroidManifest.xml` with `android:autoVerify="true"` and host `assetlinks.json` at `https://yourdomain.com/.well-known/assetlinks.json`.
  - **iOS:** Enable `FlutterDeepLinkingEnabled` in `Info.plist`, configure `associated-domains` in `Runner.entitlements`, and host `apple-app-site-association` at `https://yourdomain.com/.well-known/apple-app-site-association`.

## Don't

- Do not mix routing concerns or hardcode navigation operations directly inside page widgets.
- Do not hide auth/entitlement check logic inside components.
- Do not let different tabs recreate their state on navigation (use `StatefulShellRoute` to preserve state).

## Minimal Correct Pattern

```text
Route request -> redirect/guard check -> StatefulShellRoute -> target page render
```

## Deep Link Verification commands
```bash
# Android
adb shell 'am start -a android.intent.action.VIEW -c android.intent.category.BROWSABLE -d "https://yourdomain.com/details/123"' com.yourcompany.yourapp

# iOS
xcrun simctl openurl booted https://yourdomain.com/details/123
```
