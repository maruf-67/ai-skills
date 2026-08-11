---
name: rule-csharp-hooks
description: "ECC rule: hooks for csharp"
type: Skill
title: hooks
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/csharp/hooks.md
tags:
- ecc
- rule
- csharp
timestamp: '2026-08-03T21:09:42Z'
---

---
paths:
  - "**/*.cs"
  - "**/*.csx"
  - "**/*.csproj"
  - "**/*.sln"
  - "**/Directory.Build.props"
  - "**/Directory.Build.targets"
---
# C# Hooks

> This file extends [common/hooks.md](../common/hooks.md) with C#-specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **dotnet format**: Auto-format edited C# files and apply analyzer fixes
- **dotnet build**: Verify the solution or project still compiles after edits
- **dotnet test --no-build**: Re-run the nearest relevant test project after behavior changes

## Stop Hooks

- Run a final `dotnet build` before ending a session with broad C# changes
- Warn on modified `appsettings*.json` files so secrets do not get committed

