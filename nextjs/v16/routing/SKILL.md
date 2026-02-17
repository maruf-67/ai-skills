---
name: routing
description: Micro-skill for Next.js 16 routing patterns, focusing on async params and App Router conventions.
---

# Page Routing

## App Router Structure

The project strictly follows the Next.js App Router (`src/app`) conventions.

### Route Groups
- `(main)`: Public-facing pages and base application layout.
- `(dashboard)`: Authenticated dashboard area with Sidebar and Admin Header.

### Dynamic Routes & Params Handling
Handle route params consistently in pages/layouts/metadata/route-handlers according to current App Router behavior.

```tsx
// Example: src/app/knowledge/[slug]/page.tsx
export default async function KnowledgePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
    const { slug } = await params;
    // Data fetching...
}
```

### Metadata Generation
Dynamic SEO metadata must also await params.

```tsx
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await service.getBySlug(slug);
  return { title: data.title };
}
```

### Specialized Route Files
- `layout.tsx`: Persistent UI and state providers.
- `page.tsx`: Unique UI for a route.
- `error.tsx`: Client-side error boundary.
- `not-found.tsx`: UI for 404 states within a segment.
- `loading.tsx`: Instant loading UI.

### Navigation
- **Declarative**: Use `Link` from `next/link`.
- **Programmatic**: Use `useRouter` from `next/navigation` in client components.
- **Active State**: Use `usePathname` from `next/navigation` to highlight active links in navigation menus.

### Route Handlers
- Keep API-style handlers in `route.ts` minimal and typed.
- Parse and validate params/query/body at the boundary.
- Explicitly choose cache/revalidation behavior for any internal fetch inside handlers.
