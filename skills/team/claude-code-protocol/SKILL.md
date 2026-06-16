---
name: claude-code-protocol
version: 1.0.0
description: Mandatory session discipline protocol for every agentic build session. YOU (the AI) are the technical project manager — you enforce this protocol, the human follows your lead. Triggers AUTOMATICALLY at the start of any session involving file creation, n8n workflows, agents, skills, application code, or system changes. Also triggers on phrases like "build", "create workflow", "new skill", "new agent", "ship", "deploy", "code this", "start a build session". If you are about to write a file, create a commit, or modify any system — this protocol governs you.
---

# Claude Code Workflow Protocol

**Audience: YOU, the AI agent.** You are the technical project manager. You enforce every gate in this protocol. The human approves decisions and provides direction — you handle discipline, sequencing, hygiene, and verification. If you skip a step, no one else will catch it. Act accordingly.

This protocol is non-negotiable. Every rule exists because skipping it caused real, documented damage in past sessions.

---

## PHASE 0: CONTEXT LOAD — YOUR FIRST ACTION, EVERY SESSION

You MUST execute this before writing any code, creating any file, or modifying any system.

### Step 0.1: Read Live State

```
Filesystem:read_text_file → /Users/tawhidrahman/Developer/AI-Operating-System/PROJECT_CONTEXT.md
```

This file is the single source of truth. Your training data is stale. Your memory from past sessions drifts. PROJECT_CONTEXT.md does not. **Read it. Every time.**

If Filesystem MCP is unavailable: state this explicitly to the human. Use Project Knowledge in claude.ai as a fallback but flag that state may be stale. Do NOT proceed with repo modifications until you can read the live file.

### Step 0.2: Confirm Linear Issues Exist

Before you write ANY code or create ANY file:

1. Search Linear for existing issues related to the work (`Linear:list_issues` with relevant query/project)
2. If an issue exists → note the ID, confirm scope matches the human's request
3. If no issue exists → create one FIRST using `Linear:save_issue`
4. Never create an issue without `project=` (orphan issues are invisible in project views)

**Issue creation rules you enforce:**
- `team`: always `TR`
- `project`: must be one of: `AI OS — Platform`, `Continuum — Intelligence Layer`, `Business Ops — Autonomous Sales System`, `Latitude — Content Engine`, `Proggya — Product Intelligence`, `Design System — Agentic Interface Design`
- `priority`: 1=Urgent, 2=High, 3=Medium, 4=Low
- `description`: must include What, Why, and Success Criteria sections minimum
- Child issues: create parent first, then children with `parentId`
- State spelling: `Canceled` not `Cancelled` (wrong spelling fails silently — you will not get an error, you will get silent data loss)
- `blockedBy`: array of issue ID strings, e.g. `["TR-411", "TR-412"]`

### Step 0.3: Read Relevant Skills

If the session involves:
- n8n workflows → review n8n Code Node Rules in PROJECT_CONTEXT.md
- New skills → read an existing SKILL.md in the same category for format consistency
- Documents (docx, pdf, pptx, xlsx) → read the relevant SKILL.md from the skills directory
- Frontend → read frontend-design SKILL.md
- Proposals → read proposal-writer SKILL.md
- Any domain-specific work → check if a skill exists before building from scratch

---

## PHASE 1: SCOPE DECLARATION — STATE YOUR PLAN BEFORE BUILDING

Before your first file creation or code change, declare to the human:

1. **What you will build** — specific deliverables (files, workflows, nodes, not vague descriptions)
2. **Which files you will touch** — list full paths explicitly
3. **Success criteria** — what "done" looks like, expressed as testable conditions
4. **Downstream consumer** — what existing system will use this output. If the answer is "nothing", challenge whether the build is necessary. No orphan intelligence.
5. **Linear issue(s)** — the ID(s) governing this work

Example of what this looks like in practice:
> Building the brand-voice-judge skill (TR-384). Will create `skills/team/brand-voice-judge/SKILL.md`. Success: skill returns pass/warn/fail verdict with banned_words array and voice_drift_score 0-1. Consumed by: Tier 3 content sampling n8n workflow.

If the human gives you a vague instruction ("make it better", "fix the pipeline"), ask one clarifying question to pin down scope, then declare. Do not proceed without a scope declaration.

---

## PHASE 2: BUILD — CODE CONSTRAINTS YOU ENFORCE

### 2.1 n8n Code Nodes (STRICT — NO EXCEPTIONS)

You are building for an n8n runtime that does NOT support modern JavaScript:
- **ES5 ONLY:** `var` for all declarations. `for` loops. `.indexOf()`. String concatenation with `+`.
- **BANNED:** `const`, `let`, arrow functions (`=>`), template literals (backticks), destructuring, `async/await`, optional chaining (`?.`), nullish coalescing (`??`), spread operator (`...`)
- **NO Node.js modules:** no `require()`, no `import`. You're in a sandboxed Code node.
- **Google Sheets nodes v4.5:** use `expr('{{ "literal-value" }}')` syntax, not plain strings
- **After any sheet structural change** (add/remove/rename columns): you MUST tell the human to refresh column schema in n8n UI AND explicitly publish the workflow. Saving alone does NOT update the production webhook.

### 2.2 Error Handling

- **NEVER** combine `continueErrorOutput` with `retryOnFail`. This silently drops the error output branch — data goes nowhere, no error is raised, you will waste hours debugging.
- **CORRECT PATTERN:** Use `continueRegularOutput`, then detect errors inline in the next Code node by checking for error properties in the incoming items.
- The SDK `.onError()` does NOT wire error outputs in n8n. Error output wiring is always manual in the n8n UI. Tell the human to do this.

### 2.3 Telegram

- **NEVER** use `resource: 'chat'`. It fails silently.
- **ALWAYS** use `resource: 'message'`, `operation: 'sendMessage'`
- Parse mode: set via `additionalFields: { parse_mode: 'HTML' }`
- Day-of-week rules you enforce: Friday = Latitude/personal content only (no Team). Saturday = complete skip (queue for Sunday). Sunday 7PM BDT = composite digest.

### 2.4 Trello

- **ALWAYS** use native `n8n-nodes-base.trello` nodes, never HTTP Request nodes for Trello. Native nodes auto-assign Trello credential.
- Trello-triggered workflows REQUIRE the native Trello Trigger node (not generic webhook). n8n webhook nodes don't respond to HEAD requests that Trello sends during registration.

### 2.5 Workflow Naming

- **NEVER** prefix workflow names with Linear issue IDs. Linear IDs are ephemeral references; workflow names are permanent identifiers.
- Format: `Team [Name] — [Frequency]` or `Continuum — [Name]`

### 2.6 Git Discipline

You are responsible for git hygiene. The human should never have to remind you.

Every commit must:
- Reference the Linear issue: `[component] description (TR-XXX)`
- Be atomic — one logical change per commit
- Execute `git add + commit + push` as ONE sequence via osascript. Never leave changes uncommitted. Never commit locally only.

```
do shell script "cd /Users/tawhidrahman/Developer/AI-Operating-System && git add -A && git commit -m '[component] description (TR-XXX)' && git push origin main"
```

**You proactively prompt the push.** Do not wait for the human to ask.

### 2.7 Repo Boundaries You Enforce

| Repo | What Goes Here | What NEVER Goes Here |
|------|---------------|---------------------|
| ai-operating-system (master) | Everything — single source of truth | Nothing excluded |
| ai-operating-system-team | `skills/team/`, shared `agents/`, allowlisted `FOR-*.md` docs | n8n-workflows/, PROJECT_CONTEXT.md, personal skills, EVOLUTION_PROTOCOL.md, upstream-references.md |
| Continuum workflows | Personal intelligence only | Team-facing content, Business Ops writes |

### 2.8 Data Boundaries You Enforce

| Project | CAN Read | CAN Write | NEVER Writes To |
|---------|----------|-----------|-----------------|
| Continuum | Linear, Gmail, Drive, Trello, Sheets, Notion, HubSpot | Telegram, Notion (Radar DB, Action Queue) | HubSpot records, team-facing systems |
| Business Ops | Everything Continuum reads | HubSpot, Trello, Google Sheets, Gmail | — |
| AI OS — Platform | Own repo | Own repo, team repo (via sync-to-team.sh) | Business data |
| Latitude | Notion, Substack, Gumroad | Notion (Latitude pages), content platforms | operational systems |

---

## PHASE 3: VERIFICATION — QUALITY GATES YOU CHECK BEFORE DONE

You do NOT mark any issue as Done until you have verified every applicable gate. If a gate fails, fix it or tell the human what needs manual action.

### Workflow Gates (n8n)
- [ ] Workflow executes end-to-end without manual node intervention
- [ ] Error paths tested (not just happy path — simulate a failure)
- [ ] Telegram notification fires correctly with correct parse mode (if applicable)
- [ ] Day-of-week gating respected (Friday/Saturday/Sunday rules above)
- [ ] Workflow name follows convention (no Linear ID prefix)
- [ ] All credential references use existing n8n credentials (never hardcoded keys)

### Skill/Agent Gates
- [ ] SKILL.md has frontmatter with `name`, `version`, and `description`
- [ ] Description triggers correctly: mentally test — would 3 different phrasings of the same intent all trigger this skill?
- [ ] Output is consumed by at least one downstream system (state which one)
- [ ] CHANGELOG.md created with initial entry
- [ ] If team-facing: placed in `skills/team/`, added to `docs/skill-links.md`

### Code Gates
- [ ] Zero ES6 syntax in any n8n Code node
- [ ] Error handling uses `continueRegularOutput` pattern, not `continueErrorOutput + retryOnFail`
- [ ] Commit messages include Linear issue ID
- [ ] All changes pushed to remote (not just local commit)

### Documentation Gates
- [ ] MANIFEST.md updated if agent was added/modified
- [ ] `docs/skill-links.md` updated if team skill was added
- [ ] PROJECT_CONTEXT.md reflects new state (skill count, workflow count, issue status)
- [ ] Linear issue description updated with completion notes

---

## PHASE 4: SESSION CLOSE — MANDATORY EVERY SESSION

You execute these steps. You do not ask the human if they want to. You do not skip them because the session "feels done." This is the protocol.

### 4.1 Git Push

```
git add -A && git commit -m '[component] description (TR-XXX)' && git push origin main
```

One command. One sequence. Never end a session with uncommitted or unpushed changes.

### 4.2 Linear Update

For each issue worked in this session:
1. Update description with: what was built, what changed, any caveats or remaining work
2. Set state to `Done` if complete, `In Progress` if partially complete
3. If blocked: set `blockedBy` relation and document the blocker

### 4.3 PROJECT_CONTEXT.md Update

Write the updated state directly to the live file:

```
Filesystem:write_file → /Users/tawhidrahman/Developer/AI-Operating-System/PROJECT_CONTEXT.md
```

You update this file **as changes happen during the session**, not batched to the end. The next chat may start before this one ends.

**ABSOLUTE PROHIBITIONS:**
- NEVER create a download file in `/mnt/user-data/outputs/` as a substitute for writing the live file
- NEVER ask the human to manually copy, replace, pull, or push
- NEVER produce PROJECT_CONTEXT as an artifact or output file
- If Filesystem MCP is unavailable, say so and offer to write when reconnected

### 4.4 Sync Decision

If the session modified `skills/team/`, shared `agents/`, or allowlisted FOR-*.md docs:
- Run `sync-to-team.sh` via osascript
- State: "Synced to team repo — [reason: which files changed]"

If the session only touched personal skills, Continuum configs, or PROJECT_CONTEXT.md:
- State: "No team sync needed — changes were [personal/continuum/platform-internal]"

### 4.5 Memory Update

If the session produced new IDs, counts, workflow IDs, architectural decisions, or completed milestones:
- Update memory via `memory_user_edits` so cross-session knowledge stays current
- This is especially important for: new n8n workflow IDs, new Linear issue IDs, changed skill/agent counts, completed milestones

---

## ANTI-PATTERNS — DOCUMENTED FAILURES

Every entry below is a real incident. The protocol exists because of these.

| # | Anti-Pattern | What Actually Happened | Correct Approach |
|---|-------------|----------------------|-----------------|
| 1 | Skipped PROJECT_CONTEXT.md read | Built a feature that already existed. Full session wasted. | Always read first. No exceptions. |
| 2 | Built without Linear issue | Work completed but untraceable. Redone two weeks later. | Create issue before first line of code. |
| 3 | Used `const` in n8n Code node | Workflow passed manual test, failed in production silently. No error. | `var` only. Always. |
| 4 | `continueErrorOutput` + `retryOnFail` | Error branch never received data. Spent 2 hours debugging phantom. | `continueRegularOutput` + inline detection. |
| 5 | Local commit only, no push | Next session couldn't find changes. Rebuilt from scratch. | `git add + commit + push` as one command. |
| 6 | Download artifact for PROJECT_CONTEXT | Human had to manually replace file. Context stale for 3 sessions. | Write directly via Filesystem MCP. |
| 7 | Orphan intelligence | Agent produced daily report consumed by nothing. Wasted API credits for weeks. | Define downstream consumer before building. |
| 8 | Telegram `resource: 'chat'` | Silent failure. No error message. 45 minutes debugging before finding the cause. | Always `resource: 'message'`. |
| 9 | HTTP Request for Trello | Credential not auto-assigned. Webhook HEAD request rejected by Trello. | Use native Trello nodes. |
| 10 | Linear issue without `project=` | Issue created but invisible in all project views. Discovered weeks later. | Always include `project=`. |
| 11 | `Cancelled` spelling in Linear | State update accepted but silently failed. Issue appeared stuck. | American spelling: `Canceled`. |
| 12 | Workflow named with Linear ID prefix | Workflow name became meaningless when issue was closed. | Use `Team [Name]` or `Continuum — [Name]`. |

---

## HUMAN'S ROLE IN THIS PROTOCOL

The human (Tawhid, or any team member):
- **Provides direction:** what to build, strategic priority, approval decisions
- **Approves scope declarations** from Phase 1
- **Performs manual UI actions** you cannot do: n8n UI credential wiring, error output connections, sheet schema refresh, workflow publish button
- **Reviews and approves** before sync-to-team.sh touches the team repo
- **Follows your lead** on sequencing, hygiene, and verification — you are the PM

The human does NOT need to:
- Remind you to push to git (you do this proactively)
- Ask you to update PROJECT_CONTEXT.md (you do this automatically)
- Check if Linear issues exist (you verify this in Phase 0)
- Enforce code standards (you catch ES6, bad error handling, wrong Telegram config)

---

## CHANGELOG

| Date | Version | Change |
|------|---------|--------|
| 2026-05-24 | 1.0.0 | Initial protocol — TR-425. AI-first audience. 4-phase gate system. 12 documented anti-patterns. |
