# Page Routing

## App Router Structure

The project uses the Next.js 16 App Router (`src/app`).

### Route Groups
- `(main)`: The primary application layout, including headers/footers/sidebars if applicable.
- `(dashboard)`: Dashboard-specific routes (implied by directory structure).
- `(auth)`: Auth-related routes (if separated, though `login` seems top-level in `(main)`).

### Dynamic Routes
- **Knowledge Base**: `src/app/knowledge/[slug]/page.tsx` captures individual articles.
- **Prototypes**: `src/app/prototypes/[slug]/page.tsx` captures individual prototypes.

### Layout Nesting
1. **Root Layout** (`src/app/layout.tsx`): Wraps everything. Provides `AuthProvider`, `ThemeProvider`, `SidebarProvider`, `NotificationProvider`.
2. **Main Layout** (`src/app/(main)/layout.tsx`): Wraps main content, adds footer.

### Navigation
- Use `next/link` for internal navigation.
- Use `useRouter` from `next/navigation` for programmatic navigation (e.g., inside `useEffect` or event handlers).
- Active states should be handled by checking `usePathname()` from `next/navigation`.

### Example: Nested Dynamic Route
```tsx
// src/app/knowledge/[slug]/page.tsx
export default async function KnowledgePage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    // Fetch data based on slug...
}
```
