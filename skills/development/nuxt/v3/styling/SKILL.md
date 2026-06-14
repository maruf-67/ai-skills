---
name: nuxt-v3-styling
description: Guidelines for styling in Nuxt v3 including Tailwind v4 configuration, brand tokens, and theme transitions.
---

# Nuxt v3 Styling & UI Theme

## When to use
Use when configuring global CSS styles, styling custom UI layouts, modifying brand themes, or adding smooth micro-animations and route transitions.

## Do
- Configure Tailwind CSS using CSS-first styling approaches. Import global styles in `assets/css/main.css` and register in `nuxt.config.ts`.
- Leverage central CSS design tokens (e.g. `--color-brand-primary`) to style components.
- Use Nuxt's built-in transition wrappers (e.g. `<Transition>` or page metadata `pageTransition`) for page and layout changes.
- Wrap dynamic styling elements using Tailwind utility helper configurations.

## Don't
- Do not inject ad-hoc custom raw color hex keys (`#2C3E50`) inside template wrappers. Keep them registered inside central design tokens.
- Do not import CSS styles using relative script imports in SFC files. Register stylesheets inside the `css` array in `nuxt.config.ts`.
- Do not use absolute heights/widths for text blocks or element boxes, ensuring fluid typography.

## Minimal correct pattern

### Central Tailwind CSS imports: `assets/css/main.css`
```css
@import "tailwindcss";

@theme {
  --color-brand-primary: #10b981;
  --color-brand-dark: #0f172a;
}

body {
  background-color: var(--color-brand-dark);
  font-family: 'Inter', sans-serif;
  @apply text-slate-100;
}
```

### Nuxt Config Setup: `nuxt.config.ts`
```ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '~/assets/css/main.css'
  ]
});
```

### Component styling using Brand Tokens: `components/ui/Button.vue`
```vue
<template>
  <button 
    class="px-4 py-2 bg-[var(--color-brand-primary)] hover:brightness-110 active:scale-98 text-white rounded transition shadow-sm"
  >
    <slot />
  </button>
</template>
```
