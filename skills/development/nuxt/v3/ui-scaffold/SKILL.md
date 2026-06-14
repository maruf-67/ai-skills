---
name: ui-scaffold
version: "1.0.0"
description: "Generates production-grade Nuxt UI v4 pages: searchable tables, forms, and layouts. Triggers on /ai-os:nuxt-ui-scaffold."
---

# Nuxt Agent: UI Scaffold

This skill automates the creation of production-grade UI components and pages using the Nuxt UI v4 design system.

## Mandates
- **Consistency**: Use Nuxt UI components exclusively (`UTable`, `UForm`, `UButton`, `UModal`, etc.).
- **Accessibility**: Ensure components are keyboard-navigable and screen-reader friendly.
- **Type Safety**: Use TypeScript for all props and emits.
- **Pattern**: Follow the "Slide-over" or "Modal" CRUD pattern for form entry.

## Workflow

### 1. Collect Metadata
- Identify the resource name (e.g., `Expense`).
- Identify the list columns (name, type, sortable).
- Identify the form fields (label, type, validation rules).

### 2. Generate Page/Component
- Create `pages/[resource]/index.vue`.
- Implement a `UTable` with:
    - Search input.
    - Sorting headers.
    - Action buttons (Edit, Delete).
- Implement a `UModal` or `USlideover` for the creation/edit form.

### 3. Integrate Composable
- Link the UI to the corresponding `use[Resource]` composable.
- Handle loading states and notifications.

### 4. Write to File
- Save the output to the `frontend/` directory.

## Usage
`/ai-os:nuxt-ui-scaffold [ResourceName] --columns="id,description,amount" --fields="description:text,amount:number"`

Example:
`/ai-os:nuxt-ui-scaffold Expense --columns="description,amount,date" --fields="description:text,amount:number,category_id:select,date:date"`
