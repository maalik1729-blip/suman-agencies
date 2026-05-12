"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  theme: string;
}

export function Footer({ theme }: FooterProps) {
  const isDark = theme === "dark";

  const links = {
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/about#story" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
    Products: [
      { label: "Furniture", href: "/products?category=furniture" },
      { label: "Electronics", href: "/products?category=electronics" },
      { label: "New Arrivals", href: "/products?badge=new" },
      { label: "Sale", href: "/products?badge=sale" },
    ],
    Policies: [
      { label: "Shipping Policy", href: "/shipping-policy" },
      { label: "Cancellation & Refund", href: "/cancellation-refund" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
    ],
  };

  const socialLinks = [
    {
      href: "#",
      label: "Facebook",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
        </svg>
      ),
    },
    {
      href: "#",
      label: "Instagram",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
    },
    {
      href: "#",
      label: "YouTube",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className={cn(
      "border-t",
      isDark ? "bg-[#0d0d0d] border-white/10" : "bg-[#1a1a1a] border-white/5"
    )}>


      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4a6fa5] to-[#2d4f7c] flex items-center justify-center">
                <span className="text-white font-bold font-serif">S</span>
              </div>
              <span className="text-white font-bold text-xl font-serif">Suman Agency</span>
            </Link>
            <p className="text-[#4a6fa5] text-xs font-semibold tracking-widest uppercase mb-4">
              Prop. RAJASINGH
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Premium furniture and electronics crafted for modern living. Registered under GST — serving customers across Tamil Nadu.
            </p>
            <div className="inline-block mt-3 px-2.5 py-1 bg-[#4a6fa5]/10 text-[#4a6fa5] font-mono text-xs font-medium rounded-md border border-[#4a6fa5]/20">
              GSTIN: 33DVIPR5548Q1ZN
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-2.5">
              {[
                { icon: Mail, text: "sumanagency4@gmail.com" },
                { icon: Phone, text: "+91 97155 90101" },
                { icon: MapPin, text: "No.7/1-3, West Street, Chellathayarpuram, Tirunelveli – 627808" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-white/40 text-sm">
                  <Icon size={14} className="text-[#4a6fa5]" />
                  {text}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ svg, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#4a6fa5] hover:border-[#4a6fa5]/40 hover:bg-[#4a6fa5]/10 transition-all duration-200 hover:scale-110"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-white/40 text-sm hover:text-[#4a6fa5] transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            {`© ${new Date().getFullYear()} Suman Agency. Prop. RAJASINGH. All rights reserved.`}
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
