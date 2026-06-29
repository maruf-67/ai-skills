---
name: laravel-v13-auditing-loggable
description: Automatic auditing and activity logging using the Loggable trait. Use
  this when creating or modifying models that need to track creation and updates.
type: Skill
title: laravel-v13-auditing-loggable
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/laravel/v13/auditing-loggable/SKILL.md
tags:
- development
- laravel
- v13
- auditing-loggable
timestamp: '2026-06-29T19:13:46Z'
---

# Laravel v13 Auditing (Loggable)

This skill enforces the usage of the `App\Traits\Loggable` trait for automatic auditing of Eloquent models.

## Implementation
Add the `Loggable` trait to any model that requires tracking of who created/updated it and from which IP.

```php
namespace App\Models;

use App\Traits\Loggable;
use Illuminate\Databaseloquent\Model;

class Clinic extends Model
{
    use Loggable;
}
```

## Database Requirements
Models using this trait MUST have the following columns in their database table:

- `created_by`: BigInteger (Foreign key to users table, nullable)
- `updated_by`: BigInteger (Foreign key to users table, nullable)
- `created_ip`: String (nullable)
- `updated_ip`: String (nullable)

## Automatic Behavior
- **Creating**: Automatically sets `created_by` to authenticated user ID and `created_ip` to client IP.
- **Updating**: Automatically sets `updated_by` to authenticated user ID and `updated_ip` to client IP.
