---
name: check
version: "1.0.0"
description: "Performs a diagnostic health-check on the AI Engineering OS workstation to ensure all agents, docs, and git states are healthy. Triggers on /ai-os:workstation-check."
---

# Workstation Agent: Health Check

This skill ensures the AI Engineering OS is correctly configured and ready for high-integrity development.

## Mandates
- **Integrity First**: Fail if mandatory agents or docs are missing.
- **Workflow-Aware**: Check the current phase against the `system-context.md`.
- **Git-Safe**: Verify the branch prefix matches the current task type.

## Workflow

### 1. Structure Audit & Repair
Check for existence of mandatory files. If missing, seed them using these templates:

**Template: system-context.md**
```markdown
# System Context
## Overview
Project context initialized via Workstation Check auto-repair.
## Current Phase
- **Active Phase:** Discovery
## Implementation Status
| Module | Status | Notes |
| :--- | :--- | :--- |
| Context | ✅ Initialized | Created via /ai-os:workstation-check |
```

**Template: .ai/playbook/PROGRESS.md**
```markdown
# Development Progress
## Current Status
**Phase:** 1 - Discovery
**Context Usage:** < 5%
## Feature Completion
- [ ] F1: Initial Project Setup
## Session Notes
### Session 1
- Project memory seeded via Workstation Check auto-repair.
```

- Ensure `.ai/agents/` (11 agents required) exist.
- Ensure `docs/` (BRD, PRD, Architecture folders) exist.

### 2. Context Audit
- Read `system-context.md`.
- Identify the active phase.
- Identify active technical debt.

### 3. Git Audit
- Verify the current branch is NOT `main` or `dev`.
- Verify the branch prefix (e.g., `feature/`) matches the task goal in `system-context.md`.

### 4. Skill/Agent Audit
- Verify the global skills are correctly loaded in the environment.

## Output
Return a diagnostic report:
- **GREEN**: All systems ready.
- **YELLOW**: Minor gaps (e.g., missing optional docs, pending tech debt).
- **RED**: Critical failure (e.g., missing mandatory agent, working on `main`).

## Usage
`/ai-os:workstation-check`
