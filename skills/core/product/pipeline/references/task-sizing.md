# Task Sizing Guidelines

## Size definitions

| Size | Hours  | Description |
|------|--------|-------------|
| XS   | < 2h   | Config change, copy edit, trivial bug fix, single CSS tweak |
| S    | 2–4h   | Simple CRUD endpoint, single UI component, unit tests for one module |
| M    | 1 day  | Feature slice with DB + API + UI wired together, integration test suite |
| L    | 2 days | Complex feature requiring design decisions, multi-service coordination, or significant research |

If a task is estimated **> L**, break it down further. No task should be larger than L.

---

## Splitting heuristics

A task is too big if:
- It touches more than one layer (e.g., "build the whole reporting feature")
- It has an internal "and" that implies two deliverables
- It cannot be code-reviewed in a single PR

Split strategies:
- **Vertical slice** — one thin path end-to-end (happy path only), then edge cases as follow-up tasks
- **Horizontal slice** — DB schema first, then API, then UI (only use when each layer has a different owner)
- **Spike first** — if there's uncertainty, create a T-XX-00 research spike (always XS or S) before the implementation task

---

## Blocker notation

Use the `Blocked By` column to record task IDs, not descriptions.

Example:
| T-FE-03 | Build report download button | S | T-BE-02, T-D-01 |

This means T-FE-03 cannot start until T-BE-02 (the API) and T-D-01 (the design mockup) are done.

---

## QA tasks — always include these two

1. **Write test plan** — Before any QA execution, the test plan must exist. Size: S.
2. **E2E regression pass** — After all implementation tasks complete. Size: M (minimum).

Optional additions:
- Performance test (if NF requirements specify thresholds)
- Accessibility audit (if product targets a11y compliance)
- Security review (if feature touches auth, payments, or PII)