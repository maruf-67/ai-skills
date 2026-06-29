---
name: flush
version: 1.0.0
description: Summarizes the current session, updates system-context.md, and prepares
  the AI for a fresh, cost-effective session. Triggers on /ai-os:context-flush.
type: Skill
title: flush
resource: file:///home/almaruf67/Codes/ai-skills/skills/core/context/flush/SKILL.md
tags:
- core
- context
- flush
timestamp: '2026-06-29T19:13:46Z'
---

# Context Manager: Flush (Memory Management)

This skill optimizes AI accuracy and token costs by "flushing" old, cluttered context into structured memory.

## Mandates
- **Compression**: Summarize hours of work into high-signal bullet points.
- **Persistence**: Ensure the `system-context.md` is 100% up-to-date before suggesting a restart.
- **Efficiency**: Reduce token "noise" to keep subsequent turns fast and accurate.

## Workflow

### 1. Summarize Session
- Analyze the conversational history and code changes of the current session.
- Identify:
    - Features completed.
    - Decisions made.
    - Remaining tasks in the current branch.
    - New technical debt discovered.

### 2. Update System Context
- Surgical update to `system-context.md`.
- Move "Completed Tasks" to the history/archive section.
- Update the "Next Steps" with the current focus.

### 3. Final Report
- Provide a concise recap of the session.
- Instruction: *"Context safely flushed to system-context.md. Please restart the session to clear the token window and maintain 100% intelligence."*

## Usage
`/ai-os:context-flush`
