---
name: branch-status
version: 1.0.0
description: Provides a diagnostic report of master, dev, and remote synchronization
  status.
type: Skill
title: branch-status
resource: file:///home/almaruf67/Codes/ai-skills/skills/core/task/branch-status/SKILL.md
tags:
- core
- task
- branch-status
timestamp: '2026-06-29T19:13:46Z'
---

# Branch Status Skill (branch-status)

Performs a deep audit of the primary branches to detect divergence and synchronization gaps.

## Mandates
- **Git Transparency**: Every command used to gather status must be described.
- **Divergence Detection**: Calculate the exact commit difference between `master` and `dev`.
- **Remote Awareness**: Check if local branches are ahead/behind their `origin` counterparts.

## Workflow Execution

### 1. Data Gathering
- `git fetch --all` (Ensure remote state is known).
- `git branch -vv` (Get tracking info).
- `git log master..dev --oneline` (Commits in dev only).
- `git log dev..master --oneline` (Commits in master only).

### 2. Status Calculation
- **SYNCED**: `master` and `dev` point to the same commit.
- **AHEAD**: Local branch has commits not yet pushed to `origin`.
- **DIVERGED**: `master` and `dev` have different commit histories.

### 3. Report Generation
Output a markdown report:
- **MASTER Status**: [Remote Link Status]
- **DEV Status**: [Remote Link Status]
- **ALIGNMENT**: [Synced / Diverged (count)]
- **RECOMMENDATION**: [Next steps, e.g., Run /ai-os:task-branch-sync]

## Usage
`/ai-os:task-branch-status`
