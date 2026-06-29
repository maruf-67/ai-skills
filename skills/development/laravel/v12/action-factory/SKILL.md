---
name: action-factory
version: 1.0.0
description: 'Generates the Laravel ''Service Layer'' boilerplate: Action class, DTO,
  and Form Request in one shot. Triggers on /ai-os:laravel-action-factory.'
type: Skill
title: action-factory
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/laravel/v12/action-factory/SKILL.md
tags:
- development
- laravel
- v12
- action-factory
timestamp: '2026-06-29T19:13:46Z'
---

# Laravel Agent: Action Factory

This skill automates the creation of the standard architectural pattern for Laravel backend logic.

## Mandates
- **Logic Isolation**: All business logic must reside in the generated Action.
- **Type Safety**: Use the generated DTO to pass data into the Action.
- **Validation**: Use the generated Form Request to validate incoming API data.
- **Namespace**: Follow the modular or standard Laravel namespace as configured in the project.

## Workflow

### 1. Collect Metadata
- Identify the feature/action name (e.g., `CreateExpense`).
- Identify the input fields and their validation rules.

### 2. Generate DTO
- Create `app/DTOs/[Name]DTO.php`.
- Use readonly properties (PHP 8.2+) or private properties with getters.
- Include a `fromRequest()` static method for easy instantiation.

### 3. Generate Form Request
- Create `app/Http/Requests/[Name]Request.php`.
- Define the `rules()` and `authorize()` methods.

### 4. Generate Action
- Create `app/Actions/[Name]Action.php`.
- Include an `execute([Name]DTO $dto)` method.
- Implement the core business logic (e.g., `DB::create`).

### 5. Generate Test (Optional but Recommended)
- Create `tests/Feature/Actions/[Name]Test.php` using Pest.

## Usage
`/ai-os:laravel-action-factory [ActionName] --fields="name:string:required,amount:int:required"`

Example:
`/ai-os:laravel-action-factory CreateExpense --fields="description:string:required,amount:int:required,category_id:int:required,date:string:required"`
