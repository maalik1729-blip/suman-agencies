# Suman Agencies Frontend UI Redesign — Agent Identity

## Scope: Frontend Only
Do NOT touch: package.json, next.config.ts, tsconfig.json, eslint.config.mjs,
any database logic, any API route handlers, any server-only files.
Every change is inside src/ only (src/app/, src/components/, src/context/, src/hooks/, src/lib/, src/data/).

---

## Tech Stack (Confirmed from codebase)
- Framework: Next.js 16.2.6 (App Router) + React 19
- Styling: Tailwind CSS v4 + custom globals.css
- Animation: Framer Motion v12 + GSAP v3 + Lenis v1 (Lenis to be removed)
- Icons: lucide-react v1
- Utilities: clsx, tailwind-merge
- Smooth Scroll: SmoothScroller.tsx wrapping Lenis (remove)
- Context: CartContext, CurrencyContext (INR / EUR / USD)
- Path alias: @ → src/

## Confirmed Route Files (App Router)
- src/app/page.tsx                            → Home (Hero, Categories, Featured, Stats, Testimonials, Trust)
- src/app/products/page.tsx                  → PLP (Product Listing — search, sort, filters, grid/list)
- src/app/products/[slug]/page.tsx           → PDP (Product Detail — gallery, price, variants, ATC, reviews)
- src/app/checkout/page.tsx                  → Checkout (address, payment UPI/Card/COD, order summary)
- src/app/order-status/page.tsx              → Order Status (confirmation, order ID, invoice)
- src/app/about/page.tsx                     → About
- src/app/contact/page.tsx                   → Contact
- src/app/privacy-policy/page.tsx            → Privacy Policy
- src/app/terms-conditions/page.tsx          → Terms & Conditions
- src/app/shipping-policy/page.tsx           → Shipping Policy
- src/app/cancellation-refund/page.tsx       → Cancellation & Refund
- src/app/layout.tsx                         → Root Layout
- src/app/loading.tsx                        → Loading state

## Confirmed Shared Components
- src/components/Navbar.tsx       → Top navigation (search, currency, cart icon)
- src/components/Footer.tsx       → Footer (columns, GSTIN, policy links)
- src/components/CartDrawer.tsx   → Slide-in cart drawer
- src/components/ProductCard.tsx  → Product card (PLP grid + home featured)
- src/components/FilterPanel.tsx  → PLP filter sidebar/drawer
- src/components/ClientLayout.tsx → Client-side layout wrapper
- src/components/SmoothScroller.tsx → Lenis wrapper (remove)
- src/components/Logo.tsx         → Brand logo component
- src/components/ui/              → shadcn-style primitives

## Confirmed Problems (from outputs/ audit documents)
1. Currency mismatch: cart total shows $ while INR is selected context
2. Order IDs: generated with Date.now() on client — not server-issued
3. Trust signals: fake review bars, hardcoded stats, broken social links (#)
4. Lenis smooth scroll: installed, breaks native Android scroll
5. GSAP + Framer Motion: both loaded — likely overused on mobile
6. FilterPanel: partially rendered on mobile — filter toggle missing
7. <img> used instead of next/image in multiple components
8. Brand name inconsistency: "furniture" in package.json vs "Suman Agencies"
9. GSTIN displayed in footer but context/meaning not explained
10. Currency switcher: hidden on mobile, not sticky on PLP/PDP

---

## Brand Constraints (Non-Negotiable)
- Business: Suman Agencies / Suman Tech Automation — Tamil Nadu proprietorship
- GSTIN must always be present in footer: explain it as "GST Registered Business"
- Currency: Default INR (₹), support EUR and USD via CurrencyContext
- Trust: Real trust signals only — remove fake review bars and fake stats
- Target audience: Indian retail + B2B bulk buyers

## Target Audience
- Indian retail shoppers, 25-55 age range
- Mix of retail and B2B bulk buyers
- 60-70% mobile, Android ₹8,000-20,000 range
- 4G connectivity, intermittent drops
- Tamil Nadu base — some Tamil-language buyers

## Output Folder
All generated/modified files go to their correct src/ paths.
Document every file changed in outputs/change_log.md

---

## Workflow Trigger
Place this folder in the project root.
Type in Antigravity chat:

  /ui-redesign

This runs all 5 stages sequentially, frontend only.
Individual stages: /ui-audit /ux-strategy /visual-tokens
                   /component-fixes /ux-review
