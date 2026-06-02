// Order snapshot persistence. Audit UX-4 / OS-2 / OS-4: capture the cart + form
// state BEFORE clearCart(); make refresh + direct visits to /order-status?id=...
// fully recoverable; render real items + address + amount in the user's currency.

import { site } from "@/data/site";
import { readJSON, writeJSON, writeString } from "@/lib/storage";

export type OrderPayment =
  | { method: "upi"; upiId?: string; app?: string }
  | { method: "card"; cardLast4?: string }
  | { method: "cod" };

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  unitPriceINR: number;
  quantity: number;
  variant?: string;
}

export interface OrderAddress {
  name: string;
  email: string;
  phone: string;
  line: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderTotals {
  subtotalINR: number;
  shippingINR: number;
  codFeeINR: number;
  totalINR: number;
}

export type OrderStatus = "confirmed" | "packed" | "shipped" | "delivered";

export interface Order {
  id: string;
  placedAt: string; // ISO
  status: OrderStatus;
  items: OrderItem[];
  address: OrderAddress;
  payment: OrderPayment;
  totals: OrderTotals;
  /** Currency the user was viewing prices in at checkout. Display-only. */
  currency: "INR" | "USD" | "EUR";
  notes?: string;
}

function key(id: string): string {
  return `${site.storage.orderPrefix}${id}`;
}

export function saveOrder(order: Order): void {
  writeJSON(key(order.id), order);
  writeString(site.storage.lastOrderId, order.id);

  // Fire and forget to the backend API
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://suman-agencies.onrender.com/api/orders"; 
  
  // Map frontend order structure to backend's expected schema
  const payload = {
    customer: {
      name: order.address.name,
      email: order.address.email,
      phone: order.address.phone,
      address: {
        street: order.address.line,
        city: order.address.city,
        state: order.address.state,
        pincode: order.address.pincode,
        country: 'India'
      }
    },
    items: order.items.map(i => ({
      productId: i.id,
      name: i.name,
      price: i.unitPriceINR,
      quantity: i.quantity,
      image: i.image
    })),
    pricing: {
      subtotal: order.totals.subtotalINR,
      tax: 0,
      shipping: order.totals.shippingINR,
      discount: 0,
      total: order.totals.totalINR
    }
  };
  
  fetch(backendUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Fail silently in development if the backend isn't running.
    console.warn("Backend sync skipped: Backend is not running.");
  });
}

export function loadOrder(id: string): Order | null {
  return readJSON<Order | null>(key(id), null);
}

/**
 * COD fee policy — single source of truth.
 * Audit C-3: copy promised ₹50 below ₹999 but it was never added to totals.
 */
export function calcCodFeeINR(subtotalINR: number): number {
  return subtotalINR < site.cod.feeThresholdINR ? site.cod.feeINR : 0;
}
