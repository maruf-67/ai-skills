# Skill Test Case: session-flush

## Purpose
Verify that the `session-flush` skill correctly persists session state across playbook, system-context, and CHANGELOG before closing an AI session.

## Test Scenario 1: Standard Session Flush
### Input
- **Trigger**: `/ai-os:session-flush`
- **Context**: Session with completed work. PROGRESS.md has Session Notes up to Session 3. CHANGELOG.md exists at repo root.

### Execution Steps
1. Load the skill: `activate_skill("session-flush")`
2. Observe file reads and updates.
3. Verify all output files are correctly updated.

### Expected Result
- [ ] Correctly determines next session number (Session 4)
- [ ] Reads PROGRESS.md and marks completed tasks `[x]`
- [ ] Appends session notes with date, summary, decisions, remaining work, and "Next Session Start Point"
- [ ] Records current branch and git HEAD short hash in the resume point
- [ ] Updates `.ai/context/system-context.md` with any phase/status changes
- [ ] Prepends a new `[Session 4] — YYYY-MM-DD` entry to `CHANGELOG.md` at repo root
- [ ] Prints flush confirmation report
- [ ] Session notes follow the format: `### Session N — YYYY-MM-DD`

## Test Scenario 2: First Session (No Prior Sessions)
### Input
- **Trigger**: `/ai-os:session-flush`
- **Context**: First ever session. PROGRESS.md has no session notes section entries.

### Expected Result
- [ ] Correctly assigns Session 1 as the session number
- [ ] Creates session notes section if it doesn't exist
- [ ] All other updates (CHANGELOG, system-context) proceed normally

## Verification Log
| Date | Result | Version | Notes |
| :--- | :--- | :--- | :--- |
| 2026-06-09 | PENDING | v1.0 | Initial test case definition. |