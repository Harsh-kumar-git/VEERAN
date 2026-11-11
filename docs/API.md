# API Documentation & Contracts

This document serves as the source of truth for all API contracts, endpoints, internal service signatures, and dev synchronization protocols in VEERAN.

## Conventions
Base URL: Local development server (`http://localhost:5173`)
Authentication: Optional Bearer session token header (`Authorization: Bearer <token>`)
Versioning: URL path unversioned internal middleware
Error Format: Standard JSON object with error description:
```json
{
  "success": false,
  "error": "Error description message"
}
```
Rate Limits: In-memory client lockout (5 failed attempts locks for 300s); max payload ceiling 5MB on middleware.

---

## Endpoint - POST /api/save-data (Vite Dev Persistence Middleware)

### Purpose:
Persists updated store data (products, categories, settings) from the browser admin interface to the project source JSON files during local development.

### Required Permission:
Local origin check (`localhost` / `127.0.0.1`) or valid Admin session token.

### Headers:
- `Content-Type`: `application/json` (Required)
- `Authorization`: `Bearer v1-...` (Recommended)

### Request Body:
```json
{
  "key": "veeran_products",
  "data": [
    {
      "id": "bag_1000176910",
      "name": "Luminous Cascade Sling",
      "categoryId": "4",
      "price": 850,
      "description": "A beautifully crafted generic bag with an intricate design.",
      "imageUrl": "/images/bags/1000176910.jpg",
      "featured": true,
      "in_stock": true
    }
  ]
}
```

### Constraints & Allowed Keys:
- `veeran_categories` → Maps to `src/data/categories.json`
- `veeran_products` → Maps to `src/data/products.json`
- `veeran_settings` → Maps to `src/data/settings.json`

### Success Response:
HTTP 200 OK
```json
{
  "success": true,
  "message": "Saved to products.json"
}
```

### Error Responses:
- **HTTP 400 Bad Request**: Invalid storage key or invalid payload format.
```json
{
  "success": false,
  "error": "Invalid or unauthorized storage key"
}
```
- **HTTP 403 Forbidden**: Request origin does not originate from local development host.
```json
{
  "success": false,
  "error": "Forbidden: Untrusted origin"
}
```
- **HTTP 413 Payload Too Large**: Request body exceeds the 5MB safety limit.
```json
{
  "success": false,
  "error": "Payload Too Large"
}
```
- **HTTP 500 Internal Server Error**: Filesystem write failure.
```json
{
  "success": false,
  "error": "Disk write failure message"
}
```

### Side Effects:
Overwrites the corresponding JSON file on local disk with formatted UTF-8 indentation.

### Idempotency:
Idempotent write operation. Submitting the identical dataset multiple times produces the exact same file state.

---

## Internal Service Contracts

### `authService.js`
- `login(password: string): boolean`: Validates password, registers signed token on success, records failed attempts on failure. Throws error if locked out.
- `logout(): void`: Clears session token and expiry.
- `isAuthenticated(): boolean`: Validates token signature and expiration timestamp.
- `checkLockoutStatus(): { isLocked: boolean, remainingSeconds: number, attempts?: number }`: Returns brute-force lockout status.
- `getAuthToken(): string | null`: Retrieves current session token.

### `cartService.js`
- `getCart(): Array<CartItem>`: Returns current items in cart.
- `addToCart(product: Product, quantity?: number): Array<CartItem>`: Adds item or increments existing quantity.
- `removeFromCart(productId: string): Array<CartItem>`: Purges line item from basket.
- `updateQuantity(productId: string, quantity: number): Array<CartItem>`: Updates item count; removes item if <= 0.
- `clearCart(): []`: Empties cart.
- `getCartCount(): number`: Total quantity across all items.
- `getCartTotal(): number`: Total price in INR.
- `buildCartWhatsAppLink(cart: Array<CartItem>, phone: string): string | null`: Returns full `wa.me` deep link.

### `dataService.js`
- `getProducts(): Array<Product>`: Returns active catalog.
- `addProduct(product: Partial<Product>): Product`: Generates unique ID, appends, and synchronizes.
- `updateProduct(id: string, updates: Partial<Product>): Array<Product>`: Updates existing record.
- `deleteProduct(id: string): Array<Product>`: Removes product from catalog.
- `getCategories(): Array<Category>`: Returns product categories.
- `addCategory(category: Partial<Category>): Category`: Appends category.
- `updateCategory(id: string, updates: Partial<Category>): Array<Category>`: Updates category.
- `deleteCategory(id: string): Array<Category>`: Removes category.
- `getSettings(): StoreSettings`: Returns site name, email, and phone.
- `updateSettings(updates: Partial<StoreSettings>): StoreSettings`: Updates store settings.
