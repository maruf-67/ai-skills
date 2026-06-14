# Skill Test Case: task-init

## Purpose
Verify that the 'task-init' skill correctly handles the Git workflow and initializes a task workspace.

## Test Scenario 1: Feature Branch Initialization
### Input
- **Trigger**: `/ai-os:task-init "Verify Skill Tests" feature`
- **Context**: Clean Git state on a development branch.

### Execution Steps
1. Load the skill: `activate_skill("task-init")`
2. Run the initialization for a mock feature.
3. Observe Git branch creation and `.ai/tasks/` directory generation.

### Expected Result
- [ ] Successfully syncs with `dev` (if exists).
- [ ] Creates branch with name: `feature/verify-skill-tests-YYYY-MM-DD`.
- [ ] Creates directory: `.ai/tasks/feature-verify-skill-tests-YYYY-MM-DD/`.
- [ ] Generates `task.md` with correct metadata.

## Verification Log
| Date | Result | Version | Notes |
| :--- | :--- | :--- | :--- |
| 2026-05-23 | PASSED | v1.0 | Successfully created feature branch and task workspace. |

