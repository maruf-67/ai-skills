```skill
---
name: express-v5-database
description: Use this when designing Mongoose models, indexes, and query patterns in Express v5 services.
---

# Database & Models

## Trigger
Use this when adding/updating Mongoose models, schema rules, indexes, or query patterns.

## Best Practices
- Keep model definitions explicit and strongly typed.
- Define indexes and unique constraints in schema, not ad-hoc in service code.
- Use lean/select projections for read-heavy endpoints.
- Keep write paths transactional where consistency is critical.
- Apply shared plugins (audit, timestamps) consistently.

## Your Usage (portal-api)
- MongoDB connection is centralized in `src/config/db.ts`.
- Feature models are colocated under each module.
- Shared models/plugins live in `src/common/models/*`.
- Audit plugin is reused to capture actor and IP metadata.

## Reusable Blueprint
1. Create strict schema + TypeScript interface/type.
2. Add constraints/indexes and plugin hooks.
3. Keep service queries explicit and testable.
4. Validate payload at route boundary before model interaction.

## Avoid
- Unbounded list queries without pagination.
- Silent schema drift from loosely typed model fields.
- Cross-module direct model mutation without clear ownership.
```
