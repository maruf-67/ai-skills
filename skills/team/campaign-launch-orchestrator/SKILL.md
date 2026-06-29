---
name: campaign-launch-orchestrator
description: "Step-by-step campaign launch orchestrator for Team's marketing team.\
  \ Guides the team through a full campaign from brief to launch checklist, one step\
  \ at a time, prompting the next task automatically. Use when launching any marketing\
  \ campaign \u2014 channel content, case study promotion, product announcement, or\
  \ integrated brand campaign. Triggers on: 'launch a campaign', 'run a campaign',\
  \ 'campaign orchestrator', 'help me run this campaign', 'plan and execute this campaign'."
source: ai-os-custom
context: both
version: 1.0.0
added: 2026-03-28
type: Skill
title: campaign-launch-orchestrator
resource: file:///home/almaruf67/Codes/ai-skills/skills/team/campaign-launch-orchestrator/SKILL.md
tags:
- team
- campaign-launch-orchestrator
timestamp: '2026-06-29T19:13:46Z'
---

# Campaign Launch Orchestrator

Guides the marketing team through a full campaign, step by step. Declares the full sequence upfront, executes one step at a time, and prompts the next automatically. The team never has to ask "what do we do next?"

---

## How It Works

1. Team gives a brief (one sentence is enough)
2. This skill declares the full step sequence and campaign type
3. Each step activates a specific agent persona and produces a concrete output
4. After each step: **"Ready for Step N? Say 'next' or give adjustments first."**
5. Steps can be skipped or adjusted at any point

---

## Campaign Types

| Type | When to use | Steps used |
|---|---|---|
| **Integrated** | Case study, client win, ISO certification, CEO article | All 6 |
| **Channel push** | LinkedIn series, blog post, content calendar | 1, 2, 4, 6 |
| **Announcement** | Award, partnership, new hire, event attendance | 1, 2, 3, 5, 6 |

---

## Step Sequence

```
Step 1/6 → Campaign Brief & Pillar Map
Step 2/6 → Messaging Architecture
Step 3/6 → PR & Earned Media Plan
Step 4/6 → Content Calendar & Channel Copy
Step 5/6 → Events & Networking Tie-ins
Step 6/6 → Launch Checklist & Cross-Pillar Review
```

---

## Kickoff Protocol

When loaded, immediately respond with:

```
CAMPAIGN LAUNCH ORCHESTRATOR
══════════════════════════════
Ready. Give me a brief — one sentence is enough.

Example: "We just completed the BATB TradeEye deployment and want full brand value from it."

What's the campaign?
```

Once the brief is received, output:

```
CAMPAIGN: [Campaign name derived from brief]
TYPE: [Integrated / Channel push / Announcement — explain why]

STEP SEQUENCE:
  Step 1/6 → Campaign Brief & Pillar Map       [starting now]
  Step 2/6 → Messaging Architecture
  Step 3/6 → PR & Earned Media Plan
  Step 4/6 → Content Calendar & Channel Copy
  Step 5/6 → Events & Networking Tie-ins
  Step 6/6 → Launch Checklist & Cross-Pillar Review

─────────────────────────────
STEP 1/6 — CAMPAIGN BRIEF & PILLAR MAP
[Execute step 1 immediately — see below]
```

---

## Step Definitions

### Step 1 — Campaign Brief & Pillar Map
*Persona: corporate-brand-strategist*

Produce:
- One-paragraph campaign brief (what happened, why it matters, what we want to achieve)
- Pillar coverage map: which of the 4 pillars (Channels, Assets, Partnership/Networking, Offline) this campaign touches
- Classification: Integrated or Standalone
- Recommended campaign duration (one-off / 2-week push / ongoing)

End with: `Step 1 complete. Ready for Step 2 (Messaging Architecture)? Say 'next' or adjust first.`

---

### Step 2 — Messaging Architecture
*Persona: b2b-marketing-cmo*

Produce:
- Core message (one sentence — the single thing we want audiences to remember)
- 3 supporting messages (proof points, each tied to a specific audience segment)
- Tone guidance (professional / thought-leadership / celebratory / technical)
- Words/phrases to use and avoid
- Headline options (3 variants — outcome-led, problem-led, transformation-led)

End with: `Step 2 complete. Ready for Step 3 (PR & Earned Media Plan)? Say 'next' or adjust first.`

---

### Step 3 — PR & Earned Media Plan
*Persona: pr-media-relations*

Produce:
- Newsworthiness assessment (is this genuinely newsworthy for national media?)
- Target outlet(s) from Bangladesh media landscape (Daily Star, Business Standard, trade publications)
- Format recommendation (press release / editorial pitch / award entry)
- Draft the recommended format
- Distribution sequence and timing
- Fallback if national media doesn't pick it up (trade media / owned channels)

If not newsworthy for national media: state why and recommend owned channel approach instead. Do not pad a weak story.

End with: `Step 3 complete. Ready for Step 4 (Content Calendar & Channel Copy)? Say 'next' or adjust first.`

---

### Step 4 — Content Calendar & Channel Copy
*Persona: marketing-content-creator*

Produce:
- Content calendar: which channels, which dates, what format
- Ready-to-use copy for each channel:
  - LinkedIn post (150–250 words, hook + body + close, no CTA)
  - Facebook/Instagram caption (shorter, visual-first framing)
  - Blog post outline for insights.team.com (headline, 5 section headers, intro paragraph)
  - Email/newsletter teaser (2–3 sentences)
- Visual brief: what images or graphics are needed for each piece

End with: `Step 4 complete. Ready for Step 5 (Events & Networking Tie-ins)? Say 'next' or adjust first.`

---

### Step 5 — Events & Networking Tie-ins
*Persona: events-networking*

Produce:
- Assessment: does this campaign have an offline angle? (speaking topic, networking story, award entry)
- If yes:
  - Award categories this qualifies for (reference Awards Roster if available)
  - Networking talking point (one sentence to use when this story comes up in conversation)
  - Speaking angle (if the campaign has a thought-leadership dimension)
- Post-event amplification brief (what to post if this campaign is presented at an event)

If no offline angle: state clearly and skip to Step 6.

End with: `Step 5 complete. Ready for Step 6 (Launch Checklist)? Say 'next' or adjust first.`

---

### Step 6 — Launch Checklist & Cross-Pillar Review
*Persona: corporate-brand-strategist*

Produce:

```
LAUNCH CHECKLIST — [Campaign name]
════════════════════════════════════

CONTENT READY:
  [ ] LinkedIn post drafted
  [ ] Blog post drafted / scheduled
  [ ] PR pitch / press release drafted
  [ ] Social media visuals briefed
  [ ] Email/newsletter teaser drafted

APPROVALS:
  [ ] Tawhid has reviewed and approved messaging
  [ ] Client/partner name usage confirmed (if applicable)
  [ ] Legal/compliance check done (if product claims made)

DISTRIBUTION:
  [ ] PR pitch sent to [outlet(s)]
  [ ] LinkedIn post scheduled for [date]
  [ ] Blog post scheduled for [date]
  [ ] Email sent to [list]

CROSS-PILLAR COVERAGE:
  Channels:              [✅ / ⚠️ not covered]
  Assets:                [✅ / ⚠️ not covered]
  Partnership/Networking:[✅ / ⚠️ not covered]
  Offline:               [✅ / ⚠️ not covered]

MISSED OPPORTUNITIES (if any):
  [Any pillar not covered — with a suggestion for how to address it]

════════════════════════════════════
Campaign ready to launch. 🚀
```
