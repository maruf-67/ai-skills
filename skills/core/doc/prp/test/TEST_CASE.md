# Skill Test Case: prp

## Purpose
Verify that the PRP generator produces a single, traceable, implementation-ready plan for one feature.

## Test Scenario 1: Standard PRP Generation
### Input
- **Trigger**: `/ai-os:doc-prp F-01`
- **Context**: `docs/features/features.md` exists and contains `F-01 — User Login`.

### Execution Steps
1. Load the skill: `skill("prp")`
2. Read the feature catalogue and locate `F-01`.
3. Draft the PRP using the standard template.
4. Write to `docs/PRPs/PRP-F-01.md`.
5. Update `docs/features/features.md` with a link to the new PRP.

### Expected Result
- [ ] File `docs/PRPs/PRP-F-01.md` is created.
- [ ] All 6 template sections are present (Governance, Vision, Design, Integration, Robustness, References).
- [ ] Feature ID and PRP ID are correctly cross-linked.
- [ ] `features.md` has a link to the new PRP.

## Test Scenario 2: Edge Case — No Feature Catalogue
### Input
- **Trigger**: `/ai-os:doc-prp F-01`
- **Context**: `docs/features/features.md` does not exist.

### Expected Result
- [ ] Skill refuses to proceed.
- [ ] Skill instructs the user to run `/ai-os:product-pipeline` up to Stage 3 (Feature Catalogue).
- [ ] No PRP file is created.

## Test Scenario 3: Edge Case — Unknown Feature ID
### Input
- **Trigger**: `/ai-os:doc-prp F-99`
- **Context**: `features.md` exists but does not contain `F-99`.

### Expected Result
- [ ] Skill flags the missing feature.
- [ ] Skill lists the available feature IDs.
- [ ] No PRP file is created.

## Verification Log
| Date | Result | Version | Notes |
| :--- | :--- | :--- | :--- |
| 2026-06-07 | PENDING | v1.0 | Initial test case definition. |