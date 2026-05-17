"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star, Share2, ChevronRight, Truck, Shield, RotateCcw,
  Check, Minus, Plus, Phone,
} from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type Tab = "description" | "specs";

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [stickyVisible, setStickyVisible] = useState(false);
  const [shared, setShared] = useState(false);
  const inlineCtaRef = useRef<HTMLDivElement | null>(null);

  const product = products.find((p) => p.id === params.id);

  // Show sticky mobile ATC once the inline CTA scrolls out of view.
  useEffect(() => {
    if (!inlineCtaRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => setStickyVisible(!entries[0].isIntersecting),
      { rootMargin: "0px 0px -80px 0px" }
    );
    obs.observe(inlineCtaRef.current);
    return () => obs.disconnect();
  }, [product?.id]);

  if (!product) return notFound();

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.subcategory === product.subcategory)
    )
    .slice(0, 4);

  const lineTotal = product.price * quantity;
  const maxQty = 10;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav
        className="bg-[var(--color-bg)] pt-[calc(var(--header-height)+24px)] pb-4 px-4 sm:px-6"
        aria-label="Breadcrumb"
      >
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            {[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              {
                label: product.category[0].toUpperCase() + product.category.slice(1),
                href: `/products?category=${product.category}`,
              },
              { label: product.name, href: null },
            ].map((crumb, i, arr) => (
              <li key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <ChevronRight size={12} aria-hidden="true" />}
                {i === arr.length - 1 ? (
                  <span
                    className="text-[var(--color-text-strong)] font-medium truncate max-w-[180px]"
                    title={crumb.label}
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href!}
                    className="hover:text-[var(--color-text-strong)] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Main */}
      <section className="bg-[var(--color-bg)] px-4 sm:px-6 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Gallery (3 / 5 columns = 60%) */}
          <div className="lg:col-span-3">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-[var(--color-surface-2)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[selectedImage] || product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    priority={selectedImage === 0}
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              {product.badge && (
                <span
                  className={cn(
                    "absolute top-4 left-4 inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold uppercase tracking-[0.06em]",
                    product.badge === "sale"
                      ? "bg-[var(--color-danger-50)] text-[var(--color-danger-700)]"
                      : "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"
                  )}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "relative w-16 h-16 rounded-md overflow-hidden border-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2 transition-colors",
                      selectedImage === i
                        ? "border-[var(--color-brand-500)]"
                        : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
                    )}
                    aria-label={`View image ${i + 1} of ${product.images.length}`}
                    aria-pressed={selectedImage === i}
                  >
                    <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info column (2 / 5 columns = 40%) */}
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  {product.subcategory}
                </p>
                <h1 className="mt-2 text-2xl sm:text-3xl font-semibold font-display tracking-tight text-[var(--color-text-strong)]">
                  {product.name}
                </h1>
              </div>
              <button
                onClick={handleShare}
                className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-md border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-strong)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2"
                aria-label="Share product"
              >
                {shared ? <Check size={16} /> : <Share2 size={16} />}
              </button>
            </div>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1 text-[var(--color-warning-500)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(product.rating)
                        ? "fill-current"
                        : "text-[var(--color-border)]"
                    }
                    aria-hidden="true"
                  />
                ))}
              </span>
              <span className="font-medium text-[var(--color-text-strong)]">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[var(--color-text-muted)]">
                · {product.reviewCount} {product.reviewCount === 1 ? "rating" : "ratings"}
              </span>
            </div>

            {/* Price block */}
            <div className="mt-5 flex items-baseline gap-3 flex-wrap tabular">
              <span className="text-3xl sm:text-4xl font-semibold text-[var(--color-text-strong)]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-[var(--color-text-muted)] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discount && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-[var(--color-success-50)] text-[var(--color-success-700)] uppercase tracking-[0.06em]">
                  Save {discount}%
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">Inclusive of all taxes</p>

            {/* Stock */}
            <p
              className={cn(
                "mt-3 inline-flex items-center gap-1.5 text-sm font-medium",
                product.inStock
                  ? "text-[var(--color-success-700)]"
                  : "text-[var(--color-danger-700)]"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  product.inStock ? "bg-[var(--color-success-500)]" : "bg-[var(--color-danger-500)]"
                )}
                aria-hidden="true"
              />
              {product.inStock ? "In stock · Delivers in 2–5 days" : "Out of stock"}
            </p>

            {/* Trust pills card */}
            <div className="mt-5 grid grid-cols-3 gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
              {[
                { icon: Truck, label: "Free delivery" },
                {
                  icon: Shield,
                  label: `${product.specs["Warranty"] ?? "Standard"} warranty`,
                },
                { icon: RotateCcw, label: "30-day returns" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-1.5 px-1"
                >
                  <Icon
                    size={18}
                    className="text-[var(--color-brand-500)]"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] leading-tight text-[var(--color-text)]">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Color variants (only if defined) */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-5">
                <p className="text-xs font-medium text-[var(--color-text-strong)] mb-2">
                  Color · <span className="font-normal text-[var(--color-text-muted)]">{product.colors[0]}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={c}
                      className={cn(
                        "h-9 px-3 rounded-md border text-xs font-medium transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)]",
                        i === 0
                          ? "border-[var(--color-brand-500)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"
                          : "border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-border-strong)]"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-5">
              <p className="text-xs font-medium text-[var(--color-text-strong)] mb-2">Quantity</p>
              <div className="inline-flex items-center rounded-md border border-[var(--color-border)] overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 inline-flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-surface-2)] disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-medium tabular text-[var(--color-text-strong)]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                  className="w-10 h-10 inline-flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-surface-2)] disabled:opacity-40"
                  disabled={quantity >= maxQty}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA */}
            <div ref={inlineCtaRef} className="mt-6">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                Add to Cart · {formatPrice(lineTotal)}
              </Button>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Buying for a project?{" "}
                <Link
                  href="/contact?type=bulk"
                  className="text-[var(--color-brand-500)] hover:text-[var(--color-brand-700)] font-medium underline-offset-2 hover:underline"
                >
                  Get a bulk quote →
                </Link>
              </p>
            </div>

            {/* Phone + GSTIN trust strip */}
            <div className="mt-6 pt-5 border-t border-[var(--color-border)] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--color-text-muted)]">
              <a
                href={`tel:${site.contact.phones[0].e164}`}
                className="inline-flex items-center gap-1.5 hover:text-[var(--color-text-strong)]"
              >
                <Phone size={12} aria-hidden="true" /> {site.contact.phones[0].display}
              </a>
              <span>
                GSTIN <span className="font-mono">{site.gstin}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto mt-14">
          <div
            role="tablist"
            aria-label="Product details"
            className="flex gap-1 border-b border-[var(--color-border)]"
          >
            {(
              [
                { id: "description", label: "Description" },
                { id: "specs", label: "Specifications" },
              ] as const
            ).map((t) => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`panel-${t.id}`}
                  id={`tab-${t.id}`}
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2",
                    active
                      ? "border-[var(--color-brand-500)] text-[var(--color-text-strong)]"
                      : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-strong)]"
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              role="tabpanel"
              id={`panel-${activeTab}`}
              aria-labelledby={`tab-${activeTab}`}
              className="py-6"
            >
              {activeTab === "description" && (
                <div className="max-w-prose">
                  <p className="text-base leading-relaxed text-[var(--color-text)]">
                    {product.description}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] shrink-0">
                          <Check size={10} />
                        </span>
                        <span className="text-sm text-[var(--color-text)]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="max-w-2xl rounded-lg border border-[var(--color-border)] overflow-hidden">
                  <dl>
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div
                        key={key}
                        className="flex items-start gap-4 px-4 py-3 border-t border-[var(--color-border)] first:border-t-0 hover:bg-[var(--color-surface-2)]"
                      >
                        <dt className="w-40 text-sm font-medium text-[var(--color-text-strong)] shrink-0">
                          {key}
                        </dt>
                        <dd className="text-sm text-[var(--color-text)]">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="max-w-7xl mx-auto mt-14">
            <h2 className="text-2xl font-semibold font-display tracking-tight text-[var(--color-text-strong)] mb-6">
              You might also like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Sticky mobile ATC */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 bottom-0 z-40 bg-[var(--color-bg)] border-t border-[var(--color-border)] shadow-[var(--shadow-overlay)] transition-transform duration-200",
          stickyVisible ? "translate-y-0" : "translate-y-full"
        )}
        aria-hidden={!stickyVisible}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="relative w-10 h-10 rounded-md overflow-hidden bg-[var(--color-surface-2)] shrink-0">
            <Image src={product.images[0]} alt="" fill sizes="40px" className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[var(--color-text-strong)] font-medium line-clamp-1">
              {product.name}
            </p>
            <p className="text-sm font-semibold tabular text-[var(--color-text-strong)]">
              {formatPrice(lineTotal)}
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
}
