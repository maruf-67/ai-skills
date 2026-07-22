# Laravel v13 Skills

## Authentication & Authorization
- [Authentication (Sanctum Web Session + PAT)](./auth-sanctum/SKILL.md)
- [Authentication (JWT / Bearer)](./auth-jwt/SKILL.md)
- [Auth Flow (Cross-platform)](./auth-flow/SKILL.md)
- [Permissions](./permissions/SKILL.md)
- [Social Login](./social-login/SKILL.md)

## Core Patterns
- [Routing](./routing/SKILL.md)
- [API Responses](./api-responses/SKILL.md)
- [API Resources](./api-resources/SKILL.md)
- [Form Requests](./form-requests/SKILL.md)
- [Domain Architecture](./domain-architecture/SKILL.md)

## Database & Models
- [Eloquent & Database](./eloquent/SKILL.md)

## Background Processing
- [Queues & Jobs](./queues/SKILL.md)
- [Events & Listeners](./events/SKILL.md)

## Quality
- [Testing (Pest)](./testing/SKILL.md)
- [Auditing / Loggable](./auditing-loggable/SKILL.md)

## Admin & AI
- [AI Integration](./ai-integration/SKILL.md)
- [Filament Panel (v5)](./filament-panel/SKILL.md)
- [Filament Resources & Actions (v5)](./filament-resources/SKILL.md)
- [Filament Testing (Pest)](./filament-testing/SKILL.md)

## Auth Selection Rule
- Use `auth-sanctum` for Laravel + first-party SPA web apps and PATs for mobile/desktop.
- Use `auth-jwt` when backend architecture is explicitly token-first JWT/Bearer.
- Use `auth-flow` for cross-platform auth flows (Laravel + Nuxt + Flutter).
