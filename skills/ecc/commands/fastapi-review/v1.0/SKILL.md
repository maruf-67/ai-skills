---
name: cmd-fastapi-review
description: "Review a FastAPI application for architecture, async correctness, dependency injection, Pydantic schemas, security, performance, and testability."
type: Skill
title: fastapi-review
resource: file:///home/almaruf67/Codes/ai-os/ECC/commands/fastapi-review.md
tags:
- ecc
- command
timestamp: '2026-08-03T21:09:42Z'
---

# FastAPI Review

Invoke the `fastapi-reviewer` agent for a focused FastAPI review.

## Usage

```text
/fastapi-review [file-or-directory]
```

## Review Areas

- App factory, router boundaries, middleware, and exception handlers.
- Pydantic request and response schema separation.
- Dependency injection for database sessions, auth, pagination, and settings.
- Async database and external HTTP patterns.
- CORS, auth, rate limits, logging, and secret handling.
- OpenAPI metadata and documented response models.
- Test client setup and dependency overrides.

## Expected Output

```text
[SEVERITY] Short issue title
File: path/to/file.py:42
Issue: What is wrong and why it matters.
Fix: Concrete change to make.
```

## Related

- Agent: `fastapi-reviewer`
- Skill: `fastapi-patterns`
- Command: `/python-review`
- Skill: `security-scan`
