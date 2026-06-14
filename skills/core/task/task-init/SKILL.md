---
name: task-init
version: "1.0.0"
description: Initialize a new development task following the master -> dev -> task workflow. Checks git state, syncs dev with master, creates a branch, and sets up task context.
---

# Task Initialization Agent (init)

Safely start a new task following the AI Engineering Git Workflow and the **Git Project Task Complete Cycle**.

## Branch Hierarchy
- **Master/Main**: Production branch (protected).
- **Dev**: Integration branch.
- **Task**: Development branch (created from `dev`).

## Mandates
- **Git Transparency**: Before performing any Git action, provide a brief explanation of its purpose and expected impact.
- **Clean State**: Requires a clean working directory. If "dirty," ask the user to Commit, Stash, or Cancel.
- **Sync First**: Always pulls `origin dev` and merges `origin master/main` into `dev` before branching.
- **Naming Convention**: `prefix/slug-TID-YYYY-MM-DD`.
- **Targeting**: PRs from task branches must target `dev` (the integration branch).

## Workflow

### 1. Validate Repository State (Step 1)
- Verify repository is clean.
- If uncommitted changes exist, prompt the user for action.

### 2. Prepare Integration Branch (Steps 2 & 3)
- Checkout `dev`.
- Pull `origin dev`.
- Fetch `master/main`.
- If `dev` is behind, merge `master/main` into `dev`.

### 3. Create Task Branch (Step 4)
- Generate branch name based on type (feature, fix, ai, design, hotfix).
- Checkout new branch from the synchronized `dev`.

### 4. Task Context Initialization (Step 5)
- Create directory: `.ai/tasks/[branch-name]/`
- Generate `task.md` including the **Step 7 PR Checklist**.
- Generate `checklist.md` for subtask tracking.

### 5. Update Playbook (Step 6)
- Read `.ai/playbook/PROGRESS.md`.
- Append the new task to the **Feature Completion** list as `[ ]`.
- Update the **Current Status** and **Session Notes** to reflect the start of the task.

## Usage
Trigger with task title and type:
`/ai-os:task-init "Task Name" [type]`

Example:
`/ai-os:task-init "Add Expense Chart" feature`
