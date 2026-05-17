"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from "react";
import { Product } from "@/data/products";
import { site } from "@/data/site";
import { readJSON, writeJSON } from "@/lib/storage";

interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, color?: string) => void;
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

  const addItem = useCallback((product: Product, color?: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QTY) }
            : item
        );
      }
      return [...prev, { product, quantity: 1, color }];
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
          ? { ...item, quantity: Math.min(quantity, MAX_QTY) }
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
      sum += i.product.price * i.quantity;
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
