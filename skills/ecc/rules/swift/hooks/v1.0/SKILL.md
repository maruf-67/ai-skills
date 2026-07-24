---
name: rule-swift-hooks
description: "ECC rule: hooks for swift"
type: Skill
title: hooks
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/swift/hooks.md
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
# Swift Hooks

> This file extends [common/hooks.md](../common/hooks.md) with Swift specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **SwiftFormat**: Auto-format `.swift` files after edit
- **SwiftLint**: Run lint checks after editing `.swift` files
- **swift build**: Type-check modified packages after edit

## Warning

Flag `print()` statements — use `os.Logger` or structured logging instead for production code.

