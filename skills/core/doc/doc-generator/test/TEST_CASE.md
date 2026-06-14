# Skill Test Case: doc-generator

## Purpose
Verify that the **atomic** doc-generator skill produces a single BRD or PRD (not a full pipeline) and conforms to documentation standards.

## Test Scenario 1: BRD Phase
### Input
- **Trigger**: `/ai-os:doc-generator brd`
- **Context**: A short white-paper pasted by the user describing a new internal tool.

### Execution Steps
1. Load the skill: `skill("doc-generator")`
2. Run the pre-flight quality gate.
3. Generate `docs/BRD/BRD.md`.
4. **Stop and pause for human review.**

### Expected Result
- [ ] Only `docs/BRD/BRD.md` is created (no PRD, no PRPs, no tasks).
- [ ] BRD contains Business Objectives, Commercial Context, Success Metrics.
- [ ] Skill pauses and asks the user to review before doing anything else.
- [ ] No hallucinated facts beyond the input white-paper.

## Test Scenario 2: PRD Phase from Existing BRD
### Input
- **Trigger**: `/ai-os:doc-generator prd`
- **Context**: An approved `docs/BRD/BRD.md` already exists.

### Expected Result
- [ ] Skill reads the existing BRD before drafting the PRD.
- [ ] `docs/PRD/PRD.md` is created.
- [ ] PRD contains User Personas, Permission Matrix, User Stories linked to BRD requirements.
- [ ] After completion, skill recommends `/ai-os:product-pipeline continue` for the rest of the chain.

## Test Scenario 3: Edge Case — PRD Phase Without BRD
### Input
- **Trigger**: `/ai-os:doc-generator prd`
- **Context**: No `docs/BRD/BRD.md` exists.

### Expected Result
- [ ] Skill refuses to proceed.
- [ ] Skill instructs the user to run `/ai-os:doc-generator brd` first.
- [ ] No PRD file is created.

## Test Scenario 4: Edge Case — Insufficient BRD Input
### Input
- **Trigger**: `/ai-os:doc-generator brd`
- **Context**: Empty or single-sentence input.

### Expected Result
- [ ] Pre-flight gate flags the missing Commercial Context and Success Metrics.
- [ ] Skill prompts the user for the missing information before proceeding.
- [ ] No invalid BRD file is created.

## Verification Log
| Date | Result | Version | Notes |
| :--- | :--- | :--- | :--- |
| 2026-06-07 | PENDING | v1.0 | Refactored test case — atomic scope only. |