# Skill Test Case: feature-change

## Purpose
Verify that the feature-change orchestrator correctly performs intake, document audit, codebase impact analysis, document updates, and final report.

## Test Scenario 1: Modify a Feature
### Input
- **Trigger**: `/ai-os:task-feature-change`
- **Context**: User says "Modify the expense export feature to support PDF format in addition to CSV."

### Execution Steps
1. Load the skill: `skill("feature-change")`
2. Step 1 — Intake: classify as `Modify`, feature = "expense export", scope = "add PDF format".
3. Step 2 — Document Audit: locate BRD requirement, PRD user story, and PRP for "expense export".
4. Step 3 — Codebase Impact Analysis: grep for `exportCsv`, classify affected files.
5. Step 4 — Document Updates: surgically edit the PRP and PRD.
6. Step 5 — Change Impact Report.

### Expected Result
- [ ] All 5 steps executed in order.
- [ ] BRD/PRD/PRP traceability is preserved (no orphaned links).
- [ ] Impact table classifies each affected file (CRITICAL/HIGH/MEDIUM/LOW).
- [ ] Final Markdown report contains Summary, Document Changes, Codebase Impact, Risks, Next Steps.
- [ ] No unrelated files were modified.

## Test Scenario 2: Vague Request
### Input
- **Trigger**: `/ai-os:task-feature-change`
- **Context**: User says "Improve the dashboard."

### Expected Result
- [ ] Step 1 (Intake) refuses to proceed.
- [ ] Skill asks clarifying questions: Change Type, Feature Name, Scope, Rationale, Constraints.
- [ ] No documents or code are modified.

## Test Scenario 3: Remove a Feature
### Input
- **Trigger**: `/ai-os:task-feature-change`
- **Context**: User says "Remove the legacy `reports/legacy-summary` view."

### Expected Result
- [ ] Change Type classified as `Remove`.
- [ ] All references to the removed feature in BRD/PRD/PRP are flagged.
- [ ] Impact table marks the deletion as `CRITICAL`.
- [ ] Final report includes a "Cleanup" checklist (delete tests, update migrations, etc.).

## Verification Log
| Date | Result | Version | Notes |
| :--- | :--- | :--- | :--- |
| 2026-06-07 | PENDING | v1.0 | Initial test case definition. |