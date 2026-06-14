---
name: cross-pillar-ideation
description: "Detects downstream brand opportunities from any completed work. Use when: (1) A project, deployment, or milestone has just been completed, (2) The team has published something and wants to know what else it can become, (3) Tawhid has written or spoken somewhere and the team should amplify it, (4) A certification was renewed or awarded, (5) You want to turn a standalone action into an integrated campaign. Triggers on: 'what else can we do with this', 'what can we publish from this', 'amplify this', 'cross-pillar', 'what are we missing', 'turn this into a campaign'."
source: softograph-custom
context: softograph
version: 1.0.0
added: 2026-03-28
---

# Cross-Pillar Ideation

Takes any completed work and maps every downstream brand opportunity the team might miss. Turns standalone actions into integrated campaigns.

**When to use:** After something happens — a project ships, a CEO article is published, a certification is renewed, an event is attended. This agent runs on completions, not plans.

---

## Core Mechanic

Every completed action can feed multiple pillars. The team's instinct is to treat each action as finished once the primary output is done. This skill's job is to show the full downstream map.

```
ONE COMPLETED ACTION
       ↓
┌──────────────────────────────────────────┐
│  Channels  │  Assets  │  Partnership  │  Offline  │
│  LinkedIn  │  Blog    │  PR / Daily   │  Awards   │
│  Instagram │  Podcast │  Newsletter   │  Events   │
│  SEO/Forums│          │  Publications │  Networking│
└──────────────────────────────────────────┘
       ↓
PRIORITISED OPPORTUNITY LIST (effort × impact)
```

---

## Workflow

```
PHASE 1: INTAKE          → What was completed?
PHASE 2: ASSET MAPPING   → What content/proof exists from this?
PHASE 3: PILLAR EXPANSION → Map to all 4 pillars
PHASE 4: CEO LEVERAGE    → Is there a CEO angle?
PHASE 5: PRIORITISE      → Score by effort and impact
PHASE 6: OUTPUT          → Opportunity list with recommended sequence
```

---

## Phase 1: Intake

Accept any input:
- "We just completed the [client] [product] deployment"
- "Tawhid published [article] on Substack"
- "We renewed our ISO certification"
- "We attended [event]"
- "We won [award]"
- Paste a case study, article, or project summary

Extract:
- What was completed or produced
- What evidence or proof exists (metrics, visuals, quotes)
- Any client or partner who could be referenced (with confidentiality level)
- Timeline (when it happened — recent events have more PR value)

---

## Phase 2: Asset Mapping

Before expanding to pillars, catalogue what already exists:

```
AVAILABLE ASSETS
────────────────
Written content:   [Case study / article / report / proposal]
Visual content:    [Photos / screenshots / videos / infographics]
Data/metrics:      [Numbers that prove impact]
Quotes:            [Client / team / CEO]
Client permission: [Can name / sector only / anonymous]
Freshness:         [Just completed / recent / older]
```

The quality and availability of these assets determines which opportunities are realistic vs aspirational.

---

## Phase 3: Pillar Expansion

Map the completed work to every possible pillar touchpoint:

### Channels
- **LinkedIn:** Can this be a post? A series? A carousel? Tag the client?
- **Facebook/Instagram:** Is there a visual? Can it be adapted?
- **Blog (insights.softograph.com):** Full article, case study post, or technical write-up?
- **Medium/Substack:** Is there a broader industry angle for a longer piece?
- **YouTube:** Is there a demo, walkthrough, or talking-head video angle?
- **SEO:** Does this create a keyword opportunity (e.g. "AI merchandising verification Bangladesh")?

### Assets
- **Blog post:** Full case study or project spotlight on insights.softograph.com
- **Podcast episode:** Is there a story here that makes for a good episode topic?

### Partnership/Networking
- **National daily pitch:** Is there a technology or business news angle for The Daily Star, The Business Standard, The Financial Express?
- **Trade publication:** Is there a sector-specific story (FMCG tech, fintech, healthcare IT)?
- **Newsletter:** Can this be featured in an industry newsletter?
- **PR brief:** Formal press release opportunity?

### Offline Campaign
- **Award nomination:** Does this qualify for any active awards in the roster?
- **Internal achievement:** Is this worth documenting as a company milestone?
- **Event speaking topic:** Does this give Tawhid or the team a credible speaking angle?
- **Networking story:** Is this a conversation-starter for upcoming networking events?

---

## Phase 4: CEO Leverage

Always check: is there a CEO angle that amplifies this beyond what the team alone can achieve?

**CEO amplifiers:**
- A first-person Substack piece about the challenge solved or the lesson learned
- A quote for a press release that adds authority
- A LinkedIn post in Tawhid's personal voice (not the company page)
- A speaking pitch to an event using this project as the case study
- A media interview angle ("CEO of ISO-certified AI company explains how...")

The CEO angle typically doubles the reach of any campaign. Flag it explicitly with a suggested headline or pitch angle.

---

## Phase 5: Prioritise

Score each opportunity on two axes:

**Effort:** How much work does this take?
- Low: takes less than 2 hours (e.g. LinkedIn post, quick internal announcement)
- Medium: half day to one day (e.g. blog post, press release)
- High: multiple days (e.g. podcast episode, award entry, full PR campaign)

**Impact:** What brand or business value does this create?
- High: earned media, industry credibility, direct sales enablement, CEO visibility
- Medium: brand presence, content library building, audience growth
- Low: internal record, minor presence

**Priority matrix:**

| Effort × Impact | Priority | Do when |
|---|---|---|
| Low × High | 🔴 Do immediately | This week |
| Low × Medium | 🟡 Do soon | This month |
| Medium × High | 🔴 Plan and schedule | This quarter |
| Medium × Medium | 🟡 Batch with similar tasks | This quarter |
| High × High | 🟠 Plan carefully | With budget and timeline |
| High × Medium | ⚪ Do if capacity allows | Next quarter |
| Any × Low | ⚪ Pass | Skip |

---

## Phase 6: Output Format

```
CROSS-PILLAR OPPORTUNITIES
══════════════════════════
Input: [What was completed]
Assets available: [What exists to work with]

🔴 DO THIS WEEK (Low effort, High impact)
──────────────────────────────────────────
1. [Opportunity]
   Pillar: [Channel/Asset/Partnership/Offline]
   What to do: [Specific action]
   Asset needed: [What to create or use]

🟡 PLAN THIS MONTH (Medium effort, Medium-High impact)
──────────────────────────────────────────────────────
2. [Opportunity]
   Pillar: [Which pillar]
   What to do: [Specific action]
   Time estimate: [Half day / Full day]

🟠 INTEGRATED CAMPAIGN POTENTIAL
──────────────────────────────────
[If this can become a full integrated campaign]
   Campaign name: [Working title]
   Pillars touched: [Which 3-4 pillars]
   Sequence: [Step 1 → Step 2 → Step 3]
   Recommended timeline: [When to run this]

👤 CEO LEVERAGE
──────────────
[Specific CEO angle with suggested headline or pitch]
   Format: [Substack / LinkedIn / Media pitch / Speaking]
   Angle: [The specific story only Tawhid can tell]

⚪ PASSING THIS CYCLE
──────────────────────
[Item] — [Why: too much effort / insufficient assets / timing not right]

══════════════════════════════
Which opportunities do you want to action? Reply with item numbers or 'all'.
```

---

## Reference Examples

Use these as templates for common scenarios:

**Client deployment completed (e.g. BATB TradeEye):**
→ Case study (Asset/Blog) → LinkedIn post series (Channel) → national daily pitch — "AI company helps leading tobacco brand verify 10,000 retail outlets" (Partnership) → award entry — Technology Excellence / AI application (Offline) → Tawhid Substack: "What deploying AI at scale in a traditional industry actually looks like"

**ISO certification renewed:**
→ LinkedIn announcement (Channel) → press release (Partnership) → website update + sales deck update → award entry — ISO-certified company categories (Offline) → Tawhid quote for press release → add to proposals as credibility signal (Sales enablement)

**CEO Substack article published:**
→ LinkedIn repurpose — key argument as post (Channel) → blog cross-post on insights.softograph.com (Asset) → pitch to The Daily Star technology supplement (Partnership) → speaking pitch: use article as basis for conference topic (Offline) → email newsletter feature (Partnership)

**Event attended:**
→ LinkedIn post with key insight or takeaway (Channel) → follow-up outreach to people met (Offline/Networking) → blog post: "What [event] revealed about [industry trend]" (Asset) → chamber relationship follow-up (Offline)
