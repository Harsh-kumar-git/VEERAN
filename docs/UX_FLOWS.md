# UX Flows

This document details the actual end-to-end user journeys through VEERAN for both storefront shoppers and store administrators, including loading, error, empty, and success states.

---

## Flow 1 - Shopper Product Discovery & Purchase

### Steps:
1. Shopper lands on Homepage (`/`) and views the hero showcase, brand intro, and featured bag collections.
2. Shopper clicks "Shop Collection" or navigates to `/shop`.
3. Shopper filters by category (e.g. "Bags", "Totes") or enters a keyword into the search bar.
4. Shopper clicks on a product card to open `/products/:id`.
5. Shopper inspects high-resolution photography, artisan specifications, and pricing.
6. Shopper selects quantity and clicks "Add to Bag".
7. Mini-cart slideout opens from the right showing added item, thumbnail, quantity stepper, and subtotal.
8. Shopper clicks "Checkout via WhatsApp".
9. System generates pre-formatted order summary with line items, quantities, pricing, and total, opening WhatsApp chat with VEERAN concierge.

### State Behaviors:
- **Loading State**: Subtle skeleton blocks pulse while initial catalog data hydrates.
- **Empty State**: If search returns 0 items, displays: *"No bags found matching your criteria. Try adjusting your filters."* with a "Reset Filters" action.
- **Success State**: Adding to cart triggers gentle slideout animation and active cart badge counter update.
- **Error State**: If product ID does not exist, system smoothly redirects shopper to `/shop` with no broken page.

---

## Flow 2 - "Find Your Veeran" Interactive Bag Finder

### Steps:
1. Shopper scrolls to "Find Your Veeran" wizard on the homepage.
2. Shopper answers step-by-step preference questions:
   - Carrying style (Daily essentials, Work & tech, Weekend travel)
   - Preferred silhouette (Sling, Tote, Backpack, Satchel)
   - Preferred hardware/aesthetic.
3. System matches preferences against product attributes and category tags.
4. Recommended bags are displayed in an editorial card carousel.
5. Shopper can directly click "View Bag" or "Add to Bag".

---

## Flow 3 - Admin Authentication & Access Guard

### Steps:
1. Store administrator accesses `/admin`.
2. Protected route verifies `authService.isAuthenticated()`. If false or expired, redirects to `/admin/login`.
3. Administrator enters master passphrase.
4. On submit:
   - System validates passphrase against `VITE_ADMIN_PASSWORD`.
   - On success: signs session token with 24-hour expiry, redirects to requested destination (`/admin`).
   - On failure: logs failed attempt. If 5 failed attempts occur within 5 minutes, locks out the form for 5 minutes and displays time remaining.

### State Behaviors:
- **Lockout State**: Error alert displays: *"Account temporarily locked due to multiple failed attempts. Please try again in X seconds."* Button is disabled.
- **Success State**: Smooth transition directly into Admin Dashboard metrics.

---

## Flow 4 - Admin Product Management (Create / Edit)

### Steps:
1. Administrator navigates to `/admin/products`.
2. Administrator clicks "Add Product" button.
3. Product modal opens with input fields:
   - Product Name
   - Category (dropdown)
   - Price (INR)
   - Description
   - Image Upload (file drop or URL)
   - Featured Flag (checkbox)
   - In Stock Flag (checkbox)
4. If image file is selected:
   - File is checked for MIME type (`image/*`) and size (<10MB).
   - Image is loaded to 2D canvas, constrained to max 800px, and compressed to WebP/JPEG.
   - Real-time thumbnail preview updates.
5. Administrator clicks "Save Product".
6. System updates `localStorage` and synchronizes to `src/data/products.json` via local dev API.
7. Modal closes and success toast confirms: *"Product saved successfully"*.

### State Behaviors:
- **Loading / Processing State**: Spinner displayed on image upload while canvas compresses photo.
- **Validation Error State**: Form displays inline red highlight if name, price, or category is omitted.
- **Deletion State**: Clicking "Delete" prompts explicit confirmation modal before purging record.

---

## Flow 5 - Admin Store Settings

### Steps:
1. Administrator navigates to `/admin/settings`.
2. Administrator edits site name, contact email, or business WhatsApp phone number.
3. Administrator clicks "Save Settings".
4. Changes update globally across header brand wordmark, footer contact links, and WhatsApp checkout routing.
