# Testing Strategy

This document defines how VEERAN is tested, validated, and verified. The agent and human contributors must never stop at "the code looks correct." Automated tests, linting, build checks, and critical user flow verification are mandatory.

## 1. Testing Goals
Critical functionality verified:
- Authentication & security lockout protection against brute-force attacks.
- Cart addition, item removal, quantity updates, count/total calculation, and WhatsApp order formatting.
- Catalog data retrieval, filtering, search, and storage mutations across products, categories, and settings.
- Utility edge cases: null-safe WhatsApp links and image payload validation.

## 2. Test Types

### Unit Testing
Focuses on pure functions, data transformation, and service logic in isolation:
- `tests/authService.test.js`: Validates credential matching, signed tokens, session expiry, and brute-force lockout after 5 failed attempts.
- `tests/cartService.test.js`: Validates line item arithmetic, quantity clamping, cart clearing, and formatted WhatsApp message strings.
- `tests/dataService.test.js`: Validates CRUD mutations, memory fallbacks, and local storage state updates.
- `tests/whatsapp.test.js`: Validates URL generation, phone number digit cleaning, and URL encoding.

### Integration Testing
Validates interaction between services and UI:
- Dev server middleware persistence (`POST /api/save-data`) ensuring origin checks, payload size bounds, and correct filesystem updates.
- Protected route redirection: verifying unauthenticated requests to `/admin` redirect cleanly to `/admin/login`.

### End-to-End Testing & Manual Journeys
Critical user flows:
1. Storefront Discovery: Browse `/`, `/shop`, and `/collections`.
2. Product Selection: Navigate to `/products/:id`, select options, add to cart.
3. Cart & Conversational Checkout: Open mini-cart, verify items/prices, launch WhatsApp order link.
4. Admin Workflow: Log into `/admin`, update product pricing/stock, upload image, confirm catalog update.

## 3. Testing Tools
- Unit & Service Runner: Vitest (`vitest run`)
- Environment: Node with setup mock (`tests/setup.js`)
- Linter: ESLint 9 (`eslint .`)
- Bundler & Compiler Validation: Vite (`vite build`)

## 4. Test File Structure
```
tests/
├── setup.js                # Global localStorage mock & environment initialization
├── authService.test.js     # Master password, rate limit lockout, session tokens
├── cartService.test.js     # Cart operations, quantity updates, order text generation
├── dataService.test.js     # Product/category/settings CRUD and fallback safety
└── whatsapp.test.js        # Link construction and parameter encoding
```

## 5. Critical User Flows

### Flow 1: Customer Browsing to WhatsApp Order
1. Shopper opens `/shop` and selects category filter.
2. Shopper clicks "Luminous Cascade Sling" to view details.
3. Shopper clicks "Add to Bag".
4. Mini-cart flyout opens displaying item and current quantity.
5. Shopper clicks "Checkout via WhatsApp".
6. Expected result: Browser opens WhatsApp deep link with itemized breakdown and order total.

### Flow 2: Admin Authentication & Product Publishing
1. Store manager navigates to `/admin`.
2. System intercepts unauthenticated session and redirects to `/admin/login`.
3. Manager enters password and submits.
4. Dashboard loads; manager selects "Products" and clicks "Add Product".
5. Manager enters name, price, category, and uploads product image.
6. Canvas automatically compresses image to WebP/JPEG (<150KB).
7. Manager saves product.
8. Expected result: Product appears immediately in catalog, saved to storage, and confirmed via toast.

## 6. Coverage Targets
Practical Targets:
- Services & Business Logic: >= 90% coverage
- Utility Functions: >= 95% coverage
Prioritize:
1. Authentication & Security Lockout
2. Cart Totals & Pricing Calculations
3. WhatsApp Deep-Link Format Precision
4. Catalog Data Mutations & Storage Fallbacks

## 7. Commands
Run unit tests:
```bash
npm test
```
Run linter:
```bash
npm run lint
```
Build for production:
```bash
npm run build
```
Preview production build:
```bash
npm run preview
```

## 8. Definition of Done
The task or release is complete when:
- [x] All automated tests pass (`npm test` returns 0 failures)
- [x] Production build succeeds without errors (`npm run build`)
- [x] Linter passes with 0 errors (`npm run lint`)
- [x] Critical user journeys manually verified
- [x] No sensitive secrets or passwords exposed in code or commits
- [x] Documentation reflects actual implemented behavior
