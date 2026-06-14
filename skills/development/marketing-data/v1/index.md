# Marketing Data v1 Skills

This guide standardizes delivery for marketing data stacks with reliable extraction, modeling, reporting, and CRM activation.

## Contents

- [Core Skill](./SKILL.md)
- [GA4 Extraction + BigQuery Modeling](./ga4-bigquery-modeling/SKILL.md)
- [Looker Studio Delivery + BigQuery](./looker-studio-bigquery/SKILL.md)
- [Meta/Google Ads API Connectors](./ads-connectors/SKILL.md)
- [HubSpot/Salesforce Integration](./crm-integration/SKILL.md)
- [GTM Integration](./gtm-integration/SKILL.md)

## Delivery Sequence (Recommended)
1. Define event and campaign taxonomy first.
2. Build extraction contracts with incremental strategy.
3. Design warehouse model (staging -> core -> marts).
4. Build reporting views for Looker Studio.
5. Wire CRM sync and attribution join logic.
6. Validate GTM event parity and data quality monitors.
