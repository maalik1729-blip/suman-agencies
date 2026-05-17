"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/context/CurrencyContext";
import { categories } from "@/data/products";

export type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "name";
export type Category = "all" | "furniture" | "electronics";

export interface FilterState {
  category: Category;
  subcategories: string[];
  priceMin: number;
  priceMax: number;
  minRating: number;
}

export const PRICE_MIN = 0;
export const PRICE_MAX = 200000;
export const PRICE_STEP = 1000;

interface FilterPanelProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
  activeFilterCount: number;
  /** Render in a sheet (no border / shadow). */
  embedded?: boolean;
}

/**
 * PLP filter panel.
 * Audit P-1: was defined inline in products/page.tsx but never rendered.
 * Audit A-3 / P-10: sub-categories now real `<input type="checkbox">`.
 * Audit P-6 / A-4: price range is a real dual-thumb pair (two range inputs +
 * two number inputs), not a single thumb mislabeled as a range.
 */
export function FilterPanel({
  value,
  onChange,
  onReset,
  activeFilterCount,
  embedded = false,
}: FilterPanelProps) {
  const { formatPrice } = useCurrency();

  const subcategoryList =
    value.category === "furniture"
      ? categories.furniture
      : value.category === "electronics"
      ? categories.electronics
      : [...categories.furniture, ...categories.electronics];

  const toggleSubcategory = (sub: string) => {
    const set = new Set(value.subcategories);
    if (set.has(sub)) set.delete(sub);
    else set.add(sub);
    onChange({ ...value, subcategories: Array.from(set) });
  };

  const setPriceMin = (n: number) => {
    const clamped = Math.min(Math.max(PRICE_MIN, n), value.priceMax);
    onChange({ ...value, priceMin: clamped });
  };
  const setPriceMax = (n: number) => {
    const clamped = Math.max(Math.min(PRICE_MAX, n), value.priceMin);
    onChange({ ...value, priceMax: clamped });
  };

  return (
    <div
      className={cn(
        "flex flex-col",
        !embedded &&
          "rounded-lg border border-() bg-() overflow-hidden"
      )}
    >
      {!embedded && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-()">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-()">Filters</span>
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-sm bg-() text-white text-[10px] font-semibold">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={onReset}
              className="text-xs font-medium text-() hover:text-() focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-() rounded-sm"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      <div className="px-5 py-4 space-y-6">
        {/* Category */}
        <Group label="Category">
          <div className="flex flex-col gap-1.5" role="radiogroup" aria-label="Category">
            {(["all", "furniture", "electronics"] as const).map((cat) => {
              const active = value.category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onChange({ ...value, category: cat, subcategories: [] })}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-()",
                    active
                      ? "bg-() text-white"
                      : "text-() hover:bg-()"
                  )}
                >
                  {cat === "all" ? "All products" : cat[0].toUpperCase() + cat.slice(1)}
                </button>
              );
            })}
          </div>
        </Group>

        <Divider />

        {/* Price (dual thumb) */}
        <Group label="Price range">
          <div className="space-y-3">
            <div className="relative h-6">
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={value.priceMin}
                onChange={(e) => setPriceMin(Number(e.target.value))}
                aria-label="Minimum price"
                className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto accent-()"
              />
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={value.priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                aria-label="Maximum price"
                className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto accent-()"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex flex-col">
                <span className="sr-only">Minimum price</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={PRICE_STEP}
                  value={value.priceMin}
                  onChange={(e) => setPriceMin(Number(e.target.value) || 0)}
                  className="h-9 px-2.5 rounded-md border border-() bg-() text-xs text-() tabular focus:outline-none focus:border-() focus:ring-2 focus:ring-()"
                />
              </label>
              <label className="flex flex-col">
                <span className="sr-only">Maximum price</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={PRICE_STEP}
                  value={value.priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value) || 0)}
                  className="h-9 px-2.5 rounded-md border border-() bg-() text-xs text-() tabular focus:outline-none focus:border-() focus:ring-2 focus:ring-()"
                />
              </label>
            </div>
            <p className="text-[11px] text-() tabular">
              {formatPrice(value.priceMin)} — {formatPrice(value.priceMax)}
            </p>
          </div>
        </Group>

        <Divider />

        {/* Rating */}
        <Group label="Min rating">
          <div className="flex flex-wrap gap-1.5">
            {[0, 3, 3.5, 4, 4.5].map((r) => {
              const active = value.minRating === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => onChange({ ...value, minRating: r })}
                  className={cn(
                    "inline-flex items-center gap-1 h-8 px-2.5 rounded-md text-xs font-medium border transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-()",
                    active
                      ? "border-() bg-() text-()"
                      : "border-() text-() hover:border-()"
                  )}
                  aria-pressed={active}
                >
                  {r === 0 ? (
                    "Any"
                  ) : (
                    <>
                      <Star
                        size={11}
                        className="fill-() text-()"
                        aria-hidden="true"
                      />
                      {r}+
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </Group>

        <Divider />

        {/* Subcategories */}
        <Group label="Sub-category">
          <ul className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {subcategoryList
              .filter((s) => s !== "All")
              .map((sub) => {
                const checked = value.subcategories.includes(sub);
                return (
                  <li key={sub}>
                    <label className="flex items-center gap-2.5 cursor-pointer py-1 text-sm text-() hover:text-()">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSubcategory(sub)}
                        className="h-4 w-4 accent-() focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-() focus-visible:ring-offset-2"
                      />
                      <span className={checked ? "text-() font-medium" : undefined}>
                        {sub}
                      </span>
                    </label>
                  </li>
                );
              })}
          </ul>
        </Group>
      </div>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-() mb-2.5">
        {label}
      </p>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="border-t border-()" />;
}
