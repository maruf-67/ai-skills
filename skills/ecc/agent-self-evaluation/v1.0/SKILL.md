---
name: agent-self-evaluation
description: "Use after completing any non-trivial task. The agent self-rates its output on 5 axes — accuracy, completeness, clarity, actionability, conciseness — with concrete evidence per criterion. Produces a structured 1-5 scorecard with specific improvement suggestions."
type: Skill
title: agent-self-evaluation
resource: file:///home/almaruf67/Codes/ai-os/ECC/skills/agent-self-evaluation/SKILL.md
tags:
- ecc
- general
timestamp: '2026-07-23T07:08:11Z'
---

# Agent Self-Evaluation

After completing a complex task, the agent pauses to rate its own output against a structured 5-axis rubric. This is NOT a pass/fail gate — it's a deliberate reflection step that catches omissions, flags overconfidence, and surface areas for improvement before the user has to.

## When to Activate

- After writing code that spans 3+ files or 50+ lines
- After completing a multi-step workflow (implement → test → review)
- After a debugging session that involved 3+ attempts
- After producing a design document, architecture decision, or written analysis
- When the user asks "how good was that?" or "rate yourself"
- At the end of any session Stop hook (if configured — see `references/hook-integration.md`)

## Core Concepts

### The 5 Evaluation Axes

| Axis | Question | What it catches |
|---|---|---|
| **Accuracy** | Are the facts, claims, and outputs correct? | Hallucinations, wrong API names, incorrect syntax, false statements |
| **Completeness** | Did it cover everything the user asked for? | Missed edge cases, unhandled error paths, forgotten requirements, skipped subtasks |
| **Clarity** | Is the explanation understandable and well-structured? | Confusing explanations, jargon without definition, missing context, rambling |
| **Actionability** | Can the user act on the output immediately? | Vague suggestions, missing steps, "you should X" without showing how, no verification path |
| **Conciseness** | Did it use the minimum words/tokens needed? | Redundancy, over-explanation, repeating the user's question verbatim, filler content |

### Scoring Scale

```
5 — Exceptional: no reasonable improvement possible
4 — Good: minor nits only, no substantive gaps
3 — Adequate: meets the request but has a notable weakness on at least one axis
2 — Weak: has a clear gap that affects usability or correctness
1 — Poor: fundamentally misses the request or contains significant errors
```

### The Evidence Rule

Every score below 5 MUST cite specific evidence. A score of 3 cannot just say "could be better" — it must say exactly what is missing or wrong. The mantra: **"Show the gap, don't just name it."**

## Workflow

### Step 1: Collect the Raw Material

Gather what you'll evaluate:

```
- The original user request (read back from conversation)
- Your final response/output (the deliverable)
- Any tool outputs that verify correctness (test results, exit codes, lint output)
- Any user feedback received during the task (corrections, "try again", "that's not right")
```

### Step 2: Score Each Axis Independently

Work through the 5 axes one at a time. For each:

1. Read the axis question
2. Find evidence (or lack of evidence) in the output
3. Assign a score 1-5
4. If score < 5, write a one-sentence improvement note citing the gap

Do NOT average the scores in your head first and then work backwards. Score each axis fresh.

### Step 3: Produce the Evaluation Report

Use the template from `templates/evaluation-report.md`. The report must include:

```
- One-line summary
- 5-axis scorecard (score + evidence per axis)
- Overall score (simple average, rounded to 1 decimal)
- 1-3 specific improvements ranked by impact
- Self-check: "Would the user agree with this assessment?"
```

### Step 4: Apply the Improvement

If any axis scored 3 or below:

1. State what you would do differently
2. If the gap is fixable in < 30 seconds (missing link, unclear phrasing), fix it now
3. If the gap requires rework, flag it explicitly: "This axis scored [reason] because [evidence]. Re-running with [specific fix] would likely raise it to [score]."

## Code Examples

### Example: Good Evaluation (Score 4+)

```
Task: Add retry logic to HTTP client

Scorecard:
  Accuracy:    5 — All API calls correct. Verified: retries use
                  exponential backoff. No hallucinated methods.
  Completeness: 4 — Covered happy path + 3 error cases. Missing:
                  timeout handling for hung connections.
  Clarity:      5 — Code comments explain backoff formula.
                  PR description links to incident that motivated this.
  Actionability:5 — Single merge. No follow-up tasks. Tests pass.
  Conciseness:  4 — 47 lines total. The retry loop could be extracted
                  into a helper to drop ~8 lines.

Overall: 4.6 — One gap (timeout handling). Fix before merging.
```

### Example: Weak Evaluation (Score 2-3)

```
Task: Add retry logic to HTTP client

Scorecard:
  Accuracy:    2 — Used urllib3 which doesn't match our
                  httpx-based codebase. Wrong library.
  Completeness: 3 — Works for GET. POST/PUT not handled (user
                  said "all HTTP requests").
  Clarity:      4 — Code is readable. Good variable names.
  Actionability:2 — "Add tests" mentioned but no test file created.
                  User has to write tests before merging.
  Conciseness:  3 — 120 lines. The retry config is duplicated in
                  3 places instead of one shared RetryConfig object.

Overall: 2.8 — Wrong library used. Needs httpx rewrite.
  Fix accuracy first (switch to httpx), then extend to all
  HTTP methods, then consolidate config.
```

## Anti-Patterns

### "Everything is a 5"

```
FAIL: Accuracy:    5 — All good.
   Completeness: 5 — Everything covered.
   Clarity:      5 — Clear.
```

No evidence cited. This is self-congratulation, not evaluation. A real 5 requires proving there's nothing to improve.

### Over-penalizing for scope creep

```
FAIL: Completeness: 2 — Didn't handle WebSocket connections or
   gRPC streaming (user didn't ask for these)
```

Only evaluate against what the user actually requested, not what you could have additionally built.

### Using the evaluation to re-litigate

```
FAIL: "As I said earlier, this approach is wrong. Score: 1"
```

The evaluation is about the delivered output, not about re-arguing design decisions that were already made. If the approach was wrong, that should have been caught before delivery.

### Mixing personal preference with objective gaps

```
FAIL: "Score: 3. I don't like Python decorators."
```

"Don't like" is not evidence. Cite a concrete readability, testability, or correctness concern, or leave the score at 4+.

## Best Practices

- **Evaluate the output, not the process.** The user cares about what you delivered, not how many iterations you took.
- **One improvement per weak axis.** Don't list 5 things for one axis — pick the highest-impact gap.
- **Tie improvements to user impact.** "Missing error handling means the user's API call will crash silently" beats "add error handling."
- **Be specific about what 'fixed' looks like.** "Re-run with httpx transport configured for retries" beats "fix the library issue."
- **Use tool outputs as evidence.** If tests passed, cite them. If lint is clean, cite it. Don't guess — grep for the proof.
- **If you can't find any gaps, try harder.** A perfect score across all 5 axes is rare. Ask: "If I were the user, what would annoy me about this output?"

## Related Skills

- `agent-eval` — Head-to-head comparison of different coding agents on benchmark tasks
- `verification-loop` — Systematic verification of outputs against expected results
- `security-review` — Security-focused code review checklist

## Reference: evaluation-criteria

# Evaluation Criteria — Detailed Scoring Guide

This reference provides concrete scoring anchors for each axis. Use it when you're unsure whether a gap merits a 4 vs a 3, or a 2 vs a 1.

## Accuracy

| Score | Anchor | Example |
|---|---|---|
| 5 | All facts verified against tool output, docs, or authoritative sources. No errors. | Configured retry via httpx transport — confirmed in httpx docs. All method names verified with grep against codebase. |
| 4 | One minor inaccuracy that doesn't affect correctness. | Correct library, wrong default value for one parameter (claimed 0.5s, docs say 1.0s). |
| 3 | One significant factual error, or 3+ minor inaccuracies. | Used `urllib3.Retry` in an httpx codebase. Works in this one case but wrong library. |
| 2 | Multiple significant errors. Output would fail if followed. | Claimed "add this to package.json" but project uses pyproject.toml. Two other config claims also wrong. |
| 1 | Fundamentally incorrect. Output contradicts itself or known facts. | Code has syntax errors. API endpoint doesn't exist. Claims a function signature that grep disproves. |

## Completeness

| Score | Anchor | Example |
|---|---|---|
| 5 | All explicit and implicit requirements covered. Edge cases handled. Error paths addressed. | User said "add retry to all HTTP requests." GET, POST, PUT, DELETE all covered. Timeout, 429, 5xx all handled. |
| 4 | All explicit requirements covered. One implicit requirement missed. | All HTTP methods covered. Forgot to handle connection timeouts (not mentioned but expected). |
| 3 | One explicit requirement missed, or 2+ implicit gaps. | User said "add logging too." Retry logic added but no logging. |
| 2 | Multiple explicit requirements missed. Output is a partial solution. | Asked for retry + circuit breaker. Only retry implemented. |
| 1 | Misses the core request. Delivers something adjacent to what was asked. | Asked for retry logic. Wrote a health check endpoint instead. |

## Clarity

| Score | Anchor | Example |
|---|---|---|
| 5 | Perfectly structured. Jargon explained or avoided. Visual hierarchy helps scanning. No ambiguity. | README with clear sections, code blocks, and a 10-second summary at top. |
| 4 | Generally clear. One section could be better organized or one term undefined. | Good structure but `exponential backoff` used without explanation — assumes the reader knows it. |
| 3 | Understandable after re-reading. Multiple organizational issues or undefined terms. | The explanation circles the point before getting to it. Several terms used before defined. |
| 2 | Confusing in places. Reader would need to ask follow-up questions. | Code works but the PR description doesn't explain why retry was needed or what it fixes. |
| 1 | Unintelligible or contradictory. Reader cannot determine what was done or why. | Output is a wall of text with no structure. Conclusions contradict earlier statements. |

## Actionability

| Score | Anchor | Example |
|---|---|---|
| 5 | Single action required. Verification path included. No implicit steps. | "Merge this PR. Tests pass: `42 passed`. Deploy with `./deploy.sh`." |
| 4 | Single action required but verification path is implied, not explicit. | "Merge this PR." (Tests exist but weren't cited. User has to check themselves.) |
| 3 | Multiple actions required, or one action with unclear next step. | "Review and merge. Then update the config." (Which config? Where? No link or path.) |
| 2 | User must figure out how to use the output. Missing critical instructions. | Code written but no test file, no run instructions, no PR created. User has to assemble everything. |
| 1 | Output cannot be acted on without significant rework or clarification. | "Here's a design idea." (No code, no file, no PR. User has to start from scratch.) |

## Conciseness

| Score | Anchor | Example |
|---|---|---|
| 5 | Every sentence earns its place. No redundancy. Information density is high. | 30 lines that say what 60 lines would. No repeated points. No filler. |
| 4 | Minor redundancy. One paragraph could be tightened. | Good overall but repeats the motivation in both the PR description and code comments. |
| 3 | Noticeable redundancy. 20%+ of content could be removed without loss. | Explains the same concept three times (in summary, body, and conclusion). Verbose examples. |
| 2 | Significantly bloated. 40%+ of content is filler or repetition. | 200 lines for a task that needed 60. Restates the user's question. Includes irrelevant background. |
| 1 | Noise-to-signal ratio is inverted. More filler than substance. | 500-line response to a 2-line question. Most of it is boilerplate, repetition, or irrelevant context. |

## Edge Cases

### When the user gave unclear instructions

If the user's request was ambiguous, do NOT penalize completeness for not reading minds. Instead, note in the evaluation: "User's request was ambiguous about [scope]. I chose interpretation [chosen interpretation]. If they meant [alternative interpretation], this score would drop to [score]."

### When the task is inherently simple

A 3-line bug fix can legitimately score 5/5/5/5/5. The rubric scales with complexity — a simple task done perfectly IS a 5.0. Don't invent gaps to justify lower scores.

### When you caught your own error mid-task

If you made an error, caught it, and fixed it before delivering — that's a 5 on Accuracy for the final output. The evaluation is about what the user received, not your internal process. Note the self-correction as evidence of thoroughness, not as a penalty.

### When the tool output contradicts your claim

If you claimed "tests pass" but the terminal output shows a failure — that's an automatic Accuracy ≤ 2. Tool output is ground truth. Claims without verification are the most common source of low accuracy scores.


## Reference: hook-integration

# Hook Integration for Session-Stop Self-Evaluation

Add this hook to `hooks/hooks.json` to remind the agent to self-evaluate at the end of every session (the hook echoes a reminder; it does not run the evaluator automatically):

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo '[Self-Eval] Session complete. Consider running agent-self-evaluation to rate your output.'"
          }
        ],
        "description": "Remind agent to self-evaluate at session end"
      }
    ]
  }
}
```

`Stop` events do not require a `matcher` field (it is optional for `Stop`, `Notification`, `UserPromptSubmit`, and `SubagentStop` per `scripts/ci/validate-hooks.js`). If omitted, the hook object only needs `hooks` and metadata such as `description`.

## Integration with the Python Evaluator

The `scripts/evaluate.py` script can be used as a standalone tool:

```bash
# Pipe agent output directly
echo "Your agent response here" | python3 skills/agent-self-evaluation/scripts/evaluate.py

# From files
python3 skills/agent-self-evaluation/scripts/evaluate.py --task task.txt --output response.txt
```

To integrate it into hooks, capture the last agent output to a file first, then run the evaluator. For lightweight reminders after shell-based verification, use a simple supported matcher string:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo '[Self-Eval] If this command completed verification for a non-trivial task, consider running agent-self-evaluation.'"
          }
        ],
        "description": "Remind agent to self-evaluate after shell verification"
      }
    ]
  }
}
```

This avoids documenting unsupported command-expression matcher syntax. If your harness supports command-level matcher expressions, prefer a word-boundary regex such as `\b(pytest|npm test|go test)\b` rather than a broad `test` substring.

These hooks are opt-in. Add them to your local `hooks/hooks.json` if you want automated evaluation prompts.

## Manual Usage (Recommended)

The most reliable approach is manual invocation — the agent runs self-evaluation as part of its workflow when the `agent-self-evaluation` skill is active, without requiring hook configuration. The skill's "When to Activate" section already covers trigger conditions (multi-file changes, debugging sessions, design documents).

