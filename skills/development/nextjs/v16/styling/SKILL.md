---
name: styling
description: Micro-skill for Next.js 16 styling
---

# Styling & Theming

## Tailwind CSS v4

The project uses **Tailwind CSS v4** with a pure CSS-based configuration — no `tailwind.config.{ts,js}` file.

### Configuration
- **Entry**: `src/app/globals.css` starts with `@import "tailwindcss";`
- **Theme**: Defined via `@theme inline` directive in `globals.css` — maps `:root` CSS custom properties to Tailwind utility classes
- **No config file**: v4 eliminates `tailwind.config.ts`; all customization lives in CSS

### Theme Variables (`src/app/globals.css`)

```css
@import "tailwindcss";

:root {
  --primary: #F67951;
  --primary-foreground: #FFFFFF;
  --secondary: #131212;
  --surface: #FFFFFF;
  --muted-text: #838388;
  /* ... all design tokens as CSS custom properties */
}

@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-surface: var(--surface);
  --color-muted-text: var(--muted-text);
  /* ... map each :root var to a Tailwind utility class */
}
```

### Usage in Components

Use the mapped utilities directly:
```tsx
<div className="bg-primary text-primary-foreground" />
<div className="text-muted-text" />
<span className="text-surface" />
```

### Conditional Classes
- Use `cn()` helper (`clsx` + `tailwind-merge`) from `@/lib/utils` for conditional class merging.

### Dark Mode
- **Strategy**: Class-based — `ThemeContext` toggles `.dark` on `<html>`.
- **Variant**: Use `dark:` prefix (e.g., `bg-white dark:bg-gray-900`).
- **Tokens**: Override `:root` variables inside `.dark { ... }` block in `globals.css`.

### Custom Scrollbar
Defined in `globals.css` (8px width, rounded thumbs, matches the brand aesthetic).
