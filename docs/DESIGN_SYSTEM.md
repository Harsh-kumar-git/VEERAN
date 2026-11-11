# Design System

This defines the visual language of VEERAN. It ensures visual consistency, refined editorial pacing, and luxury artisan branding across all user-facing storefront pages and administrative interfaces.

## 1. Design Direction
Style: Editorial / Minimalist Luxury / Contemporary Artisan
Mood: Grounded, tactile, serene, timeless, premium. Evokes hand-stitched leather, natural textiles, warm stone galleries, and thoughtful craftsmanship.
Design Principles:
- **Quiet Sophistication**: Let product photography and negative space speak; avoid loud badges, garish banners, or aggressive popups.
- **Tactile Honesty**: Natural material cues through warm stone neutrals, subtle border dividers, and calm micro-interactions.
- **Frictionless Utility**: High typographic clarity, intuitive cart interactions, and instant access to conversation-based checkout.

## 2. Brand
Brand Name: VEERAN
Logo: Bold serif uppercase typography with generous letter-spacing (`tracking-widest`).
Brand Voice: Restrained, poetic, artisanal, authentic, and confident. Avoid hyperbole or bargain messaging.

## 3. Color Palette
Primary: #1C1917 (Stone 900 - Deep Onyx / Charcoal)
Secondary: #44403C (Stone 700 - Deep Slate / Espresso)
Background: #FAFAF9 (Stone 50 - Warm Linen / Alabaster)
Surface: #FFFFFF (Pure White)
Surface Muted: #F5F5F4 (Stone 100 - Sand Dune)
Text: #1C1917 (Stone 900 - Primary readable text)
Muted Text: #78716C (Stone 500 - Editorial captions and secondary labels)
Border: #E7E5E4 (Stone 200 - Delicate dividers)
Success: #15803D (Emerald 700 - Confirmation and positive toast)
Warning: #B45309 (Amber 700 - Attention and stock status warnings)
Error: #B91C1C (Red 700 - Form and validation errors)

## 4. Typography
Font Family: Sans-Serif system / Inter for UI; Serif / Editorial display for headers.
Heading Font: `font-serif` (Playfair Display / Georgia / Merriweather serif fallback)
Body Font: `font-sans` (system-ui, -apple-system, sans-serif)
H1: 2.25rem - 3.75rem (36px - 60px) / font-light to font-normal / line-height 1.15
H2: 1.75rem - 2.25rem (28px - 36px) / font-light / line-height 1.25
H3: 1.25rem - 1.5rem (20px - 24px) / font-normal / line-height 1.35
Body: 0.9375rem - 1rem (15px - 16px) / font-light to font-normal / line-height 1.6
Small: 0.75rem - 0.8125rem (12px - 13px) / font-medium / tracking-wider uppercase

## 5. Spacing
Base Unit: 4px
Spacing Scale:
- 4px (`space-1`): Micro-adjustments, icon gap
- 8px (`space-2`): Compact padding, tag margins
- 12px (`space-3`): Input inner padding, badge padding
- 16px (`space-4`): Standard component gutters, mobile container padding
- 24px (`space-6`): Card inner padding, section sub-elements
- 32px (`space-8`): Standard desktop gutters, card grouping
- 48px (`space-12`): Section separation
- 64px (`space-16`): Major layout block division
- 96px (`space-24`): Hero and editorial narrative section spacing

## 6. Border Radius
Small: 2px (`rounded-sm` - Subtle, sharp luxury edge)
Medium: 4px (`rounded` - Cards and modal containers)
Large: 8px (`rounded-md` - Interactive popovers)
Pill: 9999px (`rounded-full` - Category filter chips, circular badges)

## 7. Shadows
Small: `0 1px 2px 0 rgba(0, 0, 0, 0.04)` - Subtle elevation for surface cards
Medium: `0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)` - Dropdowns, mini-cart slideover
Large: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.06)` - Lightbox modals and dialogs

## 8. Buttons
Primary Button:
- Style: Solid Stone 900 background (`bg-stone-900 hover:bg-stone-800 text-white`)
- Padding: `px-6 py-3.5 text-xs uppercase tracking-widest font-medium`
- Corner: `rounded-sm transition-colors duration-200`
Secondary Button:
- Style: Transparent with Stone 300 border (`border border-stone-300 text-stone-900 hover:border-stone-900 bg-transparent`)
- Padding: `px-6 py-3.5 text-xs uppercase tracking-widest font-medium`
Danger Button:
- Style: Red 700 background (`bg-red-700 hover:bg-red-800 text-white`) or subtle text link (`text-red-600 hover:text-red-700`)
Disabled:
- Style: `opacity-40 cursor-not-allowed pointer-events-none bg-stone-200 text-stone-500`
Loading:
- Style: Retains button geometry, replaces or prefixes label with discreet spinner / opacity transition.

## 9. Inputs
Default:
- Style: `w-full px-4 py-3 bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm rounded-sm transition-colors`
Focus:
- Style: `outline-none ring-1 ring-stone-900 border-stone-900`
Error:
- Style: `border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 bg-red-50/20`
Disabled:
- Style: `bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed`
Placeholder:
- Style: `placeholder-stone-400 font-light text-sm`

## 10. Cards
- Padding: 16px to 24px (`p-4 sm:p-6`)
- Border: `border border-stone-200/80`
- Radius: `rounded-sm`
- Background: `bg-white`
- Hover state: Subtle image scale (`scale-105 transition-transform duration-500`) with no jarring shadow shifts.

## 11. Navigation
Header:
- Sticky backdrop blur: `sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100`
- Clear brand wordmark centered or left-aligned, navigation links in uppercase spaced track (`tracking-widest text-xs`).
Sidebar (Admin):
- Fixed vertical navigation bar (`w-64 bg-stone-900 text-stone-100 min-h-screen`) with active item highlight.
Mobile Navigation:
- Slideover drawer with backdrop overlay, accessible tap targets (min 44px), and close icon.

## 12. States
Loading:
- Elegant pulse skeleton blocks (`bg-stone-200/70 animate-pulse rounded-sm`) matching target geometry.
Empty:
- Minimalist centered illustration/icon, gentle heading, explanatory copy, and clear action button ("Explore Bags").
Error:
- Non-intrusive banner or inline message with actionable recovery guidance.
Success:
- Discreet toast notification with checkmark icon auto-dismissing after 3 seconds.
Disabled:
- Clear muted styling and `aria-disabled="true"`.

## 13. Icons
Icon Library: Lucide React (`lucide-react`)
Default Size: 18px - 20px (16px for micro-actions, 24px for major triggers)
Icon Style: Thin/stroke aesthetic (stroke-width: 1.5 - 2) matching clean line geometry.

## 14. Responsive Design
Mobile: `< 640px` (Single column layout, bottom sticky bar, drawer navigation, touch gestures)
Tablet: `640px - 1024px` (Two column product grid, collapsed sidebar, responsive filters)
Desktop: `> 1024px` (Three or four column product grid, persistent layout, flyout mini-cart)
Breakpoints:
- Mobile: `sm: 640px`
- Tablet: `md: 768px`
- Desktop: `lg: 1024px`, `xl: 1280px`

## 15. Accessibility
- Use semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`, `<button>`).
- Maintain WCAG AA contrast ratio (minimum 4.5:1 for body copy against linen and white backgrounds).
- Full keyboard tab navigation support for interactive elements, modals, and drawers.
- Explicit focus indicator rings (`focus-visible:ring-2 focus-visible:ring-stone-900`).
- Meaningful `alt` text on all product photography and accessible `aria-label` attributes on icon-only buttons.
- Color is never used as the sole indicator of status or validation errors.
