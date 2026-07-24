---
name: rule-golang-testing
description: "ECC rule: testing for golang"
type: Skill
title: testing
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/golang/testing.md
tags:
- ecc
- rule
- golang
timestamp: '2026-07-23T07:08:11Z'
---

---
paths:
  - "**/*.go"
  - "**/go.mod"
  - "**/go.sum"
---
# Go Testing

> This file extends [common/testing.md](../common/testing.md) with Go specific content.

## Framework

Use the standard `go test` with **table-driven tests**.

## Race Detection

Always run with the `-race` flag:

```bash
go test -race ./...
```

## Coverage

```bash
go test -cover ./...
```

## Reference

See skill: `golang-testing` for detailed Go testing patterns and helpers.

