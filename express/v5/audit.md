# Audit System

## Overview

The application implements a comprehensive audit trail for tracking data changes. This is achieved via a **Mongoose Plugin** and **Request Context**.

## Audit Plugin (`src/common/models/plugins/auditPlugin.ts`)

This plugin automatically adds audit fields to schemas and populates them during save/update operations.

### Fields
- `created_by` (ObjectId): User who created the document.
- `updated_by` (ObjectId): User who last updated the document.
- `created_ip` (String): IP address at creation.
- `updated_ip` (String): IP address at last update.

### Usage in Models

```typescript
import { auditPlugin } from '../../common/models/plugins/auditPlugin.js';

const schema = new Schema({ ... });
schema.plugin(auditPlugin);
```

### Mechanism

1. **Context Retrieval**: The plugin calls `requestContext.get()` to access the current execution context.
2. **Hooks**:
   - `pre('save')`: Sets `created_by/ip` (if new) and `updated_by/ip`.
   - `pre(['findOneAndUpdate', 'updateOne', ...])`: Intercepts update operations to set `updated_by/ip`. Handles both `$set` operators and direct updates.

## Request Context (`src/common/utils/requestContext.ts`)

To make user/IP data available to the Mongoose plugin (which runs deep in the stack), we use `AsyncLocalStorage` (or a similar context storage mechanism implied by `requestContext`).

### Middleware (`contextMiddleware`)

A middleware runs early in the request lifecycle to:
1. Extract the user (from Auth middleware).
2. Extract the IP address.
3. Store them in the request context.

This ensures that any database operation triggered by a request automatically has access to the user and IP without passing them as arguments to every service function.
