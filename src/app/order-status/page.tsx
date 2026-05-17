"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, Home, Download, Phone, MapPin } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency, type Currency } from "@/context/CurrencyContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { site } from "@/data/site";
import { loadOrder, type Order, type OrderStatus } from "@/lib/orders";

const STEP_DEFS: Array<{ key: OrderStatus; icon: typeof CheckCircle; label: string }> = [
  { key: "confirmed", icon: CheckCircle, label: "Order Confirmed" },
  { key: "packed",    icon: Package,     label: "Being Packed" },
  { key: "shipped",   icon: Truck,       label: "Out for Delivery" },
  { key: "delivered", icon: Home,        label: "Delivered" },
];

const PAYMENT_LABEL = {
  cod: "Cash on Delivery",
  card: "Credit / Debit Card",
  upi: "UPI Payment",
} as const;

function OrderStatusInner() {
  const params = useSearchParams();
  const { clearCart } = useCart();
  const { formatPrice, currency, setCurrency } = useCurrency();
  const [order, setOrder] = useState<Order | null | undefined>(undefined); // undefined = loading

  const orderIdParam = params.get("id");

  useEffect(() => {
    if (!orderIdParam) {
      setOrder(null);
      return;
    }
    const loaded = loadOrder(orderIdParam);
    setOrder(loaded);
    // Audit UX-4: clear the cart only AFTER the order snapshot is safely loaded.
    if (loaded) clearCart();
  }, [orderIdParam, clearCart]);

  // Sync currency to whatever the customer was using at checkout (display only).
  useEffect(() => {
    if (order && order.currency && order.currency !== currency) {
      setCurrency(order.currency as Currency);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  if (order === undefined) {
    return (
      <div className="min-h-screen pt-[calc(var(--header-height)+24px)] px-4">
        <div className="max-w-2xl mx-auto py-20 text-center text-sm text-[var(--color-text-muted)]">
          Loading your order…
        </div>
      </div>
    );
  }

  if (order === null) {
    return (
      <div className="min-h-screen pt-[calc(var(--header-height)+24px)] px-4">
        <div className="max-w-2xl mx-auto py-16">
          <EmptyState
            title="We couldn't find that order"
            description={
              <>
                Try the link from your confirmation email, or{" "}
                <a href={`tel:${site.contact.phones[0].e164}`} className="underline">
                  call us
                </a>{" "}
                if you placed an order in the last few minutes.
              </>
            }
            primaryCta={
              <Link href="/products">
                <Button variant="primary" size="md">Continue shopping</Button>
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  const placedAt = new Date(order.placedAt);
  const eta = new Date(placedAt);
  eta.setDate(eta.getDate() + 5);

  const orderDateStr = placedAt.toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  }) + ", " + placedAt.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });

  const etaStr = eta.toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long",
  });

  const currentStepIdx = STEP_DEFS.findIndex((s) => s.key === order.status);

  const downloadInvoice = () => {
    const inrToActive = (n: number) => formatPrice(n);
    const rowsHtml = order.items
      .map(
        (it, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${escapeHtml(it.name)}${it.variant ? ` <span style="color:#94a3b8">(${escapeHtml(it.variant)})</span>` : ""}</td>
          <td>${it.quantity}</td>
          <td>${inrToActive(it.unitPriceINR)}</td>
          <td>${inrToActive(it.unitPriceINR * it.quantity)}</td>
        </tr>`
      )
      .join("");

    const html = `<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8" /><title>Invoice ${order.id}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Inter','Segoe UI',Arial,sans-serif; color:#0f1115; padding:40px; }
  .row { display:flex; justify-content:space-between; align-items:flex-start; }
  .brand { font-size:22px; font-weight:700; color:#2d4f7c; }
  .tag { font-size:11px; color:#62656e; margin-top:2px; }
  h2 { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:#62656e; margin: 24px 0 8px; }
  .info { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; padding:16px; background:#fafaf9; border:1px solid #e7e7e3; border-radius:8px; }
  .info div span { display:block; font-size:10px; color:#62656e; text-transform:uppercase; letter-spacing:1px; margin-bottom:2px; }
  table { width:100%; border-collapse:collapse; margin-top:8px; }
  th { background:#2d4f7c; color:#fff; text-align:left; padding:10px 12px; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; }
  td { padding:10px 12px; font-size:13px; border-bottom:1px solid #f4f4f2; }
  .totals { margin-top:12px; margin-left:auto; width:280px; }
  .totals .line { display:flex; justify-content:space-between; padding:4px 0; font-size:13px; color:#2b2e35; }
  .totals .grand { margin-top:6px; padding-top:10px; border-top:2px solid #2d4f7c; font-size:15px; font-weight:700; }
  footer { margin-top:32px; padding-top:16px; border-top:1px solid #e7e7e3; font-size:11px; color:#62656e; }
  @media print { body { padding:20px; } }
</style></head>
<body>
  <div class="row">
    <div>
      <div class="brand">${escapeHtml(site.brand)}</div>
      <div class="tag">${escapeHtml(site.tagline)}</div>
    </div>
    <div style="text-align:right">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#62656e">Tax Invoice</div>
      <div style="font-size:18px;font-weight:700;color:#2d4f7c;font-family:'JetBrains Mono',monospace">${order.id}</div>
    </div>
  </div>

  <h2>Order Details</h2>
  <div class="info">
    <div><span>Placed on</span>${orderDateStr}</div>
    <div><span>Payment</span>${PAYMENT_LABEL[order.payment.method]}</div>
    <div><span>Status</span>Confirmed</div>
    <div><span>Estimated delivery</span>${etaStr}</div>
  </div>

  <h2>Items</h2>
  <table>
    <thead><tr><th>#</th><th>Product</th><th>Qty</th><th>Unit</th><th>Total</th></tr></thead>
    <tbody>${rowsHtml}</tbody>
  </table>

  <div class="totals">
    <div class="line"><span>Subtotal</span><span>${inrToActive(order.totals.subtotalINR)}</span></div>
    <div class="line"><span>Delivery</span><span style="color:#16a34a">Free</span></div>
    ${order.totals.codFeeINR > 0 ? `<div class="line"><span>COD handling fee</span><span>${inrToActive(order.totals.codFeeINR)}</span></div>` : ""}
    <div class="line" style="font-size:11px;color:#62656e"><span>GST</span><span>Inclusive</span></div>
    <div class="line grand"><span>Total</span><span>${inrToActive(order.totals.totalINR)}</span></div>
  </div>

  <footer>
    <strong>${escapeHtml(site.brand)}</strong> · ${escapeHtml(site.proprietor)}<br/>
    GSTIN ${site.gstin} · ${site.contact.primaryEmail}<br/>
    ${escapeHtml(site.contact.address.line1)}, ${escapeHtml(site.contact.address.city)} – ${site.contact.address.pincode}<br/>
    <span style="color:#94a3b8">Computer-generated invoice. No signature required.</span>
  </footer>
  <script>window.onload = () => setTimeout(() => window.print(), 200);<\/script>
</body></html>`;

    const win = window.open("", "_blank", "width=900,height=700");
    if (win) { win.document.write(html); win.document.close(); }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-[calc(var(--header-height)+24px)] pb-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Success header */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 18, stiffness: 220 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="w-16 h-16 rounded-full bg-[var(--color-success-50)] flex items-center justify-center mb-4">
            <CheckCircle size={32} className="text-[var(--color-success-500)]" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--color-text-strong)]">
            Order placed!
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-md">
            Thank you, {order.address.name.split(" ")[0]}. We've received your order and will send updates to {order.address.email}.
          </p>
        </motion.div>

        {/* Order metadata */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 mb-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Order ID</p>
              <p className="mt-1 font-mono text-sm text-[var(--color-text-strong)]">{order.id}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Total paid</p>
              <p className="mt-1 text-sm font-semibold tabular text-[var(--color-text-strong)]">
                {formatPrice(order.totals.totalINR)}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Payment</p>
              <p className="mt-1 text-sm text-[var(--color-text-strong)]">{PAYMENT_LABEL[order.payment.method]}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Estimated delivery</p>
              <p className="mt-1 text-sm text-[var(--color-text-strong)]">{etaStr}</p>
            </div>
            <div className="col-span-2 pt-3 border-t border-[var(--color-border)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Placed on</p>
              <p className="mt-1 text-sm text-[var(--color-text-strong)]">{orderDateStr}</p>
            </div>
          </div>
        </div>

        {/* Delivery address */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-2">
            Delivery to
          </p>
          <p className="text-sm font-medium text-[var(--color-text-strong)]">{order.address.name}</p>
          <p className="text-sm text-[var(--color-text)] flex items-center gap-1.5 mt-0.5">
            <Phone size={12} className="text-[var(--color-text-muted)]" aria-hidden="true" />
            {order.address.phone}
          </p>
          <p className="text-sm text-[var(--color-text)] flex items-start gap-1.5 mt-0.5">
            <MapPin size={12} className="mt-0.5 text-[var(--color-text-muted)] shrink-0" aria-hidden="true" />
            <span>
              {order.address.line}, {order.address.city}, {order.address.state} – {order.address.pincode}
            </span>
          </p>
        </div>

        {/* Tracking */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 mb-5">
          <h2 className="text-base font-semibold text-[var(--color-text-strong)] mb-5">Order tracking</h2>
          <ol className="relative space-y-5">
            <span
              className="absolute left-[15px] top-2 bottom-2 w-px bg-[var(--color-border)]"
              aria-hidden="true"
            />
            {STEP_DEFS.map((step, i) => {
              const Icon = step.icon;
              const done = i <= currentStepIdx;
              return (
                <li key={step.key} className="flex items-center gap-3 relative">
                  <span
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border-2 bg-[var(--color-bg)]",
                      done
                        ? "bg-[var(--color-brand-500)] border-[var(--color-brand-500)] text-white"
                        : "border-[var(--color-border)] text-[var(--color-text-muted)]"
                    )}
                  >
                    <Icon size={14} aria-hidden="true" />
                  </span>
                  <div>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        done ? "text-[var(--color-text-strong)]" : "text-[var(--color-text-muted)]"
                      )}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {step.key === "confirmed" && orderDateStr}
                      {step.key === "packed" && "Within 24 hours"}
                      {step.key === "shipped" && "1–2 days"}
                      {step.key === "delivered" && etaStr}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Items */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 mb-5">
          <h2 className="text-base font-semibold text-[var(--color-text-strong)] mb-4">Items</h2>
          <ul className="space-y-3">
            {order.items.map((it) => (
              <li key={it.id} className="flex gap-3 items-center">
                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-[var(--color-surface-2)] shrink-0">
                  <Image src={it.image} alt="" fill sizes="48px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text-strong)] line-clamp-1">{it.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Qty: {it.quantity}</p>
                </div>
                <span className="text-sm font-semibold tabular text-[var(--color-text-strong)] shrink-0">
                  {formatPrice(it.unitPriceINR * it.quantity)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={downloadInvoice}
            leftIcon={<Download size={15} />}
            className="flex-1"
          >
            Download invoice
          </Button>
          <a href={`tel:${site.contact.phones[0].e164}`} className="flex-1">
            <Button variant="secondary" size="md" fullWidth leftIcon={<Phone size={15} />}>
              Contact support
            </Button>
          </a>
          <Link href="/products" className="flex-1">
            <Button variant="primary" size="md" fullWidth>
              Continue shopping
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--color-text-muted)]">
          Save this page or screenshot the order ID for your records.
        </p>
      </div>
    </div>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default function OrderStatusPage() {
  return (
    <Suspense fallback={null}>
      <OrderStatusInner />
    </Suspense>
  );
}
