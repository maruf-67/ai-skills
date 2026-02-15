# Project Structure

## Modular Architecture

The project follows a **Feature-Based Modular Architecture** where each domain is encapsulated within `src/modules/`.

```
src/
├── app.ts                  # App configuration (Middleware, CORS, Helmet)
├── server.ts               # Entry point (DB connection, HTTP server, Socket.IO)
├── routes/                 # Central router
│   └── index.ts            # Mounts module routers to /api/v1
├── modules/                # Feature modules
│   ├── auth/               # Auth logic (Controller, Service, User Model)
│   ├── users/              # User management
│   ├── knowledge/          # Knowledge base
│   └── ...
├── seeders/                # Database seeders (Users, Categories, etc.)
├── common/                 # Shared utilities
│   ├── middlewares/        # Custom middleware (Auth, Error, Context)
│   ├── utils/              # Helpers (Logger, Response, CatchAsync)
│   └── models/             # Shared models (e.g., BlacklistedToken)
└── config/                 # Configuration (DB, Passport, Paths)
```

## Module Anatomy

Each module typically contains:

-   `*.routes.ts`: Express router definitions.
-   `*.controller.ts`: Request handlers (parsing input, calling service, sending response).
-   `*.service.ts`: Business logic (DB interaction, complex processing).
-   `*.schema.ts`: Validation schemas (Zod).
-   `*.model.ts`: Mongoose model (sometimes shared, e.g., User in `auth`).

## Common Utilities

-   `catchAsync`: Wrapper for async controllers to handle errors automatically.
-   `AppError`: Custom error class with status codes.
-   `sendSuccess`: Standardized JSON response format.
