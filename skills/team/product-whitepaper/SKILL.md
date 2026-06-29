---
source: ai-os-custom
context: both
version: 1.0
name: product-whitepaper
description: 'Generate comprehensive product whitepapers and concept notes for Limited.
  Use when asked to: (1) Create a product whitepaper or concept note, (2) Document
  a new product idea, (3) Write a product brief for internal strategy or client proposals,
  (4) Develop market research documentation for a product concept. Supports two modes:
  internal (strategy documents) and external (client-facing proposals with client
  research and benefits analysis).'
type: Skill
title: product-whitepaper
resource: file:///home/almaruf67/Codes/ai-skills/skills/team/product-whitepaper/SKILL.md
tags:
- team
- product-whitepaper
timestamp: '2026-06-29T19:13:46Z'
---

# Product Whitepaper Generator

Generate professional product whitepapers for Limited with market research, competitive analysis, and strategic planning sections.

## Workflow Overview

1. **Determine document type** (internal vs external)
2. **Gather product information** via targeted questions
3. **Conduct market research** using web search
4. **Generate whitepaper** following document templates
5. **Output as .docx** with professional formatting

## Step 1: Determine Document Type

**External (client-facing)**: User mentions a specific client name, company, or organization
**Internal (strategy)**: No client mentioned, or explicitly stated as internal

## Step 2: Gather Product Information

Ask clarifying questions BEFORE starting research. Group questions logically (2-3 at a time max).

### Required Information (Both Types)

- **Product concept**: Core idea, problem it solves, key features
- **Team division**: Which unit will own this? (Core, Borof Pani, Proggya, AI Division)
- **Target market**: Industry vertical, company size, geography
- **Revenue model**: SaaS, licensing, project-based, hybrid?
- **Timeline expectations**: MVP timeline, full product timeline

### Additional for External Documents

- **Client name and industry**: For targeted research
- **Specific client challenges**: Known pain points or requirements
- **Relationship context**: Existing client, prospect, RFP response?

## Step 3: Conduct Market Research

Use web_search to gather current market data. Research in this order:

1. **Market size and growth**: Industry reports, market valuations
2. **Key trends**: Technology shifts, adoption patterns
3. **Competitive landscape**: Direct competitors, alternative solutions
4. **Target audience insights**: Buyer personas, decision factors

For external documents, also research:
5. **Client company**: Background, recent news, strategic priorities
6. **Client industry challenges**: Sector-specific pain points

### Research Tips

- Use specific search queries: "[industry] market size 2024", "[product type] competitive landscape"
- Verify data from multiple sources
- Note publication dates for currency
- Capture specific statistics for credibility

## Step 4: Generate Document

Read [`references/document-templates.md`](references/document-templates.md) for complete section structures.

### Internal Document Sections

1. Overview (industry context, opportunity statement)
2. Goals (Train/Certify/Place or equivalent framework)
3. Technical Specifications (platform, features by phase)
4. Milestones (MVP → Soft Launch → Full Product)
5. Business Details (category, market, model, partnerships)
6. Market Research (size, trends, skill gaps)
7. Competitive Analysis (institutions, differentiation)
8. Target Audience Segmentation (demographics, psychographics, drivers)
9. Technology & Infrastructure
10. Marketing & Partnership Strategy
11. Way Forward (next steps, decision points)

### External Document Sections

All internal sections PLUS:
- About the Client (inserted after Overview)
- Benefits Analysis (how solution addresses client needs, inserted before Way Forward)

## Step 5: Output as .docx

Use the docx skill workflow for professional document creation.

### Formatting Standards

- **Font**: Arial throughout (12pt body, 14pt H2, 16pt H1, 24pt title)
- **Margins**: 1 inch all sides
- **Spacing**: 1.15 line spacing, 12pt after paragraphs
- **Headers**: Bold, with consistent hierarchy
- **Lists**: Use proper numbered/bullet lists (not unicode characters)
- **Tables**: For competitive analysis and comparison data
- **Colors**: Minimal—black text, optional accent color (#1E3A5F navy) for headers

### Document Header

Include on first page:
- Limited logo placeholder
- Document title
- Date
- Version (default: Draft v1.0)
- Classification: "Internal - Confidential" or "Client Confidential - [Client Name]"

## Quality Checklist

Before finalizing, verify:

- [ ] All sections have substantive content (no TBD placeholders in final)
- [ ] Market data includes sources and dates
- [ ] Competitive analysis covers 5+ relevant players
- [ ] Revenue model clearly articulated
- [ ] Milestones have realistic timeframes
- [ ] For external: Client research is current and relevant
- [ ] For external: Benefits directly map to client challenges
- [ ] Document formatting is consistent throughout

## Notes

- If market research yields limited results, note this transparently and suggest follow-up research areas
- For sensitive client information, rely on publicly available data only
- Include a "Limitations and Assumptions" subsection when data is incomplete
- Cite sources in footnotes or a references section at the end
