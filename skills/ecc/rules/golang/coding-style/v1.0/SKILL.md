---
name: rule-golang-coding-style
description: "ECC rule: coding-style for golang"
type: Skill
title: coding-style
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/golang/coding-style.md
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
# Go Coding Style

> This file extends [common/coding-style.md](../common/coding-style.md) with Go specific content.

## Formatting

- **gofmt** and **goimports** are mandatory — no style debates

## Design Principles

- Accept interfaces, return structs
- Keep interfaces small (1-3 methods)

## Error Handling

Always wrap errors with context:

```go
if err != nil {
    return fmt.Errorf("failed to create user: %w", err)
}
```

## Reference

See skill: `golang-patterns` for comprehensive Go idioms and patterns.

