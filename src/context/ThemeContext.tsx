"use client";

// F-2 single ThemeContext — wraps `next-themes` so we don't have a per-page
// MutationObserver duplicated across 4 files (audit UX-11).
//
// All page-level theme reads should call `useTheme()` from this file.

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import type { ReactNode } from "react";
import { site } from "@/data/site";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey={site.storage.theme}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

/**
 * Stable theme hook with an SSR-safe `resolved` value.
 * Returns `"light" | "dark"` after mount, or `"light"` during SSR/first paint.
 */
export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();
  const resolved: "light" | "dark" =
    resolvedTheme === "dark" ? "dark" : "light";
  return {
    theme: theme ?? "system",
    setTheme,
    resolvedTheme: resolved,
    systemTheme: (systemTheme as "light" | "dark" | undefined) ?? "light",
  };
}
