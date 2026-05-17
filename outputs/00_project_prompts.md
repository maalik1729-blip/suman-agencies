# Suman Agencies — Project Prompt Set

A five-stage prompt chain customized for the **Suman Agencies / Suman Tech Automation** storefront (Next.js 15 App Router, Tailwind v4, Framer Motion, lucide-react, multi-currency context).

Each prompt produces one document inside `outputs/`. The chain is **strictly sequential** — every stage reads the prior stage's output before generating its own.

**Surfaces in scope (every prompt must consider all of these):**

- **Home** (`src/app/page.tsx`) — Hero, Categories, Featured Products, Stats, Testimonials, Trust strip.
- **Product Listing / PLP** (`src/app/products/page.tsx`) — search, sort, filters, grid/list view, currency switcher.
- **Product Detail / PDP** (`src/app/products/[slug]/page.tsx`) — gallery, price, variants, ATC, bulk-order CTA, reviews, related.
- **Cart drawer + `/cart` route** (`src/components/CartDrawer.tsx`, `src/app/cart`) — line items, qty, coupon, totals.
- **Checkout** (`src/app/checkout/page.tsx`) — address, payment (UPI/Card/COD), order summary, place-order.
- **Order Status** (`src/app/order-status/`) — confirmation, order ID, invoice/email.
- **Header / Footer / Policy pages** (`src/components/Footer.tsx`, `about`, `contact`, `privacy-policy`, `terms-conditions`, `shipping-policy`, `cancellation-refund`).
- **Global** — `layout.tsx`, `loading.tsx`, `globals.css`, `CartContext`, `CurrencyContext` (INR / EUR / USD), GSTIN + Tamil Nadu proprietorship footer.

Generic dashboard / sidebar / table framing **does not apply** to this project and must be replaced with the equivalent commerce surface (PLP filter rail, PDP info panel, cart line-item list, etc.).

---

================================================================================
# PROMPT 1 — UI AUDIT (Suman Agencies)
================================================================================

## Purpose

This stage identifies, across the full storefront:

- UI weaknesses on Home, PLP, PDP, Cart, Checkout, Order Status
- UX friction in the **discover → evaluate → add-to-cart → checkout → confirm** journey
- usability problems in product discovery (search, sort, filters, categories)
- layout inconsistencies between product card, PDP layout, cart line item, and order summary
- cognitive overload on the homepage and PDP
- accessibility issues (contrast, focus, alt text, `next/image` vs `<img>`, ARIA on custom controls)
- mobile responsiveness gaps (sticky CTAs, filter drawer, currency switcher visibility)
- trust & clarity issues specific to a small Indian retail business (GSTIN, brand-name mismatch, fake stats, broken social links, currency vs invoice mismatch)

The purpose is to produce a brutally honest reference of *what is broken* before any redesign decisions are made.

---

## Goal

Generate a complete UI/UX audit document that:

- identifies major commerce interface issues on every surface listed above
- prioritizes findings by severity (Critical → High → Medium → Low)
- explains shopper pain points from four lenses: first-time visitor, non-technical buyer, mobile shopper, returning bulk-order customer
- documents visual hierarchy problems (price vs CTA vs trust signals vs marketing copy)
- analyzes interaction friction in filters, sort, ATC, qty steppers, coupon, checkout fields
- documents trust signals that are missing, fake, or contradictory
- creates the reference point all later stages will quote from

Expected Output File: `outputs/01_ui_audit.md`

---

## Prompt

You are a senior UI/UX auditor with **e-commerce specialization** and experience auditing Indian D2C / retail storefronts.

Analyze the Suman Agencies storefront across these surfaces:

- Home, PLP, PDP, Cart drawer, `/cart`, Checkout, Order Status, Header, Footer, Policy pages, Loading state.

Your goals:

- identify UI problems per surface
- identify UX friction in the buy flow
- identify cognitive overload (especially Home hero and PDP)
- identify layout inconsistencies between Product Card / PDP / Cart line item / Order summary
- identify spacing & alignment issues
- identify typography hierarchy issues (price, title, badge, microcopy)
- identify usability concerns in filters, sort, search, qty steppers, currency switcher
- identify trust issues (brand name mismatch, fake stats, hardcoded review bars, `#` social links, `$` invoice while INR is selected, `Date.now()` order IDs, missing GSTIN context)
- identify accessibility gaps (contrast on `text-white/30` etc., `<img>` instead of `next/image`, missing labels, single-thumb "range" slider, focus rings)
- identify mobile responsiveness problems (missing sticky ATC, removed mobile filter toggle, hidden currency switcher, drawer behavior)

Instructions:

1. Be highly critical — this is a pre-redesign audit, not a marketing review.
2. Think like a senior product designer who has shipped multiple commerce sites.
3. Evaluate from the perspective of:
   - first-time users who do not know the brand
   - non-technical buyers (older customers, regional shoppers)
   - mobile users on mid-range Android
   - low-attention users scanning in under 5 seconds
   - bulk / B2B buyers using the "Bulk Order" CTA
4. For every issue: explain **WHY** it matters (conversion, trust, accessibility, or task completion).
5. Prioritize findings by severity and cite the exact file + line range when possible.
6. Call out any surface where the **code defines state/components that are never rendered** (dead UI).

Output Requirements:

Generate a markdown document named: `outputs/01_ui_audit.md`

Required Structure:

```
# Executive Summary
# Major UX Problems
# Major UI Problems
# User Friction Points (Discover → Evaluate → Cart → Checkout → Confirm)
# Visual Hierarchy Problems
# Typography Problems
# Accessibility Problems
# Mobile Responsiveness Problems
# Cognitive Load Analysis
# Trust & Clarity Issues (brand, currency, stats, reviews, policies, GSTIN)
# Dead / Unused UI (state or components defined but never rendered)
# Recommended Priority Fixes
```

================================================================================
# PROMPT 2 — UX IMPROVEMENT STRATEGY (Suman Agencies)
================================================================================

## Purpose

Convert the audit into a UX strategy that improves:

- the buy flow (Home → PLP → PDP → Cart → Checkout → Order Status)
- product discovery (search, sort, filters, categories, breadcrumbs)
- evaluation clarity on the PDP (price, variant, stock, shipping ETA, return policy)
- cart and checkout simplicity (steps, address, payment, COD handling, GST display)
- navigation logic (header, mega-menu vs flat nav, footer hierarchy)
- buyer confidence (consistent brand, real trust signals, currency-aware invoice)

This stage focuses on **experience logic and information flow**, not visual redesign.

---

## Goal

Create a UX strategy document that:

- reduces friction at every step of the buy flow
- simplifies filter & sort interaction on PLP
- improves PDP scannability (above-the-fold price + CTA + trust)
- simplifies cart and checkout to a clear 1–3 step model
- improves CTA visibility (ATC, Buy Now, Bulk Order, Checkout)
- reduces cognitive load on Home and PDP
- improves mobile interaction flow (sticky ATC, bottom-sheet filters, thumb-reach checkout)
- fixes trust contradictions (brand name, currency vs invoice, fake stats, broken links)

Expected Output File: `outputs/02_ux_improvement_strategy.md`

---

## Prompt

Read: `outputs/01_ui_audit.md`

Act as a senior product designer specializing in D2C e-commerce.

Based on the audit findings:

Your goals:

- reduce friction in the discover → buy → confirm journey
- simplify the PLP (real filter rail, working sort, category chips, view toggle)
- simplify the PDP (clear price, variant, qty, ATC, Buy Now, Bulk Order, trust row)
- simplify the cart drawer and `/cart` (one truthful total, clear shipping/GST/COD lines)
- redesign the checkout flow (address → payment → review, or single-page with anchored summary)
- improve navigation clarity (header, search, currency, account/cart, footer info architecture)
- improve onboarding for first-time visitors (what does Suman Agencies actually sell?)
- improve CTA visibility and consistency across surfaces
- improve buyer confidence (real reviews, real stats, GSTIN context, currency-correct invoice)
- reduce cognitive load on Home and PDP
- improve mobile usability (sticky CTAs, bottom-sheet filters, single-column checkout)

For every recommendation:

- explain **WHY** (which audit finding it solves)
- explain **user impact** (what the shopper feels / does differently)
- explain **business impact** (conversion, AOV, returns, trust, support load)

Instructions:

- Do **not** redesign visually yet — no colors, no exact paddings.
- Focus only on UX logic, flow, hierarchy, and content order.
- Prioritize usability and trust over aesthetics.
- Where the audit found dead UI, decide: **reinstate it, replace it, or remove it**.

Generate a markdown document named: `outputs/02_ux_improvement_strategy.md`

Required Structure:

```
# UX Strategy Overview
# Buy-Flow Simplifications (Home → PLP → PDP → Cart → Checkout → Order Status)
# Navigation Improvements (Header, Search, Currency, Footer)
# PLP Improvements (Filters, Sort, Categories, View Mode, Empty State)
# PDP Improvements (Gallery, Price, Variants, Stock, ATC, Bulk Order, Trust Row)
# Cart & Checkout Improvements (Drawer, /cart, Address, Payment, COD, GST, Totals)
# CTA Improvements (ATC, Buy Now, Bulk Order, Place Order, Continue Shopping)
# User Psychology Improvements (Trust, Urgency, Social Proof, Guarantees)
# Information Hierarchy Improvements (Home, PDP, Order Summary)
# Mobile UX Improvements (Sticky ATC, Bottom-sheet Filters, Thumb-reach Checkout)
# Accessibility Enhancements (Contrast, Focus, ARIA, next/image, Form Labels)
# Recommended UX Priorities (P0 → P3)
```

================================================================================
# PROMPT 3 — VISUAL REDESIGN DIRECTION (Suman Agencies)
================================================================================

## Purpose

Translate the UX strategy into a **visual system** that feels premium, trustworthy, and Indian-retail-appropriate without losing the existing polished hero/photography mood.

Targets:

- a modern, calm visual hierarchy across Home, PLP, PDP, Cart, Checkout
- cleaner product card and PDP layouts
- stronger price + CTA dominance
- consistent typography scale and spacing rhythm
- component consistency between drawer, page, modal, and toast
- premium product presentation suitable for both retail and bulk buyers

This stage focuses on **visual clarity, consistency, and scalability**.

---

## Goal

Generate a visual redesign blueprint that:

- defines a clear visual hierarchy (price > CTA > title > meta > marketing copy)
- modernizes the interface while keeping the existing hero/photography mood
- defines a consistent spacing scale, typography scale, and radius scale
- defines a color hierarchy that supports trust (neutral surfaces, one strong accent, semantic colors for stock / shipping / discount)
- redesigns the product card, PDP layout, cart line item, order summary, header, and footer
- introduces a scalable component pattern set (button, input, badge, chip, card, drawer, sheet)
- reduces visual clutter on Home and PDP
- defines responsive behavior per breakpoint

Expected Output File: `outputs/03_visual_redesign_direction.md`

---

## Prompt

Read: `outputs/02_ux_improvement_strategy.md`

Act as a senior product UI designer.

Create a premium visual redesign direction for Suman Agencies.

Reference quality similar to: **Stripe, Linear, Notion, Airtable** — applied to a commerce context (think Apple Store / Muji / Tata CLiQ Luxury / Pepperfry checkout calm, not Flipkart density).

Your goals:

- improve visual hierarchy (make price + primary CTA visually dominant)
- create cleaner layouts (Home sections, PLP grid, PDP two-column, Checkout single-column with sticky summary)
- improve spacing consistency (define a 4/8 px scale and apply it)
- modernize typography (display font for hero/PDP price, neutral sans for UI)
- reduce clutter (fewer competing accents, fewer animated decorations, calmer hero)
- improve readability (line-length caps, larger body on mobile, contrast fixes)
- improve component consistency (one Button system, one Input system, one Card system)
- improve PLP and cart clarity (real filter rail, real totals row)

Focus Areas:

- layout system (containers, columns, gutters, breakpoints)
- product card design (image ratio, badge slot, price block, ATC affordance, hover/focus)
- PDP layout (gallery, info panel, sticky CTA on mobile, trust row, related)
- cart drawer + `/cart` page (line item, qty stepper, totals, sticky checkout CTA)
- checkout layout (form blocks, payment selector, anchored order summary, GST/COD lines)
- typography scale (display / h1 / h2 / h3 / body / micro)
- button system (primary, secondary, ghost, destructive, icon, size variants)
- form & input system (text, select, radio group for payment, address, validation states)
- table-equivalent: **order summary / invoice list** redesign (this replaces "table design")
- navigation design (header, search, currency switcher, mobile drawer, footer columns)
- color hierarchy (neutral surface, ink text, single accent, semantic green/amber/red)
- responsive behavior (mobile-first; sticky ATC; bottom-sheet filter; collapsible summary)

Instructions:

- Explain design reasoning for every decision.
- Explain what should be **removed** (e.g., decorative animations that hurt LCP, fake review bars).
- Explain what should be **simplified** (Home sections, hero copy density).
- Explain what should become **visually dominant** (price, primary CTA, trust signals).
- Where the existing site uses `<img>`, specify the `next/image` treatment and aspect ratio.

Generate a markdown document named: `outputs/03_visual_redesign_direction.md`

Required Structure:

```
# Visual Design Philosophy
# Typography Recommendations
# Layout System (Containers, Grid, Breakpoints, Spacing Scale)
# Color Hierarchy (Surface, Ink, Accent, Semantic)
# Navigation Redesign (Header, Search, Currency, Mobile Drawer, Footer)
# Home Redesign (Hero, Categories, Featured, Stats, Testimonials, Trust)
# PLP Redesign (Filter Rail, Sort, Grid, Card, Empty/Loading States)
# PDP Redesign (Gallery, Info Panel, Sticky CTA, Trust Row, Reviews, Related)
# Cart Drawer & /cart Redesign
# Checkout Redesign (Form Blocks, Payment, Order Summary, Place Order)
# Order Status / Invoice Redesign (replaces generic "table" surface)
# Product Card Component Redesign
# Form & Input System
# Button System
# Mobile-first Design Adjustments (Sticky CTA, Bottom Sheet, Thumb Reach)
# UI Consistency Rules
# Visual Simplification Opportunities (what to remove or calm down)
```

================================================================================
# PROMPT 4 — COMPONENT EXECUTION PLAN (Suman Agencies)
================================================================================

## Purpose

Convert the redesign direction into **implementation-ready frontend tasks** for the existing Next.js 15 / App Router / Tailwind v4 / Framer Motion codebase.

Targets:

- file-level and component-level change lists
- responsive behavior definitions per breakpoint
- interaction specifications (hover, focus, active, loading, error, empty)
- migration notes (e.g., `<img>` → `next/image`, hardcoded `$` → `useCurrency()`, `Date.now()` order IDs → server-issued IDs)
- a priority order developers can execute sprint by sprint

This stage bridges design and frontend execution.

---

## Goal

Create a component execution document that:

- names the exact files and components to change (`ProductCard.tsx`, `CartDrawer.tsx`, `products/page.tsx`, `products/[slug]/page.tsx`, `checkout/page.tsx`, `Footer.tsx`, `layout.tsx`)
- explains the current issue per component (with file + line range)
- explains the redesign goal per component
- defines the exact UI / markup / class changes
- defines interaction states and animations (keep Framer Motion where it helps, remove where it hurts LCP)
- defines responsive behavior per breakpoint (`sm`, `md`, `lg`, `xl`)
- organizes implementation into a priority order

Expected Output File: `outputs/04_component_execution_plan.md`

---

## Prompt

Read: `outputs/03_visual_redesign_direction.md`

Act as a senior frontend architect + product designer working in a Next.js 15 App Router codebase (Tailwind v4, Framer Motion, lucide-react, `next/image`, custom `CartContext` and `CurrencyContext`).

Convert the redesign direction into implementation-level tasks.

For every component / surface:

- name the file path
- explain the current issue (cite line numbers where possible)
- explain the redesign goal
- explain the exact UI changes (markup, Tailwind utilities, props, variants)
- explain interaction improvements (hover, focus-visible, active, disabled, loading, empty, error)
- explain responsive behavior (`sm` / `md` / `lg` / `xl`, and mobile-first defaults)
- explain spacing and layout changes (which spacing tokens, which container)
- call out any **data / context** changes needed (e.g., currency-aware invoice, real order ID, real review data shape)

Focus on:

- frontend execution clarity
- developer handoff quality
- implementation simplicity (prefer composing existing primitives over new libraries)
- **Next.js 15 conventions** — respect the AGENTS.md rule: read the relevant guide in `node_modules/next/dist/docs/` before introducing new API usage.

Generate a markdown document named: `outputs/04_component_execution_plan.md`

Required Structure:

```
# Header Changes (src/components/* + layout.tsx)
# Footer Changes (Footer.tsx — brand consistency, GSTIN, real links)
# Navigation Improvements (Search, Currency Switcher, Mobile Drawer)
# Home Section Changes (Hero, Categories, Featured, Stats, Testimonials, Trust)
# PLP Changes (Reinstate FilterPanel, Sort, Category Chips, View Toggle, Empty State)
# Product Card Changes (ProductCard.tsx — image, badge, price, ATC, focus state)
# PDP Changes (Gallery, Info Panel, Sticky Mobile CTA, Reviews, Related)
# Cart Drawer & /cart Changes (CartDrawer.tsx, /cart route — line item, totals, coupon)
# Checkout Changes (checkout/page.tsx — validation, payment, COD fee, GST, totals)
# Order Status / Invoice Changes (currency-correct, server-issued order ID)
# Form & Input System Changes
# Button System Changes
# Modal / Drawer / Sheet Improvements
# Empty State Improvements (PLP no-results, empty cart, no orders)
# Error State Improvements (form errors, payment failure, network)
# Image Migration Tasks (<img> → next/image with sizes + priority)
# Responsive Design Tasks (per breakpoint)
# Mobile Interaction Improvements (Sticky ATC, Bottom-sheet Filter, Thumb-reach)
# Accessibility Implementation Tasks (contrast tokens, focus rings, ARIA, labels)
# Frontend Handoff Notes (Next.js 15 conventions, context usage, perf budgets)
# Component Priority Order (P0 → P3, sprint-sized)
```

================================================================================
# PROMPT 5 — FINAL UX REVIEW (Suman Agencies)
================================================================================

## Purpose

Validate the redesign plan before implementation / release. Focus on:

- remaining UX risks across the buy flow
- accessibility compliance (WCAG 2.1 AA)
- responsive coverage across common Indian device widths (360 / 390 / 414 / 768 / 1024 / 1280+)
- edge cases (empty cart, out-of-stock, payment failure, COD-only pin, currency switch mid-flow, GST on bulk order)
- performance considerations (LCP on hero, image budgets, Framer Motion cost, hydration)
- developer implementation risks (Next.js 15 API drift, context re-renders, server vs client boundaries)

---

## Goal

Create a final UX review document that:

- validates usability across all surfaces
- identifies remaining gaps before the redesign is shipped
- produces QA, accessibility, responsive, user-testing, and release-readiness checklists tailored to this storefront

Expected Output File: `outputs/05_final_ux_review.md`

---

## Prompt

Read: `outputs/04_component_execution_plan.md` (and reference earlier outputs as needed).

Act as a senior UX reviewer with commerce + accessibility expertise.

Perform a final review of the redesign plan for Suman Agencies.

Your goals:

- identify remaining UX gaps in the buy flow
- identify accessibility issues (contrast, focus order, ARIA on custom selects/sliders, form labels, alt text, motion-reduce)
- identify edge cases (empty cart, out-of-stock variant, COD unavailable pin, payment failure, currency change mid-cart, GST on B2B order, bulk-order quote flow)
- identify mobile usability concerns (sticky ATC overlap with browser UI, bottom-sheet gesture conflicts, keyboard covering payment fields)
- identify performance concerns (hero LCP, image priorities, Framer Motion on low-end devices, hydration of heavy client components like PLP)
- identify interaction inconsistencies (button variants, drawer vs page cart, toast vs inline error)
- identify developer implementation risks (Next.js 15 conventions, server/client split, context fan-out, order-ID source of truth)

Then create:

1. Final UX QA checklist (per surface)
2. Accessibility checklist (WCAG 2.1 AA, mapped to components)
3. Responsive testing checklist (360 / 390 / 414 / 768 / 1024 / 1280+)
4. User testing checklist (first-time buyer, returning buyer, bulk-order buyer, mobile-only buyer)
5. Release readiness checklist (analytics, error tracking, real order IDs, real payment, real reviews, GSTIN copy, policy links, sitemap, OG/meta)

Generate a markdown document named: `outputs/05_final_ux_review.md`

Required Structure:

```
# Final UX Review Summary
# Remaining UX Risks (per surface)
# Accessibility Risks
# Responsive Design Risks
# Interaction Consistency Review
# Edge Case Review (empty, error, out-of-stock, COD, currency, GST, bulk)
# Performance Considerations (LCP, images, motion, hydration, route weight)
# Next.js 15 / Implementation Risks
# UX QA Checklist (Home / PLP / PDP / Cart / Checkout / Order Status / Policy)
# Accessibility QA Checklist (WCAG 2.1 AA)
# Mobile Testing Checklist (device widths + gestures)
# User Testing Checklist (4 personas)
# Release Readiness Checklist (analytics, payments, content, SEO, legal)
# Final Recommendations (go / no-go signals)
```
