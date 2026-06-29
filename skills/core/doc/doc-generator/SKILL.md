---
name: doc-generator
version: 1.0.0
description: "Atomic generator for single-stage documentation artifacts (BRD or PRD).\
  \ For the full 5-stage pipeline (Source \u2192 BRD \u2192 PRD \u2192 Features \u2192\
  \ PRPs \u2192 Tasks) use /ai-os:product-pipeline instead. Triggers on /ai-os:doc-generator."
type: Skill
title: doc-generator
resource: file:///home/almaruf67/Codes/ai-skills/skills/core/doc/doc-generator/SKILL.md
tags:
- core
- doc
- doc-generator
timestamp: '2026-06-29T19:13:46Z'
---

# Documentation Generator (Atomic)

This skill generates a **single** document at a time — either a BRD or a PRD. It is the atomic building block of the full documentation pipeline.

## When to Use This Skill

| If you need… | Use |
| :--- | :--- |
| Just a BRD, fast | **`/ai-os:doc-generator brd`** ← this skill |
| Just a PRD from an existing BRD | **`/ai-os:doc-generator prd`** ← this skill |
| BRD → PRD → Features → PRPs → Tasks (orchestrated, with review pauses) | **`/ai-os:product-pipeline full`** |
| A single PRP (Product Requirement Package) | **`/ai-os:doc-prp`** |
| Code → Doc auto-sync (reverse direction) | **`/ai-os:doc-sync`** |

## Mandates
- **Atomic**: This skill produces **one** document per invocation. For the full chain, defer to `/ai-os:product-pipeline`.
- **Brain-First**: Every artifact must be saved under the project's `/docs/` directory.
- **Source-of-Truth**: Pull facts only from the codebase, the BRD, or the user's explicit input. No hallucination.
- **Team Templates**: All BRDs and PRDs must follow the templates in `.ai/knowledge/specs/`.
- **Pause for Review**: After BRD generation, pause and ask for approval before producing the PRD.

## Workflow

### 1. Pre-flight (Quality Gate)
- Validate that the input (white-paper, transcript, codebase) contains enough context.
- Flag missing "Commercial Context" or "Success Metrics" before drafting.
- Ask the user which phase to run: `brd`, `prd`, or `report`.

### 2. BRD Generation
- Create `docs/BRD/BRD.md`.
- **Focus**: Value proposition, stakeholder needs, business rules, scope.
- **Sections**: Business Objectives, Commercial Context, Risks & Mitigations, Success Metrics.
- **Output file**: `docs/BRD/BRD.md`
- **Pause**: Ask the user to review and approve before any PRD work.

### 3. PRD Generation
- **Pre-condition**: An approved BRD must already exist.
- Create `docs/PRD/PRD.md`.
- **Focus**: Functional/non-functional requirements, user stories, API definitions, success metrics.
- **Sections**: User Personas, Information Architecture, User Stories, Permission Matrix, Acceptance Criteria.
- **Output file**: `docs/PRD/PRD.md`
- **Hand-off**: If the user wants Features/PRPs/Tasks next, recommend `/ai-os:product-pipeline continue`.

### 4. Status Report
- Create `docs/reports/status-[date].md`.
- Summarize: completed tasks, blockers, next steps, health check.
- **Pre-condition**: An active `.ai/playbook/PROGRESS.md` must exist.

## Usage
`/ai-os:doc-generator [phase]`

Phases (atomic — one at a time):
- `brd`     — Generate BRD only
- `prd`     — Generate PRD from an existing BRD
- `report`  — Generate execution status report

## Examples
```text
/ai-os:doc-generator brd
/ai-os:doc-generator prd
/ai-os:doc-generator report
```

## Reference
- `.ai/knowledge/specs/BRD.md` — BRD template
- `.ai/knowledge/specs/PRD.md` — PRD template
- `/ai-os:product-pipeline` — Full multi-stage orchestrator (use this if you need everything)
