---
name: laravel-v13-api-responses
description: Standardized API response patterns using BaseController and JsonResponse. Use this for consistent formatting and centralized error codes.
---

# Laravel v13 API Responses

This skill enforces consistent API responses using `App\Http\Controllers\API\BaseController` and `App\Lib\JsonResponse`.

## BaseController Integration
All API controllers MUST extend `BaseController`. It provides helper methods that wrap `JsonResponse` to ensure the frontend receives a predictable structure.

### Primary Methods:
- **`sendResponse($result, $message, $code = 200, $additional = null)`**: Returns success data.
- **`sendError($error, $errorMessages = [], $code = 400)`**: Returns error details.
- **`sendWarning($message, $result = null, $code = 207)`**: Returns partial success/warnings.

## Centralized Error Codes
When returning errors, always include an `error_code` in the data array to allow the frontend to handle specific business logic errors (e.g., subscription limits).

### Common Error Codes:
- `SUBSCRIPTION_REQUIRED`: User needs an active plan.
- `TRIAL_EXPIRED`: Trial period has ended.
- `PRESCRIPTION_LIMIT_REACHED`: Monthly quota exceeded.
- `AI_LIMIT_REACHED`: Daily/Monthly AI usage limit hit.

**See also**: [Permissions Skill](../permissions/SKILL.md) for authorization-related error codes like `UNAUTHORIZED_ACCESS`.

## App Code (Internal Tracking)
`JsonResponse` supports an `app_code` parameter. When provided, the final response code is concatenated (e.g., HTTP 400 + app_code 101 becomes 400101). This is used for granular internal error tracking.

## Pagination Helper
Use `formatPaginatedResponse($paginator)` in `BaseController` to normalize Laravel paginators into a frontend-friendly format (items + pagination metadata).

```php
return $this->sendResponse(
    $this->formatPaginatedResponse($items),
    'Data retrieved'
);
```

## Authentication Integration
For responses related to login flows (e.g., OAuth callbacks), see the **[Social Login Skill](../social-login/SKILL.md)**.
