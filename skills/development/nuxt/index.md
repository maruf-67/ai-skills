# Nuxt Skills

Version-locked guidance for Nuxt + Vue 3 + TypeScript frontends.

## Versions

### Nuxt v3 (Legacy)
- [Core Skill (trigger-based)](./v3/SKILL.md)
- [Project Structure](./v3/architecture/SKILL.md)
- [Routing & Pages](./v3/routing/SKILL.md)
- [State Management](./v3/state/SKILL.md)
- [Components & Composables](./v3/components/SKILL.md)
- [Data Fetching](./v3/fetching/SKILL.md)
- [Styling & UI](./v3/styling/SKILL.md)
- [Responsive Design](./v3/responsive/SKILL.md)
- [Authentication](./v3/auth/SKILL.md)

### Nuxt v4+ (Latest)
- [Core Skill (trigger-based)](./v4/SKILL.md)
- [Project Setup & Testing](./v4/references/project-setup.md)
- [Routing & Pages](./v4/references/routing.md)
- [Composables & Data Fetching](./v4/references/nuxt-composables.md)
- [Middleware & Plugins](./v4/references/middleware-plugins.md)
- [Server Routes & Nitro](./v4/references/server.md)
- [Components & Rendering](./v4/references/nuxt-components.md)
- [Configuration](./v4/references/nuxt-config.md)
- [Authentication (Sanctum + JWT)](./v4/auth/SKILL.md)

## Feature Delivery Checklist (Reusable)
1. Confirm page/component contract and validation schema.
2. Implement composable logic before component mapping.
3. Keep pages thin and composables reusable.
4. Wire route middleware in canonical order.
5. Validate with lint + type-check + relevant tests.
