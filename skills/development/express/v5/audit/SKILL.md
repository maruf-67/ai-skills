---
name: express-v5-audit
description: Use this when implementing request-context-based auditing and actor metadata
  trails in Express v5 with Prisma or Mongoose.
type: Skill
title: express-v5-audit
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/express/v5/audit/SKILL.md
tags:
- development
- express
- v5
- audit
timestamp: '2026-06-29T19:13:46Z'
---

# Audit System

## Trigger
Use this when you need actor (user) or source IP traceability for create/update database operations.

## Best Practices
- Capture audit metadata automatically via database middleware or hooks.
- Use request-scoped context (such as `AsyncLocalStorage`) to make metadata accessible to database adapters without passing them explicitly through services.
- Record both actor identity (userID) and source IP when available.
- Keep audit field naming consistent across tables/collections (e.g., `created_by`, `updated_by`, `created_ip`, `updated_ip`).

## Stack blueprints

### Prisma Client Extensions Blueprint
Prisma client extensions (Prisma 4.7+) allow intercepting query runs to automatically inject user context:
```ts
import { PrismaClient } from '@prisma/client';
import { AsyncLocalStorage } from 'node:async_hooks';

interface AuditContext {
  userId: string;
  ip: string;
}

export const auditStorage = new AsyncLocalStorage<AuditContext>();

const baseClient = new PrismaClient();

export const prisma = baseClient.$extends({
  query: {
    $allModels: {
      async create({ model, args, query }) {
        const context = auditStorage.getStore();
        if (context) {
          args.data = {
            ...args.data,
            createdBy: context.userId,
            createdIp: context.ip,
          };
        }
        return query(args);
      },
      async update({ model, args, query }) {
        const context = auditStorage.getStore();
        if (context) {
          args.data = {
            ...args.data,
            updatedBy: context.userId,
            updatedIp: context.ip,
          };
        }
        return query(args);
      },
    },
  },
});
```

### Mongoose Schema Hook Blueprint
```ts
import { Schema } from 'mongoose';
import { AsyncLocalStorage } from 'node:async_hooks';

export const auditStorage = new AsyncLocalStorage<{ userId: string; ip: string }>();

export function auditPlugin(schema: Schema) {
  schema.add({
    created_by: String,
    updated_by: String,
    created_ip: String,
    updated_ip: String,
  });

  schema.pre('save', function (next) {
    const store = auditStorage.getStore();
    if (store) {
      if (this.isNew) {
        this.created_by = store.userId;
        this.created_ip = store.ip;
      }
      this.updated_by = store.userId;
      this.updated_ip = store.ip;
    }
    next();
  });
}
```

## Avoid
- Manually passing actor/metadata payloads through every service layer call.
- Partial implementation where only some write operations are tracked.
- Inconsistent key naming that degrades query/search capabilities.
