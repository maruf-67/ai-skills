---
name: prp
version: "1.0.0"
description: "Generates a single Product Requirement Package (PRP) — the technical implementation plan for one feature. Use after the Feature Catalogue exists. Triggers on /ai-os:doc-prp."
---

# PRP Generator (Single Feature)

This skill produces **one** Product Requirement Package (PRP) — a self-contained, implementation-ready technical plan for a single feature. It is the atomic unit between Features and Tasks.

## When to Use This Skill

| If you need… | Use |
| :--- | :--- |
| A single PRP for one feature | **`/ai-os:doc-prp [feature-id]`** ← this skill |
| All PRPs at once (chained with BRD/PRD/Features/Tasks) | **`/ai-os:product-pipeline full`** |
| Just a BRD or PRD | **`/ai-os:doc-generator`** |
| Modify an existing PRP (feature change) | **`/ai-os:task-feature-change`** |

## Mandates
- **One PRP per feature** — never batch.
- **File location**: `docs/PRPs/PRP-[F-ID].md` (e.g., `docs/PRPs/PRP-F-01.md`).
- **Traceability**: Every PRP must link back to a feature ID (`F-XX`) and forward to its task IDs (`T-XX`).
- **Surgical Plan**: The "Codebase Integration" section must be specific enough that an engineer can start without further questions.

## Workflow

### 1. Pre-flight
- Read `docs/features/features.md` (or backlog).
- Identify the target feature (`F-XX`).
- If no feature catalogue exists, stop and ask the user to run `/ai-os:product-pipeline` up to Stage 3 first.

### 2. Draft the PRP
Populate the standard template (see [Template](#template) below) with:

- **Governance & Traceability** — IDs, status, priority, links to source requirements.
- **Technical Vision** — Overview, User Flow (Entry → Action → Reaction → Success).
- **Technical Design** — API/DTO contract, schema changes, state transitions.
- **Codebase Integration** — Files to create, files to modify, existing patterns to follow.
- **Robustness & Verification** — Edge cases, BDD-style acceptance criteria.
- **Research & References** — Technology choice rationale, reference code links.

### 3. Output
- Write the PRP to `docs/PRPs/PRP-[F-ID].md`.
- Update `docs/features/features.md` with a link to the new PRP.

### 4. Hand-off
- Recommend `/ai-os:product-pipeline continue` if the user wants to proceed to task breakdown.

## Template

```markdown
# PRP — [Feature Name]

## 1. Governance & Traceability
- **PRP ID:** PRP-[ID]
- **Feature ID:** F-[XX]
- **Linked Requirements:** [e.g., US-01, FR-02]
- **Status:** Draft
- **Priority:** P0 / P1 / P2

## 2. Technical Vision
### Overview
[Brief description of the feature's purpose.]

### User Flow
1. **Entry:** [How the user starts]
2. **Action:** [What the user does]
3. **Reaction:** [How the system responds]
4. **Success:** [The final state]

## 3. Technical Design
### Data Contract (API / DTO)
```json
{
  "endpoint": "METHOD /api/...",
  "request_dto": {},
  "response_dto": {}
}
```

### Database Schema Changes
- **Table:** [name]
- **New Columns:** [name, type]
- **Indexes:** [required indexes]

### State Transitions
`Initial State` → `Trigger` → `Final State`

## 4. Codebase Integration (Surgical Plan)
### Files to Create
- `path/to/new_file` - [Purpose]

### Files to Modify
- `path/to/existing_file` - [Specific logic to inject]

### Existing Patterns to Follow
- **Logic Pattern:** [e.g., Action Pattern, Service Layer]
- **UI Pattern:** [e.g., Shared components, Design System rules]
- **Test Pattern:** [e.g., Pest/Vitest benchmarks]

## 5. Robustness & Verification
### Edge Cases & Error States
| Scenario | System Response | UI Feedback |
| :--- | :--- | :--- |

### Acceptance Criteria (BDD Style)
- [ ] **Given** [context], **When** [action], **Then** [outcome].

## 6. Research & References
- **Technology Choice:** [Rationale]
- **Reference Code:** [Link to file or external URL]
```

## Usage
`/ai-os:doc-prp [feature-id]`

Example:
```text
/ai-os:doc-prp F-01
```

## Examples of a Completed PRP
- See `skills/product/pipeline/references/prp-examples.md` for full worked examples.
