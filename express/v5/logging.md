# Logging & Error Handling

## Logging System

The project uses a robust logging stack in `src/common/utils/logger.ts`.

-   **Library**: `winston` for core logging, `morgan` for HTTP requests.
-   **Transports**:
    -   **Console**: Colorized output for development.
    -   **File**: `winston-daily-rotate-file` writes to `logs/application-%DATE%.log` and `logs/errors-%DATE%.log`.
-   **Stream**: `loggerStream` pipes Morgan output to Winston.

### Usage
```typescript
import logger from '../../common/utils/logger.js';

logger.info('User logged in', { userId: user._id });
logger.error('Payment failed', error);
```

## Error Handling

1.  **AppError**: Custom class extending `Error` with `statusCode` and `isOperational` flags.
2.  **Global Handler** (`src/common/middlewares/errorHandler.ts`):
    -   Catches all errors.
    -   Distinguishes between operational errors (validation, 404) and programming bugs.
    -   Sends formatted JSON responses.
    -   Hides stack traces in production.
3.  **CatchAsync**: Wraps async controller functions to avoid `try-catch` blocks and automatically forward errors to the global handler.

```typescript
// Controller
export const safeAction = catchAsync(async (req, res) => {
    // ... errors thrown here go to global handler
});
```
