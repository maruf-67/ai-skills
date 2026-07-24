---
name: rule-golang-security
description: "ECC rule: security for golang"
type: Skill
title: security
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/golang/security.md
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
# Go Security

> This file extends [common/security.md](../common/security.md) with Go specific content.

## Secret Management

```go
apiKey := os.Getenv("OPENAI_API_KEY")
if apiKey == "" {
    log.Fatal("OPENAI_API_KEY not configured")
}
```

## Security Scanning

- Use **gosec** for static security analysis:
  ```bash
  gosec ./...
  ```

## Context & Timeouts

Always use `context.Context` for timeout control:

```go
ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
defer cancel()
```

