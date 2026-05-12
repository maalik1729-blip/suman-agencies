"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Sun, Moon, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { cn } from "@/lib/utils";
import { CartDrawer } from "./CartDrawer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const pathname = usePathname();
  const { totalItems, setIsOpen } = useCart();
  const { currency, setCurrency } = useCurrency();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // The Home page has a dark image hero, so it needs white text when at the top.
  // Other pages have a standard light/dark background, so they should always use theme colors.
  const isDarkHero = pathname === "/" && !scrolled;

  const linkColor = !isDarkHero
    ? theme === "dark"
      ? "text-[#e8edf5]/80 hover:text-[#e8edf5]"
      : "text-[#1a1d23]/75 hover:text-[#1a1d23]"
    : "text-white/85 hover:text-white";

  const iconColor = !isDarkHero
    ? theme === "dark"
      ? "text-[#e8edf5]/80 hover:bg-white/10"
      : "text-[#1a1d23]/70 hover:bg-black/5"
    : "text-white/85 hover:bg-white/10";

  const logoColor = !isDarkHero
    ? theme === "dark" ? "#e8edf5" : "#1a1d23"
    : "#ffffff";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/10 shadow-luxe py-3"
            : "bg-transparent py-5"
        )}
        style={{
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          background: scrolled
            ? theme === "dark"
              ? "rgba(13,16,23,0.90)"
              : "rgba(248,250,252,0.92)"
            : "transparent",
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Logo Icon: sofa silhouette */}
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2f52, #101d33)" }}>
              <svg viewBox="0 0 100 100" width="26" height="26" xmlns="http://www.w3.org/2000/svg">
                <text x="50" y="68" fontFamily="'Times New Roman', Times, serif" fontWeight="bold" fontStyle="italic" fontSize="56" letterSpacing="-2" fill="#e8c97a" textAnchor="middle">SA</text>
                <rect x="30" y="76" width="40" height="4" rx="2" fill="#e8c97a" opacity={0.8} />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-lg font-bold tracking-tight font-serif transition-colors duration-300"
                style={{ color: logoColor }}
              >
                Suman Agency
              </span>
              <span className="text-[9px] font-medium tracking-widest uppercase" style={{ color: logoColor, opacity: 0.6 }}>
                Furniture &amp; Electronics
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                      active
                        ? isDarkHero ? "text-white" : "text-[#4a6fa5]"
                        : linkColor
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                    {active && (
                      <span className={cn("absolute bottom-1 left-4 right-4 h-0.5 rounded-full", isDarkHero ? "bg-white/50" : "bg-[#4a6fa5]")} />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Currency Toggle — only on product detail pages */}
            {/^\/products\/[^/]+$/.test(pathname) && (
              <div className={cn("hidden sm:flex items-center rounded-full p-1 border", theme === "dark" ? "border-white/10 bg-white/5" : "border-black/10 bg-white")}>
                {(["INR", "EUR", "USD"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={cn(
                      "px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300",
                      currency === c
                        ? "bg-[#4a6fa5] text-white shadow-sm"
                        : theme === "dark" ? "text-white/60 hover:text-white" : "text-[#4a6fa5]/80 hover:text-[#4a6fa5]"
                    )}
                  >
                    {c === "INR" ? "₹ " : c === "EUR" ? "€ " : "$ "}
                    {c}
                  </button>
                ))}
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110",
                !isDarkHero
                  ? theme === "dark"
                    ? "text-[#6b8fc4] hover:bg-white/10"
                    : "text-[#1a1d23]/70 hover:bg-black/5"
                  : "text-white/85 hover:bg-white/10"
              )}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              className={cn(
                "relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110",
                iconColor
              )}
              aria-label={`Shopping cart, ${totalItems} items`}
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#4a6fa5] text-white text-[10px] font-bold flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {/* Bulk Enquiries CTA */}
            <Link
              href="/contact?type=bulk"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #4a6fa5, #2d4f7c)",
                boxShadow: "0 2px 12px rgba(74, 111, 165, 0.35)",
              }}
            >
              Bulk Enquiries
              <ChevronRight size={14} />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200",
                !isDarkHero
                  ? theme === "dark"
                    ? "text-[#f0ece6] hover:bg-white/10"
                    : "text-[#1a1a1a] hover:bg-black/5"
                  : "text-white hover:bg-white/10"
              )}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={cn(
            "md:hidden overflow-hidden transition-all duration-400",
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
          style={{
            background:
              theme === "dark"
                ? "rgba(13,16,23,0.97)"
                : "rgba(248,250,252,0.97)",
            backdropFilter: "blur(24px)",
          }}
        >
          <ul className="px-4 pb-4 pt-2 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      active
                        ? "bg-[#4a6fa5]/10 text-[#4a6fa5]"
                        : theme === "dark"
                        ? "text-[#e8edf5]/80 hover:bg-white/5 hover:text-[#e8edf5]"
                        : "text-[#1a1d23]/70 hover:bg-black/5 hover:text-[#1a1d23]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/contact?type=bulk"
                className="flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-lg text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #4a6fa5, #2d4f7c)" }}
              >
                Bulk Enquiries
                <ChevronRight size={14} />
              </Link>
            </li>
          </ul>
        </div>
      </header>

      <CartDrawer theme={theme} />
    </>
  );
}
