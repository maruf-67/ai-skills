---
name: fetching
description: Micro-skill for data fetching and service layer patterns in Next.js 16.
---

# Data Fetching & Services

## Service Layer Pattern

Abstract all API logic into dedicated service files within `src/services/`. This keeps components clean and ensures consistency.

### Deduplication Cache
Implement an in-flight request cache to prevent redundant API calls during rapid component re-renders or shared state updates.

```typescript
// Example: src/services/base.service.ts
const requestCache = new Map<string, Promise<unknown>>();

export const baseService = {
    getAll: async <T>(params: Record<string, string | number | boolean | undefined>): Promise<T> => {
        const cacheKey = JSON.stringify(params);
        if (requestCache.has(cacheKey)) return requestCache.get(cacheKey);

        const request = api.get('/endpoint', { params })
            .then(res => {
                requestCache.delete(cacheKey);
                return res.data as T;
            });

        requestCache.set(cacheKey, request);
        return request as Promise<T>;
    }
};
```

## API Client Architecture (`src/lib/api.ts`)

Leverage the centralized Axios instance for all requests.

- **JWT Injection**: Automatically handled via request interceptors.
- **Resilient Auth**: 401/403 errors trigger a transparent token refresh.
- **Request Queuing**: Failed requests during refresh are queued and retried automatically on success.

## Response Processing
- Always use `unwrapResponse<T>()` from `@/lib/api` to handle standardized `ApiResponse` wrappers.
- Define explicit interfaces in `@/types` for all domain entities.

## App Router Cache Controls
- Use explicit fetch policies in server components:
    - static data: default/`force-cache`
    - dynamic data: `cache: 'no-store'`
    - revalidated data: `next: { revalidate: number }`
- For route handlers, keep request-time data behavior explicit and avoid implicit stale behavior.
