---
name: api-contract-sync
version: 1.0.0
description: Automatically generates TypeScript interfaces for the Nuxt frontend based
  on Laravel DTOs and API Resources. Use to maintain 100% type-safety across the stack.
  Triggers on /ai-os:arch-api-contract-sync.
type: Skill
title: api-contract-sync
resource: file:///home/almaruf67/Codes/ai-skills/skills/core/arch/api-contract-sync/SKILL.md
tags:
- core
- arch
- api-contract-sync
timestamp: '2026-06-29T19:13:46Z'
---

# Architecture Agent: API Contract Sync

This skill bridges the gap between the Laravel backend and Nuxt frontend by ensuring that data structures are synchronized and type-safe.

## Mandates
- **Single Source of Truth**: The Laravel DTO or API Resource is the master definition.
- **Strict Typing**: Use explicit types (string, number, boolean, interfaces) in TypeScript. Avoid `any`.
- **Location**: Generated types MUST be saved in `frontend/types/api/` or as specified in the project's frontend architecture.

## Workflow

### 1. Analyze Backend Definition
- Read the specified Laravel DTO (located in `app/DTOs/` or module-specific DTO folder).
- Read the specified Laravel API Resource (located in `app/Http/Resources/`).
- Identify all properties, their types, and nullability.

### 2. Map Types

| Laravel/PHP Type | TypeScript Type |
| :--- | :--- |
| `int`, `float` | `number` |
| `string`, `DateTime` | `string` |
| `bool` | `boolean` |
| `array` (associative) | `Record<string, any>` or specific interface |
| `array` (sequential) | `any[]` or specific `Interface[]` |
| `null` | `null` (use optional `?` or union type) |

### 3. Generate TypeScript Interface
- Create a clean `interface` matching the class name (e.g., `CreateExpenseDTO` -> `interface CreateExpenseDTO`).
- Handle nested objects by recursively generating interfaces or referencing existing ones.

### 4. Write to Frontend
- Save the output to `frontend/types/api/[Name].ts`.
- Export the interface as the default or named export.

## Usage
`/ai-os:arch-api-contract-sync [SourcePath] [DestinationPath]`

Example:
`/ai-os:arch-api-contract-sync app/DTOs/ExpenseDTO.php frontend/types/api/expense.ts`
