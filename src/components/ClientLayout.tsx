"use client";

import { useState, useEffect } from "react";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { SmoothScroller } from "@/components/SmoothScroller";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("suman-agency-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial as "light" | "dark");
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("suman-agency-theme", next);
  };

  if (!mounted) return null;

  return (
    <CurrencyProvider>
      <CartProvider>
        <SmoothScroller>
          <div className={theme === "dark" ? "dark" : ""} style={{ background: theme === "dark" ? "#0d0d0d" : "#faf8f4", minHeight: "100vh" }}>
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main>{children}</main>
            <Footer theme={theme} />

            {/* Floating WhatsApp Button */}
            <a
              href="https://wa.me/91+91 97155 90101"
              target="_blank"
              rel="noopener noreferrer"
              className="floating-cta"
              aria-label="Chat with us on WhatsApp"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg, #0d9488, #0f766e)",
                  boxShadow: "0 4px 20px rgba(13, 148, 136,0.5)",
                }}
              >
                <MessageCircle size={24} />
              </div>
            </a>
          </div>
        </SmoothScroller>
      </CartProvider>
    </CurrencyProvider>
  );
}
