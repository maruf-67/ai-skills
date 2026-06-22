---
name: marketing-progress-tracker
description: "Weekly and monthly marketing accountability for Team's corporate brand team. Use when: (1) Reviewing what the team completed vs the quarterly plan, (2) Identifying gaps and late tasks, (3) Getting a priority nudge for the next week, (4) Assessing outcomes and recommending plan adjustments. Triggers on: 'marketing update', 'progress review', 'what's behind', 'what should we focus on', 'weekly review', 'monthly check-in', 'how are we doing on the plan'."
source: ai-os-custom
context: both
version: 1.0.0
added: 2026-03-28
---

# Marketing Progress Tracker

The accountability layer. Takes team updates, compares against the plan, flags gaps, and tells the team what to do next. Closes the planning-execution loop.

**Run weekly** for a quick priority nudge. **Run monthly** for a full progress review.

---

## Workflow

```
PHASE 1: INTAKE          → Receive team update (any format)
PHASE 2: MAP             → Match completions against quarterly plan
PHASE 3: GAP ANALYSIS    → What's behind, what's missing, what's at risk
PHASE 4: HEALTH SCORE    → How balanced is pillar coverage?
PHASE 5: PRIORITY NUDGE  → Next 3 tasks the team should focus on
PHASE 6: OUTCOMES        → If results provided, assess and recommend adjustments
```

---

## Phase 1: Intake

Accept any format:
- Paste meeting notes from a team standup
- Free-form update: "This week we did X, Y, Z"
- Trello board screenshot or card list
- A list of completed items

Also accept:
- Outcome data: "Our LinkedIn posts got X reach this month"
- PR results: "The Daily Star pitch was rejected"
- Event outcomes: "We attended [event], met [N] people"

If no update is provided, ask: "What did the team complete or work on this week/month?"

---

## Phase 2: Map Completions Against Plan

Compare what was done against the quarterly plan (if the plan has been shared, reference it; if not, ask the team to paste the relevant section).

Output a simple mapping:

```
COMPLETED VS PLANNED
─────────────────────
✅ Done: [Item] — [Pillar]
✅ Done: [Item] — [Pillar]
⚠️ In Progress: [Item] — [Expected completion: when?]
❌ Not started: [Item] — [Was due: when?]
❌ Not started: [Item] — [Was due: when?]
```

---

## Phase 3: Gap Analysis

Identify patterns in what's slipping:

**By pillar:**
- Which pillars have no activity this period?
- Which pillars are consistently underserved?

**By type:**
- Is the team strong on content but weak on offline/networking?
- Are awards and PR activities consistently deprioritised?
- Is the blog falling behind the planned cadence?

**By ownership:**
- Are certain campaign types always late? (May indicate ownership or capacity issue)

**Risk flags:**
- Any award deadlines approaching in the next 30 days that haven't been started?
- Any events requiring registration that are approaching?
- Any ISO or certification renewals due?

---

## Phase 4: Pillar Coverage Health Score

Rate the current quarter's pillar balance:

```
PILLAR HEALTH — Q[N] [Year] (as of [date])
──────────────────────────────────────────
Channels:              [🟢 On track / 🟡 Thin / 🔴 No activity]
                       [What's been done / What's missing]

Assets:                [🟢 / 🟡 / 🔴]
                       [Blog cadence / Podcast status]

Partnership/Networking:[🟢 / 🟡 / 🔴]
                       [PR / Media / Awards status]

Offline Campaign:      [🟢 / 🟡 / 🔴]
                       [Events / Networking / Awards]

OVERALL BALANCE: [Balanced / Uneven — [which pillar is underserved] / Weak]
```

A healthy quarter has at least some activity in all 4 pillars. Two consecutive months of zero activity in a pillar is a structural gap, not a timing issue.

---

## Phase 5: Priority Nudge

Always output exactly 3 priorities — no more, no less. The team should leave every progress review knowing the next three things to work on.

```
NEXT 3 PRIORITIES
─────────────────
1. [Task] — [Pillar] — [Why now: deadline / gap / opportunity]
   Owner: [Role]
   Time required: [Half day / Full day / Multiple days]

2. [Task] — [Pillar] — [Why now]
   Owner: [Role]
   Time required: [estimate]

3. [Task] — [Pillar] — [Why now]
   Owner: [Role]
   Time required: [estimate]
```

Priority selection logic:
- Deadline-driven items come first (award deadlines, event registrations, press timelines)
- Highest-impact gap in pillar coverage comes second
- Quick win (low effort, medium impact) comes third to maintain momentum

---

## Phase 6: Outcomes Assessment (Monthly Only)

When outcome data is provided, assess:

**What worked:**
- What content or campaign drove the most reach or engagement?
- Which PR pitches landed?
- What networking activities produced tangible follow-ups?

**What didn't work:**
- What was published but got minimal response?
- What was attempted but rejected (PR pitches, award entries)?

**Pattern:**
- Is there a repeating gap? (e.g. LinkedIn posts consistently underperform → topic or format issue)
- Is there a standout channel or format? (e.g. case studies always generate inbound)

**Plan adjustment recommendation:**
- What should be done more next quarter?
- What should be stopped or reduced?
- Any new approach to test?

---

## Output Format — Weekly (brief)

```
WEEKLY MARKETING CHECK-IN — [Date]
════════════════════════════════════
Completed: [N items] | In progress: [N] | Not started/late: [N]

PILLAR HEALTH THIS WEEK:
Channels: [🟢/🟡/🔴] | Assets: [🟢/🟡/🔴] | Partnership: [🟢/🟡/🔴] | Offline: [🟢/🟡/🔴]

NEXT 3 PRIORITIES:
1. [Task] — [Pillar] — [Why now]
2. [Task] — [Pillar] — [Why now]
3. [Task] — [Pillar] — [Why now]

⚠️ URGENT FLAGS: [Any deadlines in next 7 days]
```

## Output Format — Monthly (full)

All phases above, plus outcomes assessment and plan adjustment recommendation. Should be shareable to Tawhid as a one-page summary.

---

## Standing Items to Always Check

Regardless of what the team reports, always verify:

- **Awards deadline check:** Any awards in the roster with submission deadlines in the next 30 days?
- **Event registration check:** Any events in the calendar with registration deadlines in the next 14 days?
- **Blog cadence:** Is the team on track for at least one post per month on insights.team.com?
- **ISO/certification:** Any renewals flagged in the certification tracker?
- **CEO leverage:** Has Tawhid produced anything this period that should have been amplified but wasn't?
