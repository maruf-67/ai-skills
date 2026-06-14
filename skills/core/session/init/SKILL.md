---
name: session-init
version: "1.0.0"
description: "Orients the AI at session start by reading playbook, context, and git state to determine where to resume work. Triggers on /ai-os:session-init."
---

# Session Init Agent

Orient a new AI session by loading project context and identifying the resume point.

## Mandates
- **Fast Boot**: Load only what's needed to understand current state. No deep exploration.
- **Resume Awareness**: Identify exactly where the last session left off.
- **Git Transparency**: Before any git command, explain its purpose.

## Workflow

### 1. Load Progress
- Read `.ai/playbook/PROGRESS.md`
- Extract: current phase, pending tasks (unchecked items), last session notes
- Identify the "Next Session Start Point" block if present

### 2. Load System Context
- Read `.ai/context/system-context.md`
- Read `.ai/context/domain-knowledge.md`
- Confirm active phase and module status

### 3. Check Git State
- Run `git status --short` — check for uncommitted work
- Run `git branch --show-current` — which branch are we on?
- Run `git log --oneline -5` — last 5 commits for context

### 4. Session Resume Report
Print a concise report:
```
### Session N — Resume Report
- **Phase:** [current phase from PROGRESS.md]
- **Branch:** [current branch]
- **Last Session:** [date + summary from last session notes]
- **Pending:** [unchecked tasks]
- **Resume Point:** [specific next action]
- **Uncommitted:** [yes/no, brief description]
```

### 5. Memory Load
- Scan `/Users/rowjat/.claude/projects/-Users-rowjat-workspace-ai-ai-knowledge/memory/` for relevant memories
- Confirm memory system is loaded and consistent with project state

## Usage
`/ai-os:session-init`