# Deployment

## Ecosystem (PM2)

The application uses **PM2** for process management.

-   **Config**: `ecosystem.config.cjs` (standard) and `ecosystem-seed.config.cjs` (for seeding).
-   **Modes**: Supports cluster mode for load balancing.

## Docker

Standard `Dockerfile` is provided for containerization.

-   **Build**: `tsc` compiles TS to `dist/`.
-   **Start**: `node dist/server.js` (production) or `tsx src/server.ts` (dev).

## Environment Variables

Configuration is managed via `.env`. Key variables:
-   `PORT`
-   `MONGO_URI`
-   `REDIS_URL` (optional)
-   `JWT_SECRET`, `JWT_EXPIRES_IN`
-   `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
-   `FRONTEND_URL`, `API_URL`
