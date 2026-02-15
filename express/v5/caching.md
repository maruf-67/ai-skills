# Caching & Redis

## Redis Infrastructure

The application uses **Redis** for high-performance caching, specifically targeting authentication and frequently accessed data.

-   **Client**: `redis` (node-redis).
-   **Config**: `REDIS_URL` in `.env`.
-   **Manager**: `src/common/utils/redisCache.ts` handles connection, error resilience, and graceful degradation (app continues if Redis fails).

## Caching Strategies

### 1. User Data Cache
-   **Key**: `user:{userId}`
-   **TTL**: 10 minutes (`DEFAULT_TTLS.USER_DATA`).
-   **Usage**: Used in `authMiddleware` to avoid DB hits on every request.
-   **Invalidation**: On profile update or role change (`invalidateCachedUserData`).

### 2. Token Blacklist
-   **Key**: `blacklist:{type}:{tokenPrefix}`
-   **TTL**: Matches token expiry (6h for access, 30d for refresh).
-   **Usage**: Instant check for revoked tokens during logout.

### 3. Query Caching (Optional)
-   **Pattern**: `getCacheValue(key)` / `setCacheValue(key, data, ttl)`.
-   **Usage**: Expensive aggregation results or static configuration data.

## Implementation Pattern

Use `getCachedOrFetch` helper (`src/common/utils/optionalCache.ts`) for transparent caching:

```typescript
import { getCachedOrFetch, generateCacheKey } from '../../common/utils/optionalCache.js';

const user = await getCachedOrFetch(
    generateCacheKey('user:id', userId),
    () => User.findById(userId), // DB fallback
    { ttl: 600 }
);
```

## Performance Metrics
-   **Auth Check**: ~15ms with Redis vs ~100ms with DB.
-   **Reliability**: Fails open (if Redis down, fetches from DB).
