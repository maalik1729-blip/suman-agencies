# Suman Agencies — UX Improvement Strategy

**Designer:** Senior product designer (e-commerce)
**Inputs:** `outputs/01_ui_audit.md`
**Stage:** Experience logic, IA, and flow only — **no visual redesign in this document**.
**Severity & priority carry forward from the audit (P0 / P1 / P2).**

For every recommendation below:
- **Why** = UX reasoning
- **Shopper impact** = what problem it solves for the user
- **Business impact** = effect on conversion, AOV, returns, or support load

---

# UX Strategy Overview

The audit revealed that the storefront looks polished but behaves like a prototype: filters absent on the PLP, payment validation absent in checkout, fake reviews, mismatched currency on the invoice, dead controls (wishlist/share/UPI chips/trending carousel), and a brand identity that switches between *Suman Agencies* and *Suman Tech Automation*.

The strategy is to **fix the commerce fundamentals first** so the funnel is honest, then **reduce decision cost at every step**, then **convert trust signals from cosmetic to credible**. The order matters: any aesthetic redesign on a broken flow merely makes a broken site prettier.

**Strategic pillars:**

1. **Make the funnel complete and honest.** Every visible affordance must do what it implies. Remove anything that doesn't.
2. **Reduce time-to-product.** From landing, a shopper should reach a relevant product in ≤ 3 interactions on desktop and ≤ 4 on mobile.
3. **One identity, one promise.** Choose a single brand name and a single set of trust commitments (delivery, returns, warranty) and repeat them verbatim everywhere.
4. **Mobile is the canonical viewport.** Sticky primary CTAs, thumb-zone hit areas, persistent currency, and accessible filters from any width.
5. **Persist state.** Cart, filters, currency, theme, and *placed orders* should survive refresh and direct URL access.
6. **Show local credibility.** This is a small Tamil Nadu proprietorship with a real GSTIN — that is more trustworthy than vague "10K+ customers" claims if surfaced honestly.

**Target funnel KPIs after this stage** (directional, to be measured):
- PLP → PDP click-through: +30–50% (filters/sort restored)
- PDP → Add-to-Cart: +15–25% (sticky mobile CTA, variant selection, real reviews)
- Cart → Order placed: +20–35% (validated, trust-badged checkout)
- Post-purchase support tickets ("where is my order?"): −40% (persistent order page + email/SMS confirmation)

---

# Shopping Journey Simplifications

The current journey is *Landing → "Shop Collection" → flat catalog → PDP → cart drawer → checkout → order status (volatile)*. It is short, but each step leaks because the affordances are weak.

### J-1 · `P0` — Branch the journey by category at the homepage

- **Why:** Furniture and electronics are decision-different categories with different shoppers, price ranges, and intent. Forcing them into one PLP grid increases scanning cost.
- **Shopper impact:** A furniture-intent visitor reaches sofas in two clicks instead of scrolling past 12 electronics products.
- **Business impact:** Higher PLP→PDP CTR, lower bounce on the homepage, cleaner attribution between the two product lines.
- **Logic:** Add Furniture / Electronics tiles immediately under the hero (replacing the marquee). Each tile is a category entry point with a representative image and a sub-category strip ("Sofas · Beds · Tables" / "TVs · Audio · Smart Home").

### J-2 · `P0` — Treat "Browse → Buy" and "Bulk Enquiry" as two flows, not one button

- **Why:** Today "Add to Cart" and "Bulk Order" sit side-by-side on the PDP. They serve different shoppers (B2C retail vs. B2B). A retail shopper reads "Bulk Order" as friction; a B2B buyer reads "Add to Cart" as wrong.
- **Shopper impact:** Retail shoppers see one obvious primary CTA. B2B shoppers see a dedicated, contextual path that pre-fills product info.
- **Business impact:** Cleaner B2C conversion and better-qualified B2B leads (route bulk via `/contact?type=bulk&product={id}` with the SKU pre-attached).
- **Logic:** PDP keeps a single primary "Add to Cart". A small inline link ("Buying for a project? Get a bulk quote →") below the trust pills routes to the bulk form.

### J-3 · `P0` — Persist the order

- **Why:** Currently the cart is cleared and the order ID is generated client-side from `Date.now()`. Refreshing the order-status page wipes the order.
- **Shopper impact:** Users can return to `/order-status?id=...` from email, browser history, or after a network drop and still see their order.
- **Business impact:** Eliminates the most common support ticket ("I placed an order, where is it?"), reduces refund disputes, enables order-tracking growth.
- **Logic:** Snapshot the order (items, address, payment mode, total, currency, timestamp) into `localStorage` keyed by orderId *before* `clearCart()`. Long-term, send to a real backend.

### J-4 · `P1` — Add a `/cart` page in addition to the drawer

- **Why:** A drawer is fine for "I added one thing", but for review-and-edit before checkout, a full page reduces accidental dismissals and gives room for promo codes, gift wrap, delivery estimates.
- **Shopper impact:** A confident review step before payment.
- **Business impact:** Lower cart abandonment from accidental drawer dismissal; an obvious place to surface upsells and bundle offers later.
- **Logic:** Drawer keeps quick access; clicking "View Cart" or the cart icon at high item counts lands on `/cart` with a full table view and a clear "Proceed to Checkout".

### J-5 · `P1` — Order confirmation by email + WhatsApp

- **Why:** The current order-status page is the only artefact of a purchase. Indian shoppers expect SMS/WhatsApp confirmation as the trust anchor.
- **Shopper impact:** Confidence that the order exists outside the browser tab.
- **Business impact:** Drastically reduces "did my order go through?" support load; opens a re-engagement channel for shipping updates.
- **Logic:** On order placement, fire transactional email (the entered address) + an opt-in WhatsApp message with the order ID and a deep link to `/order-status?id=...`.

---

# Navigation Improvements (Header, Footer, Breadcrumbs)

### N-1 · `P0` — Currency switcher available everywhere

- **Why:** Today it appears only on PDP. Users browsing PLP, cart, or checkout can't switch currency, then see `$` on the invoice (separate bug).
- **Shopper impact:** International or NRI shoppers see consistent pricing across the entire journey.
- **Business impact:** Removes a cross-page surprise that currently makes the invoice feel illegitimate.
- **Logic:** Move the switcher into the header right-actions cluster, persist selection in `CurrencyContext` + `localStorage`, and use `formatPrice` in the invoice.

### N-2 · `P0` — Promote "Bulk Enquiries" to a header secondary action on all viewports, but make it less shouty

- **Why:** Currently desktop-only and styled as the loudest CTA — competes with "Add to Cart".
- **Shopper impact:** Mobile B2B users (a real segment for a Tirunelveli proprietorship) can find the bulk channel.
- **Business impact:** Captures leads that currently silently bounce on mobile.
- **Logic:** Replace the gradient pill with a quieter ghost link "For Businesses" in the desktop nav and a clear entry in the mobile menu.

### N-3 · `P0` — Add a global search in the header

- **Why:** Discovery currently depends on landing on `/products` and using its (limited) search box.
- **Shopper impact:** Returning shoppers find a known item in one step.
- **Business impact:** Higher repeat-shopper conversion; reveals search intent for future merchandising.
- **Logic:** Header search opens a typeahead across product name + sub-category. From any page.

### N-4 · `P1` — Replace placeholder footer links with real destinations or remove them

- **Why:** Careers / Press / social / "Cookie Policy" all link to `#`. Each broken link is a small trust hit.
- **Shopper impact:** Confidence that the brand is real and complete.
- **Business impact:** Trust + SEO. Bottom-bar duplicate "Privacy Policy" linking to `#` while the upper section links correctly is especially confusing.
- **Logic:** For social, link to real handles or remove the icons. Drop "Careers / Press" until they exist. Bottom-bar links should match the upper-column links.

### N-5 · `P1` — Surface the GSTIN and contact phone in the header on checkout/PDP

- **Why:** A small Indian proprietorship's strongest trust asset is a verifiable GSTIN and a real phone number. Right now the GSTIN sits only at the bottom of the footer.
- **Shopper impact:** First-time buyers verify legitimacy without scrolling.
- **Business impact:** Higher conversion from cautious first-time buyers.
- **Logic:** Add a thin trust strip on PDP and checkout pages: "📞 +91 97155 90101 · GSTIN 33DVIPR5548Q1ZN · Free Delivery · 30-Day Returns".

### N-6 · `P1` — Breadcrumbs on PLP and policy pages, not just PDP

- **Why:** PDP has breadcrumbs (Home > Products > Furniture > {name}); PLP and policy pages don't, so users navigating laterally get lost.
- **Shopper impact:** Always know where they are and how to step back.
- **Business impact:** Reduced bounce, better internal link equity for SEO.

### N-7 · `P1` — Mobile menu: include cart count, currency, theme, and a primary "Shop" entry

- **Why:** Today the mobile menu only shows nav links + Bulk Enquiries. To see cart count or change currency, users must close the menu.
- **Shopper impact:** One destination for all mobile actions.
- **Business impact:** Lower friction = more sessions resulting in cart adds.

### N-8 · `P2` — Sticky header on scroll up only ("auto-hide on scroll down")

- **Why:** Maximises content space on mobile while keeping nav reachable on intent.
- **Shopper impact:** More product per screen on mobile; nav is one swipe away.
- **Business impact:** Better PDP scanning, especially for long descriptions / specs.

---

# Homepage / Landing Improvements

### H-1 · `P0` — Anchor the value proposition above the fold

- **Why:** "Live in Luxury" with "Discover curated furniture and smart electronics" is brand poetry, not a value prop. First-time users can't tell *what makes Suman different* from any other site.
- **Shopper impact:** A clear answer to "should I shop here?" in 5 seconds.
- **Business impact:** Lower bounce, higher hero-CTA CTR.
- **Logic:** Sub-headline must say *something specific*: "Furniture & electronics for South Indian homes. Free delivery in Tamil Nadu. GST invoice. 30-day returns." Concrete > poetic.

### H-2 · `P0` — Replace the marquee with category tiles (Furniture · Electronics)

- **Why:** The marquee is decorative noise; category tiles are functional discovery.
- **Shopper impact:** Two clear paths emerge under the hero — exactly the choice users came to make.
- **Business impact:** Increases PLP entry from category-intent users; allows analytics to attribute interest.

### H-3 · `P0` — Render or remove the trending carousel

- **Why:** Defined but unused. Either it earns its place by surfacing real best-sellers, or it goes.
- **Shopper impact:** Social proof of what's actually popular.
- **Business impact:** Lifts AOV by promoting tested products; reduces dead code.

### H-4 · `P1` — Deduplicate hero stats vs. StatsSection

- **Why:** Same data shown twice with potentially different numbers.
- **Shopper impact:** Less repetition, faster scan.
- **Business impact:** Cleaner brand signal.

### H-5 · `P1` — Reorder the homepage by user intent

Suggested order:
1. Hero (concrete promise + 1 primary CTA)
2. Category tiles (Furniture · Electronics)
3. Trending / Best Sellers carousel
4. Why Us (3 trust pillars, not 4 — remove the weakest)
5. Customer testimonials with avatar + city + product
6. Final CTA strip ("Talk to a design consultant")
7. Footer

- **Why:** Today's order is *Hero → Marquee → Featured → WhyUs → Stats → Testimonials*. Stats and Why Us interrupt before users have seen the catalog.
- **Shopper impact:** Encounter products earlier in the page.
- **Business impact:** More homepage visitors reach a product card without scrolling 4 sections.

### H-6 · `P2` — Replace "10K+ customers, 48 cities" with locally credible signals

- **Why:** Inflated claims hurt trust more than they help. A small Tirunelveli proprietorship is more credible saying "Family-run since 2022 · Serving Tamil Nadu · GSTIN registered".
- **Shopper impact:** Believable claims build trust.
- **Business impact:** Indian buyers reward local specificity.

---

# Product Listing Improvements (Filters, Sort, Grid)

### PL-1 · `P0` — Restore the FilterPanel, sort, and view-mode controls

- **Why:** Without filters, a 30+-product catalog cannot be browsed effectively.
- **Shopper impact:** Find a sub-category, price band, or rating in one click.
- **Business impact:** Largest single conversion lift available — typically 20–40% on PLPs that gain proper filtering.
- **Logic:** Render `FilterPanel` on `lg+` as a sticky sidebar. On `< lg`, expose it via a "Filters" button that opens a bottom sheet (mobile) or side drawer.

### PL-2 · `P0` — Make the price slider a dual-thumb range

- **Why:** Today's single-thumb slider only mutates `priceRange[1]` despite labelling a min/max pair.
- **Shopper impact:** Honest filtering — users can exclude very cheap or very expensive items.
- **Business impact:** Better intent matching = higher PDP→ATC.

### PL-3 · `P0` — URL-sync filter state

- **Why:** Refresh, share, and back-button currently lose all filter state.
- **Shopper impact:** Shareable filtered URLs ("look at these chairs"); back-button works as expected.
- **Business impact:** Higher session-to-session continuity; better SEO for category permalinks.
- **Logic:** Encode `category`, `subcategories`, `badge`, `priceRange`, `minRating`, `sort`, and `q` (search) into the query string; hydrate from it on mount.

### PL-4 · `P0` — Add active-filter chips above the grid

- **Why:** Users currently can't see what filters are applied without opening the panel.
- **Shopper impact:** "Furniture · Sofas · Under ₹50,000 · 4★+" visible at a glance with one-tap removal per chip.
- **Business impact:** Faster filter iteration = more product views per session.

### PL-5 · `P0` — Result count + "Showing X of Y"

- **Why:** Today the page header says `{products.length}+`, which is the catalog total, not the filtered count.
- **Shopper impact:** Honest expectation-setting.
- **Business impact:** Reduces frustration when filters return zero results (combined with PL-6).

### PL-6 · `P1` — Smart empty states

- **Why:** "No products found 🔍" with a Reset button is generic. If the user filtered to a too-narrow price band, suggest expanding it.
- **Shopper impact:** Always given a next step.
- **Business impact:** Fewer abandoned PLP sessions.
- **Logic:** When 0 results, show: "No products in this filter set. Try removing the price filter | Browse all furniture | View bestsellers".

### PL-7 · `P1` — Pagination or infinite scroll with sentinel

- **Why:** All products render at once today. Catalog growth will degrade performance and scanning.
- **Shopper impact:** Faster initial paint, less scroll fatigue.
- **Business impact:** Scales as the catalog grows.

### PL-8 · `P1` — Search debounce + zero-state suggestions

- **Why:** Search re-runs on every keystroke; empty search shows the full catalog with no guidance.
- **Shopper impact:** Snappier interaction; gentle nudges toward popular categories.
- **Business impact:** Better discovery for repeat shoppers.

### PL-9 · `P2` — Save-search / "Notify me when in stock"

- **Why:** Out-of-stock products currently dead-end. Capturing intent here is cheap and high-value for a small inventory.
- **Shopper impact:** Confidence that they'll be told when an item returns.
- **Business impact:** Builds a re-engagement list.

---

# Product Detail Page Improvements

### PD-1 · `P0` — Real reviews or no reviews

- **Why:** Hard-coded `72%/12%/6%` bars are worse than no reviews — they actively erode trust.
- **Shopper impact:** Either credible peer evidence, or no false signal.
- **Business impact:** Reviews are the #1 PDP trust factor; faking them risks brand damage.
- **Logic (interim):** Hide the reviews tab and show a single line: "Be the first to review this product · Email us your feedback after delivery". Long-term: real verified-purchase reviews tied to order IDs.

### PD-2 · `P0` — Variant selector

- **Why:** Furniture and electronics typically have size/color/capacity variants. A sofa-without-fabric-choice is unrealistic.
- **Shopper impact:** Buys with confidence that they ordered the right configuration.
- **Business impact:** Reduces returns from "I expected a different colour" — the costliest type of return for furniture.
- **Logic:** Even before backend modelling, expose a single optional dimension where applicable (e.g., "Color: Charcoal | Beige | Walnut") that maps to different product images.

### PD-3 · `P0` — Sticky Add-to-Cart on mobile

- **Why:** On mobile, after scrolling to specs/reviews the CTA is invisible.
- **Shopper impact:** One-tap conversion from anywhere on the page.
- **Business impact:** Sticky ATC is the highest-leverage mobile commerce pattern; typical lift 5–15%.
- **Logic:** Bottom-fixed bar on `< md` showing thumbnail · price · ATC. Hides when the inline ATC is already in viewport.

### PD-4 · `P0` — After "Add to Cart", offer the next step inline

- **Why:** Today the green flash reverts after 2.5 s with no path to checkout.
- **Shopper impact:** A clear "View Cart" / "Checkout" appears next to the success state.
- **Business impact:** Reduces drop-off between ATC and cart entry.
- **Logic:** After ATC, the button morphs into a row: "✓ Added · [View Cart] [Continue]". Cart drawer slides in once.

### PD-5 · `P0` — Move trust pills next to price, not below CTAs

- **Why:** "Free Delivery · Warranty · 30-Day Returns" are conversion-critical and currently appear *after* the CTA, where they don't influence the click.
- **Shopper impact:** Trust signals visible at the moment of decision.
- **Business impact:** Cheaper CTA clicks because the user has already absorbed the risk-reducers.

### PD-6 · `P1` — Demote "Bulk Order" to an inline link (J-2)

### PD-7 · `P1` — Wishlist: persist or remove

- **Why:** Component-local state resets on navigation.
- **Shopper impact:** Either real saved items, or no false promise.
- **Business impact:** Persistent wishlist drives return visits.
- **Logic:** Move into a `WishlistContext` with `localStorage`, add `/wishlist` page. If not building it now, hide the heart icon entirely.

### PD-8 · `P1` — Working share button

- **Why:** Currently a no-op.
- **Shopper impact:** Word-of-mouth on WhatsApp/Instagram.
- **Business impact:** Free organic traffic; especially important for furniture which is shared with partners/family before purchase.
- **Logic:** Use `navigator.share` with WhatsApp/SMS fallbacks.

### PD-9 · `P2` — Quantity caps and stock-aware UX

- **Why:** Quantity has no upper bound; stock dot is binary in/out.
- **Shopper impact:** "Only 3 left" creates honest urgency; cap prevents fat-finger 9999 orders.
- **Business impact:** Higher conversion under scarcity, fewer fulfilment headaches.

### PD-10 · `P2` — Image zoom + lifestyle gallery distinction

- **Why:** Furniture sells on detail (texture, joinery). Electronics sells on context (room, hand). The gallery treats them identically.
- **Shopper impact:** Confident purchase decisions for tactile categories.
- **Business impact:** Higher PDP→ATC for high-AOV items.

---

# Cart & Checkout Improvements

### CC-1 · `P0` — Validate every payment field before "Confirm & Pay"

- **Why:** Users can submit empty card/UPI fields and the order "succeeds".
- **Shopper impact:** Real feedback when something is missing; no false success.
- **Business impact:** Once a real payment processor is wired, this is mandatory; even before, it teaches users the right pattern.
- **Logic:** Card: 16 digits + Luhn, MM/YY in future, 3-digit CVV. UPI: regex `[a-z0-9.\-_]+@[a-z]+`. COD: terms checkbox.

### CC-2 · `P0` — Auto-fill state from pincode

- **Why:** Indian addresses are pincode-anchored. Today state is optional yet shipping/tax depends on it.
- **Shopper impact:** Two fewer fields to think about.
- **Business impact:** Lower abandonment on the address step; correct shipping zone routing.
- **Logic:** On 6-digit pincode entry, hit a public pincode API or a bundled lookup table to fill city + state. Show a "We deliver to {city}" confirmation; if unsupported, surface a polite block: "We currently deliver to Tamil Nadu only — contact us for other regions" with a CTA to the bulk form.

### CC-3 · `P0` — Honest order total: COD fee, taxes, delivery thresholds

- **Why:** Copy mentions a ₹50 COD fee on orders < ₹999 but it's never added; "Free Delivery" claim conflicts with Home's "₹25,000 threshold".
- **Shopper impact:** No surprise at the door; one trustworthy total.
- **Business impact:** Eliminates RTO (return-to-origin) disputes from confused COD shoppers.
- **Logic:** Single source of truth (`OrderSummary` derives the total). If GST is itemised, show "Inclusive of 18% GST". Show the delivery threshold with progress: "Add ₹X more for free delivery".

### CC-4 · `P0` — GST invoice option for B2B

- **Why:** Bulk shoppers need a GSTIN on their invoice.
- **Shopper impact:** B2B users get a proper tax invoice.
- **Business impact:** Captures the wholesale/retail-trade segment that the brand is already advertising via "Bulk Enquiries".
- **Logic:** Optional checkbox: "I'm buying for a registered business" → reveals GSTIN + business name fields; renders on the invoice.

### CC-5 · `P0` — Order summary always shows what's being bought

- **Why:** Once the order is placed, items disappear (clearCart) before the invoice template renders, which is why the invoice shows "Your Order Items" placeholder.
- **Shopper impact:** Itemised invoice with real line items.
- **Business impact:** Real receipts unlock GST input-credit for B2B and reduce disputes.
- **Logic:** Snapshot the cart + total + currency into the persisted order (J-3) before clearing.

### CC-6 · `P1` — Single-page checkout with collapsible sections

- **Why:** Today's two-step pattern is fine, but a single-page review with collapsible "Address / Payment / Review" reduces perceived effort.
- **Shopper impact:** All info visible; can edit any section without losing position.
- **Business impact:** Lower abandonment on step transitions.

### CC-7 · `P1` — Make the UPI app chips functional or remove them

- **Why:** "GPay / PhonePe / Paytm" chips look interactive but do nothing.
- **Shopper impact:** Real intent → real launch (deep link to the chosen app).
- **Business impact:** Faster UPI completion = lower abandonment.

### CC-8 · `P1` — Save details for next time (guest-friendly)

- **Why:** Indian shoppers reorder; re-typing address is friction.
- **Shopper impact:** One-tap re-checkout on return.
- **Business impact:** Higher repeat-purchase rate.
- **Logic:** Store address + phone in `localStorage` under explicit consent; auto-fill on next visit with an "Edit" affordance.

### CC-9 · `P1` — Promo code + delivery estimate fields

- **Why:** Both are standard expectations on Indian e-commerce.
- **Shopper impact:** Reassurance and reward.
- **Business impact:** Promo codes lift first-purchase conversion; delivery ETAs reduce "when will it arrive?" tickets.

### CC-10 · `P2` — Address book / multiple saved addresses

- **Why:** Higher-value households (gifting, work address) want to switch.
- **Shopper impact:** Frictionless reorder to the right place.
- **Business impact:** Higher AOV from gift purchases.

---

# Order Status & Post-Purchase Improvements

### OS-1 · `P0` — Render the invoice and on-page totals in the user's currency

- **Why:** Invoice always renders `$` regardless of user choice.
- **Shopper impact:** A trustworthy receipt.
- **Business impact:** Eliminates a credibility-killing bug.

### OS-2 · `P0` — Persist the order (paired with J-3, CC-5)

### OS-3 · `P0` — Show the delivery address on the order page

- **Why:** Today the page omits where the order is going.
- **Shopper impact:** Immediate verification that the address is correct.
- **Business impact:** Catches typos before fulfilment; prevents misdeliveries.
- **Logic:** Show the address block prominently with an "Edit address (within 2 hours)" link.

### OS-4 · `P1` — Real progress states with timestamps

- **Why:** Tracking line is hard-coded `35%` with static text.
- **Shopper impact:** Genuine progress: "Order Confirmed (today, 4:12 PM) → Packing (tomorrow) → Out for Delivery → Delivered".
- **Business impact:** Reduces "where is my order?" tickets dramatically.
- **Logic:** Even without a logistics integration, a manual admin update via spreadsheet/Sheets-as-DB is enough to power honest statuses.

### OS-5 · `P1` — Action buttons: Track, Cancel, Contact, Reorder

- **Why:** Today the only actions are Continue Shopping + Download Invoice.
- **Shopper impact:** Self-serve for the common post-purchase needs.
- **Business impact:** Less email/call volume on simple requests.

### OS-6 · `P2` — Email + WhatsApp updates per status change

- **Why:** Indian shoppers expect transactional WhatsApp messages, not just email.
- **Shopper impact:** Updates reach them where they read.
- **Business impact:** Higher delivery success rate; cheaper than calls.

---

# Form Improvements (Checkout, Contact)

### F-1 · `P0` — Inline validation + clear error states

- **Why:** Today there's no error feedback at all on checkout fields.
- **Shopper impact:** Errors caught at the field, not after submit.
- **Business impact:** Lower abandonment.
- **Logic:** Validate on blur, show error below the field; on submit, scroll to the first error.

### F-2 · `P0` — Right input type + autocomplete attributes

- **Why:** Mobile users get the right keyboard, browsers can autofill.
- **Shopper impact:** Numeric pad for phone/pincode, email keyboard for email, autofill suggestions.
- **Business impact:** Faster checkout = higher conversion.
- **Logic:** `inputMode="numeric"` on pincode/CVV/card, `autocomplete="tel"`, `autocomplete="email"`, `autocomplete="postal-code"`, `autocomplete="street-address"`, etc.

### F-3 · `P0` — Real labels (visible, not just placeholders)

- **Why:** Placeholder-as-label disappears on focus and fails accessibility.
- **Shopper impact:** Knows what each field is for, even after typing.
- **Business impact:** Fewer mis-entries; AA compliance.

### F-4 · `P1` — Smart phone formatting (+91 prefix locked, 10-digit field)

- **Why:** Most Indian shoppers will type "97155 90101" or "+91 9715590101" inconsistently.
- **Shopper impact:** Less worry about format.
- **Business impact:** Cleaner phone data → better SMS/WhatsApp delivery.

### F-5 · `P1` — Contact form: bulk-enquiry path with product context

- **Why:** Today `/contact?type=bulk` exists but doesn't pre-attach product info.
- **Shopper impact:** Faster to fill — the product context is already there.
- **Business impact:** Higher-quality leads.

### F-6 · `P2` — Optimistic submit with retry on failure

- **Why:** Network blips on mobile shouldn't kill an entire form.
- **Shopper impact:** "We're saving your order — don't refresh" with auto-retry.
- **Business impact:** Recovers orders that would otherwise drop.

---

# CTA Improvements

### CTA-1 · `P0` — One primary CTA per surface

| Surface | Primary | Secondary |
|---|---|---|
| Hero | "Shop Furniture" *or* a unified "Shop Now" → category landing | "How we deliver" (link, not button) |
| Category tile | "Browse {category}" | — |
| PLP card | Card click → PDP | Tiny ATC icon (current pattern is fine) |
| PDP | "Add to Cart" | Bulk order *link* (not button) |
| Cart drawer / page | "Proceed to Checkout" | "Continue Shopping" (link) |
| Checkout step 1 | "Continue to Payment" | "Back to Cart" (link) |
| Checkout step 2 | "Confirm & Pay {total}" | "Back" (link) |
| Order status | "Continue Shopping" | "Download Invoice" / "Track Order" |

- **Why:** Today multiple CTAs share visual weight (Bulk Order + Add to Cart, Shop Collection + Our Story). Decision cost goes up.
- **Shopper impact:** Clear default action at every step.
- **Business impact:** Higher click-through on the path that converts.

### CTA-2 · `P0` — CTA copy is specific and value-oriented

- "Shop Collection" → "Shop Furniture" / "Shop Electronics"
- "Continue to Payment" → "Continue to Payment ({total})"
- "Confirm & Pay" → keeps the total (already does — good)
- "Our Story" → "About Suman" or just remove from the hero — story belongs on `/about`
- **Shopper impact:** Predictable click outcomes.
- **Business impact:** Higher CTR.

### CTA-3 · `P1` — Disabled-state semantics

- **Why:** Today the "Continue to Payment" disabled state has no message about *why* it's disabled.
- **Shopper impact:** "Fill required fields to continue" feedback below the button.
- **Business impact:** Faster recovery from incomplete forms.

### CTA-4 · `P1` — Sticky primary CTA on long pages (PDP, checkout)

- **Why:** Long content + bottom CTA = invisible CTA on mobile.
- **Shopper impact:** Always reachable.
- **Business impact:** Conversion lift, especially on PDP (PD-3).

---

# User Psychology & Trust Improvements

### T-1 · `P0` — Honest > inflated

- Drop "10K+ customers / 48 cities" until backed by data.
- Replace with verifiable cues:
  - "GSTIN-registered Tamil Nadu business since 2022"
  - "Free delivery across Tamil Nadu (₹X threshold)"
  - "30-day no-questions returns on furniture"
  - "Call us anytime: +91 97155 90101"
- **Why:** Local, specific, verifiable trust beats inflated marketing trust 10:1 for a small Indian business.
- **Shopper impact:** Believability rises sharply.
- **Business impact:** Higher first-purchase conversion in the brand's actual catchment.

### T-2 · `P0` — Reconcile the brand identity (UI-1)

- Pick one: *Suman Tech Automation* (legal/registered) is most aligned with GSTIN. Use it everywhere.
- Update metadata, header, footer, theme storage key, copy.
- **Why:** Identity dissonance is the fastest trust killer for first-time visitors.
- **Shopper impact:** A single, recognisable brand.
- **Business impact:** Stronger brand recall and SEO consolidation.

### T-3 · `P0` — Surface trust at the moment of decision

- **PDP price block:** GSTIN line + "Free delivery in Tamil Nadu" + "Returns within 30 days"
- **Checkout header:** "🔒 Your details are encrypted — we never share them"
- **Footer:** Real social handles (or none)
- **Why:** Risk-reducers have to be visible *when the user is taking the risk*.
- **Shopper impact:** Lower hesitation at checkout.
- **Business impact:** Higher conversion at the lowest-funnel step.

### T-4 · `P1` — Real testimonials with verifiable details

- Add city, product name, date, and avatar (initial-circle is fine).
- Tag verified-purchase reviews with a small badge tied to an order ID.
- **Why:** Generic 5-star testimonials feel generated.
- **Shopper impact:** Peer evidence for similar buyers.
- **Business impact:** Highest-leverage trust signal in e-commerce.

### T-5 · `P1` — Loss-aversion framing on returns/warranty

- "30-day returns — *we pay return shipping*" beats "Easy returns".
- "5-year structural warranty" beats "Quality guaranteed".
- **Why:** Concrete loss-protection language is more persuasive than abstract reassurance.
- **Shopper impact:** Less hesitation on high-AOV furniture.
- **Business impact:** More PDP→ATC conversion on big-ticket items.

### T-6 · `P2` — Anchor pricing transparently

- When "originalPrice" is shown, ensure it reflects an actual recent price (not a fake MRP).
- Show "You save ₹X (Y%)" honestly.
- **Why:** Indian shoppers are skilled at spotting fake MRPs; real anchors build long-term trust.

---

# Information Hierarchy Improvements

### IH-1 · `P0` — Make price the visual anchor on every commerce surface

- **Why:** Price is the deciding signal; today it's smaller than the product title on PLP cards (16 px vs 16 px+) and tiny in the order summary (12 px).
- **Shopper impact:** Faster scanning of price-driven decisions.
- **Business impact:** More efficient browsing → more PDP entries.

### IH-2 · `P0` — Stable badge anchor positions

- **Why:** PDP places badge at `top-4 left-4` and discount at `top-4 right-4`; ProductCard places badge at `top-3 left-3` and discount at `top-10 left-3`. Inconsistency makes the user re-learn.
- **Shopper impact:** Predictable layout = faster scanning.
- **Business impact:** Lower cognitive friction across the catalog.
- **Logic:** Single rule: status badge top-left, discount badge bottom-left of the image; wishlist top-right; nothing else on top of the image.

### IH-3 · `P0` — Group decisions on the PDP

Suggested vertical order in the right column on PDP:
1. Eyebrow (sub-category)
2. Product name
3. Star rating + review count
4. Price block (current price · original price · saving)
5. Trust pills (Free Delivery · Warranty · 30-Day Returns)
6. Variant selector (if any)
7. Quantity
8. Primary CTA: Add to Cart
9. Secondary link: "Buying for a project? Get a bulk quote →"
10. Stock + delivery ETA ("Order in next 2h for delivery by Tue")

- **Why:** Today trust pills sit *below* CTAs and bulk order shares visual weight with ATC.
- **Shopper impact:** Decisions are presented in the order the user makes them.
- **Business impact:** Higher PDP→ATC.

### IH-4 · `P1` — Section eyebrows visually distinct from links

- **Why:** Both are `text-xs uppercase tracking-widest text-[#4a6fa5]`. Today they collide.
- **Shopper impact:** Reading flow.
- **Business impact:** Lower scan friction.
- **Logic (UX-only here):** Eyebrows above headings, links inline with body — different placement, not just style.

### IH-5 · `P1` — Predictable page rhythm

Each long page (Home, PLP, PDP) gets a consistent vertical rhythm: hero/heading → primary content → social proof → secondary content → footer. Avoid stacking 6+ heterogeneous sections.

---

# Mobile UX Improvements

### M-1 · `P0` — Mobile filter sheet on PLP

- **Why:** Filters are absent on mobile (PL-1 + the audit's M-1).
- **Shopper impact:** Catalog is browseable on the canonical viewport.
- **Business impact:** Largest mobile conversion lever.
- **Logic:** A "Filters · {n}" button in the sticky sub-header opens a bottom sheet with the same controls as desktop. "Apply" closes the sheet and updates the URL.

### M-2 · `P0` — Sticky Add-to-Cart on PDP (PD-3)

### M-3 · `P0` — Currency switcher available in the mobile menu (N-1, N-7)

### M-4 · `P0` — Thumb-zone hit areas

- **Why:** Many controls are 32–36 px (filters chips, quantity, share/wishlist). Apple HIG / Material recommend 44 px.
- **Shopper impact:** Fewer mistaps.
- **Business impact:** Lower frustration-driven abandonment.

### M-5 · `P1` — One-handed reach

- Primary CTAs near the bottom of the viewport on PDP (sticky ATC) and checkout (sticky Continue/Pay) on mobile.
- Hamburger menu items ordered by priority (Shop > Cart > Currency > Theme > Pages > Bulk).

### M-6 · `P1` — Reduce hero scale on mobile

- **Why:** `text-5xl sm:text-7xl lg:text-8xl` is generous; the priority on small viewports is "see the value prop and the CTA without scrolling".
- **Shopper impact:** Hero CTA visible on first paint.
- **Business impact:** Higher hero-CTA tap rate.

### M-7 · `P2` — Respect `prefers-reduced-motion`

- **Why:** Marquee + Framer Motion staggers can be motion-sickness inducing and battery-heavy.
- **Shopper impact:** Comfortable browsing for sensitive users.
- **Business impact:** Inclusive experience; faster perceived performance on low-end Android.

---

# Accessibility Enhancements

(These are *experience* recommendations; visual implementation comes in stage 3.)

### A-1 · `P0` — Keyboard parity

- All interactive elements reachable via Tab; Enter/Space activates them; Escape closes overlays (cart drawer, mobile menu, filter sheet, modals).
- Replace `<div onClick>` checkboxes with real `<input type="checkbox">` in `FilterPanel`.

### A-2 · `P0` — Screen-reader names for all controls

- "Add Aurora Sofa to cart" instead of just an icon button.
- "Switch to dark theme" / "Switch to light theme" — dynamic.
- Step indicator: "Step 2 of 2: Payment".

### A-3 · `P0` — Form semantics

- Visible `<label>` per input.
- `aria-describedby` for errors.
- `aria-invalid="true"` on error fields.

### A-4 · `P1` — Focus management

- After opening cart drawer / filter sheet, move focus inside; trap focus while open; restore on close.
- Skip-to-content link at the top of every page.

### A-5 · `P1` — Live regions for async actions

- ATC success → polite live region: "{Product} added to cart, {n} items total".
- Filter result count → polite live region: "{n} products match".

### A-6 · `P2` — Tablist semantics on PDP tabs (Description / Specs / Reviews)

### A-7 · `P2` — Reduced-motion respect (M-7)

---

# Recommended UX Priorities

### P0 — Must ship before any redesign (week 1–2)

1. Restore PLP filters + sort + URL sync (PL-1, PL-2, PL-3, PL-4, PL-5)
2. Mobile filter sheet + sticky ATC + currency in mobile menu (M-1, M-2, M-3)
3. Persist the order; render invoice in correct currency (J-3, OS-1, OS-2, OS-3, CC-5)
4. Validate checkout fields; pincode → state autofill; honest totals (CC-1, CC-2, CC-3)
5. Reconcile brand identity (T-2)
6. Fix or remove dead controls: trending carousel, wishlist, share, UPI app chips, footer `#` links (J-1 prerequisite, PD-7, PD-8, CC-7, N-4)
7. Reviews: hide the fake bars or ship real reviews (PD-1)
8. PDP information hierarchy: trust pills next to price, single primary CTA, sticky ATC on mobile (PD-3, PD-4, PD-5, IH-3)
9. Surface concrete trust signals in PDP/checkout (T-1, T-3, N-5)
10. Form fundamentals: real labels, autocomplete, inline validation (F-1, F-2, F-3)

### P1 — High-leverage (week 3–6)

1. Global header search (N-3)
2. Cart page (`/cart`) (J-4)
3. Variant selectors on PDP (PD-2)
4. GST invoice option for B2B (CC-4)
5. Single-page checkout / save details (CC-6, CC-8)
6. Email + WhatsApp order confirmation (J-5)
7. Real progress states + post-purchase actions (OS-4, OS-5)
8. Active-filter chips, smart empty states, debounced search, pagination (PL-4, PL-6, PL-7, PL-8)
9. Real testimonials + reconciled trust copy (T-4, T-5)
10. Working share, persistent wishlist or removal (PD-7, PD-8)

### P2 — Polish & growth (week 7+)

1. Save-search / notify-when-in-stock (PL-9)
2. Stock-aware urgency cues (PD-9)
3. Image zoom + lifestyle gallery distinction (PD-10)
4. Address book / multiple saved addresses (CC-10)
5. Promo codes + delivery estimates (CC-9)
6. Honest anchor pricing (T-6)
7. Reduced-motion + accessibility tabs/aria-live (A-6, A-7, M-7)
8. Auto-hide header on scroll (N-8)

---

**Strategy complete.** This document is the foundation for `outputs/03_visual_redesign_direction.md`, which converts these UX intents into a coherent visual system (typography, layout, color hierarchy, component patterns) without changing the behaviours defined here.
