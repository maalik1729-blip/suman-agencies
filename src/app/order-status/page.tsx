"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, Home, ChevronRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const steps = [
  { icon: CheckCircle, label: "Order Confirmed", done: true },
  { icon: Package, label: "Being Packed", done: true },
  { icon: Truck, label: "Out for Delivery", done: false },
  { icon: Home, label: "Delivered", done: false },
];

const methodLabels: Record<string, string> = {
  cash: "Cash on Delivery",
  card: "Credit / Debit Card",
  upi: "UPI Payment",
};

export default function OrderStatusPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [show, setShow] = useState(false);

  const orderId = params.get("id") || "LUX-000000";
  const method = params.get("method") || "upi";
  const amount = params.get("amount") || "0";

  useEffect(() => {
    const stored = localStorage.getItem("suman-agency-theme");
    setTheme(stored || "light");
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light")
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  const isDark = theme === "dark";

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);
  const dateStr = estimatedDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
  const orderDate = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const downloadInvoice = () => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Invoice – ${orderId}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #fff; color: #1a1d23; padding: 48px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 2px solid #4a6fa5; padding-bottom: 24px; }
    .brand { font-size: 28px; font-weight: 800; color: #2d4f7c; letter-spacing: -0.5px; }
    .brand-tag { font-size: 11px; color: #64748b; margin-top: 2px; }
    .invoice-title { font-size: 13px; font-weight: 600; color: #64748b; text-align: right; text-transform: uppercase; letter-spacing: 1px; }
    .invoice-id { font-size: 22px; font-weight: 800; color: #4a6fa5; margin-top: 4px; }
    .section { margin-bottom: 28px; }
    .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; margin-bottom: 8px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; background: #f8fafc; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0; }
    .info-item label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; display: block; margin-bottom: 4px; }
    .info-item span { font-size: 14px; font-weight: 700; color: #1a1d23; }
    .info-item .highlight { color: #4a6fa5; }
    table { width: 100%; border-collapse: collapse; }
    thead tr { background: #4a6fa5; color: white; }
    thead th { padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
    tbody tr { border-bottom: 1px solid #f1f5f9; }
    tbody tr:nth-child(even) { background: #f8fafc; }
    tbody td { padding: 12px 16px; font-size: 13px; color: #1a1d23; }
    .totals { margin-top: 16px; margin-left: auto; width: 280px; }
    .total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; color: #64748b; }
    .total-row.grand { border-top: 2px solid #4a6fa5; margin-top: 8px; padding-top: 12px; font-size: 16px; font-weight: 800; color: #1a1d23; }
    .total-row.grand span:last-child { color: #4a6fa5; }
    .footer { margin-top: 48px; border-top: 1px solid #e2e8f0; padding-top: 20px; display: flex; justify-content: space-between; align-items: center; }
    .footer-note { font-size: 11px; color: #94a3b8; }
    .status-badge { background: #dcfce7; color: #16a34a; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
    @media print { body { padding: 32px; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">Suman Tech Automation</div>
      <div class="brand-tag">Premium Furniture &amp; Electronics</div>
    </div>
    <div>
      <div class="invoice-title">Tax Invoice</div>
      <div class="invoice-id">${orderId}</div>
    </div>
  </div>

  <div class="section">
    <div class="info-grid">
      <div class="info-item"><label>Order Date</label><span>${orderDate}</span></div>
      <div class="info-item"><label>Payment Method</label><span>${methodLabels[method]}</span></div>
      <div class="info-item"><label>Order Status</label><span class="highlight">Confirmed ✓</span></div>
      <div class="info-item"><label>Estimated Delivery</label><span>${dateStr}</span></div>
      <div class="info-item"><label>Amount Paid</label><span class="highlight">$${Number(amount).toLocaleString()}</span></div>
      <div class="info-item"><label>Invoice No.</label><span>${orderId.replace('LUX-', 'INV-')}</span></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Order Items</div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Category</th>
          <th>Qty</th>
          <th>Unit Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Your Order Items</td>
          <td>–</td>
          <td>–</td>
          <td>–</td>
          <td>$${Number(amount).toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
    <div class="totals">
      <div class="total-row"><span>Subtotal</span><span>$${Number(amount).toLocaleString()}</span></div>
      <div class="total-row"><span>Delivery</span><span style="color:#16a34a">Free</span></div>
      <div class="total-row"><span>Tax (GST 18%)</span><span>Included</span></div>
      <div class="total-row grand"><span>Total Paid</span><span>$${Number(amount).toLocaleString()}</span></div>
    </div>
  </div>

  <div class="footer">
    <div class="footer-note">
      <div style="font-weight:700;color:#1a1d23;margin-bottom:2px">Suman Tech Automation</div>
      <div style="font-size:10px;color:#4a6fa5;font-weight:700;margin-bottom:4px">Prop. RAJASINGH &nbsp;|&nbsp; Reg. Type: Regular Taxpayer</div>
      <div>GSTIN: 33DVIPR5548Q1ZN &nbsp;|&nbsp; sumantechautomation@gmail.com | sumanagency4@gmail.com</div>
      <div style="margin-top:3px">No.7/1-3, West Street, Chellathayarpuram, Tirunelveli District, Tamil Nadu – 627808</div>
      <div style="margin-top:3px">GST Reg. Date: 10/01/2024 &nbsp;|&nbsp; Valid From: 17/02/2022</div>
      <div style="margin-top:4px;color:#94a3b8">This is a computer generated invoice. No signature required.</div>
    </div>
    <div class="status-badge">Payment Received</div>
  </div>

  <script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`;

    const win = window.open("", "_blank", "width=900,height=700");
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  };

  return (
    <div className={cn("min-h-screen pt-24 pb-16 px-4 sm:px-6", isDark ? "bg-[#0d1017]" : "bg-[#f8fafc]")}>
      <div className="max-w-2xl mx-auto">

        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={show ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="relative w-24 h-24 mb-5">
            <div className="absolute inset-0 rounded-full bg-green-500/15 animate-ping" />
            <div className="relative w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle size={48} className="text-green-500" />
            </div>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className={cn("text-3xl font-bold font-serif", isDark ? "text-white" : "text-[#1a1d23]")}
          >
            Order Placed! 🎉
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className={cn("mt-2 text-sm", isDark ? "text-white/50" : "text-black/40")}
          >
            Thank you for shopping with Suman Tech Automation. Your order is confirmed.
          </motion.p>
        </motion.div>

        {/* Order Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className={cn("rounded-2xl border p-6 mb-5", isDark ? "bg-[#141820] border-white/8" : "bg-white border-black/6")}
          style={{ boxShadow: "var(--shadow-luxe)" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            <div>
              <p className={cn("text-xs uppercase tracking-wider font-semibold mb-1", isDark ? "text-white/40" : "text-black/35")}>Order ID</p>
              <p className={cn("font-bold text-sm", isDark ? "text-white" : "text-[#1a1d23]")}>{orderId}</p>
            </div>
            <div>
              <p className={cn("text-xs uppercase tracking-wider font-semibold mb-1", isDark ? "text-white/40" : "text-black/35")}>Amount Paid</p>
              <p className="font-bold text-sm text-[#4a6fa5]">${Number(amount).toLocaleString()}</p>
            </div>
            <div>
              <p className={cn("text-xs uppercase tracking-wider font-semibold mb-1", isDark ? "text-white/40" : "text-black/35")}>Payment</p>
              <p className={cn("font-bold text-sm", isDark ? "text-white" : "text-[#1a1d23]")}>{methodLabels[method]}</p>
            </div>
            <div className="col-span-2 sm:col-span-3 pt-3 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}>
              <p className={cn("text-xs uppercase tracking-wider font-semibold mb-1", isDark ? "text-white/40" : "text-black/35")}>Estimated Delivery</p>
              <p className={cn("font-bold", isDark ? "text-white" : "text-[#1a1d23]")}>{dateStr}</p>
            </div>
          </div>
        </motion.div>

        {/* Tracking Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
          className={cn("rounded-2xl border p-6 mb-5", isDark ? "bg-[#141820] border-white/8" : "bg-white border-black/6")}
          style={{ boxShadow: "var(--shadow-luxe)" }}
        >
          <h2 className={cn("font-bold text-base mb-6", isDark ? "text-white" : "text-[#1a1d23]")}>Order Tracking</h2>
          <div className="relative">
            {/* Progress Line */}
            <div className={cn("absolute left-5 top-5 bottom-5 w-0.5", isDark ? "bg-white/10" : "bg-black/8")} />
            <div className="absolute left-5 top-5 w-0.5 bg-[#4a6fa5]" style={{ height: "35%" }} />

            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={show ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-4 relative"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 transition-all",
                    step.done
                      ? "bg-[#4a6fa5] border-[#4a6fa5] text-white"
                      : isDark
                      ? "bg-[#0d1017] border-white/15 text-white/30"
                      : "bg-[#f8fafc] border-black/10 text-black/25"
                  )}>
                    <step.icon size={18} />
                  </div>
                  <div>
                    <p className={cn("font-semibold text-sm", step.done ? (isDark ? "text-white" : "text-[#1a1d23]") : (isDark ? "text-white/30" : "text-black/30"))}>{step.label}</p>
                    <p className={cn("text-xs", isDark ? "text-white/30" : "text-black/30")}>
                      {i === 0 && "Just now"}
                      {i === 1 && "Processing at warehouse"}
                      {i === 2 && "Expected in 2–3 days"}
                      {i === 3 && dateStr}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link href="/products" className="btn-primary flex-1 justify-center">
            <span>Continue Shopping</span>
            <ChevronRight size={16} />
          </Link>
          <button
            onClick={downloadInvoice}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm transition-all hover:scale-[1.02]",
              isDark ? "border-white/15 text-white/70 hover:border-white/30" : "border-black/12 text-black/60 hover:border-[#4a6fa5] hover:text-[#4a6fa5]"
            )}
          >
            <Download size={15} />
            Download Invoice
          </button>
        </motion.div>

      </div>
    </div>
  );
}
