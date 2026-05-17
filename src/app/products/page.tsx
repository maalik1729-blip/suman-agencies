"use client";

import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import {
  FilterPanel,
  PRICE_MIN,
  PRICE_MAX,
  type FilterState,
  type SortOption,
  type Category,
} from "@/components/FilterPanel";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";

function useDebounced<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

function ProductsPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = (searchParams.get("category") as Category | null) ?? "all";

  const [filters, setFilters] = useState<FilterState>({
    category: ["all", "furniture", "electronics"].includes(initialCategory) ? initialCategory : "all",
    subcategories: [],
    priceMin: PRICE_MIN,
    priceMax: PRICE_MAX,
    minRating: 0,
  });
  const [sort, setSort] = useState<SortOption>("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const debouncedSearch = useDebounced(search, 200);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Lock body scroll when sheet is open + escape-to-close.
  useEffect(() => {
    if (!sheetOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const resetFilters = useCallback(() => {
    setFilters({
      category: "all",
      subcategories: [],
      priceMin: PRICE_MIN,
      priceMax: PRICE_MAX,
      minRating: 0,
    });
    setSearch("");
  }, []);

  const filtered = useMemo(() => {
    let list = products;
    if (filters.category !== "all") list = list.filter((p) => p.category === filters.category);
    if (filters.subcategories.length > 0)
      list = list.filter((p) => filters.subcategories.includes(p.subcategory));
    list = list.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);
    if (filters.minRating > 0) list = list.filter((p) => p.rating >= filters.minRating);
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [filters, sort, debouncedSearch]);

  const activeFilterCount = [
    filters.category !== "all",
    filters.subcategories.length > 0,
    filters.priceMin > PRICE_MIN || filters.priceMax < PRICE_MAX,
    filters.minRating > 0,
  ].filter(Boolean).length;

  const totalCount = products.filter((p) =>
    filters.category === "all" ? true : p.category === filters.category
  ).length;

  return (
    <>
      {/* Page header */}
      <section className="bg-(--color-bg) pt-[calc(var(--header-height)+24px)] pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-(--color-text-muted)">
            Our Collection
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold font-display tracking-tight text-(--color-text-strong)">
            {filters.category === "furniture"
              ? "Furniture"
              : filters.category === "electronics"
              ? "Electronics"
              : "All products"}
          </h1>
          <p className="mt-2 text-sm text-(--color-text-muted) tabular">
            Showing {filtered.length} of {totalCount}{" "}
            {filters.category === "all" ? "products" : filters.category}
          </p>
        </div>
      </section>

      {/* Sticky control bar */}
      <div
        className="sticky z-40 bg-(--color-bg)/95 backdrop-blur supports-[backdrop-filter]:bg-(--color-bg)/80 border-y border-(--color-border)"
        style={{ top: "var(--header-height)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 h-9 px-3 rounded-md border border-(--color-border) bg-(--color-surface) text-sm text-(--color-text-strong) hover:border-(--color-border-strong) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand-500)"
            aria-label={`Open filters${activeFilterCount > 0 ? `, ${activeFilterCount} active` : ""}`}
          >
            <SlidersHorizontal size={14} aria-hidden="true" />
            Filters
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-sm bg-(--color-brand-500) text-white text-[10px] font-semibold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Search */}
          <div className="relative flex-1 min-w-[180px] max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted) pointer-events-none"
              aria-hidden="true"
            />
            <label htmlFor="plp-search" className="sr-only">
              Search products
            </label>
            <input
              id="plp-search"
              type="search"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full pl-9 pr-9 rounded-md border border-(--color-border) bg-(--color-surface) text-sm text-(--color-text-strong) placeholder:text-(--color-text-disabled) focus:outline-none focus:border-(--color-brand-500) focus:ring-4 focus:ring-(--color-brand-50)"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-6 h-6 rounded-md text-(--color-text-muted) hover:text-(--color-text-strong) hover:bg-(--color-surface-2)"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Sort */}
          <label className="inline-flex items-center gap-2 text-xs text-(--color-text-muted)">
            <span className="hidden sm:inline">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="h-9 pl-3 pr-8 rounded-md border border-(--color-border) bg-(--color-surface) text-sm text-(--color-text-strong) appearance-none focus:outline-none focus:border-(--color-brand-500) focus:ring-4 focus:ring-(--color-brand-50)"
              aria-label="Sort products"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Top rated</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </label>

          {/* View toggle */}
          <div
            className="hidden sm:inline-flex items-center rounded-md border border-(--color-border) bg-(--color-surface) p-0.5"
            role="radiogroup"
            aria-label="View mode"
          >
            <button
              type="button"
              role="radio"
              aria-checked={viewMode === "grid"}
              onClick={() => setViewMode("grid")}
              className={cn(
                "w-8 h-8 inline-flex items-center justify-center rounded-[5px] transition-colors",
                viewMode === "grid"
                  ? "bg-(--color-bg) text-(--color-text-strong) shadow-sm"
                  : "text-(--color-text-muted) hover:text-(--color-text-strong)"
              )}
              aria-label="Grid view"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={viewMode === "list"}
              onClick={() => setViewMode("list")}
              className={cn(
                "w-8 h-8 inline-flex items-center justify-center rounded-[5px] transition-colors",
                viewMode === "list"
                  ? "bg-(--color-bg) text-(--color-text-strong) shadow-sm"
                  : "text-(--color-text-muted) hover:text-(--color-text-strong)"
              )}
              aria-label="List view"
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <section className="bg-(--color-bg) py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex gap-7 items-start">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 sticky" style={{ top: "calc(var(--header-height) + 76px)" }}>
            <FilterPanel
              value={filters}
              onChange={setFilters}
              onReset={resetFilters}
              activeFilterCount={activeFilterCount}
            />
          </aside>

          {/* Products area */}
          <div className="flex-1 min-w-0">
            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {filters.category !== "all" && (
                  <Chip onRemove={() => setFilters({ ...filters, category: "all" })}>
                    {filters.category[0].toUpperCase() + filters.category.slice(1)}
                  </Chip>
                )}
                {filters.subcategories.map((sub) => (
                  <Chip
                    key={sub}
                    onRemove={() =>
                      setFilters({
                        ...filters,
                        subcategories: filters.subcategories.filter((s) => s !== sub),
                      })
                    }
                  >
                    {sub}
                  </Chip>
                ))}
                {(filters.priceMin > PRICE_MIN || filters.priceMax < PRICE_MAX) && (
                  <Chip
                    onRemove={() =>
                      setFilters({ ...filters, priceMin: PRICE_MIN, priceMax: PRICE_MAX })
                    }
                  >
                    ₹{filters.priceMin.toLocaleString("en-IN")}–₹
                    {filters.priceMax.toLocaleString("en-IN")}
                  </Chip>
                )}
                {filters.minRating > 0 && (
                  <Chip onRemove={() => setFilters({ ...filters, minRating: 0 })}>
                    {filters.minRating}+ rating
                  </Chip>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs font-medium text-(--color-brand-500) hover:text-(--color-brand-700) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand-500) rounded-sm"
                >
                  Clear all
                </button>
              </div>
            )}

            {filtered.length === 0 ? (
              <EmptyState
                title="No products match these filters."
                description="Try widening the price range or clearing a sub-category."
                primaryCta={
                  <Button variant="primary" size="md" onClick={resetFilters}>
                    Clear filters
                  </Button>
                }
                secondaryCta={
                  <button
                    onClick={() => router.push("/products")}
                    className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-transparent text-sm font-medium text-(--color-text) hover:bg-(--color-surface-2) transition-colors"
                  >
                    Browse bestsellers
                  </button>
                }
              />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${viewMode}-${sort}-${debouncedSearch}-${filters.category}-${filters.subcategories.join("|")}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className={cn(
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6"
                      : "flex flex-col gap-3"
                  )}
                >
                  {filtered.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      layout={viewMode === "list" ? "list" : "grid"}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter bottom sheet */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-[60] transition-opacity duration-200",
          sheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!sheetOpen}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setSheetOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          className={cn(
            "absolute inset-x-0 bottom-0 max-h-[85vh] flex flex-col bg-(--color-bg) rounded-t-2xl shadow-(--shadow-overlay) transition-transform duration-300",
            sheetOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="flex flex-col items-center pt-2 pb-1">
            <span className="block w-10 h-1 rounded-full bg-(--color-border)" aria-hidden="true" />
          </div>
          <div className="flex items-center justify-between px-5 py-3 border-b border-(--color-border)">
            <h2 className="text-base font-semibold text-(--color-text-strong)">
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded-sm bg-(--color-brand-500) text-white text-[11px] font-semibold">
                  {activeFilterCount}
                </span>
              )}
            </h2>
            <button
              onClick={() => setSheetOpen(false)}
              className="inline-flex items-center justify-center w-8 h-8 rounded-md text-(--color-text-muted) hover:text-(--color-text-strong) hover:bg-(--color-surface-2)"
              aria-label="Close filters"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <FilterPanel
              value={filters}
              onChange={setFilters}
              onReset={resetFilters}
              activeFilterCount={activeFilterCount}
              embedded
            />
          </div>
          <div className="border-t border-(--color-border) p-4 flex items-center gap-3">
            <button
              onClick={resetFilters}
              className="h-11 px-4 rounded-md text-sm font-medium text-(--color-text) hover:bg-(--color-surface-2)"
            >
              Clear all
            </button>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => setSheetOpen(false)}
            >
              Show {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function Chip({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 h-7 pl-2.5 pr-1 rounded-full border border-(--color-border) bg-(--color-surface-2) text-xs text-(--color-text)">
      {children}
      <button
        onClick={onRemove}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full hover:bg-(--color-border) text-(--color-text-muted)"
        aria-label="Remove filter"
      >
        <X size={11} />
      </button>
    </span>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageInner />
    </Suspense>
  );
}
