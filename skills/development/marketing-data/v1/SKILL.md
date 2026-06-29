---
name: marketing-data-v1-core
description: Use for end-to-end marketing data stack delivery across GA4, BigQuery,
  Looker Studio, Ads APIs, CRM, and GTM with robust data contracts.
type: Skill
title: marketing-data-v1-core
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/marketing-data/v1/SKILL.md
tags:
- development
- marketing-data
- v1
timestamp: '2026-06-29T19:13:46Z'
---

# Marketing Data v1 Core Skill

## When to use
Use when implementing or reviewing marketing analytics pipelines, data models, dashboards, media connectors, and CRM attribution workflows.

## Scope
- GA4 extraction and transformation
- BigQuery warehouse modeling
- Looker Studio semantic delivery
- Google Ads and Meta Ads connector patterns
- HubSpot and Salesforce data integration
- GTM-aligned event instrumentation contracts

## MCP protocol (mandatory)
1. Gather project context with repository search/read tools before editing.
2. Use Context7 to validate current API behavior for integration-specific changes.
3. Keep reusable skills versioned; avoid project-specific assumptions in shared skills.

## Orchestration order
1. Apply `ga4-bigquery-modeling` for event and session-level data foundation.
2. Apply `ads-connectors` for paid media ingestion and normalization.
3. Apply `crm-integration` for lead/opportunity linkage.
4. Apply `looker-studio-bigquery` for reporting layer delivery.
5. Apply `gtm-integration` to enforce tracking contract parity.

## Do
- Maintain stable taxonomy keys (`source`, `medium`, `campaign`, `content`, `term`).
- Enforce idempotent loads with deterministic primary keys.
- Separate raw staging from curated marts.
- Track freshness and completeness SLAs for each source.

## Don’t
- Don’t mix raw API schemas directly into BI reports.
- Don’t join by display names when durable IDs exist.
- Don’t push identity resolution logic into dashboard layers.
