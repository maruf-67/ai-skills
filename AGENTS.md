# AI Skills Repository Agent Rulebook

## Mission

Maintain a version-locked, framework-correct, reusable skill system for AI-assisted implementation.

## Mandatory Workflow

1. Identify stack, version, and auth mode first.
2. Read global context and stack index before editing skills.
3. Refresh framework behavior with MCP Context7 for materially version-sensitive changes.
4. Update canonical docs first, then sync Copilot wrappers.
5. Keep wrappers short and routing-focused.

## Source of Truth Priority

1. Existing repository conventions
2. Canonical stack docs (`{stack}/{version}/...`)
3. Wrapper skills (`.github/skills/...`)
4. External references

## Skill Contracts

Each skill must include:

- clear trigger conditions
- do and don't rules
- minimal correct pattern
- related skill links

## Auth Contracts

- Laravel web SPA: Sanctum session mode
- Laravel mobile clients: Sanctum PAT mode
- Express token-first APIs: JWT/Bearer mode
- Never merge incompatible auth patterns in one boundary

## Structure Contract

- Canonical stack docs: `nextjs/`, `express/`, `laravel/`, `flutter/`, `marketing-data/`
- Copilot wrappers: `.github/skills/`
- Discovery docs: `index.md`, `context.md`, stack-level `index.md`

## Quality Gate

- Frontmatter is valid and searchable.
- Wrapper `name` and folder naming are aligned.
- All new skills are indexed and discoverable.
- No cross-version rule contamination.
