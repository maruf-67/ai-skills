---
name: pr-generator
version: 1.0.0
description: Generates standardized PR descriptions using git diff data and a template.
  Returns PR title, description body, and filename for use by the caller. Triggers
  on /ai-os:task-pr-generator.
type: Skill
title: pr-generator
resource: file:///home/almaruf67/Codes/ai-skills/skills/core/task/pr-generator/SKILL.md
tags:
- core
- task
- pr-generator
timestamp: '2026-06-29T19:13:46Z'
---

# PR Generator

Generates PR content from the current branch's changes against `dev`.

## Mandates
- **Source of Truth**: All PR content must be derived from actual git diff data.
- **Standardized Format**: Use the template in `references/template.md` without deviation.
- **Concise**: Title and description must be clear, specific, and reviewable.

## Workflow

1. **Identify Changes**: Run `git log dev..[current-branch] --oneline` and `git diff dev..[current-branch] --stat`.
2. **Generate Content**: Build a PR description using the template in [references/template.md](references/template.md).
   - **Title**: `[prefix] [feature-name] [task-id]: Brief description`
   - **What This Does**: Concise summary of changes
   - **Files Changed**: List major modified/added files
   - **How to Test**: Precise steps to verify
3. **Determine Filename**: `[prefix]-[feature-name]-[task-id]-[YYYY-MM-DD].md`
   - Derive from branch: `[prefix]/[feature-name]-[task-id]-[YYYY-MM-DD]`

## Output

This skill produces three values for the calling skill:
- `PR_TITLE`
- `PR_DESCRIPTION`
- `PR_FILENAME`

## Reference

See [references/template.md](references/template.md) for the exact markdown structure.
