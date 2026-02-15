# Database & Models

## MongoDB & Mongoose

The project uses **MongoDB** with **Mongoose** ODM.

-   **Connection**: `src/config/db.ts` handles the connection logic.
-   **Models**: Mongoose models are defined within their respective modules (e.g., `src/modules/auth/user.model.ts`).

## Model Definition Pattern

Models use strict TypeScript interfaces and schema definitions.

```typescript
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    role: 'admin' | 'user';
    // ...
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', userSchema);
```

## Shared Models

Common models used across modules (like `BlacklistedToken`) are located in `src/common/models/`.

## Caching Strategy

-   **Redis**: Initialized in `app.ts`. Used for caching auth tokens and user lookups to reduce DB load.
-   **Fallback**: If Redis is unavailable, the system gracefully falls back to direct DB queries.
-   **Utils**: `src/common/utils/optionalCache.ts` provides wrappers (`getCachedOrFetch`) to handle this transparency.
