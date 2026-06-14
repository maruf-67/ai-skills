---
name: nuxt-v3-architecture
description: Guidelines for setting up directories, layered folders, auto-imports, and server APIs in Nuxt v3.
---

# Nuxt v3 Project Architecture & Layers

## When to use
Use when initializing a new Nuxt v3 feature, restructuring directories, creating custom server APIs, or configuring layout boundaries.

## Do
- Follow directory-based roles strictly: pages in `pages/`, components in `components/`, server routes in `server/api/`.
- Isolate domain-specific components under `components/features/[domain]/` and shared presentational components in `components/ui/`.
- Keep business logic inside typed composables (`composables/`) or Pinia stores (`stores/`), keeping components thin.
- Utilize Nuxt auto-imports correctly for global modules and functions (e.g. `ref`, `computed`, `useRoute`).

## Don't
- Do not mix server-only logic or dependencies (e.g., node fs or databases) inside client components.
- Do not bypass auto-imports with manual imports for standard Vue/Nuxt composition APIs unless name-aliased.
- Do not define route-specific components inside `pages/` directory; keep pages strictly as route definitions.

## Minimal correct pattern

### Directory Structure
```
├── components/
│   ├── ui/               # Reusable presentational components (Button, Table)
│   └── features/         # Feature-specific logical components
│       └── patient/      # Patient feature group
├── composables/          # Stateful business logic and helper composables
├── layouts/              # Theme page shells
├── middleware/           # Client-side route guards
├── pages/                # App pages (routing mapping)
├── server/
│   ├── api/              # Server-side JSON endpoints (SSR fetched)
│   └── middleware/       # Node.js server request interceptors
└── stores/               # Pinia global application stores
```

### Server API Endpoint: `server/api/v1/health.ts`
```ts
export default defineEventHandler((event) => {
  const query = getQuery(event);
  
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    clientIp: event.node.req.socket.remoteAddress,
    queryParam: query.test || null
  };
});
```
