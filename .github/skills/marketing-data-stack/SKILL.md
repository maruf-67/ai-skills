---
name: marketing-data-stack
description: Use for end-to-end marketing data stack tasks spanning GA4, BigQuery, Looker Studio, Ads connectors, CRM integration, and GTM governance.
---

# Marketing Data Stack Wrapper

## When to use
Use this as the entry skill for marketing analytics architecture, implementation, or reviews.

## Required routing
1. Apply core guidance from `../../../marketing-data/v1/SKILL.md`.
2. Use focused micro-skills as needed:
   - GA4 + BigQuery: `../../../marketing-data/v1/ga4-bigquery-modeling/SKILL.md`
   - Looker + BigQuery: `../../../marketing-data/v1/looker-studio-bigquery/SKILL.md`
   - Ads connectors: `../../../marketing-data/v1/ads-connectors/SKILL.md`
   - CRM integration: `../../../marketing-data/v1/crm-integration/SKILL.md`
   - GTM integration: `../../../marketing-data/v1/gtm-integration/SKILL.md`

## Do
- Keep warehouse contracts stable and versioned.
- Keep extraction idempotent with incremental strategies.
- Keep GTM event schema aligned with downstream models.

## Don’t
- Don’t place business-critical transformation logic only in dashboard formulas.
- Don’t change event keys without migration mapping.
