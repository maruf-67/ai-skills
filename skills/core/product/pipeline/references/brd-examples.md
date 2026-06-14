# BRD Examples & Annotations

## What makes a strong BRD Business Objective?

❌ Weak: "Improve the platform."
✅ Strong: "Reduce customer churn by 15% within 2 quarters by introducing proactive usage analytics."

A strong objective is:
- Measurable (has a metric)
- Time-bound (has a timeline)
- Attributed to a stakeholder pain point

---

## What belongs in Scope vs Out of Scope?

**In Scope** — things the project team is responsible for delivering.
**Out of Scope** — things that are adjacent, assumed, or deferred.

Example (SaaS analytics dashboard):
- In Scope: Real-time data ingestion, chart rendering, user access controls
- Out of Scope: Mobile app version (deferred to v2), ETL pipeline changes (owned by data team)

---

## Risk table: how to fill it in

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Third-party API rate limits block real-time sync | Medium | High | Implement local cache + retry queue |
| Stakeholder sign-off delayed | Low | Medium | Weekly async approval process |

---

## Priority notation for BR-XX requirements

- **Must** — non-negotiable for launch
- **Should** — strongly desired, fallback plan exists
- **Could** — nice to have, cut if timeline slips
- **Won't** — explicitly deferred to future release (write it down so it's not forgotten)