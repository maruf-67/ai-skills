# Data Fetching & Services

## Service Layer Pattern

Encapsulate API logic in dedicated service files within `src/services/`. Do not make direct Axios calls in components.

### Example Service (`src/services/userService.ts`)

```typescript
import { api, unwrapResponse } from '@/lib/api';
import { User, PaginatedResponse } from '@/types';

export const userService = {
    getAll: async (page = 1, limit = 10) => {
        const response = await api.get<ApiResponse<{ users: User[] }>>('/users', {
            params: { page, limit }
        });
        return unwrapResponse(response.data, 'Failed to fetch users');
    },
    
    getById: async (id: string) => {
        const response = await api.get<ApiResponse<User>>(`/users/${id}`);
        return unwrapResponse(response.data, 'User not found');
    }
};
```

## API Configuration

Use the configured Axios instance from `@/lib/api`.

- **Interceptors**: 
  - Automatically attaches `Authorization: Bearer <token>` from cookies.
  - Handles **401/403** errors by attempting to refresh the token via `/auth/refresh`.
  - Queues failed requests during token refresh and retries them on success.
  - Redirects to `/login` if refresh fails.

### Usage

```typescript
import { userService } from '@/services/userService';

// In a component or hook
const users = await userService.getAll();
```

## Response Handling

- Use `unwrapResponse<T>(payload: ApiResponse<T>, fallbackMsg: string)` to safely extract data or throw an error.
- **Types**: Define `ApiResponse<T>` and domain types in `@/types`.
