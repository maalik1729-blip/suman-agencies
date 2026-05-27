# outputs/change_log.md — Suman Agencies UI Redesign

Pipeline: ui_redesign/ui-redesign.md (Stages 1–4 executed)

---

| Timestamp | File | What Changed |
|-----------|------|--------------|
| 2026-05-27T13:21 | src/components/SmoothScroller.tsx | **Fix 1** — Lenis removed. Component is now a passthrough fragment (`<>{children}</>`). Eliminates Android scroll hijacking. |
| 2026-05-27T13:21 | src/app/globals.css | **Fix 7** — Added `scroll-behavior: smooth` to `html` element. Added `@keyframes fadeInUp` + `.animate-fade-up` class. Added `@keyframes scaleIn` + `.animate-scale-in` class. Both respect existing `prefers-reduced-motion` media query. |
| 2026-05-27T13:23 | src/app/page.tsx | **Fix 2** — `framer-motion` import removed. Hero `motion.p`, `motion.h1`, `motion.div` replaced with CSS `animate-fade-up` class + staggered `animationDelay`. TrendingCarousel `AnimatePresence`+`motion.div` replaced with a keyed plain `div` using `transition-opacity`. |
| 2026-05-27T13:24 | src/app/products/page.tsx | **Fix 3** — `framer-motion` import removed. Product grid `AnimatePresence`+`motion.div` replaced with a keyed plain `div` using `transition-opacity`. **Fix 6** — Hardcoded `₹` symbol in price filter chip replaced with `formatPrice()` from `useCurrency()`. Added `useCurrency` hook import. |
| 2026-05-27T13:25 | src/app/order-status/page.tsx | **Fix 4** — `framer-motion` import removed. Success header `motion.div` (spring scale animation) replaced with a plain `div` using `animate-scale-in` CSS class. |
| 2026-05-27T13:26 | src/app/checkout/page.tsx | **Fix 5** — `framer-motion` import removed. Step 1 and Step 2 `AnimatePresence`+`motion.div` transitions replaced with plain `div` elements using `transition-opacity duration-150`. |

---

## Framer Motion Status

Search `from "framer-motion"` in src/:
- `src/app/page.tsx` → ✅ Removed
- `src/app/products/page.tsx` → ✅ Removed
- `src/app/order-status/page.tsx` → ✅ Removed
- `src/app/checkout/page.tsx` → ✅ Removed

`framer-motion` package remains in `node_modules` (not removed per project-rules: no package deletion allowed) but has **zero runtime importers** after these changes.

## Lenis Status

Search `import Lenis` / `SmoothScroller` in src/:
- `src/components/SmoothScroller.tsx` → ✅ Lenis logic removed, component is passthrough
- `src/components/ClientLayout.tsx` → `<SmoothScroller>` wrapper still present but now a no-op passthrough

`lenis` package remains in `node_modules` but does not execute.

## Currency Status

Search for hardcoded `"₹"` in src/:
- `src/app/products/page.tsx` → ✅ Fixed (price chip now uses `formatPrice()`)
- All other files already used `useCurrency()` correctly ✅

## next/image Status

Search for `<img` in src/:
- ✅ Zero raw `<img>` tags — all images use `<Image>` from `next/image`

## Order ID Status

- `src/lib/id.ts` → Uses `crypto.getRandomValues` (Crockford base32) ✅ No client-side Date.now()
