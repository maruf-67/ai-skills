# Global AI Skills Playbook

## Purpose
This folder is the shared standards source for AI-assisted coding across projects.
Use it to enforce **version-locked**, **framework-correct**, and **project-aligned** implementation patterns.

## Supported Stacks (Current)
- Express.js v5 (`express/v5/*`)
- Next.js v16 (`nextjs/v16/*`)

## Version-Lock Rules
1. Never apply rules from a different major version (e.g., Express 4 patterns in Express 5, Next 13/14 assumptions in Next 16).
2. Prefer framework-official conventions first, then project-specific patterns.
3. If project reality conflicts with generic skill docs, **project codebase wins**.

## Skill Structure Contract
- `index.md`: human-readable map and skill navigation.
- `SKILL.md`: trigger-oriented operational rules for the agent.
- `assets/`: reusable templates and starter files.
- `scripts/`: optional automation/scaffold scripts.
- `references/`: optional deep links/spec references.

## Context7 Protocol (Mandatory)
Before changing or creating framework-specific skill guidance:
1. Query Context7 for current version behavior.
2. Update only guidance that materially affects implementation quality.
3. Keep changes practical and compatible with existing project architecture.

## Reusability Standard (Cross-Project)
Every skill should include:
- **When to use** (clear trigger)
- **Do / Don’t** checklist
- **Minimal correct pattern**
- **Project alignment notes** (if adapting for an existing codebase)

## Quality Gate for Skill Updates
- Instructions are specific enough to generate code without guessing.
- Guidance avoids deprecated APIs/patterns.
- Naming, layering, and validation rules are explicit.
- Examples are typed and production-safe by default.