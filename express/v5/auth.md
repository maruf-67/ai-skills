# Authentication & Security

## JWT Authentication

The system uses a Dual-Token system (Access + Refresh Tokens).

-   **Access Token**: Short-lived (e.g., 15-60 mins). Sent in `Authorization: Bearer` header or Cookie.
-   **Refresh Token**: Long-lived (30 days). Stored in `httpOnly` cookie (`refreshToken`).

### Middleware (`src/common/middlewares/authMiddleware.ts`)

1.  **authenticateToken**: 
    -   Extracts token from Header or Cookie.
    -   **Optimization**: Checks **Redis Cache** for `user:{id}` to skip DB lookup.
    -   **Security**: Checks **Blacklist** (Redis) to ensure token hasn't been revoked.
2.  **optionalAuth**:
    -   Similar logic but does not throw if token is missing/invalid.

## Social Login (OAuth2)

Implemented via **Passport.js** with `passport-google-oauth20`.

### Flow
1.  **Route**: `GET /api/v1/auth/google` triggers consent screen.
2.  **Callback**: `GET /api/v1/auth/google/callback`.
3.  **Session Exchange Pattern**:
    -   Instead of sending tokens in the URL (insecure), the server generates a temporary `loginState` (UUID).
    -   Stores `access_token` and `user` in memory (`loginSessionStore.ts`) keyed by `state`.
    -   Redirects to frontend: `${FRONTEND_URL}/auth/callback?state={state}`.
    -   Frontend calls `POST /api/v1/auth/exchange-login-state` with `state` to retrieve tokens securely.

## Security Headers (Helmet)

configured in `app.ts` with strict **Content Security Policy (CSP)**:
-   `img-src`: Self, Data, Google Maps.
-   `script-src`: Self, Google Maps.
-   `connect-src`: Self, Socket.IO, Google APIs.

## CORS

Custom middleware handles CORS to support credentials and dynamic origin matching against `FRONTEND_URL` and `API_URL`.

## Controller Auth Extraction (Project-Aligned)

Avoid repeating `(req as any).user` in controllers.
Use shared helper utilities from `src/common/utils/authRequest.ts`:

- `getAuthUser(req)`
- `getRequiredUserId(req)`
- `getUserRole(req)` / `getRequiredUserRole(req)`
- `getAuthToken(req)`

This keeps auth extraction consistent and lowers type drift across modules.

## Do / Don’t

### Do
- Keep auth and ownership enforcement server-side.
- Keep token cookies secure and domain-aligned.

### Don’t
- Put sensitive tokens directly in redirect URLs.
- Re-implement auth extraction logic in each controller.