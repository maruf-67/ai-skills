---
name: brand-voice-judge
description: "Brand voice and AI pattern compliance judge for content. Use when: (1) Checking if content passes brand voice guidelines, (2) Auditing content for AI structural patterns, (3) Spot-checking ABM variants, social reposts, or sales enablement content, (4) Running QC on batch AI-generated content, (5) Scoring content against the Do/Avoid matrix before publication. Triggers on: 'check brand voice', 'voice audit', 'is this on brand', 'brand compliance', 'QC this content', 'Tier 3 check', 'voice drift', 'AI pattern check'."
source: ai-os-custom
context: both
version: 2.0.0
added: 2026-05-11
updated: 2026-05-24
---

# Brand Voice Judge

Evaluates content against two lenses: (1) brand voice governance and (2) AI writing pattern detection. Returns a structured verdict with actionable fixes. Designed for high-volume automated QC of Tier 3 content and spot-check support for Tier 2.

This skill does NOT produce content. It judges content produced by other skills or humans.

---

## Input

The skill accepts:

```
CONTENT TO JUDGE:
[paste content here]

CONTENT TYPE: [ABM micro-content | LinkedIn post | email variant | social repost | sales enablement | blog draft | newsletter section | other]

TIER: [1 | 2 | 3]
```

If content type or tier is not provided, infer from the content length and style. Default to Tier 3 for short-form variants.

**Edge case — empty or missing content:** If the input is empty, blank, or contains no evaluable content, do NOT fabricate an analysis. Instead, respond with a pass verdict and empty findings:

```json
{
  "verdict": "pass",
  "banned_words": [],
  "voice_drift_score": 0.0,
  "tone_scores": { "voice": "pass", "language": "pass", "proof": "pass", "posture": "pass", "cta_style": "pass" },
  "ai_pattern_scores": { "perplexity": "pass", "burstiness": "pass", "discourse_coherence": "pass", "structural_signatures": "pass", "model_tells": "pass" },
  "product_narrative_aligned": true,
  "suggested_fix": "",
  "summary": "No content provided to evaluate."
}
```

Alternatively, you may ask the user to provide content. Both responses are acceptable for empty input.

---

## Output Format

Return a structured assessment in exactly this shape:

```json
{
  "verdict": "pass | warn | fail",
  "banned_words": [],
  "voice_drift_score": 0.0,
  "tone_scores": {
    "voice": "pass | warn | fail",
    "language": "pass | warn | fail",
    "proof": "pass | warn | fail",
    "posture": "pass | warn | fail",
    "cta_style": "pass | warn | fail"
  },
  "ai_pattern_scores": {
    "perplexity": "pass | warn | fail",
    "burstiness": "pass | warn | fail",
    "discourse_coherence": "pass | warn | fail",
    "structural_signatures": "pass | warn | fail",
    "model_tells": "pass | warn | fail"
  },
  "product_narrative_aligned": true,
  "suggested_fix": "",
  "summary": ""
}
```

**Verdict logic:**
- **pass** — zero primary banned words, voice_drift_score < 0.3, all tone_scores pass, no ai_pattern_scores at fail
- **warn** — voice_drift_score 0.3–0.6, OR secondary banned words without contextual justification, OR one tone dimension at warn, OR one ai_pattern dimension at warn, OR minor product narrative drift
- **fail** — any PRIMARY banned word present, OR voice_drift_score > 0.6, OR any tone dimension fails, OR two or more ai_pattern dimensions fail, OR product described in technical terms contradicting outcome-focused positioning

**Critical distinction on banned words:**
- PRIMARY banned words (hard ban list) → automatic **fail**
- SECONDARY banned words (soft ban list) → check whether context/evidence justifies usage. If unjustified → **warn**. If multiple secondary words appear with no justification → **warn** (not fail, unless other dimensions also fail)

---

## The Brand Voice Card

### Do/Avoid Matrix

Every piece of content is scored against five dimensions. Each dimension is pass/warn/fail.

| Dimension | DO (pass) | AVOID (fail) |
|---|---|---|
| **Voice** | Authoritative, measured, evidence-led | Eager, salesy, breathlessly enthusiastic |
| **Language** | Specific outcomes, named methodologies, client-impact framing | Buzzwords, vague claims, feature-list language |
| **Proof** | Data points, named clients (with permission), evidence chains | Superlatives without evidence, feature lists, vanity metrics |
| **Posture** | "Through our work in emerging markets, we have observed..." | "We are the best / leading / only provider of..." |
| **CTA Style** | Invitation: "If this resonates, let's explore together." | Pressure: "Don't miss out / Limited time / Act now" |

### Banned Word List

Any PRIMARY banned word triggers an automatic **fail** verdict.

**Primary banned words (hard ban — never use):**
disruptive · revolutionary · seamless · cutting-edge · next-gen · next-generation · game-changing · game-changer · world-class · best-in-class · "the best" · "the leading" · "the only" · "number one" · "#1" · "don't miss out" · "limited time" · "act now" · "hurry"

**Secondary banned phrases (soft ban — warn if used without evidence/context):**
industry-leading · state-of-the-art · innovative (unless describing a specific, named innovation) · transformative (unless tied to a measurable outcome) · comprehensive solution · one-stop shop · turnkey · scalable (when used as a vague value prop; acceptable in technical context) · synergy / synergistic · leverage (as a verb meaning "use") · empower / empowering · "excited to announce" · "thrilled to share" · "proud to"

---

## AI Writing Pattern Detection

Consult `references/writing-standards/ai-writing-patterns.md` (shared resource at repo root) for the full detection avoidance reference. The following is the evaluation criteria for this skill.

### AI Pattern Dimensions

Score each of these five dimensions as pass/warn/fail:

**Perplexity (word-level predictability):**
- pass: vocabulary feels earned, varied, occasionally imprecise
- warn: some AI-optimised vocabulary present ("utilize," "comprehensive," "facilitate") but not dominant
- fail: vocabulary reads like a thesaurus output — consistently "best" word for each slot, AI-standard transitions ("Moreover," "Furthermore," "Additionally")

**Burstiness (sentence-level variation):**
- pass: sentence lengths vary irregularly, no discernible pattern to the variation
- warn: some sentence-length uniformity or mild parallelism, but not pervasive
- fail: tricolon present (three parallel items with matching structure), OR anaphora (repeated opening phrase across consecutive sentences), OR three or more consecutive sentences of similar length

**Discourse coherence (paragraph-level patterns):**
- pass: paragraph lengths vary, transitions are sometimes abrupt, argument is not strictly sequential
- warn: paragraphs are somewhat uniform in length, or transitions are mostly formulaic
- fail: all paragraphs are 3-5 sentences, every paragraph opens with a transition word, argument builds in neat sequential steps with no digression

**Structural signatures (document-level patterns):**
- pass: no preview-deliver-summarise structure, sections vary in length, ending is not a neat summary
- warn: mild template-like structure but not pervasive
- fail: "In this piece, we will discuss..." opening, neat summary conclusion, symmetrical sections, bolded-keyword bullet lists throughout

**Model tells (specific AI fingerprints):**
- pass: no recognisable model-specific patterns
- warn: occasional em dash overuse or mild hedging patterns
- fail: em dashes in >15% of sentences, compulsive balance on every assertion, forbidden opening/closing/transition patterns present

---

## Voice Dimension Scoring (Updated)

**Voice dimension signals:**
- pass: measured tone, lets evidence speak, acknowledges complexity
- warn: slightly overselling but not aggressive, OR mildly self-congratulatory without being breathless (e.g., "proud to share" in passing, not as a centrepiece)
- fail: breathless enthusiasm as the dominant tone, multiple self-congratulatory phrases, persistent "we're so excited/thrilled/proud" framing

**Language dimension signals:**
- pass: names specific outcomes, methodologies, or client situations
- warn: slightly vague but not buzzword-heavy
- fail: buzzword density > 2 per 100 words, feature-list structure without outcomes

**Proof dimension signals:**
- pass: contains at least one specific data point, named example, or evidence chain
- warn: makes claims but hedges appropriately ("our experience suggests..."), OR uses vague proof phrasing ("many of our clients") without specifics
- fail: superlatives without any evidence, "trusted by hundreds of clients" with no specifics, claims presented as fact with zero backing

**Posture dimension signals:**
- pass: observational, advisory, third-person perspective on market
- warn: first-person but restrained ("we have found that...")
- fail: competitive positioning ("we are the only/best"), pressure language

**CTA dimension signals:**
- pass: invitational ("If this applies to your context, we would welcome a conversation")
- warn: slightly directive but not pressuring ("reach out to learn more")
- fail: urgency/scarcity language ("limited slots", "don't miss out", "act now")

---

## Product-to-Narrative Map Compliance

Content must describe products through the business outcome they deliver, not through technical description.

| Product | Correct Narrative Frame | Wrong Frame |
|---|---|---|
| **Proggya** | BI and analytics that help businesses see what their data is telling them | "AI-powered dashboard platform" |
| **Data Dialogue** | Conversational interface that lets teams ask questions of their own data | "RAG system" or "AI chatbot" |
| **TruMark / Detectron** | Counterfeit detection that protects brand integrity and consumer trust | "Computer vision authentication system" |
| **Inspecto** | Field verification that ensures what is planned is what is happening on the ground | "Image metadata verification tool" |
| **Callibrio** | Grant management that gives research teams control and visibility over every dollar | "Grant tracking software" |
| **Talent Pulse** | CV sorting that surfaces the right candidates without manual screening fatigue | "AI recruitment tool" |
| **TradeEye** | Trade intelligence that connects market signals to distribution decisions | "Trade analytics platform" |

**Rule:** If content describes a product using the "Wrong Frame" language exclusively, it is a warn. If it uses only technical jargon with no outcome framing at all, it is a fail.

---

## Evaluation Process

### Step 1: Banned Word Scan

Scan for every word/phrase in the primary and secondary banned lists. Record all matches.

- Primary match → automatic fail, record word
- Secondary match → check if evidence/context justifies usage. If no justification → warn, record word. Multiple unjustified secondary words → still warn (not fail) unless other dimensions compound

### Step 2: Voice Dimension Scoring

Score each of the five voice dimensions against the Do/Avoid matrix using the scoring signals above. Apply the graduated severity scale — distinguish between mild self-congratulation (warn) and breathless enthusiasm (fail), between vague proof (warn) and fabricated evidence (fail).

### Step 3: AI Pattern Scoring

Score each of the five AI pattern dimensions using the criteria above. Consult the shared `references/writing-standards/ai-writing-patterns.md` for the full forbidden patterns list.

### Step 4: Product Narrative Check

If any product is mentioned, verify it is framed through the outcome lens per the Product-to-Narrative Map. Flag technical-only descriptions.

### Step 5: Voice Drift Score

Calculate voice_drift_score as a float between 0.0 and 1.0:

```
voice_drift_score = weighted average of:
  - banned_word_density (0.0-1.0): primary_count * 0.3 + secondary_unjustified_count * 0.1, capped at 1.0    weight: 0.25
  - voice_dimension_fail_ratio (0.0-1.0): failed_dimensions / 5                                              weight: 0.25
  - voice_dimension_warn_ratio (0.0-1.0): warned_dimensions / 5 * 0.5                                        weight: 0.10
  - ai_pattern_fail_ratio (0.0-1.0): failed_ai_dimensions / 5                                                weight: 0.20
  - product_narrative_drift (0.0 or 0.5 or 1.0)                                                              weight: 0.20
```

### Step 6: Generate Suggested Fix

If verdict is warn or fail, provide a specific, actionable suggested fix. Not vague guidance — an actual rewrite of the offending sentences.

Format:
```
ORIGINAL: "[offending sentence]"
REWRITE: "[corrected version]"
REASON: [which rule it violated]
```

Provide up to 3 rewrites, prioritising the highest-impact fixes.

### Step 7: Assemble Output

Return the structured JSON output with all fields populated.

---

## Batch Mode

When invoked with multiple content pieces (e.g., from an n8n workflow), return an array of verdicts — one per content piece. Include a summary row:

```json
{
  "batch_summary": {
    "total": 10,
    "pass": 7,
    "warn": 2,
    "fail": 1,
    "avg_voice_drift_score": 0.18,
    "most_common_violations": ["buzzword: innovative without evidence", "AI pattern: tricolon structure"]
  },
  "results": [...]
}
```

---

## Integration Points

- **Tier 3 QC workflow**: Called via DeepSeek in the sampling n8n workflow. Samples 20% of the week's Tier 3 output.
- **Manual spot-check**: Content Lead can invoke directly in Claude to audit any piece.
- **Tier 2 pre-flight**: Can be used as a pre-publication check before Content Lead review.
- **Writing skills integration**: Other skills (case-study-writer, b2b-marketing-cmo, etc.) can invoke brand-voice-judge as a self-check before delivering output.

---

## What This Skill Does NOT Do

- Does not produce or rewrite content (only judges and suggests fixes)
- Does not apply personal writing style preferences (that belongs to writing-quality-gate)
- Does not check grammar, spelling, or formatting
- Does not evaluate strategic relevance or content-market fit
- Does not replace human editorial judgment on Tier 1 content
