---
name: express-v5-seeders
description: Use this when designing idempotent database seeders and startup data
  initialization flows.
type: Skill
title: express-v5-seeders
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/express/v5/seeders/SKILL.md
tags:
- development
- express
- v5
- seeders
timestamp: '2026-06-29T19:13:46Z'
---

# Database Seeders

## Trigger
Use this when initializing baseline data, environment fixtures, or controlled upsert migrations.

## Best Practices
- Keep seeders idempotent (safe to run multiple times).
- Use unique-key lookups before insert to avoid duplicates.
- Report created/updated/skipped counts for audit visibility.
- Keep seed data minimal, deterministic, and environment-aware.
- Isolate seeder logic from runtime service/controller paths.

## Your Usage (portal-api)
- Seeder orchestration lives in `src/seeders/index.ts`.
- Supports all-seeders and targeted seeder execution.
- Common seed domains include users, categories, tags, and departments.
- Existing pattern updates records when drift is detected.

## Reusable Blueprint
1. Ensure DB connection.
2. Iterate known seed records.
3. Upsert by unique key.
4. Log summary and exit with clear status.

## Avoid
- Non-idempotent bulk inserts.
- Hidden side effects that mutate unrelated collections.
- Hardcoding sensitive credentials in seed payloads.
