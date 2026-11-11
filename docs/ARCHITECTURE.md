# Architecture

This document defines the technical architecture of VEERAN: component responsibilities, communication contracts, storage structures, and design rationale.

## 1. System Overview
VEERAN is a modern, high-performance client-side Single Page Application (SPA) designed for luxury artisanal bag e-commerce. It pairs an editorial consumer storefront with a secure administrative dashboard. The architecture prioritizes ultra-fast page transitions, zero external server overhead for the base storefront, resilient client-side storage, and direct conversational checkout through WhatsApp.

In development, a secure Vite local middleware API facilitates bi-directional synchronization between the browser admin interface and the repository's source JSON files (`products.json`, `categories.json`, `settings.json`).

## 2. Architecture Pattern
Pattern: Modular Client SPA with Service-Oriented Data Access Layer & Dev-Persistence API
Reason: Eliminates external database hosting dependencies and backend latency for the storefront. The entire product catalog loads instantly, enabling instant client-side filtering, sorting, and bag matching while remaining fully deployable to static edge CDNs (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## 3. Technology Stack
Frontend: React 19, React Router v7
Styling: Tailwind CSS v4, PostCSS, Lucide React icons
Animations: Framer Motion
Build Tool & Dev Server: Vite 8, Rolldown / ESBuild
Testing: Vitest
Code Quality: ESLint 9 (Flat Config), Prettier conventions
State Management: React Context API (`CartContext`), Service abstraction (`dataService`, `authService`, `cartService`)
Storage: Browser `localStorage` with seed fallback; disk-sync middleware in Vite dev mode
Hosting Target: Static CDN / Jamstack (Vercel configuration included)
Messaging & Checkout: Direct WhatsApp Business API deep linking (`wa.me`)

## 4. System Components

### Frontend (Storefront & Admin)
Responsibilities:
- Renders responsive editorial layouts, catalog grids, product detail views, and brand stories.
- Manages interactive shopping cart state with slideout mini-cart.
- Provides "Find Your Veeran" recommendation engine.
- Implements protected admin routes, credential forms, catalog CRUD, and canvas-based image resizing.

### Service Layer (`src/services/`)
Responsibilities:
- `authService.js`: Admin credential validation, session token signing, expiry verification, and brute-force lockout.
- `dataService.js`: Abstract data access layer for products, categories, and settings with safe error recovery and disk sync.
- `cartService.js`: Pure functions for cart calculations, line item manipulation, and WhatsApp deep-link formatting.

### Dev-Server Middleware (`vite.config.js`)
Responsibilities:
- Intercepts `POST /api/save-data` requests during local development.
- Validates origin, request size (max 5MB), and whitelisted JSON targets.
- Serializes updated catalog records back to disk (`src/data/*.json`).

### Data Layer (`src/data/`)
Responsibilities:
- Static baseline seeds for `categories.json`, `products.json`, `settings.json`, `reviews.json`, and `journal.json`.

## 5. Architecture Diagram

```
+-------------------------------------------------------------+
|                        BROWSER                              |
|                                                             |
|  +--------------------+         +------------------------+  |
|  |  Public Storefront |         |      Admin Portal      |  |
|  |  (Home, Shop, Bag) |         |  (Products, Settings)  |  |
|  +---------+----------+         +-----------+------------+  |
|            |                                |               |
|            +---------------+----------------+               |
|                            |                                |
|             +--------------v---------------+                |
|             |        Service Layer         |                |
|             | (cartService / dataService / |                |
|             |         authService)         |                |
|             +--------------+---------------+                |
|                            |                                |
|             +--------------v---------------+                |
|             |     Browser LocalStorage     |                |
|             |  (Client cache & persistence)|                |
|             +--------------+---------------+                |
+----------------------------|--------------------------------+
                             | (Dev Mode Sync POST /api/save-data)
                             v
+-------------------------------------------------------------+
|                      VITE DEV SERVER                        |
|  +-------------------------------------------------------+  |
|  | Middleware: Origin check + Whitelist verification     |  |
|  +---------------------------+---------------------------+  |
|                              v                              |
|                     +-----------------+                     |
|                     | src/data/*.json |                     |
|                     +-----------------+                     |
+-------------------------------------------------------------+
```

## 6. Data Flow

### Customer Browsing & Ordering Flow:
1. User loads `/shop`.
2. `dataService.getProducts()` reads catalog from memory/localStorage (falling back to seeded JSON).
3. Shopper filters by category or search term; UI updates reactively in memory.
4. Shopper clicks "Add to Bag" on a product.
5. `CartContext` invokes `cartService.addToCart(product, qty)`, updates state, and persists to `localStorage`.
6. Mini-cart flyout displays item confirmation.
7. Shopper clicks "Checkout via WhatsApp".
8. `cartService.buildCartWhatsAppLink(cart, phone)` constructs structured order text, pricing, and wa.me deep link.
9. Browser triggers WhatsApp dialog with pre-populated message.

### Admin Catalog Mutation Flow:
1. Admin enters passphrase at `/admin/login`.
2. `authService.login(pass)` verifies passphrase against env configuration, computes signed session token, and records expiry.
3. Protected route validates `authService.isAuthenticated()` and grants entry to `/admin`.
4. Admin creates/edits a product (e.g. uploading a photo).
5. `imageProcess.js` resizes image to max 800px on HTML5 canvas and converts to optimized WebP/JPEG data URL.
6. `dataService.addProduct(product)` or `updateProduct(id, data)` updates `localStorage`.
7. `dataService` sends authenticated `POST /api/save-data` with payload to Vite dev server.
8. Vite middleware validates payload and writes formatted JSON to `src/data/products.json`.
9. UI shows confirmation toast.

## 7. Project Structure
```
veeran/
├── docs/                        # Complete Blueprint Documentation Suite
│   ├── PRD.md
│   ├── DESIGN_SYSTEM.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── SECURITY.md
│   ├── CODE_STYLE.md
│   ├── TESTING.md
│   ├── UX_FLOWS.md
│   └── API.md
├── AGENTS.md                    # Coding Agent Operating Instructions
├── public/                      # Static brand assets & product photography
│   └── images/
│       └── bags/
├── src/
│   ├── components/
│   │   ├── admin/               # Admin layouts, modal, toast, protected routes
│   │   ├── home/                # Hero, BrandIntro, FindYourVeeran, FeaturedProducts
│   │   ├── layout/              # Header, Footer, Main Layout
│   │   ├── product/             # ProductCard, filters
│   │   └── ui/                  # MiniCart, Carousel, BackToTop, Checkmark
│   ├── context/                 # CartContext
│   ├── data/                    # JSON source data (products, categories, settings)
│   ├── pages/                   # Public routes (Home, Shop, ProductDetail, etc.)
│   │   └── admin/               # Admin routes (Dashboard, Products, Categories, Settings)
│   ├── services/                # authService, dataService, cartService
│   ├── utils/                   # imageProcess, whatsapp
│   ├── App.jsx                  # Main routing tree
│   ├── index.css                # Global Tailwind CSS definitions
│   └── main.jsx                 # React root mount
├── tests/                       # Vitest test suite
│   ├── setup.js
│   ├── authService.test.js
│   ├── cartService.test.js
│   ├── dataService.test.js
│   └── whatsapp.test.js
├── .env.example                 # Environment configuration template
├── .gitignore                   # Git exclusion rules
├── eslint.config.js             # Linter rules
├── package.json                 # Dependencies and scripts
├── vercel.json                  # Production SPA routing rewrite
└── vite.config.js               # Bundler config, API middleware, and test runner
```

## 8. Dependency Rules
- UI components must never directly mutate storage files or invoke filesystem operations. All interactions pass through the Service Layer (`dataService`, `cartService`, `authService`).
- Public storefront pages must not import admin-specific components or authentication tokens.
- Pure utility modules (`whatsapp.js`, `imageProcess.js`) must remain side-effect free and decoupled from React hooks.
- Sensitive environment variables are accessed strictly via `import.meta.env` with safe build defaults.

## 9. Key Technical Decisions
- **Decision**: Client-side storage with Vite local file sync over full-fledged Node/Express backend.
  - **Context**: Enables an ultra-fast, zero-maintenance, zero-cloud-cost production storefront that deploys cleanly anywhere.
  - **Alternatives Considered**: Headless Shopify, Firebase Firestore, Express + MongoDB.
  - **Reason**: Veeran's boutique catalog (tens to hundreds of artisanal products) easily fits into memory and client storage; WhatsApp checkout removes the need for complex database order states.
- **Decision**: Client-Side Canvas Image Processing (`imageProcess.js`).
  - **Context**: Admin users frequently upload multi-megabyte photos taken directly from cameras or phones.
  - **Alternatives Considered**: Raw file uploads, Cloudinary microservice.
  - **Reason**: Resizing to 800px WebP inside the browser reduces payload size by ~85% instantly without external API fees or keys.
- **Decision**: Conversational WhatsApp Checkout (`wa.me`).
  - **Context**: High-ticket artisanal lifestyle products require personal customer consultation regarding materials, customizations, and delivery dates.
  - **Alternatives Considered**: Standard multi-step checkout with payment gateway.
  - **Reason**: WhatsApp checkout reduces cart abandonment, fosters direct brand relationships, and enables personalized customer care.

## 10. Performance Considerations
- Initial catalog payloads are bundled as lightweight JSON, parsed once and cached in `localStorage`.
- Images utilize responsive styling and CSS object-fit with lazy loading.
- Client route transitions operate instantly through React Router without page refreshes.
- Vite build bundle optimization minifies JavaScript and CSS chunks for high Lighthouse scores.

## 11. Scalability Considerations
- **Catalog Growth**: Up to 1,000 products can be searched and sorted client-side within milliseconds without query lag.
- **CDN Edge Distribution**: As a static build, the site can be replicated across global CDN edges with 100% cache hit ratios for assets and HTML.
- **Future Backend Transition**: The service layer pattern allows dropping in a REST or GraphQL API replacing `dataService.js` without altering a single UI component.

## 12. Failure Scenarios
- **LocalStorage Blocked or Full**: `dataService` and `cartService` implement try/catch fallbacks; if storage quota is exceeded, in-memory state continues functioning for the session.
- **Corrupted LocalStorage Data**: Safe `JSON.parse` wrappers gracefully fall back to default seeded data instead of crashing the React tree.
- **Dev Disk Sync API Failure**: If `/api/save-data` fails (or in production where the endpoint does not exist), changes remain safely in `localStorage` and a warning is logged without interrupting the user.
- **WhatsApp Unavailable**: The order link opens in a new tab via WhatsApp Web or mobile app; fallback contact email is always accessible in the footer.
