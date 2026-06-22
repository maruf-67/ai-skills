---
name: express-v5-knowledge
description: Use this when building access-controlled content modules with file processing in Express v5.
---

# Knowledge Module

## Trigger
Use this when building content modules with access control, file processing, and searchable listing.

## Best Practices
- Validate content ownership and visibility in service layer.
- Apply access control in DB query pipeline for list endpoints.
- Keep file/ZIP processing isolated and path-safe.
- Separate content parsing logic from controller HTTP concerns.
- Emit notifications only after access-related mutations succeed.

## Your Usage (portal-api)
- Knowledge domain lives in `src/modules/knowledge/*`.
- Access checks combine role, creator, public flag, and allowed users.
- ZIP/asset handling rewrites and serves content safely.
- Aggregation helpers are reused for lookups, sorting, pagination, and filtering.

## Reusable Blueprint
1. Validate content payload and target audience.
2. Persist metadata and process assets.
3. Enforce access at read/list boundaries.
4. Send targeted notifications for newly granted access.

## Avoid
- Controller-level access branching duplicated across endpoints.
- Unsafe path joins when serving extracted assets.
- Loading all records and filtering in memory.
