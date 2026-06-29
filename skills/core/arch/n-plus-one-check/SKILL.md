---
name: n-plus-one-check
version: 1.0.0
description: Scans Laravel Actions and Controllers for potential N+1 query issues
  in Eloquent relationships. Triggers on /ai-os:arch-n-plus-one-check.
type: Skill
title: n-plus-one-check
resource: file:///home/almaruf67/Codes/ai-skills/skills/core/arch/n-plus-one-check/SKILL.md
tags:
- core
- arch
- n-plus-one-check
timestamp: '2026-06-29T19:13:46Z'
---

# Architecture Agent: N+1 Watchdog

This skill ensures high database performance by identifying and correcting inefficient relationship loading in Laravel.

## Mandates
- **Performance First**: Always prefer Eager Loading over Lazy Loading in API endpoints.
- **Deep Scan**: Check for nested relationships (e.g., `user.profile.settings`).
- **Standard**: Recommend the `with()` or `load()` methods depending on the context.

## Workflow

### 1. Analyze Source Code
- Read the specified Laravel Action or Controller.
- Identify all Eloquent queries and relationship accesses (e.g., `$expense->category->name`).

### 2. Identify N+1 Risks
- Check if a relationship is accessed inside a loop or on a collection.
- Check if the initial query includes the `with()` method for that relationship.

### 3. Recommend Optimization
- **Suggestion**: If a relationship is accessed without eager loading, suggest adding `->with(['relationship_name'])` to the query.
- **Nested Suggestion**: If multiple levels are accessed, suggest `->with(['level1.level2'])`.

### 4. Code Review Integration
- Report the specific line and the recommended change.
- Categorize as **PERFORMANCE WARNING**.

## Usage
`/ai-os:arch-n-plus-one-check [FilePath]`

Example:
`/ai-os:arch-n-plus-one-check app/Http/Controllers/ExpenseController.php`
