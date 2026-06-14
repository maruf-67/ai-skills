# Skill Test Case: session-init

## Purpose
Verify that the `session-init` skill correctly reads project context and produces an accurate resume report when starting a new AI session.

## Test Scenario 1: Standard Session Resume
### Input
- **Trigger**: `/ai-os:session-init`
- **Context**: Existing project with populated `.ai/playbook/PROGRESS.md`, `.ai/context/system-context.md`, and `.ai/context/domain-knowledge.md`. Git branch has uncommitted work.

### Execution Steps
1. Load the skill: `activate_skill("session-init")`
2. Observe file reads and git commands executed.
3. Verify the Session Resume Report output.

### Expected Result
- [ ] Reads `.ai/playbook/PROGRESS.md` and extracts current phase and pending tasks
- [ ] Reads `.ai/context/system-context.md` and `.ai/context/domain-knowledge.md`
- [ ] Runs `git status --short`, `git branch --show-current`, and `git log --oneline -5`
- [ ] Prints a Session Resume Report containing: Phase, Branch, Last Session summary, Pending tasks, Resume Point, and Uncommitted status
- [ ] Describes each git command before executing it (Git Transparency mandate)
- [ ] Scans memory directory for relevant memories

## Test Scenario 2: Fresh Project (No Prior Sessions)
### Input
- **Trigger**: `/ai-os:session-init`
- **Context**: Freshly initialized project with minimal playbook and context files, no session notes.

### Expected Result
- [ ] Gracefully handles missing or empty PROGRESS.md session notes
- [ ] Reports "No prior sessions" or equivalent in the resume report
- [ ] Does not crash or hallucinate missing files

## Verification Log
| Date | Result | Version | Notes |
| :--- | :--- | :--- | :--- |
| 2026-06-09 | PENDING | v1.0 | Initial test case definition. |