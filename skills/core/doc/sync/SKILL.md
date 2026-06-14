---
name: sync
version: "1.0.0"
description: "Synchronizes the project documentation (/docs/) with the actual state of the code by analyzing git diffs. Triggers on /ai-os:doc-sync."
---

# Documentation Agent: Sync

This skill ensures that the project's "Brain" (docs) and "Body" (code) are always perfectly aligned.

## Mandates
- **Single Source of Truth**: The Code is the reality. Update docs to reflect code.
- **Traceability**: If a schema or contract changes in code, find the corresponding `.md` in `/docs/` and update it.
- **Accuracy**: Do not hallucinate. Only update based on verified code changes.

## Workflow

### 1. Analyze Git Diff
- Compare the current state with the previous commit or the base branch (`dev`).
- Identify changes in:
    - Migrations (Database schema).
    - API Resources/DTOs (API Contracts).
    - Backlog/PRD (Feature completions).

### 2. Locate Target Documentation
- Map code changes to `/docs/architecture/database.md`, `/docs/api/contracts.md`, or `/docs/features/`.

### 3. Apply Updates
- Surgical edit the documentation to reflect the new code reality.
- Maintain formatting and table structures.

### 4. Verify
- Ensure the updated documentation matches the code 100%.

## Usage
`/ai-os:doc-sync`
