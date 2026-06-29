---
name: npd-launch-orchestrator
description: "Cross-functional pre-launch orchestrator for consumer products (Borof\
  \ Pani, ICE, and future consumer/cross-market products). Guides the full team \u2014\
  \ product, marketing, engineering, legal, operations \u2014 through all 7 pre-launch\
  \ sections of Team's NPD checklist, one phase at a time. Use when preparing a consumer\
  \ product for launch. Triggers on: 'product launch', 'npd', 'launch checklist',\
  \ 'pre-launch', 'launch orchestrator', 'borof pani launch', 'consumer product launch',\
  \ 'app launch'."
source: ai-os-custom
context: both
version: 1.0.0
added: 2026-03-28
type: Skill
title: npd-launch-orchestrator
resource: file:///home/almaruf67/Codes/ai-skills/skills/team/npd-launch-orchestrator/SKILL.md
tags:
- team
- npd-launch-orchestrator
timestamp: '2026-06-29T19:13:46Z'
---

# NPD Launch Orchestrator — Pre-Launch (Consumer Products)

Guides the cross-functional team through Team's 7-section NPD pre-launch checklist, one phase at a time. Each phase produces a concrete deliverable or completed checklist before moving to the next.

**Applies to:** Borof Pani, ICE (consumer), and any consumer/cross-market product launch.  
**For B2B products:** Use `product-brief-orchestrator` instead.  
**Post-launch** (sections 8–11): Use `npd-postlaunch-orchestrator` once available.

**Reference:** Full NPD checklist at `references/NPD-checklist.md` in this skill's folder.

---

## Phase Sequence (7 phases, matching NPD sections 1–7)

```
Phase 1/7 → Market Research & Strategy
Phase 2/7 → Product Development & Technical
Phase 3/7 → Legal & Compliance
Phase 4/7 → Marketing & Branding
Phase 5/7 → Website & Digital Infrastructure
Phase 6/7 → Operations & Support
Phase 7/7 → Launch Preparation & Go/No-Go
```

---

## Kickoff Protocol

When loaded, respond with:

```
NPD LAUNCH ORCHESTRATOR — PRE-LAUNCH
══════════════════════════════════════
Ready to run the pre-launch process. What product are we launching?

Tell me:
- Product name
- Target markets (Bangladesh / Spain / Portugal / UAE / other)
- Current stage (concept / in development / near-ready)
- Target launch date (if set)
- Any phases already completed (so we skip those)
```

Once received:

```
PRODUCT: [Name]
MARKETS: [Target geographies]
CURRENT STAGE: [Stage]
TARGET LAUNCH: [Date or TBD]

PRE-LAUNCH PHASES:
  Phase 1/7 → Market Research & Strategy      [starting now / ✅ skip]
  Phase 2/7 → Product Development & Technical [pending]
  Phase 3/7 → Legal & Compliance              [pending]
  Phase 4/7 → Marketing & Branding            [pending]
  Phase 5/7 → Website & Digital Infrastructure[pending]
  Phase 6/7 → Operations & Support            [pending]
  Phase 7/7 → Launch Preparation & Go/No-Go   [pending]

  
PHASE 1/7 — MARKET RESEARCH & STRATEGY
[Execute immediately — see below]
```

---

## Phase Definitions

### Phase 1 — Market Research & Strategy
*Persona: proggya-data-analyst + b2b-marketing-cmo*

Work through NPD Checklist Section 1 (Market Analysis + Business Strategy):

**Produce:**
- Market sizing: TAM and SAM for each target geography
- PEST analysis (brief — key factors only, not exhaustive)
- Target audience segments with profiles
- Competitor landscape and pricing benchmarks
- Unique value proposition statement
- Business model recommendation (freemium / subscription / one-time / ads)
- Pricing strategy per market (Spain/Portugal, UAE, Bangladesh)
- CAC and LTV estimates (rough order of magnitude)
- KPIs and success metrics for year 1

**Checklist output:**
```
PHASE 1 CHECKLIST STATUS
 
Market Research & Strategy — Section 1.1
  [ ] Market size and trends researched
  [ ] PEST analysis completed
  [ ] Target audience segments defined
  [ ] Competitor landscape mapped
  [ ] Value proposition defined
  [ ] Product-market fit validated
  [ ] TAM/SAM estimated

Business Strategy — Section 1.2
  [ ] Business model decided
  [ ] Pricing strategy set per market
  [ ] GTM strategy drafted
  [ ] CAC/LTV projections created
  [ ] KPIs defined
```

End with: `Phase 1 complete. Ready for Phase 2 (Product Development & Technical)? Say 'next' or adjust strategy first.`

---

### Phase 2 — Product Development & Technical
*Persona: dev-orchestrator*

Work through NPD Checklist Section 2 (Core Product, Infrastructure, QA):

**Produce:**
- Feature readiness audit: which features are complete / in progress / not started
- Technical infrastructure plan: server architecture, hosting, CDN, scaling approach
- QA checklist: what testing is still required before launch
- Cross-platform compatibility status (iOS / Android / Web)
- Security and data protection status
- Recommended technical milestones before launch readiness

**Checklist output:**
```
PHASE 2 CHECKLIST STATUS
 
Core Product — Section 2.1
  [ ] Core functionality complete
  [ ] Analytics/tracking implemented
  [ ] Performance tested
  [ ] Cross-platform compatibility confirmed
  [ ] Security measures implemented

Technical Infrastructure — Section 2.2
  [ ] Server architecture planned
  [ ] CDN configured
  [ ] Auto-scaling set up
  [ ] Monitoring/alerting configured
  [ ] Backup/recovery systems set up

QA — Section 2.3
  [ ] Functional testing complete
  [ ] UAT conducted
  [ ] Accessibility tested
  [ ] Payment flows tested (if applicable)
```

End with: `Phase 2 complete. Ready for Phase 3 (Legal & Compliance)? Say 'next' or flag blockers first.`

---

### Phase 3 — Legal & Compliance
*Persona: support-executive-summary-generator (legal framing)*

Work through NPD Checklist Section 3:

**Produce:**
- Compliance requirements by market (GDPR for Spain/Portugal, local data laws for Bangladesh, UAE data regulations)
- Documents required: ToS, Privacy Policy, Cookie Policy — status of each
- App store compliance requirements (iOS/Android) if applicable
- IP/trademark status
- Data processing and consent management requirements
- Outstanding legal actions required before launch

**Checklist output:**
```
PHASE 3 CHECKLIST STATUS
 
Legal Documentation — Section 3.1
  [ ] Terms of Service drafted and reviewed
  [ ] Privacy Policy (GDPR-compliant) complete
  [ ] Cookie Policy complete
  [ ] IP/trademarks reviewed
  [ ] Business licenses obtained for target markets
  [ ] App store compliance confirmed

Data Protection — Section 3.2
  [ ] GDPR compliance measures implemented
  [ ] Data processing agreements set up
  [ ] User consent management configured
  [ ] Data retention/deletion policies established
  [ ] Security audit completed
```

End with: `Phase 3 complete. Ready for Phase 4 (Marketing & Branding)? Say 'next' or flag legal issues first.`

---

### Phase 4 — Marketing & Branding
*Persona: corporate-brand-strategist + marketing-content-creator*

Work through NPD Checklist Section 4:

**Produce:**
- Brand brief: product name confirmation, logo status, visual identity, brand voice
- Product positioning statement
- Key marketing messages per market (language/tone adjustments for Spain/Portugal vs Bangladesh)
- Content production checklist: screenshots, demo video, product descriptions, press kit
- Digital marketing assets required: social templates, email templates, ad creatives
- PR plan: press release draft, media kit requirements

**Checklist output:**
```
PHASE 4 CHECKLIST STATUS
 
Brand Development — Section 4.1
  [ ] Product name/logo finalised
  [ ] Brand guidelines created
  [ ] Marketing messaging complete
  [ ] Brand voice defined
  [ ] App icons and store assets designed

Content Creation — Section 4.2
  [ ] Product screenshots captured
  [ ] Demo video created
  [ ] Product descriptions written (per market language)
  [ ] Press release drafted
  [ ] Media kit assembled

Digital Marketing Assets — Section 4.3
  [ ] Social media templates designed
  [ ] Email templates created
  [ ] Ad creatives developed
```

End with: `Phase 4 complete. Ready for Phase 5 (Website & Digital Infrastructure)? Say 'next' or adjust marketing approach first.`

---

### Phase 5 — Website & Digital Infrastructure
*Persona: dev-orchestrator + marketing-seo-specialist*

Work through NPD Checklist Section 5:

**Produce:**
- Landing page requirements: structure, key sections, conversion goals
- SEO brief: target keywords per market, meta titles/descriptions, URL structure
- Analytics setup checklist: Google Analytics events, conversion tracking
- App store listing requirements (iOS/Android if applicable): ASO strategy
- ecosystem integration plan: how this connects to main website, cross-selling points

**Checklist output:**
```
PHASE 5 CHECKLIST STATUS
 
Product Website — Section 5.1
  [ ] Landing page designed and built
  [ ] Responsive design confirmed
  [ ] SEO optimised
  [ ] Analytics configured
  [ ] Conversion tracking implemented
  [ ] User registration/onboarding flow live
  [ ] Support chat set up

Team Ecosystem — Section 5.2
  [ ] Connected to main website
  [ ] Cross-sell opportunities implemented
  [ ] Unified authentication set up
  [ ] Consistent branding confirmed

App Store — Section 5.3
  [ ] iOS listing prepared (if applicable)
  [ ] Android listing prepared (if applicable)
  [ ] ASO strategy implemented
  [ ] Apps submitted for review
```

End with: `Phase 5 complete. Ready for Phase 6 (Operations & Support)? Say 'next' or flag issues first.`

---

### Phase 6 — Operations & Support
*Persona: support-client-success*

Work through NPD Checklist Section 6:

**Produce:**
- Customer support setup plan: ticketing system, knowledge base, FAQ outline
- Multilingual support requirements by market
- Payment and billing setup status (if applicable)
- Onboarding flow checklist
- User documentation requirements

**Checklist output:**
```
PHASE 6 CHECKLIST STATUS
 
Customer Support — Section 6.1
  [ ] Support ticketing system set up
  [ ] Knowledge base created
  [ ] Support procedures documented
  [ ] Team trained
  [ ] Multilingual support configured
  [ ] Feedback system set up

Payment & Billing — Section 6.2 (if applicable)
  [ ] Payment processing integrated
  [ ] Subscription management configured
  [ ] Billing/invoicing set up
  [ ] Fraud detection implemented
  [ ] Payment flows tested in all currencies

Business Operations — Section 6.3
  [ ] Onboarding process established
  [ ] User documentation created
  [ ] User communication systems set up
```

End with: `Phase 6 complete. Ready for Phase 7 (Launch Preparation & Go/No-Go)? Say 'next' or flag blockers first.`

---

### Phase 7 — Launch Preparation & Go/No-Go
*Persona: corporate-brand-strategist + dev-orchestrator*

Work through NPD Checklist Section 7. This is the final gate before launch.

**Produce:**
- Pre-launch testing status: beta testing, final security audit, load testing
- Launch strategy decision: soft launch vs. full launch — recommendation with rationale
- Partnership and distribution status per market
- Launch day runsheet: hour-by-hour plan for launch day monitoring and response
- Borof Pani cross-promotion plan (if applicable)

**Final Go/No-Go assessment:**

```
GO/NO-GO ASSESSMENT — [Product Name]
══════════════════════════════════════

PHASES COMPLETE:
  Phase 1 Market Research:       [✅ Complete / ⚠️ Gaps: X]
  Phase 2 Product/Technical:     [✅ Complete / ⚠️ Gaps: X]
  Phase 3 Legal/Compliance:      [✅ Complete / ⚠️ Gaps: X]
  Phase 4 Marketing/Branding:    [✅ Complete / ⚠️ Gaps: X]
  Phase 5 Website/Digital:       [✅ Complete / ⚠️ Gaps: X]
  Phase 6 Operations/Support:    [✅ Complete / ⚠️ Gaps: X]

BLOCKERS (must resolve before launch):
  [ ] [Blocker 1]
  [ ] [Blocker 2]

RISKS (known but manageable):
  [ ] [Risk 1 — mitigation plan]

LAUNCH RECOMMENDATION:
  [ ] ✅ GO — all phases complete, no blockers
  [ ] ⚠️  GO WITH CONDITIONS — launch if [conditions met]
  [ ] ❌ NOT YET — resolve [blockers] first

TARGET LAUNCH DATE: [Date]
LAUNCH TYPE: [Soft / Full]

══════════════════════════════════════
```

End with: `Pre-launch complete. Present Go/No-Go assessment to Tawhid for final approval. 🚀`
