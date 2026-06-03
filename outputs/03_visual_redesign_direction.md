# Suman Agencies — Visual Redesign Direction

**Designer:** Senior product UI designer (e-commerce)
**Inputs:** `outputs/01_ui_audit.md`, `outputs/02_ux_improvement_strategy.md`
**Brand decision adopted from strategy:** the storefront is **Suman Tech Automation** (legal entity, GSTIN-registered). "Suman Agencies" is retired everywhere user-facing.
**Reference quality bar:** Stripe (clarity, typography), Linear (restraint, spacing), Apple Store / Shopify Polaris (commerce hierarchy), Notion / Airtable (component consistency).

This document defines the **visual system**: typography, color, spacing, components, and surface-by-surface composition. It does **not** redefine UX behaviours (those are locked in stage 2). It does **not** ship code (stage 4 will).

---

# Visual Design Philosophy

**Three operating principles.**

### 1. Quiet confidence over decorative luxury

The current site leans on gradients, shadow stacks, blurred glass, animated marquees, and dual stat counters to signal "premium". A truly premium storefront like Apple Store, Stripe, or Linear achieves the same effect through **restraint**: generous whitespace, a strict type ramp, one accent color, and product photography that does the work. *Remove the decorative chrome and let the product be the hero.*

### 2. Hierarchy is the design

Every surface answers a single user question:
- Homepage: *what do you sell?*
- PLP: *which product matches my needs?*
- PDP: *should I buy this one?*
- Checkout: *will this go smoothly?*
- Order status: *did it work?*

The visual system makes the answer to each question visually dominant — and demotes everything else.

### 3. One token system, no improvisation

Every color, font size, spacing value, and radius comes from a defined token. No more `#1a1a1a` and `#1a1d23` used interchangeably. No more `text-xs` / `text-[11px]` / `text-[9px]` for the same eyebrow role.

**What gets removed visually (carried from audit/strategy):**
- The auto-scrolling marquee band (decorative, loud, no information value)
- Dual hero stats + StatsSection (pick one)
- Gradient buttons in mass — reserve gradient for one hero treatment max
- Inline `style={{ background, boxShadow }}` overrides; everything moves to tokens
- Decorative inner shadows / multi-layer blur on the navbar
- Fake review percentage bars

**What becomes visually dominant:**
- Product imagery (larger ratios, cleaner crops)
- Price (bigger, bolder, never smaller than the product title)
- The single primary CTA on each surface
- Trust pills at the moment of decision (next to price on PDP, beside totals on checkout)
- The GSTIN line and phone number on the checkout surface

**What gets simplified:**
- Color palette: 1 neutral ramp + 1 accent + 4 status colors (no more inline hex)
- Type scale: 1 display family (serif) + 1 text family (sans) on a strict modular scale
- Cards: one card pattern across PLP, PDP related, and homepage featured (today they diverge)
- Badges: one shape, one size, three semantic variants

---

# Typography Recommendations

### Type families

| Role | Family | Notes |
|---|---|---|
| Display (h1, hero, section heads, price) | **Fraunces** or **Playfair Display** (serif) | Replaces today's generic `font-serif` stack. Fraunces preferred — modern, has optical sizes, free on Google Fonts. Used sparingly on the largest elements only. |
| Text (body, UI labels, buttons, forms, prices in lists) | **Inter** (sans) | The de-facto modern UI sans. Use *Inter Variable* with `font-feature-settings: 'cv11', 'ss01'` for cleaner numbers. |
| Mono (GSTIN, order ID, invoice numbers, code-like data) | **JetBrains Mono** or system mono | Today the GSTIN already uses a faux-mono presentation; make it official. |

**Why these:** Stripe (Inter-based), Linear (Inter Display), Notion (custom sans + Lyon serif). The serif/sans pairing is the most reliable way to express "premium retail" without slipping into wedding-invitation territory.

**Numerals:** enable **tabular figures** (`font-variant-numeric: tabular-nums`) on every price, quantity, total, and stat. This fixes the wobbly column alignment in the order summary and stat counters.

### Type scale (modular, 1.250 ratio on desktop)

| Token | Size / line-height | Weight | Family | Use |
|---|---|---|---|---|
| `display-2xl` | 64 / 68 | 600 | Display serif | Hero h1 (desktop). Used **once per page**. |
| `display-xl` | 48 / 56 | 600 | Display serif | Section heads ("Our Collection", "Most Loved") |
| `display-lg` | 36 / 44 | 600 | Display serif | PDP product name, page h1 (PLP, About) |
| `display-md` | 28 / 36 | 600 | Display serif | Sub-section heads, modal titles |
| `text-xl` | 20 / 28 | 500 | Inter | Lead paragraph below hero h1 |
| `text-lg` | 18 / 28 | 500 | Inter | Card titles on homepage featured grid |
| `text-base` | 16 / 24 | 400 | Inter | Body, descriptions |
| `text-sm` | 14 / 20 | 400 | Inter | Secondary text, form labels, captions |
| `text-xs` | 12 / 16 | 500 | Inter | Eyebrow labels (UPPERCASE, +0.08em tracking) |
| `mono-sm` | 13 / 20 | 500 | Mono | GSTIN, order ID, invoice number |

**Mobile scale** drops display sizes one step: `display-2xl` → 44/48, `display-xl` → 36/42, `display-lg` → 28/34. Body text stays at 16 px (never smaller — fixes the audit's `text-[9px]` and `text-[10px]` violations).

### Pricing typography (specifically called out by the brief)

Price is the most-scanned data on the site. It deserves a dedicated treatment.

| Surface | Token | Weight | Color |
|---|---|---|---|
| PDP price block | `display-md` (28 px) | 600 | `--color-text-strong` (not brand) |
| PLP card price | `text-lg` (18 px) | 600 | `--color-text-strong` |
| Order summary line totals | `text-sm` tabular-nums | 600 | `--color-text-strong` |
| Order summary grand total | `text-lg` tabular-nums | 700 | `--color-text-strong` |
| Original (struck-through) price | `text-base` | 400 | `--color-text-muted` |
| Saving badge | `text-xs` (UPPERCASE) | 600 | `--color-success-700` on `--color-success-50` |

**Reasoning:** Today price is colored brand-blue (`#4a6fa5`) on white, which makes it look like a link. Modern e-commerce (Apple, Shopify, Stripe) keeps price in the strongest neutral so it reads as data, not action. The brand color is reserved for CTAs and active states.

### Eyebrow / micro-label rules

Single rule: `text-xs`, weight 600, UPPERCASE, `letter-spacing: 0.08em`, `--color-text-muted`. No more `text-[11px]` or `text-[9px]`.

### Heading rules

- `font-serif` is allowed **only** on `display-*` tokens.
- Inline UI headings (drawer titles, card titles, form section titles) use Inter.
- Today's mistake — using serif on testimonial author names and badge labels — disappears.

### Long-form readability (policy pages, About, PDP description)

- Max content width **65–72 characters** (`max-w-prose` ≈ 65ch).
- Body line-height 1.6.
- Paragraph spacing equal to one line (24 px on `text-base`).
- H2 in long-form = `display-md`; H3 = `text-xl` weight 600 sans (not serif, to avoid scale collapse).

---

# Layout & Grid System

### Container widths

| Token | Max width | Use |
|---|---|---|
| `container-narrow` | 720 px | Policy pages, About, individual blog/article-style content, contact form |
| `container-default` | 1120 px | Header, footer, most marketing sections, checkout |
| `container-wide` | 1280 px | PLP grid, homepage product sections |
| `container-full` | 100% | Hero only |

Today's `max-w-7xl` (1280 px) is used everywhere; the policy pages especially suffer from over-wide line lengths. Variable widths fix readability at zero behavioural cost.

### Spacing scale (4-pt base, 8-pt aligned)

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 80 · 120`

- **Component internal padding:** 16, 20, 24
- **Card-to-card gap (PLP grid):** 24 (desktop), 16 (mobile)
- **Section vertical padding:** 80 (mobile) → 120 (desktop). Today's `py-24` (96) is fine but inconsistent.
- **Page top after sticky header:** 96 (desktop), 80 (mobile). Replaces today's `pt-28` mismatch.

**Rule:** No arbitrary spacing values in components (`mt-[18px]`, `pt-7`). Anything off-scale must be justified in a token.

### Grid patterns

- **PLP grid:** `1 / 2 / 3 / 4` columns at `< sm / sm-md / md-lg / lg+`. Today's `1 / 2 / 3` skips a step and looks empty on lg.
- **PLP layout (lg+):** sticky 240-px filter sidebar + flexible product grid. On `< lg`, filters move into a bottom-sheet drawer.
- **PDP layout (lg+):** 60/40 split — gallery 60%, info column 40%. Today's 50/50 makes the gallery feel small.
- **Checkout layout (lg+):** 2/3 form column + 1/3 sticky order summary. Same as today, but tightened spacing.
- **Footer (lg+):** brand block (4 cols) + 3 link columns (2 cols each). Reduce today's 5-col grid which leaves the brand block too narrow.

### Sectioning

Each homepage section gets:
- An **eyebrow** (12 px UPPERCASE)
- A **heading** (`display-xl`)
- An optional **lead** paragraph (`text-xl`, max 60 ch)
- Content
- (No animated bouncing icon, no "Scroll" indicator)

This rhythm is repeated identically across Featured / Trending / Why Us / Testimonials. Predictability reduces scan cost.

---

# Color Hierarchy & Brand Tokens

The current palette is improvised: ten+ hex literals, two near-blacks (`#1a1a1a` / `#1a1d23`), gradient overuse. The redesign uses **one neutral ramp + one accent + four semantic statuses**, all via CSS variables.

### Neutral ramp (single source of "near-black/white")

| Token | Light theme | Dark theme | Use |
|---|---|---|---|
| `--color-bg` | `#ffffff` | `#0b0d12` | Page background |
| `--color-surface` | `#fafaf9` | `#13161d` | Cards, drawer, sticky bars |
| `--color-surface-2` | `#f4f4f2` | `#1a1e27` | Nested surfaces (order summary, code blocks) |
| `--color-border` | `#e7e7e3` | `#262a35` | Dividers, input borders |
| `--color-border-strong` | `#d6d6d1` | `#363a47` | Hover/focus borders |
| `--color-text-strong` | `#0f1115` | `#f5f5f3` | Headings, prices, primary text |
| `--color-text` | `#2b2e35` | `#cfd0cb` | Body text |
| `--color-text-muted` | `#62656e` | `#8a8e96` | Secondary, captions, eyebrows |
| `--color-text-disabled` | `#a3a6ae` | `#5a5e68` | Placeholder, disabled labels |

Note the slight **warm tilt** in the light neutrals (`#fafaf9`, `#f4f4f2`, `#e7e7e3` rather than pure cool greys). This subtly differentiates Suman from the cold-blue tech aesthetic and matches a furniture/home brand. The accent stays cool to keep tech credibility.

### Brand accent (Suman Blue)

| Token | Value | Use |
|---|---|---|
| `--color-brand-50` | `#eef3fa` | Subtle backgrounds (active filter, selected payment) |
| `--color-brand-100` | `#d8e3f3` | Hover backgrounds |
| `--color-brand-500` | `#4a6fa5` | **Primary brand** — CTAs, links, focus rings, active indicators |
| `--color-brand-600` | `#3d5d8c` | Hover state on primary CTA |
| `--color-brand-700` | `#2d4f7c` | Pressed/active state |
| `--color-brand-900` | `#1a2c47` | Brand-on-dark text |

Today's `#4a6fa5`/`#2d4f7c`/`#6b8fc4`/`#a8c4e2` consolidate into this scale.

### Semantic status colors

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-success-500` / `--color-success-50` | `#16a34a` / `#ecfdf5` | `#22c55e` / `#0f2a1a` | "In stock", "Free", confirmation |
| `--color-warning-500` / `--color-warning-50` | `#d97706` / `#fff7ed` | `#f59e0b` / `#2a1d0a` | "Only 3 left", COD fee notice |
| `--color-danger-500` / `--color-danger-50` | `#dc2626` / `#fef2f2` | `#ef4444` / `#2a1010` | Out of stock, errors, sale badge |
| `--color-info-500` / `--color-info-50` | `#0ea5e9` / `#eff6ff` | `#38bdf8` / `#0c2030` | Informational notices |

### Color hierarchy rules

1. **Brand accent is reserved.** It appears on: primary CTAs, active filter chips, focus rings, the active link underline, and the small brand badge in the logo. It does **not** color body prices, product titles, eyebrows, or icons. This is the single biggest visual change vs. today.
2. **Neutrals carry the page.** Body, headings, prices, borders, surfaces — all neutral.
3. **Semantic colors carry meaning, never decoration.** Green for free/success, red for sale/error, amber for warning, blue (info) for COD/details.
4. **Gradients are reserved for one use:** the hero overlay. No gradient buttons, no gradient stat backgrounds, no gradient logo backgrounds (the logo box switches to a solid brand-700 with a subtle inner highlight).

### Dark mode

Dark mode is a **first-class twin** of light mode, not an afterthought. Every token has a paired dark value above. Surfaces in dark mode are *off-black* (`#13161d`), never pure black, to reduce eye fatigue and reveal layering.

---

# Header & Footer Redesign

### Header

**Current problems:** dual-state transparent-over-hero header, blurred glass on scroll, gradient "Bulk Enquiries" pill competing with cart icon, currency switcher conditional on PDP only, mobile menu missing cart count.

**Redesigned header (single state, no transparency):**

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Logo] Suman Tech Automation   Shop · Furniture · Electronics · About · Contact   [🔍 Search] [₹ INR ⌄] [☀] [🛒 (2)]  │
└──────────────────────────────────────────────────────────────────────┘
```

- **Always solid `--color-bg`** with a 1-px `--color-border` bottom rule. Dropping the transparency-over-hero pattern eliminates the readability struggle on the homepage and the dual color logic in the navbar component.
- Height: 64 px desktop, 56 px mobile. Replaces today's variable 60–90 px.
- Logo: solid brand-700 square (40 px), the SVG inside, name in Inter 600 16 px (no serif), no 9-px subtitle. Subtitle moves to `aria-label` only.
- Nav links: `text-sm` weight 500, `--color-text` default, `--color-text-strong` on hover, `--color-brand-500` underline (2 px) when active.
- **Right cluster (always visible):** Search trigger · Currency selector · Theme toggle · Cart. Currency is **always present**, fulfilling N-1 from strategy.
- "Bulk Enquiries" loud pill is **removed.** Instead, an inline link "For Businesses →" sits as the last nav item. (J-2 in strategy.)

### Mobile header & menu

- 56-px bar: hamburger · centered logo · cart icon (with count).
- Tapping hamburger opens a full-height drawer, not a dropdown:
  - Search field (full width, autofocused)
  - Nav links (Shop, Furniture, Electronics, About, Contact)
  - Divider
  - Currency selector (segmented control: ₹ · $ · €)
  - Theme toggle (segmented: Auto · Light · Dark)
  - "For Businesses" link
  - Phone number `tel:` link with the company GSTIN line below

### Footer

**Current problems:** near-black footer drops jarringly from a light page; placeholder `#` links; two contact emails listed redundantly; phone numbers crammed; bottom-bar Privacy Policy duplicates the upper Privacy Policy.

**Redesigned footer:**

- **Surface:** `--color-surface-2` in light mode (warm off-white), `--color-surface` in dark mode. **No more dark footer in light mode** — the contrast inversion is the most jarring transition on the site today.
- **Top border:** 1 px `--color-border`.
- **Three rows:**

  **Row 1 — Brand & contact** (4-col grid: brand block 4 / Shop 2 / Company 2 / Policies 2 / Help 2 — but redistributable).

  ```
  [Logo] Suman Tech Automation
  Premium furniture & electronics for South Indian homes.

  ┌─────────────────────────────────┐
  │ GSTIN  33DVIPR5548Q1ZN           │  ← single trust badge
  └─────────────────────────────────┘

  📞 +91 97155 90101 · +91 88382 08741   (each is a tel: link)
  ✉  sumantechautomation@gmail.com        (single primary email)
  📍 No.7/1-3, West Street, Chellathayarpuram, Tirunelveli – 627808
  ```

  - One email (the brand alias). Secondary email moves to a `mailto` on the contact page only.
  - Two phone numbers, each as its own `tel:` link.
  - GSTIN gets a dedicated outlined chip — it is the strongest trust signal a small Indian retailer has.

  **Row 2 — Link columns:** Shop · Company · Policies · Help. Placeholder links (Careers, Press) are removed entirely (per strategy N-4) until they exist.

  **Row 3 — Legal strip:** copyright on the left, three legal links on the right. The bottom-row links **match** the upper-column links (no more duplicate `#` Privacy Policy).

- Social icons appear only if real handles exist. If they don't, the row is omitted. **Empty social links are worse than no social row.**

---

# Homepage Redesign

The homepage is recomposed to answer "what do you sell, and is it for me?" in the first viewport, then guide the user into a category.

### Section composition (top to bottom)

1. **Hero** (`min-h: 78vh`, not 100vh)
2. **Trust strip** (1 row of 4 promises — replaces marquee)
3. **Category split** (Furniture · Electronics, two large tiles)
4. **Trending / Best Sellers** (carousel — finally rendered)
5. **Why Suman** (3 pillars, not 4)
6. **Testimonials** (3 cards, real attribution)
7. **Final CTA strip** ("Talk to a design consultant")
8. **Footer**

The **marquee, dual hero stats, and 4-up Why Us are removed.** The page is shorter and more decisive.

### Hero

- **Layout:** left-aligned content (not centered) on desktop. Centered alignment in the current hero pulls the eye into the middle on a wide viewport, where the photo is least dense. Left-aligned headline + right-side photographic crop reads more "Apple Store / Polaris" and less "stock template".
- **H1:** `display-2xl`, max 2 lines. Replaces "Live in Luxury" with concrete copy: *"Furniture & electronics, made for South Indian homes."* (Strategy H-1.)
- **Lead:** `text-xl`, single line on desktop: *"Free delivery in Tamil Nadu · GST invoice · 30-day returns."* These are verifiable. Stats counter is **removed** from the hero.
- **CTAs:** one primary "Shop Furniture" + one primary "Shop Electronics" — equal weight, two parallel paths. (Replaces "Shop Collection" + "Our Story".)
- **Background:** the existing photo, but treated as a single horizontal split (photo right, content left). No vignette gradient; rely on the photo's natural composition. On mobile the photo collapses to a 4:3 image above the headline.

### Trust strip (replaces marquee)

```
🚚 Free delivery in Tamil Nadu   |   🛡 GST registered (33DVIPR5548Q1ZN)   |   ↩ 30-day returns   |   📞 Call before you buy
```

- 56 px tall, `--color-surface`, no animation, no marquee.
- Each cell links somewhere meaningful (delivery → policy; GSTIN → about; returns → policy; call → `tel:`).

### Category split

Two large tiles, equal width (50/50 on desktop, stacked on mobile). Each tile:
- Aspect ratio 4:5 image (portrait, makes the room/object feel substantial)
- Eyebrow ("Category") · Title (`display-lg`) · Sub-category strip (4–5 chips: "Sofas · Beds · Tables · Storage · Dining")
- One CTA: "Explore furniture →"

This single section replaces the 8-card "Featured" grid which currently arrives before users have made their category decision.

### Trending / Best Sellers (the previously dead carousel)

- Same data structure as `TrendingCarousel` in code today, but rendered.
- Visual: 60/40 image-text split. No bottom dot navigation that competes for the user's eye — instead, two restrained arrow buttons + a thin progress line.

### Why Suman (3 pillars)

Drop one of the four current pillars (likely "Expert Concierge Support" since it overlaps Contact). Three is more memorable and visually balanced.

### Testimonials

- 3 cards (not 6).
- Each card: avatar (initial circle is fine) · name · city · product purchased · 1-paragraph quote · star rating.
- "Verified purchase" badge tied to a real order. Until that exists, label as "From a customer" honestly.

### Final CTA strip

A single full-width band: *"Need help choosing? Call us on +91 97155 90101 or visit the Tirunelveli showroom."* — converts the brand from a faceless storefront into a real local business. This replaces the "10K+ customers / 48 cities" stats section entirely.

### What is removed from the homepage

- Marquee band
- Hero stats counter (3-up)
- StatsSection (the gradient 4-up)
- "Our Story" hero CTA (story belongs on About)
- 4th Why Us pillar
- "Scroll" hint with bouncing chevron

The page becomes ~30% shorter and dramatically more decisive.

---

# Product Listing (PLP) Redesign

The PLP becomes a **clean catalog grid** with persistent filters on desktop and a bottom-sheet on mobile.

### Page header

- Breadcrumb (Home / Products / Furniture).
- Eyebrow + h1 (`display-lg`) + lead.
- Result count *with filters applied*: "Showing 14 of 32 furniture products".

### Sticky control bar (below the page header, above the grid)

```
[ 🎚 Filters · 3 ]      [ Search _________ ]      [ Sort: Featured ⌄ ]   [ ▦ ☰ ]
```

- 56 px tall.
- On desktop, "Filters" is a count-bearing button that toggles the sidebar visibility.
- "Sort" is a dropdown (Featured · Price low→high · Price high→low · Rating · Name).
- View mode toggle (grid / list) restored.
- Currency switcher does **not** live here — it lives in the global header (always available now).

### Filter sidebar (desktop)

- 240 px wide, `--color-surface`, `--color-border`, sticky beneath the control bar.
- Sections separated by 1-px `--color-border` rules, 24-px vertical padding between groups.
- **Active filter chips** appear at the top of the sidebar AND above the product grid (so they're visible no matter where the user's eye is).
- Price range becomes a **dual-thumb slider** (UX requirement) with two number inputs below.
- Sub-category as **real `<input type="checkbox">`** with `--color-brand-500` accent (not a `<div>` with onClick).

### Filter bottom sheet (mobile)

- Triggered by the "Filters" button in the sticky control bar.
- Full-width sheet, 80% viewport height, draggable handle.
- "Apply (n)" pinned bottom CTA + "Clear all" link.
- Returns the user to scroll position on dismiss.

### Product grid

- Columns: 1 / 2 / 3 / 4 at `< sm / sm / md / lg+`.
- Gap: 16 (mobile) / 24 (desktop).
- Each row of cards aligns: image, title, rating, price, ATC. Today the irregular spacing/heights cause uneven rows.
- Pagination: "Load more" button + sentinel-based infinite scroll for keyboard-friendliness. (24 per page initial.)

### Empty state

- Centered illustration (line-art, single color) — not the 🔍 emoji.
- Heading "No products match these filters."
- Sub-text suggesting which filter to relax.
- Two CTAs: "Clear filters" (primary) · "Browse bestsellers" (secondary).

---

# Product Card Component Redesign

The single most-reused commerce component on the site. Today three card variants drift apart (homepage featured, PLP grid, PLP list, PDP related). They unify into **one component with two layouts (grid / list)**.

### Anatomy (grid layout)

```
┌──────────────────────────────────┐
│                                  │
│        Product image             │   ← aspect-[4/5] portrait
│        (4:5)                     │      (today: 4:3 / square inconsistent)
│                                  │
│  [Sale -20%]            [♥]      │   ← badge top-left, wishlist top-right
└──────────────────────────────────┘
  Sofas                              ← eyebrow text-xs UPPERCASE muted
  Aurora Modular Sectional           ← text-lg weight 600 (max 2 lines)
  ★★★★★ 4.8 (124)                   ← stars + count, text-sm muted
  ₹68,500   ₹84,000                  ← text-lg strong + struck-through muted
                              [+ ⌄] ← compact ATC button bottom-right
```

### Design decisions

- **Aspect 4:5 (portrait).** Furniture and electronics both photograph better in portrait at this viewport — sofas fill the frame, TVs leave room for context. Today's `h-48` fixed pixel height creates inconsistent ratios across viewports.
- **Image dominance:** 60–65% of the card height is image. Today it's roughly 50%.
- **Title lives on its own row,** never sharing space with price. Two-line clamp.
- **Price color = neutral strong**, not brand. (See typography section.)
- **One badge max** at top-left. If both "trending" and "sale" apply, prefer "sale" (price-relevant). Discount % moves to a small chip *next to the price*, not stacked on the image.
- **Wishlist heart** stays top-right, but only on hover/focus on desktop (reduces visual noise on the grid). Always visible on touch.
- **ATC button** is icon-only (32 × 32) bottom-right of the content area. Click triggers an inline confirmation toast in the cart drawer (no full-card success state).
- **Hover effect:** `translateY(-2px)` + `shadow-sm` → `shadow-md` only. No `scale-[1.02]` (can clip overflow on mobile and feels gimmicky next to Linear/Stripe restraint).
- **Card border:** 1 px `--color-border`, no inline `boxShadow: var(--shadow-luxe)`. The shadow is a token (`--shadow-card` = `0 1px 2px rgb(0 0 0 / 0.04), 0 0 0 1px rgb(0 0 0 / 0.04)`).
- **Rounded corners:** `--radius-lg` = 12 px (cards). Today's 16 px feels chunky next to the type scale.

### List layout

- 1-row card: image (160 × 200 portrait crop on desktop, 96 × 120 mobile) · content · price+ATC stack on the right.
- Same tokens, same hierarchy, just horizontal.

### Out-of-stock state

- Image at 60% opacity.
- Badge top-left: "Out of stock".
- ATC button replaced with "Notify me" outline button.

---

# Product Detail (PDP) Redesign

The PDP is the highest-stakes surface. The redesign clarifies what the user looks at first (image), what they decide on (price + trust), and what they click (one CTA).

### Layout (lg+, 60/40 split)

```
┌──────────────────────────┬──────────────────────────────────┐
│                          │ Sofas                            │ ← eyebrow
│                          │ Aurora Modular Sectional         │ ← display-lg
│                          │ ★★★★★ 4.8 · 124 reviews          │
│                          │                                  │
│   Main image             │ ₹68,500   ₹84,000   [-18% chip]  │ ← price block
│   (1:1)                  │                                  │
│                          │ ✓ In stock · Delivers by Tue 18  │
│                          │                                  │
│                          │ ┌─ Trust pills row ────────────┐ │
│                          │ │ 🚚 Free delivery TN          │ │ ← moved up
│                          │ │ 🛡 5-year warranty           │ │
│                          │ │ ↩ 30-day returns             │ │
│                          │ └──────────────────────────────┘ │
│                          │                                  │
│                          │ Color · [Charcoal] Beige Walnut  │ ← variant
│                          │ Quantity · [- 1 +]                │
│                          │                                  │
│ [thumb][thumb][thumb]    │ [   Add to Cart  ₹68,500     ]   │ ← single CTA
│                          │ Buying for a project?            │ ← inline link
│                          │ Get a bulk quote →               │
│                          │                                  │
│                          │ 📞 +91 97155 90101 · GSTIN ...   │ ← trust strip
└──────────────────────────┴──────────────────────────────────┘
```

### Decisions

- **Gallery is bigger.** 60% column instead of 50%; 1:1 main image; thumbnail strip below with 64-px squares (currently 72 px inline-styled — moved to token).
- **Price block sits high** in the right column, immediately after rating. Today price comes after a section divider — moved up by ~80 px in the visual order.
- **Trust pills sit between price and CTA** (strategy IH-3). They are now a single horizontal card with three icon+label pairs, not three small floating chips.
- **Variant selector** added (color/size/material). Single-row segmented control with a label. (Even when only 1 variant exists, the row stays for consistency, just non-interactive.)
- **One primary CTA.** "Add to Cart {price}" — full width, brand-500, large (44 px). The dynamic price reinforces what the user is buying.
- **Bulk order is a link**, not a button, immediately below the CTA. Removes the dual-button confusion.
- **Phone + GSTIN trust strip** below the bulk link. The first time the user sees this on the PDP it's a powerful credibility cue.

### Image gallery treatment

- Thumbnails: 4 in a row, 64 px squares with 8-px gap. Active thumbnail has a 2-px `--color-brand-500` border, others have 1-px `--color-border` (no opacity dimming as today).
- Main image supports zoom on hover (desktop) and pinch (mobile). Lifestyle vs. detail shots — the gallery contains both, with no visual differentiation needed (the photo set itself communicates).
- Use `next/image` with `priority` on the first image and `loading="lazy"` on rest.

### Tabs (Description / Specs / Reviews)

- The tab list becomes a real `role="tablist"` with proper keyboard support.
- **Description** is single-column (`max-w-prose`), not the current 2-col with a repeated hero image. Add an inline lifestyle image *only if* it's a different shot than the gallery's first.
- **Specs** is a clean 2-column key/value list with row hover background — modeled on Linear's settings tables. Drop the alternating row tint.
- **Reviews** either renders real reviews or is hidden entirely (strategy PD-1). When real, each review is a card with: rating, title, body, reviewer initial+city+date+verified-badge.

### Sticky mobile ATC

```
┌────────────────────────────────────────────┐
│ [img] Aurora Sectional · ₹68,500           │
│                              [ Add to Cart ]│
└────────────────────────────────────────────┘
```

- Pinned to bottom on `< md`, 64 px tall, `--color-surface` with a top border.
- Hides when the inline ATC is in viewport.

### Related products

- Same product card component as PLP. 4 across desktop, 2 across mobile.
- Heading `display-md` "You might also like" — not `font-serif` 2xl bold mismatch.

---

# Cart & Checkout Redesign

### Cart drawer

- 420-px wide drawer slides in from the right (full width on `< sm`).
- Item rows: 64 × 80 image · title (clamp 2 lines) · variant · quantity stepper · line total · remove button. All on one row at desktop, two at mobile.
- Subtotal pinned to the bottom with: subtotal · "Proceed to Checkout" CTA (full width, brand-500) · "View Cart" link.
- Empty state: line-art illustration + "Your cart is empty" + "Browse products" CTA.

### `/cart` page (new, per strategy J-4)

- 2-column on desktop: left items table (image · product · quantity · unit price · total · remove), right summary card.
- Promo code field in the summary.
- "Proceed to Checkout" CTA at the bottom of the summary AND pinned in the mobile sticky bar.

### Checkout layout

Two-column on desktop (2/3 form + 1/3 sticky summary), single-column on mobile with summary collapsed into a tap-to-expand strip at the top.

### Step indicator

```
●━━━━━━●           Order Details · Payment
1 of 2
```

- Two steps only, with explicit "Step 1 of 2" announce text for screen readers.
- Active step is filled brand-500; completed step has a check; future step is muted.

### Step 1 — Order Details

- One card, three sub-sections separated by 1-px borders: Personal info · Delivery address · GST invoice (collapsible).
- Inputs use the form system (below). Real labels above (not placeholder-as-label).
- Pincode field has live validation: typing 6 digits triggers state/city autofill, with a green check + "We deliver to {city}" line below.
- Continue CTA: full width, "Continue to Payment ({total})". Disabled state shows a muted helper "Fill required fields to continue".

### Step 2 — Payment

- **Payment method selector:** segmented control with 3 large radio cards (UPI, Card, COD). Selected card has brand-50 background + brand-500 border (1.5 px). Icons left, label/desc on the right.
- **Conditional details** appear directly below in a smooth height transition (no AnimatePresence whoosh — Stripe-style 150 ms ease-out).
- **UPI app row** becomes real radio chips that, when tapped, deep-link to the chosen app on mobile. No more decorative `<div>` chips.
- **COD card** carries the warning amber tint *only if* the order qualifies for the COD fee, and shows the line item explicitly: "COD handling fee · ₹50".
- **Confirm CTA:** full width, brand-500. Shows "🔒 Confirm & Pay {total}" with an inline "By placing this order, you agree to our Terms & Refund Policy" microcopy below.

### Order summary card (right column)

- Surface: `--color-surface`. Border: `--color-border`.
- Header: "Order Summary" + small "Edit" link (returns to step 1 / cart).
- Items list (max 3 visible, "+2 more" affordance to expand).
- Totals table:
  - Subtotal · {amount}
  - Delivery · *Free* (green) or {amount}
  - COD fee · {amount} (only if applicable)
  - GST · *Inclusive* (muted)
  - **Total · {amount, in tabular-nums, display-md}**
- Promo code input below totals (collapsible).
- Trust strip at the bottom: 🔒 SSL · GSTIN · Phone.

### Errors and confirmation

- Field errors: 1-line message in `--color-danger-500` directly below the field, with `aria-describedby`.
- Form-level errors (e.g., payment failed): toast-style alert at the top of the form column, inline-fixable.
- Successful submission triggers a full-page transition into `/order-status?id=...`. No partial overlays.

---

# Order Status Redesign

The order page is the user's permanent record of their purchase. It must look like a receipt-grade artifact.

### Layout (single column, max-width 720 px)

```
✓ (large success mark, 64 px circle, success-50 bg)
Order placed!
Thank you, {first name}. We've received your order.

╔══════════════════════════════════════════╗
║ Order #LUX-482910                        ║  ← mono font for the ID
║ Placed on 17 May 2026, 4:12 PM           ║
║ ───────────────────────────────────────  ║
║ Total paid:   ₹68,500                    ║  ← user's currency, not $
║ Payment:      UPI · yourname@upi         ║
║ Estimated:    Tuesday, 21 May            ║
╚══════════════════════════════════════════╝

Delivery to
Rajan S · +91 97155 90101
No.7/1-3, West Street, Chellathayarpuram
Tirunelveli – 627808
[Edit address (within 2 hours)]

────────────── Order tracking ──────────────
●  Order Confirmed         · 4:12 PM today
○  Being packed             · expected by tomorrow
○  Out for delivery         · 19–20 May
○  Delivered                · by 21 May

[Items, identical layout to checkout summary]

────────────────────────────────────────
[ Track order ]  [ Download invoice ]  [ Contact support ]
[ Continue shopping ]
```

### Decisions

- **No confetti, no bouncing emoji, no "🎉".** A subtle scale-in on the success mark is enough. Stripe / Apple receipts don't celebrate; they confirm.
- **Order ID rendered in mono.** Currently it's serif h1; it's data, not display.
- **Currency respects the user.** Pulls from `formatPrice` in `CurrencyContext`. The `$` bug from audit OS-1 is structurally impossible in the new design because the invoice template receives a `formattedTotal` string, not a raw amount.
- **Delivery address shown** (strategy OS-3).
- **Tracking line uses semantic states**, not a hard-coded 35% width. Driven by an enum: `confirmed | packed | shipped | delivered`.
- **Action row** lives at the bottom, with "Track order" and "Contact support" promoted alongside "Download invoice" (strategy OS-5).
- **Invoice template** redesigned to match the on-page receipt (same fonts, same currency, real itemised line items pulled from the persisted order snapshot).

---

# Form Redesign

A single, scalable form pattern across checkout, contact, and bulk enquiry.

### Input anatomy

```
Phone number                              ← label, text-sm 500
+91 97155 90101                           ← input value
We'll text you a delivery confirmation    ← helper, text-xs muted
```

### Tokens

| Property | Value |
|---|---|
| Height | 44 px (mobile-friendly thumb target) |
| Horizontal padding | 14 px |
| Border | 1 px `--color-border`, on focus `2 px --color-brand-500` |
| Radius | 8 px (`--radius-md`) |
| Background | `--color-surface` |
| Label position | Above input, 6 px gap |
| Helper position | Below input, 6 px gap |
| Error position | Below input, 6 px gap, replaces helper, color `--color-danger-500`, prefixed with a small alert dot |

### States

- **Default** · neutral border
- **Hover** · `--color-border-strong`
- **Focus** · 2 px brand-500 border + 4 px brand-50 outer ring
- **Filled** · same as default; helpful for select/combobox indicators
- **Error** · 1.5 px danger-500 border + danger-50 ring on focus
- **Disabled** · `--color-surface-2` background, `--color-text-disabled` text

### Field types

- **Text / email / tel:** standard input.
- **Pincode:** 6-character numeric, with inline async loading icon → green check or red error after validation.
- **Card number:** mono font, auto-spaces every 4 digits, card-brand glyph appears in the right padding when detected.
- **Expiry / CVV:** smaller fields side by side; CVV with `inputMode="numeric"` and `type="password"` masking.
- **Address (street):** taller `<textarea>` for 2 lines.
- **Select (state, country):** native `<select>` styled with a chevron, or a Combobox pattern if filtering needed.

### Form sectioning

Form sections use a small heading (`text-sm` 600) + 1-px divider. No serif on form headings.

### Submit buttons

Always full-width on mobile, content-width on desktop. Show the *value* of clicking ("Continue to Payment (₹68,500)") wherever possible.

### Validation timing

- **On blur** for individual fields.
- **On submit** for missing required fields (focus moves to first error).
- **Live** for pincode, card number length, UPI ID format.

### Contact form (separate)

Same pattern, with a "Type of enquiry" segmented control at the top: Retail · Bulk · Support. Selecting "Bulk" reveals two extra fields (company name, GSTIN).

---

# Button System

Today the site has many implicit button styles (gradient pills, outlined ghosts, soft borders). The system collapses to **4 variants × 3 sizes × 4 states**.

### Variants

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| **Primary** | `--color-brand-500` | white | none | One per surface (Add to Cart, Confirm & Pay, Continue, Shop) |
| **Secondary** | `--color-surface-2` | `--color-text-strong` | `1 px --color-border` | "View cart", "Edit", neutral actions |
| **Ghost** | transparent | `--color-text` | none | "Continue Shopping", "Cancel", inline page actions |
| **Destructive** | `--color-danger-50` | `--color-danger-700` | `1 px --color-danger-200` | "Remove from cart", "Cancel order" |

A **link** (text-only with brand color + underline-on-hover) is its own pattern, not a button. "Bulk Order" becomes a link.

### Sizes

| Size | Height | Padding | Font | Use |
|---|---|---|---|---|
| `sm` | 32 px | 12 px | `text-xs` 500 | Card ATC icon button, filter chips, table row actions |
| `md` | 40 px | 16 px | `text-sm` 500 | Default for most page actions |
| `lg` | 48 px | 20 px | `text-base` 600 | Hero CTA, PDP Add to Cart, checkout Confirm |

### States

- **Default** · base
- **Hover** · primary darkens to brand-600; secondary border becomes border-strong; ghost gets surface-2 background
- **Active/Pressed** · primary darkens to brand-700; tactile micro-shift (`translateY(1px)` only on press, not hover — Linear-style)
- **Disabled** · 50% opacity, `cursor: not-allowed`. **No "ghost-disabled" trick**: greyed-out buttons are unambiguous.
- **Loading** · button width frozen, label replaced by a 16-px spinner + optional "Processing…" text. Used in checkout submit.

### Button rules

- One primary per visible surface area (per "fold" or modal).
- Never two primaries side by side. The "Add to Cart + Bulk Order" double-button is replaced by Primary + Link.
- Icon position: leading icon for affirmative ("Continue ▸"), trailing for navigational ("◂ Back to cart"). Today this is inconsistent.
- No gradient buttons anywhere except the deprecated logo gradient (which is also being removed).

---

# Badge, Tag & Status System

### Badge anatomy

- Height: 22 px
- Padding: 0 8 px
- Radius: 4 px (`--radius-sm`)
- Font: `text-xs` 600 UPPERCASE, `letter-spacing: 0.06em`
- 3 variants:

| Semantic | Bg | Text |
|---|---|---|
| **Sale / discount** | `--color-danger-50` | `--color-danger-700` |
| **New** | `--color-info-50` | `--color-info-700` |
| **Trending / Bestseller** | `--color-brand-50` | `--color-brand-700` |

Today's `badge-new`, `badge-sale`, `badge-trending`, `badge-bestseller` collapse to these three semantic variants. "Bestseller" maps to "Trending".

### Status pills (in-stock, out-of-stock, free, etc.)

Same anatomy, but with a leading 6-px dot:

- "● In stock" — success
- "● Out of stock" — danger
- "● Only 3 left" — warning
- "● Free delivery" — success

### Tag chips (filter chips, sub-category labels)

- Height 28 px, radius 14 px (pill), padding 0 12 px, `text-xs` 500
- Default: `--color-surface-2` bg, `--color-text` text
- Active: `--color-brand-500` bg, white text
- Removable: trailing × icon, 1 px border on hover

### Anchor consistency

- Status badges (sale, new, trending) — top-left of product image.
- Wishlist icon — top-right of product image.
- Discount % — next to the price, never on the image. (Removes the audit's IH-2 inconsistency.)
- "Out of stock" — center overlay on the image (not in a corner) when the product is OOS.

---

# Imagery & Product Photography Guidelines

Photography is the largest visual surface on a furniture/electronics storefront. Right now it's mixed sources and ratios.

### Aspect ratios

| Surface | Ratio | Notes |
|---|---|---|
| Hero | 16:9 (desktop), 4:3 (mobile) | Lifestyle composition, one focal product |
| Category tile | 4:5 portrait | Single product in styled environment |
| Product card | 4:5 portrait | Tight crop on the product, clean background |
| PDP main | 1:1 | Consistent square gallery |
| PDP thumbnails | 1:1 | 4–6 thumbs per product |
| Trending feature | 4:3 landscape | Lifestyle, product in context |
| Testimonials | n/a | Avatar circle (40 × 40) |

### Treatment

- **Backgrounds:** muted off-white (`#fafaf9`) or neutral lifestyle scenes. Avoid colored seamless backdrops that fight the brand neutrals.
- **Lighting:** soft, directional, daylight-tempo. South Indian context cues (warm wood floors, tropical plants, terracotta accents) are encouraged for furniture lifestyle shots — they ground the brand.
- **Crop discipline:** product fills 70–80% of the frame in catalog shots; lifestyle shots can drop to 40–50%.
- **No text overlays on product images.** Badges and discount chips are a UI layer, not baked into photography.
- **Consistency over personality:** users browsing 24+ products in a grid notice when one shot has a different background.

### Image performance

- All images via `next/image` with `sizes` hints.
- WebP/AVIF served by default.
- Hero image: `priority` + `fetchPriority="high"`.
- All other images lazy-loaded.
- Provide explicit width/height to eliminate CLS.

### Placeholder & loading

- Use a 1×1 blurred placeholder (`placeholder="blur"` with a generated `blurDataURL`).
- Skeleton-on-skeleton flicker (current pattern in `ProductCard`) is replaced by a single graceful blur-up.

### Iconography

- Single icon set: **Lucide** (already in use). Stick to outline style at `1.5 px` stroke for everything; no mixing filled and outline.
- Default size 16 px (inline) or 20 px (standalone). Today the site jumps from 12 px to 26 px arbitrarily.
- Icons are decorative unless they replace a label — when standalone, they get an `aria-label`.

---

# Mobile-first Design Adjustments

The redesign is composed mobile-first; the desktop layouts are progressive enhancements.

### Viewport rules

- Base styles target 360-px viewport.
- Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.
- Below 360 px, layout still works (tested at 320 px).

### Mobile-specific patterns

- **Sticky header:** 56 px, opaque, no transparency.
- **Sticky page sub-header:** PLP control bar collapses to "Filters · Sort · View" on mobile (no search input — search is in the global header drawer).
- **Sticky bottom CTAs:** PDP (Add to Cart), checkout (Continue / Confirm), cart page (Proceed). Provides a thumb-zone primary action everywhere it's needed.
- **Thumb-zone hit targets:** all interactive elements ≥ 44 × 44 px on touch. Today many are 28–36 px.
- **One-column forms** with full-width inputs on `< sm`.
- **Bottom sheets** for filters and currency selector (mobile menu) instead of dropdowns.
- **Image gallery:** swipeable on mobile, with pagination dots only (no thumbnail strip below — uses vertical space).

### Mobile typography adjustments

- Hero h1: `display-2xl` → 44 px (down from 64).
- Section headings: 36 px → 28 px.
- Body stays 16 px (readability floor).

### Mobile navigation drawer

A real drawer (not a max-height transition) for the mobile menu, with focus trap + Escape-to-close. Slides in from the left, occupying 88% of the viewport. Auto-closes on route change (already implemented in code).

### Touch feedback

- `:active` states use a slight background tint (no scale animation, which can feel laggy on Android).
- Tap targets get a 4-px outer ring on focus-visible, never on tap.

### Reduced motion

- Honor `prefers-reduced-motion: reduce`. Marquee removed regardless; AnimatePresence fades shorten to 100 ms; scroll-reveal disabled.

---

# UI Consistency Rules

These are the non-negotiable rules the codebase will enforce in stage 4.

### Tokenization

1. Every color comes from a CSS variable (`--color-*`). No hex literals in components.
2. Every spacing value comes from the 4-pt scale.
3. Every radius comes from `--radius-sm | -md | -lg | -full`.
4. Every shadow comes from `--shadow-sm | -md | -lg | -card | -overlay`.
5. Every font size/line-height pair comes from the type scale.

### Component usage

6. **One Card** component, one Button system, one Input pattern, one Badge pattern.
7. **One primary CTA** per visible page region.
8. **One eyebrow** style — no `text-[11px]` variants.
9. **One Logo** component used in header and footer.
10. **One ThemeProvider** consumed everywhere; no per-page MutationObserver duplication.

### Layout

11. Page top padding is fixed by container token (96 desktop / 80 mobile), not ad-hoc `pt-28`.
12. Sticky elements coordinate offsets via tokens (`--header-height`, `--subheader-height`).
13. Section vertical rhythm follows `120 / 80` desktop/mobile.
14. No element uses both `className` Tailwind utilities **and** an inline `style` for the same property.

### Color

15. Brand-500 colors only: primary CTAs, focus rings, active link underlines, active filter chips, and the logo. **Not** body prices, **not** body text, **not** decorative borders.
16. Text colors: only 4 levels (`strong / default / muted / disabled`). No more `white/30 / white/40 / white/50`.

### Typography

17. Serif (`display-*`) only on `display-2xl … display-md` headings. Never on body, badges, links, buttons, or form labels.
18. Tabular-nums on every number.
19. UPPERCASE only on eyebrows and badges.
20. Body line-height is 1.5–1.6, never tighter than 1.4 except for `display-2xl`.

### Imagery

21. All images through `next/image`.
22. Each surface uses a fixed aspect ratio per the photography table.
23. No text baked into images.

### Motion

24. Default transition: 150 ms cubic-bezier(0.4, 0, 0.2, 1).
25. No spring animations on UI controls (tabs, drawers); springs reserved for success-state celebrations only.
26. All motion respects `prefers-reduced-motion`.

### Accessibility

27. Focus-visible rings on every interactive element.
28. Color contrast ≥ 4.5:1 for body, ≥ 3:1 for UI controls.
29. All form fields have visible labels.
30. All non-decorative icons have `aria-label`; decorative icons have `aria-hidden`.

---

# Visual Simplification Opportunities

The single most-impactful theme of the redesign: **remove**.

| What to remove | Reason |
|---|---|
| Auto-scrolling marquee band | Decorative noise, replaceable by a static trust strip. |
| Duplicate hero stats | Same data shown twice with potentially different numbers. |
| 4-up "Why Suman" → 3-up | "Concierge support" duplicates the contact channel. |
| Final 4-up animated stat counters | Inflated, unverifiable, distracts from testimonials. |
| Gradient on logo background | Solid brand-700 is more confident; gradients date quickly. |
| Gradient "Bulk Enquiries" pill in header | Replaced by a quiet "For Businesses" link. |
| Gradient "Stats" section | Replaced by a final CTA strip ("Talk to a design consultant") or removed entirely. |
| Bouncing chevron "Scroll" indicator | Non-essential on touch devices, condescending to desktop users. |
| Hero centered alignment | Left-aligned reads more confident on a wide viewport. |
| Decorative fake review percentage bars | Trust killer; either real reviews or no reviews. |
| Inline `style={{ background, boxShadow, border }}` | Move to tokens; eliminates dark-mode inconsistency. |
| Two near-blacks (`#1a1a1a` + `#1a1d23`) | One `--color-text-strong`. |
| 8+ inline hex literals | One palette, one ramp. |
| Two `font-serif` decisions per component | Serif only on `display-*`. |
| Per-page `MutationObserver` on `<html class>` | One ThemeProvider. |
| Drawer/sheet "AnimatePresence whoosh" on routine UI | Plain 150 ms fade. |
| Duplicate footer "Privacy Policy" links | Bottom row matches column links. |
| Empty social icon row with `#` links | Show only real handles or remove. |
| Two emails listed in the footer | One primary email; secondary lives on Contact. |
| 9-px logo subtitle | Move to `aria-label`. |
| `text-white/30`, `text-black/30` muted variants | Single `--color-text-muted`. |
| Stats counter on the homepage hero **and** lower stats section | Pick one location, one source. |
| `Bulk Order` button on PDP | Demoted to a link. |
| Gradient "Add to Cart" success state | Plain check + new "View Cart" affordance. |
| Inline JS-generated invoice HTML with `$` literals | Templated invoice using `formatPrice`. |

---

**Visual direction complete.** This document is the foundation for `outputs/04_component_execution_plan.md`, which translates these tokens, components, and surfaces into specific Next.js / Tailwind implementation tasks against the existing repository structure.
