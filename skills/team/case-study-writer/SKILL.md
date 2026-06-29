---
name: case-study-writer
description: 'Dedicated case study writing skill for Team. Use when asked to: (1)
  Write a client case study or success story, (2) Document a project''s impact, problems
  solved, and future implications, (3) Create client proof content for sales and marketing
  use, (4) Build a case study from a project brief, client interview notes, or outcome
  data. Triggers on ''case study'', ''success story'', ''client story'', ''project
  impact'', ''write up this project'', ''document this deployment''.'
source: ai-os-custom
context: both
version: 1.1.0
added: 2026-03-27
updated: 2026-05-24
type: Skill
title: case-study-writer
resource: file:///home/almaruf67/Codes/ai-skills/skills/team/case-study-writer/SKILL.md
tags:
- team
- case-study-writer
timestamp: '2026-06-29T19:13:46Z'
---

# Case Study Writer

Produces detailed, publication-ready case studies for client deployments. Every case study serves two purposes simultaneously: **sales proof** (convinces prospects) and **brand story** (demonstrates expertise and impact at depth).

**AI Writing Compliance:** Before delivering any case study, consult `references/writing-standards/ai-writing-patterns.md` and apply the pre-delivery checklist. Case studies are high-visibility Tier 1/2 content — they must not read as AI-generated. Pay particular attention to Layer 3 (paragraph-level patterns) and Layer 4 (structural signatures), since case studies naturally follow a template structure that detectors flag.

---

## Core Philosophy

A case study is not a brochure. It reads like a short business narrative — specific, honest, evidence-led. It names real numbers where available, describes real problems with real texture, and shows how Team's involvement changed something measurable.

**What makes a case study worth reading:**
- The problem section makes the reader feel the pain before the solution arrives
- The solution section explains *why* specific choices were made, not just what was built
- The results section names numbers — even rough ones — rather than adjectives
- The implication section connects the project to something larger (industry, future, replicable pattern)

---

## Workflow

```
PHASE 1: INTAKE          → Understand the project, gather raw material
PHASE 2: STRUCTURE       → Choose the right format for the story
PHASE 3: DRAFT           → Write section by section
PHASE 4: EVIDENCE PASS   → Verify every claim has a source or qualifier
PHASE 5: POLISH          → Headlines, pull quotes, calls to action
PHASE 6: AI PATTERN PASS → Check against references/writing-standards/ai-writing-patterns.md
PHASE 7: DELIVERY        → Format for intended channel
```

---

## Phase 1: Intake

Before writing, extract the following from whatever raw material is provided (brief, notes, conversation):

```
CASE STUDY INTAKE
─────────────────
Client name: [or anonymised as "A leading [sector] company" if confidential]
Industry/sector:
Project name or type:
Team products used:
Project duration:
Geography/market:
Confidentiality level: [Full name OK | Sector only | Fully anonymised]

The problem (raw):
The solution (raw):
Key outcomes/results:
Any numbers available (%, BDT, time saved, users, etc.):
Client quotes available: [Y/N]
Approved for public use: [Y/N]
Intended channel: [LinkedIn | Substack | Sales deck | Website | Pitch deck | Internal]
```

If raw material is thin, ask targeted questions — maximum 3 at a time.

---

## Phase 2: Structure

Choose the format based on intended channel and available evidence:

### Format A — Full Case Study (600–900 words)
For: website, Substack, sales deck leave-behind, pitch decks
Best when: rich project details available, client approves naming, quantifiable results exist

```
1. Headline          — outcome-first, specific
2. Context           — client, sector, scale (2-3 sentences)
3. The Challenge     — what was broken, why it mattered, why it was hard (150-200 words)
4. The Solution      — what was built, why these choices, what brought (200-250 words)
5. The Results       — numbered outcomes, before/after where possible (100-150 words)
6. Future Implications — what this enables next, replicable pattern, industry signal (100 words)
7. Call to Action    — adapted for channel
```

### Format B — Short Story (250–350 words)
For: LinkedIn posts, email outreach, proposal appendices
Best when: one clear headline result, fast consumption needed

```
1. Hook              — the problem in one striking sentence
2. What we built     — 2-3 sentences
3. What changed      — 2-3 results, specific
4. The bigger point  — one sentence of implication
5. CTA               — one line
```

### Format C — Impact Snapshot (100 words + visual spec)
For: pitch deck slides, one-pagers, trade show materials
Best when: minimal reading expected, visual-first context

```
[Client] + [Sector badge]
Problem: [one sentence]
Solution: [product name + one phrase]
Result: [3 bullet points, each starting with a number or %]
Quote: [if available]
```

---

## Phase 3: Draft — Section by Section

### Headline
Write 3 options, each with a different angle:
- **Outcome-led:** "[Client] reduces [X] by [Y%] with AI-powered field verification"
- **Problem-led:** "When [problem], [Client] needed more than a spreadsheet"
- **Transformation-led:** "From manual audits to real-time visibility: [Client]'s field force transformation"

Pick the strongest. The headline must be specific enough to be credible and compelling enough to earn the next sentence.

### The Challenge
This section must make the reader feel the problem before they hear the solution. Write it from the client's perspective, not Team's.

**Do:** Name the specific friction — "Field reps were submitting paper forms two days after visits. By the time managers saw the data, the moment had passed."

**Don't:** Start with "Our client faced challenges in their operations."

Structure:
1. Business context (what they do, at what scale)
2. The specific operational problem
3. Why previous solutions failed or were absent
4. What was at stake (revenue, compliance, competitive position, client trust)

### The Solution
Explain what was built and — critically — why those specific choices were made. This is where Team's expertise shows.

**Do:** We chose a mobile-first architecture because 80% of the client's field agents operated without reliable desktop access.

**Don't:** Just list features.

Structure:
1. What proposed and why (the insight, not just the product)
2. How it was built (key technical or design decisions, in plain language)
3. The implementation process — any notable challenges overcome
4. What makes this deployment different from a generic off-the-shelf solution

### The Results
This section must be as specific as the evidence allows. If hard numbers are not available, use directional language with appropriate hedging — never invent precision.

**Hierarchy of evidence:**
- Best: "Outlet compliance rates increased from 34% to 71% within 90 days"
- Good: "Field report submission time dropped by approximately 60%"
- Acceptable: "Management reporting that had taken 3 days now completes same-day"
- Minimum: "The client reports significant reduction in manual reconciliation work"

Always lead with the most impressive credible result. Group related results.

### Future Implications
Connect this project to something larger. This is the section that earns shares and reposts.

Three angles to choose from:
1. **Sector signal** — what this project reveals about where the industry is heading
2. **Replicable pattern** — what similar companies can learn from this approach
3. **Product evolution** — how this deployment shaped Team's product thinking

One paragraph. No more than 100 words.

---

## Phase 4: Evidence Pass

Before finalising, review every claim:

- [ ] Every percentage or number has a source or qualifier ("client-reported", "measured over 90 days")
- [ ] No superlatives without evidence ("best", "first", "only") unless verifiable
- [ ] Client name usage matches agreed confidentiality level
- [ ] Product names are correct (TradeEye, not Trade Eye; Proggya, not Proggya Analytics)
- [ ] No claims about competitors by name unless client-sourced

If a claim cannot be verified, either remove it, soften it with a qualifier, or flag it for client confirmation.

---

## Phase 5: Polish

### Headlines and subheadings
Every section heading should work as a standalone statement — not just a label.

- ❌ "The Challenge" → ✅ "A 72-hour lag between the field and the boardroom"
- ❌ "The Results" → ✅ "From two-day delays to same-day visibility"

### Pull quote
Extract one strong client quote (if available) or one striking result statement to use as a pull quote. This is the sentence that gets screenshotted and shared.

### Call to action
Adapt for channel:
- **LinkedIn post:** "If your field force is running on WhatsApp and spreadsheets, this is what the transition looks like. [Link to full case study]"
- **Sales deck:** "Speak to our team about what a similar deployment looks like for your operations."
- **Website:** "Read more client stories →" or "Book a demo to see [Product] in action."
- **Substack:** "What would it take to do this at your company? I have broken down the approach below."

---

## Phase 6: AI Pattern Pass

**Mandatory.** Before delivery, check the draft against `references/writing-standards/ai-writing-patterns.md`.

Case studies are especially vulnerable to AI detection because:
- They follow a natural Challenge → Solution → Results template (Layer 4: structural signatures)
- They tend to produce uniform paragraph lengths (Layer 3: discourse coherence)
- Business language naturally gravitates toward AI-optimised vocabulary (Layer 1: perplexity)

Apply the pre-delivery checklist from the shared guide. Pay extra attention to:
- Breaking the template feel — vary section lengths, sometimes merge sections, let one section dominate
- Paragraph variation — the Challenge section might be two long paragraphs, the Results section might be one short one
- Vocabulary — avoid "comprehensive," "streamline," "optimize," "leverage" in the solution description
- No formulaic transitions between sections

---

## Phase 7: Delivery Formats

| Channel | Format | Word count | Output |
|---|---|---|---|
| Website / Sales deck | Full case study | 600–900 | Markdown + Word doc |
| LinkedIn | Short story | 250–350 | Post text, ready to paste |
| Substack | Full case study + narrative intro | 800–1200 | Markdown |
| Pitch deck | Impact snapshot | 80–120 | Slide copy + visual spec |
| Email outreach | Short story | 150–200 | Email body |
| Internal / proposal appendix | Full case study | 600–900 | Word doc |

For Word doc output, read and follow the docx skill.

---

## Reference Cases

Known deployable references (use when illustrating what is possible):

| Client | Product | Key result | Confidentiality |
|---|---|---|---|
| British American Tobacco Bangladesh (BATB) | TradeEye | AI field force verification at scale | Public — can name |
| Oxford Microbiology (UK) | Callibrio | Research grant management | Public — can name |
| [FMCG client, Bangladesh] | Inspecto | Field task verification | Sector-level only unless confirmed |

When starting a new case study, check whether a similar reference case already exists — cross-reference or draw parallels where relevant.

---

## Quality Checklist

Before delivering:
- [ ] Headline is specific and outcome-led
- [ ] Challenge section makes the problem feel real before the solution arrives
- [ ] Solution section explains *why* choices were made, not just what was built
- [ ] Results section leads with the strongest credible number
- [ ] Every claim is evidenced or qualified
- [ ] Confidentiality level is respected throughout
- [ ] Future implications connects to something beyond this one project
- [ ] CTA is adapted for the intended channel
- [ ] Format matches the intended channel
- [ ] product names are spelled correctly
- [ ] AI pattern pass completed (references/writing-standards/ai-writing-patterns.md checklist applied)
- [ ] Brand voice check passed (no banned words, product narrative aligned)
