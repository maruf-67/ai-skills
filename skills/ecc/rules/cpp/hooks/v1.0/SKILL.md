---
name: rule-cpp-hooks
description: "ECC rule: hooks for cpp"
type: Skill
title: hooks
resource: file:///home/almaruf67/Codes/ai-os/ECC/rules/cpp/hooks.md
tags:
- ecc
- rule
- cpp
timestamp: '2026-08-03T21:09:42Z'
---

---
paths:
  - "**/*.cpp"
  - "**/*.hpp"
  - "**/*.cc"
  - "**/*.hh"
  - "**/*.cxx"
  - "**/*.h"
  - "**/CMakeLists.txt"
---
# C++ Hooks

> This file extends [common/hooks.md](../common/hooks.md) with C++ specific content.

## Build Hooks

Run these checks before committing C++ changes:

```bash
# Format check
clang-format --dry-run --Werror src/*.cpp src/*.hpp

# Static analysis
clang-tidy src/*.cpp -- -std=c++17

# Build
cmake --build build

# Tests
ctest --test-dir build --output-on-failure
```

## Recommended CI Pipeline

1. **clang-format** — formatting check
2. **clang-tidy** — static analysis
3. **cppcheck** — additional analysis
4. **cmake build** — compilation
5. **ctest** — test execution with sanitizers

