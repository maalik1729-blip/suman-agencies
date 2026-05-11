"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Grid3X3, List, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "name";

const PRICE_MIN = 0;
const PRICE_MAX = 200000;

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-black/8 dark:border-white/8 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-wider text-[#1a1d23] dark:text-white mb-0"
      >
        {title}
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

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
  const [minDiscount, setMinDiscount] = useState(0);
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
    if (minDiscount > 0) list = list.filter((p) => {
      if (!p.originalPrice) return false;
      const disc = Math.round((1 - p.price / p.originalPrice) * 100);
      return disc >= minDiscount;
    });
    switch (sort) {
      case "price-asc": return [...list].sort((a, b) => a.price - b.price);
      case "price-desc": return [...list].sort((a, b) => b.price - a.price);
      case "rating": return [...list].sort((a, b) => b.rating - a.rating);
      case "name": return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default: return list;
    }
  }, [activeCategory, activeSubcategories, activeBadge, search, sort, priceRange, minRating, minDiscount]);

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
    setMinDiscount(0);
    setSearch("");
  };

  const activeFilterCount = [
    activeCategory !== "all",
    activeSubcategories.length > 0,
    activeBadge !== "all",
    priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX,
    minRating > 0,
    minDiscount > 0,
  ].filter(Boolean).length;

  const Sidebar = () => (
    <aside className={cn(
      "w-64 flex-shrink-0 rounded-2xl border p-5 self-start sticky top-[8.5rem] max-h-[calc(100vh-9.5rem)] overflow-y-auto",
      isDark ? "bg-[#141820] border-white/8" : "bg-white border-black/6"
    )} style={{ boxShadow: "var(--shadow-luxe)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className={cn("font-bold text-base flex items-center gap-2", isDark ? "text-white" : "text-[#1a1d23]")}>
          <SlidersHorizontal size={16} className="text-[#4a6fa5]" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#4a6fa5] text-white text-[10px] font-bold">{activeFilterCount}</span>
          )}
        </h2>
        {activeFilterCount > 0 && (
          <button onClick={resetFilters} className="text-xs text-[#4a6fa5] hover:underline font-medium">Clear All</button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Category">
        {(["all", "furniture", "electronics"] as const).map((cat) => (
          <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="category"
              checked={activeCategory === cat}
              onChange={() => { setActiveCategory(cat); setActiveSubcategories([]); }}
              className="accent-[#4a6fa5] w-4 h-4"
            />
            <span className={cn("text-sm capitalize transition-colors group-hover:text-[#4a6fa5]", isDark ? "text-white/70" : "text-black/70")}>
              {cat === "all" ? "All Products" : cat}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Subcategory */}
      <FilterSection title="Sub-Category" defaultOpen={false}>
        <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
          {subcategoryList.filter(s => s !== "All").map((sub) => (
            <label key={sub} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeSubcategories.includes(sub)}
                onChange={() => toggleSubcategory(sub)}
                className="accent-[#4a6fa5] w-4 h-4 rounded"
              />
              <span className={cn("text-sm transition-colors group-hover:text-[#4a6fa5]", isDark ? "text-white/70" : "text-black/70")}>{sub}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="space-y-3">
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={500}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-[#4a6fa5]"
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className={cn("w-full px-2 py-1.5 text-xs rounded-lg border focus:outline-none focus:border-[#4a6fa5]", isDark ? "bg-white/6 border-white/10 text-white" : "bg-gray-50 border-black/10 text-[#1a1d23]")}
              placeholder="Min"
            />
            <span className={isDark ? "text-white/40" : "text-black/30"}>–</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className={cn("w-full px-2 py-1.5 text-xs rounded-lg border focus:outline-none focus:border-[#4a6fa5]", isDark ? "bg-white/6 border-white/10 text-white" : "bg-gray-50 border-black/10 text-[#1a1d23]")}
              placeholder="Max"
            />
          </div>
          <p className="text-xs text-[#4a6fa5] font-medium">${priceRange[0].toLocaleString()} – ${priceRange[1].toLocaleString()}</p>
        </div>
      </FilterSection>







    </aside>
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

          {/* Desktop Sidebar */}
          <div className="hidden lg:block sticky top-36 self-start max-h-[calc(100vh-10rem)] overflow-y-auto w-[240px] shrink-0 pr-2 pb-10">
            <Sidebar />
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
                  className="fixed top-0 left-0 h-full w-72 z-50 overflow-y-auto lg:hidden p-5"
                  style={{ background: isDark ? "#141820" : "#fff" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className={cn("font-bold text-base", isDark ? "text-white" : "text-[#1a1d23]")}>Filters</h2>
                    <button onClick={() => setSidebarOpen(false)}><X size={20} className={isDark ? "text-white" : "text-black"} /></button>
                  </div>
                  <Sidebar />
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
                              <span className="font-bold text-[#4a6fa5] text-lg">${product.price.toLocaleString()}</span>
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
