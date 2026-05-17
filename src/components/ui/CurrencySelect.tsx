"use client";

import { useCurrency } from "@/context/CurrencyContext";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "INR", label: "₹ INR" },
  { value: "USD", label: "$ USD" },
  { value: "EUR", label: "€ EUR" },
] as const;

interface CurrencySelectProps {
  variant?: "segmented" | "compact";
  className?: string;
}

/** Always-visible currency switcher. Audit UX-3, N-1, M-3. */
export function CurrencySelect({ variant = "compact", className }: CurrencySelectProps) {
  const { currency, setCurrency } = useCurrency();

  if (variant === "segmented") {
    return (
      <div
        role="radiogroup"
        aria-label="Currency"
        className={cn(
          "inline-flex items-center rounded-md border border-() bg-() p-0.5",
          className
        )}
      >
        {OPTIONS.map((o) => {
          const active = currency === o.value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setCurrency(o.value)}
              className={cn(
                "h-8 px-3 text-xs font-medium rounded-[5px] transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-()",
                active
                  ? "bg-() text-white"
                  : "text-() hover:bg-()"
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <label className={cn("relative inline-flex items-center", className)}>
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as "INR" | "USD" | "EUR")}
        className={cn(
          "h-9 pl-3 pr-8 rounded-md border border-() bg-() text-sm text-()",
          "hover:border-() focus:outline-none focus:border-() focus:ring-4 focus:ring-()",
          "appearance-none cursor-pointer transition-[border-color,box-shadow] duration-150"
        )}
        aria-label="Select currency"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        className="absolute right-2.5 text-() pointer-events-none"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  );
}
