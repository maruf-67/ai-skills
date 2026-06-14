# Skill Test Case: pr-generator

## Purpose
Verify that the 'pr-generator' (task-finish) skill correctly generates PR documentation and updates the changelog.

## Test Scenario 1: Feature PR Generation
### Input
- **Trigger**: `/ai-os:task-finish`
- **Context**: On a feature branch with completed work and a passed review.

### Execution Steps
1. Load the skill: `activate_skill("pr-generator")`
2. Run the generation logic.
3. Observe the creation of the documentation file and the update to `CHANGELOG.md`.

### Expected Result
- [ ] Correctly adopting 'PR & Release Management' identity.
- [ ] Identifies changes against `dev`.
- [ ] Generates valid Markdown file in `knowledge/source-control-logs/`.
- [ ] Correctly prepends entry to `CHANGELOG.md`.

## Verification Log
| Date | Result | Version | Notes |
| :--- | :--- | :--- | :--- |
| 2026-05-23 | PENDING | v1.0 | Initial test case definition. |

