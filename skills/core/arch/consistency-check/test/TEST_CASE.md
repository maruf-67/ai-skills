# Skill Test Case: consistency-check

## Purpose
Verify that the skill correctly audits a codebase for naming, namespace, and structural consistency, and produces a structured report with actionable recommendations.

## Test Scenario 1: Standard Execution (Laravel Project)
### Input
- **Trigger**: `/ai-os:arch-consistency-check`
- **Context**: A Laravel project with standard `app/`, `routes/`, and `database/migrations/` directories.

### Execution Steps
1. Load the skill: `skill("consistency-check")`
2. Observe the output.

### Expected Result
- [ ] Correct agent identity adopted (Architecture Agent: Consistency Check).
- [ ] Stack correctly detected (Laravel).
- [ ] All three checks run: File & Folder Naming, Class/Interface/Enum Naming, Namespace Alignment.
- [ ] Report includes Summary table, Violations tables, Standards Reference, and Recommended Actions.
- [ ] Consistent ✅ / Inconsistent ❌ verdict per check group.

## Test Scenario 2: Edge Case — No Files Found
### Input
- **Trigger**: `/ai-os:arch-consistency-check`
- **Context**: Empty directory or directory with only vendor/node_modules.

### Expected Result
- [ ] Skill notes the limited scope (fewer than 5 files).
- [ ] Suggests a broader scan or valid path.
- [ ] No false positive violations reported.

## Test Scenario 3: Multi-Repo Detection
### Input
- **Trigger**: `/ai-os:arch-consistency-check`
- **Context**: Project with both `backend/` (Laravel) and `frontend/` (Nuxt) directories.

### Expected Result
- [ ] Stack correctly detected as Multi-Repo.
- [ ] Laravel conventions applied to backend files.
- [ ] Nuxt conventions applied to frontend files.
- [ ] Standards Reference includes both stack conventions.

## Verification Log
| Date | Result | Version | Notes |
| :--- | :--- | :--- | :--- |
| 2026-06-08 | PENDING | v1.0 | Initial test case definition. |