---
name: nuxt-v3-routing
description: Guidelines for page routing, parameter binding, dynamic segments, custom
  layouts, and route middleware in Nuxt v3.
type: Skill
title: nuxt-v3-routing
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nuxt/v3/routing/SKILL.md
tags:
- development
- nuxt
- v3
- routing
timestamp: '2026-06-29T19:13:46Z'
---

# Nuxt v3 Page Routing & Pages

## When to use
Use when defining new application routes, loading page layout templates, parsing dynamic slug variables, or wiring authentication/authorization route guards.

## Do
- Rely on Nuxt's file-system routing inside the `pages/` directory to manage page paths.
- Bind dynamic URL segments using square bracket files (e.g. `pages/blog/[slug].vue`). Access the variable using `useRoute().params.slug`.
- Assign layout overrides and route middleware using `definePageMeta` configuration blocks.
- Wrap navigation links in Nuxt's `<NuxtLink>` component instead of raw HTML `<a>` tags to enable pre-fetching and client routing.

## Don't
- Do not instantiate manual Vue Router router objects.
- Do not write nested dynamic routing structures (like `pages/[category]/[id].vue`) without specifying validation patterns to prevent index route clashes.
- Do not navigate route paths directly using `window.location.href`; use Nuxt's `navigateTo` utility.

## Minimal correct pattern

### Dynamic Page with Parameter Validation: `pages/users/[id].vue`
```vue
<script setup lang="ts">
// Define layout and middleware constraints
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});

const route = useRoute();
const userId = computed(() => route.params.id as string);

// Validate user ID is a numeric string
if (!/^\d+$/.test(userId.value)) {
  showError({ statusCode: 404, statusMessage: 'User Not Found' });
}
</script>

<template>
  <div class="p-6">
    <h2 class="text-xl font-bold">User Details Profile</h2>
    <p class="text-sm text-gray-500">Active User ID: {{ userId }}</p>
    
    <div class="mt-4">
      <NuxtLink to="/users" class="text-primary-600 hover:underline">
        &larr; Back to Users List
      </NuxtLink>
    </div>
  </div>
</template>
```
