# Suman Agencies UI Redesign — Antigravity Workflow

Frontend-only redesign pipeline. No backend changes.

---

## Setup (One Time)

1. Copy this entire `ui_redesign/` folder into the root of the
   suman-agencies project:

   ```
   suman-agencies/
   ├── ui_redesign/        ← drop here
   ├── src/
   ├── package.json
   └── ...
   ```

2. Open the suman-agencies folder as a Workspace in Antigravity:
   Agent Manager → + Open Workspace → select suman-agencies/

3. Antigravity will auto-load GEMINI.md from ui_redesign/

---

## How to Run

Full pipeline (all 5 stages, no interruptions):
```
/ui-redesign
```

Individual stages (run in order):
```
/ui-audit          ← reads src/ code, writes outputs/01_ui_audit.md
/ux-strategy       ← reads audit, writes outputs/02_ux_strategy.md
/visual-tokens     ← writes outputs/03_visual_tokens.md + updates src/app/globals.css
/component-fixes   ← modifies actual src/ files, writes outputs/04_change_plan.md
/ux-review         ← verifies all changes, opens browser at 375px
```

---

## What Gets Changed

| Stage | Output docs | Actual src/ changes |
|-------|-------------|---------------------|
| 1 — Audit | outputs/01_ui_audit.md | None |
| 2 — Strategy | outputs/02_ux_strategy.md | None |
| 3 — Tokens | outputs/03_visual_tokens.md | src/app/globals.css (tokens added) |
| 4 — Fixes | outputs/04_change_plan.md | src/components/Navbar.tsx (currency, search) |
| | | src/components/CartDrawer.tsx (currency fix) |
| | | src/components/ProductCard.tsx (next/image, ATC) |
| | | src/components/FilterPanel.tsx (mobile toggle) |
| | | src/components/Footer.tsx (GSTIN, real links) |
| | | src/components/SmoothScroller.tsx (Lenis removed) |
| | | src/app/page.tsx (home sections cleaned) |
| | | src/app/products/page.tsx (PLP filter reinstated) |
| | | src/app/products/[slug]/page.tsx (sticky ATC) |
| | | src/app/checkout/page.tsx (currency-correct totals) |
| | | src/app/order-status/page.tsx (server-issued order ID) |
| 5 — Review | outputs/05_final_review.md | None (verification only) |

---

## What Does NOT Get Changed

- package.json
- next.config.ts
- tsconfig.json
- eslint.config.mjs
- Any file outside src/
- Any API route handler
- CartContext.tsx / CurrencyContext.tsx logic (restructure only if UX-critical)

---

## After the Pipeline

Run in terminal to confirm no errors:
```
npm run build
```

If build passes → share outputs/05_final_review.md for sign-off.
If build fails → share the error with the agent:
"Fix TypeScript errors from the build: [paste error]"

---

## Project Structure After Pipeline Runs

```
suman-agencies/
├── ui_redesign/              ← this folder (don't delete)
│   ├── GEMINI.md
│   ├── README.md
│   ├── ui-redesign.md        ← full pipeline workflow
│   ├── stages.md             ← individual stage slash commands
│   └── project-rules.md     ← agent rules
├── outputs/                  ← agent writes here
│   ├── 01_ui_audit.md
│   ├── 02_ux_strategy.md
│   ├── 03_visual_tokens.md
│   ├── 04_change_plan.md
│   ├── 05_final_review.md
│   └── change_log.md
├── src/                      ← agent modifies these
│   ├── app/
│   │   ├── globals.css       ← tokens added
│   │   ├── layout.tsx        ← Lenis removed, shared layout confirmed
│   │   ├── page.tsx          ← Home cleaned
│   │   ├── products/         ← PLP + PDP fixed
│   │   ├── checkout/         ← currency-correct totals
│   │   └── order-status/     ← server-issued order IDs
│   └── components/
│       ├── Navbar.tsx        ← currency switcher, search, mobile drawer
│       ├── CartDrawer.tsx    ← currency fix, real totals
│       ├── ProductCard.tsx   ← next/image, ATC affordance
│       ├── FilterPanel.tsx   ← mobile filter toggle reinstated
│       └── Footer.tsx        ← GSTIN context, real policy links
└── ...
```
