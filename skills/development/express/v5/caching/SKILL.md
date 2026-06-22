---
name: express-v5-caching
description: Use this when adding Redis-backed caching and invalidation to Express v5 service flows.
---

# Caching & Redis

## Trigger
Use this when reducing DB load, adding token blacklist checks, or caching expensive reads.

## Best Practices
- Cache by stable keys with explicit TTL per data class.
- Implement cache-aside (`get-or-fetch`) with graceful fallback.
- Invalidate on mutation paths that affect cached entities.
- Keep security-sensitive cache keys scoped and non-guessable.
- Treat cache as optimization, never as sole source-of-truth.

## Your Usage (portal-api)
- Redis integration is managed in shared cache utilities.
- Auth middleware checks blacklist/cache before DB fallback.
- User cache invalidation is tied to profile/role updates.
- Optional cache wrappers are used to avoid hard dependency on Redis uptime.

## Reusable Blueprint
```ts
const data = await getCachedOrFetch(
  key,
  () => fetchFromDatabase(),
  { ttl: 600 },
);
```

## Avoid
- Infinite TTL for mutable entities.
- Cache keys that ignore user/tenant scope.
- Failing closed when Redis is temporarily unavailable.
