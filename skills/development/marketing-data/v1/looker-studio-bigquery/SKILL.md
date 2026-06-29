---
name: marketing-looker-studio-bigquery
description: Use for Looker Studio delivery with BigQuery semantic views, parameterized
  reporting, and performance-safe dashboard design.
type: Skill
title: marketing-looker-studio-bigquery
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/marketing-data/v1/looker-studio-bigquery/SKILL.md
tags:
- development
- marketing-data
- v1
- looker-studio-bigquery
timestamp: '2026-06-29T19:13:46Z'
---

# Looker Studio Delivery + BigQuery

## When to use
Use for dashboard implementation, stakeholder reporting views, and reusable metrics layers backed by BigQuery.

## Minimal correct pattern
1. Expose BI-ready BigQuery views with stable column contracts.
2. Pre-aggregate heavy metrics in marts at dashboard grain.
3. Keep date filtering and dimensions explicit in the dataset.
4. Build reusable calculated fields centrally where possible.
5. Validate report latency and cost before release.

## Delivery rules
- One metric definition per KPI (single source of truth).
- Avoid chart-level custom logic when it belongs in SQL.
- Keep naming business-readable and versioned.
- Separate executive summary pages from analyst drill pages.

## BigQuery performance rules
- Partition by date and cluster by high-cardinality filter keys.
- Select required columns only.
- Prevent fan-out joins in report views.
- Add guardrails for large date ranges.
