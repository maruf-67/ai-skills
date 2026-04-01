# Global AI Skills Playbook

## Purpose
This folder is the shared standards source for AI-assisted coding across projects.
Use it to enforce **version-locked**, **framework-correct**, and **project-aligned** implementation patterns.

## Supported Stacks (Current)
- Express.js v5 (`express/v5/*`)
- Next.js v16 (`nextjs/v16/*`)
- Laravel v12 (`laravel/v12/*`)
- Flutter v3 (`flutter/v3/*`)
- Marketing Data v1 (`marketing-data/v1/*`)

## Auth Mode Selection Matrix

Use this matrix before applying any auth skill:

| Backend | Frontend | Primary Auth Mode | Skill Path(s) |
|---|---|---|---|
| Laravel v12 | Next.js v16 (web SPA) | Sanctum stateful session (cookie + CSRF) | `laravel/v12/auth-sanctum/SKILL.md` + `nextjs/v16/auth/SKILL.md` |
| Laravel v13 | Flutter mobile (Android/iOS) | Sanctum PAT (device token) | `laravel/v13/auth-sanctum/SKILL.md` + `flutter/v3/auth-sanctum/SKILL.md` |
| Express v5 | Flutter mobile (Android/iOS) | JWT / Bearer (access/refresh policy) | `express/v5/auth/SKILL.md` + `flutter/v3/auth-jwt/SKILL.md` |
| Laravel v12 | Mobile/Desktop client | Sanctum PAT (device token) | `laravel/v12/auth-sanctum/SKILL.md` |
| Express v5 | Next.js v16 | JWT / Bearer (access/refresh policy) | `express/v5/auth/SKILL.md` + `nextjs/v16/auth-jwt/SKILL.md` |
| Mixed platform (Laravel web + Express API) | Next.js v16 | Per-service auth mode (do not merge patterns) | Select per-service row above |

### Selection Rules
1. If the web client is first-party and backend is Laravel, default to Sanctum session mode.
2. If API is explicitly token-first (Express or JWT architecture), use JWT mode.
3. Never mix JWT browser token storage into Sanctum SPA projects unless explicitly required by project architecture.
4. For hybrid products, keep auth mode scoped by service boundary (web auth service vs external API service).

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