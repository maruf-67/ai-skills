---
name: styling
description: Micro-skill for Next.js 16 styling
---

# Styling & Theming

## Tailwind CSS v4

The project uses Tailwind CSS v4 with a centralized theme configuration.

### Configuration
- **Entry**: `src/app/globals.css`
- **Config**: `tailwind.config.ts` (Used for mapping CSS variables to utility classes).

### Theme Variables (`src/app/globals.css`)

We define CSS variables for colors to support runtime theming and dark mode.

```css
@theme inline {
  /* Brand Colors */
  --color-brand-blue: #d4ebff;
  --color-brand-blue-medium: #417fb4;
  --color-brand-blue-accent: #3c8fd5;
  
  /* Primary Scale (Blue) */
  --color-primary-50: #d4ebff;
  /* ... to 950 */
  
  /* Secondary Scale (Gray) */
  --color-secondary-50: #f8f9fa;
  /* ... to 950 */
}

/* Dark Mode Overrides */
.dark {
  --background: #0f0f0f;
  --foreground: #f5f5f5;
}
```

### Utility Class Mapping (`tailwind.config.ts`)

These CSS variables are mapped to Tailwind utility classes.

- `bg-primary-500` -> `var(--color-primary-500)`
- `text-brand-blue` -> `var(--color-brand-blue)`

### Dark Mode
- **Strategy**: Class-based (`darkMode: 'class'`).
- **Implementation**: The `ThemeContext` toggles the `dark` class on the root element.
- **Variant**: Use `dark:` prefix (e.g., `bg-white dark:bg-gray-900`).

### Component Styling
- Use `cn()` helper (clsx + tailwind-merge) for conditional classes.
- Use `class-variance-authority` (cva) for component variants.

### Custom Scrollbar
Custom scrollbar styles are defined in `globals.css` to match the "Cureanix" aesthetic (8px width, rounded thumbs).
