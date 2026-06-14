# Skill Test Case: product-pipeline (Orchestrator)

## Purpose
Verify that the orchestrator correctly chains the 5 stages, pauses for human review at the gates, and respects the `continue` command for resuming from any state.

## Test Scenario 1: Full Chain from White-Paper
### Input
- **Trigger**: `/ai-os:product-pipeline full`
- **Context**: A 2-page white-paper is pasted in the prompt.

### Execution Steps
1. Load the skill: `skill("product-pipeline")`
2. Stage 0 — Pre-flight: validate the white-paper quality.
3. Stage 1 — BRD: delegate to `/ai-os:doc-generator brd`. **Pause.**
4. Stage 2 — PRD: delegate to `/ai-os:doc-generator prd`. **Pause.**
5. Stage 3 — Features: delegate to feature-catalogue logic.
6. Stage 4 — PRPs: delegate to `/ai-os:doc-prp` once per feature.
7. Stage 5 — Tasks: delegate to task-decomposition logic.
8. Print wrap-up summary.

### Expected Result
- [ ] All 5 artifacts produced under `/docs/`.
- [ ] Orchestrator paused **twice** (after BRD, after PRD) for human approval.
- [ ] One PRP per feature in `docs/PRPs/`.
- [ ] `tasks.md` contains T-XXX entries cross-linked to PRPs.
- [ ] Wrap-up summary includes next-step hint to run `/ai-os:task-init` on the first task.

## Test Scenario 2: Single Stage — BRD Only
### Input
- **Trigger**: `/ai-os:product-pipeline brd`

### Expected Result
- [ ] Only `docs/brd/BRD.md` is created.
- [ ] Orchestrator pauses once after BRD.
- [ ] No PRD, Features, PRPs, or Tasks are produced.

## Test Scenario 3: Continue from Existing PRD
### Input
- **Trigger**: `/ai-os:product-pipeline continue`
- **Context**: `docs/brd/BRD.md` and `docs/prd/PRD.md` already exist.

### Expected Result
- [ ] Orchestrator detects Stage 2 as complete.
- [ ] Resumes from Stage 3 (Features).
- [ ] Does not re-run BRD or PRD.

## Test Scenario 4: Continue from Fresh State
### Input
- **Trigger**: `/ai-os:product-pipeline continue`
- **Context**: No `docs/` artifacts exist.

### Expected Result
- [ ] Orchestrator detects no progress.
- [ ] Starts from Stage 0 (Pre-flight).
- [ ] Asks the user for source material.

## Test Scenario 5: Edge Case — User Aborts at Pause Gate
### Input
- **Trigger**: `/ai-os:product-pipeline full`
- **Context**: User replies "Abort" at the BRD pause gate.

### Expected Result
- [ ] Orchestrator stops the chain.
- [ ] No further stages are run.
- [ ] The current `docs/brd/BRD.md` is preserved (not deleted).
- [ ] Orchestrator returns control to the user with a clear "chain aborted" message.

## Verification Log
| Date | Result | Version | Notes |
| :--- | :--- | :--- | :--- |
| 2026-06-07 | PENDING | v1.0 | Initial orchestrator test case. |