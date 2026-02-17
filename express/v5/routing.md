# Routing & Controllers

## Routing Pattern

Routes are defined in `*.routes.ts` files and mounted in `src/routes/index.ts`.

### Central Router (`src/routes/index.ts`)
```typescript
import authModuleRouter from '../modules/auth/auth.routes.js';
// ...
const apiRouter = express.Router();
apiRouter.use('/auth', authModuleRouter);
router.use('/api/v1', apiRouter);
```

### Module Router Example
```typescript
// src/modules/auth/auth.routes.ts
const router = express.Router();
router.get('/me', authenticateToken, AuthController.getMe);
export default router;
```

## Controller Pattern

Controllers handle HTTP concerns: parsing requests, validating input, invoking services, and sending responses. They **must** be wrapped in `catchAsync`.

```typescript
import { catchAsync } from '../../common/utils/catchAsync.js';
import { sendSuccess } from '../../common/utils/response.js';
import * as AuthService from './auth.service.js';

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const userId = getRequiredUserId(req);
  const user = await AuthService.getUserById(userId);
    if (!user) throw new AppError('User not found', 404);
    
    sendSuccess(res, user, 'User retrieved successfully');
});
```

## Auth Context Extraction (Shared)
Avoid repeating `(req as any).user` patterns in each controller.

- Use shared helper: `src/common/utils/authRequest.ts`
  - `getAuthUser(req)`
  - `getRequiredUserId(req)`
  - `getUserRole(req)` / `getRequiredUserRole(req)`

This keeps controller code consistent and safer across modules.

## Response Standardization

Use `sendSuccess` helper for consistent JSON responses:

```json
{
  "status": "success",
  "message": "User retrieved successfully",
  "data": { ... }
}
```

## Validation

Use **Zod** for schema validation. Validate inputs in the controller or via a middleware validator before calling the service.

## Canonical Route Order
Use this middleware order for new endpoints:
`router -> authenticate -> authorize -> validate -> controller`
