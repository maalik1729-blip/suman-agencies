# Suman Agencies — Final UX Review

**Reviewer:** Senior UX (commerce + a11y)
**Inputs:** `01_ui_audit.md`, `02_ux_improvement_strategy.md`, `03_visual_redesign_direction.md`, `04_component_execution_plan.md`
**Scope:** validate the redesign plan before implementation; surface remaining risks; produce release checklists.

---

# Final UX Review Summary

The plan is **comprehensive and well-sequenced**. The foundation tasks (tokens, ThemeContext, Logo, brand sweep) correctly precede surface work, and the P0/P1/P2 priority order matches the audit's conversion-blocker hierarchy. The plan resolves every Critical audit finding and explicitly retires half-built features (wishlist v1, fake reviews) rather than papering over them — the right call.

**Confidence to ship per surface (after Sprint 1+2):**
- Header / Footer / Home / PLP / PDP / Cart drawer / Order status: **High** (clear scope, real data, real flows).
- Checkout: **Medium** — form validation + COD + persistence are solid, but absence of a real payment gateway means "Confirm & Pay" is still simulated. Users will eventually trust then distrust the brand if money never moves. **This must be communicated to the business owner.**

**Top 3 residual risks** (detailed below): no real payment processor; localStorage as order store; reliance on Next.js 15 API conventions that may drift.

---

# Remaining UX Risks (per surface)

| Surface | Risk | Mitigation |
|---|---|---|
| Hero | "Free delivery in Tamil Nadu" copy makes a hard promise — must match shipping policy page word-for-word. | Audit `/shipping-policy` content and reconcile before launch. |
| Home category tiles | Two-tile split assumes parity between furniture and electronics catalogs. If electronics has < 5 SKUs, the tile leads to a near-empty PLP. | Show category SKU count on hover; consider hiding the tile when count is below threshold. |
| PLP | Removing wishlist creates regression for any returning user who had pinned items. | Document the removal in a release note; one-time toast: "Wishlist is taking a short break — we'll bring it back better." |
| PDP | Reviews tab hidden in v1 — competitors (Pepperfry/Flipkart) show reviews; absence may reduce perceived trust. | Replace tab with a visible "Reviews coming soon — call us for buyer feedback" line + phone link. |
| PDP variants | If variants are added but `data/products.ts` doesn't get a real variant set, segmented control will render as one disabled option, looking buggy. | Don't ship the UI until at least 3 SKUs have real variants. |
| Cart drawer | Opening drawer on every ATC may interrupt shoppers adding multiple items quickly. | Add a small "X items added" cluster behavior: subsequent ATCs within 2 s only update the badge + toast, don't re-open the drawer. |
| Checkout | COD fee is silently added — users may feel deceived if they don't see it before selecting COD. | Show "₹50 handling fee" inline in the COD radio card description, not only after selection. |
| Order Status | Order is in `localStorage` — clearing browser data = losing order history. | Email confirmation (even via a mailto: handoff to a human-managed inbox) is essential before launch. Show clear "Save this page / Screenshot this order ID" microcopy. |
| Policy pages | None of them were audited in depth — content may still contradict checkout/PDP claims. | Read-through each before launch; reconcile "30-day return", "free delivery", "GST inclusive". |

---

# Accessibility Risks

| Risk | Where | Mitigation |
|---|---|---|
| Focus-visible rings on dark surfaces | brand-500 ring on `--color-surface-2` dark may have low contrast | Use a 2-tone ring (brand + 1-px white inner) in dark mode. |
| Radix Slider thumbs | default screen-reader output reads only values, not "min"/"max" labels | Add explicit `aria-label="Minimum price"` / `"Maximum price"`. |
| Sticky bottom CTAs | obscure on-page content for users zoomed to 200% (WCAG 1.4.10) | Reflow: hide sticky bar when content height < 1.5× viewport; or auto-collapse on scroll-up. |
| Color-only stock indicators | "● In stock" relies on green dot color | Always pair with text label; tested. |
| Toast notifications | brief "Added · View cart" may disappear before screen readers announce | Use `role="status" aria-live="polite"`; minimum 5-s display. |
| Pincode lookup | async loading state must be announced | Add `aria-busy="true"` on the field while fetching. |
| Form errors | clearing an error must update `aria-describedby` | Verify in the `<Field>` primitive. |
| Mobile drawer focus | route-change auto-close must restore focus to the hamburger | Wire `onCloseAutoFocus` in Radix Dialog. |
| Hidden Reviews tab | screen reader users may be confused if a "Reviews" anchor exists in markup but is not navigable | If hidden, remove from DOM, not just `display:none`. |

---

# Responsive Design Risks

- **375 px (iPhone SE2)** not in the test matrix → add. Checkout grid + PDP sticky bar most at-risk.
- **Landscape orientation on mobile** ignored — sticky bottom CTA may cover 30% of viewport. Verify with `@media (orientation: landscape) and (max-height: 500px)`.
- **Foldables (open state ~700 px)** sit between `md` and `lg` and may show 3-col PLP next to a too-narrow sidebar. Verify or force sidebar bottom-sheet under 1024 px.
- **Filter sheet drag handle** on devices with software gesture nav can conflict with system back-swipe. Constrain drag to the handle, not the whole sheet body.
- **Header drawer at 88 vw** leaves 12 vw of underlying page tappable; ensure backdrop swallows clicks (Radix does by default).

---

# Interaction Consistency Review

✅ Button system is the single source — no rogue gradient pills.
✅ One primary per surface enforced via design.
✅ Drawer/sheet/dialog all on Radix — same focus/close semantics.
⚠ Toast library not specified — pick one (Sonner recommended for App Router) and use it for all confirmations, never inline green flashes.
⚠ Loading states inconsistent across plan — settle on: button-internal spinner for form submits, route-level `loading.tsx` for navigations, skeleton for grids.
⚠ "Empty state" component spec doesn't cover error variant — extend `<EmptyState>` to optionally accept an `error` prop that swaps the illustration.

---

# Edge Case Review

| Case | Currently handled? | Action |
|---|---|---|
| Empty cart at `/cart` | ✅ §8 EmptyState | OK |
| Direct visit to `/order-status` with no `id` | ✅ §10 empty state | OK |
| Direct visit to `/order-status?id=unknown` | ✅ same | OK |
| Out-of-stock variant selected on PDP | ⚠ partial | Disable ATC + show "Out of stock — Notify me" inline. |
| Pincode unserviceable | ✅ §9.2 | OK |
| Pincode unserviceable + COD selected | ⚠ | Force payment method change with explanation. |
| Currency switched mid-cart | ⚠ not addressed | All amounts re-render via `formatPrice()` — but a banner "Prices updated to {currency}" reduces confusion. |
| GST invoice requested with invalid GSTIN | ✅ regex validation | Add a "We'll verify before invoicing" microcopy. |
| Bulk-quote button click | ⚠ §7.6 demotes to link but doesn't define destination | Define `/bulk` form route or `mailto:` with subject prefill. |
| User reloads checkout mid-flow | ⚠ | `react-hook-form` state lost; persist Step 1 to `sessionStorage`. |
| User submits twice (double-click) | ✅ §9.10 loading state freezes button | OK if disabled state is enforced. |
| Network failure on order place | ⚠ | Surface via `<Alert variant="danger">` with retry; do NOT clear cart. |
| Stock changes between PDP and cart | ⚠ static data v1 — not a real risk | Note for backend phase. |
| Discount/coupon applied after currency change | ⚠ | Re-validate coupon on currency change. |
| Customer in Tamil Nadu vs out-of-state GST | ⚠ | v1: invoice copy says "GST inclusive"; v2 needs CGST/SGST vs IGST split. |

---

# Performance Considerations

- **LCP target** 2.5 s on Moto G Power 4G — hero `next/image` priority + display font preload is on the plan. Verify the hero image is < 120 KB at 1280 px AVIF/WebP.
- **Framer Motion footprint** ~30 KB gz — acceptable but should be loaded only on Home/PDP. Audit other routes; consider `motion/react-lite` if it lands.
- **PLP hydration**: the entire route is `"use client"` today. After the FilterPanel extraction, evaluate which sub-trees can be RSC (the product grid items can be server-rendered from `products` if no per-card state).
- **Cart Context fan-out**: any change to cart re-renders every consumer. Memoize `value` and split selectors (`useCartCount`, `useCartTotal`).
- **`prefers-reduced-motion` honored** — confirmed at multiple plan points.
- **Image budget enforcement**: add a `scripts/check-image-sizes.mjs` CI step that fails the build if any `public/products/*` exceeds 300 KB.

---

# Next.js 15 / Implementation Risks

- **`useSearchParams` Suspense boundary** — App Router may require wrapping the PLP page in `<Suspense>` to opt out of static rendering. Verify before §5.4 ships.
- **Inline `<script>` for theme pre-paint** — Next.js 15 has specific guidance for this; copy from `node_modules/next/dist/docs/`.
- **`next/font` + CSS variables** — confirm the `variable` export pattern; some examples in older docs no longer apply.
- **`metadata` per route** — `generateMetadata` signature changed in recent versions.
- **Server Actions** — if adopted for order placement, current API has different `useActionState` shape than `useFormState`. Verify.
- **Image `remotePatterns`** — newer config form differs from `domains`. Use `remotePatterns`.

---

# UX QA Checklist (per surface)

### Home
- [ ] Hero h1 reads concrete copy (not "Live in Luxury")
- [ ] Hero has exactly 2 primary CTAs, no "Our Story"
- [ ] No marquee, no scroll chevron, no stats counter on hero
- [ ] Trust strip has 4 real links
- [ ] Category split renders both tiles with real images
- [ ] Trending carousel actually renders
- [ ] Why Us = 3 pillars
- [ ] Testimonials = 3 cards labeled "From a customer" (or verified)
- [ ] Final CTA strip phone is a real `tel:` link

### PLP
- [ ] Filter sidebar visible at `lg+`
- [ ] Filter sheet trigger visible `< lg`
- [ ] Sort dropdown works
- [ ] View mode toggle works (grid + list both render)
- [ ] Search debounced 200 ms
- [ ] URL reflects filters; refresh + back/forward preserve state
- [ ] Empty state shows when filters yield 0
- [ ] Dual-thumb price slider; sub-cat checkboxes keyboard-toggleable

### PDP
- [ ] 60/40 layout `lg+`
- [ ] Price in neutral-strong, not brand
- [ ] Trust pills card sits between price and CTA
- [ ] Single primary CTA; bulk is a link
- [ ] Sticky mobile ATC bar appears `< md` and hides when inline CTA visible
- [ ] Reviews tab hidden (or replaced with "coming soon")
- [ ] Description tab has no duplicate hero image
- [ ] Quantity capped at 10
- [ ] Share button works (Web Share + clipboard fallback)
- [ ] Thumbnails 64×64, no inline `style`

### Cart
- [ ] Drawer opens on ATC + focuses checkout CTA
- [ ] `/cart` route renders 2-col `lg+`
- [ ] Totals tabular-nums
- [ ] Empty state present

### Checkout
- [ ] Empty fields block "Continue" and "Confirm & Pay"
- [ ] Pincode autofill works for valid pincodes
- [ ] COD fee appears in summary only when COD selected
- [ ] GST block validates GSTIN regex
- [ ] UPI app radios are real radios
- [ ] Order ID is `STA-<8>`, not `LUX-<timestamp>`
- [ ] Order persists to `localStorage`; cart clears AFTER nav
- [ ] All amounts in selected currency; no `$` in DOM

### Order Status
- [ ] Direct visit with valid `id` loads snapshot
- [ ] Direct visit with no/unknown `id` shows empty state
- [ ] Mono font for order ID
- [ ] Currency-correct totals; grep-clean of `$`
- [ ] Delivery address rendered
- [ ] No hardcoded 35% progress
- [ ] Action row: track (disabled) · invoice · contact · continue shopping

---

# Accessibility QA Checklist (WCAG 2.1 AA)

- [ ] **1.1.1** All images have meaningful `alt` (or `alt=""` if decorative)
- [ ] **1.3.1** Form labels associated; tablist/tab roles; checkbox/radio native
- [ ] **1.4.3** Body text ≥ 4.5:1, UI ≥ 3:1 (run axe DevTools on every surface)
- [ ] **1.4.10** Reflow at 320 px without horizontal scroll
- [ ] **1.4.11** Non-text contrast ≥ 3:1 for focus rings, borders
- [ ] **1.4.12** Text spacing tolerates user overrides
- [ ] **2.1.1** All actions keyboard-operable (tab through PLP, PDP, checkout)
- [ ] **2.1.2** No keyboard traps (test mobile drawer, filter sheet, cart drawer)
- [ ] **2.4.1** Skip-to-content link
- [ ] **2.4.3** Focus order matches visual order
- [ ] **2.4.7** Visible focus on every interactive
- [ ] **2.5.5** Touch targets ≥ 44 × 44
- [ ] **3.2.2** Currency / theme change doesn't navigate
- [ ] **3.3.1** Form errors announced with `aria-describedby`
- [ ] **3.3.2** Labels + instructions present
- [ ] **4.1.2** ARIA roles correct (tablist, dialog, status)
- [ ] **4.1.3** Live regions on toasts (`role="status"`)
- [ ] `prefers-reduced-motion` respected on every animation

---

# Mobile Testing Checklist

Devices (real or BrowserStack):
- [ ] iPhone SE2 (375 × 667)
- [ ] iPhone 14 (390 × 844)
- [ ] iPhone 14 Pro Max (430 × 932)
- [ ] Pixel 7 (412 × 915)
- [ ] Moto G Power (412 × 915, throttled 4G)
- [ ] Galaxy A14 (360 × 800)
- [ ] iPad mini (768 × 1024)
- [ ] Samsung Fold open (~700 × 800)

Gestures:
- [ ] Swipe-back doesn't open filter sheet inadvertently
- [ ] Pinch-zoom works on PDP main image
- [ ] Pull-to-refresh doesn't trigger on bottom-sheet drag
- [ ] Soft keyboard doesn't cover the active checkout field (scroll into view)

Landscape:
- [ ] PDP sticky ATC doesn't cover content > 30%
- [ ] Mobile drawer height not clipped

---

# User Testing Checklist (4 personas)

### First-time buyer (non-technical, 50+, regional language preference)
- [ ] Can identify what the brand sells within 10 s on the homepage
- [ ] Can navigate from home → furniture PLP → product → cart → checkout without help
- [ ] Understands GST and free delivery promises before paying
- [ ] Trusts the brand (verbalized cue: GSTIN, phone, address)

### Returning buyer
- [ ] Can find a previously viewed product via search
- [ ] Recognizes the cart drawer
- [ ] Completes checkout in < 3 minutes

### Bulk / B2B buyer
- [ ] Can find "For Businesses" link
- [ ] Can submit a bulk quote request without creating an account
- [ ] GST invoice option is discoverable in checkout

### Mobile-only buyer (mid-range Android, 4G)
- [ ] Filters reachable from PLP via bottom sheet
- [ ] Sticky ATC reachable with thumb
- [ ] Payment flow completes without typing more than necessary
- [ ] Order status page is shareable / screenshot-friendly

---

# Release Readiness Checklist

### Functional
- [ ] All P0 tasks from `04_component_execution_plan.md` shipped
- [ ] Order placement persists; refresh-safe
- [ ] No `$` in DOM when currency is INR/EUR
- [ ] All `#` placeholder links removed or replaced
- [ ] Brand name unified to "Suman Tech Automation"

### Content
- [ ] Hero copy / lead reconciled with shipping/return policies
- [ ] GSTIN displayed in footer + checkout summary
- [ ] Real phone numbers as `tel:` links (2 numbers, separately)
- [ ] Single primary email
- [ ] Policy pages read and consistent with on-page claims

### Trust & legal
- [ ] Terms, Privacy, Shipping, Cancellation/Refund pages linked from footer + checkout
- [ ] Cookie / consent banner (if any analytics added)
- [ ] No fake stats ("10K+ customers") anywhere
- [ ] No fake reviews / no fake review bars

### Analytics & error tracking
- [ ] Page-view tracking (Plausible / GA4) per route
- [ ] Funnel events: `view_item`, `add_to_cart`, `begin_checkout`, `purchase` (with order ID)
- [ ] Error tracking (Sentry) wired with route-level boundaries
- [ ] Console clean of warnings in production build

### SEO / meta
- [ ] `metadata` exported per route with real titles and descriptions
- [ ] Open Graph image set (1200 × 630)
- [ ] `sitemap.xml` + `robots.txt`
- [ ] Canonical URLs on PLP with filter params (decide noindex strategy for filtered URLs)
- [ ] Product structured data (`schema.org/Product`) on PDP

### Performance
- [ ] Lighthouse mobile ≥ 85 on Home, PLP, PDP
- [ ] LCP ≤ 2.5 s on throttled 4G
- [ ] CLS ≤ 0.1
- [ ] Route JS ≤ 200 KB gzipped

### Accessibility
- [ ] axe DevTools 0 serious + 0 critical on every surface
- [ ] Keyboard walkthrough completed
- [ ] Screen reader spot-check (VoiceOver + NVDA) on PLP, PDP, Checkout

### Payments
- [ ] **DECISION:** real payment gateway (Razorpay recommended for India) integrated, OR
- [ ] Loud, honest "Payment integration coming soon — please call to confirm orders" banner displayed during checkout, AND
- [ ] Order confirmation email/SMS path to a human inbox in place

### Browser support
- [ ] Chrome / Edge / Safari current + 1
- [ ] Firefox current
- [ ] Android WebView (in-app browsers — common in Indian shopping)

---

# Final Recommendations

### Go signals (ship)
- All P0 tasks complete and verified per the UX QA checklist
- Lighthouse mobile ≥ 85 across Home / PLP / PDP
- axe critical issues = 0
- Real payment gateway integrated **or** clear customer-call workflow with banner
- Brand sweep verified by grep
- Order persistence verified by manual refresh + direct-visit tests

### No-go signals (block release)
- Any `$` in checkout/order-status DOM when currency is not USD
- Any `href="#"` placeholder in shipped code
- Fake reviews, fake stats, or unverifiable testimonials still rendered
- Mobile PDP without sticky ATC
- PLP without functioning filters or sort
- Checkout that accepts empty payment fields
- Order that disappears on refresh

### Strategic recommendations beyond v1
1. **Move to a real backend** within 2 sprints post-launch. `localStorage` is acceptable for a v1 storefront but not a long-term order store.
2. **Add an email/SMS confirmation** even via a manual workflow (Zapier / IFTTT) — the single highest-leverage trust win.
3. **Real reviews collection** — even 5 real reviews beat the redesign's hidden tab.
4. **Bulk-order form** is alluded to but not designed in depth — write a dedicated spec.
5. **Inventory data** — once stock data is real, surface "Only 3 left" warnings on PDP and PLP cards.
6. **Re-introduce wishlist** with a real backend and a `/wishlist` route once accounts exist.

---

**Final review complete.** The redesign plan is ready for execution. Begin with Sprint 1 (foundations + critical commerce) and re-run this review before Sprint 2 closes to revalidate against any scope changes.
