---
name: branch-sync
version: "1.0.0"
description: Aligns master and dev branches by performing a full bidirectional synchronization. Ensures production and integration branches are identical.
---

# Branch Synchronization Skill (branch-sync)

Automates the alignment of `master` and `dev` branches to ensure the repository state is consistent across primary tracks.

## Mandates
- **Git Transparency**: Every command must be described with its purpose and impact before execution.
- **Bi-Directional Alignment**:
    1. Merge `master` -> `dev` (Forward Sync).
    2. Merge `dev` -> `master` (Reverse Sync).
- **Remote Integrity**: Always fetch and pull from `origin` before merging.
- **Conflict Handling**: If a conflict occurs, stop and ask the user for manual resolution.

## Workflow Execution
Run the automated synchronization script:
`./scripts/branch-sync.sh`

## Usage
Trigger the alignment:
`/ai-os:task-branch-sync`
