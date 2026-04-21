---
name: ai-skills
description: Use this first to select and compose the right framework/version skill, connect auth mode across stacks, and enforce MCP-first context gathering.
---

# AI Skills Router (Copilot Entry Skill)

## When to use
Use this skill at the start of any implementation task when stack/version/auth mode is not already explicit.

## Primary objective
Select the correct skill path, avoid cross-version drift, and coordinate multiple skills safely.

## Selection workflow (mandatory)
1. Detect project stack and major version from repository files.
2. Choose one primary framework skill:
	- Next.js 16+ -> `../nextjs-v16/SKILL.md`
	- Express 5 -> `../express-v5/SKILL.md`
	- Laravel 12 -> `../laravel-v12/SKILL.md`
	- Laravel 13 -> `../laravel-v13/SKILL.md`
	- Flutter 3 -> `../flutter-v3/SKILL.md`
	- Marketing Data Stack -> `../marketing-data-stack/SKILL.md`
3. If auth is involved, resolve mode via `../auth-mode-router/SKILL.md`.
4. Reuse project-local patterns before introducing new abstractions.
5. Keep changes additive and minimal.

## MCP protocol
- For codebase context: use workspace search/read/error tools before editing.
- For framework guidance refreshes: use Context7 first, then update only materially outdated guidance.
- If skill docs and real project code conflict, project code wins.

## Cross-skill composition
- Never mix auth patterns across service boundaries.
- Keep one framework skill as primary owner and use others as scoped secondary references.
- Maintain stable event names, payload keys, and integration contracts unless migration is explicitly requested.

## Canonical references
- Global playbook: `../../../context.md`
- Root map: `../../../index.md`
- Next.js map: `../../../nextjs/index.md`
- Express map: `../../../express/index.md`
- Laravel map: `../../../laravel/index.md`
- Flutter map: `../../../flutter/index.md`
- Marketing Data map: `../../../marketing-data/index.md`