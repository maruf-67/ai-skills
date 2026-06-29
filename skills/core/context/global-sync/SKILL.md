---
name: global-sync
version: 1.0.0
description: Extracts architectural lessons, technical debt, and bug fixes from the
  local project and syncs them to the Global AI OS Knowledge Base. Triggers on /ai-os:context-global-sync.
type: Skill
title: global-sync
resource: file:///home/almaruf67/Codes/ai-skills/skills/core/context/global-sync/SKILL.md
tags:
- core
- context
- global-sync
timestamp: '2026-06-29T19:13:46Z'
---

# Context Manager: Global Sync

This skill creates a "Global Brain" for your AI Engineering OS, allowing lessons learned in one project to benefit all future projects.

## Mandates
- **Anonymization**: Remove project-specific credentials, names, or sensitive data.
- **Conciseness**: Only extract generalized lessons, recurring bugs, or architectural preferences.
- **Consistency**: Maintain the Global Knowledge Base in `~/.gemini/knowledge-base.md`.

## Workflow

### 1. Analyze Local Context
- Read the local `system-context.md` and `docs/decisions/`.
- Identify sections for:
    - **Technical Debt**: Recurring issues or things to avoid.
    - **Decisions**: Preferred patterns (e.g., "Always store currency as integers").
    - **Bug Fixes**: Tricky logic or platform-specific workarounds.

### 2. Generalize Lessons
- Convert project-specific notes into "Global Rules".
- Example: "Expense Tracker stores cents as integers" -> "Global Pattern: Store all currency values as integers to prevent floating-point errors."

### 3. Sync to Global
- Read the Global Knowledge Base at `~/.gemini/knowledge-base.md` (create if missing).
- Append or merge new lessons into the appropriate categories.
- Ensure no duplicates are created.

### 4. Notify Agent
- Summarize the new lessons added to the Global Brain.

## Usage
`/ai-os:context-global-sync`
