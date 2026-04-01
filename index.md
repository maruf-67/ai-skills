# AI Skills

This directory contains version-locked coding skills and reusable patterns for framework-specific AI implementation.

## Copilot-Native Entry Points

Directly discoverable GitHub Copilot skills are available in `.github/skills/`:
- `ai-skills` (global router/orchestrator)
- `auth-mode-router` (cross-stack auth selection)
- `nextjs-v16` (framework wrapper)
- `express-v5` (framework wrapper)
- `laravel-v12` (framework wrapper)
- `flutter-v3` (framework wrapper)
- `marketing-data-stack` (GA4/BigQuery/Looker/Ads/CRM/GTM wrapper)

These wrappers route to canonical versioned docs in this repository.

For the full micro-wrapper list, see `.github/skills/README.md`.

## Available Skills

- [Next.js](./nextjs/index.md)
- [Express.js](./express/index.md)
- [Laravel](./laravel/index.md)
- [Flutter](./flutter/index.md)
- [Marketing Data](./marketing-data/index.md)

## Auth Quick Pick

| Backend | Frontend | Use |
|---|---|---|
| Laravel v12 | Next.js v16 (web SPA) | `laravel/v12/auth-sanctum/SKILL.md` + `nextjs/v16/auth/SKILL.md` |
| Laravel v12 | Mobile/Desktop | `laravel/v12/auth-sanctum/SKILL.md` (PAT endpoints) |
| Laravel v13 | Flutter Android/iOS | `laravel/v13/auth-sanctum/SKILL.md` + `flutter/v3/auth-sanctum/SKILL.md` |
| Express v5 | Next.js v16 | `express/v5/auth/SKILL.md` + `nextjs/v16/auth-jwt/SKILL.md` |
| Express v5 | Flutter Android/iOS | `express/v5/auth/SKILL.md` + `flutter/v3/auth-jwt/SKILL.md` |
| Mixed Laravel + Express | Next.js v16 | Apply auth mode per service boundary (don’t merge patterns) |

## Usage Order
1. Choose stack + major version first.
2. Read that version's core `SKILL.md`.
3. Apply only relevant micro-skills for the requested task.
4. Keep project-specific codebase patterns as the final authority.
