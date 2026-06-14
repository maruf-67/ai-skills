# Skill Test Case: branch-sync

## Purpose
Verify that the branch-sync skill correctly aligns master and dev in both directions and refuses to operate on a dirty working tree.

## Test Scenario 1: Clean Tree, Branches Behind
### Input
- **Trigger**: `/ai-os:task-branch-sync`
- **Context**: Clean working tree; `dev` is 2 commits behind `master`; `master` and `dev` are otherwise in sync.

### Expected Result
- [ ] Git Transparency statement is given before any action.
- [ ] `master` is fetched and pulled.
- [ ] `dev` is checked out and pulled.
- [ ] `master` is merged into `dev` (forward sync).
- [ ] `dev` is merged into `master` (reverse sync).
- [ ] Both branches are pushed to origin.
- [ ] Wrap-up summary lists each merge performed.

## Test Scenario 2: Dirty Working Tree
### Input
- **Trigger**: `/ai-os:task-branch-sync`
- **Context**: Uncommitted changes in the working tree.

### Expected Result
- [ ] Skill refuses to proceed.
- [ ] Skill reports "STATUS: REPO_DIRTY".
- [ ] User is asked to commit, stash, or cancel.

## Test Scenario 3: Merge Conflict
### Input
- **Trigger**: `/ai-os:task-branch-sync`
- **Context**: Conflicting changes on the same file in `master` and `dev`.

### Expected Result
- [ ] Skill detects the conflict.
- [ ] Skill stops and reports the conflicting files.
- [ ] No forced merge or push is attempted.
- [ ] User is asked to resolve manually.

## Verification Log
| Date | Result | Version | Notes |
| :--- | :--- | :--- | :--- |
| 2026-06-07 | PENDING | v1.0 | Initial test case definition. |