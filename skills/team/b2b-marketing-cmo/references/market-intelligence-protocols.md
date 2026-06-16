# Market Intelligence Protocols

Research methods, competitive analysis frameworks, and TAM/SAM/SOM calculation guides.

---

## 1. Research Protocol

### Minimum Standards

Every market intelligence effort must include:
- **8+ distinct web searches** using varied query structures
- **3+ source types** (reports, news, company information, academic)
- **Date currency** — prefer data from last 12 months
- **Bangladesh-specific data** where available and relevant
- **Source attribution** for all data points

### Search Query Templates

**Market Size Queries:**
```
"[industry] market size Bangladesh 2024"
"[product type] market growth rate"
"[industry] software spending trends"
"[category] TAM SAM analysis"
```

**Competitive Queries:**
```
"[competitor name] product features"
"[product category] competitors Bangladesh"
"[solution type] pricing comparison"
"best [product type] software [year]"
```

**Trend Queries:**
```
"[industry] digital transformation trends 2024"
"[technology] adoption rate enterprise"
"[problem area] solution trends"
"[category] future outlook"
```

**Buyer Queries:**
```
"[role] software buying criteria"
"[industry] IT spending priorities"
"[role] pain points [problem area]"
"B2B buying process [industry]"
```

### Source Quality Hierarchy

| Priority | Source Type | Examples | Use For |
|----------|-------------|----------|---------|
| 1 | Primary Research | Interviews, surveys, RFP data | Specific customer insights |
| 2 | Industry Analysts | Gartner, IDC, Forrester | Market sizing, trends |
| 3 | Trade Associations | Industry groups, chambers | Industry-specific data |
| 4 | Government Data | BBS, Bangladesh Bank, ministry reports | Economic data, demographics |
| 5 | Business Media | ET, Daily Star Business, LinkedIn | News, company info |
| 6 | Company Sources | Websites, case studies, PR | Competitor intelligence |
| 7 | Academic/Research | Universities, think tanks | In-depth analysis |
| 8 | General Media | Major news outlets | Context, recent events |

### Source Documentation Template

```
DATA POINT DOCUMENTATION
════════════════════════

| Data Point | Value | Source | Source URL | Date | Confidence |
|------------|-------|--------|------------|------|------------|
| Market size | BDT X crore | [source] | [url] | [date] | High/Med/Low |
| Growth rate | X% CAGR | [source] | [url] | [date] | High/Med/Low |
| Competitor share | X% | [source] | [url] | [date] | High/Med/Low |

Confidence Levels:
• High: Multiple corroborating sources, primary data
• Medium: Single authoritative source, recent
• Low: Estimated, old data, single non-authoritative source
```

---

## 2. Competitive Analysis Framework

### Competitor Identification

**Direct Competitors:** Same product/service to same customer segment
**Indirect Competitors:** Different product, same need addressed
**Alternative Solutions:** Non-software solutions to same problem
**Potential Entrants:** Companies that could easily enter the market

### Intelligence Gathering Checklist

For each competitor, collect:

```
COMPETITOR PROFILE
══════════════════

Company: [Name]
Type: □ Direct  □ Indirect  □ Alternative  □ Potential

COMPANY OVERVIEW
────────────────
Headquarters: [Location]
Founded: [Year]
Size: [Employees, if available]
Funding/Ownership: [Private/Public/VC-backed]
Key Leadership: [CEO, relevant executives]

PRODUCT OFFERING
────────────────
Primary Products:
• [Product 1]: [Description]
• [Product 2]: [Description]

Key Features:
• [Feature 1]
• [Feature 2]
• [Feature 3]

Technology Stack: [If known]
Deployment Model: □ Cloud  □ On-Premise  □ Hybrid

MARKET POSITION
───────────────
Target Segments: [Industries, company sizes]
Geographic Focus: [Regions]
Estimated Market Share: [%]
Key Clients: [If known]

PRICING (if available)
─────────────────────
Model: □ Subscription  □ Perpetual  □ Usage  □ Project
Price Range: [Low-High]
Packaging: [Tiers if known]

STRENGTHS
─────────
• [Strength 1]
• [Strength 2]
• [Strength 3]

WEAKNESSES
──────────
• [Weakness 1]
• [Weakness 2]
• [Weakness 3]

RECENT DEVELOPMENTS
───────────────────
• [News/development 1] — [Date]
• [News/development 2] — [Date]

STRATEGIC INTENT
────────────────
[Assessment of where they're heading]

THREAT LEVEL TO Team
──────────────────────────
□ High  □ Medium  □ Low

Rationale: [Why this threat level]
```

### Competitive Positioning Map

**Instructions:**
1. Identify 2 key differentiating dimensions (e.g., Price vs. Features, Ease-of-Use vs. Depth)
2. Plot competitors on 2x2 matrix
3. Identify white space opportunities

```
POSITIONING MAP
═══════════════

                    HIGH [Dimension 2]
                           │
                           │     [Competitor A]
                           │
                           │           [Competitor B]
   ────────────────────────┼─────────────────────────
LOW [Dimension 1]          │                          HIGH [Dimension 1]
                           │
                  [Competitor C]
                           │
                           │     [Team Target]
                           │
                    LOW [Dimension 2]


White Space Identified: [Description of underserved position]
Differentiation Strategy: [How will occupy unique position]
```

### Competitive Response Playbook

| Competitor Action | Detection Signal | Response Options |
|-------------------|------------------|------------------|
| Price cut | Customer feedback, market chatter | Value messaging, selective matching, new tier |
| New feature | Press release, product update | Feature parity assessment, differentiation emphasis |
| Market entry | Announcements, sales encounters | Strengthen relationships, competitive battle card |
| Key win | Case study, press release | Counter-positioning, same-segment targeting |
| Partnership | Announcements | Partnership assessment, alternative partnerships |

---

## 3. TAM/SAM/SOM Calculation

### Definitions

**TAM (Total Addressable Market):** Total market demand for the product/service category
**SAM (Serviceable Addressable Market):** Portion of TAM that can realistically reach
**SOM (Serviceable Obtainable Market):** Portion of SAM that can realistically capture

### Calculation Methods

**Top-Down Method:**
```
TAM = Industry Total × Relevant Segment %
SAM = TAM × Geographic Filter × Segment Filter × Size Filter
SOM = SAM × Realistic Market Share %
```

**Bottom-Up Method:**
```
SOM = # of Target Accounts × Win Rate × Average Deal Size
SAM = SOM ÷ Realistic Market Share %
TAM = SAM ÷ Segment Filter
```

### TAM/SAM/SOM Template

```
MARKET SIZING ANALYSIS
══════════════════════

Product: [Product Name]
Date: [Date]
Analyst: [Name]

TAM CALCULATION
───────────────
Data Sources:
• [Source 1]: [Data point]
• [Source 2]: [Data point]

Calculation:
[Show math and assumptions]

TAM = BDT [amount] / USD [amount]
Growth Rate: [X]% CAGR


SAM CALCULATION
───────────────
Filters Applied:
□ Geographic: [Filter description] — reduces by [X]%
□ Industry: [Filter description] — reduces by [X]%
□ Company Size: [Filter description] — reduces by [X]%
□ Technology Readiness: [Filter description] — reduces by [X]%

Calculation:
[Show math]

SAM = BDT [amount] / USD [amount]
SAM as % of TAM: [X]%


SOM CALCULATION
───────────────
Market Capture Assumptions:
• Year 1: [X]% of SAM — based on [rationale]
• Year 2: [X]% of SAM — based on [rationale]
• Year 3: [X]% of SAM — based on [rationale]

Competitive Considerations:
[Assessment of share capture realism]

Calculation:
[Show math]

SOM Year 1: BDT [amount]
SOM Year 2: BDT [amount]
SOM Year 3: BDT [amount]


VALIDATION
──────────
Bottom-Up Cross-Check:
Target Accounts: [#]
Win Rate Assumption: [%]
Average Deal Size: BDT [amount]
Bottom-Up SOM: BDT [amount]

Variance from Top-Down: [%]
Reconciliation: [Explanation if variance >20%]


SUMMARY
───────
| Metric | Value | Confidence |
|--------|-------|------------|
| TAM | BDT [amount] | High/Med/Low |
| SAM | BDT [amount] | High/Med/Low |
| SOM Y1 | BDT [amount] | High/Med/Low |
| SOM Y3 | BDT [amount] | High/Med/Low |
```

### Team-Specific Market Sizing Notes

**Bangladesh Market Considerations:**
- Limited published market research — use triangulation
- Government data (BBS, BIDA) for economic indicators
- Chamber of commerce for industry sizing
- Use India data as proxy with appropriate adjustments (÷5-10 for scaling)

**Common Data Sources:**
- BASIS (software industry data)
- Bangladesh Bank (financial sector data)
- BIDA (investment and industry data)
- IDC, Gartner (global data, apply regional filters)
- LinkedIn Sales Navigator (company counts)

---

## 4. Buyer Persona Development

### Persona Template

```
BUYER PERSONA
═════════════

Persona Name: [e.g., "Data-Driven Director"]
Product: [Which product]

DEMOGRAPHICS
────────────
Job Title(s): [List common titles]
Department: [Marketing, IT, Operations, etc.]
Reports To: [Typical reporting line]
Team Size: [If applicable]
Experience Level: [Years in role/industry]

FIRMOGRAPHICS
─────────────
Company Size: [Employee range]
Industry: [Verticals]
Revenue: [Range]
Geography: [Location]

GOALS & OBJECTIVES
──────────────────
Primary Goal: [What they're trying to achieve]

KPIs They Own:
• [KPI 1]
• [KPI 2]
• [KPI 3]

Success Looks Like:
[Description of their ideal outcome]


PAIN POINTS & CHALLENGES
────────────────────────
Top Frustrations:
1. [Pain point 1]
2. [Pain point 2]
3. [Pain point 3]

Current Workarounds:
[How they cope without our solution]

Cost of Status Quo:
[Quantified impact if possible]


BUYING BEHAVIOR
───────────────
Decision Role: □ Economic Buyer  □ Technical Buyer  □ User  □ Influencer  □ Blocker

Buying Process:
1. [Stage 1]
2. [Stage 2]
3. [Stage 3]

Typical Buying Timeline: [Duration]

Information Sources:
• [Where they research]
• [Who they consult]
• [What content they consume]

Evaluation Criteria:
| Criterion | Weight | Notes |
|-----------|--------|-------|
| [Criterion 1] | [%] | |
| [Criterion 2] | [%] | |
| [Criterion 3] | [%] | |


OBJECTIONS & CONCERNS
─────────────────────
Common Objections:
• [Objection 1]
• [Objection 2]
• [Objection 3]

Risk Concerns:
• [Risk 1]
• [Risk 2]


MESSAGING PREFERENCES
─────────────────────
Resonant Messages:
• [Message that appeals to them]
• [Message that appeals to them]

Communication Style: □ Data-driven  □ Story-driven  □ Concise  □ Detailed

Preferred Channels: [LinkedIn, Email, Phone, WhatsApp]


QUOTES & INSIGHTS
─────────────────
"[Actual or representative quote from interviews]"
"[Another quote]"
```

### Decision-Making Unit (DMU) Mapping

```
DECISION-MAKING UNIT
════════════════════

Product: [Product Name]
Typical Deal Size: [Range]

DMU ROLES
─────────

| Role | Title(s) | Influence | Entry Point | Key Concerns |
|------|----------|-----------|-------------|--------------|
| Economic Buyer | [titles] | Final approval | [when/how] | ROI, risk |
| Technical Buyer | [titles] | Validation | [when/how] | Integration, security |
| User Buyer | [titles] | Requirements | [when/how] | Usability, workflow |
| Champion | [titles] | Internal advocate | [when/how] | Success, career |
| Influencer | [titles] | Recommendation | [when/how] | Best practices |
| Blocker | [titles] | Can derail | [when/how] | Change, disruption |


ENGAGEMENT STRATEGY
───────────────────

1. Initial Entry: [Which role to target first]
2. Build Champion: [How to identify and nurture]
3. Expand to DMU: [Strategy to reach other roles]
4. Neutralize Blockers: [Approach to potential blockers]
5. Close with Economic Buyer: [Final approval strategy]
```

---

## 5. Industry Vertical Analysis

### Vertical Deep-Dive Template

```
INDUSTRY VERTICAL ANALYSIS
══════════════════════════

Industry: [e.g., FMCG, Healthcare, Real Estate]
Date: [Date]

MARKET OVERVIEW
───────────────
Industry Size in Bangladesh: BDT [amount]
Growth Rate: [X]% CAGR
Key Trends:
• [Trend 1]
• [Trend 2]
• [Trend 3]

Major Players:
| Company | Size | Headquarters | Relationship |
|---------|------|--------------|-------------------------|
| [Company 1] | [Large/Medium/Small] | [City] | [Existing/Target/Cold] |


TECHNOLOGY LANDSCAPE
────────────────────
IT Maturity Level: □ Advanced  □ Developing  □ Early

Current Technology Stack:
• ERP: [Common systems]
• CRM: [Common systems]
• BI/Analytics: [Common systems]
• Industry-specific: [Common systems]

Technology Pain Points:
1. [Pain point 1]
2. [Pain point 2]
3. [Pain point 3]

Digital Transformation Priorities:
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]


Team OPPORTUNITY
──────────────────────
Relevant Products:
□ Proggya + Data Dialogue: [Fit assessment]
□ ICE: [Fit assessment]
□ Forge: [Fit assessment]
□ TradeEye: [Fit assessment]

Primary Use Cases:
• [Use case 1]
• [Use case 2]
• [Use case 3]

Competitive Positioning:
[How differentiates in this vertical]


BUYER ECOSYSTEM
───────────────
Key Decision Makers:
| Role | Typical Title | Priority |
|------|---------------|----------|
| Economic | [Title] | High/Med/Low |
| Technical | [Title] | High/Med/Low |
| User | [Title] | High/Med/Low |

Buying Patterns:
• Budget cycle: [Timing]
• Procurement process: [Description]
• Typical deal duration: [Months]


GO-TO-MARKET APPROACH
─────────────────────
Entry Strategy: [Recommended approach]

Key Events/Associations:
• [Event/association 1]
• [Event/association 2]

Partnership Opportunities:
• [Partner type/company 1]
• [Partner type/company 2]

Content Topics That Resonate:
• [Topic 1]
• [Topic 2]
• [Topic 3]


TARGET ACCOUNTS
---------------
Tier 1 (Highest Priority):
1. [Company] — [Rationale]
2. [Company] — [Rationale]
3. [Company] — [Rationale]

Tier 2:
1. [Company] — [Rationale]
2. [Company] — [Rationale]
3. [Company] — [Rationale]
```

---

## Research Output Checklist

Before submitting any market intelligence output:

- [ ] 8+ distinct searches completed
- [ ] Multiple source types used
- [ ] All data points have source attribution
- [ ] Data currency noted (dates)
- [ ] Confidence levels assigned
- [ ] Bangladesh-specific data included where available
- [ ] Competitive landscape mapped
- [ ] TAM/SAM/SOM calculated with methodology shown
- [ ] Key assumptions documented
- [ ] Limitations and gaps acknowledged
- [ ] Actionable recommendations provided
