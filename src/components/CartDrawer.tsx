"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Trash2, ShoppingBag, ChevronRight, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { EmptyState } from "./ui/EmptyState";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const { formatPrice } = useCurrency();
  const drawerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setIsOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[70] bg-black/40 transition-opacity duration-200",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cn(
          "fixed top-0 right-0 bottom-0 z-[80] w-full max-w-[420px] flex flex-col bg-[var(--color-bg)] border-l border-[var(--color-border)] shadow-[var(--shadow-overlay)] transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} className="text-[var(--color-brand-500)]" aria-hidden="true" />
            <h2 className="text-base font-semibold text-[var(--color-text-strong)]">Your Cart</h2>
            {totalItems > 0 && (
              <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-semibold bg-[var(--color-brand-50)] text-[var(--color-brand-700)]">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center w-8 h-8 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-strong)] hover:bg-[var(--color-surface-2)] transition-colors"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <EmptyState
              icon={<ShoppingBag size={32} />}
              title="Your cart is empty"
              description="Browse our furniture and electronics."
              primaryCta={
                <Link href="/products" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" size="md">Browse products</Button>
                </Link>
              }
            />
          ) : (
            <ul className="flex flex-col gap-3" aria-label="Cart items">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]"
                >
                  <div className="relative w-16 h-20 rounded-md overflow-hidden bg-[var(--color-surface-2)] shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <p className="text-sm font-medium text-[var(--color-text-strong)] line-clamp-2 leading-snug">
                      {item.product.name}
                    </p>
                    {item.color && (
                      <p className="text-xs text-[var(--color-text-muted)]">{item.color}</p>
                    )}
                    <p className="text-sm font-semibold tabular text-[var(--color-text-strong)]">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>

                    <div className="flex items-center justify-between mt-1">
                      <div className="inline-flex items-center rounded-md border border-[var(--color-border)] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 inline-flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-surface-2)]"
                          aria-label={`Decrease quantity of ${item.product.name}`}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-sm font-medium text-[var(--color-text-strong)] tabular">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 inline-flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-surface-2)]"
                          aria-label={`Increase quantity of ${item.product.name}`}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="inline-flex items-center justify-center w-7 h-7 rounded-md text-[var(--color-danger-500)] hover:bg-[var(--color-danger-50)] transition-colors"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="px-6 py-5 border-t border-[var(--color-border)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-muted)]">Subtotal</span>
              <span className="text-lg font-semibold tabular text-[var(--color-text-strong)]">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">
              Shipping and taxes calculated at checkout.
            </p>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => {
                setIsOpen(false);
                router.push("/checkout");
              }}
              rightIcon={<ChevronRight size={16} />}
            >
              Proceed to Checkout
            </Button>
            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className="block text-center text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-strong)] transition-colors"
            >
              Continue shopping
            </Link>
          </footer>
        )}
      </aside>
    </>
  );
}
