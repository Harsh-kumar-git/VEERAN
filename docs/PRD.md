# Product Requirements Document

## 1. Product Overview
Product Name: VEERAN
One-Line Description: An artisan luxury handbag and lifestyle luggage brand web application featuring editorial design, interactive bag discovery, cart management, WhatsApp direct ordering, and an administrative portal.
Product Type: E-Commerce Web Application / Brand Showcase
Primary Platform: Web (Responsive: Mobile, Tablet, Desktop)

## 2. Problem
What problem are we solving? Artisan and bespoke luxury goods often struggle with generic storefronts that fail to communicate craftsmanship, heritage, and tactile value. Customers want a refined visual story, seamless bag matching, and frictionless ordering without complicated checkout barriers.
Why does this problem matter? In premium lifestyle retail, visual trust and brand aesthetic directly determine conversion. Direct-to-consumer buyers in India and international markets favor conversational commerce (e.g. WhatsApp checkout) for personal customer service and custom order inquiries.
How are users solving this today? Generic Shopify templates, Instagram direct messages with manual quote requests, or clunky multi-step shopping carts that cause cart abandonment.

## 3. Goal
Primary Goal: Provide a lightning-fast, high-end editorial shopping experience that drives customer engagement, product discovery, and friction-free purchases via WhatsApp integration while giving brand admins total control over catalog and store settings.
Secondary Goals:
- Deliver an interactive "Find Your Veeran" recommendation wizard to help shoppers select bags suited to their lifestyle and needs.
- Provide a robust administrative dashboard with product catalog CRUD, image processing, category management, and site settings.
- Ensure zero-latency browsing through optimized client bundling, reactive state synchronization, and reliable local caching.

## 4. Target Users
### User Type 1: The Discerning Shopper (Primary Consumer)
Name: Design-Conscious Buyer
Description: Affluent or style-focused individuals looking for handcrafted, durable, and sophisticated leather and canvas bags.
Needs:
- High-fidelity product photography and material details.
- Clear pricing, dimensions, and styling inspiration.
- Easy addition to bag/cart and rapid WhatsApp checkout with customer support.
Pain Points:
- Overcomplicated checkout forms with required accounts.
- Slow-loading, cluttered e-commerce websites with intrusive popups.

### User Type 2: The Brand Curator (Admin)
Name: Store Manager & Admin
Description: Veeran brand owner or inventory manager maintaining catalog items, categories, and contact details.
Needs:
- Secure, password-protected admin portal.
- Rapid product publishing with automated image optimization and thumbnail compression.
- Real-time stock toggle and featured product promotion.
Pain Points:
- Cumbersome administrative dashboards requiring technical database queries.
- Unoptimized image uploads slowing down customer page loads.

## 5. User Stories
- As a shopper, I want to explore curated bag collections so that I can discover pieces that match my personal aesthetic.
- As a shopper, I want to use the "Find Your Veeran" quiz so that I receive targeted bag recommendations based on my daily carrying habits.
- As a shopper, I want to view detailed bag specs, materials, and artisan notes so that I can buy with confidence.
- As a shopper, I want to add items to a slideover mini-cart and submit an order via WhatsApp with pre-formatted product details and totals.
- As a brand administrator, I want to log in securely to manage products, categories, and store contacts so that catalog listings remain accurate.

## 6. Core Features
### Feature 1 - Editorial Catalog & Product Showcase
Purpose: Display handcrafted bags with filterable categories, search, sorting, and rich detail views.
User Flow: User navigates `/shop` or `/collections` → Filters by category or price/name → Clicks bag card → Views high-res images, specs, reviews, and stock availability on `/products/:id`.
Inputs: Category slug, search query, sort options.
Outputs: Filtered product grid, product detail view.
Acceptance Criteria:
- Category filtering updates product listing instantly without page reload.
- Out-of-stock badges appear when `in_stock: false`.
- Mobile drawer and responsive grid adapt smoothly to viewport width.
Edge Cases:
- No matching products found for search term displays curated empty state with reset filter CTA.
- Direct URL navigation to invalid product ID gracefully redirects to `/shop`.

### Feature 2 - Interactive "Find Your Veeran" Finder
Purpose: Interactive guided tool that recommends bags according to user preference (usage, capacity, style).
User Flow: User answers step-by-step quiz on homepage → System computes closest matching bags → Displays recommended items with quick-add actions.
Inputs: User selections across questions.
Outputs: Matched bag recommendations.
Acceptance Criteria:
- Smooth step transitions.
- Dynamically queries available catalog items matching user preferences.

### Feature 3 - Cart Management & WhatsApp Conversational Checkout
Purpose: Manage shopper cart items with real-time totals and enable one-tap WhatsApp order placement.
User Flow: User clicks "Add to Cart" → Mini-cart slides open showing item, thumbnail, quantity controls → User clicks "Order via WhatsApp" → WhatsApp opens with pre-populated order summary, items, and total.
Inputs: Product ID, quantity selection.
Outputs: Cart count badge, mini-cart modal, cart page (`/cart`), pre-formatted WhatsApp deep link (`wa.me/...`).
Acceptance Criteria:
- Quantity increments/decrements reflect instantly in cart state and localStorage.
- Phone number formats accurately strip non-digits.
- Message properly encodes currency values and product names.
Edge Cases:
- Empty cart disables WhatsApp checkout button.
- Cart items survive browser page refreshes.

### Feature 4 - Secure Administrative Portal
Purpose: Manage catalog products, categories, and business settings behind authentication.
User Flow: Admin visits `/admin` → Redirected to `/admin/login` → Submits master passphrase → Accesses dashboard metrics, product manager (`/admin/products`), category manager (`/admin/categories`), and settings (`/admin/settings`).
Inputs: Admin password, product forms (name, price, category, image upload/URL, featured/stock flags).
Outputs: Dashboard metrics, updated catalog, compressed WebP/JPEG images.
Acceptance Criteria:
- Route guards enforce authentication before rendering admin layouts.
- Rate limiter locks login attempts after 5 consecutive failures.
- Uploaded images are resized client-side to max 800px and converted to WebP/JPEG before storage.
- Storage updates persist to disk in development mode via authorized API.

## 7. Non-Goals
The following are intentionally NOT part of this version:
- Third-party payment gateway webhooks (Stripe/Razorpay backend charging). All checkout is conversational via verified WhatsApp business chat.
- User account creation, registration, and shopper password logins. Shopper data remains ephemeral and privacy-first in local cart.
- Multi-currency currency conversion server APIs. Store defaults to INR (₹) formatting.

## 8. MVP Scope
Must Have:
- Responsive, editorial storefront (Home, Shop, Collections, Product Detail, Our Story, Journal, Cart).
- Client-side cart with mini-cart flyout and localStorage persistence.
- WhatsApp order generation with product summary and pricing.
- Protected admin area with authentication, rate-limiting, and session expiry.
- Full product & category CRUD with automated image resizing/compression.
Nice to Have:
- Back-to-top floating scroll utility.
- Skeleton loading feedback during page transitions.
- Interactive "Find Your Veeran" finder tool.
Future:
- Multi-language catalog localization.
- Automated stock synchronization with external warehouse ERP.
- Customer review submission portal with moderation.

## 9. Success Metrics
Primary Metrics:
- Zero build, lint, or security vulnerability errors across codebase.
- Sub-100ms client route transitions with zero layout shifts.
- 100% WhatsApp link generation accuracy across diverse phone number formats.
Secondary Metrics:
- Admin image upload payload reduction (>70% file size reduction via WebP compression).
- Unit test suite passes 100% across critical auth, cart, and data services.

## 10. Constraints
Technical: React 19 SPA with Vite bundler, Tailwind CSS v4, Lucide icons, Vitest testing, Client LocalStorage with Vite dev API disk persistence.
Business: Zero server database costs required for initial launch; deployable as static SPA on Vercel/Netlify.
Design: High-end luxury editorial style: stone/neutral palettes, refined serif headings, subtle transitions.
Timeline: Production ready with verified security and documentation.

## 11. Assumptions
- Store operators will manage catalog items on modern desktop or tablet browsers with HTML5 Canvas support.
- WhatsApp is installed or accessible via WhatsApp Web on customer devices.
- Administrative users possess the environment-configured master password.

## 12. Open Questions
- Will cloud image hosting (e.g. Cloudinary or AWS S3) replace local/data-URL storage in future multi-admin iterations?
- Should inventory levels be numeric counters instead of boolean `in_stock` flags in Phase 2?

## 13. Definition of Done
The feature/product is complete when:
- [x] Requirements are implemented
- [x] Critical user flows work (catalog browsing, cart addition, WhatsApp checkout, admin management)
- [x] Tests pass (`npm test` 100% passing)
- [x] Build succeeds (`npm run build` exits 0)
- [x] Security requirements are satisfied (no hardcoded credentials, rate limiting, payload protection, 0 npm vulnerabilities)
- [x] Documentation is updated and aligned with code
