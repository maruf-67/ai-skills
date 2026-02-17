```skill
---
name: express-v5-audit
description: Use this when implementing request-context-based auditing and actor metadata trails in Express v5.
---

# Audit System

## Trigger
Use this when you need actor/IP traceability for create/update operations.

## Best Practices
- Capture audit metadata automatically via shared model plugin.
- Use request-scoped context so services stay clean and testable.
- Record both actor identity and source IP when available.
- Apply plugin consistently across auditable models.
- Keep audit field naming stable across modules.

## Your Usage (portal-api)
- Audit plugin lives in `src/common/models/plugins/auditPlugin.ts`.
- Request context middleware stores user and IP metadata.
- Models inherit `created_by`, `updated_by`, `created_ip`, `updated_ip` via plugin.
- Update hooks handle both direct updates and `$set`-based operations.

## Reusable Blueprint
1. Set auth/context middleware early in request lifecycle.
2. Apply audit plugin at schema definition.
3. Let plugin populate audit fields automatically on save/update hooks.

## Avoid
- Passing actor metadata manually through every service call.
- Partial adoption where only some write models are auditable.
- Inconsistent field names that break reporting/search.
```
