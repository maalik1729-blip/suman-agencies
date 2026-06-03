"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

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
// USD pegged to 1 USD = 95.72 INR (i.e. 1 INR = 1/95.72 USD).
const EXCHANGE_RATES: Record<Currency, number> = {
  INR: 1,
  USD: 1 / 95.72,
  EUR: 0.011,
};

const SYMBOLS: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // USD is the fixed default on every load. Users may switch via the header
  // switcher; the choice applies for the current session.
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
  }, []);

  const formatPrice = useCallback(
    (priceInINR: number) => {
      // SSR-stable default to avoid hydration mismatch — render USD until mounted.
      const active: Currency = mounted ? currency : "USD";
      const converted = priceInINR * EXCHANGE_RATES[active];
      if (active === "INR") return `₹${Math.round(converted).toLocaleString("en-IN")}`;
      if (active === "USD") return `$${Math.round(converted).toLocaleString("en-US")}`;
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
