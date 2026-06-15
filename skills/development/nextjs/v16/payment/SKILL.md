---
name: payment
description: Digital Library payment flow — cart, bKash checkout, entitlements. Use when implementing or modifying purchase/payment features.
---

# Payment Flow — Digital Library

## Architecture

```
BookCard → Add to Cart
  │
  ├── Guest: localStorage (dlw:guest-cart-items)
  └── Auth'd: POST /v1/front/cart/items → server-side cart
        │
        ▼
CartProvider (context + useReducer)
  │
  ├── Navbar CartPanel (slide-out)
  └── /checkout page
        │
        ├── CartSection (item list)
        ├── Payment Method (bKash badge)
        ├── Purchase Summary (subtotal + total)
        └── "Complete Purchase"
              │
              ├── checkoutService.processCartCheckout(gateway)
              │     → purchaseService.purchaseCart(gateway)
              │       → POST /v1/front/purchase/cart
              │           { gateway: 'bkash'|'mock'|'static' }
              │           + Idempotency-Key header
              │
              ├── On success:
              │     → Refresh entitlement store
              │     → Show success screen
              │     → Redirect to library
              │
              └── On error:
                    → Validate response error
                    → Show toast
```

## Cart System

### Store (`src/store/cart-store.tsx`)
- Hybrid: React Context wrapping `useReducer`
- **Guest cart**: Serialized to `localStorage` under `dlw:guest-cart-items`
- **Auth reconciliation**: On login, guest items synced to server via `cartService.addItem()`, then server cart fetched

### Operations
| Operation | Description |
|-----------|-------------|
| `addItem(content)` | Add to cart (persisted to localStorage or server) |
| `removeItem(id)` | Remove from cart |
| `clearCart()` | Clear all items |
| `checkout(gateway)` | Process checkout (defaults to `bkash`) |
| `isInCart(id, type)` | Check if item is in cart |

### Content Types
`ebook` | `audio` | `video` | `bundle`

### Cart API (Laravel)
```
GET    /v1/front/cart                 → list items
POST   /v1/front/cart/items           → add item { content_type, content_id }
DELETE /v1/front/cart/items/{id}      → remove item
DELETE /v1/front/cart/clear           → clear all
```

## Purchase Flow

### Endpoints
```
POST /v1/front/purchase          → single book { epub_book_id, gateway, currency }
POST /v1/front/purchase/cart     → cart checkout { gateway }
GET  /v1/front/purchases         → purchase history
GET  /v1/front/library           → library items
GET  /v1/front/library/entitlements → owned content IDs
```

### Idempotency
- `Idempotency-Key` header: `cart-chk-{timestamp}` or `book-chk-{bookId}-{timestamp}`
- Format: `PUR-{sha256(userId|key)[0:20]}`
- Returns `{ purchase, idempotent_replay: true }` on duplicate

### Gateway Modes
| Gateway | Usage | Behavior |
|---------|-------|----------|
| `mock` | Development | Simulates success, no payment processor |
| `static` | Development/Test | Same as mock, immediate success |
| `bkash` | Production | Initiates bKash payment flow |

## bKash Integration

### Flow
```
User purchases → POST /v1/front/purchase/cart { gateway: 'bkash' }
  → Laravel creates pending Purchase
  → Redirects to bKash for payment (off-site)
  → User completes payment on bKash
  → bKash sends webhook to POST /v1/front/payments/bkash/webhook
  → Laravel validates HMAC-SHA256 signature
  → Updates purchase to 'paid'
  → Grants entitlements
  → OR: Callback via POST /v1/front/payments/bkash/callback (auth'd)
```

### Webhook Security
- HMAC-SHA256 signature verification against `services.bkash.webhook_secret`
- Raw payload + signature header validated
- Idempotent: duplicate webhooks don't reprocess

### Laravel Webhook Handler
```
PaymentWebhookController@bkash
  → PaymentWebhookService::handleBkashWebhook()
    → Finds purchase by purchase_no
    → Checks for duplicate processing
    → Creates/updates Transaction with gateway info
    → On 'paid': updates purchase, calls GrantEntitlementsForPurchaseAction
    → Dispatches PurchasePaid event
```

## Entitlements

### Store (`src/store/entitlement-store.ts`)
- Zustand with `persist` middleware
- Caches `ownedIds` in-memory for 5 min, persisting to localStorage
- Methods: `isOwned(id, type)`, `fetchEntitlements(force)`
- Type normalization: `'ebook'` → `'epub_book'`, `'audio'` → `'audio_book'`

### Ownership Check
```tsx
const isOwned = useEntitlementStore(s => s.isOwned(book.id, 'ebook'));
// Shows "Resume" button for owned, "Add to Cart" for unowned
```

### Laravel Entitlement Service
- Cache: DB query cached 24 hours
- `getOwnedIds(user)` → `{ content_type: [id1, id2, ...] }`
- `isOwned(type, id, user)` → boolean check
- `clearCache(user)` → bust after new purchase

## Pricing Service (Laravel)
```
PricingService::resolvePrice(purchasable)
  → Checks is_free → price = 0
  → Checks offer_start_at / offer_end_at for active offers
  → Returns { list_price, offer_price?, effective_price, currency, offer_active, is_free }
```

## Key Files

### Next.js
- `src/store/cart-store.tsx` — Cart state (context + reducer)
- `src/store/entitlement-store.ts` — Owned content cache (Zustand)
- `src/services/cart.service.ts` — Cart API service
- `src/services/purchase.service.ts` — Purchase API service
- `src/services/checkout.service.ts` — Checkout orchestration
- `src/app/(main)/checkout/page.tsx` — Checkout page
- `src/types/commerce.ts` — Commerce types
- `src/lib/schemas/cart.schema.ts` — Cart Zod schemas
- `src/lib/schemas/commerce.schema.ts` — Commerce Zod schemas
- `src/shared/components/filter/BookCard.tsx` — Book card with add-to-cart
- `src/shared/layouts/navbar/cart-panel.tsx` — Navbar cart panel

### Laravel
- `app/Domains/Purchases/Services/CartService.php` — Cart business logic
- `app/Domains/Purchases/Services/PurchaseService.php` — Purchase logic
- `app/Domains/Purchases/Services/PricingService.php` — Price resolution
- `app/Domains/Purchases/Services/PaymentWebhookService.php` — bKash webhook
- `app/Domains/Purchases/Services/BkashPaymentVerificationService.php` — Callback verification
- `app/Domains/Purchases/Services/EntitlementService.php` — Entitlement checking
- `app/Domains/Purchases/Actions/CreateCheckoutPurchaseAction.php` — Single purchase
- `app/Domains/Purchases/Actions/CreatePurchaseFromCartAction.php` — Cart purchase
- `app/Domains/Purchases/Actions/GrantEntitlementsForPurchaseAction.php` — Grant access
- `app/Domains/Purchases/Models/Purchase.php` — Purchase model
- `app/Domains/Purchases/Models/Transaction.php` — Transaction model
- `app/Domains/Purchases/Models/Entitlement.php` — Entitlement model
- `routes/api/v1/front.php` — Route definitions
