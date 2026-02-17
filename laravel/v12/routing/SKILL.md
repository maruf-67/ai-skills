---
name: laravel-v12-routing
description: Patterns for defining API routes, versioning, and middleware configuration in Laravel v12. Use this for adding or modifying endpoints.
---

# Laravel v12 Routing & Middleware

This skill governs the structure and configuration of API routing and middleware in Laravel v12.

## Structure
- **Route Files**: `routes/api.php` (API routes), `routes/web.php` (Web routes).
- **API Versioning**: Use prefixing (e.g., `api/v1`).
- **Route Groups**: Group routes logically (e.g., `Auth`, `Patient`, `Doctor`, `Admin`) and apply relevant middleware.

## Configuration (bootstrap/app.php)
- **Middleware Registration**: Register global middleware and aliases here.
- **Route File Loading**: Load route files via `Application::configure()->withRouting()`. 

## Implementation

### 1. API Route Definition
```php
Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('login', [AuthController::class, 'login']);
        // ...
    });
    
    Route::middleware(['auth:sanctum', 'CheckUserType:doctor'])->prefix('doctor')->group(function () {
        // Doctor routes
    });
});
```

### 2. Middleware Usage
- **Sanctum Authentication**: Use `auth:sanctum` for secure API routes.
- **User Type Checks**: Use `CheckUserType:type` middleware to restrict access based on user type.
- **Permission Checks**: Use `CheckPermission:permission` middleware for granular control.

**See also**: [Permissions Skill](../permissions/SKILL.md) for detailed role and permission configuration.

## Best Practices
- **Named Routes**: Use names for route generation (though typically less critical for APIs).
- **Resource Controllers**: Use resource controllers where appropriate (e.g., `apiResource`).
- **Versioning**: Maintain version prefix (`v1`) for all API endpoints.
