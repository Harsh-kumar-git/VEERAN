# Security Guidelines

Security is an essential requirement for VEERAN. This document outlines authentication, authorization, secret protection, API security, client-side safety, and upload rules.

## 1. Authentication
Authentication Provider: Built-in cryptographic token and environment-backed master credential service (`authService.js`).
Methods:
- Single-factor Master Passphrase with client brute-force rate limiter.
- Signed Session Tokens (`v1-{signature}-{timestamp}`) with 24-hour expiry enforcement.
- Rate Limiting / Lockout: After 5 failed password attempts, access is strictly locked for 5 minutes (300 seconds), preventing automated brute-force attacks.

## 2. Authorization
Roles:
- **Public Shopper**: Read-only access to catalog, collections, stories, and cart management. No admin routes or storage mutation API access.
- **Store Admin**: Read, write, update, delete rights for products, categories, and settings.
Enforcement:
- Client-side route protection via React Router `<ProtectedRoute />` guarding all `/admin/*` routes.
- In dev mode, API endpoints verify local origin (`localhost` / `127.0.0.1`) and valid payload structure.
- Public shoppers have zero route visibility into admin tools.

## 3. Secrets
- **Never Hard-Code Credentials**: Passwords and session secrets must never be committed as plain text inside source code.
- **Environment Variables**: Managed via `.env` and declared in `.env.example`.
- **Git Hygiene**: `.gitignore` strictly excludes `.env`, `.env.*`, `dist/`, and local caches.
- **Token Invalidation**: Calling `logout()` immediately purges tokens and expiry data from storage.

## 4. Environment Variables
### Public Variables (Client-Visible via Vite `import.meta.env`)
- `VITE_SITE_NAME`: Store branding title (default: `'VEERAN'`).
- `VITE_DEFAULT_WHATSAPP`: Fallback business contact phone number.

### Private / Guarded Variables
- `VITE_ADMIN_PASSWORD`: Master admin password required to unlock `/admin`.
- `VITE_ADMIN_SESSION_SECRET`: Secret seed used for signing admin session tokens.

> [!IMPORTANT]
> Always deploy with unique, high-entropy secrets in production environments. Never commit the live `.env` file to version control.

## 5. API Security
Dev Persistence API (`/api/save-data`):
- **Origin Validation**: Rejects requests whose Origin or Referer does not match localhost / 127.0.0.1 (HTTP 403 Forbidden).
- **Strict Whitelist Enforcement**: Only explicit, pre-approved keys (`veeran_categories`, `veeran_products`, `veeran_settings`) are accepted. Arbitrary filesystem path traversal attempts are rejected (HTTP 400 Bad Request).
- **Payload Size Limits**: Strict 5MB request body size cap prevents Denial of Service (DoS) memory exhaustion.
- **Type Checking**: Validates that incoming payload is valid, parsed JSON containing a non-null object or array before writing.

## 6. Data Protection
- **Zero Customer Financial PII**: No credit cards, CVVs, or bank credentials ever enter the application. Payments and billing details are arranged directly through verified WhatsApp business channels.
- **XSS Prevention**: React automatically escapes dynamic strings rendered into JSX templates. Never use `dangerouslySetInnerHTML` for user-controllable input.
- **Safe JSON Deserialization**: All `localStorage.getItem()` calls are guarded by try/catch routines to prevent client crashes from malformed storage states.

## 7. Logging
Never Log:
- Admin passphrases or raw input credentials.
- Full session signing keys.
- Customer phone numbers or personal chat transcripts.
Log:
- Failed login attempts and lockout triggers (warnings).
- Image processing and canvas rendering errors.
- Unhandled service exceptions.

## 8. File Uploads
- **File Type Validation**: Only MIME types matching `image/*` (JPEG, PNG, WebP) are accepted. Executables, scripts, and PDFs are rejected immediately.
- **File Size Ceiling**: Client enforces a strict 10MB limit prior to reading into memory.
- **Canvas Sanitization & Transcoding**: Images are loaded onto a 2D canvas, constrained to a maximum 800px on the longest dimension, and re-encoded to WebP / JPEG at 0.7 quality. This strips embedded malicious metadata (EXIF/malware) and prevents decompression bomb exploits.

## 9. Security Checklist
- [x] Authentication implemented with session token expiry
- [x] Rate limiting / lockout protects login against brute force
- [x] Protected routes enforce authentication server/client side
- [x] Secrets excluded from source code and protected via `.env`
- [x] `.gitignore` updated to block all `.env` files
- [x] 0 vulnerabilities across all npm production and dev dependencies
- [x] Origin validation and path-traversal prevention on dev API
- [x] Image uploads strictly validated for type, size (10MB), and canvas-sanitized
- [x] All storage access safe-wrapped against exceptions and XSS
