---
name: nuxt-v3-components
description: Guidelines for Single File Components (SFC), typed props/emits, and clean
  feature components in Nuxt v3.
type: Skill
title: nuxt-v3-components
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nuxt/v3/components/SKILL.md
tags:
- development
- nuxt
- v3
- components
timestamp: '2026-06-29T19:13:46Z'
---

# Nuxt v3 Component Architecture

## When to use
Use when designing Vue components, wiring forms, configuring inputs, or implementing custom slots, props, and custom events.

## Do
- Write `<script setup lang="ts">` consistently for all Single File Components (SFCs).
- Declare typed component props using compile-time `defineProps<{}>()` declarations.
- Declare typed component events using compile-time `defineEmits<{}>()` declarations.
- Utilize Nuxt's lazy loading options (e.g. `<LazyMyComponent />`) for heavy components to improve initial bundle performance.

## Don't
- Do not mix complex state-tracking business logic inside pure UI components. Abstract logic into custom composables.
- Do not mutate props directly inside child components. Emits events to let parent components mutate state.
- Do not register templates globally using Vue configuration; rely on Nuxt directory auto-imports.

## Minimal correct pattern

### Typed UI Input Component: `components/ui/BaseInput.vue`
```vue
<script setup lang="ts">
interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  type: 'text',
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur', value: FocusEvent): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <label v-if="label" class="text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
      @blur="emit('blur', $event)"
      class="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
    />
  </div>
</template>
```
