---
name: test-gen
version: "1.0.0"
description: "Automatically generates Pest (PHP) or Vitest (Vue) tests for Laravel Actions or Nuxt Components. Triggers on /ai-os:qa-test-gen."
---

# QA Agent: Test Generator

This skill ensures that all business logic and UI components have 100% test coverage for happy paths and edge cases.

## Mandates
- **Coverage**: Include happy path, validation failures, and unauthorized access scenarios.
- **Frameworks**: Use **Pest** for Laravel/PHP and **Vitest** for Nuxt/Vue.
- **Mocking**: Use appropriate mocking for external dependencies (APIs, Databases, etc.).

## Workflow

### 1. Analyze Source Code
- Read the specified Laravel Action, Controller, or Nuxt Component.
- Identify the inputs, expected outputs, and potential failure points.
- Analyze validation rules and business logic branches.

### 2. Design Test Cases
- **Happy Path**: Successful execution with valid data.
- **Edge Cases**: Empty strings, maximum limits, boundary values.
- **Failure Paths**: Validation errors, duplicate records, unauthorized attempts.

### 3. Generate Test Suite

#### For Laravel (Pest)
- Create `tests/Feature/[Path]/[Name]Test.php`.
- Use the `it()` or `test()` syntax.
- Include assertions for database changes and API responses.

#### For Nuxt (Vitest)
- Create `[Path]/[Name].test.ts`.
- Use `describe()` and `it()` blocks.
- Include assertions for component rendering and state changes.

### 4. Write to File
- Save the generated test suite to the appropriate directory.

## Usage
`/ai-os:qa-test-gen [SourceFilePath]`

Example:
`/ai-os:qa-test-gen app/Actions/CreateExpenseAction.php`
