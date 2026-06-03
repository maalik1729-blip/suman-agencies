# Agent Rules — Suman Agencies Frontend Redesign

## Scope Enforcement (Highest Priority)
- NEVER modify: package.json, next.config.ts, tsconfig.json,
  eslint.config.mjs, or any file outside src/
- NEVER add new npm packages — work with what is installed
- NEVER modify the outputs/ folder contents from a previous stage run
  (append a _v2 suffix if re-running)
- ALL changes are inside src/ only (app/, components/, context/, hooks/, lib/, data/)

## Code Rules
- TypeScript only — no .js files inside src/
- Tailwind classes only for styling — no inline style={} objects
  unless Tailwind cannot express the property
- Use CSS custom properties (var(--color-brand)) in src/app/globals.css
  as the single source of truth for brand colors
- Do not introduce new component libraries — use what is in
  src/components/ui/ already
- Framer Motion: reduce, do not add new usages
- GSAP: keep only if used for a non-trivial, irreplaceable animation
- Lenis (SmoothScroller.tsx): remove entirely
- next/image: use for every product and hero image — no raw <img> tags

## Quality Rules
- Every change must be TypeScript-valid — no @ts-ignore additions
- All currency values must be rendered through useCurrency() hook —
  never hardcode "$" or "₹" symbols directly
- Order IDs must never be generated with Date.now() client-side
- GSTIN must always appear in the footer with label "GST Registered Business"
- Touch targets: all interactive elements must have min-h-11 (44px)
  on mobile — check Tailwind responsive prefix
- next/image requires width, height (or fill + relative container), sizes, and alt

## Communication Rules
- After each stage: post a 3-line summary in chat
  Line 1: Files read
  Line 2: Files written/modified
  Line 3: Top finding or blocker
- If a required file from a previous stage is missing:
  HALT and tell the user exactly which command to run first
- If a src/ file does not exist where expected:
  List what files DO exist in that directory before proceeding
- Never silently skip a fix from Stage 4

## Output Rules
- outputs/ folder: markdown files only, no code files
- src/ changes: real working TypeScript/TSX code only
- Document every src/ file modified in outputs/change_log.md
  Format: [timestamp] | [file path] | [what changed]
