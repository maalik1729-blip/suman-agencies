"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  Check,
  ArrowRight,
  Minus,
  Plus,
} from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const [theme, setTheme] = useState("light");
  const [selectedImage, setSelectedImage] = useState(0);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const product = products.find((p) => p.id === params.id);

  useEffect(() => {
    const stored = localStorage.getItem("suman-agency-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(stored || (prefersDark ? "dark" : "light"));

    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);



  if (!product) return notFound();

  const isDark = theme === "dark";
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.subcategory === product.subcategory))
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const badgeConfig: Record<string, { label: string; className: string }> = {
    new: { label: "New", className: "badge-new" },
    sale: { label: "Sale", className: "badge-sale" },
    trending: { label: "Trending", className: "badge-trending" },
    bestseller: { label: "Best Seller", className: "badge-bestseller" },
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="pt-28 pb-4 px-4 sm:px-6" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center gap-2 text-xs">
            {[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: product.category.charAt(0).toUpperCase() + product.category.slice(1), href: `/products?category=${product.category}` },
              { label: product.name, href: "#" },
            ].map((crumb, i, arr) => (
              <li key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <ChevronRight size={12} className={isDark ? "text-white/30" : "text-black/30"} />}
                {i === arr.length - 1 ? (
                  <span className="text-[#4a6fa5] font-medium truncate max-w-[150px]">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className={cn("hover:text-[#4a6fa5] transition-colors", isDark ? "text-white/50" : "text-black/40")}>
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Main Product */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div>
            <div className="relative overflow-hidden rounded-2xl aspect-square mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className={cn("badge", badgeConfig[product.badge]?.className)}>
                    {badgeConfig[product.badge]?.label}
                  </span>
                </div>
              )}
              {discount && (
                <div className="absolute top-4 right-4">
                  <span className="badge badge-sale">-{discount}%</span>
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "w-18 h-18 rounded-xl overflow-hidden border-2 transition-all duration-200",
                      selectedImage === i ? "border-[#4a6fa5] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                    style={{ width: 72, height: 72 }}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-[#4a6fa5]">
                    {product.subcategory}
                  </span>
                  <h1 className={cn("text-3xl sm:text-4xl font-bold font-serif mt-1", isDark ? "text-white" : "text-[#1a1a1a]")}>
                    {product.name}
                  </h1>
                </div>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 hover:scale-110",
                      wishlisted ? "bg-red-50 border-red-200 text-red-500" : isDark ? "border-white/15 text-white/50 hover:border-[#4a6fa5] hover:text-[#4a6fa5]" : "border-black/12 text-black/40 hover:border-[#4a6fa5] hover:text-[#4a6fa5]"
                    )}
                    aria-label="Add to wishlist"
                  >
                    <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
                  </button>
                  <button
                    className={cn("w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 hover:scale-110", isDark ? "border-white/15 text-white/50 hover:border-[#4a6fa5] hover:text-[#4a6fa5]" : "border-black/12 text-black/40 hover:border-[#4a6fa5] hover:text-[#4a6fa5]")}
                    aria-label="Share product"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? "text-[#4a6fa5] fill-[#4a6fa5]" : "text-gray-300"} />
                  ))}
                </div>
                <span className={cn("text-sm font-medium", isDark ? "text-white" : "text-[#1a1a1a]")}>{product.rating}</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-5">
                <span className="text-4xl font-bold text-[#4a6fa5] font-serif">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className={cn("text-xl line-through", isDark ? "text-white/30" : "text-black/30")}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {discount && (
                  <span className="badge badge-sale">Save {discount}%</span>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mt-3">
                <div className={cn("w-2 h-2 rounded-full", product.inStock ? "bg-green-500" : "bg-red-400")} />
                <span className={cn("text-sm font-medium", product.inStock ? "text-green-500" : "text-red-400")}>
                  {product.inStock ? "In Stock — Ready to Ship" : "Out of Stock"}
                </span>
              </div>

              <div className="section-divider my-6" />



              {/* Quantity */}
              <div className="mb-6">
                <p className={cn("text-sm font-semibold mb-3", isDark ? "text-white" : "text-[#1a1a1a]")}>Quantity</p>
                <div className="flex items-center gap-4">
                  <div className={cn("flex items-center rounded-xl border overflow-hidden", isDark ? "border-white/15" : "border-black/12")}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className={cn("w-11 h-11 flex items-center justify-center transition-colors hover:bg-[#4a6fa5]/10 hover:text-[#4a6fa5]", isDark ? "text-white/60" : "text-black/50")} aria-label="Decrease quantity">
                      <Minus size={16} />
                    </button>
                    <span className={cn("px-5 font-semibold text-base", isDark ? "text-white" : "text-[#1a1a1a]")}>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className={cn("w-11 h-11 flex items-center justify-center transition-colors hover:bg-[#4a6fa5]/10 hover:text-[#4a6fa5]", isDark ? "text-white/60" : "text-black/50")} aria-label="Increase quantity">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300",
                    addedToCart
                      ? "bg-green-500 text-white"
                      : "btn-primary",
                    !product.inStock && "opacity-50 cursor-not-allowed"
                  )}
                  style={addedToCart ? {} : { background: "linear-gradient(135deg, #4a6fa5, #2d4f7c)", color: "white" }}
                >
                  {addedToCart ? <Check size={18} /> : <ShoppingCart size={18} />}
                  {addedToCart ? "Added to Cart!" : "Add to Cart"}
                </button>
                <Link
                  href="/contact?type=bulk"
                  className={cn("px-5 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-200 hover:scale-105 flex items-center gap-2", isDark ? "border-white/15 text-white/70 hover:border-[#4a6fa5] hover:text-[#4a6fa5]" : "border-black/15 text-black/60 hover:border-[#4a6fa5] hover:text-[#4a6fa5]")}
                >
                  Bulk Order
                </Link>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { icon: Truck, label: "Free Delivery" },
                  { icon: Shield, label: `${product.specs["Warranty"] || "2 Years"} Warranty` },
                  { icon: RotateCcw, label: "30-Day Returns" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className={cn("flex flex-col items-center gap-1.5 p-3 rounded-xl text-center text-xs font-medium", isDark ? "bg-white/4 text-white/60" : "bg-black/3 text-black/50")}>
                    <Icon size={18} className="text-[#4a6fa5]" />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto mt-16">
          <div className="flex gap-1 border-b" style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }}>
            {(["description", "specs", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-3.5 text-sm font-medium capitalize border-b-2 transition-all duration-200",
                  activeTab === tab
                    ? "border-[#4a6fa5] text-[#4a6fa5]"
                    : isDark
                    ? "border-transparent text-white/50 hover:text-white"
                    : "border-transparent text-black/40 hover:text-black"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-8"
            >
              {activeTab === "description" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <p className={cn("leading-relaxed text-base mb-8", isDark ? "text-white/65" : "text-black/60")}>{product.description}</p>
                    <ul className="space-y-3">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#4a6fa5]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={11} className="text-[#4a6fa5]" />
                          </div>
                          <span className={cn("text-sm leading-relaxed", isDark ? "text-white/65" : "text-black/60")}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl overflow-hidden">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover max-h-80" />
                  </div>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="max-w-2xl">
                  <div className={cn("rounded-2xl border overflow-hidden", isDark ? "border-white/8" : "border-black/8")}>
                    {Object.entries(product.specs).map(([key, val], i) => (
                      <div
                        key={key}
                        className={cn(
                          "flex items-start py-4 px-6",
                          i % 2 === 0 ? isDark ? "bg-white/3" : "bg-black/2" : ""
                        )}
                      >
                        <span className={cn("w-40 text-sm font-semibold flex-shrink-0", isDark ? "text-white" : "text-[#1a1a1a]")}>{key}</span>
                        <span className={cn("text-sm", isDark ? "text-white/60" : "text-black/55")}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <div className="flex items-center gap-6 mb-8 p-6 rounded-2xl" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" }}>
                    <div className="text-center">
                      <p className="text-6xl font-bold text-[#4a6fa5] font-serif">{product.rating}</p>
                      <div className="flex gap-1 justify-center mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} className={i < Math.floor(product.rating) ? "text-[#4a6fa5] fill-[#4a6fa5]" : "text-gray-300"} />
                        ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((n) => (
                        <div key={n} className="flex items-center gap-3 mb-1.5">
                          <span className={cn("text-xs w-3", isDark ? "text-white/50" : "text-black/40")}>{n}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-white/10">
                            <div
                              className="h-full rounded-full bg-[#4a6fa5]"
                              style={{ width: n === Math.round(product.rating) ? "72%" : n > Math.round(product.rating) ? "12%" : "6%" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className={cn("text-sm", isDark ? "text-white/50" : "text-black/40")}>
                    Customer reviews are verified. Ratings reflect actual purchases.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="max-w-7xl mx-auto mt-16">
            <h2 className={cn("text-2xl font-bold font-serif mb-8", isDark ? "text-white" : "text-[#1a1a1a]")}>
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} theme={theme} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
