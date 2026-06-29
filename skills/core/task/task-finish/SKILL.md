---
name: task-finish
version: 1.0.0
description: "Orchestrates the full task closure workflow \u2014 generates PR content\
  \ via pr-generator, saves documentation, updates changelog and playbook, submits\
  \ the PR, and handles review/merge. Triggers on /ai-os:task-finish."
type: Skill
title: task-finish
resource: file:///home/almaruf67/Codes/ai-skills/skills/core/task/task-finish/SKILL.md
tags:
- core
- task
- task-finish
timestamp: '2026-06-29T19:13:46Z'
---

# Task Finish

Closes a development task by orchestrating the complete PR pipeline.

## Mandates
- **Git Transparency**: Every git command must be described with its purpose before execution.
- **Single Source of Truth**: PR content must be derived from actual git diff, not assumptions.
- **Review Gate**: Always ask for user approval before creating or merging a PR.

## Workflow

1. **Generate PR Content**: Load the `pr-generator` skill and follow its instructions to produce `PR_TITLE`, `PR_DESCRIPTION`, and `PR_FILENAME`.

2. **Save Documentation**: Determine the storage path based on project structure:
   - **Multi-Repo (API + Frontend Separated)**:
     - Backend: `.ai/source-control-logs/backend/[PR_FILENAME]`
     - Frontend: `.ai/source-control-logs/frontend/[PR_FILENAME]`
   - **Monolith (Unified Project)**: `.ai/source-control-logs/[PR_FILENAME]`

3. **Update Repository CHANGELOG.md**: Prepend the date, PR title, and "What This Does" summary to the `CHANGELOG.md` file in the project root.

4. **Update Playbook**: 
   - Read `.ai/playbook/PROGRESS.md`
   - Mark the current task as complete `[x]`
   - Update **Session Notes** with the completion summary

5. **Submit PR Request**: Present the PR description to the user and ask for submission approval.
   - If confirmed, ask which branch to target: `dev` (default, the integration branch) or `master/main` (production hotfix)
   - Create the PR using `gh pr create --base [target]` with the generated title and description
   - If declined, abort the workflow

6. **PR Review & Merge Decision**: Ask the user how to proceed.
   - **Human Review**: Wait for human approval on the PR, then merge via `gh pr merge --squash`
   - **AI Assist**: Merge directly using `gh pr merge --squash`

## Guidelines

- **Accuracy**: Ensure "Files Changed" is derived from the actual git diff against `dev`
- **Context Detection**: Check if the workspace has separate `backend/` and `frontend/` folders or is a single project
