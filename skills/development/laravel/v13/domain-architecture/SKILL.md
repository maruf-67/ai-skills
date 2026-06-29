---
name: laravel-v13-domain-architecture
description: Modular Domain architecture for Laravel v13. Use this to maintain strict
  separation of concerns in app/Domains.
type: Skill
title: laravel-v13-domain-architecture
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/laravel/v13/domain-architecture/SKILL.md
tags:
- development
- laravel
- v13
- domain-architecture
timestamp: '2026-06-29T19:13:46Z'
---

# Laravel v13 Domain Architecture

This skill enforces modularity using a Domain-Driven approach within `app/Domains`.

## Domain Component Rules

### 1. Services (The Orchestrators)
Services in `app/Domains/{Domain}/Services` handle business logic and orchestration. They are NOT shared between domains directly; use cross-domain service injection if needed.

### 2. Actions (The Atoms)
Single-purpose classes in `app/Domains/{Domain}/Actions` (e.g., `CreateInvoiceAction`). Use these for reusable, atomic business rules.

### 3. Models (The Data)
Domain-specific models reside in `app/Domains/{Domain}/Models`. Note: Legacy or shared models may still reside in `app/Models`.

## Architecture Constraints
- **Strict Types**: Every file MUST start with `declare(strict_types=1);`.
- **Transaction Integrity**: Use `DB::transaction` inside Services for any multi-step data persistence.
- **Enum Usage**: Prefer domain-specific Enums in `app/Domains/{Domain}/Enums` over hardcoded strings for statuses.

## Integration with Permissions
When implementing domain logic that requires authorization, refer to the **[Permissions Skill](../permissions/SKILL.md)** for handling policies and role checks within services or actions.

## Template Reference
Refer to `assets/ServiceTemplate.php` for the preferred service structure.
