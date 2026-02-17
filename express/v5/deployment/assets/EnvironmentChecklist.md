# Environment Checklist (portal-api aligned)

Required runtime keys:
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `FRONTEND_URL`
- `API_URL`

Optional but recommended:
- `REDIS_URL`

Validation commands:
- `pnpm type-check`
- `pnpm lint`
- `pnpm test`
- `pnpm validate:deployment`
