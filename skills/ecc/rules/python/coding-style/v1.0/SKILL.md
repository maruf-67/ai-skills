---
name: rule-python-coding-style
description: "ECC rule: coding-style for python"
type: Skill
title: coding-style
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/python/coding-style.md
tags:
- ecc
- rule
- python
timestamp: '2026-07-23T07:08:12Z'
---

---
paths:
  - "**/*.py"
  - "**/*.pyi"
---
# Python Coding Style

> This file extends [common/coding-style.md](../common/coding-style.md) with Python specific content.

## Standards

- Follow **PEP 8** conventions
- Use **type annotations** on all function signatures

## Immutability

Prefer immutable data structures:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class User:
    name: str
    email: str

from typing import NamedTuple

class Point(NamedTuple):
    x: float
    y: float
```

## Formatting

- **black** for code formatting
- **isort** for import sorting
- **ruff** for linting

## Reference

See skill: `python-patterns` for comprehensive Python idioms and patterns.

