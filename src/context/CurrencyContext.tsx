"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "INR" | "USD" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInINR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const EXCHANGE_RATES = {
  INR: 1,
  USD: 0.012, // Approx 1 / 83
  EUR: 0.011, // Approx 1 / 90
};

const SYMBOLS = {
  INR: "₹",
  USD: "$",
  EUR: "€",
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {~
    setMounted(true);
    const stored = localStorage.getItem("suman-agency-currency") as Currency;
    if (stored && ["INR", "USD", "EUR"].includes(stored)) {
      setCurrency(stored);
    }
  }, []);

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem("suman-agency-currency", newCurrency);
  };

  const formatPrice = (priceInINR: number) => {
    if (!mounted) {
      // Server-side render: default to INR to prevent hydration mismatch
      return `₹${priceInINR.toLocaleString("en-IN")}`;
    }

    const rate = EXCHANGE_RATES[currency];
    const convertedPrice = priceInINR * rate;

    if (currency === "INR") {
      return `₹${Math.round(convertedPrice).toLocaleString("en-IN")}`;
    } else if (currency === "USD") {
      return `$${convertedPrice.toFixed(2)}`;
    } else {
      return `€${convertedPrice.toFixed(2)}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
