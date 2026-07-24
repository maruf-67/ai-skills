---
name: rule-kotlin-hooks
description: "ECC rule: hooks for kotlin"
type: Skill
title: hooks
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/kotlin/hooks.md
tags:
- ecc
- rule
- kotlin
timestamp: '2026-07-23T07:08:11Z'
---

---
paths:
  - "**/*.kt"
  - "**/*.kts"
  - "**/build.gradle.kts"
---
# Kotlin Hooks

> This file extends [common/hooks.md](../common/hooks.md) with Kotlin-specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **ktfmt/ktlint**: Auto-format `.kt` and `.kts` files after edit
- **detekt**: Run static analysis after editing Kotlin files
- **./gradlew build**: Verify compilation after changes

