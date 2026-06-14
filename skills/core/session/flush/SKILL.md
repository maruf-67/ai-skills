---
name: session-flush
version: "1.0.0"
description: "Before session close, updates playbook, system-context, CHANGELOG, and records resume point for next session. Triggers on /ai-os:session-flush."
---

# Session Flush Agent

Persist session state before closing so the next AI session can resume from exactly this point.

## Mandates
- **No Lost Context**: Every decision, change, and remaining task must be captured.
- **Resume Point**: Always write a clear "where to start next" block.
- **Incremental**: Session numbers increment from the last session in PROGRESS.md.

## Workflow

### 1. Determine Session Number
- Read `.ai/playbook/PROGRESS.md`
- Find the highest existing session number in Session Notes
- Next number = highest + 1

### 2. Summarize Session
From conversational history and code changes:
- Features/tasks completed
- Decisions made and why
- Remaining work on current branch
- New technical debt or bugs discovered

### 3. Update Playbook
- Read `.ai/playbook/PROGRESS.md`
- Mark completed tasks `[x]`
- Append session notes:
```markdown
### Session N — YYYY-MM-DD
- [what was done]
- [decisions made]
- **Remaining:** [what's left on this branch]
- **Next Session Start Point:** [specific action to take next]
- **Branch:** [current branch] @ [git HEAD hash, short]
```

### 4. Update System Context
- Read `.ai/context/system-context.md`
- Update "Current Phase" if work progressed to a new phase
- Update "Implementation Status" table for any modules whose status changed
- Keep it concise — this is a snapshot, not a log

### 5. Update CHANGELOG.md
- Prepend a new entry to repo root `CHANGELOG.md`
- Format:
```markdown
## [Session N] — YYYY-MM-DD

### Completed
- [task/decision summary]

### Remaining
- [what's still pending]
```

### 6. Flush Report
Print confirmation:
```
### Session N Flushed
- Playbook: updated session notes + resume point
- System Context: phase/status updated
- CHANGELOG.md: session entry prepended
- Next resume: [branch] @ [hash] — [resume point summary]

Session context persisted. You may safely restart.
```

## Usage
`/ai-os:session-flush`