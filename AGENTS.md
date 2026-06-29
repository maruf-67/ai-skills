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

Each skill must conform to the **Open Knowledge Format (OKF)** and include:
- A YAML frontmatter section with:
  - `type: Skill` (REQUIRED)
  - `title`: Display name (maps to legacy `name`)
  - `description`: A clear, one-sentence summary
  - `resource`: Canonical URI on disk (e.g. `file:///...`)
  - `tags`: Classification tags derived from the path
  - `timestamp`: Creation/modification timestamp
  - `name` & `version`: Retained for backward compatibility
- Clear trigger conditions
- Do and don't rules
- Minimal correct pattern
- Related skill links (use relative markdown path syntax to support link-graph traversal)

## Auth Contracts

- Laravel web SPA: Sanctum session mode
- Laravel mobile clients: Sanctum PAT mode
- Express token-first APIs: JWT/Bearer mode
- Never merge incompatible auth patterns in one boundary

## Structure Contract

- Canonical stack docs: `nextjs/`, `express/`, `laravel/`, `flutter/`, `marketing-data/`
- Copilot wrappers: `.github/skills/` (using `type: SkillWrapper`)
- Discovery docs: `index.md` (using `type: Index` to structure progressive disclosure), `context.md`

## Quality Gate

- Frontmatter conforms to the OKF schema and is valid.
- Wrapper `title` and folder naming are aligned.
- All new skills are indexed and discoverable via OKF `index.md` files.
- Relative links are verified and walk-safe.
- No cross-version rule contamination.
