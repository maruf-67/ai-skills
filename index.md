# AI Skills

This directory contains version-locked coding skills and reusable patterns for framework-specific AI implementation.

## Available Skills

- [Next.js](./nextjs/index.md)
- [Express.js](./express/index.md)
- [Laravel](./laravel/index.md)

## Auth Quick Pick

| Backend | Frontend | Use |
|---|---|---|
| Laravel v12 | Next.js v16 (web SPA) | `laravel/v12/auth-sanctum/SKILL.md` + `nextjs/v16/auth/SKILL.md` |
| Laravel v12 | Mobile/Desktop | `laravel/v12/auth-sanctum/SKILL.md` (PAT endpoints) |
| Express v5 | Next.js v16 | `express/v5/auth/SKILL.md` + `nextjs/v16/auth-jwt/SKILL.md` |
| Mixed Laravel + Express | Next.js v16 | Apply auth mode per service boundary (don’t merge patterns) |

## Usage Order
1. Choose stack + major version first.
2. Read that version's core `SKILL.md`.
3. Apply only relevant micro-skills for the requested task.
4. Keep project-specific codebase patterns as the final authority.
