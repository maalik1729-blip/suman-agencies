"use client";

// Lenis removed (Fix 1 — ui_redesign/ui-redesign.md).
// Native browser scroll restored for Android compatibility.
// scroll-behavior: smooth is handled in globals.css.
export function SmoothScroller({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
