"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/data/site";

const linkColumns = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "Furniture", href: "/products?category=furniture" },
    { label: "Electronics", href: "/products?category=electronics" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Policies: [
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Cancellation & Refund", href: "/cancellation-refund" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
  ],
};

export function Footer() {
  return (
    <footer
      className="border-t border-()"
      style={{ background: "var(--color-surface-2)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand block */}
          <div className="lg:col-span-5 space-y-4">
            <Logo variant="footer" />
            <p className="text-sm text-() max-w-sm">
              {site.tagline} Registered under GST, serving customers across {site.contact.address.state}.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-() bg-()">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-()">
                GSTIN
              </span>
              <span className="text-xs font-mono text-()">
                {site.gstin}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              {site.contact.phones.map((p) => (
                <a
                  key={p.e164}
                  href={`tel:${p.e164}`}
                  className="flex items-center gap-2 text-() hover:text-() transition-colors"
                >
                  <Phone size={14} className="text-()" aria-hidden="true" />
                  {p.display}
                </a>
              ))}
              <a
                href={`mailto:${site.contact.primaryEmail}`}
                className="flex items-center gap-2 text-() hover:text-() transition-colors"
              >
                <Mail size={14} className="text-()" aria-hidden="true" />
                {site.contact.primaryEmail}
              </a>
              <address className="flex items-start gap-2 not-italic text-()">
                <MapPin size={14} className="mt-0.5 text-() shrink-0" aria-hidden="true" />
                <span>
                  {site.contact.address.line1}, {site.contact.address.city} – {site.contact.address.pincode}
                </span>
              </address>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(linkColumns).map(([title, items]) => (
            <div key={title} className="lg:col-span-2 md:col-span-1">
              <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-() mb-3">
                {title}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-() hover:text-() transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Help column */}
          <div className="lg:col-span-1 md:col-span-1">
            <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-() mb-3">
              Help
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`tel:${site.contact.phones[0].e164}`}
                  className="text-sm text-() hover:text-() transition-colors"
                >
                  Call us
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-() hover:text-() transition-colors"
                >
                  Contact form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal strip */}
        <div className="mt-12 pt-6 border-t border-() flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-()">
            © {new Date().getFullYear()} {site.brand}. {site.proprietor}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            <li>
              <Link href="/privacy-policy" className="text-() hover:text-()">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-conditions" className="text-() hover:text-()">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/shipping-policy" className="text-() hover:text-()">
                Shipping
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
