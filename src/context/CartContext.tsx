"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from "react";
import { Product, getLineTotalINR, isBulkProduct, BULK_PACK_SIZE } from "@/data/products";
import { site } from "@/data/site";
import { readJSON, writeJSON } from "@/lib/storage";

interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, color?: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const MAX_QTY = 10; // Audit PD-8: cap retail qty; bulk uses the bulk-order flow.

// Bulk products (with wholesale tiers) can be ordered in large volumes, so they
// use a higher ceiling than the retail MAX_QTY cap.
function qtyLimitFor(product: Product): number {
  return isBulkProduct(product) ? BULK_PACK_SIZE * 50 : MAX_QTY;
}
// Bulk products are sold in packs; the smallest add is one pack.
function defaultAddQtyFor(product: Product): number {
  return isBulkProduct(product) ? BULK_PACK_SIZE : 1;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    const stored = readJSON<CartItem[]>(site.storage.cart, []);
    if (Array.isArray(stored)) setItems(stored);
    setHydrated(true);
  }, []);

  // Persist on change (after hydration to avoid wiping storage on first paint).
  useEffect(() => {
    if (!hydrated) return;
    writeJSON(site.storage.cart, items);
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, color?: string, quantity?: number) => {
    const limit = qtyLimitFor(product);
    const addQty = Math.max(1, quantity ?? defaultAddQtyFor(product));
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + addQty, limit) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(addQty, limit), color }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, qtyLimitFor(item.product)) }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const { totalItems, totalPrice } = useMemo(() => {
    let count = 0;
    let sum = 0;
    for (const i of items) {
      count += i.quantity;
      sum += getLineTotalINR(i.product, i.quantity);
    }
    return { totalItems: count, totalPrice: sum };
  }, [items]);

  const value = useMemo<CartContextType>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isOpen,
      setIsOpen,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
