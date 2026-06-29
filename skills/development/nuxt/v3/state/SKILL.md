---
name: nuxt-v3-state
description: Best practices for state management in Nuxt v3 including Pinia setup
  stores, state hydration, and useState.
type: Skill
title: nuxt-v3-state
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nuxt/v3/state/SKILL.md
tags:
- development
- nuxt
- v3
- state
timestamp: '2026-06-29T19:13:46Z'
---

# Nuxt v3 State Management

## When to use
Use when defining global variables, integrating Pinia stores, caching API lookup entities, or sharing state across page layout boundaries.

## Do
- Define Pinia stores using Vue's setup function syntax (`defineStore('id', () => { ... })`).
- Use `useState` (Nuxt's SSR-safe state composable) for simple page-level or temporary states that need to survive hydration.
- Keep store data structures strongly typed and enforce read-only getters for sensitive values.
- Centralize state modification functions inside store actions to maintain traceability.

## Don't
- Do not instantiate global state variables using raw Vue `ref` outside of Pinia/`useState` context. This leaks memory across requests on the Node server.
- Do not persist store state directly inside `localStorage` without safeguarding client runtime verification guards (e.g., checks like `if (process.client)`).
- Do not bind heavy raw DOM properties or socket listeners directly into global reactive states.

## Minimal correct pattern

### Pinia Store with setup syntax: `stores/theme.ts`
```ts
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(false);

  const themeClass = computed(() => isDarkMode.value ? 'dark' : 'light');

  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
    if (process.client) {
      document.documentElement.className = themeClass.value;
    }
  }

  return { isDarkMode, themeClass, toggleTheme };
});
```

### SSR-Safe Shared State using `useState`: `composables/useCounter.ts`
```ts
export const useCounter = () => {
  // useState ensures this state has the exact same value on server and client, 
  // preventing hydration clashing errors.
  const count = useState<number>('global-counter', () => 0);

  const increment = () => count.value++;
  const decrement = () => count.value--;

  return {
    count: readonly(count),
    increment,
    decrement
  };
};
```
