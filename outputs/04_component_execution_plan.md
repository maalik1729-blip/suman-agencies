# Suman Agencies — Component Execution Plan

**Inputs:** `01_ui_audit.md`, `02_ux_improvement_strategy.md`, `03_visual_redesign_direction.md`
**Stack:** Next.js 15 (App Router), React 19, Tailwind v4 (CSS vars + `@theme`), Framer Motion, lucide-react, custom `CartContext` / `CurrencyContext`.
**`AGENTS.md` reminder:** verify any new Next.js API in `node_modules/next/dist/docs/` before use.

Each section: file → current issue (cited line) → redesign goal → exact tasks → responsive + interaction → priority (**P0/P1/P2**).

---

# 0 · Foundation Tasks (P0)

## F-1 · Tokens in `globals.css`
File: `@d:\suman-agencies\src\app\globals.css`. Audit UI-2/UI-5.
- Define a `@theme` (Tailwind v4) / `:root` block with every token from redesign §Color & §Typography: `--color-bg/surface/surface-2/border/border-strong/text-strong/text/text-muted/text-disabled`, brand 50/100/500/600/700/900, semantic 50/500/700, radii (`--radius-sm 4 / md 8 / lg 12 / full`), shadows, `--header-height 64`, `--header-height-mobile 56`, type ramp.
- Add paired dark block under `:root[data-theme="dark"]`.
- Load **Fraunces / Inter Variable / JetBrains Mono** via `next/font/google` in `layout.tsx`, expose as `--font-display/sans/mono`.
- Tabular-nums utility on `.tabular`.
- Outcome: no hex literal in any component.

## F-2 · `ThemeContext`
Audit UX-11. Today four pages each spin a `MutationObserver` on `<html>`: `page.tsx:586-596`, `products/page.tsx:33-42`, `products/[id]/page.tsx:42-52`, `checkout/page.tsx:49-57`.
- Create `src/context/ThemeContext.tsx` with `{ theme, setTheme, resolved }`. Storage key: `suman-tech-theme` (migrate from existing `suman-agency-theme`).
- Mount once inside `ClientLayout.tsx`.
- Replace per-page observers with `useTheme()`.
- Inline `<script>` in `layout.tsx` `<head>` to set `data-theme` pre-paint (FOUC). Verify pattern in Next.js 15 docs.

## F-3 · `<Logo />`
Audit N-8 (duplicated in Navbar + Footer).
- New `src/components/Logo.tsx`, props `{ variant, size? }`. Solid `--color-brand-700` square, SVG glyph, Inter 600 16 px name. **No 9-px subtitle in DOM** — move to `aria-label` (fixes UI-7).

## F-4 · Brand sweep
Audit UI-1 / T-1. Decision (locked in strategy): user-facing brand is **Suman Tech Automation**.
- Update metadata, hero h1 ("Live in Luxury" → strategy H-1 copy), Footer brand line, About/Contact copy, theme storage key.
- Repo grep for `Suman Agencies` and `Luxe`/`Luxury`; replace.

---

# 1 · Header — `src/components/Navbar.tsx`

## Current issues
- Dual transparent/blurred state on hero scroll.
- Currency switcher only on PDP via regex `@:149-150` + `hidden sm:flex` (audit UX-3, N-1, M-3).
- Gradient "Bulk Enquiries" pill `@:203` (UI-1 visual loudness).
- Mobile menu missing cart count + theme (M-6, N-5).
- Logo subtitle 9 px `@:112` (UI-7).

## Goal (redesign §Header)
One solid 64/56-px header, always opaque, with always-visible right cluster.

## Tasks
1. Drop transparent state. Use `bg-[var(--color-bg)] border-b border-[var(--color-border)]`, height = `var(--header-height)`.
2. Right cluster on `md+`: `<Search /> · <CurrencySelect /> · <ThemeToggle /> · <CartButton />`. Remove pathname regex.
3. Mobile (`< md`): hamburger · centered logo · CartButton (badge always visible).
4. Replace gradient "Bulk Enquiries" with quiet `<Link>For Businesses →</Link>` as last nav item.
5. Mobile drawer (Radix `<Dialog>`, focus-trap, Escape, scroll-lock): search field (autofocus) → nav links → currency segmented → theme segmented → For Businesses → `tel:` + GSTIN.
6. ARIA: hamburger `aria-controls="mobile-nav"` + `aria-expanded` (fixes A-7).
7. Mount `<Logo variant="header" />`.

## Responsive
`< md` 56 px drawer; `md+` 64 px inline; `xl+` increase nav gap 24→32 px.

## Interaction
Active link: 2-px brand-500 underline, `transform: scaleX` 0→1 in 150 ms.
Focus-visible: 4-px brand-50 outer ring on every interactive.

**P0.**

---

# 2 · Footer — `src/components/Footer.tsx`

## Current issues
- Near-black bg in both themes `@:64-67` (audit N-6).
- `#` Careers / Press / social `@:33-61, 168-174` (UI-6).
- Two emails (N-7); phones crammed (T-10); duplicate Privacy `#` link `@:168-174` (N-9).

## Goal (§Footer)
Surface `--color-surface-2` warm in light / `--color-surface` in dark. Three rows.

## Tasks
1. `bg-[var(--color-surface-2)] text-[var(--color-text)] border-t border-[var(--color-border)]`.
2. Row 1 — brand & contact: `<Logo variant="footer">`, tagline, GSTIN chip (`<dl>`, mono `33DVIPR5548Q1ZN`), two `<a href="tel:">` links, single primary email, `<address>`. Move secondary email to `/contact`.
3. Row 2 — link cols: Shop · Company · Policies · Help. Real routes only — **delete** all `#` placeholders (Careers, Press, dummy socials).
4. Row 3 — legal strip: same three policy links as row 2 (no duplicate `#` Privacy).
5. Render social row only if real handles exist; pull from new `src/data/site.ts`.

## Responsive
`< md` stacked; `md` 2-col; `lg+` 5-region.

**P0.**

---

# 3 · Navigation Sub-Components

- **`Search.tsx` (P1):** Radix Dialog command palette on `md+`; mobile = drawer search field. Filters `products` array, 200-ms debounce. Hits `/products?q=`.
- **`CurrencySelect.tsx` (P0):** segmented (₹·$·€), reads/writes `useCurrency()`. Always visible.
- **`MobileNavDrawer.tsx` (P0):** Radix Dialog, 88 vw, focus-trap, route-change auto-close.
- **`CartButton.tsx` (P0):** badge cap `99+`, 18-px circle brand-500, white text. Always shows count.

---

# 4 · Homepage — `src/app/page.tsx`

## Current
Hero (with stats + scroll hint) → Marquee → Featured 8-up → Why (4-up) → Stats (4-up animated) → Testimonials (6) → Footer. Plus dead `TrendingCarousel @:236-368` (UX-2).

## Goal (§Homepage)
Hero → Trust strip → Category split (2 tiles) → Trending → Why (3) → Testimonials (3) → Final CTA strip.

## Tasks
### 4.1 Hero (P0)
- `min-h-screen` → `min-h-[78vh]`.
- 2-col grid `md+` (text left, photo right); stack `< md`.
- h1 `display-2xl` with strategy H-1 copy.
- Lead: "Free delivery in Tamil Nadu · GST invoice · 30-day returns."
- Two equal primary CTAs: `Shop Furniture` / `Shop Electronics`.
- Remove hero stats counter; remove "Scroll" chevron.
- `<img>` → `<Image priority fetchPriority="high">`.

### 4.2 Trust strip (P0)
- Replace marquee `@:151-176` with static 4-cell row, 56 px, `bg-[var(--color-surface)]`, each cell a real `<Link>`.

### 4.3 Category split (P0, new)
- Two 4:5 tiles, 50/50 `md+`. Eyebrow + `display-lg` + 4–5 sub-cat chips + "Explore →".
- `<Image sizes="(min-width:768px) 50vw, 100vw">`.

### 4.4 Render `TrendingCarousel` (P0)
- Mount it. Replace dot navigation with arrows + thin progress line.

### 4.5–4.7 (P1)
- Why: 4 → 3, drop "Concierge".
- Testimonials: 6 → 3, label "From a customer" until verified data exists.
- Final CTA strip replacing StatsSection: "Need help choosing? Call +91 97155 90101 or visit Tirunelveli showroom." — `tel:` link.

### 4.8 Removals
Hero stats, marquee, StatsSection, "Our Story" CTA, 4th Why pillar, scroll chevron.

**P0** for 4.1–4.4; **P1** for 4.5–4.7.

---

# 5 · PLP — `src/app/products/page.tsx`

## Current issues
- `FilterPanel @:96-297` defined but `{/* Sidebar removed */} @:340-345` (UX-1, P-1).
- Dead state: `viewMode/sort/activeCategory/activeSubcategories` — top bar `@:316-338` only has search (P-2).
- Single-thumb slider mislabeled as range `@:166-174` (P-6, A-4).
- `<div>` checkboxes `@:260-290` (P-10, A-3).
- No URL sync (P-5); empty state misleading `@:348-354` (P-4); mobile filter toggle removed (M-1).

## Goal (§PLP)
Sticky control bar + persistent 240-px sidebar `lg+` + mobile bottom-sheet + clean 1/2/3/4 grid.

## Tasks
### 5.1 `FilterPanel` (P0)
- Extract to `src/components/FilterPanel.tsx`.
- Render sticky 240-px sidebar `lg+`.
- **Dual-thumb slider** via `@radix-ui/react-slider` `<Slider.Range>`; `[min, max]` state; two number inputs below.
- Real `<input type="checkbox">` + `accent-[var(--color-brand-500)]` (kills A-3).
- Active filter chips at top of sidebar AND above grid.

### 5.2 Sticky control bar (P0)
Replace `@:316-338`: `[Filters · n]` button (toggles sidebar `lg+` / opens sheet `< lg`) · debounced search (P-8) · `<select>` Sort · view-mode toggle (wires up `viewMode` and reaches the dead list layout `@:377-391`, fixes P-9). Sticky `top: var(--header-height)`. Currency switcher removed (now global).

### 5.3 `FilterSheet.tsx` (P0)
Radix Dialog, bottom-sheet styled, 80 vh, draggable handle, body = `<FilterPanel>`. Pinned `[Apply (n)]` + `[Clear all]`. Restore scroll on dismiss.

### 5.4 URL sync (P1)
`useSearchParams` + `router.replace({ scroll:false })` for `category, subcategories[], priceMin, priceMax, sort, view, q`. Hydrate state on mount; back/forward safe (P-5).

### 5.5 Grid (P0)
`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`, gap-4 mobile / gap-6 desktop. Page top `pt-[calc(var(--header-height)+24px)]` (fixes P-7).

### 5.6 Empty state (P1)
Use shared `<EmptyState>` (§14) with line-art SVG, `display-md` "No products match these filters.", suggestion text, primary "Clear filters" + secondary "Browse bestsellers".

### 5.7 Load more (P2)
Initial 24, button-based + IntersectionObserver sentinel.

**P0** for 5.1–5.3, 5.5; **P1** for 5.4, 5.6; **P2** for 5.7.

---

# 6 · Product Card — `src/components/ProductCard.tsx`

## Issues
`<img>` (A-1), `h-48` fixed pixel, local-state wishlist `@:27, 60-69` (UX-8), price brand-color + only `text-base` `@:118` (visual hierarchy 1), badge anchors clash with PDP (PD-9).

## Tasks
1. `<Image fill sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw">` inside `aspect-[4/5] relative overflow-hidden`.
2. Anatomy (redesign §Product Card): eyebrow → title `text-lg font-semibold line-clamp-2 text-[var(--color-text-strong)]` → stars + count → price row `text-lg font-semibold tabular-nums` neutral-strong + struck-through original + discount chip success-50/700 → bottom-right 32-px ATC icon button.
3. One badge max top-left (Sale > New > Trending). Discount % chip lives next to price, never on image.
4. Wishlist heart top-right; visible on `hover/focus-within` `md+`, always on touch. **Recommendation: remove for v1** (audit P0 #6 — half-built features).
5. Hover: `translateY(-2px)` + shadow `--shadow-card → --shadow-md`. No scale.
6. Card is one `<Link>`; ATC `<button>` stops propagation; both have visible focus rings.
7. Out-of-stock: image `opacity-60`, badge "Out of stock" danger, ATC → `Notify me` (or hidden v1).
8. List variant for `viewMode==='list'`: horizontal layout, image 160×200 / 96×120, content middle, price+ATC right.
9. Tabular-nums on every price.
10. ATC click → `addToCart()` → open CartDrawer + toast (no green flash; fixes PD-4).

**P0.**

---

# 7 · PDP — `src/app/products/[id]/page.tsx`

## Issues
Hardcoded review bars `72/12/6%` `@:357-386` (PD-1); no variants (PD-2); no sticky mobile ATC (PD-3); 2.5-s green flash with no checkout path (PD-4); no-op share `@:185-190` (PD-5); equal-weight Bulk button `@:246-268` (PD-6); description repeats hero img (PD-7); qty unbounded (PD-8); thumb inline `style={width:72,height:72}` + non-existent `w-18` (PD-10); breadcrumb truncated, no title attr (PD-11).

## Goal (§PDP)
60/40 split; price block high; trust pills between price and CTA; one primary CTA; bulk = link; sticky mobile bar.

## Tasks
### 7.1 Layout (P0)
- `lg+` `grid-cols-[3fr_2fr]`. Right column order: eyebrow → h1 `display-lg` → rating row → **price block** → in-stock + ETA → **trust pills card** → variant → quantity → primary CTA → bulk link → phone+GSTIN strip.
- Page top `pt-[calc(var(--header-height)+24px)]`.

### 7.2 Gallery (P0)
- Main `aspect-square`, `<Image priority>` on first.
- Thumb strip 4 × 64 × 64, 8-px gap, active 2-px brand-500 border, inactive 1-px border, no opacity dim. **Drop inline style + bad `w-18`** (PD-10).
- Hover zoom on desktop via `motion.div` scale.

### 7.3 Price block (P0)
`display-md` 28 px, font-semibold, **`--color-text-strong` (NOT brand)** — fixes the "looks like a link" issue. Tabular-nums. Original price line-through muted. Discount chip success-50/700 inline.

### 7.4 Trust pills card (P0)
Move `Free Delivery / Warranty / 30-Day Returns @:271-282` between price and CTA. Single horizontal card, surface-2 bg + border, 16-px padding. Three icon+label pairs (`Truck`, `Shield`, `RotateCcw`).

### 7.5 Variants (P1)
Add `variants` to `Product` in `src/data/products.ts`: `{ key: 'color'|'size'|'material', options: [{id, label, swatch?}] }[]`. Single segmented control per key. Persist to URL `?v=charcoal`. If none, omit (don't render placeholder).

### 7.6 Qty + ATC (P0)
- Stepper `min={1} max={Math.min(stock,10)}` (fixes PD-8).
- Primary CTA `<Button size="lg" variant="primary" fullWidth>Add to Cart · {formattedPrice}</Button>` — price = qty × unit, formatted via `useCurrency`.
- Click → `addToCart()` → open CartDrawer → focus its checkout CTA.
- Bulk Order → `<Link>` "Buying for a project? Get a bulk quote →" `text-sm` (fixes PD-6).
- Remove the 2.5-s flash + Buy-state (PD-4).

### 7.7 Share (P1)
`navigator.share({title,url})` with clipboard fallback + toast.

### 7.8 Tabs (P1)
Radix `<Tabs>` with proper roles (fixes A-8).
- Description: single col, `max-w-prose`. Drop duplicate hero img (PD-7).
- Specs: 2-col key/value, hover row surface-2.
- Reviews: **hide tab in v1** until real reviews exist (PD-1, T-2 — fake data is worse).

### 7.9 Sticky mobile ATC (P0)
New `src/components/StickyATCBar.tsx`. `< md` only, `bottom-0`, 64 px, surface bg + top border + shadow. Content: 40-px thumb · clamp-1 name · price · ATC button. Hide when inline CTA in viewport (`IntersectionObserver`).

### 7.10 Breadcrumb (P2)
Add `title={fullName}` for tooltip (PD-11).

**P0**: 7.1–7.4, 7.6, 7.9.

---

# 8 · Cart — `src/components/CartDrawer.tsx` + new `src/app/cart/page.tsx`

## Tasks
### 8.1 Drawer (P0)
- `w-full sm:w-[420px]`, Radix Dialog, focus-trap.
- Item row: 64×80 `<Image>` · title clamp-2 · variant chip · qty stepper · line total tabular-nums · remove ghost-icon button.
- Footer: subtotal · `<Button size="lg" variant="primary" fullWidth>Proceed to Checkout · {total}</Button>` · `<Link>View full cart →</Link>`.
- Empty state via `<EmptyState>`: line-art + "Your cart is empty" + "Browse products".

### 8.2 `/cart` page (P1)
- New route. `lg+` 2-col: items left, sticky summary right.
- Summary: subtotal · delivery · GST (inclusive) · promo input · total · "Proceed to Checkout".
- Mobile: stack + sticky bottom bar.

### 8.3 Coupon (P2)
Collapsible `<details>`; v1 accepts `WELCOME10`.

### 8.4 Sync
Both surfaces consume `useCart()`; no duplicated state.

---

# 9 · Checkout — `src/app/checkout/page.tsx`

## Issues
C-1 no validation; C-2 no real payment (`setTimeout(1800) @:73-79`); C-3 ₹50 COD fee never added; C-4 state optional `@:71`; C-5 no pincode autofill; C-6 no GST; C-9 UPI `<div>` chips `@:263-265`; C-10 `Date.now()` ID `@:76`; UX-4 cart cleared before navigation; M-4 grid cramps at 640.

## Tasks
### 9.1 Form system (P0)
**`react-hook-form` + `zod`**. Step 1 schema (name, email, phone, line, city, state, pincode, GSTIN optional) + per-payment-method Step 2 schema. Inputs use new `<Field>` (§11): label above, helper below, focus 2-px brand-500 + 4-px brand-50, error inline `--color-danger-500` with `aria-describedby`. Validation: blur per field, submit for missing-required (focus first error), live for pincode / card / UPI.

### 9.2 Pincode autofill (P1)
`https://api.postalpincode.in/pincode/{code}` on 6-digit input. Success → autofill city+state, green check, "We deliver to {city}". Failure → red "Pincode not serviceable". Allowlist in `src/data/site.ts` for v1 (fixes C-5).

### 9.3 Responsive grid (P1)
Today `grid-cols-2 sm:grid-cols-3` cramps at 640 (M-4). Change to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.

### 9.4 GST block (P1)
Collapsible "Need a GST invoice?" with company + GSTIN. Regex `^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$` (fixes C-6).

### 9.5 Payment selector (P0)
Real `<input type="radio">` + custom-styled `<RadioCard>`s. Selected: brand-50 bg, 1.5-px brand-500 border. UPI app chips → real radios with mobile deep-links (fixes C-9). Conditional details: 150-ms `grid-template-rows:0fr→1fr` transition.

### 9.6 COD fee (P0)
`codFee = subtotal < 999 ? 50 : 0` added to totals **only when COD selected**. Render as a line item in the summary (fixes C-3).

### 9.7 Order persistence (P0)
Replace `setTimeout + clearCart + push @:73-79` with:
1. Build `Order = { id, items, address, payment, totals, currency, placedAt }`.
2. `id = 'STA-' + nanoid(8)` from `nanoid` (kills C-10).
3. Persist `localStorage.setItem('orders/'+id, JSON.stringify(order))` + `localStorage.setItem('lastOrderId', id)`.
4. `router.push('/order-status?id='+id)`.
5. `clearCart()` runs in a `useEffect` on the order-status page **after** the snapshot is loaded (fixes UX-4).

### 9.8 Currency-correct totals (P0)
All amounts via `formatPrice()`. Grep-ban `"$"` in checkout/order-status.

### 9.9 Step ARIA (P2)
`aria-current="step"` + visually-hidden "Step 1 of 2: Order Details" (fixes A-9).

### 9.10 Confirm CTA (P0)
`<Button size="lg" variant="primary" fullWidth>🔒 Confirm & Pay · {total}</Button>`. Disabled until schema valid. Loading state: spinner + "Processing…". Microcopy with real `<Link>`s to Terms / Refund.

## Responsive
`< md` single col + collapsed summary strip; `md–lg` 2-col tighter; `lg+` 2/3 + 1/3 sticky.

---

# 10 · Order Status — `src/app/order-status/page.tsx`

## Issues
OS-1 hardcoded `$` `@:110, 135, 140, 143, 220` (Critical); OS-2 no persistence (`@:29-31` defaults `LUX-000000`); OS-3 hardcoded 35% progress `@:245`; OS-4 placeholder items row `@:130-136`; OS-5 no address shown.

## Tasks
1. Read `id` from `useSearchParams`; load `localStorage.getItem('orders/'+id)`; **never default to fake values** — empty state if not found.
2. Currency: every value via `formatPrice()`. Grep-ban `"$"` in this file.
3. Layout = redesign §Order Status (single col `max-w-[720px]`): success mark → **mono** order ID block → totals → delivery address → semantic tracking line → items → action row.
4. Tracking driven by `order.status: 'confirmed'|'packed'|'shipped'|'delivered'`. v1 = `confirmed` only. **No 35%.**
5. Invoice: same snapshot, print-styled stylesheet via `@media print`; `window.print()` on "Download invoice" (v1). v2: `react-pdf`.
6. Action row: `Track order` (disabled v1, tooltip "Available after dispatch") · `Download invoice` · `Contact support` (`tel:` + `mailto:`) · `Continue shopping`.

**P0** (one of the most damaging trust bugs).

---

# 11 · Form & Input Primitives (P0, new)

Files: `src/components/ui/{Input,Label,Field,Select,RadioCard,Checkbox}.tsx`.
- Tokens (§Form Redesign): 44-px height, 8-px radius, 14-px h-padding, focus 2-px brand-500 + 4-px brand-50.
- `<Field>` wires `label/helper/error` via `useId` + `aria-describedby`.
- `<RadioCard>` for payment + UPI app picker.
- All `"use client"`, tree-shakable.

---

# 12 · Button System (P0, new)

Files: `src/components/ui/{Button,IconButton}.tsx`.
- `class-variance-authority` for variants. 4 variants × 3 sizes × states (default/hover/active/disabled/loading) per redesign §Button.
- `asChild` pattern via Radix `Slot` so `<Button asChild><Link/></Button>` works.
- Loading: freeze width, swap content with spinner.
- Sweep replace ad-hoc buttons across PDP ATC, checkout confirm, hero CTAs, drawer footer.

---

# 13 · Modals / Drawers / Sheets

Standardise on Radix `<Dialog>`: cart drawer, mobile nav, filter sheet, search palette, currency picker. All get focus-trap / Escape / scroll-lock / restored focus. Replace `AnimatePresence` whoosh on routine UI with 150-ms fade + 8-px translate. Springs reserved for success-only.

---

# 14 · Empty States (P1)

`src/components/ui/EmptyState.tsx` props `{ illustration, title, description, primaryCta, secondaryCta }`. Used by PLP no-results, empty cart, `/cart`, order-not-found, search no-results. Line-art SVGs (currentColor).

---

# 15 · Error States (P1)

1. Field errors via §11 form system.
2. Form-level `<Alert>` component (`ui/Alert.tsx`): danger / warning / success / info variants.
3. Per-route `error.tsx` (Next.js 15 — verify in `node_modules/next/dist/docs/`): `/products`, `/checkout`, `/order-status`.
4. Future payment failure: dedicated reducer state + `<Alert variant="danger">` above payment form with retry.

---

# 16 · Image Migration (P1)

Sweep `<img>` → `<Image>` with explicit `width/height` and `sizes`:
- Hero: `priority fetchPriority="high" sizes="100vw"`.
- Category tile: `sizes="(min-width:768px) 50vw, 100vw"`.
- Product card: `sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"`.
- PDP main: `priority` on first; `sizes="(min-width:1024px) 60vw, 100vw"`.
- PDP/cart/checkout thumbs: `sizes="64px"` / `48px`.
- Configure `images.remotePatterns` in `next.config.ts` if external hosts appear.
- Generate blur placeholders (script with `plaiceholder`).
- Verify `next/image` API in `node_modules/next/dist/docs/app/api-reference/components/image.md`.

---

# 17 · Responsive Tasks

Test at 360 / 390 / 414 / 768 / 1024 / 1280.

| Surface | < sm | sm | md | lg | xl+ |
|---|---|---|---|---|---|
| Header | 56 hamburger+cart | same | 64 full nav | + cluster | wider gaps |
| Hero | photo above, h1 44 | same | side-by-side | 60/40 | 1280 cap |
| PLP grid | 1 | 2 | 3 | 4 + sidebar | + |
| PDP | stacked | stacked | 50/50 | 60/40 | + |
| Cart drawer | 100% | 420 | 420 | 420 | 420 |
| Cart page | 1+sticky | same | 2 | 2/3+1/3 | + |
| Checkout | 1+strip | same | 2 | 2/3+1/3 sticky | + |
| Footer | stacked | 2 | 2 | 5-region | + |

Verify M-4 cramping no longer occurs at exactly 640 px after §9.3. Hero overflow at `lg` (M-5) auto-fixes via new `display-2xl` ramp.

---

# 18 · Mobile Interactions (P0–P1)

- Sticky bottom ATC on PDP (§7.9).
- Sticky bottom Confirm on checkout (§9.10 mobile).
- Sticky bottom Proceed on `/cart`.
- Bottom-sheet filter (§5.3).
- Bottom-sheet currency/theme inside mobile drawer.
- 44 × 44 px hit-target floor (M-7).
- `prefers-reduced-motion`: disable scroll-reveal, shorten fades to 100 ms.
- `:active` = bg tint, no scale.

---

# 19 · Accessibility (P0–P1)

A-1 `next/image` (§16) · A-2 ban `white/30, white/40, black/30` → `--color-text-muted/disabled` · A-3 real checkboxes (§5.1) · A-4 dual-thumb slider (§5.1) · A-5 skip-to-content link in `layout.tsx` · A-6 form labels (§11) · A-7 `aria-controls` + drawer id (§1) · A-8 Radix Tabs (§7.8) · A-9 step ARIA (§9.9) · A-10 decorative SVG `aria-hidden="true"` · A-11 dynamic theme aria-label · A-12 `:focus-visible` rings via tokens, ban `outline:none` without replacement.

---

# 20 · Performance

1. Hero LCP: `<Image priority fetchPriority="high">` + `next/font` preload.
2. Code-split heavy clients: `dynamic(() => import('./TrendingCarousel'))`. Audit which PLP primitives can be RSC with client islands — read `node_modules/next/dist/docs/app/getting-started/server-and-client-components.md`.
3. Debounce PLP search 200 ms (P-8).
4. Cull Framer Motion scroll-reveals on Home; keep 1–2 intentional moments.
5. `prefers-reduced-motion` global respect.
6. Image budget: every image via `next/image`; no >300 KB originals in `public/products`.

---

# 21 · Frontend Handoff

**Next.js 15:**
- `[id]` → consider `[slug]` if SEO; verify dynamic route docs.
- Every route exports `metadata`.
- Add `loading.tsx` + `error.tsx` per surface.
- `headers()` / `cookies()` shape and Server Action signatures may differ — verify before consuming.

**Contexts:** `<CartProvider>` + `<CurrencyProvider>` exist; add `<ThemeProvider>` (F-2). Memoize values to prevent fan-out re-renders.

**Data:** v1 keeps `src/data/products.ts`; orders + future reviews/wishlist live in `localStorage` with a clear backend-migration shape (`{ id, ... }`). Add `src/data/site.ts` for brand, GSTIN, phones, emails, social handles, serviceable pincodes.

**Budgets:** LCP ≤ 2.5 s on Moto G Power 4G, INP ≤ 200 ms, CLS ≤ 0.1, route JS ≤ 200 KB gz.

---

# 22 · Component Priority Order

### Sprint 1 (P0 foundations + critical commerce)
F-1 tokens · F-2 ThemeContext · F-3 Logo · F-4 brand sweep · §11 Form primitives · §12 Button system · §1 Header · §2 Footer · §6 ProductCard · §10 Order Status (currency + persistence) · §9 Checkout (validation + COD + persistence + currency).

### Sprint 2 (P0 commerce surfaces)
§5 PLP (FilterPanel + control bar + sheet + grid) · §7 PDP (layout, price, trust pills, ATC, sticky mobile) · §8.1 Cart drawer · §4.1–4.4 Hero / trust strip / category tiles / trending.

### Sprint 3 (P1 polish + handoff)
§3.1 Search · §4.5–4.7 Why/Testimonials/Final CTA · §5.4 URL sync · §5.6 Empty state · §7.5 Variants · §7.7 Share · §7.8 Tabs · §8.2 `/cart` page · §9.2 Pincode · §9.4 GST block · §14 EmptyState · §15 Error states · §16 Image migration · §19 a11y sweep · §20 Performance.

### Sprint 4 (P2 + future)
§5.7 Load more · §7.10 breadcrumb tooltip · §8.3 coupon · §9.9 step ARIA · review system · wishlist · real payment integration · order tracking enum-driven UI · `react-pdf` invoice.

---

**Execution plan complete.** Foundation for `outputs/05_final_ux_review.md`.
