# Database & Data Model

This document serves as the single source of truth for all data structures, storage representations, schemas, naming conventions, and relationships in VEERAN.

## 1. Database Engine
Database: Browser `localStorage` (Client-side key-value document store) with static JSON seeds and Vite development persistence to disk.
Storage Medium: UTF-8 JSON serializations stored under isolated domain keys.
Seed Sources: `src/data/categories.json`, `src/data/products.json`, `src/data/settings.json`, `src/data/reviews.json`, `src/data/journal.json`.

## 2. Naming Conventions
Storage Keys: Snake_case with project prefix (`veeran_products`, `veeran_categories`, `veeran_settings`, `veeran_cart`, `veeran_admin_auth`).
Fields: CamelCase (`categoryId`, `imageUrl`, `in_stock`, `siteName`, `contactEmail`, `whatsappNumber`).
Entity Identifiers: Stringified timestamps (`Date.now().toString()`) or prefixed unique slugs (`bag_1000176910`).
Timestamps: Milliseconds epoch timestamps (`new Date().getTime()`) or ISO 8601 strings.

## 3. Schemas & Entities

### 3.1 `products` (`veeran_products`)
Purpose: Catalog of handcrafted bags and lifestyle accessories.
Columns / Fields:
- `id` (String, Required, Unique): Unique identifier (e.g. `'bag_1000176910'`).
- `name` (String, Required): Product title displayed across store.
- `categoryId` (String, Required, FK): References `categories.id`.
- `price` (Number, Required): Price in INR (integer, e.g. `850`).
- `description` (String, Required): Long-form artisanal description.
- `imageUrl` (String, Required): Path to local static image (`/images/bags/...`) or processed base64 data URL.
- `featured` (Boolean, Default: `false`): Highlights product on homepage carousel and showcases.
- `in_stock` (Boolean, Default: `true`): Inventory availability flag.

### 3.2 `categories` (`veeran_categories`)
Purpose: Product taxonomy and navigation groupings (e.g. Bags, Totes, Slings, Backpacks).
Columns / Fields:
- `id` (String, Required, Unique): Category ID (e.g. `'4'`).
- `name` (String, Required): Display name (e.g. `'Bags'`).
- `slug` (String, Required, Unique): URL-friendly kebab-case identifier (e.g. `'bags'`).
- `description` (String, Optional): Category overview text.

### 3.3 `settings` (`veeran_settings`)
Purpose: Global store metadata and contact points.
Columns / Fields:
- `siteName` (String, Default: `'VEERAN'`): Store header title.
- `contactEmail` (String, Default: `'hello@veeran.com'`): Public inquiry email.
- `whatsappNumber` (String, Required): Clean numeric phone string for order routing (e.g. `'919876543210'`).

### 3.4 `cart` (`veeran_cart`)
Purpose: Active customer shopping basket stored in customer's local session.
Columns / Fields:
- `id` (String, Required): Product ID.
- `name` (String, Required): Product name snapshot.
- `price` (Number, Required): Unit price snapshot.
- `imageUrl` (String, Required): Image URL snapshot.
- `quantity` (Number, Required): Integer >= 1.

### 3.5 `auth` (`veeran_admin_auth`)
Purpose: Authenticated admin session verification.
Columns / Fields:
- `isAuthenticated` (Boolean, Required): Session active flag.
- `token` (String, Required): HMAC-style signed token (`v1-{hash}-{timestamp}`).
- `expiry` (Number, Required): Epoch timestamp in ms when session expires.

## 4. Relationships
- `categories` → `products`: One category has many products (1:N). `products.categoryId` references `categories.id`.
- `products` → `cart`: One product can be added to cart with variable `quantity` (1:N).
- Category deletion cascade rule: In `CategoriesAdmin`, existing products tied to a deleted category are safely detached or re-assigned.

## 5. Constraints
Required Fields:
- Product: `name`, `categoryId`, `price`, `imageUrl`.
- Category: `name`, `slug`.
- Settings: `whatsappNumber`.
Unique Fields:
- `products.id`
- `categories.id`
- `categories.slug`
Value Constraints:
- `product.price >= 0`
- `cart.quantity >= 1`
- `settings.whatsappNumber` must contain at least 10 valid digits.

## 6. Indexes & Query Patterns
Given client-side memory indexing:
- Primary Key Lookup: Direct `Array.prototype.find(item => item.id === targetId)`.
- Category Indexing: Fast hash map indexing or filter: `products.filter(p => p.categoryId === catId)`.
- Search Index: Case-insensitive lowercase substring matching across `product.name` and `product.description`.

## 7. Data Validation
- String Sanitization: Product names, descriptions, and category slugs are trimmed.
- Price Normalization: Parsed to positive integers via `Math.max(0, parseInt(val, 10))`.
- Image URI Validation: Only allows paths beginning with `/images/` or `data:image/(webp|jpeg|png);base64,`.
- JSON Parse Protection: All reads are wrapped in try/catch to handle corrupt payloads without exceptions.

## 8. Soft Delete
Catalog products utilize boolean flags:
- Products can be toggled `in_stock: false` to retain data while disabling immediate purchase.
- Hard delete is supported in the admin portal with explicit user confirmation modal (`window.confirm` / `Modal.jsx`).

## 9. Auditing
- Admin sessions track creation timestamp and expiry limit (24 hours).
- Schema updates in dev mode record timestamps of write operations.

## 10. Sensitive Data
- Passwords are never stored in localStorage or database records.
- No customer PII (credit cards, billing addresses, passwords) is captured or retained on the website.
- WhatsApp phone numbers are verified numbers representing the public business contact line.

## 11. Migration Rules
1. Any modification to default catalog structures must be reflected in `src/data/*.json`.
2. Storage key versioning (`BAG_CENTRIC_RESET_KEY = 'veeran_bag_centric_reset_v2'`) ensures existing client browsers seamlessly transition from legacy schema versions without manual cache clearing.
3. Migrations must maintain backward compatibility with static exports.

## 12. Seed Data
Initial seed data includes:
- Category: `Bags` (`id: "4"`, `slug: "bags"`).
- Products: 15+ curated bags including Luminous Cascade Sling, Midnight Bloom Tote, Crimson Tide Satchel, Obsidian Grace Clutch.
- Settings: VEERAN default store name, contact email, and verified WhatsApp ordering number.
