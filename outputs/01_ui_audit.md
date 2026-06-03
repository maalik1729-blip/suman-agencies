# Suman Agencies — UI / UX Audit

**Auditor:** Senior UI/UX (e-commerce specialty)
**Codebase reviewed:** `src/app/*`, `src/components/*` (Next.js 15 App Router, Tailwind, Framer Motion)
**Audit scope:** Home, Products listing (PLP), Product detail (PDP), Checkout, Order status, Header / Navbar, Footer, global layout, loading state.
**Severity scale:** **Critical** (blocks conversion / breaks flow) · **High** (major friction or trust loss) · **Medium** (noticeable usability cost) · **Low** (polish).

---

# Executive Summary

The storefront has a visually polished surface — hero photography, blurred glass header, animated cards — but its **commerce fundamentals are broken or missing**. The most damaging issues are:

1. **The product listing page has no usable filters or sort UI.** A `FilterPanel` is defined in `src/app/products/page.tsx` but never rendered (`{/* Sidebar removed */}`); the top bar is also stripped down to a search input only. A 30+-product catalog without filters or sort is a Critical conversion blocker.
2. **Brand identity is inconsistent.** Domain/repo is *Suman Agencies*, metadata + footer + testimonials say *Suman Tech Automation*, body copy talks about "luxury furniture" while the GSTIN footer is for a small Tamil Nadu proprietorship. First-time users cannot tell what business this is.
3. **Trust signals are fake or broken.** Review rating bars use hard-coded widths (`72% / 12% / 6%`), social links go to `#`, the "10K+ customers / 48 cities" stats are unsourced, the invoice always renders in `$` regardless of selected currency (₹ / € / $), and the order ID is a client-side `Date.now()` slice.
4. **Checkout has no validation, no real payment integration, and a hardcoded COD fee mismatch.** Payment fields submit empty; the COD copy mentions a ₹50 fee but it is never added to the total.
5. **Mobile experience has dead controls.** The mobile filter toggle was removed (comment says so), the currency switcher is hidden on the PLP, and the PDP "Add to Cart / Bulk Order" pair is not sticky on mobile.
6. **Accessibility is below WCAG AA in multiple places** — `text-white/30`, `text-black/30`, `text-white/40` fail contrast on the chosen backgrounds; `<img>` is used everywhere instead of `next/image`; the price range filter is a single-thumb slider that mutates only the `max` value but is labelled as a range.

These are all fixable, but they need to be addressed *before* any visual polish — right now the site looks premium but behaves like a prototype.

---

# Major UX Problems

### UX-1 · `Critical` — Product listing has no filters, no sort, no category tabs

`@d:\suman-agencies\src\app\products\page.tsx:340-345` shows `{/* Sidebar removed */}` and the `FilterPanel` component (defined at lines 96–297) is never used. The top bar (lines 316–338) renders **only a search box** — the `viewMode`, `sort`, `activeCategory`, and `activeSubcategories` state variables exist but have no UI controls.

**Why it matters:** With ~30 products spanning *furniture* and *electronics*, users cannot narrow down by category, price, rating, or sub-type. They are forced to scroll the entire grid or guess search keywords. This is the single largest conversion blocker on the site.

### UX-2 · `Critical` — `TrendingCarousel` defined but never rendered on the homepage

`@d:\suman-agencies\src\app\page.tsx:236-368` defines a full Trending carousel component, but `HomePage` (`@d:\suman-agencies\src\app\page.tsx:599-608`) never includes it. Dead code on a marketing page = wasted real estate where social proof / hero products should live.

### UX-3 · `High` — Currency switcher is only available on the PDP

`@d:\suman-agencies\src\components\Navbar.tsx:149` — the currency toggle is conditionally rendered with `/^\/products\/[^/]+$/.test(pathname)`. Shoppers browsing the PLP, cart, or checkout cannot switch currency. Worse, the **invoice always renders `$` regardless of selected currency** (`@d:\suman-agencies\src\app\order-status\page.tsx:110,135,140,143`) — a critical i18n / trust bug.

### UX-4 · `High` — Cart cleared before order-status is verified

`@d:\suman-agencies\src\app\checkout\page.tsx:73-79` calls `clearCart()` synchronously then `router.push(...)` to `/order-status`. If the user refreshes the order-status page or the network request fails after `clearCart()`, the cart is gone and there is no record of the order (no backend, no localStorage of the order). Every order is effectively a one-shot.

### UX-5 · `High` — Reviews tab shows no actual reviews

`@d:\suman-agencies\src\app\products\[id]\page.tsx:357-386` renders an aggregate rating block whose bar widths are **hard-coded** (`72%`, `12%`, `6%`). No individual reviews, no review count, no submission flow. Users see a star rating with no substantiation — modern shoppers (especially Indian e-commerce users from Flipkart/Amazon backgrounds) will distrust this immediately.

### UX-6 · `High` — No variants on the PDP (size, color, material, fabric, capacity)

For furniture (sofas, chairs) and electronics (TVs, headphones), variant selection is expected. The PDP only offers a quantity stepper. Users who want a different size or finish have no path.

### UX-7 · `Medium` — "Bulk Order" CTA placed beside "Add to Cart"

`@d:\suman-agencies\src\app\products\[id]\page.tsx:246-268` — primary B2C action and secondary B2B action share equal visual weight. Most retail shoppers don't need bulk; this dilutes the primary CTA.

### UX-8 · `Medium` — Wishlist is local-only and silent

`@d:\suman-agencies\src\components\ProductCard.tsx:27, 60-69` and `@d:\suman-agencies\src\app\products\[id]\page.tsx:38, 175-184` store wishlist state in component-local `useState`. It resets on navigation, has no list page, and gives no feedback. Either remove it or implement it (context + persistence + `/wishlist` page).

### UX-9 · `Medium` — Share button on PDP is non-functional

`@d:\suman-agencies\src\app\products\[id]\page.tsx:185-190` — a share icon with no `onClick`. Click does nothing.

### UX-10 · `Medium` — No pagination / load-more / infinite scroll on PLP

All filtered products render at once. With more catalog growth this will become a performance and scanning problem.

### UX-11 · `Low` — Theme is detected three different ways across pages

`@d:\suman-agencies\src\app\page.tsx:586-596`, `@d:\suman-agencies\src\app\products\page.tsx:33-42`, `@d:\suman-agencies\src\app\products\[id]\page.tsx:42-52`, `@d:\suman-agencies\src\app\checkout\page.tsx:49-57` each set up their own `MutationObserver` on `<html>`. Should be a single `ThemeContext` consumed everywhere.

---

# Major UI Problems

### UI-1 · `High` — Brand identity is inconsistent

- `<title>` and footer: **"Suman Tech Automation — Premium Furniture & Electronics"**
- Hero copy: **"Live in Luxury"** with luxe-marketed stats
- Product mix: furniture + electronics
- Footer GSTIN line: small Tamil Nadu proprietorship ("Prop. RAJASINGH", Tirunelveli)
- Repo / domain: **"suman-agencies"**
- Theme storage key: `"suman-agency-theme"` (yet a different singular form)

A first-time visitor cannot answer "who is this company?" in 5 seconds.

### UI-2 · `High` — Color tokens are hex literals scattered across components

`#4a6fa5`, `#2d4f7c`, `#6b8fc4`, `#1a1a1a`, `#1a1d23`, `#0d1017`, `#0d0d0d`, `#141820`, `#f8fafc`, `#f5f0e8`, `#f0ece6` — all hard-coded inline. **Two different "near-black" values (`#1a1a1a` and `#1a1d23`) are used interchangeably** for body text, which causes subtle inconsistency between pages.

### UI-3 · `High` — Hero stats are duplicated and contradictory

The hero (`@d:\suman-agencies\src\app\page.tsx:122-133`) renders hard-coded stats `10K+ / 300+ / 48` while `StatsSection` (`:493-515`) renders an animated CountUp from the `stats` data array further down the page. Same data shown twice with potentially different numbers.

### UI-4 · `Medium` — Marquee band adds noise

`@d:\suman-agencies\src\app\page.tsx:151-176` — an auto-scrolling banner of 8 generic claims ("Premium Quality", "Eco-Friendly"…) sits between hero and product grid. It is purely decorative, hurts content scanability, and is animation-heavy on mobile.

### UI-5 · `Medium` — Inline `style={{}}` mixed with Tailwind utilities

Most components mix `className` Tailwind tokens with `style={{ background, boxShadow, ... }}` inline overrides. This makes theme-switching inconsistent (some elements respond to dark mode, some don't) and fights Tailwind's purge.

### UI-6 · `Medium` — Footer "Privacy Policy" / "Cookie Policy" / Careers / Press / social icons all link to `#`

`@d:\suman-agencies\src\components\Footer.tsx:33-61, 168-174`. The bottom row even links to "Privacy Policy" again as `#` while the side column links to the real `/privacy-policy` route. Trust killer.

### UI-7 · `Low` — Logo subtitle is unreadable

`@d:\suman-agencies\src\components\Navbar.tsx:112` uses `text-[9px]`. Below readable threshold even on retina displays.

---

# Homepage Issues

| ID | Severity | Issue |
|---|---|---|
| H-1 | High | No clear value proposition — "Discover curated furniture and smart electronics that transform houses into extraordinary homes" is generic and doesn't say *for whom* or *why us*. |
| H-2 | High | `TrendingCarousel` is dead code (UX-2). |
| H-3 | High | Hero stats duplicate the StatsSection (UI-3). |
| H-4 | Medium | Hero CTAs ("Shop Collection" + "Our Story") give no urgency or differentiation. No discount, no "free delivery" overlay despite the brand promise. |
| H-5 | Medium | "Free White-Glove Delivery on orders above ₹25,000" copy in `WhyChooseUs` contradicts the PDP guarantee block which says "Free Delivery" unconditionally. |
| H-6 | Medium | No category entry tiles on the homepage — users must enter via "Shop Collection" → all products. Furniture vs. Electronics is the most important taxonomic split and it's invisible until the PLP. |
| H-7 | Medium | Marquee band (UI-4). |
| H-8 | Low | Testimonials don't include avatars, location, product purchased, or date — feels generated. |
| H-9 | Low | Hero scroll indicator says "Scroll" but the page is already scrollable; redundant on touch devices. |

---

# Product Listing Page Issues

All P-numbered items are in `@d:\suman-agencies\src\app\products\page.tsx`.

| ID | Severity | Issue |
|---|---|---|
| P-1 | **Critical** | `FilterPanel` is defined (96–297) but never rendered (line 344). |
| P-2 | **Critical** | No sort dropdown / view-mode toggle / category chips — `sort`, `viewMode`, `activeCategory` state variables are dead. |
| P-3 | High | No active-filter chips, no result count beyond `{products.length}+` in the header (which counts the **total** catalog, not the **filtered** result). |
| P-4 | High | Empty state (348–354) "🔍 No products found" — but with no filters visible, the user can't understand *why* and the "Reset Filters" button is misleading because there are no filters to reset. |
| P-5 | High | `?category=furniture` URL param sets state once on mount but is then untracked — back/forward navigation, refresh after toggling subcategories, or sharing a filtered URL all break. Should sync filter state to URL. |
| P-6 | Medium | Price slider is a **single thumb** (`@:166-174`) but mutates only `priceRange[1]` while the panel labels show the pair "min — max". The lower bound is never user-controllable. |
| P-7 | Medium | Page header `pt-28` + sticky bar `top-16` (`@:317`) — depending on scroll position, the sticky bar can sit beneath the floating glass navbar. Verify z-index/offset. |
| P-8 | Medium | Search input has no debounce and re-runs the entire `useMemo` on every keystroke. With a small dataset it's fine; with a few hundred products the typing UX will drag. |
| P-9 | Medium | List view rendered (377–391) but not toggleable — `viewMode === "list"` branch is unreachable from the UI. |
| P-10 | Low | Sub-category checkboxes use a custom div + label pattern (260–290). Keyboard users cannot toggle with space because the click handler is on a `<div>`, not the `<input>`/`<label>`. |

---

# Product Detail Page Issues

All in `@d:\suman-agencies\src\app\products\[id]\page.tsx`.

| ID | Severity | Issue |
|---|---|---|
| PD-1 | **Critical** | Reviews tab uses hard-coded fake bar widths (UX-5). |
| PD-2 | High | No variant selector (size/color/material) (UX-6). |
| PD-3 | High | No sticky Add-to-Cart on mobile — the CTA is only visible at the top of the right column; on mobile after scrolling to specs/reviews the user must scroll back up. |
| PD-4 | High | "Add to Cart" success state (260) shows a green button for 2.5 s then reverts — there is no path to "View Cart" or "Checkout" inline. Users who add an item must hunt for the cart icon in the navbar. |
| PD-5 | Medium | Share button is a no-op (UX-9). |
| PD-6 | Medium | "Bulk Order" sits next to "Add to Cart" with similar visual weight (UX-7). |
| PD-7 | Medium | Description tab repeats the same hero image (`product.images[0]`) — wasteful when there are multiple images available. |
| PD-8 | Medium | Quantity has no upper bound — user can set quantity to 9999. |
| PD-9 | Medium | Discount badge stacks under the product badge (`top-4 left-4` and another at line 132 `top-4 right-4` and the card uses `top-10 left-3` for discount). Inconsistent badge anchor between PDP and ProductCard. |
| PD-10 | Low | Thumbnail row uses inline `style={{ width: 72, height: 72 }}` and Tailwind `w-18 h-18` (which doesn't exist by default) — relying on inline override is fragile. |
| PD-11 | Low | Breadcrumb truncates the product name to 150 px (line 95) but offers no tooltip or `title` attribute. |

---

# Checkout Flow Issues

All in `@d:\suman-agencies\src\app\checkout\page.tsx`.

| ID | Severity | Issue |
|---|---|---|
| C-1 | **Critical** | No validation on any payment field. User can click "Confirm & Pay" with empty card / UPI fields and the order succeeds (line 286, no field check; only `placing` flag matters). |
| C-2 | **Critical** | No real payment integration. `handleConfirm` is `setTimeout(1800)` then a redirect (73–79). |
| C-3 | High | COD copy mentions a ₹50 handling fee on orders < ₹999 (278–280) but the fee is **never added to `totalPrice`**. The total displayed always equals subtotal. |
| C-4 | High | "State" field is optional (`isStep1Valid` does not require it, line 71) but real Indian addresses always include state, and shipping/tax depends on it. |
| C-5 | High | No pincode → city/state autofill, no pincode validation, no "we don't ship to this pincode" check. |
| C-6 | High | No GST input for B2B orders even though the brand markets "Bulk Enquiries". |
| C-7 | Medium | No order summary edit/return-to-cart link in the right column — user must use the "Back to Cart" link in the header which is text-only. |
| C-8 | Medium | Stepper only has 2 steps but takes ~280 px width (`max-w-xs`) with disconnected labels — visually weak; users don't realize how short the flow actually is. Add a "Review" preview step or condense. |
| C-9 | Medium | UPI app chips ("GPay / PhonePe / Paytm", lines 263–265) look interactive but are plain `<div>`s with hover styles only — clicking them does nothing. |
| C-10 | Medium | Order ID generated client-side `LUX-${Date.now().slice(-6)}` (line 76) — collisions trivial, refresh-resistance zero. |
| C-11 | Medium | No "Save my details for next time" option, no logged-in account, no guest-checkout indicator. |
| C-12 | Low | Card number formatting (line 239) inserts spaces every 4 digits but doesn't pass Luhn check. |

---

# Order Status Page Issues

All in `@d:\suman-agencies\src\app\order-status\page.tsx`.

| ID | Severity | Issue |
|---|---|---|
| OS-1 | **Critical** | Invoice and on-page "Amount Paid" always render `$` (lines 110, 135, 140, 143, 220) regardless of the user's selected currency context. A Tamil Nadu shopper paying in INR sees a dollar sign on their tax invoice. |
| OS-2 | High | No persistence — refreshing the page or visiting `/order-status` directly shows `LUX-000000`, $0, "UPI" defaults (lines 29–31). The user has no way to retrieve their order later. |
| OS-3 | High | Tracking line progress is a hard-coded `35%` (line 245) and step `done` flags are static. Not real tracking. |
| OS-4 | Medium | Invoice line items are a single placeholder row "Your Order Items" (130–136) — the cart is already cleared by the time the invoice generates so there are no items to render. Should snapshot the order *before* `clearCart()` (also fixes UX-4). |
| OS-5 | Medium | Page does not show the delivery address the user just entered. |
| OS-6 | Medium | "Continue Shopping" + "Download Invoice" — no "Track Order", "Email Receipt", or "Contact Support" actions. |
| OS-7 | Low | "Just now" / "Processing at warehouse" / "Expected in 2–3 days" are static text strings, never updated. |

---

# Header, Footer & Navigation Issues

| ID | Severity | Issue |
|---|---|---|
| N-1 | High | Currency switcher hidden outside PDP (UX-3). |
| N-2 | High | "Bulk Enquiries" is a desktop-only button (`hidden md:inline-flex`, `@d:\suman-agencies\src\components\Navbar.tsx:203`). Mobile menu *does* include it (272–281), but it is the **last** item, easy to miss. |
| N-3 | Medium | No global search in the header — discovery depends on going to `/products` and using its (limited) search box. |
| N-4 | Medium | Cart badge displays `9+` for >9 items but is only 16 px square with 10 px font — looks cramped at high item counts. |
| N-5 | Medium | Mobile menu does not show the cart count or the theme toggle (only desktop right-actions area does); on a phone the user has to close the menu to see them. |
| N-6 | Medium | Footer dark color (`bg-[#1a1a1a]` / `bg-[#0d0d0d]`) is the same across light and dark themes (`@d:\suman-agencies\src\components\Footer.tsx:64-67`) — in light mode the page goes from `#f8fafc` straight into a near-black footer with no transition. |
| N-7 | Medium | Footer renders two emails (`sumantechautomation@gmail.com` and `sumanagency4@gmail.com`) without context for which one to use. |
| N-8 | Low | The brand logo SVG (a stylized house) makes sense for furniture but not electronics — and is duplicated inline in both Navbar and Footer instead of being a shared `<Logo />` component. |
| N-9 | Low | Bottom-row footer links ("Privacy Policy", "Terms of Service", "Cookie Policy") all go to `#` despite the upper section linking correctly to `/privacy-policy` etc. |

---

# User Friction Points

Ordered by where the funnel breaks:

1. **Landing → Browse:** generic value prop, no category tiles → user lands but doesn't know which path to take.
2. **Browse:** PLP has only a search box → user with intent to browse gives up or scrolls aimlessly.
3. **PDP → Cart:** "Added to Cart" green flash with no path to checkout → user has to spot the navbar cart icon.
4. **Cart → Checkout:** cart drawer not reviewed in this audit but `setIsOpen(true)` from navbar is the only entry point — no `/cart` page for a full review/edit step.
5. **Checkout:** field validation absent → users can submit empty payment details and "succeed", which then shocks them later when nothing actually happened.
6. **Post-purchase:** order is unrecoverable on refresh → user feels they lost the order.

---

# Visual Hierarchy Problems

1. **Price is not consistently dominant.**
   - PDP: 4xl `text-[#4a6fa5]` (good).
   - PLP grid card: `text-base` (`@d:\suman-agencies\src\components\ProductCard.tsx:118`) — only 16 px, smaller than the product title. Price should be the loudest element on a card.
   - Order summary in checkout: `text-xs` for line item totals (`@d:\suman-agencies\src\app\checkout\page.tsx:319`) — too small for a verification surface.
2. **CTAs and decorative chrome compete.** The wishlist heart, product badge, and discount badge all crowd the upper corners of the product card image. The eye doesn't know where to land.
3. **Section eyebrows look like CTAs.** `text-xs uppercase tracking-widest text-[#4a6fa5]` is used for "Our Collection", "Trending Now", "Testimonials" — but the same color and similar sizing is used for active link underlines and sub-category labels. Eyebrow-vs-link distinction is lost.
4. **Stat counters dominate over actual product content.** The full-width gradient `StatsSection` (lines 493–515, 6xl numbers, 24 vh tall) outranks the testimonials and the (missing) trending carousel visually, even though the stats are unverified marketing claims.
5. **Trust block on PDP is a thin row at the bottom of the right column** (Free Delivery / Warranty / 30-Day Returns, lines 271–282) — these are conversion-critical signals and deserve to sit *next to* the price, not below the CTAs.

---

# Typography Problems

1. **No defined type scale.** Headings jump 5xl/4xl/3xl/2xl/lg/sm without a consistent ratio; eyebrows are `text-xs`, `text-[11px]`, and `text-[9px]` interchangeably.
2. **Mixed use of `font-serif`.** Some headings use it (hero `h1`, section `h2`s, PDP price), others don't (PDP `h1` does, but PLP `h1` also does — yet inline `<h3>` on the trending carousel uses serif while testimonial author names don't). No documented rule.
3. **Body text colors fail readable contrast** in several places: `text-white/30`, `text-black/30`, `text-white/40`. On dark background `rgba(255,255,255,0.3)` over `#0d1017` is roughly 3.4:1, below WCAG AA 4.5:1.
4. **Number-heavy content lacks tabular figures.** Prices, quantities, and stat counters use the default proportional figures — alignment in the order summary is wobbly.
5. **Line lengths uncontrolled.** PDP description (`@:320`) and policy pages can stretch the full column width — at lg+ that's 600+ px, beyond the 50–75 ch comfort range.
6. **`text-[9px]` and `text-[10px]` are below recommended minimums** (12 px) for sustained reading.

---

# Accessibility Problems

| ID | Severity | Issue |
|---|---|---|
| A-1 | High | All product images use `<img>` (Navbar logo, hero, product cards, PDP gallery, checkout summary) — no `next/image`, inconsistent `loading="lazy"`/`fetchPriority`, and missing intrinsic dimensions cause CLS. |
| A-2 | High | Color contrast: `text-white/30`, `text-black/30`, `text-white/40`, `text-white/50` over the chosen backgrounds frequently fall under 4.5:1. Audit with a contrast checker. |
| A-3 | High | Custom checkbox in `FilterPanel` (`@d:\suman-agencies\src\app\products\page.tsx:260-290`) is a `<div>` with `onClick` — not keyboard-operable, no focus ring, no `role="checkbox"`/`aria-checked`. |
| A-4 | High | Range slider (`@:166-174`) is single-thumb but UI implies a min-max range — assistive tech announces only `priceRange[1]`. |
| A-5 | High | No skip-to-content link in the layout. |
| A-6 | Medium | `<input type="search">` on PLP has only a placeholder, no `<label>` (`@:323-330`). |
| A-7 | Medium | Mobile menu uses `aria-expanded` on the hamburger but the menu container has no `id` and the hamburger no `aria-controls`. |
| A-8 | Medium | Tab list on PDP (`@:289-306`) is plain `<button>`s — should expose `role="tablist"` / `role="tab"` / `aria-selected`. |
| A-9 | Medium | Step numbers in the checkout stepper are visual-only; screen reader users hear "1 2" with no "Step 1 of 2: Order Details". |
| A-10 | Medium | Decorative SVG logos and icons mostly lack `aria-hidden="true"`. |
| A-11 | Medium | Theme toggle has `aria-label="Toggle theme"` but does not announce the *current* theme — should be `aria-label={\`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme\`}`. |
| A-12 | Low | Focus outlines rely on browser defaults; many custom buttons set `transition-all` and rounded shapes that don't render a visible ring on `:focus-visible`. |

---

# Mobile Responsiveness Problems

| ID | Severity | Issue |
|---|---|---|
| M-1 | High | PLP mobile filter access removed (`{/* Mobile Filter Toggle removed */}`, `@d:\suman-agencies\src\app\products\page.tsx:319`) — even if filters return on desktop, mobile shoppers have no way to reach them. |
| M-2 | High | PDP "Add to Cart" is not sticky on mobile (PD-3). |
| M-3 | High | Currency switcher is hidden on `< sm` even on PDP (`hidden sm:flex`, `@d:\suman-agencies\src\components\Navbar.tsx:150`). |
| M-4 | Medium | Checkout 3-column City / State / Pincode (`@d:\suman-agencies\src\app\checkout\page.tsx:169-185`) becomes 2-col on `sm` (`grid-cols-2 sm:grid-cols-3`) — at exactly 640 px it briefly cramps to 3 narrow columns; pincode field falls to a second row at smaller widths. Verify across 360 / 390 / 414 / 768 widths. |
| M-5 | Medium | Hero text scales `text-5xl sm:text-7xl lg:text-8xl` — at `lg` (1024 px+) the 8xl serif headline approaches 96 px which can overflow narrow `lg` viewports. |
| M-6 | Medium | Mobile menu does not include cart count or theme toggle (N-5). |
| M-7 | Medium | Cart badge and right-action icons (theme, cart, hamburger) bunch together at small widths — combined with the 10-px logo subtitle the navbar feels cluttered at 360 px. |
| M-8 | Medium | Footer four-column grid (`md:grid-cols-2 lg:grid-cols-5`) places brand block on top + 3 link columns side-by-side on `md` — link columns get squeezed below 768 px. |
| M-9 | Low | Stat counters (4-up grid) drop to 2-up on mobile but the `text-6xl` numbers are heavy at narrow widths. |
| M-10 | Low | Marquee animation can hit 60 fps GPU on low-end Android — consider `prefers-reduced-motion`. |

---

# Cognitive Load Analysis

**Homepage** — 7 stacked sections (Hero, Marquee, Featured Products, WhyChooseUs, Stats, Testimonials, Footer) each with their own animation, color treatment, and section eyebrow. The user has no anchor / sub-navigation and no category split. Estimated time to find "an electronics product" from a cold start: ≥ 3 scrolls + 2 clicks.

**PLP** — Counter-intuitively *too sparse*: with no filters or sort, the user has to apply mental filters while scanning, which is more cognitively expensive than offering proper UI.

**PDP** — Dense: title + eyebrow + rating + price + original price + sale badge + stock dot + quantity + Add-to-Cart + Bulk Order + 3 trust pills + tabs (description / specs / reviews) + features list + image + related products. The right column especially packs 9 distinct UI affordances above the fold.

**Checkout** — Reasonable for step 1; step 2 introduces 3 payment modes with conditional sub-forms but no progress indicator within the payment step (e.g., for card it's 4 fields, for UPI it's an ID + 3 non-functional app chips, for cash nothing) — the user can't predict effort.

**Specific cognitive overload sources:**
- Two sets of stats on the homepage (UI-3) → user re-reads thinking they missed something.
- Reviews tab with no reviews (UX-5) → user looks for the review list and gives up.
- Filter sidebar absent on PLP → user mentally compensates → fatigue.

---

# Trust & Clarity Issues

| ID | Severity | Issue |
|---|---|---|
| T-1 | **Critical** | Brand identity confusion (UI-1). |
| T-2 | **Critical** | Reviews are visualised but don't exist (UX-5, PD-1). |
| T-3 | **Critical** | Invoice currency mismatch (OS-1). |
| T-4 | High | Social links and Careers/Press links are `#` (UI-6, N-9). |
| T-5 | High | Stats `10K+ / 300+ / 48` are not sourced. For a small Tirunelveli proprietorship, "10,000 customers across 48 cities" is not credible without proof. |
| T-6 | High | Free delivery copy is contradictory between Home (₹25,000 threshold) and PDP (unconditional). |
| T-7 | High | No SSL / payment-method / Razorpay-style trust badges on the checkout page. |
| T-8 | High | No order email confirmation, no SMS confirmation, no "we will call to confirm" — the order-status page is the *only* artefact of the purchase. |
| T-9 | Medium | Two contact emails listed (N-7) without explanation. |
| T-10 | Medium | Phone numbers `+91 97155 90101 / +91 8838208741` shown as a single string instead of two clickable `tel:` links. |
| T-11 | Medium | GSTIN badge in footer is a strong trust signal — but it's small and only in the footer. Surface it on checkout / PDP too. |
| T-12 | Medium | Testimonials lack avatars, dates, location, product names, and verification cues — feel templated. |
| T-13 | Low | "30-Day Easy Returns" copy isn't reflected on the policy page route (`/cancellation-refund`) — users who click through to verify will be reading whatever that page actually says (not reviewed in detail). |

---

# Recommended Priority Fixes

### P0 — Ship before any visual redesign

1. **Restore filters and sort on the PLP** (UX-1, P-1, P-2). Render `FilterPanel` on desktop, add a mobile filter sheet, and add a sort dropdown + category tabs to the top bar.
2. **Fix invoice + order-status currency** (OS-1, T-3). Use `formatPrice` from `CurrencyContext` everywhere instead of hard-coded `$`.
3. **Snapshot the order before clearing the cart** (UX-4, OS-2, OS-4). Store the order in `localStorage` (or a real backend) keyed by `orderId` so refresh and direct visits to `/order-status?id=...` work.
4. **Reconcile brand identity** (UI-1, T-1). Decide: is it *Suman Agencies*, *Suman Tech Automation*, or one as legal entity / the other as storefront? Update metadata, header, footer, copy, and theme storage key consistently.
5. **Add real validation to checkout step 2** (C-1). Empty card / UPI fields must block submission. Even without a real payment processor, this protects users from confusion.
6. **Remove or implement the half-built features** (UX-2 trending carousel, UX-8 wishlist, UX-9 share, P-9 view mode, C-9 UPI app chips, UI-6 footer `#` links). Dead controls are worse than absent ones.

### P1 — High-impact within 1–2 sprints

7. **Reviews:** either ship a real review system (collection form + verified-purchase tag + list) or remove the reviews tab entirely (PD-1, UX-5).
8. **Mobile-first commerce primitives:** sticky Add-to-Cart on PDP, mobile filter sheet on PLP, currency switcher in mobile menu (M-1, M-2, M-3, PD-3).
9. **Variant selectors on PDP** (PD-2) — at minimum size/color for furniture and capacity/color for electronics.
10. **URL-synced filter state on PLP** (P-5) so filtered URLs are shareable / refresh-safe.
11. **Pincode → state autofill + serviceability check** (C-5).
12. **Surface trust signals at checkout** (T-7, T-11): GSTIN, payment-method icons, "Your data is secure", phone number.
13. **Deduplicate hero stats vs. StatsSection** (UI-3, H-3); pick one and ground the numbers.

### P2 — Polish + foundations

14. **Token system:** central CSS variables for `--color-brand-500`, `--color-text`, `--color-text-muted`, `--color-bg`, `--color-surface`, etc., replacing the dozen hex literals (UI-2).
15. **Single `<ThemeProvider>` + `<Logo />` shared component** (UX-11, N-8).
16. **Type scale documented** (Typography 1–2): one `font-serif` rule, one type ramp, one eyebrow style.
17. **Accessibility pass:** contrast (A-2), `next/image` adoption (A-1), proper checkbox/tab roles (A-3, A-8), skip link (A-5), `:focus-visible` rings (A-12).
18. **Performance:** swap `<img>` for `next/image`, debounce search (P-8), respect `prefers-reduced-motion` for marquee/animations (M-10).
19. **Replace placeholder footer links and `#` socials** (UI-6, N-9, T-4).
20. **Strengthen homepage IA:** add Furniture / Electronics category tiles immediately below the hero (H-6), drop the marquee (UI-4), and re-purpose that vertical space for the trending carousel.

---

**Audit complete.** This document is the foundation for `outputs/02_ux_improvement_strategy.md`, which will turn these findings into UX-flow recommendations (without visual redesign).
