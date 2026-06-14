---
name: laravel-v12-permissions
description: Patterns for implementing RBAC, Permissions, and User Types. Use this for role assignment, permission checks, and authorization middleware.
---

# Laravel v12 Permissions & RBAC

This skill governs the implementation of Role-Based Access Control (RBAC) and user type management.

## Core Concepts
- **User Types**: Defined in `config/rbac.php` (e.g., `admin`, `doctor`, `patient`, `staff`).
- **Roles**: `App\Models\Role` contains roles associated with user types. Permissions are stored as a JSON/array column on the `Role` model.
- **Permissions**: Defined in Enums:
    - `Appnums\AdminPermission`
    - `Appnums\DoctorPermission`
    - `Appnums\PatientPermission`

## Implementation

### 1. Permission Constants
Use Enums to define permissions:
```php
enum AdminPermission: string
{
    case CREATE_USER = 'create_user';
    // ...
}
```

### 2. Authorization Checks
- **In Controllers**: Use `$user->can('permission_name')` or middleware.
- **In Policies**: Define policies for models (e.g., `PatientPolicy`) and check permissions.

### 3. Middleware Configuration
- **CheckUserType**: Enforces user type based on route prefix (configured in `config/rbac.php`).
- **CheckPermission**: Middleware to verify specific permissions for a route.

## Configuration (config/rbac.php)
Manage user type definitions and default route access rules here.
