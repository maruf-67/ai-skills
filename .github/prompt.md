# Prompt Guide (ai-skills)

## Quick Rules

- Start from stack and version selection first.
- Route auth mode before implementation guidance.
- Prefer canonical skills over ad-hoc suggestions.
- Use MCP (Context7) when framework behavior may have changed.

## Prompt Patterns

- "Route this task to the correct skill path and auth mode."
- "Create a new wrapper skill and map it to canonical source docs."
- "Refresh this skill with current framework guidance from Context7."
- "Audit this skill for version drift and conflicting auth patterns."

## Output Checklist

- Correct stack and major version selected.
- Correct auth mode selected.
- Wrapper and canonical paths both updated.
- Trigger-oriented `description` present in frontmatter.
- Index/discovery docs updated.
