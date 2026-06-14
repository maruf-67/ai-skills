---
name: auto-fix
version: "1.0.0"
description: "Implements a self-correction loop by running tests, capturing failures, and applying surgical fixes. Triggers on /ai-os:qa-auto-fix."
---

# QA Agent: Auto-Fix (Self-Correction Loop)

This skill automates the "Fix-Test-Repeat" cycle, ensuring code correctness before human review.

## Mandates
- **Surgical Fixes**: Do not rewrite entire files; only fix the logic causing the test failure.
- **Persistence**: Continue the loop until all relevant tests pass or a maximum of 3 attempts is reached.
- **Validation**: Re-run the entire test suite (not just the failing test) after a fix to ensure no regressions.

## Workflow

### 1. Run Tests
- Identify the relevant test file (e.g., `tests/Feature/Actions/CreateExpenseTest.php`).
- Execute the test runner (e.g., `./vendor/bin/pest [path]` or `npm run test [path]`).

### 2. Capture Failure
- Analyze the output log for error messages, stack traces, and line numbers.
- Identify the specific assertion or logic that failed.

### 3. Analyze Source Code
- Locate the source code responsible for the failure (Action, Controller, or Component).
- Compare the current implementation against the test's expectations.

### 4. Apply Fix
- Apply a targeted, surgical edit to fix the identified bug.
- Ensure the fix adheres to the "Softograph Architecture" (Actions, DTOs, etc.).

### 5. Verify & Loop
- Re-run the tests.
- If passed: Success. Update `system-context.md`.
- If failed: Repeat from Step 2 (max 3 times). If still failing after 3 attempts, signal for human intervention with a detailed report of what was tried.

## Usage
`/ai-os:qa-auto-fix [TestFilePath]`

Example:
`/ai-os:qa-auto-fix tests/Feature/Actions/CreateExpenseTest.php`
