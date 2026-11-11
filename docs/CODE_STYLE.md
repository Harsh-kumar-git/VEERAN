# Code Style & Conventions

Keep generated and hand-written code consistent, readable, and robust across the VEERAN codebase.

## 1. General Principles
- **Readability Over Cleverness**: Code is read far more often than written; prefer clear control flow over obscure one-liners.
- **Single Responsibility**: Keep React components and service functions focused on a singular concern.
- **Avoid Unnecessary Abstractions**: Build what is required now; don't over-engineer hypothetical micro-frameworks.
- **Reuse Established Patterns**: Leverage existing services (`dataService`, `cartService`, `authService`) and UI components (`ProductCard`, `Modal`, `Toast`).
- **Consistency Over Novelty**: Match existing Tailwind color classes, component conventions, and file organization.

## 2. Naming
Components: PascalCase (e.g., `ProductCard.jsx`, `MiniCart.jsx`, `FeaturedProducts.jsx`).
Functions: camelCase (e.g., `getWhatsAppLink`, `buildCartWhatsAppLink`, `addToCart`).
Variables: camelCase (e.g., `currentPrice`, `selectedCategory`, `cartTotal`).
Constants: UPPER_SNAKE_CASE for global module constants (e.g., `AUTH_KEY`, `MAX_ATTEMPTS`, `LOCKOUT_MS`).
Files:
- React components: PascalCase with `.jsx` extension (e.g., `ProductDetail.jsx`).
- Utilities & services: camelCase with `.js` extension (e.g., `authService.js`, `imageProcess.js`).
- Test files: `[name].test.js` under `tests/`.
Database/Storage Keys: `veeran_[entity]` (e.g., `veeran_products`, `veeran_cart`).
API Routes: kebab-case with `/api/` prefix (e.g., `/api/save-data`).

## 3. Folder Structure
- `src/components/`: Modular UI pieces categorized by domain (`admin/`, `home/`, `layout/`, `product/`, `ui/`).
- `src/context/`: Global React context providers (`CartContext.jsx`).
- `src/data/`: Static baseline JSON catalogs and store configurations.
- `src/pages/`: Route-level entry points (`Home.jsx`, `Shop.jsx`, `ProductDetail.jsx`, `admin/*`).
- `src/services/`: Pure business logic, persistence abstraction, and external communication.
- `src/utils/`: Generic helper utilities (`whatsapp.js`, `imageProcess.js`).
- `tests/`: Automated test suites and setup files.
- `docs/`: Comprehensive project documentation.

## 4. Imports
Order of imports:
1. External React core and third-party libraries (`react`, `react-router-dom`, `lucide-react`).
2. Internal layouts and UI components.
3. Internal services and business logic.
4. Internal utilities and helpers.
5. Static assets, JSON seeds, and styling.
Always remove unused imports before delivering changes.

## 5. Components
Components should:
- Export a single default component per file matching the filename.
- Keep JSX clean and readable by breaking down large sections into sub-components.
- Use explicit prop destructuring where applicable.
- Leverage Tailwind utility classes consistently, adhering to the Stone neutral scale.
- Maintain controlled state for interactive elements.

## 6. Functions
Functions should:
- Perform one logical operation with clear naming.
- Keep parameters concise and declare sensible defaults.
- Avoid mutation of incoming arguments (return new copies for state immutability).
- Avoid deeply nested callback pyramids.

## 7. Error Handling
- Use structured `try / catch` blocks around all storage access (`localStorage`), JSON parsing, and network requests.
- Never let unhandled promise rejections bubble to the user.
- Provide human-friendly toast or banner notifications when asynchronous tasks fail.
- Preserve system stability through sensible fallbacks (e.g., fall back to seeded JSON if storage read fails).

## 8. Comments
- Explain **why** non-obvious architecture or tradeoffs exist, not what self-explanatory code is doing.
- Document edge cases, security requirements, and intentional design constraints.
- Avoid stale or obsolete TODO comments.

## 9. Logging
- Dev logging: Use `console.warn` or `console.error` only for unexpected operational conditions.
- Production: Do not leave extraneous `console.log` statements in customer-facing builds.
- Never log passwords, tokens, API keys, or customer phone numbers.

## 10. Formatting & Tooling
- Formatter: Prettier conventions (2-space indentation, single quotes for JS, trailing commas where appropriate).
- Linter: ESLint 9 (`eslint.config.js`) configured for React, Hooks, and Refresh.
- Test Runner: Vitest (`npm test`).
- Type Checking: React PropTypes / standard JSX contracts.

## 11. Do
- Re-use existing patterns from the codebase.
- Keep changes focused, small, and verified.
- Write tests whenever creating or modifying service logic.
- Remove dead code, commented-out blocks, and unused dependencies.

## 12. Don't
- Do not create duplicate helper utilities that already exist in `src/utils` or `src/services`.
- Do not introduce heavy dependencies when lightweight solutions suffice.
- Do not bypass security boundaries or hard-code credentials.
- Do not edit unrelated files during focused feature implementations or bug fixes.
