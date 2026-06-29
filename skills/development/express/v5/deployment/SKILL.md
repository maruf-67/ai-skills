---
name: express-v5-deployment
description: Use this when preparing production deployment topology, env config, and
  runtime process setup.
type: Skill
title: express-v5-deployment
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/express/v5/deployment/SKILL.md
tags:
- development
- express
- v5
- deployment
timestamp: '2026-06-29T19:13:46Z'
---

# Deployment

## Trigger
Use this when preparing production runs, environment config, or runtime topology for Express APIs.

## Best Practices
- Keep environment variables explicit and validated at startup.
- Run process manager/container config from versioned files.
- Separate build and runtime stages for predictable deploys.
- Keep health/readiness checks aligned with infrastructure expectations.
- Treat secrets management as environment responsibility, not source control.

## Your Usage (portal-api)
- PM2 configs: `ecosystem.config.cjs` and seed variant.
- Docker support with build/run entrypoints.
- Runtime depends on `MONGO_URI`, JWT/OAuth vars, app URLs, and optional Redis.
- Deployment guidance is documented in `src/docs/deployment-checklist.md`.

## Reusable Blueprint
1. Build TypeScript output (`dist`).
2. Start with env-validated config.
3. Ensure DB/cache dependencies are reachable.
4. Run smoke checks on auth, health, and core modules.

## Avoid
- Deploying with missing critical env variables.
- Divergent production config that bypasses documented startup paths.
- Manual post-deploy patching that is not codified in config/scripts.
