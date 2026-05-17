"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Plus } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  /** Kept for compatibility with existing call sites; ignored (theme now via tokens). */
  theme?: string;
  className?: string;
  /** Grid (default) or horizontal list layout. */
  layout?: "grid" | "list";
}

const BADGE_PRIORITY: NonNullable<Product["badge"]>[] = [
  "sale",
  "trending",
  "bestseller",
  "new",
];

const BADGE_LABEL: Record<NonNullable<Product["badge"]>, string> = {
  sale: "Sale",
  trending: "Trending",
  bestseller: "Bestseller",
  new: "New",
};

const BADGE_TONE: Record<NonNullable<Product["badge"]>, string> = {
  sale: "bg-() text-()",
  trending: "bg-() text-()",
  bestseller: "bg-() text-()",
  new: "bg-() text-()",
};

export function ProductCard({ product, className, layout = "grid" }: ProductCardProps) {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  // Display only the highest-priority badge (audit PD-9).
  const badge = product.badge && BADGE_PRIORITY.includes(product.badge) ? product.badge : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  if (layout === "list") {
    return (
      <Link
        href={`/products/${product.id}`}
        className={cn(
          "group flex gap-4 rounded-lg border border-() bg-() p-3 transition-shadow hover:shadow-() focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-()",
          className
        )}
      >
        <div className="relative w-24 h-32 sm:w-32 sm:h-40 shrink-0 overflow-hidden rounded-md bg-()">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 640px) 128px, 96px"
            className="object-cover"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-()/60 flex items-center justify-center">
              <span className={cn("badge", "bg-() text-()")}>
                Out of stock
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-()">
              {product.subcategory}
            </p>
            <h3 className="mt-1 text-base font-semibold text-() line-clamp-2">
              {product.name}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-xs text-()">
              <Star size={12} className="fill-() text-()" aria-hidden="true" />
              {product.rating.toFixed(1)}
              <span className="opacity-60">({product.reviewCount})</span>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <PriceBlock
              price={product.price}
              original={product.originalPrice}
              discount={discount}
              formatPrice={formatPrice}
            />
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="inline-flex h-9 px-3 items-center gap-1.5 rounded-md bg-() text-white text-sm font-medium hover:bg-() disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-() focus-visible:ring-offset-2"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus size={14} />
              Add
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className={cn(
        "group relative flex flex-col rounded-lg border border-() bg-() overflow-hidden transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-() focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-() focus-visible:ring-offset-2",
        className
      )}
      aria-label={`View ${product.name}`}
    >
      {/* Image (4:5 portrait) */}
      <div className="relative aspect-4/5 bg-() overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {badge && (
          <span
            className={cn(
              "absolute top-3 left-3 inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold uppercase tracking-[0.06em]",
              BADGE_TONE[badge]
            )}
          >
            {BADGE_LABEL[badge]}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-()/70 flex items-center justify-center">
            <span className="px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-[0.08em] bg-() text-()">
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 p-4 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-()">
          {product.subcategory}
        </p>
        <h3 className="text-base font-semibold text-() line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 text-xs text-()">
          <Star size={12} className="fill-() text-()" aria-hidden="true" />
          {product.rating.toFixed(1)}
          <span className="opacity-60">({product.reviewCount})</span>
        </div>

        <div className="mt-auto pt-2 flex items-end justify-between gap-2">
          <PriceBlock
            price={product.price}
            original={product.originalPrice}
            discount={discount}
            formatPrice={formatPrice}
          />
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-() text-white hover:bg-() disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-() focus-visible:ring-offset-2"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
}

function PriceBlock({
  price,
  original,
  discount,
  formatPrice,
}: {
  price: number;
  original?: number;
  discount: number | null;
  formatPrice: (n: number) => string;
}) {
  return (
    <div className="flex items-baseline gap-2 flex-wrap tabular">
      <span className="text-base sm:text-lg font-semibold text-()">
        {formatPrice(price)}
      </span>
      {original && (
        <span className="text-xs text-() line-through">
          {formatPrice(original)}
        </span>
      )}
      {discount && discount > 0 && (
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-sm bg-() text-()">
          -{discount}%
        </span>
      )}
    </div>
  );
}
