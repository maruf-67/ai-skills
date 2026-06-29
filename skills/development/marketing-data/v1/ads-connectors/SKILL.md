---
name: marketing-ads-connectors
description: Use for Meta Ads and Google Ads API connectors, normalized campaign schemas,
  incremental sync, and rate-limit-safe extraction.
type: Skill
title: marketing-ads-connectors
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/marketing-data/v1/ads-connectors/SKILL.md
tags:
- development
- marketing-data
- v1
- ads-connectors
timestamp: '2026-06-29T19:13:46Z'
---

# Meta/Google Ads API Connectors

## When to use
Use for paid media extraction pipelines, cross-channel schema standardization, and spend/performance modeling.

## Minimal correct pattern
1. Extract account, campaign, adgroup/adset, ad, and daily performance slices.
2. Normalize to shared schema with source-specific extension columns.
3. Load incrementally by date plus mutable-lookback window.
4. Upsert by composite business key (`platform`, `account_id`, `entity_id`, `date`).
5. Reconcile spend and conversions against platform totals.

## Connector rules
- Maintain account hierarchy tables for MCC/manager structures.
- Separate metadata sync cadence from performance sync cadence.
- Use throttling, queueing, and bounded concurrency.
- Persist API response diagnostics for failed entities.

## Context7-aligned notes
- Google Ads uses GAQL reporting; query only required fields.
- Respect QPS/token constraints and handle `RESOURCE_TEMPORARILY_EXHAUSTED`.
- Prefer larger filtered batches over many tiny calls.

## Meta parity guidance
- Mirror the same normalized entity model as Google Ads.
- Keep attribution settings and action windows explicit per source.
- Track API version in metadata for migration safety.
