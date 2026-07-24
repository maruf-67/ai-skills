---
name: rule-golang-patterns
description: "ECC rule: patterns for golang"
type: Skill
title: patterns
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/golang/patterns.md
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
# Go Patterns

> This file extends [common/patterns.md](../common/patterns.md) with Go specific content.

## Functional Options

```go
type Option func(*Server)

func WithPort(port int) Option {
    return func(s *Server) { s.port = port }
}

func NewServer(opts ...Option) *Server {
    s := &Server{port: 8080}
    for _, opt := range opts {
        opt(s)
    }
    return s
}
```

## Small Interfaces

Define interfaces where they are used, not where they are implemented.

## Dependency Injection

Use constructor functions to inject dependencies:

```go
func NewUserService(repo UserRepository, logger Logger) *UserService {
    return &UserService{repo: repo, logger: logger}
}
```

## Reference

See skill: `golang-patterns` for comprehensive Go patterns including concurrency, error handling, and package organization.

