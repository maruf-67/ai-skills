---
name: nuxt-v3-responsive
description: Best practices for implementing mobile-first layouts, adaptive navigation, and SSR-safe viewport checks in Nuxt v3.
---

# Nuxt v3 Responsive Design & viewports

## When to use
Use when styling grids, designing navigation shells, adding adaptive tables, or modifying layouts to fit mobile, tablet, and desktop viewports.

## Do
- Apply mobile-first styling principles using Tailwind's breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
- Keep layout widths fluid using relative percentages, CSS flexbox, or grid configurations.
- Safeguard browser-only APIs (like `window` or `document`) behind `process.client` checks.
- Build adaptive layout segments (e.g., swapping a desktop navbar with a mobile sheet drawer) using client-rendered conditional indicators.

## Don't
- Do not use hardcoded pixel widths for core responsive elements (e.g., sidebars or container boxes).
- Do not execute calculations checking `window.innerWidth` in the setup script during server compilation. This will fail with `window is not defined`.
- Do not rely on JavaScript/Vue conditions for styling that can be handled natively using CSS media queries (to prevent content shifts on load).

## Minimal correct pattern

### Mobile-first Grid Component
```vue
<template>
  <!-- 1 column on mobile, 2 columns on tablet, 3 columns on desktop -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    <div class="bg-white p-4 border rounded shadow hover:shadow-md transition">
      <h3 class="font-bold">Card Item 1</h3>
      <p class="text-sm text-gray-600">Adaptive content block.</p>
    </div>
    <div class="bg-white p-4 border rounded shadow hover:shadow-md transition">
      <h3 class="font-bold">Card Item 2</h3>
      <p class="text-sm text-gray-600">Adaptive content block.</p>
    </div>
    <div class="bg-white p-4 border rounded shadow hover:shadow-md transition">
      <h3 class="font-bold">Card Item 3</h3>
      <p class="text-sm text-gray-600">Adaptive content block.</p>
    </div>
  </div>
</template>
```

### SSR-Safe Viewport Composable: `composables/useViewport.ts`
```ts
export const useViewport = () => {
  const isMobile = ref(false);

  if (process.client) {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    isMobile.value = mediaQuery.matches;

    const handler = (event: MediaQueryListEvent) => {
      isMobile.value = event.matches;
    };

    onMounted(() => {
      mediaQuery.addEventListener('change', handler);
    });

    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handler);
    });
  }

  return { isMobile };
};
```
