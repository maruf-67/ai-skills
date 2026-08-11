---
name: brand-discovery
description: "Use when a brand needs to discover or articulate its identity through structured multi-session interviews. Covers purpose, positioning, audience, personality, voice, narrative, and founder-brand tension across 8 modules using laddering, 5 Whys, and projective techniques. Produces a resumable session with disk-persisted state and a master brandbook (90_SYNTHESIS.md)."
type: Skill
title: brand-discovery
resource: file:///home/almaruf67/Codes/ai-os/ECC/skills/brand-discovery/SKILL.md
tags:
- ecc
- general
timestamp: '2026-08-03T21:09:41Z'
---

# Brand Discovery

Use this skill to conduct a structured, adaptive brand identity interview.
The goal is a complete `90_SYNTHESIS.md` — a master brandbook the
organization can use to brief designers, writers, and external
collaborators.

The interview runs across multiple sessions. Capture answers to disk as you
go so that no elicited knowledge is lost when a conversation ends, and so a
later session can resume from where the last one stopped.

## When to Activate

- A brand is being created, repositioned, or needs a written identity reference to brief collaborators.
- Multiple sessions are expected — the conversation will span days or weeks.
- Multiple founders or stakeholders need individual interviews before a reconciliation pass.
- The user wants a structured, repeatable method rather than an ad-hoc chat.
- Existing brand documentation is scattered, implicit, or founder-dependent and needs to be made explicit.

## Session start protocol

On every activation, perform these steps **before** asking any interview
question:

1. **Check for prior progress.** Look for an existing set of module files
   and a `state.json` checkpoint in the project's brand-identity directory.
   If none exists, this is a fresh start — confirm the brand name,
   participants, and where to save the brand-identity files, then begin at
   the first module.
2. **Read the current module file** if one is in progress, and scan its Raw
   section for previously captured answers.
3. **Report to the user** in two or three sentences: which module we are
   in, its status, and what remains. Then ask: "Continue here, or switch
   module?"

## Interview discipline

Apply these rules throughout every module:

1. **One question at a time.** Never present a list of questions.
2. **After each answer:** short paraphrase → one deepening probe OR close
   the thread if the topic is saturated. Never move on silently.
3. **Laddering:** for every "what" answer, follow with "Why does that
   matter to you?" until a core value surfaces (typically two to four
   iterations).
4. **5 Whys:** for beliefs or positioning claims — push until the root
   reason, not the surface declaration, is on the table.
5. **Detect thin answers:** if generic, jargon-heavy, or vague, ask for
   one concrete example, a client story, or a number.
6. **Projective techniques** (use once per module to break a plateau):
   - "If the brand were a person, how would they walk into a room?"
   - Brand obituary: "If the organization closed in five years, what would
     customers miss? What would you regret not having said?"
   - Competitive contrast: "Name one peer you admire but would never want
     to become. What specifically makes them the wrong model?"
7. **Saturation signal:** when two consecutive probes produce no new
   information, summarise and close the module.
8. **End of module:** write a structured module file with two sections:
   - `## Raw` — verbatim quotes and examples.
   - `## Synthesis` — your interpretation, three candidate formulations,
     open questions, contradictions between participants.
   Then update the `state.json` checkpoint (see State protocol below).

## Module sequence

| File | Label | Frameworks used |
|------|-------|-----------------|
| `10_purpose-why.md` | Purpose / Why | Sinek Golden Circle, Lencioni |
| `20_positioning.md` | Positioning | Dunford "Obviously Awesome", Moore template |
| `30_audience-niche.md` | Audience & Niche | Baker "Business of Expertise", ICP |
| `40_personality-archetype.md` | Personality & Archetype | Mark & Pearson 12 archetypes, J. Aaker 5 dims |
| `50_voice-tone.md` | Voice & Tone | Brand voice guidelines |
| `60_narrative-story.md` | Narrative / Story | Neumeier trueline, brand story arc |
| `70_founder-tension.md` | Founder Brands vs Studio Brand | Enns "Win Without Pitching" |
| `90_SYNTHESIS.md` | Master Brandbook | Kapferer prism, Aaker brand system |

Complete modules in order. Honour a user request to jump modules and note
the skip in `state.json`.

## State write protocol

After each module reaches saturation or done status, write two files:

**Module file** at `modules/{moduleFile}` — full Raw and Synthesis content.

**`state.json`** — a lightweight checkpoint so a later session can resume.
Update `completedModules`, `inProgressModule`, `nextModule`, `lastUpdated`.
Schema:

```json
{
  "session": "{brand_name}-brand-{YYYY-MM}",
  "outputPath": "{path_to_brand_identity_directory}",
  "completedModules": [],
  "inProgressModule": "10_purpose-why.md",
  "nextModule": "20_positioning.md",
  "participants": ["founder-A"],
  "lastUpdated": "{ISO-8601}"
}
```

After writing, confirm: "Module X saved. State updated. Next: Y."

**Terminal module (90_SYNTHESIS.md):** when writing the final synthesis,
set `inProgressModule` to `"90_SYNTHESIS.md"` and `nextModule` to `null`
in `state.json`. After writing, set `completedModules` to include
`"90_SYNTHESIS.md"`, then set `inProgressModule` to `null` — leaving it
populated would cause a future resumption to treat the completed brandbook
as still in progress. Confirm: "Brandbook complete. All modules saved."

## Multi-founder mode

When more than one founder participates, write each founder's answers to
`founders/{participant}.md` instead of the main module files. Validate the
`participant` name before writing: accept only alphanumeric characters and
hyphens (e.g. `founder-a`, `anna`); reject names containing path separators
(`/`, `\`, `..`) or special characters. Validate `moduleFile` against the
enumerated module sequence (10 through 90 only). Validate `outputPath` to
ensure it is an absolute path within the project directory — reject relative
paths and paths that escape via `..` segments. After all founders complete a
module, run a reconciliation pass: summarise convergences and divergences in
the module file, flag "productive tensions" for the group alignment workshop.

## Anti-Patterns

- **Starting without reading state first.** Every session must open by checking for existing module files and `state.json`. Skipping this loses all continuity from prior sessions.
- **Asking multiple questions at once.** One question at a time is not optional — lists produce checklist answers, not real insight.
- **Moving to Synthesis before saturation.** If the last two probes produced no new information, the module is done. If they did — it isn't.
- **Skipping multi-founder reconciliation.** When multiple stakeholders are involved, individual interviews must complete before reconciliation. Discussing the brand collectively first introduces anchoring bias.
- **Treating this as a one-shot session.** This skill is designed for multiple sessions. Rushing to `90_SYNTHESIS.md` in one conversation produces shallow output.

## Related Skills

- `competitive-platform-analysis` — after brand-discovery establishes the positioning brief, use this to scope and categorise the competitor set.
- `brand-voice` (ECC) — if the brand-discovery voice-and-tone module needs a separate, source-derived writing-style profile.

## Reference: 10_purpose-why

# Module 10 — Purpose / Why

> **Frameworks:** Sinek Golden Circle · Lencioni organisational purpose
>
> **Goal:** Surface the brand's core belief — the Why that exists independently
> of what the organisation sells or how it delivers. Captures the founding
> conviction, not the elevator pitch.

---

## Raw

<!-- Verbatim quotes, stories, and examples captured during the interview.
     Record exact language — paraphrase belongs in Synthesis, not here.
     Include speaker attribution if multi-founder session. -->

### Core belief (why does this exist?)

### The behavioural How (values in action, not poster slogans)

### What the brand refuses to be or do

### Founder quotes strong enough to become internal anchors

---

## Synthesis

<!-- Your interpretation of the raw material.
     Write three sections: formulations, open questions, contradictions. -->

### Candidate Why formulations (offer 2–3 versions, vary register and specificity)

1.
2.
3. ### Open questions / threads to pursue in later modules

### Contradictions or tensions between participants (multi-founder only)

### How does this Why constrain or enable positioning? (bridge to Module 20)


## Reference: 20_positioning

# Module 20 — Positioning

> **Frameworks:** Dunford *Obviously Awesome* · Moore crossing-the-chasm template ·
> Jobs-to-be-done lens
>
> **Goal:** Define the brand's competitive frame — who it's for, what category it
> competes in, what it does uniquely, and why that matters to the target client.
> Output is the raw material for a positioning statement the brand can act on.

---

## Raw

<!-- Verbatim quotes and examples. Record exact language. -->

### Who is the target client? (role, company type, situation)

### What category does the brand compete in? (how clients currently solve this problem)

### What makes the brand different from alternatives in that category?

### What does the target client care about most? (the value they get that others can't match)

### Competitive alternatives named by the founder (include "do nothing" / "hire in-house")

### Phrases or metaphors the founder uses naturally to describe what they do

---

## Synthesis

### Positioning statement draft (Dunford template)
> For **[target client]** who **[situation / JTBD]**, **[brand name]** is the
> **[category]** that **[unique value]**. Unlike **[alternatives]**, we
> **[key differentiator]**.

### Alternative framings (vary the category or the differentiator)

1.
2. ### White-space hypothesis (what no competitor is claiming that this brand could own)

### Open questions / ambiguities

### Tensions with Module 10 Why (flag any contradictions for Module 90 reconciliation)


## Reference: 30_audience-niche

# Module 30 — Audience & Niche

> **Frameworks:** Baker *The Business of Expertise* · Ideal Client Profile (ICP) ·
> Pain / trigger / desired outcome lens
>
> **Goal:** Make the target audience concrete enough to brief a copywriter or run
> a paid campaign — not a demographic sketch, but a psychographic and situational
> portrait of the best client the brand wants more of.

---

## Raw

<!-- Verbatim quotes and examples. -->

### Who is the ideal client? (describe a specific person, not a segment)

### What situation or trigger brings them to look for help?

### What have they tried before and why did it fall short?

### What does success look like to them? (in their words, not the brand's)

### What do they fear or want to avoid?

### Worst-fit clients (who the brand doesn't want to work with, and why)

### Quotes or stories from real past clients that illustrate the ideal fit

---

## Synthesis

### Ideal Client Profile (ICP)

| Dimension | Description |
|---|---|
| Role / title | |
| Organisation type & size | |
| Trigger situation | |
| Primary pain | |
| Desired outcome | |
| Budget signal | |
| Red-flag / disqualifier | |

### Psychographic portrait (2–3 sentences: how this person thinks, what they value, what they distrust)

### Niche hypothesis (the smallest viable market the brand could credibly own)

### Audience segments to test (if there is ambiguity about primary vs secondary ICP)

### Open questions / threads for Module 20 positioning reconciliation


## Reference: 40_personality-archetype

# Module 40 — Personality & Archetype

> **Frameworks:** Mark & Pearson 12 brand archetypes · J. Aaker 5 brand personality
> dimensions (sincerity / excitement / competence / sophistication / ruggedness)
>
> **Goal:** Establish the brand's character — how it would behave if it were a
> person. Personality governs tone, visual register, and what feels "on brand"
> versus "wrong". A sharp archetype makes a hundred small decisions automatic.

---

## Raw

<!-- Verbatim quotes and projective-technique responses. -->

### "If the brand were a person, how would they walk into a room?"

### Archetype instinct (which of the 12 resonates immediately, and why?)
> Creator · Caregiver · Ruler · Jester · Regular Person · Lover · Hero ·
> Outlaw · Magician · Innocent · Sage · Explorer

### Three adjectives the founder uses most naturally to describe the brand's character

### One brand or public figure the founder admires but the brand should NOT become (and specifically what to avoid)

### One brand or public figure whose personality register the brand aspires to

### How should the brand make clients feel? (not think — feel)

---

## Synthesis

### Primary archetype + shadow

| | |
|---|---|
| **Primary archetype** | (name + 1-line why) |
| **Secondary / shadow** | (what the primary archetype risks becoming; what keeps it honest) |

### J. Aaker personality scores (1–5, 5 = strongly applies)

| Dimension | Score | Evidence |
|---|---|---|
| Sincerity (warm, honest, down-to-earth) | | |
| Excitement (daring, spirited, imaginative) | | |
| Competence (reliable, intelligent, successful) | | |
| Sophistication (upper-class, charming) | | |
| Ruggedness (outdoorsy, tough) | | |

### Personality in action (3 behavioural guidelines derived from the archetype)

1.
2.
3. ### What the brand must never sound or look like (the anti-personality)

### Open questions / tensions with Module 50 Voice


## Reference: 50_voice-tone

# Module 50 — Voice & Tone

> **Frameworks:** Brand voice spectrum (formal <-> casual, serious <-> playful,
> distant <-> warm, conventional <-> irreverent) · Content-type tone matrix
>
> **Goal:** Codify the brand's verbal register precisely enough that two different
> writers produce copy that sounds like the same person. Voice is constant;
> tone shifts by context (home page vs. error message vs. proposal cover).

---

## Raw

<!-- Verbatim quotes and examples from the interview.
     Collect actual copy samples the founder likes or hates. -->

### Copy the founder admires (from their own brand or others) — include the source

### Copy the founder dislikes or finds "wrong register" — what specifically is wrong?

### Words or phrases the brand uses all the time (even informally)

### Words or phrases the brand actively avoids

### How should the brand sound on: a sales page? an error message? a proposal?

### "We always…" / "We never…" statements about how the brand communicates

---

## Synthesis

### Voice spectrum (mark the brand's position on each axis)

| Axis | 1 | 2 | 3 | 4 | 5 | Notes |
|---|---|---|---|---|---|---|
| Formal ←→ Casual | | | | | | |
| Serious ←→ Playful | | | | | | |
| Distant ←→ Warm | | | | | | |
| Conventional ←→ Irreverent | | | | | | |
| Minimal ←→ Expressive | | | | | | |

### Voice statement (one paragraph a writer can internalise)

### Tone matrix by content type

| Content type | Tone shift | Example phrase |
|---|---|---|
| Homepage headline | | |
| Case study / evidence | | |
| Proposal / commercial | | |
| Error / apology | | |
| Social / informal | | |

### The three things to check every draft against

1.
2.
3. ### Open questions / tensions with Module 40 Personality


## Reference: 60_narrative-story

# Module 60 — Narrative / Story

> **Frameworks:** Neumeier trueline · Brand story arc (context → conflict →
> resolution → invitation) · Hero's journey (brand as guide, client as hero)
>
> **Goal:** Crystallise the brand's founding story and its narrative arc — the
> conflict it was built to resolve, the transformation it delivers, and the
> invitation it extends to clients. The trueline is the single sentence that
> holds every story the brand tells.

---

## Raw

<!-- Verbatim quotes and stories. -->

### The founding story (what happened, when, why this — not the polished version)

### The conflict or frustration that made the brand necessary

### What the world looks like when the brand's work succeeds (the transformation)

### A client story that best illustrates what the brand does and why it matters

### What would be lost if the brand didn't exist? (brand obituary prompt)

### The invitation: what does the brand ask clients to do or believe?

---

## Synthesis

### Trueline draft (Neumeier: "[Brand] is the only [category] that [unique claim].")

> ### Alternative truelines (2–3 variations, vary level of abstraction)

1.
2.
3. ### Brand story arc

| Beat | Content |
|---|---|
| **Context** (the world before) | |
| **Conflict** (what's broken / wrong) | |
| **Resolution** (what the brand does about it) | |
| **Invitation** (what the client is asked to do) | |

### The brand as guide (not hero) — what the client achieves, not the brand

### Open questions / tensions with Module 20 Positioning and Module 10 Why


## Reference: 70_founder-tension

# Module 70 — Founder Brand vs Organisation Brand

> **Frameworks:** Enns *Win Without Pitching* · Personal brand vs institutional
> brand spectrum
>
> **Goal:** Map the relationship between the founder's personal reputation and the
> organisation's brand. Clarify how much equity each carries, what the healthy
> boundary is, and how to sequence personal vs organisation brand investment.
> Unresolved founder-brand tension is a common scaling bottleneck.

---

## Raw

<!-- Verbatim quotes. -->

### Is the founder personally known in the market? How?

### Do clients buy the founder or the organisation? (ask for evidence, not instinct)

### What happens to the brand if the founder steps back or is unavailable?

### What does the founder want for their personal brand in 3–5 years?

### What does the organisation's brand need to be able to do independently?

### Where has the founder-brand been an asset? Where has it been a constraint?

---

## Synthesis

### Current state: where on the spectrum?

```
[Founder IS the brand] ←————————→ [Organisation brand stands alone]
         1         2         3         4         5
```
Current position: `___`   Target position (3-year): `___`

### What the founder brand should own (and keeps owning)

### What the organisation brand needs to own (independently of the founder)

### Transition plan sketch (if moving from founder-centric toward institutional)

### Risk if nothing changes

### Open questions / threads for Module 90 Synthesis


## Reference: 90_SYNTHESIS

# Module 90 — Master Brandbook (Synthesis)

> **Frameworks:** Kapferer Brand Identity Prism · Aaker brand system (identity /
> personality / associations / equity)
>
> **Goal:** Reconcile all seven preceding modules into a single, actionable
> brandbook. This document is the source of truth the brand uses to brief
> designers, writers, and external collaborators. It resolves tensions between
> modules, commits to specific formulations, and translates them into practical
> guidelines.

---

## Raw

<!-- Module 90 consolidates outputs from Modules 10–70; minimal new raw input is
     collected here. Capture any final founder statements or corrections made
     during the synthesis pass below. -->

---

## Synthesis

### 1. The Why (from Module 10)

> **Core belief:**
>
> **Behavioural How (values in action):**
>
> **What we refuse to be:**

---

### 2. Positioning (from Module 20)

> **Positioning statement:**
> For **[target client]** who **[situation]**, **[brand name]** is the
> **[category]** that **[unique value]**. Unlike **[alternatives]**, we
> **[key differentiator]**.
>
> **White-space the brand owns:**

---

### 3. Audience (from Module 30)

> **Ideal Client Profile (one-paragraph portrait):**
>
> **Niche the brand is building toward:**
>
> **Red-flag / disqualifier:**

---

### 4. Kapferer Brand Identity Prism

| Facet | Content |
|---|---|
| **Physique** (visible, tangible brand attributes) | |
| **Personality** (character if the brand were a person) | |
| **Culture** (values and principles behind the brand) | |
| **Relationship** (how the brand relates to clients) | |
| **Reflection** (how clients see themselves using this brand) | |
| **Self-image** (how clients feel inside when using this brand) | |

---

### 4b. Aaker Brand System (from Module 40)

> **Primary archetype** (Mark & Pearson):
>
> **Secondary archetype** (if present):
>
> **Aaker brand identity** — four dimensions:
> - *Brand as product:*
> - *Brand as organisation:*
> - *Brand as person (personality):*
> - *Brand as symbol:*
>
> **Brand associations** (3–5 key associations the brand should own):
>
> **Brand equity signals** (what clients would lose if this brand disappeared):

---

### 5. Voice & Tone summary (from Module 50)

> **Voice statement (one paragraph):**
>
> **The three checks every draft must pass:**
> 1.
> 2.
> 3.

---

### 6. Narrative assets (from Module 60)

> **Trueline:**
>
> **Brand story arc (one paragraph, usable as an About page starting point):**

---

### 7. Founder / organisation brand boundary (from Module 70)

> **What the founder brand owns:**
>
> **What the organisation brand owns:**

---

### 8. Tensions resolved (record any module-to-module conflicts and how they were settled)

| Tension | Module A | Module B | Resolution |
|---|---|---|---|
| | | | |

---

### 9. Open questions deferred to next session

<!-- Anything that couldn't be resolved with the current data. -->

---

### 10. Practical next steps

<!-- 3–5 concrete actions the brand can take based on this brandbook. -->

1.
2.
3.

