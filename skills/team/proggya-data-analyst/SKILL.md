---
source: softograph-custom
context: softograph
version: 1.0
name: proggya-data-analyst
description: "Comprehensive data research and analysis agent for Proggya. Use when asked to: (1) Conduct deep research and collect data on any topic for market analysis, (2) Analyze uploaded datasets to find correlations, insights, and trends, (3) Generate ML-based predictions and forecasts, (4) Create market-oriented interpretive reports (non-technical language), (5) Design infographic layout instructions with graph/visualization directions, (6) Create Power BI-ready data tables and comprehensive dashboard design specifications. Triggers on requests involving strategic analysis, market research, geopolitical analysis, demographic studies, trend analysis, competitive intelligence, or data-driven storytelling for Substack/Proggya publication."
---

# Proggya Data Analyst

Multi-stage analytical workflow: research questions → publication-ready insights with visualization specs.

## Workflow Overview

```
STAGE 1: SCOPING        → Define question, identify data needs
STAGE 2: RESEARCH       → Deep web research + process uploads
STAGE 3: STRUCTURING    → Convert to analyzable datasets
STAGE 4: ANALYSIS       → Correlations, trends, ML predictions
STAGE 5: INTERPRETATION → Market-oriented narrative
STAGE 6: DELIVERABLES   → Report + Infographic + Power BI specs
```

## Stage 1: Scoping

### 1.1 Clarify Research Question

Ask (2-3 max per message):
- **Core question**: Primary insight sought
- **Target audience**: Internal, client, or public (Substack/Proggya)
- **Scope**: Geographic, temporal, dimensional
- **Deliverables expected**: Report type, infographic count, Power BI need

### 1.2 Identify Data Sources

| Priority | Source Type |
|----------|-------------|
| Highest | Uploaded files (CSV, Excel, PDF) |
| High | Web research (reports, statistics) |
| Medium | Domain expertise, frameworks |
| Lowest | Synthetic/gap-filling (flag clearly) |

### 1.3 Define Analysis Dimensions

**Strategic/Geopolitical**: Military, Economic, Diplomatic, Resource, Environmental, Logistical

**Market/Demographic**: Demographics, Consumer behavior, Channels, Regions, Categories

### 1.4 Output Research Plan

```
Research Question: [Specific question]
Dimensions: [Analysis angles]
Data Sources: [Uploaded + web needs]
Deliverables: [Report, infographics, Power BI]
```

---

## Stage 2: Deep Research

### 2.1 Web Search Protocol

Minimum 8-12 distinct searches:
1. Topic + "statistics/data/report"
2. Topic + "[current year] trends"
3. Topic + each analysis dimension
4. Topic + "forecast/projection"
5. Regional variants
6. Academic/institutional sources

**Quality Sources**: Government agencies, World Bank/IMF/UN, industry associations, academic papers, Reuters/Bloomberg/Economist

### 2.2 Process Uploaded Sources

1. Catalog all columns, data types, date ranges
2. Assess quality (missing values, outliers)
3. Document limitations
4. Cross-reference with web findings

### 2.3 Source Documentation

```
| Data Point | Value | Source | Date | Confidence |
|------------|-------|--------|------|------------|
```

---

## Stage 3: Data Structuring

See [`references/data-structuring.md`](references/data-structuring.md) for schemas.

### 3.1 Master Dataset Principles

- One observation per row
- snake_case naming
- Source attribution column
- Confidence flag column

### 3.2 Derived Metrics

Calculate: Growth rates (YoY, CAGR), per capita, index values, percentages, rankings

### 3.3 Handle Gaps

Flag explicitly → Interpolate if justified → Use proxies if available → Acknowledge in narrative

---

## Stage 4: Analysis & Prediction

### 4.1 Descriptive Analysis

Summary statistics, distributions, segmentation, trend identification

### 4.2 Correlation Analysis

- Pairwise correlations (numeric)
- Cross-tabulations (categorical)
- Time-lagged correlations
- Document strength, direction, caveats (correlation ≠ causation)

### 4.3 Trend Analysis

For each key metric: Direction, Velocity, Acceleration, Inflection points, Seasonality

### 4.4 Predictive Modeling

See [`references/prediction-methods.md`](references/prediction-methods.md) for ML guidance.

| Data Type | Method |
|-----------|--------|
| Linear trend | Linear regression |
| Non-linear pattern | Polynomial regression |
| Time series + seasonality | SARIMA, Prophet |
| Complex multi-factor | Random Forest, XGBoost |
| Classification | Logistic regression, Decision trees |

**Required outputs**: Point predictions + confidence intervals, accuracy metrics (R², RMSE), scenario analysis, assumptions documented

### 4.5 Insight Synthesis

Extract 5-8 key insights: observation + implication + confidence level

---

## Stage 5: Market Interpretation

### 5.1 Translation Table

| Technical | Market Language |
|-----------|-----------------|
| Correlation 0.8+ | Strong connection |
| p < 0.05 | Reliable pattern |
| CAGR 12% | Growing ~12%/year |
| R² = 0.75 | Explains 75% of variation |
| 95% CI | High confidence range |

### 5.2 Audience Framing

**Public (Substack/Proggya)**: Lead with "so what", use analogies, include surprising finding, end with implications

**Internal**: Actionable implications, decision frameworks, uncertainties, follow-ups

**Client**: Industry context, opportunities/risks, competitive positioning, recommendations

### 5.3 Narrative Arc

1. Context (why this matters now)
2. Current state (what data shows)
3. Dynamics (forces at play)
4. Trajectory (where heading)
5. Implications (what it means)
6. Wildcard (contrarian angle)

---

## Stage 6: Deliverables

### 6.1 Interpretive Report

See [`references/report-templates.md`](references/report-templates.md) for templates.

**Structure**:
```
# [Title with Key Finding]
## Executive Summary (3-4 paragraphs)
## Context & Background
## Key Findings (Finding 1, 2, 3...)
## Forward Look
## Methodology Notes
```

### 6.2 Infographic Specifications

See [`references/infographic-templates.md`](references/infographic-templates.md) for design guidance.

Generate **3-5 specs per report**:

```
INFOGRAPHIC #[N]
Title: [Headline]
Dimensions: [1080x1920 social / 1200x628 Substack]

LAYOUT:
┌─────────────────────────┐
│ HEADER                  │
├─────────────────────────┤
│ HERO VISUAL (chart)     │
├─────────────────────────┤
│ KEY STATS (3-4 callouts)│
├─────────────────────────┤
│ SUPPORTING VIZ          │
├─────────────────────────┤
│ FOOTER (source/brand)   │
└─────────────────────────┘

HERO VISUAL:
- Chart Type: [Bar/Line/Map/Sankey...]
- Data: [Variables to plot]
- Annotations: [Callouts]
- Color: [Hex + reasoning]

KEY STATS:
- [Stat]: [Value] — [Context]

DESIGN:
- Colors: [Palette]
- Typography: [Font]
- Hierarchy: [Eye flow]
```

### 6.3 Power BI Data Tables

See [`references/powerbi-tables.md`](references/powerbi-tables.md) for schemas.

Create .xlsx with structured tables:

```
TABLE: [name]
Grain: [One row per...]

| Column | Type | Description |
|--------|------|-------------|

RELATIONSHIPS:
- [table].[col] → [table].[col] (1:N)
```

### 6.4 Power BI Dashboard Specs

See [`references/powerbi-design.md`](references/powerbi-design.md) for guidance.

```
DASHBOARD: [Name]
Purpose: [Use case]
User: [Persona]

PAGE 1: [Name]
┌────────────────────────────┐
│ [KPI Cards]                │
├───────────────┬────────────┤
│ [Main Visual] │ [Filters]  │
├───────────────┴────────────┤
│ [Secondary Row]            │
└────────────────────────────┘

VISUALS:
- Type, Source, Aggregation, Filters, Drill-through

DAX MEASURES:
[measure] = [formula]
```

---

## Quality Checklist

- [ ] 8+ distinct research sources
- [ ] All claims have attribution
- [ ] Predictions include confidence intervals
- [ ] Non-technical language throughout
- [ ] Infographic specs independently executable
- [ ] Power BI tables have relationships defined
- [ ] Dashboard specs include DAX measures
- [ ] Limitations acknowledged

---

## Output Files

| Deliverable | Format |
|-------------|--------|
| Interpretive Report | .docx |
| Source Data Tables | .xlsx |
| Power BI Tables | .xlsx |
| Infographic Specs | .md |
| Dashboard Specs | .md |

All outputs → /mnt/user-data/outputs/
