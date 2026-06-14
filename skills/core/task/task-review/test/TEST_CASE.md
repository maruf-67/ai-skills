# Skill Test Case: task-review

## Purpose
Verify that the 'task-review' skill correctly audits the task and suggests the next steps.

## Test Scenario 1: Standard Review
### Input
- **Trigger**: `/ai-os:task-review`
- **Context**: On a feature branch (`feature/verify-skill-tests-...`) with committed changes.

### Execution Steps
1. Load the skill: `activate_skill("task-review")`
2. Run the audit.
3. Observe the Review Scorecard and the final prompt.

### Expected Result
- [ ] Correctly adopting 'Task Review Agent' identity.
- [ ] Identifies 'Pre-Review Polish' (recommends `harmonize`).
- [ ] Audits Code Quality, Architecture, Tests, and Security.
- [ ] Prompts for `/ai-os:task-finish` on success.

## Verification Log
| Date | Result | Version | Notes |
| :--- | :--- | :--- | :--- |
| 2026-05-23 | PENDING | v1.0 | Initial test case definition. |

