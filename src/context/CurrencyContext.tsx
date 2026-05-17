"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { site } from "@/data/site";

export type Currency = "INR" | "USD" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  /** Format an INR amount in the user's selected currency. */
  formatPrice: (priceInINR: number) => string;
  /** Currency symbol for the active currency. */
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Approximate static rates — replace with live FX when a backend exists.
const EXCHANGE_RATES: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
};

const SYMBOLS: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>("INR");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(site.storage.currency) as Currency | null;
      if (stored && (["INR", "USD", "EUR"] as const).includes(stored)) {
        setCurrencyState(stored);
      } else {
        // Migrate from old key if present
        const legacy = window.localStorage.getItem("suman-agency-currency") as Currency | null;
        if (legacy && (["INR", "USD", "EUR"] as const).includes(legacy)) {
          setCurrencyState(legacy);
          window.localStorage.setItem(site.storage.currency, legacy);
        }
      }
    } catch {
      /* private mode / quota — ignore */
    }
  }, []);

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
    try {
      window.localStorage.setItem(site.storage.currency, next);
    } catch {
      /* noop */
    }
  }, []);

  const formatPrice = useCallback(
    (priceInINR: number) => {
      // SSR-stable default to avoid hydration mismatch — render INR until mounted.
      const active: Currency = mounted ? currency : "INR";
      const converted = priceInINR * EXCHANGE_RATES[active];
      if (active === "INR") return `₹${Math.round(converted).toLocaleString("en-IN")}`;
      if (active === "USD") return `$${converted.toFixed(2)}`;
      return `€${converted.toFixed(2)}`;
    },
    [currency, mounted]
  );

  const value = useMemo(
    () => ({ currency, setCurrency, formatPrice, symbol: SYMBOLS[currency] }),
    [currency, setCurrency, formatPrice]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
