# Express.js v5 Skills

Version-locked guidance for Express 5 + TypeScript backends.
Primary alignment target: `portal-api`, but rules are written to be reusable in new projects.

## Start Here
- [Core Skill (trigger-based)](./SKILL.md)

## Skill Modules
- [Project Structure](./structure.md)
- [Routing & Controllers](./routing.md)
- [Database & Models](./database.md)
- [Authentication & Security](./auth.md)
- [Real-time Notifications](./notifications.md)
- [Caching & Redis](./caching.md)
- [Audit System](./audit.md)
- [Knowledge Module](./knowledge.md)
- [Database Seeders](./seeders.md)
- [Logging & Error Handling](./logging.md)
- [Deployment](./deployment.md)

## Feature Delivery Checklist (Reusable)
1. Confirm endpoint contract and validation schema.
2. Implement service rules before controller mapping.
3. Keep controller thin and standardized.
4. Wire route middleware in canonical order.
5. Validate with lint + type-check + relevant tests.
