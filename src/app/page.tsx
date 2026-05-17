"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Star, Truck, Shield, RotateCcw, Phone,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { products, testimonials, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCurrency } from "@/context/CurrencyContext";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

// =====================================================================
// 1 · HERO
// Strategy H-1 copy. Two equal primary CTAs. No stats counter, no scroll chevron.
// =====================================================================
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[78vh] flex items-center overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(11,13,18,0.78) 0%, rgba(11,13,18,0.55) 50%, rgba(11,13,18,0.10) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(to top, var(--color-bg), transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.12em] text-white/80"
          >
            {site.brand} · Tirunelveli
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 font-display font-semibold text-white tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl"
          >
            Furniture &amp; electronics,
            <br />
            made for homes worldwide.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-base sm:text-lg text-white/85 max-w-xl"
          >
            Worldwide delivery · GST invoice · 30-day returns.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <Link href="/products?category=furniture">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={16} />}
                fullWidth
                className="sm:w-auto"
              >
                Shop Furniture
              </Button>
            </Link>
            <Link href="/products?category=electronics">
              <Button
                variant="secondary"
                size="lg"
                rightIcon={<ArrowRight size={16} />}
                fullWidth
                className="sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50"
              >
                Shop Electronics
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// 2 · TRUST STRIP (replaces marquee)
// =====================================================================
function TrustStrip() {
  const items = [
    { icon: Truck, label: site.freeDelivery.region === "Worldwide" ? "Free worldwide delivery" : `Free delivery in ${site.freeDelivery.region}`, href: "/shipping-policy" },
    { icon: Shield, label: `GST registered · ${site.gstin}`, href: "/about" },
    { icon: RotateCcw, label: "30-day returns", href: "/cancellation-refund" },
    { icon: Phone, label: "Call before you buy", href: `tel:${site.contact.phones[0].e164}` },
  ];
  return (
    <section
      aria-label="Trust strip"
      className="bg-[var(--color-surface)] border-y border-[var(--color-border)]"
    >
      <ul className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="flex items-center gap-2 py-4 text-xs sm:text-sm text-[var(--color-text)] hover:text-[var(--color-text-strong)] transition-colors"
            >
              <Icon size={16} className="text-[var(--color-brand-500)] shrink-0" aria-hidden="true" />
              <span className="truncate">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

// =====================================================================
// 3 · CATEGORY SPLIT
// =====================================================================
function CategorySplit() {
  const tiles = [
    {
      title: "Furniture",
      eyebrow: "Category",
      subs: categories.furniture.filter((s) => s !== "All").slice(0, 5),
      href: "/products?category=furniture",
      image:
        products.find((p) => p.category === "furniture")?.images[0] ??
        "/hero-bg.png",
    },
    {
      title: "Electronics",
      eyebrow: "Category",
      subs: categories.electronics.filter((s) => s !== "All").slice(0, 5),
      href: "/products?category=electronics",
      image:
        products.find((p) => p.category === "electronics")?.images[0] ??
        "/hero-bg.png",
    },
  ];

  return (
    <section className="bg-[var(--color-bg)] py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiles.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className="group relative aspect-[5/4] sm:aspect-[4/5] overflow-hidden rounded-lg border border-[var(--color-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2"
            >
              <Image
                src={t.image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(11,13,18,0.85) 0%, rgba(11,13,18,0.20) 60%, transparent 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/80">
                  {t.eyebrow}
                </p>
                <h3 className="mt-2 font-display font-semibold text-3xl sm:text-4xl tracking-tight">
                  {t.title}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {t.subs.map((s) => (
                    <li
                      key={s}
                      className="inline-flex items-center h-7 px-2.5 rounded-full bg-white/10 backdrop-blur text-xs"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium group-hover:translate-x-0.5 transition-transform">
                  Explore {t.title.toLowerCase()} <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// 4 · TRENDING CAROUSEL (audit UX-2: was dead code, now mounted)
// =====================================================================
function TrendingCarousel() {
  const { formatPrice } = useCurrency();
  const [current, setCurrent] = useState(0);
  const trending = products.filter(
    (p) => p.badge === "trending" || p.badge === "bestseller"
  );

  if (trending.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + trending.length) % trending.length);
  const next = () => setCurrent((c) => (c + 1) % trending.length);

  const item = trending[current];

  return (
    <section
      className="bg-[var(--color-surface)] py-16 sm:py-20 px-4 sm:px-6 overflow-hidden"
      aria-labelledby="trending-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              Trending now
            </p>
            <h2
              id="trending-heading"
              className="mt-2 font-display font-semibold text-3xl sm:text-4xl tracking-tight text-[var(--color-text-strong)]"
            >
              Most loved this month
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-strong)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)]"
              aria-label="Previous product"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-strong)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)]"
              aria-label="Next product"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 lg:gap-10 items-center"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[var(--color-surface-2)]">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  {item.subcategory}
                </p>
                <h3 className="mt-2 font-display font-semibold text-2xl sm:text-3xl tracking-tight text-[var(--color-text-strong)]">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm text-[var(--color-text)] leading-relaxed line-clamp-3">
                  {item.description}
                </p>
                <div className="mt-5 flex items-baseline gap-3 tabular">
                  <span className="text-2xl font-semibold text-[var(--color-text-strong)]">
                    {formatPrice(item.price)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-base text-[var(--color-text-muted)] line-through">
                      {formatPrice(item.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <Link href={`/products/${item.id}`}>
                    <Button variant="primary" size="md" rightIcon={<ArrowRight size={14} />}>
                      View details
                    </Button>
                  </Link>
                  <Link
                    href="/products"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-strong)] transition-colors"
                  >
                    Browse all →
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slim progress bar */}
          <div className="mt-8 h-px bg-[var(--color-border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-brand-500)] transition-[width] duration-300"
              style={{ width: `${((current + 1) / trending.length) * 100}%` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// 5 · FEATURED GRID
// =====================================================================
function FeaturedProducts() {
  const ref = useScrollReveal();
  const featured = [
    ...products.filter((p) => p.category === "furniture").slice(0, 4),
    ...products.filter((p) => p.category === "electronics").slice(0, 4),
  ];

  return (
    <section
      className="bg-[var(--color-bg)] py-16 sm:py-20 px-4 sm:px-6"
      aria-labelledby="featured-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="reveal-up mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            Our collection
          </p>
          <h2
            id="featured-heading"
            className="mt-2 font-display font-semibold text-3xl sm:text-4xl tracking-tight text-[var(--color-text-strong)]"
          >
            Featured products
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/products">
            <Button variant="secondary" size="md" rightIcon={<ArrowRight size={14} />}>
              View all products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// 6 · WHY US (3 pillars)
// =====================================================================
function WhyUs() {
  const { formatPrice } = useCurrency();
  const pillars = [
    {
      icon: Shield,
      title: "Quality, guaranteed",
      description:
        "Every product checked before dispatch. Real warranties — not page-padding promises.",
    },
    {
      icon: Truck,
      title: "Free white-glove delivery",
      description: `Complimentary delivery and setup on orders above ${formatPrice(25000)}.`,
    },
    {
      icon: RotateCcw,
      title: "30-day returns",
      description:
        "If a piece doesn't fit your home, return it within 30 days for a full refund.",
    },
  ];

  return (
    <section
      className="bg-[var(--color-surface)] py-16 sm:py-20 px-4 sm:px-6"
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            Why {site.brand}
          </p>
          <h2
            id="why-heading"
            className="mt-2 font-display font-semibold text-3xl sm:text-4xl tracking-tight text-[var(--color-text-strong)]"
          >
            A small store, with serious craft.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-6"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-[var(--color-brand-50)] text-[var(--color-brand-700)]">
                <Icon size={18} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-text-strong)]">
                {title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text)] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// 7 · TESTIMONIALS (3 cards, "From a customer" until verified)
// =====================================================================
function TestimonialsSection() {
  const picks = testimonials.slice(0, 3);
  return (
    <section
      className="bg-[var(--color-bg)] py-16 sm:py-20 px-4 sm:px-6"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            From our customers
          </p>
          <h2
            id="testimonials-heading"
            className="mt-2 font-display font-semibold text-3xl sm:text-4xl tracking-tight text-[var(--color-text-strong)]"
          >
            Loved by families worldwide.
          </h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {picks.map((t) => (
            <li
              key={t.id}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-brand-100)] text-[var(--color-brand-700)] font-semibold"
                  aria-hidden="true"
                >
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-strong)]">{t.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{t.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[var(--color-warning-500)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < t.rating ? "fill-current" : "text-[var(--color-border)]"}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-sm text-[var(--color-text)] leading-relaxed">"{t.text}"</p>
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                From a customer
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// =====================================================================
// 8 · FINAL CTA STRIP (replaces gradient StatsSection)
// =====================================================================
function FinalCTA() {
  return (
    <section
      className="bg-[var(--color-surface-2)] border-y border-[var(--color-border)] px-4 sm:px-6 py-14 sm:py-16"
      aria-labelledby="final-cta"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          id="final-cta"
          className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-[var(--color-text-strong)]"
        >
          Need help choosing?
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[var(--color-text)] max-w-xl mx-auto">
          Talk to a real person at our Tirunelveli showroom. We'll help you pick what fits your home and your budget.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
          <a href={`tel:${site.contact.phones[0].e164}`}>
            <Button variant="primary" size="lg" leftIcon={<Phone size={16} />} fullWidth className="sm:w-auto">
              Call {site.contact.phones[0].display}
            </Button>
          </a>
          <Link href="/contact">
            <Button variant="secondary" size="lg" fullWidth className="sm:w-auto">
              Send a message
            </Button>
          </Link>
        </div>
        <p className="mt-5 text-xs text-[var(--color-text-muted)]">
          {site.contact.address.line1}, {site.contact.address.city} – {site.contact.address.pincode}
        </p>
      </div>
    </section>
  );
}

// =====================================================================
// PAGE
// =====================================================================
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <CategorySplit />
      <TrendingCarousel />
      <FeaturedProducts />
      <WhyUs />
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
}
