---
name: task-review
version: 1.0.0
description: Perform a comprehensive pre-submission review of the current task. Audits
  code quality, architectural alignment, security, and test coverage. Triggers as
  the final gate before running task-finish.
type: Skill
title: task-review
resource: file:///home/almaruf67/Codes/ai-skills/skills/core/task/task-review/SKILL.md
tags:
- core
- task
- task-review
timestamp: '2026-06-29T19:13:46Z'
---

# Task Review Agent (review)

The final quality gate in the development cycle. This skill ensures that the work is production-ready before it is submitted via `task-pr`.

## Mandates
- **Pre-Review Polish**: Run `/ai-os:dev-harmonize` before starting the review.
- **Fail-Fast**: Stop and report any category that fails audit.
- **No Hallucination**: Every check must be backed by actual code or test evidence.

## Workflow

### 0. Pre-Review Polish (Recommended)
- **Action**: Run `/ai-os:dev-harmonize` to ensure all linting and formatting issues are resolved automatically before the manual review begins.

### 1. Code Quality & Style Audit
- **Check**: Run `harmonize` logic (linting, formatting).
- **Check**: Ensure no "Forbidden Patterns" are used (e.g., logic in Laravel Controllers, `any` in TypeScript).
- **Check**: Verify all new files have appropriate headers and documentation.

### 2. Architectural Alignment
- **Check**: Verify the "Actions Pattern" is followed in Laravel.
- **Check**: Verify Nuxt UI v4 standards and type-safety in the frontend.
- **Check**: Ensure `api-contract-sync` has been run if API changes were made.

### 3. Verification & Tests
- **Check**: Run existing tests relevant to the changed files.
- **Check**: Verify that new tests were added for the current feature/fix.
- **Check**: Scan for N+1 issues using `n-plus-one-check`.

### 4. Security Spot-Check
- **Check**: Run `audit-policy` if Controller/Action logic was modified.
- **Check**: Ensure no secrets or sensitive debug code (e.g., `dd()`, `console.log()`) were left behind.

## Results & Handoff

Upon completion, the agent will present a **Review Scorecard**:

| Category | Status | Notes |
| :--- | :--- | :--- |
| Style & Linting | ✅ / ❌ | |
| Architecture | ✅ / ❌ | |
| Test Coverage | ✅ / ❌ | |
| Security | ✅ / ❌ | |

### Next Step
If the review is **successful**, the agent MUST prompt:
> "Review complete. The task meets standards. Would you like to trigger **`/ai-os:task-finish`** now?"

If there are **failures**:
> "Review failed. Please address the issues listed above before attempting to finish the task."

## Usage
Trigger when you believe the task is complete:
`/ai-os:task-review`
