---
name: marketing-crm-integration
description: Use for HubSpot/Salesforce integration patterns, object association mapping, incremental sync, and revenue attribution-ready modeling.
---

# HubSpot/Salesforce Integration

## When to use
Use for lead lifecycle sync, contact-account-opportunity modeling, and CRM-to-marketing attribution joins.

## Minimal correct pattern
1. Ingest core objects (contacts/leads, companies/accounts, deals/opportunities, owners/users).
2. Ingest associations/relationships as first-class link tables.
3. Apply idempotent upserts using external IDs.
4. Snapshot lifecycle stage transitions for funnel analysis.
5. Build attribution-ready fact table joining CRM outcomes to marketing touchpoints.

## HubSpot notes (Context7-aligned)
- Use association APIs in batch where possible.
- Respect daily and burst limits; queue retries with backoff.
- Use batch upsert patterns for deterministic identity updates.

## Salesforce integration rules
- Prefer Bulk API for large extracts and REST for low-latency deltas.
- Preserve object IDs and record type IDs in warehouse tables.
- Track soft deletes and stage history explicitly.

## Data contract rules
- Keep canonical identity map (`email`, `external_id`, `crm_id`, `account_id`).
- Never overwrite historical lifecycle states.
- Keep timezone normalization explicit in close/create dates.
