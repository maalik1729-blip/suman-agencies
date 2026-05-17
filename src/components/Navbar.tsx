"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { CurrencySelect } from "./ui/CurrencySelect";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsOpen } = useCart();
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close mobile drawer on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Esc to close + scroll lock.
  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-() border-b border-()"
        style={{ height: "var(--header-height)" }}
      >
        <nav className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Mobile hamburger (left) */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md text-() hover:bg-() transition-colors"
            aria-label="Open menu"
            aria-controls="mobile-nav"
            aria-expanded={mobileOpen}
          >
            <Menu size={20} />
          </button>

          {/* Logo (left desktop, centered mobile) */}
          <div className="md:flex-none flex-1 flex md:justify-start justify-center">
            <Logo variant="header" />
          </div>

          {/* Desktop nav */}
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
                      "relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      active
                        ? "text-()"
                        : "text-() hover:text-()"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute left-3 right-3 -bottom-px h-0.5 rounded-full bg-()" />
                    )}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/contact?type=bulk"
                className="ml-2 inline-flex items-center px-3 py-2 text-sm text-() hover:text-() transition-colors"
              >
                For Businesses →
              </Link>
            </li>
          </ul>

          {/* Right cluster (always visible) */}
          <div className="flex items-center gap-1.5">
            <div className="hidden sm:block">
              <CurrencySelect />
            </div>

            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center w-9 h-9 rounded-md text-() hover:bg-() transition-colors"
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="relative inline-flex items-center justify-center w-9 h-9 rounded-md text-() hover:bg-() transition-colors"
              aria-label={`Shopping cart, ${totalItems} ${totalItems === 1 ? "item" : "items"}`}
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-() text-white text-[11px] font-semibold inline-flex items-center justify-center"
                  aria-hidden="true"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-[60] transition-opacity duration-200",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
        <div
          ref={drawerRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={cn(
            "relative h-full w-[88vw] max-w-sm bg-() shadow-xl flex flex-col transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-()">
            <Logo variant="header" />
            <button
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-md text-() hover:bg-()"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-3 rounded-md text-base font-medium transition-colors",
                    active
                      ? "bg-() text-()"
                      : "text-() hover:bg-()"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/contact?type=bulk"
              className="px-3 py-3 rounded-md text-base font-medium text-() hover:bg-()"
            >
              For Businesses
            </Link>

            <hr className="my-3 border-()" />

            <div className="px-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-()">
                Currency
              </p>
              <CurrencySelect variant="segmented" />
            </div>

            <div className="px-3 mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-()">
                Theme
              </p>
              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-() bg-() text-sm text-()"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                Switch to {isDark ? "light" : "dark"}
              </button>
            </div>

            <hr className="my-3 border-()" />

            <div className="px-3 text-sm text-() space-y-2">
              {site.contact.phones.map((p) => (
                <a key={p.e164} href={`tel:${p.e164}`} className="block hover:text-()">
                  📞 {p.display}
                </a>
              ))}
              <p className="text-xs">
                GSTIN <span className="font-mono">{site.gstin}</span>
              </p>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
