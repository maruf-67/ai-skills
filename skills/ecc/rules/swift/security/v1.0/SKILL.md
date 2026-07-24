---
name: rule-swift-security
description: "ECC rule: security for swift"
type: Skill
title: security
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/swift/security.md
tags:
- ecc
- rule
- swift
timestamp: '2026-07-23T07:08:12Z'
---

---
paths:
  - "**/*.swift"
  - "**/Package.swift"
---
# Swift Security

> This file extends [common/security.md](../common/security.md) with Swift specific content.

## Secret Management

- Use **Keychain Services** for sensitive data (tokens, passwords, keys) — never `UserDefaults`
- Use environment variables or `.xcconfig` files for build-time secrets
- Never hardcode secrets in source — decompilation tools extract them trivially

```swift
let apiKey = ProcessInfo.processInfo.environment["API_KEY"]
guard let apiKey, !apiKey.isEmpty else {
    fatalError("API_KEY not configured")
}
```

## Transport Security

- App Transport Security (ATS) is enforced by default — do not disable it
- Use certificate pinning for critical endpoints
- Validate all server certificates

## Input Validation

- Sanitize all user input before display to prevent injection
- Use `URL(string:)` with validation rather than force-unwrapping
- Validate data from external sources (APIs, deep links, pasteboard) before processing

