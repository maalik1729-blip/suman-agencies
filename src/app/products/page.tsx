"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Grid3X3, List, SlidersHorizontal, Star } from "lucide-react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "name";

const PRICE_MIN = 0;
const PRICE_MAX = 200000;

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [theme, setTheme] = useState("light");
  const [activeCategory, setActiveCategory] = useState<"all" | "furniture" | "electronics">(
    (searchParams.get("category") as "furniture" | "electronics") || "all"
  );
  const [activeSubcategories, setActiveSubcategories] = useState<string[]>([]);
  const [activeBadge, setActiveBadge] = useState(searchParams.get("badge") || "all");
  const [sort, setSort] = useState<SortOption>("default");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [minRating, setMinRating] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const isDark = theme === "dark";

  const subcategoryList = useMemo(() => {
    if (activeCategory === "furniture") return categories.furniture;
    if (activeCategory === "electronics") return categories.electronics;
    return [...categories.furniture, ...categories.electronics];
  }, [activeCategory]);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    if (activeSubcategories.length > 0) list = list.filter((p) => activeSubcategories.includes(p.subcategory));
    if (activeBadge !== "all") list = list.filter((p) => p.badge === activeBadge);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q));
    }
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    switch (sort) {
      case "price-asc": return [...list].sort((a, b) => a.price - b.price);
      case "price-desc": return [...list].sort((a, b) => b.price - a.price);
      case "rating": return [...list].sort((a, b) => b.rating - a.rating);
      case "name": return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default: return list;
    }
  }, [activeCategory, activeSubcategories, activeBadge, search, sort, priceRange, minRating]);

  const toggleSubcategory = (sub: string) => {
    setActiveSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const resetFilters = () => {
    setActiveCategory("all");
    setActiveSubcategories([]);
    setActiveBadge("all");
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setMinRating(0);
    setSearch("");
  };

  const activeFilterCount = [
    activeCategory !== "all",
    activeSubcategories.length > 0,
    activeBadge !== "all",
    priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX,
    minRating > 0,
  ].filter(Boolean).length;

  /* ─── New Filter Sidebar ─── */
  const FilterPanel = () => (
    <div
      className={cn(
        "w-64 shrink-0 rounded-2xl border overflow-hidden",
        isDark ? "bg-[#111827] border-white/10" : "bg-white border-gray-200"
      )}
      style={{ boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.08)" }}
    >
      {/* Panel Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-[#4a6fa5]" />
          <span className={cn("font-bold text-sm", isDark ? "text-white" : "text-gray-900")}>
            Filters
          </span>
          {activeFilterCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-[#4a6fa5] text-white text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-[11px] text-[#4a6fa5] hover:text-[#2d4f7c] font-semibold transition-colors"
          >
            Reset all
          </button>
        )}
      </div>

      <div className="px-5 py-4 space-y-6 overflow-y-auto max-h-[calc(100vh-14rem)]">

        {/* Category */}
        <div>
          <p className={cn("text-[11px] font-bold uppercase tracking-widest mb-3", isDark ? "text-white/40" : "text-gray-400")}>
            Category
          </p>
          <div className="flex flex-col gap-2">
            {(["all", "furniture", "electronics"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setActiveSubcategories([]); }}
                className={cn(
                  "w-full text-left px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  activeCategory === cat
                    ? "bg-[#4a6fa5] text-white shadow-sm"
                    : isDark
                    ? "text-white/60 hover:bg-white/8 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {cat === "all" ? "All Products" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className={isDark ? "border-t border-white/8" : "border-t border-gray-100"} />

        {/* Price Range */}
        <div>
          <p className={cn("text-[11px] font-bold uppercase tracking-widest mb-3", isDark ? "text-white/40" : "text-gray-400")}>
            Price Range
          </p>
          <div className="space-y-3">
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={1000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-[#4a6fa5] h-1.5 cursor-pointer"
            />
            <div className="flex items-center gap-2">
              <div className={cn("flex-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium", isDark ? "bg-white/6 border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-700")}>
                ₹{priceRange[0].toLocaleString("en-IN")}
              </div>
              <span className={isDark ? "text-white/30 text-xs" : "text-gray-300 text-xs"}>—</span>
              <div className={cn("flex-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium", isDark ? "bg-white/6 border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-700")}>
                ₹{priceRange[1].toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={isDark ? "border-t border-white/8" : "border-t border-gray-100"} />

        {/* Minimum Rating */}
        <div>
          <p className={cn("text-[11px] font-bold uppercase tracking-widest mb-3", isDark ? "text-white/40" : "text-gray-400")}>
            Min Rating
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {[0, 3, 3.5, 4, 4.5].map((r) => (
              <button
                key={r}
                onClick={() => setMinRating(r)}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  minRating === r
                    ? "bg-amber-400 border-amber-400 text-white"
                    : isDark
                    ? "border-white/10 text-white/50 hover:border-amber-400 hover:text-amber-400"
                    : "border-gray-200 text-gray-500 hover:border-amber-400 hover:text-amber-500"
                )}
              >
                {r === 0 ? (
                  "Any"
                ) : (
                  <>
                    <Star size={10} className="fill-current" />
                    {r}+
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className={isDark ? "border-t border-white/8" : "border-t border-gray-100"} />

        {/* Badge */}
        <div>
          <p className={cn("text-[11px] font-bold uppercase tracking-widest mb-3", isDark ? "text-white/40" : "text-gray-400")}>
            Product Badge
          </p>
          <div className="flex flex-col gap-1.5">
            {(["all", "new", "sale", "trending", "bestseller"] as const).map((badge) => (
              <button
                key={badge}
                onClick={() => setActiveBadge(badge)}
                className={cn(
                  "w-full text-left px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  activeBadge === badge
                    ? "bg-[#4a6fa5] text-white"
                    : isDark
                    ? "text-white/60 hover:bg-white/8 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {badge === "all" ? "All Badges" : badge.charAt(0).toUpperCase() + badge.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className={isDark ? "border-t border-white/8" : "border-t border-gray-100"} />

        {/* Sub-Categories */}
        <div>
          <p className={cn("text-[11px] font-bold uppercase tracking-widest mb-3", isDark ? "text-white/40" : "text-gray-400")}>
            Sub-Category
          </p>
          <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
            {subcategoryList.filter((s) => s !== "All").map((sub) => (
              <label key={sub} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                <div
                  onClick={() => toggleSubcategory(sub)}
                  className={cn(
                    "w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-150 cursor-pointer",
                    activeSubcategories.includes(sub)
                      ? "bg-[#4a6fa5] border-[#4a6fa5]"
                      : isDark
                      ? "border-white/20 group-hover:border-[#4a6fa5]"
                      : "border-gray-300 group-hover:border-[#4a6fa5]"
                  )}
                >
                  {activeSubcategories.includes(sub) && (
                    <svg viewBox="0 0 10 8" width="8" height="8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm transition-colors",
                    activeSubcategories.includes(sub)
                      ? "text-[#4a6fa5] font-medium"
                      : isDark
                      ? "text-white/60 group-hover:text-white"
                      : "text-gray-600 group-hover:text-gray-900"
                  )}
                >
                  {sub}
                </span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <>
      {/* Page Header */}
      <section className="pt-28 pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#4a6fa5]">Our Collection</span>
            <h1 className={cn("text-4xl sm:text-5xl font-bold font-serif mt-2", isDark ? "text-white" : "text-[#1a1d23]")}>
              Premium Products
            </h1>
            <p className={cn("mt-2 text-sm", isDark ? "text-white/50" : "text-black/40")}>
              {products.length}+ curated pieces for the modern home
            </p>
          </motion.div>
        </div>
      </section>

      {/* Top Bar */}
      <div className={cn("sticky top-16 z-40 px-4 sm:px-6 py-3 border-b", isDark ? "bg-[#0d1017]/90 border-white/10" : "bg-[#f8fafc]/90 border-black/8")} style={{ backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn("lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-all", isDark ? "border-white/10 text-white/70" : "border-black/10 text-black/60")}
          >
            <SlidersHorizontal size={15} />
            Filters {activeFilterCount > 0 && <span className="bg-[#4a6fa5] text-white text-[10px] px-1.5 py-0.5 rounded-full">{activeFilterCount}</span>}
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className={cn("absolute left-3 top-1/2 -translate-y-1/2", isDark ? "text-white/40" : "text-black/30")} />
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn("w-full pl-9 pr-4 py-2 rounded-xl text-sm border focus:outline-none focus:border-[#4a6fa5] transition-colors", isDark ? "bg-white/6 border-white/10 text-white placeholder-white/30" : "bg-white border-black/8 text-[#1a1d23] placeholder-black/30")}
            />
            {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X size={13} className={isDark ? "text-white/40" : "text-black/30"} /></button>}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className={cn("px-3 py-2 rounded-xl text-sm border focus:outline-none focus:border-[#4a6fa5] cursor-pointer", isDark ? "bg-white/6 border-white/10 text-white" : "bg-white border-black/8 text-[#1a1d23]")}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="name">Name A–Z</option>
          </select>

          {/* Results count */}
          <p className={cn("text-sm ml-auto hidden sm:block", isDark ? "text-white/40" : "text-black/40")}>
            <span className="font-semibold text-[#4a6fa5]">{filtered.length}</span> products
          </p>

          {/* View Toggle */}
          <div className="flex gap-1 p-1 rounded-lg" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)" }}>
            <button onClick={() => setViewMode("grid")} className={cn("p-1.5 rounded-md transition-all", viewMode === "grid" ? "bg-[#4a6fa5] text-white" : isDark ? "text-white/40" : "text-black/40")} aria-label="Grid view"><Grid3X3 size={15} /></button>
            <button onClick={() => setViewMode("list")} className={cn("p-1.5 rounded-md transition-all", viewMode === "list" ? "bg-[#4a6fa5] text-white" : isDark ? "text-white/40" : "text-black/40")} aria-label="List view"><List size={15} /></button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-7 items-start">

          {/* Desktop Fixed Sidebar */}
          <div className="hidden lg:block sticky top-36 self-start">
            <FilterPanel />
          </div>

          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
                <motion.div
                  initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="fixed top-0 left-0 h-full z-50 overflow-y-auto lg:hidden p-4"
                  style={{ background: isDark ? "#0d1117" : "#fff" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className={cn("font-bold text-base", isDark ? "text-white" : "text-[#1a1d23]")}>Filters</h2>
                    <button onClick={() => setSidebarOpen(false)}><X size={20} className={isDark ? "text-white" : "text-black"} /></button>
                  </div>
                  <FilterPanel />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products Area */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-5xl mb-4">🔍</p>
                <h3 className={cn("text-xl font-bold mb-2", isDark ? "text-white" : "text-[#1a1d23]")}>No products found</h3>
                <p className={cn("text-sm mb-6", isDark ? "text-white/50" : "text-black/40")}>Try adjusting your filters</p>
                <button onClick={resetFilters} className="btn-primary"><span>Reset Filters</span></button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${activeSubcategories.join()}-${sort}-${search}-${activeBadge}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                      : "flex flex-col gap-4"
                  )}
                >
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
                    >
                      {viewMode === "grid" ? (
                        <ProductCard product={product} theme={theme} />
                      ) : (
                        <div className={cn("flex gap-5 p-5 rounded-2xl border hover:scale-[1.01] transition-transform duration-300", isDark ? "bg-[#1a1a1a] border-white/8" : "bg-white border-black/5")} style={{ boxShadow: "var(--shadow-luxe)" }}>
                          <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium uppercase tracking-wider text-[#4a6fa5]">{product.subcategory}</p>
                            <h3 className={cn("font-bold text-base mt-1", isDark ? "text-white" : "text-[#1a1d23]")}>{product.name}</h3>
                            <p className={cn("text-sm mt-1 line-clamp-1", isDark ? "text-white/50" : "text-black/40")}>{product.description}</p>
                            <div className="flex items-center justify-between mt-3">
                              <span className="font-bold text-[#4a6fa5] text-lg">₹{product.price.toLocaleString("en-IN")}</span>
                              <a href={`/products/${product.id}`} className="text-xs font-medium text-[#4a6fa5] hover:underline">View Details →</a>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
