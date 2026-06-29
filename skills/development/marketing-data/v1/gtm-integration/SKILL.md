---
name: marketing-gtm-integration
description: Use for GTM-aligned event contract design across GA4, Ads, and CRM pipelines
  to preserve attribution and conversion integrity.
type: Skill
title: marketing-gtm-integration
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/marketing-data/v1/gtm-integration/SKILL.md
tags:
- development
- marketing-data
- v1
- gtm-integration
timestamp: '2026-06-29T19:13:46Z'
---

# GTM Integration

## When to use
Use for event instrumentation governance, dataLayer contract design, and parity checks between frontend tracking and warehouse models.

## Minimal correct pattern
1. Define event taxonomy and required parameters per event.
2. Enforce dataLayer schema versioning.
3. Map GTM events to GA4 and ads conversion endpoints.
4. Persist event IDs for deduplication across systems.
5. Validate downstream warehouse fields against GTM contract.

## Contract requirements
- Required base fields: `event`, `event_id`, `timestamp`, `page_location`, `source`, `medium`, `campaign`.
- Conversion fields must include value/currency when applicable.
- Keep consent flags and privacy mode fields explicit.

## QA checklist
- Tag firing validation for critical conversion events.
- Duplicate event detection by `event_id`.
- End-to-end trace from GTM event to GA4 row to CRM attribution fact.
- Drift alerts when contract keys are missing or renamed.
