---
name: project-init
version: "1.0.0"
description: Initialize a project workflow based on current workspace state. Detects whether the workspace is empty or partially ready, decides the initialization path (White-Paper, BRD, or Codebase Analysis), and generates a structured execution plan including BRD, PRD, and task breakdowns. Use when starting a new project or taking over an existing codebase.
---

# Project Initialization Agent (project)

Automate the transition from a product idea, a BRD, or a partial codebase into a structured, production-ready development workflow.

## Mandates
- **Non-Invasive Scan**: Detect workspace state without modifying files until the path is confirmed.
- **Detection Over Interviewing**: Prefer automated detection over asking the user.
- **Softograph Standards**: All generated patterns must follow decoupled or monorepo conventions.

## Workspace State Detection

Upon activation, the agent must perform a non-invasive scan to determine the project's current state:

### 1. Empty Workspace
- **Signal**: No source files or significant directories (except maybe `.git` or `README`).
- **Path**: Offer a choice between:
    - **Start from white-paper**: Generate everything from scratch (BRD -> PRD -> Tasks).
    - **Continue from existing BRD**: Analyze an existing document and build the implementation plan.
- **Architecture**: Ask for "Decoupled" or "Monorepo".

### 2. Partial Project
- **Signal**: Existing source code, `package.json`, `composer.json`, or directory structure like `src/`, `backend/`, `frontend/`.
- **Path**: Run a codebase analysis to detect architecture, dependencies, and current progress.
- **Workstation Check**: Detect if `scripts/install-global-skills.sh` exists and verify if global `/ai-os:` commands are synced.
- **Goal**: Generate a "Current Project Summary" and recommended next steps.
## Decision Matrix

| Workspace State | Recommended Path | Primary Deliverables |
| :--- | :--- | :--- |
| Empty | White-Paper Flow | BRD, PRD, Features, Milestones, Tasks |
| BRD Provided | Existing BRD Flow | PRD, Feature Modules, Tasks, Roadmap |
| Codebase Exists | Partial Project Flow | Architecture Report, Missing Modules, Roadmap |

## Analysis Rules

### Architecture Detection
- **Decoupled**: Look for top-level `frontend/`, `backend/`, `api/`, or `client/`.
- **Monorepo**: Look for `apps/`, `packages/`, `turbo.json`, `pnpm-workspace.yaml`.

## Initialization Flows

### White-Paper Flow
1. **BRD**: Define business goals and core problems.
2. **PRD**: Define functional/non-functional requirements.
3. **Features & Milestones**: Breakdown requirements into phases.
4. **Technical Design**: Folder structure, Database schema, API contracts.
5. **Workflow Setup**: Git strategy, Task breakdown, CI/CD plan.
6. **Workstation Sync**: If `scripts/install-global-skills.sh` exists, run it to register global `/ai-os:` commands.

### Existing BRD Flow
1. **Analysis**: Extract core requirements from the provided BRD.
2. **Gap Detection**: Identify missing technical or business details.
3. **Task Generation**: Build a high-resolution task list for immediate implementation.

### Partial Project Flow
1. **Inventory**: Map existing modules and dependencies.
2. **Structure Audit**: Identify missing folders or architectural drift (e.g., missing tests, docs).
3. **Workstation Audit**: Check if global skills are up-to-date with local definitions.
4. **Roadmap**: Generate tasks to fill gaps and proceed with feature development.

## Output Standard
- **Concise**: Avoid fluff; focus on actionable tasks.
- **Production-Ready**: Patterns must follow standards (Decoupled vs Monorepo).
- **Automated**: Preference for detection over interviewing.

## Usage
`/ai-os:task-project-init`

Example:
`/ai-os:task-project-init`
