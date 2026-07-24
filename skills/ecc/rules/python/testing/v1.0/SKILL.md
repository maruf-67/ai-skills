---
name: rule-python-testing
description: "ECC rule: testing for python"
type: Skill
title: testing
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/python/testing.md
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
# Python Testing

> This file extends [common/testing.md](../common/testing.md) with Python specific content.

## Framework

Use **pytest** as the testing framework.

## Coverage

```bash
pytest --cov=src --cov-report=term-missing
```

## Test Organization

Use `pytest.mark` for test categorization:

```python
import pytest

@pytest.mark.unit
def test_calculate_total():
    ...

@pytest.mark.integration
def test_database_connection():
    ...
```

## Reference

See skill: `python-testing` for detailed pytest patterns and fixtures.

