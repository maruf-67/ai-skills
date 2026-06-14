# Skill Test Case: task-finish

## Purpose
Verify that task-finish correctly orchestrates PR generation, changelog update, playbook update, and PR submission.

## Test Scenario 1: Standard Task Closure
### Input
- **Trigger**: `/ai-os:task-finish`
- **Context**: A feature branch has been developed; `git status` is clean; tests pass.

### Execution Steps
1. Load the skill: `skill("task-finish")`
2. Call `pr-generator` to produce `PR_TITLE`, `PR_DESCRIPTION`, `PR_FILENAME`.
3. Save the PR documentation under `.ai/source-control-logs/`.
4. Update `CHANGELOG.md`.
5. Update `.ai/playbook/PROGRESS.md` (mark task `[x]`).
6. Submit the PR via `gh pr create`.
7. Wait for human or AI merge.

### Expected Result
- [ ] PR content correctly generated from the diff.
- [ ] `.ai/source-control-logs/<PR_FILENAME>` exists.
- [ ] `CHANGELOG.md` has a new dated entry.
- [ ] `PROGRESS.md` shows the task as completed.
- [ ] PR is submitted (URL returned).
- [ ] No merge is forced without approval.

## Test Scenario 2: User Declines Submission
### Input
- **Trigger**: `/ai-os:task-finish`
- **Context**: User declines the PR submission prompt.

### Expected Result
- [ ] PR is NOT submitted.
- [ ] Local PR documentation, changelog, and playbook updates are rolled back OR marked as draft.
- [ ] User is told the workflow was aborted and the next step to retry.

## Test Scenario 3: Tests Fail
### Input
- **Trigger**: `/ai-os:task-finish`
- **Context**: Test suite returns failures.

### Expected Result
- [ ] Skill refuses to generate PR content.
- [ ] User is told to run `/ai-os:qa-auto-fix` first.
- [ ] No changelog or playbook updates are made.

## Verification Log
| Date | Result | Version | Notes |
| :--- | :--- | :--- | :--- |
| 2026-06-07 | PENDING | v1.0 | Initial test case definition. |