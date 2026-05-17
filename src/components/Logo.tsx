"use client";

import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "header" | "footer";
  href?: string;
  className?: string;
}

/**
 * Single brand mark shared by Header + Footer.
 * Audit N-8 (duplicated inline) and UI-7 (9-px subtitle below readability).
 * Subtitle now lives on aria-label only.
 */
export function Logo({ variant = "header", href = "/", className }: LogoProps) {
  const size = variant === "header" ? 40 : 36;
  return (
    <Link
      href={href}
      aria-label={`${site.brand} — Furniture & Electronics`}
      className={cn(
        "inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-() focus-visible:ring-offset-2 rounded-md",
        className
      )}
    >
      <span
        className="inline-flex items-center justify-center rounded-lg shrink-0"
        style={{
          width: size,
          height: size,
          background: "var(--color-brand-700)",
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" width={size * 0.7} height={size * 0.7}>
          <path d="M 50 25 L 75 42 L 75 45 L 25 45 L 25 42 Z" fill="#ffffff" />
          <rect x="30" y="45" width="40" height="35" rx="2" fill="#ffffff" />
          <rect x="44" y="60" width="12" height="20" rx="1" fill="var(--color-brand-700)" />
          <rect x="33" y="50" width="9" height="9" rx="1" fill="var(--color-brand-100)" />
          <rect x="58" y="50" width="9" height="9" rx="1" fill="var(--color-brand-100)" />
        </svg>
      </span>
      <span
        className="font-semibold leading-tight tracking-tight text-()"
        style={{ fontSize: variant === "header" ? "1rem" : "1.0625rem" }}
      >
        {site.brand}
      </span>
    </Link>
  );
}
