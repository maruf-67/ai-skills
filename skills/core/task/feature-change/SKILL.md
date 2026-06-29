---
name: feature-change
version: 1.0.0
description: Orchestrates feature changes (add / modify / remove) by auditing documents
  (BRD, PRD, PRP), analyzing codebase impact, and updating relevant sections while
  maintaining traceability.
type: Skill
title: feature-change
resource: file:///home/almaruf67/Codes/ai-skills/skills/core/task/feature-change/SKILL.md
tags:
- core
- task
- feature-change
timestamp: '2026-06-29T19:13:46Z'
---

# Feature Change Orchestrator

This skill manages the end-to-end process of implementing a feature change requested by a client. It ensures that all documentation remains synchronized and that the impact on the codebase is fully understood before implementation.

## Mandates
- **Intake First**: Extract all required information before touching any documents or code.
- **Full Traceability**: Map changes across BRD → PRD → PRP even if only one document is mentioned.
- **Surgical Edits**: Rewrite only affected sections, preserving existing voice and formatting.

## Workflow

Follow these 5 steps for every feature change request:

### 1. Intake
Extract the following information before touching any documents or code:
- **Change Type**: Add, Modify, or Remove.
- **Feature Name**: The specific feature being affected.
- **Scope**: What exactly is changing?
- **Rationale**: Why is this change being made?
- **Constraints**: Any technical or business limitations.

**Action**: Ask clarifying questions if the request is vague. Do not proceed until the scope is clear.

### 2. Document Audit
Identify and map affected sections across the project documentation:
- **BRD**: Business requirements and high-level goals.
- **PRD**: Functional requirements, user stories, and acceptance criteria.
- **PRP**: Development playbook, tasks, and implementation details.

**Action**: Map exactly which sections are affected in each document, even if the user only mentions one. Ensure traceability between BRD ↔️ PRD ↔️ PRP.

### 3. Codebase Impact Analysis
Scan the codebase to identify affected files and classify the impact:
- **Search Patterns**: Use `grep_search` and `find` to locate feature-related code (JS/TS, PHP, SQL migrations, Docker, CI/CD, feature flags).
- **Classification**:
  - **CRITICAL**: Core logic, database schema, breaking API changes.
  - **HIGH**: Major component changes, complex business logic.
  - **MEDIUM**: UI updates, minor logic tweaks.
  - **LOW**: Documentation in code, minor CSS, log messages.

**Action**: Produce a table of affected files with their classification and a brief description of the required change.

### 4. Document Updates
Update the documentation to reflect the change:
- **Surgical Edits**: Rewrite only the affected sections.
- **Voice & Style**: Preserve the existing voice and formatting of the documents.
- **Versioning**: Bump version numbers in the documents (if applicable).
- **Change Log**: Add entries to the internal change log or `CHANGELOG.md`.

**Action**: Use the `replace` tool for surgical edits to maintain document integrity.

### 5. Change Impact Report
Produce a ready-to-share Markdown report for the client/stakeholders:
- **Summary**: High-level overview of the change.
- **Document Changes**: List of updated documents and sections.
- **Codebase Impact**: The classification table from Step 3.
- **Risks**: Potential side effects or technical debt introduced.
- **Next Steps**: A checklist for implementation (e.g., "Update tests", "Run migrations").

**Action**: Deliver this report as the final output of the feature change orchestration process.

## Usage
`/ai-os:task-feature-change`

Provide the feature name and change details when prompted.
