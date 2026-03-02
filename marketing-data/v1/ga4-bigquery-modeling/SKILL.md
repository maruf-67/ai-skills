---
name: marketing-ga4-bigquery-modeling
description: Use for GA4 extraction patterns and BigQuery-first modeling, including incremental loads, session/user attribution, and reusable marts.
---

# GA4 Extraction + BigQuery Modeling

## When to use
Use for GA4 Data API extraction, warehouse model design, and campaign performance marts.

## Minimal correct pattern
1. Extract with pagination (`limit` + `offset`) and bounded date windows.
2. Capture quota metadata and retries with backoff.
3. Land raw payloads in append-only staging tables.
4. Transform to typed core tables (`events`, `sessions`, `users`, `conversions`).
5. Build marts for acquisition, engagement, and conversion with documented grain.

## Modeling rules
- Prefer event-level keys: `event_date`, `event_name`, `user_pseudo_id`, `ga_session_id`.
- Keep UTM fields normalized and lowercase-trimmed.
- Use incremental watermark strategy by date partition and backfill window.
- Encode attribution windows in transformation logic, not BI formulas.

## Data quality checks
- Non-null key ratio for primary IDs.
- Duplicate row detection by natural key hash.
- Session-to-event consistency checks.
- Daily freshness with expected row count thresholds.

## Context7-aligned notes
- GA4 Data API supports pagination with `limit` and `offset`.
- Use constrained metric/dimension combinations and explicit date ranges.
- Monitor quotas and avoid high-frequency unbounded pulls.
