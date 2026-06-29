---
name: index-refresh
version: 1.0.0
description: Scans the project and updates AI indexing maps (API, database, components)
  to maintain accurate project memory. Triggers on /ai-os:context-index-refresh.
type: Skill
title: index-refresh
resource: file:///home/almaruf67/Codes/ai-skills/skills/core/context/index-refresh/SKILL.md
tags:
- core
- context
- index-refresh
timestamp: '2026-06-29T19:13:46Z'
---

# Context Manager: Index Refresh

This skill synchronizes the AI's internal "Map" of the project with the current state of the codebase.

## Mandates
- **Accuracy**: Reflect the exact state of files, routes, and schemas.
- **Completeness**: Scan all major layers (Backend API, Database, Frontend Components).
- **Format**: Output must be JSON for easy machine reading.

## Workflow

### 1. Database Indexing
- Scan `database/migrations/` and `app/Models/`.
- Update `.ai/indexing/database-map.json`.
- Map table names, columns, and relationships.

### 2. API Indexing
- Scan `routes/api.php` and `app/Http/Controllers/`.
- Update `.ai/indexing/api-map.json`.
- Map endpoints, methods, and associated Actions/Resources.

### 3. Component Indexing
- Scan `frontend/components/` and `frontend/pages/`.
- Update `.ai/indexing/component-map.json`.
- Map component names, props, and usage.

### 4. Technical Debt & Decisions
- Scan `system-context.md` and `docs/decisions/`.
- Summarize active modules and pending tasks.

## Usage
`/ai-os:context-index-refresh`
