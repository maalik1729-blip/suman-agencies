"use client";

import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  theme: string;
  className?: string;
}

const badgeConfig = {
  new: { label: "New", className: "badge-new" },
  sale: { label: "Sale", className: "badge-sale" },
  trending: { label: "Trending", className: "badge-trending" },
  bestseller: { label: "Best Seller", className: "badge-bestseller" },
};

export function ProductCard({ product, theme, className }: ProductCardProps) {
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isDark = theme === "dark";
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link
      href={`/products/${product.id}`}
      className={cn(
        "product-card group relative flex flex-col cursor-pointer",
        isDark ? "bg-[#1a1a1a] border border-white/8" : "bg-white border border-black/5",
        className
      )}
      style={{ boxShadow: "var(--shadow-luxe)" }}
      aria-label={`View ${product.name}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 dark:bg-gray-800">
        {!imageLoaded && <div className="skeleton absolute inset-0" />}
        <img
          src={product.images[0]}
          alt={product.name}
          className={cn("card-image w-full h-full object-cover", imageLoaded ? "opacity-100" : "opacity-0")}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Hover overlay tint */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlisted(!wishlisted); }}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10",
            wishlisted ? "bg-red-500 text-white" : "bg-white/80 backdrop-blur text-[#1a1a1a]/60 hover:bg-white"
          )}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={14} fill={wishlisted ? "white" : "none"} />
        </button>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={cn("badge", badgeConfig[product.badge].className)}>
              {badgeConfig[product.badge].label}
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-10 left-3 z-10">
            <span className="badge badge-sale">-{discount}%</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <p className={cn("text-xs font-medium uppercase tracking-wider", isDark ? "text-white/40" : "text-black/40")}>
            {product.subcategory}
          </p>
          <h3 className={cn("font-semibold text-sm mt-0.5 line-clamp-2 leading-snug", isDark ? "text-white" : "text-[#1a1d23]")}>
            {product.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? "text-[#4a6fa5] fill-[#4a6fa5]" : "text-gray-300"}
              />
            ))}
          </div>
          <span className={cn("text-xs", isDark ? "text-white/40" : "text-black/40")}>
            {product.rating}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-[#4a6fa5] font-bold text-base">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className={cn("text-xs line-through", isDark ? "text-white/30" : "text-black/30")}>
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(product); }}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
            style={{ background: "linear-gradient(135deg, #4a6fa5, #2d4f7c)", color: "white" }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </Link>
  );
}
