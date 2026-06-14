Here are example prompts that trigger each stage — from a single stage to the full chain:

---

## Full Pipeline

```
I have a white-paper on an AI-powered inventory management system.
Run the full pipeline — BRD through Tasks.

[paste white-paper or upload file]
```

```
Here's our codebase analysis report from the legacy billing system.
Generate the full product pipeline so we can plan the rewrite.
```

---

## Stage 1 — White-paper / Codebase → BRD

```
Convert this research paper into a BRD. Stakeholders are the CTO and Head of Product.
```

```
We analysed our existing Express.js monolith. Here's the report.
Write a BRD for migrating it to a microservices architecture.
```

---

## Stage 2 — BRD → PRD

```
Here's our approved BRD. Generate a PRD with user personas and user stories.
Target users are B2B SaaS ops managers.
```

---

## Stage 3 — PRD → Features

```
I have a PRD for a real-time collaboration tool.
Give me the full feature catalogue grouped by epic, with P0/P1/P2 priorities.
```

---

## Stage 4 — Features → PRPs

```
Take F-03 (Live Cursor Sync) from the feature catalogue and write a full PRP —
including user flow, API contract, and edge cases.
```

```
Generate PRPs for all P0 features only.
```

---

## Stage 5 — PRPs → Tasks

```
Break PRP-02 into engineering tasks.
We have separate frontend and backend teams. Max task size is M.
```

```
Take all PRPs and generate a full sprint-ready task board.
Flag all cross-team blockers.
```

---

## Mid-chain Entry

```
Skip BRD and PRD — I already have a feature list.
Go straight to PRPs and then Tasks.
```

```
I have an existing PRD from Notion. Analyse it, identify gaps vs the BRD objectives below,
then continue to Features → PRPs → Tasks.
```

---

The skill triggers on any of these. The entry point is auto-detected from context — it figures out what you have and what you need, then picks up from there.