---
name: cmd-epic-publish
description: "Publish a validated epic update back to the issue and local cache."
type: Skill
title: epic-publish
resource: file:///home/almaruf67/Codes/ai-os/ECC/commands/epic-publish.md
tags:
- ecc
- command
timestamp: '2026-07-23T07:08:12Z'
---

# /epic-publish

Publish a validated coordination update to GitHub.

```bash
node scripts/github-coordination.js publish <issue-number> --repo <owner/repo>
```

What this does:

1. Re-validates the epic before publishing.
2. Updates the coordination block in the issue body.
3. Appends a concise publish comment.
4. Records the final local snapshot.

Compatibility aliases:

- `/pr`
- `/prp-pr`
