---
name: rule-java-hooks
description: "ECC rule: hooks for java"
type: Skill
title: hooks
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/java/hooks.md
tags:
- ecc
- rule
- java
timestamp: '2026-08-03T21:09:42Z'
---

---
paths:
  - "**/*.java"
  - "**/pom.xml"
  - "**/build.gradle"
  - "**/build.gradle.kts"
---
# Java Hooks

> This file extends [common/hooks.md](../common/hooks.md) with Java-specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **google-java-format**: Auto-format `.java` files after edit
- **checkstyle**: Run style checks after editing Java files
- **./mvnw compile** or **./gradlew compileJava**: Verify compilation after changes

