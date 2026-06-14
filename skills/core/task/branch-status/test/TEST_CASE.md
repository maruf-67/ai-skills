# Skill Test Case: branch-status

## Purpose
Verify that the branch-status skill produces a correct diagnostic report of master, dev, and remote synchronization.

## Test Scenario 1: Branches in Sync
### Input
- **Trigger**: `/ai-os:task-branch-status`
- **Context**: Local `master` and `dev` point to the same commit; both have no unpushed commits.

### Expected Result
- [ ] Report shows `master` and `dev` as `SYNCED`.
- [ ] No divergence count is reported.
- [ ] `RECOMMENDATION` says "No action needed."

## Test Scenario 2: dev Ahead of master
### Input
- **Trigger**: `/ai-os:task-branch-status`
- **Context**: `dev` has 3 commits not in `master`; no unpushed commits.

### Expected Result
- [ ] Report shows `dev AHEAD` of `master` by 3.
- [ ] `RECOMMENDATION` says "Run `/ai-os:task-branch-sync` to align."
- [ ] List of 3 dev-only commits is included.

## Test Scenario 3: Diverge State
### Input
- **Trigger**: `/ai-os:task-branch-status`
- **Context**: `master` has 2 unique commits AND `dev` has 4 unique commits.

### Expected Result
- [ ] Report shows `DIVERGED`.
- [ ] Both commit lists are shown.
- [ ] `RECOMMENDATION` warns about possible conflicts.

## Test Scenario 4: Unpushed Local Commits
### Input
- **Trigger**: `/ai-os:task-branch-status`
- **Context**: `dev` has 2 unpushed commits.

### Expected Result
- [ ] Report flags "2 unpushed commits on dev".
- [ ] `RECOMMENDATION` includes "git push origin dev".

## Verification Log
| Date | Result | Version | Notes |
| :--- | :--- | :--- | :--- |
| 2026-06-07 | PENDING | v1.0 | Initial test case definition. |