"use client";

import { useEffect, useRef } from "react";
import { X, Trash2, ShoppingBag, ChevronRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  theme: string;
}

export function CartDrawer({ theme }: CartDrawerProps) {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setIsOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isDark = theme === "dark";

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-60 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cn(
          "fixed top-0 right-0 bottom-0 z-70 w-full max-w-[420px] flex flex-col transition-transform duration-500 ease-out",
          isDark ? "bg-[#0d0d0d] border-l border-white/10" : "bg-white border-l border-black/5",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ boxShadow: "-20px 0 60px rgba(0,0,0,0.2)" }}
      >
        {/* Header */}
        <div className={cn("flex items-center justify-between px-6 py-5 border-b", isDark ? "border-white/10" : "border-black/5")}>
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-[#4a6fa5]" />
            <span className={cn("font-semibold text-lg", isDark ? "text-white" : "text-[#1a1a1a]")}>
              Your Cart
            </span>
            {totalItems > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#4a6fa5]/15 text-[#4a6fa5]">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110",
              isDark ? "text-white/60 hover:bg-white/10 hover:text-white" : "text-black/40 hover:bg-black/5 hover:text-black"
            )}
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-[#4a6fa5]/10 flex items-center justify-center">
                <ShoppingBag size={32} className="text-[#4a6fa5]/60" />
              </div>
              <div>
                <p className={cn("font-semibold text-lg", isDark ? "text-white" : "text-[#1a1a1a]")}>
                  Your cart is empty
                </p>
                <p className={cn("text-sm mt-1", isDark ? "text-white/50" : "text-black/40")}>
                  Explore our premium collection
                </p>
              </div>
              <Link
                href="/products"
                onClick={() => setIsOpen(false)}
                className="btn-primary mt-2"
              >
                <span>Shop Now</span>
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className={cn(
                    "flex gap-4 p-4 rounded-xl border",
                    isDark ? "border-white/8 bg-white/3" : "border-black/5 bg-black/2"
                  )}
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className={cn("font-medium text-sm leading-tight line-clamp-2", isDark ? "text-white" : "text-[#1a1a1a]")}>
                      {item.product.name}
                    </p>
                    {item.color && (
                      <p className={cn("text-xs mt-0.5", isDark ? "text-white/40" : "text-black/40")}>
                        {item.color}
                      </p>
                    )}
                    <p className="text-[#4a6fa5] font-bold text-sm mt-1">
                      ${item.product.price.toLocaleString()}
                    </p>

                    {/* Qty Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className={cn(
                        "flex items-center rounded-lg border overflow-hidden",
                        isDark ? "border-white/10" : "border-black/10"
                      )}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className={cn(
                            "w-7 h-7 flex items-center justify-center text-sm transition-colors",
                            isDark ? "hover:bg-white/10 text-white/70" : "hover:bg-black/5 text-black/60"
                          )}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className={cn("px-3 text-sm font-medium", isDark ? "text-white" : "text-[#1a1a1a]")}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className={cn(
                            "w-7 h-7 flex items-center justify-center text-sm transition-colors",
                            isDark ? "hover:bg-white/10 text-white/70" : "hover:bg-black/5 text-black/60"
                          )}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-400 hover:text-red-500 transition-colors hover:scale-110 transform duration-200"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={cn("px-6 py-5 border-t space-y-4", isDark ? "border-white/10" : "border-black/5")}>
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className={cn("text-sm", isDark ? "text-white/60" : "text-black/50")}>Subtotal</span>
              <span className={cn("font-bold text-lg", isDark ? "text-white" : "text-[#1a1a1a]")}>
                ${totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Checkout CTA */}
            <button
              className="w-full btn-primary justify-between"
              onClick={() => { setIsOpen(false); router.push("/checkout"); }}
            >
              <span>Proceed to Checkout</span>
              <ChevronRight size={16} />
            </button>

            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className={cn(
                "block text-center text-sm font-medium transition-colors",
                isDark ? "text-white/50 hover:text-white" : "text-black/40 hover:text-black"
              )}
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
