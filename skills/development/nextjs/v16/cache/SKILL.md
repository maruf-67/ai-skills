---
name: cache
description: Micro-skill for Next.js 16 Cache Components API, use cache directive,
  cache invalidation, and custom cache profiles.
type: Skill
title: cache
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nextjs/v16/cache/SKILL.md
tags:
- development
- nextjs
- v16
- cache
timestamp: '2026-06-29T19:13:46Z'
---

# Next.js 16 Caching & Cache Components

## When to use

Use when implementing layout caching, component-level caching, API function caching, or when migrating from legacy configurations like `unstable_cache`.

## Do

- **Use the `'use cache'` directive:**
  - File level: Caches the entire route/file.
  - Component level: Caches individual async React components.
  - Function level: Caches any async function returning data (replacing `unstable_cache`).
- **Configure Cache Lifetimes:**
  - Call `cacheLife('profile')` using built-in profiles: `'default'`, `'minutes'`, `'hours'`, `'days'`, `'weeks'`, `'max'`.
  - For custom times, pass an inline configuration: `cacheLife({ stale: 3600, revalidate: 7200, expire: 86400 })`.
- **Apply Cache Tags:**
  - Call `cacheTag('my-tag')` to flag cached results.
- **Perform Cache Invalidation:**
  - For immediate updates within the same request lifecycle (e.g. Server Actions), use `updateTag('my-tag')`.
  - For background / stale-while-revalidate invalidation, use `revalidateTag('my-tag')`.
- **Pass Context as Arguments:**
  - Since `'use cache'` cannot access runtime APIs like `cookies()`, `headers()`, or `searchParams`, fetch them outside the cached component and pass them in as parameters (which automatically form the cache key).

## Don't

- Do not attempt to read `cookies()` or `headers()` inside a `'use cache'` function (unless using `'use cache: private'`).
- Do not use non-deterministic code (like `Math.random()` or `Date.now()`) inside a cached function; they will execute once at build time. Use `await connection()` from `next/server` if request-time execution is required.
- Do not manually generate cache keys (e.g. keyParts); Next.js automatically derives them from function scopes, closures, and serializable arguments.

## Minimal Correct Pattern

### Component Caching
```tsx
import { cacheLife, cacheTag } from 'next/cache'

async function Stats() {
  'use cache'
  cacheLife('hours')
  cacheTag('dashboard-stats')

  const stats = await db.stats.aggregate()
  return <StatsDisplay stats={stats} />
}
```

### Passing Context as Arguments
```tsx
import { cookies } from 'next/headers'

async function ProfilePage() {
  // 1. Extract dynamic session info outside
  const session = (await cookies()).get('session')?.value
  // 2. Pass as argument (forms part of cache key)
  return <CachedProfile sessionId={session} />
}

async function CachedProfile({ sessionId }: { sessionId: string }) {
  'use cache'
  const data = await fetchUserData(sessionId)
  return <div>{data.name}</div>
}
```
