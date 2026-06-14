---
name: product-brief-orchestrator
description: "Step-by-step product brief orchestrator for B2B products. Guides the team from concept or requirement through a complete product brief ready for engineering or client proposal. Use for B2B products (Proggya, Data Dialogue, ICE Enterprise, Inspecto, Callibrio, TradeEye, Talent Pulse). For consumer products with mobile/app store launches, use npd-launch-orchestrator instead. Triggers on: 'product brief', 'write a product brief', 'document this product idea', 'product orchestrator', 'help me spec this product'."
source: softograph-custom
context: softograph
version: 1.0.0
added: 2026-03-28
---

# Product Brief Orchestrator (B2B)

Guides product owners and the CEO through building a complete B2B product brief, step by step. Output is a structured document ready for engineering handoff or client proposal.

**Scope:** B2B products — Proggya, Data Dialogue, ICE Enterprise, Inspecto, Callibrio, TradeEye, Talent Pulse, and new B2B product concepts.  
**Not for:** Consumer products with iOS/Android launches — use `npd-launch-orchestrator` instead.

---

## Step Sequence

```
Step 1/5 → Problem & Market Definition
Step 2/5 → Product Concept & Scope
Step 3/5 → Go-to-Market Strategy
Step 4/5 → Technical Approach
Step 5/5 → Brief Summary & Open Questions
```

---

## Kickoff Protocol

When loaded, respond with:

```
PRODUCT BRIEF ORCHESTRATOR (B2B)
══════════════════════════════════
Ready. What's the product or idea?

Give me:
- Product name (or working title)
- The problem it solves in one sentence
- Who the buyer is (sector, company type)
- Existing or new product?
```

Once received, declare the sequence and begin Step 1 immediately.

---

## Step Definitions

### Step 1 — Problem & Market Definition
*Persona: proggya-data-analyst*

Produce:
- **Problem statement:** What specific pain does this solve, for whom, and at what cost to them if unsolved
- **Target buyer profile:** Sector, company size, role who buys vs. role who uses
- **Market sizing:** TAM/SAM estimate for Bangladesh + relevant international markets
- **Competitive landscape:** What do buyers currently use (manual process / competitor / in-house) and what are its gaps
- **Why now:** What's changed that makes this the right time (regulation, market maturity, technology availability)
- **Softograph fit:** Why is positioned to build and sell this (existing client relationships, IP, distribution)

End with: `Step 1 complete. Ready for Step 2 (Product Concept)? Say 'next' or refine the problem first.`

---

### Step 2 — Product Concept & Scope
*Persona: product-whitepaper*

Produce:
- **Product concept:** What it is in 2–3 sentences (jargon-free, buyer-perspective)
- **Core features (MVP):** The minimum set of capabilities needed to deliver the core value — no more
- **Out of scope (v1):** What is explicitly deferred to later versions
- **User journey:** How the primary user interacts with the product day-to-day (3–5 steps)
- **Integration requirements:** What systems does it need to connect with (ERP, CRM, hardware, other products)
- **Deployment model:** SaaS / on-premise / hybrid — and why
- **Cross-sell opportunity:** Which other products does this naturally complement

End with: `Step 2 complete. Ready for Step 3 (Go-to-Market)? Say 'next' or adjust the concept first.`

---

### Step 3 — Go-to-Market Strategy
*Persona: b2b-marketing-cmo*

Produce:
- **Primary market:** Which geography and sector to target first and why
- **Sales motion:** Direct / partner / channel — and how it fits Softograph's current BD capacity
- **Pricing model:** Recommended pricing structure (per user, per deployment, outcome-based) with rationale
- **Launch approach:** Pilot client strategy — how to find the first 2–3 reference clients
- **Positioning statement:** One sentence: "[Product] helps [buyer type] [achieve outcome] by [how], unlike [alternative]"
- **Success metrics (year 1):** What does good look like 12 months after launch

End with: `Step 3 complete. Ready for Step 4 (Technical Approach)? Say 'next' or adjust GTM first.`

---

### Step 4 — Technical Approach
*Persona: dev-orchestrator*

Produce:
- **Architecture recommendation:** High-level tech stack and deployment approach appropriate for the product type and target buyers
- **Key technical risks:** What are the hardest problems to solve in building this
- **Build vs. buy decisions:** Any third-party components, APIs, or AI models to leverage (vs. build from scratch)
- **Integration architecture:** How it connects to client systems and other products
- **Data considerations:** What data the product needs, collects, and produces — and any compliance implications
- **Effort estimate:** Rough development timeline (phases) and team size needed

End with: `Step 4 complete. Ready for Step 5 (Brief Summary)? Say 'next' or adjust technical approach first.`

---

### Step 5 — Brief Summary & Open Questions
*Persona: product-whitepaper*

Produce a complete one-page brief pulling together all previous steps:

```
PRODUCT BRIEF — [Product Name]
Version 1.0 | [Date]
════════════════════════════════

PROBLEM
[2–3 sentences from Step 1]

PRODUCT CONCEPT
[2–3 sentences from Step 2]

TARGET BUYER
[From Step 1 — sector, size, role]

CORE FEATURES (MVP)
[Bulleted list from Step 2]

GO-TO-MARKET
[Market, sales motion, pricing, pilot strategy from Step 3]

TECHNICAL APPROACH
[Architecture, key risks, effort estimate from Step 4]

SUCCESS METRICS (Year 1)
[From Step 3]

OPEN QUESTIONS
[Items that need a decision before engineering can start]

RECOMMENDED NEXT STEP
[Whitepaper / Client pilot / Engineering spec / Board approval]

════════════════════════════════
Brief complete. Ready for Tawhid's review. ✅
```
