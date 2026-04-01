# AI Operating Mode (ai-skills)

## Purpose

This repository defines reusable, version-locked skill guidance for AI-assisted implementation.

## Mandatory Workflow (Every Skill Update)

1. Build context first:
   - Identify target stack, major version, and auth mode.
   - Read `context.md`, `index.md`, and relevant stack index file.
2. Use MCP-first discovery before changing framework-specific guidance:
   - Query Context7 for version-current behavior.
   - Update only materially outdated guidance.
3. Preserve structure contract:
   - Canonical docs in `{stack}/{version}/...`
   - Copilot wrappers in `.github/skills/...`
4. Keep routing clear:
   - Wrapper skills must point to canonical skill paths.
   - Avoid duplicate implementation logic across wrappers.
5. Validate alignment:
   - Keep naming conventions and trigger phrases consistent.
   - Ensure frontmatter `name` and `description` are valid and specific.

## Skill Authoring Rules

- Every skill must define:
  - when to use
  - do and don't guidance
  - minimal correct pattern
  - related skills or routing hints
- Prefer enforceable wording over generic advice.
- Keep descriptions searchable with clear trigger words.
- Avoid cross-version contamination.

## Auth Mode Rules

- Laravel web SPA: session auth guidance.
- Laravel mobile/API: PAT auth guidance.
- Express token-first APIs: JWT/Bearer guidance.
- Never mix incompatible browser and token storage patterns in the same boundary.

## Quality Gate

- Wrapper points to real canonical file.
- Canonical file reflects current framework behavior.
- Index files include new skills for discoverability.
- No conflicting recommendations across sibling skills.
