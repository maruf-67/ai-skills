---
name: rule-golang-hooks
description: "ECC rule: hooks for golang"
type: Skill
title: hooks
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/golang/hooks.md
tags:
- ecc
- rule
- golang
timestamp: '2026-08-03T21:09:42Z'
---

---
paths:
  - "**/*.go"
  - "**/go.mod"
  - "**/go.sum"
---
# Go Hooks

> This file extends [common/hooks.md](../common/hooks.md) with Go specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **gofmt/goimports**: Auto-format `.go` files after edit
- **go vet**: Run static analysis after editing `.go` files
- **staticcheck**: Run extended static checks on modified packages

