---
name: product-pipeline
version: "1.0.0"
description: "Full 5-stage product documentation orchestrator (Source → BRD → PRD → Features → PRPs → Tasks). Use this skill whenever the user wants to convert a white-paper, research doc, or existing codebase analysis into structured product artifacts — BRD, PRD, Features, PRPs, or Tasks — in any combination or sequence. Runs the chain end-to-end when invoked as `/ai-os:product-pipeline full`. Triggers on /ai-os:product-pipeline."
---

# Product Documentation Pipeline Skill

Transforms raw inputs (white-papers, research docs, codebase analyses) into a clean chain of
product artifacts — each stage feeding the next.

```
Source Material
    │
    ▼
 [Stage 0] Pre-flight Analysis
    │
    ▼
 [Stage 1] BRD  ─── Business Requirements Document
    │
    ▼
 [Stage 2] PRD  ─── Product Requirements Document
    │
    ▼
 [Stage 3] Features ── Feature Catalogue
    │
    ▼
 [Stage 4] PRPs ─── Product Requirement Packages (one per feature)
    │
    ▼
 [Stage 5] Tasks ── Engineering / Design task breakdown
```

---

## Operating Rules

1. **Documentation Mandate** — All artifacts MUST be written to the `/docs/` folder in the project root. If the folder does not exist, create it.
   - Stage 1: `docs/brd/BRD.md`
   - Stage 2: `docs/prd/PRD.md`
   - Stage 3: `docs/features/features.md`
   - Stage 4: `docs/PRPs/PRP-[ID].md` (One file per feature)
   - Stage 5: `docs/tasks/tasks.md`
2. **Detect entry point** — The user may start at any stage. Identify what they have and what they want.
3. **Ask for missing input** — If the source material is not provided, ask before proceeding.
4. **Chain automatically** — If the user says "full pipeline", run all stages in sequence.
5. **Pause for Review** — After completing Stage 1 (BRD) and Stage 2 (PRD), pause and ask the user for approval before continuing to the next stage.
6. **Preserve terminology** — Use terms from the source material verbatim where possible; do not invent domain language.
7. **Conflict resolution** — If any stage conflicts with a prior stage, flag it in a `> ⚠️ Conflict:` blockquote and resolve before continuing.

---

## Orchestrator Mode (NEW)

The skill is a **true orchestrator**: when invoked with a chain command, it loads the relevant sub-skill, runs its workflow, pauses for review, and then proceeds to the next stage. This eliminates the need for the user to manually invoke each sub-skill.

### Chain Commands

| Command | What it does |
| :--- | :--- |
| `/ai-os:product-pipeline full` | Runs all 5 stages from scratch with human review pauses. |
| `/ai-os:product-pipeline brd`  | Runs Stage 1 only (delegates to `/ai-os:doc-generator brd`). |
| `/ai-os:product-pipeline prd`  | Runs Stages 1→2 (delegates to `/ai-os:doc-generator`). |
| `/ai-os:product-pipeline features` | Runs Stages 1→2→3. |
| `/ai-os:product-pipeline prps` | Runs Stages 1→2→3→4 (one PRP per feature). |
| `/ai-os:product-pipeline tasks` | Runs all 5 stages. |
| `/ai-os:product-pipeline continue` | Picks up from the last incomplete stage (uses `docs/` to detect state). |

### Orchestrator Workflow — `/ai-os:product-pipeline full`

```
[0] Pre-flight
    │  Read source material (or ask the user).
    │  Validate quality (High/Medium/Low).
    │  Confirm the chain with the user.
    ▼
[1] BRD  ──► /ai-os:doc-generator brd
    │  ⏸️  PAUSE — wait for user approval of BRD.
    ▼
[2] PRD  ──► /ai-os:doc-generator prd
    │  ⏸️  PAUSE — wait for user approval of PRD.
    ▼
[3] Features ──► /ai-os:doc-generator features
    │  Generates docs/features/features.md.
    ▼
[4] PRPs ──► /ai-os:doc-prp (loop, one per F-XX)
    │  Saves one PRP per feature.
    ▼
[5] Tasks ──► /ai-os:doc-generator tasks
    │  Decomposes each PRP into T-XXX tasks.
    ▼
[6] Wrap-up
       Print a summary report with file paths and links to next steps
       (e.g., `/ai-os:task-init` to start work on T-001).
```

### Pause Gates (Human-in-the-loop)

After each of the stages marked `⏸️ PAUSE`, the orchestrator MUST:

1. Print a summary of the artifact just produced.
2. Ask the user one of three questions:
   - **Approve** → continue to the next stage.
   - **Adjust** → take user feedback, revise the artifact, and re-pause.
   - **Abort** → stop the chain; return to the user with the current state.

### State Detection (for `continue`)

When the user invokes `/ai-os:product-pipeline continue`, the orchestrator scans `docs/` to determine the last completed stage:

| `docs/` contains… | Last complete stage | Next stage |
| :--- | :--- | :--- |
| nothing | (none) | Stage 1 — BRD |
| `brd/BRD.md` | Stage 1 | Stage 2 — PRD |
| `prd/PRD.md` | Stage 2 | Stage 3 — Features |
| `features/features.md` | Stage 3 | Stage 4 — PRPs |
| `PRPs/PRP-*.md` | Stage 4 | Stage 5 — Tasks |
| `tasks/tasks.md` | All | (wrap-up only) |

### Implementation Notes

- The orchestrator delegates the actual content generation to the sub-skills (`/ai-os:doc-generator`, `/ai-os:doc-prp`). It does **not** reimplement their templates.
- The orchestrator's own role is: state detection, sub-skill invocation, pause gates, and wrap-up reporting.
- If a sub-skill is missing or its SKILL.md is malformed, the orchestrator stops and reports the error.

---

## Stage 0 — Pre-flight Analysis

Evaluate the source material and define the execution path.

### Output Template

```markdown
# Pre-flight Analysis
**Source Material:** [Title/Description]
**Quality Assessment:** [High/Medium/Low] - [Rationale]
**Identified Gaps:**
- [Gap 1]
- [Gap 2]
**Execution Path:** [e.g., White-paper → BRD → PRD → Features]
**Proposed Artifacts Location:** `/docs/`
```

---

## Stage 1 — BRD (Business Requirements Document)

### Input
- White-paper, research document, pitch deck, executive brief, or codebase analysis report.

### Output Template

```markdown
# Business Requirements Document
**Project:** [Name]
**Version:** 1.0
**Date:** [Date]

---

## 1. Executive Summary
[What problem is being solved and for whom.]

## 2. Business Objectives
| # | Objective | Success Metric |
|---|-----------|----------------|
| 1 | …         | …              |

## 3. Commercial Context
- **Target Market:** …
- **Revenue Model:** …
- **Key Competitors:** …

## 4. Scope
### In Scope
- …

### Out of Scope
- …

## 5. Constraints & Assumptions
| Type        | Description |
|-------------|-------------|
| Constraint  | …           |
| Assumption  | …           |

## 6. Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| …    | High/Med/Low | High/Med/Low | … |

## 7. Success Criteria
[Specific, measurable criteria for project success.]

## 8. High-Level Requirements
| ID   | Requirement | Priority |
|------|-------------|----------|
| BR-01 | …          | Must/Should/Could |
```

---

## Stage 2 — PRD (Product Requirements Document)

### Input
- BRD from Stage 1.

### Output Template

```markdown
# Product Requirements Document
**Project:** [Name]
**Version:** 1.0

---

## 1. Purpose & Background
[Link back to BRD objectives.]

## 2. Goals & Non-Goals
### Goals
- …
### Non-Goals
- …

## 3. User Personas
### Persona: [Name]
- **Role:** …
- **Pain Point:** …
- **Goal:** …

## 4. Information Architecture
[Core entities and their relationships.]

## 5. User Stories
| ID    | As a…   | I want to…  | So that…  | Acceptance Criteria |
|-------|---------|-------------|-----------|---------------------|
| US-01 | …       | …           | …         | …                   |

## 6. Functional Requirements
| ID    | Requirement | Priority |
|-------|-------------|----------|
| FR-01 | …           | P0/P1/P2 |

## 7. Non-Functional Requirements
| ID    | Category    | Requirement |
|-------|-------------|-------------|
| NF-01 | Performance | …           |

## 8. State Transitions
[For complex features, describe how state changes.]

## 9. Dependencies
- …
```

---

## Stage 3 — Feature Catalogue

### Input
- PRD from Stage 2.

### Output Template

```markdown
# Feature Catalogue
**Product:** [Name]

---

## Epic: [Epic Name]

### F-01 — [Feature Name]
- **Description:** …
- **Linked Requirements:** FR-01, US-02
- **Priority:** P0 / P1 / P2
- **Acceptance Criteria:**
  - [ ] …
- **Dependencies:** F-02
```

---

## Stage 4 — PRPs (Product Requirement Packages)

### Input
- Feature Catalogue from Stage 3.

**Note:** Save each PRP to `docs/PRPs/PRP-[F-ID].md`.

### Output Template (repeat per feature)

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

---

## Stage 5 — Tasks

### Input
- PRPs from Stage 4.

### Output Template

```markdown
# Task Breakdown
**Product:** [Name]

---

## [Feature Name] (PRP-[ID])
| ID | Task | Size | Owner | Blocked By |
|----|------|------|-------|------------|
| T-D-01 | … | S | Design | — |
| T-FE-01 | … | M | Frontend | T-D-01 |

---

## Sizing Totals
- **XS:** [count]
- **S:** [count]
- **M:** [count]
- **L:** [count]
**Total Estimated Effort:** [e.g., 15 days]
```

## Usage
`/ai-os:product-pipeline [command]`

Commands:
- `full`     — Run all 5 stages from scratch
- `brd`      — Stage 1 only
- `prd`      — Stages 1→2
- `features` — Stages 1→2→3
- `prps`     — Stages 1→2→3→4
- `tasks`    — All 5 stages
- `continue` — Resume from last incomplete stage
