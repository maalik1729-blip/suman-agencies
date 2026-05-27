# /ui-redesign — Suman Agencies Frontend Redesign Pipeline

> Type /ui-redesign in Antigravity to run all 5 stages.
> Frontend only. No backend files touched.
> Agent reads each stage output before proceeding to the next.

// turbo

---

## Pre-flight

Before Stage 1, open and read these files using the editor:
- src/app/globals.css
- src/app/layout.tsx
- src/app/page.tsx
- src/app/products/page.tsx
- src/app/products/[slug]/page.tsx
- src/app/checkout/page.tsx
- src/app/order-status/page.tsx
- src/components/Navbar.tsx
- src/components/Footer.tsx
- src/components/CartDrawer.tsx
- src/components/ProductCard.tsx
- src/components/FilterPanel.tsx
- src/components/SmoothScroller.tsx
- src/context/ (all context files — CartContext, CurrencyContext)

Confirm in chat: which files were found, how many lines each,
and whether currency values are correctly driven by CurrencyContext
or hardcoded with a "$" or "₹" symbol.

---

## Stage 1 — UI Audit (Frontend Code + Commerce Surfaces)

**Read:** All src/app/**/*.tsx and src/components/*.tsx files
**Write:** outputs/01_ui_audit.md

### What to audit in the code — not just visually

**Design token audit**
Search src/app/globals.css and all .tsx files for:
- Any hardcoded hex values or Tailwind arbitrary color values
  (e.g., bg-[#1a1a2e], text-[#e0b000])
- Whether CSS custom properties (--color-brand, --color-accent) exist
- Whether a consistent spacing scale is applied (4/8px grid)

Document every file where colors or spacing are hardcoded.

**Currency correctness audit**
Open CartDrawer.tsx, checkout/page.tsx, order-status/page.tsx.
Search for: "$", "USD", hardcoded "₹" outside of CurrencyContext.
- Is every price rendered through useCurrency() or equivalent?
- Does the cart drawer total match the selected currency?
- Does the checkout order summary reflect the same currency?
This is [CRITICAL] — note it prominently.

**Order ID audit**
Open src/app/order-status/page.tsx.
Search for: Date.now(), Math.random(), new Date().
If order IDs are generated client-side: [CRITICAL].

**Trust signal audit**
- Are review ratings hardcoded or from real data?
- Are stats (e.g., "10,000+ customers") hardcoded or from real data?
- Are social links pointing to real URLs or "#"?
- Is the GSTIN in the footer explained (label: "GST Registered Business")?
- Does the footer brand name match "Suman Agencies"?
Document every fake or misleading trust signal as [HIGH].

**Component duplication audit**
- Is the Navbar shared via layout.tsx or duplicated per route?
- Is the Footer shared via layout.tsx or duplicated per route?
- Is the currency switcher present on mobile?
Document any component duplicated across more than one route file.

**Image audit**
Search all .tsx files for: <img, src=", next/image.
- Is next/image used with sizes, width/height or fill?
- Are product images using next/image with proper aspect ratios?
- Are hero images optimized with priority prop?
Document every <img> tag used instead of next/image: [HIGH].

**Lenis / animation audit**
Search all .tsx files for: import Lenis, SmoothScroller, useGSAP,
gsap., motion., useAnimation, AnimatePresence, framer-motion.
- List every file that imports Lenis or uses SmoothScroller.tsx.
- List every file that imports from framer-motion.
- List every file that imports from gsap.
Mark any animation running on scroll or page load as a mobile
performance risk. Mark Lenis as [HIGH] — remove.

**FilterPanel audit**
Open src/components/FilterPanel.tsx and src/app/products/page.tsx.
- Is the mobile filter toggle button rendered?
- Is FilterPanel visible at 375px without user action?
- Is sort working and wired to product list state?
This is [HIGH] — note if mobile filter is broken.

**Mobile layout audit**
In each route file, check for:
- Missing sticky "Add to Cart" button on PDP at 375px
- Currency switcher hidden or missing on mobile Navbar
- Cart drawer overlapping browser UI on iOS/Android
- Checkout form fields without proper mobile keyboard types
  (inputMode="numeric" for phone, type="email" for email)
- Touch targets smaller than 44px (min-h-11 in Tailwind)

### Required Output Structure

```
# 01 — Suman Agencies Frontend UI Audit

## Executive Summary

## Design Token Findings
[Every file with hardcoded colors or arbitrary values. Severity tagged.]

## Currency Correctness Findings
[Every surface where currency is hardcoded or mismatched. CRITICAL items.]

## Order ID Findings
[Client-side ID generation — file + line context.]

## Trust Signal Findings
[Fake reviews, fake stats, broken social links, GSTIN label.]

## Component Duplication Findings
[Navbar, Footer, currency switcher — shared or duplicated?]

## Image Audit Findings
[<img> tags, missing next/image usage, missing sizes/alt.]

## Animation & Performance Findings
[Every framer-motion, GSAP, Lenis usage. Mobile performance risk tags.]

## FilterPanel & PLP Findings
[Mobile filter toggle, sort state, view toggle.]

## Mobile Layout Findings
[Sticky ATC, currency switcher, drawer behavior, touch targets.]

## Prioritized Fix List
[Ranked: CRITICAL → HIGH → MEDIUM → LOW]
[Each item: file path, what to change, why]
```

---

## Stage 2 — UX Strategy (Commerce Flow Focus)

**Read:** outputs/01_ui_audit.md
**Write:** outputs/02_ux_strategy.md

### What to produce

Do NOT suggest visual changes yet.
Focus on: commerce flow logic, information hierarchy, interaction
design, state management patterns, routing behavior.

**Navigation strategy**
Should the Navbar and Footer be confirmed as shared via layout.tsx?
Where should the currency switcher live on mobile?
What is the correct persistent cart state approach (localStorage, context)?

**Product discovery strategy**
What is the correct filter + sort architecture for the PLP?
Should FilterPanel be a sidebar (desktop) and bottom sheet (mobile)?
How should the view toggle (grid/list) persist across navigation?
What does an empty filter result state look like?

**PDP strategy**
What is the correct mobile PDP layout — single column with sticky ATC?
How should product variants (size, color) be selected?
What trust row elements belong above the fold on PDP
(price, stock, shipping ETA, return policy)?
How should Bulk Order CTA be visually distinguished from ATC?

**Cart and checkout strategy**
Should the cart be a drawer, a page, or both?
What is the correct totals row for an Indian e-commerce cart?
(Subtotal → Discount → Shipping → GST → COD fee → Grand Total)
How should COD surcharge be communicated at payment selection?
How should GST (18% on most goods) be displayed — inclusive or exclusive?

**Currency strategy**
Where should useCurrency() be called?
Should currency selection persist in localStorage?
How should currency affect invoice display in order-status?
Confirm: ALL price displays must go through CurrencyContext.

**Order ID strategy**
What is the correct approach for a frontend-only demo?
(Use a deterministic hash, server timestamp, or mock server function)
How should order confirmation communicate that it is a demo?

**Trust strategy**
Which fake trust signals should be removed entirely?
Which stats/reviews could be replaced with real-looking placeholders
that explicitly state "Based on customer feedback" without fabricating data?

### Required Output Structure

```
# 02 — UX Strategy

## Strategy Overview

## Navigation Architecture
## Product Discovery Flow (Home → PLP → PDP)
## Cart & Checkout Flow (Drawer → /cart → Checkout → Order Status)
## Currency & Pricing Strategy
## Order ID Strategy (Demo vs Real)
## Trust Signal Strategy (What to keep, what to remove, what to replace)
## FilterPanel Architecture (Desktop sidebar vs Mobile bottom sheet)
## PDP Layout Strategy (Single column mobile, sticky ATC, trust row)
## Bulk Order Flow
## Component Hierarchy Recommendations
## State Management Recommendations
## Recommended UX Priorities (Top 10)
```

---

## Stage 3 — Design Tokens + Visual Direction

**Read:** outputs/02_ux_strategy.md + outputs/01_ui_audit.md
**Write:** outputs/03_visual_tokens.md
**Also write:** src/app/globals.css (updated with token system)

### What to produce

**Part A — Token document**

Define the complete design token system for this project.
Every token as a CSS custom property.

Required token groups:
- Colors: --color-brand (primary brand), --color-accent,
  --color-surface, --color-surface-alt, --color-ink, --color-ink-muted,
  --color-border, --color-success, --color-warning, --color-error,
  --color-info, --color-discount
  (semantic aliases for price, CTA, trust signals, stock status)
- Typography: --font-body (Inter or Geist Sans), --font-display
  (Geist Sans or similar — for hero price and headings)
  (Tailwind v4 uses @theme for font config)
- Spacing: confirm base unit (4px grid)
- Border radius: --radius-sm, --radius-md, --radius-lg, --radius-xl
- Shadows: --shadow-card (product card elevation), --shadow-drawer
- Z-index: --z-nav, --z-drawer, --z-modal, --z-toast

Also define Tailwind v4 @theme extension for brand colors so
they're available as bg-brand, text-accent, etc. without arbitrary values.

**Part B — Component visual direction**

For each component below, specify the exact Tailwind classes
that implement the design direction. No prose descriptions —
actual class strings.

Components to specify:
1. Navbar (desktop + mobile drawer)
2. Currency switcher (dropdown)
3. Search bar
4. Cart icon with badge
5. Hero section (Home)
6. Category chip / filter chip
7. Product card (PLP grid + Home featured)
8. ProductCard ATC button (hover, loading, added state)
9. PDP gallery (main image + thumbnail strip)
10. PDP info panel (price, variant selector, qty stepper, ATC, Buy Now)
11. PDP trust row (shipping, returns, GST info)
12. Cart drawer (line item, qty stepper, totals row)
13. Checkout form (address fields, payment selector, order summary)
14. Order status card (order ID, status badge, items summary)
15. FilterPanel (desktop sidebar + mobile bottom sheet)
16. Primary button
17. Secondary button
18. Ghost button
19. Footer (columns, GSTIN, policy links, social links)

For each:
- Container classes
- Text classes
- Interactive state classes (hover:, focus:, active:, disabled:)
- Mobile variant classes (responsive prefixes)
- Any Framer Motion usage: keep or replace with CSS?

### Required Output Structure

```
# 03 — Design Tokens + Visual Direction

## Token System
[Full CSS custom property list]

## Tailwind v4 @theme Extension
[Copy-paste ready block for src/app/globals.css]

## Component Class Specifications
[Component by component, actual Tailwind class strings]

## What Replaces Framer Motion
[CSS transition/animation replacements for each removed usage]

## What Replaces Lenis
[scroll-behavior: smooth — where and how]

## Image Treatment
[next/image aspect ratios, sizes prop values, priority rules]

## Font Strategy
[Body font, display font — Google Fonts or next/font — loading strategy]
```

---

## Stage 4 — Component Fixes (Actual Code Changes)

**Read:** outputs/03_visual_tokens.md + outputs/02_ux_strategy.md
**Write:** outputs/04_change_plan.md
**Also modify:** actual src/ files

### Instructions

This stage writes real code. For each fix below, open the
relevant file, make the change, and confirm in outputs/04_change_plan.md
exactly what was changed, in which file, at which line.

// turbo

**Fix 1 — Design tokens in src/app/globals.css**
Add the full CSS custom property block from Stage 3.
Add the Tailwind v4 @theme extension block.
Remove any existing hardcoded color arbitrary values found in Stage 1.

**Fix 2 — Currency correctness**
Open CartDrawer.tsx, checkout/page.tsx, order-status/page.tsx.
Ensure every price is rendered through useCurrency() (or the equivalent
context hook — confirm the actual hook name from src/context/).
Replace every hardcoded "$" with the currency symbol from context.
Replace every hardcoded "₹" with the currency symbol from context.
Grand Total, line item prices, shipping, GST, and COD fee must all
use the same currency conversion.

**Fix 3 — Order ID**
Open src/app/order-status/page.tsx.
If Date.now() or Math.random() is used to generate order IDs:
Replace with a deterministic, server-safe ID format:
  const orderId = `SA-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(Math.random() * 90000 + 10000)}`
Add a visible "Demo Mode" badge near the order ID so buyers
understand this is a simulated confirmation.

**Fix 4 — Remove Lenis (SmoothScroller.tsx)**
Remove src/components/SmoothScroller.tsx wrapper from layout.tsx.
Add scroll-behavior: smooth to src/app/globals.css (anchor links only).
If lenis is imported anywhere else in src/: remove those imports too.

**Fix 5 — Replace <img> with next/image**
For every <img> tag found in Stage 1 audit:
Replace with <Image> from next/image.
Specify: width, height (or fill + relative parent), alt, sizes.
For hero images: add priority prop.
For product images: use aspect-square or aspect-[4/3] container.

**Fix 6 — FilterPanel mobile toggle**
Open src/components/FilterPanel.tsx and src/app/products/page.tsx.
If the mobile filter toggle button is missing or commented out:
Add a "Filters" button visible at < md breakpoint.
FilterPanel should be hidden by default on mobile, shown when toggled.
Implement as a bottom sheet (fixed bottom-0, full width, slide up).
Desktop: static sidebar (lg:block).

**Fix 7 — Sticky ATC on PDP (mobile)**
Open src/app/products/[slug]/page.tsx.
On mobile (< md), the "Add to Cart" and "Buy Now" buttons must be
sticky at the bottom of the viewport.
Use: fixed bottom-0 left-0 right-0 z-[var(--z-nav)] p-4 bg-white
border-t border-[var(--color-border)]
Hide the inline ATC button on mobile (md:block hidden).

**Fix 8 — Trust signal cleanup**
In src/app/page.tsx (Home):
If review bars are hardcoded (fixed width percentages): remove them.
Replace with a simple star rating display or remove the section.
If stats are fabricated: replace with a honest placeholder
(e.g., "Serving customers across Tamil Nadu since [year]").
In src/components/Footer.tsx:
Ensure GSTIN is labeled: "GST Registered Business · GSTIN: [number]"
Replace all "#" social links with real URLs or remove the icons.
Ensure Footer brand name is "Suman Agencies".

**Fix 9 — Reduce Framer Motion**
For every framer-motion usage found in Stage 1:
If it's a decorative scroll animation or entrance fade: replace with
  CSS @keyframes fadeIn + animation class.
If it's the cart drawer slide-in: keep it OR replace with CSS transform.
If it's a page transition: replace with CSS view-transition API or
  a simple CSS opacity transition on the route wrapper.
If GSAP is used for the same effect as Framer Motion: remove one.

**Fix 10 — Currency switcher on mobile**
Open src/components/Navbar.tsx.
If the currency switcher is hidden on mobile (hidden sm:flex, etc.):
Make it accessible on mobile — either always visible in the top bar
or inside the mobile drawer menu.
At minimum: currency switcher must be reachable without scrolling.

### Required Output Structure

```
# 04 — Change Plan

## Files Modified
[File path | What changed | Lines affected]

## Fix 1: Design Tokens
## Fix 2: Currency Correctness
## Fix 3: Order ID (Demo Mode)
## Fix 4: Lenis Removal
## Fix 5: next/image Migration
## Fix 6: FilterPanel Mobile Toggle
## Fix 7: Sticky ATC (PDP Mobile)
## Fix 8: Trust Signal Cleanup
## Fix 9: Framer Motion Reduction
## Fix 10: Currency Switcher on Mobile

## Verification Steps
[How to confirm each fix works in the browser]
```

---

## Stage 5 — Final Review

**Read:** outputs/04_change_plan.md
**Write:** outputs/05_final_review.md

### What to check

1. Open each modified file. Confirm changes are actually present.
2. Check src/app/globals.css — do all token variables exist?
3. Check CartDrawer.tsx — does grand total use useCurrency()?
4. Check checkout/page.tsx — does every price line use useCurrency()?
5. Check order-status/page.tsx — is order ID server-safe? Is demo badge present?
6. Check layout.tsx — is SmoothScroller.tsx removed?
7. Search entire src/ for remaining <img> tags. Any found = Stage 4 incomplete.
8. Search for remaining hardcoded "$" or "₹" outside CurrencyContext usage.
   Any found after Stage 4 = Stage 4 incomplete.
9. Search for remaining lenis imports. If found: flag as Stage 4 incomplete.
10. Search for remaining framer-motion imports.
    If more than 2 files still import it: flag.
11. FilterPanel: is mobile toggle present and working?
12. Footer: GSTIN label correct? Brand name correct? No "#" social links?

### Mobile simulation check
Use the browser subagent. Open localhost:3000 (or the deployed URL).
Set viewport to 375px width.
Check on each page:
- Home: does the hero load fast? Does the category row scroll without overflow?
- PLP: is the "Filters" button visible and does it open a bottom sheet?
- PDP: is the sticky ATC bar visible at the bottom on mobile?
- Cart drawer: does it open, close, and show correct currency totals?
- Checkout: are form fields usable with mobile keyboard? Does the order
  summary stay visible (sticky or collapsed) while filling the form?
- Order Status: is the order ID shown? Is the demo badge visible?
Flag any layout that breaks at 375px.

### Required Output Structure

```
# 05 — Final Review

## Verification Results
[Pass/Fail for each Stage 4 fix]

## Remaining Currency Issues
[Any surface where "$" or "₹" is still hardcoded — file + line]

## Remaining <img> Tags
[Any found — file + line]

## Remaining Lenis / SmoothScroller Usage
[Files still using it — action required]

## Remaining Framer Motion Usage
[Files still importing it — justified or flagged]

## Mobile Check Results
[375px viewport results per page]

## Trust Signal Status
[GSTIN label, brand name, social links, fake stats — pass/fail]

## Outstanding Issues
[Anything not fixed in Stage 4 — with reason]

## Release Readiness
[Ready / Not ready — one line verdict with conditions]
```

---

## Post-Pipeline

After Stage 5 completes, post this summary in chat:

```
Suman Agencies Frontend Redesign — Pipeline Complete

Modified files: [list from change_log.md]
Currency correctness: [fixed / issues remaining]
Order ID: [server-safe demo / issues remaining]
Lenis: [removed / not found]
<img> tags: [count remaining — should be 0]
Framer Motion: [files remaining]
Mobile 375px: [pass / issues found]
Trust signals: [cleaned / issues remaining]

Next: run `npm run build` to confirm no TypeScript errors.
Then: share outputs/05_final_review.md for sign-off.
```
