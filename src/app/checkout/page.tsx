"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import {
  CreditCard, Banknote, Smartphone, ChevronRight,
  Lock, ArrowLeft, CheckCircle, User, MapPin, Phone, Mail,
} from "lucide-react";

type PaymentMode = "cash" | "card" | "upi";

interface OrderDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const STEPS = ["Order Details", "Payment"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [theme, setTheme] = useState("light");
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);

  /* Step 1 state */
  const [details, setDetails] = useState<OrderDetails>({
    name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "",
  });

  /* Step 2 state */
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("upi");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("suman-agency-theme");
    setTheme(stored || "light");
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light")
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const isDark = theme === "dark";

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-5xl">🛒</p>
        <h2 className={cn("text-2xl font-bold", isDark ? "text-white" : "text-[#1a1d23]")}>Your cart is empty</h2>
        <button onClick={() => router.push("/products")} className="btn-primary mt-2"><span>Browse Products</span></button>
      </div>
    );
  }

  const isStep1Valid = details.name && details.email && details.phone && details.address && details.city && details.pincode;

  const handleConfirm = async () => {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1800));
    const orderId = `LUX-${Date.now().toString().slice(-6)}`;
    clearCart();
    router.push(`/order-status?id=${orderId}&method=${paymentMode}&amount=${totalPrice}`);
  };

  const inputCls = cn(
    "w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#4a6fa5] transition-colors",
    isDark ? "bg-white/6 border-white/10 text-white placeholder-white/30" : "bg-gray-50 border-black/10 text-[#1a1d23] placeholder-black/30"
  );
  const labelCls = cn("block text-xs font-semibold uppercase tracking-wider mb-1.5", isDark ? "text-white/50" : "text-black/40");

  const paymentModes: { id: PaymentMode; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: "upi", label: "UPI", icon: <Smartphone size={22} />, desc: "GPay, PhonePe, Paytm" },
    { id: "card", label: "Card", icon: <CreditCard size={22} />, desc: "Credit / Debit card" },
    { id: "cash", label: "Cash on Delivery", icon: <Banknote size={22} />, desc: "Pay when delivered" },
  ];

  return (
    <div className={cn("min-h-screen pt-24 pb-16 px-4 sm:px-6", isDark ? "bg-[#0d1017]" : "bg-[#f8fafc]")}>
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button onClick={() => step === 0 ? router.back() : setStep(0)}
          className={cn("flex items-center gap-2 text-sm mb-8 hover:text-[#4a6fa5] transition-colors", isDark ? "text-white/50" : "text-black/40")}>
          <ArrowLeft size={16} /> {step === 0 ? "Back to Cart" : "Back to Order Details"}
        </button>

        {/* Stepper */}
        <div className="flex items-center gap-0 mb-10 max-w-xs">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300",
                  i < step ? "bg-[#4a6fa5] border-[#4a6fa5] text-white"
                    : i === step ? "border-[#4a6fa5] text-[#4a6fa5] bg-transparent"
                    : isDark ? "border-white/20 text-white/30" : "border-black/15 text-black/30"
                )}>
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className={cn("text-xs mt-1.5 font-medium whitespace-nowrap", i === step ? "text-[#4a6fa5]" : isDark ? "text-white/40" : "text-black/40")}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("h-0.5 flex-1 mx-2 mb-5 rounded-full transition-all duration-300", i < step ? "bg-[#4a6fa5]" : isDark ? "bg-white/10" : "bg-black/10")} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Steps */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 0 ? (
                /* ── STEP 1: Order Details ── */
                <motion.div key="step1"
                  initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.28 }}
                  className={cn("rounded-2xl border p-6 space-y-5", isDark ? "bg-[#141820] border-white/8" : "bg-white border-black/6")}
                  style={{ boxShadow: "var(--shadow-luxe)" }}
                >
                  <h2 className={cn("font-bold text-lg flex items-center gap-2", isDark ? "text-white" : "text-[#1a1d23]")}>
                    <User size={18} className="text-[#4a6fa5]" /> Personal Information
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input className={inputCls} placeholder="John Doe" value={details.name}
                        onChange={(e) => setDetails({ ...details, name: e.target.value })} />
                    </div>
                    <div>
                      <label className={labelCls}>Email *</label>
                      <input className={inputCls} type="email" placeholder="john@example.com" value={details.email}
                        onChange={(e) => setDetails({ ...details, email: e.target.value })} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Phone Number *</label>
                      <input className={inputCls} type="tel" placeholder="+91 97155 90101" value={details.phone}
                        onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
                    </div>
                  </div>

                  <div className={cn("border-t pt-5", isDark ? "border-white/8" : "border-black/6")}>
                    <h3 className={cn("font-bold text-base flex items-center gap-2 mb-4", isDark ? "text-white" : "text-[#1a1d23]")}>
                      <MapPin size={16} className="text-[#4a6fa5]" /> Delivery Address
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className={labelCls}>Street Address *</label>
                        <input className={inputCls} placeholder="House No., Street, Area" value={details.address}
                          onChange={(e) => setDetails({ ...details, address: e.target.value })} />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div>
                          <label className={labelCls}>City *</label>
                          <input className={inputCls} placeholder="Tirunelveli" value={details.city}
                            onChange={(e) => setDetails({ ...details, city: e.target.value })} />
                        </div>
                        <div>
                          <label className={labelCls}>State</label>
                          <input className={inputCls} placeholder="Tamil Nadu" value={details.state}
                            onChange={(e) => setDetails({ ...details, state: e.target.value })} />
                        </div>
                        <div>
                          <label className={labelCls}>Pincode *</label>
                          <input className={inputCls} placeholder="627808" maxLength={6} value={details.pincode}
                            onChange={(e) => setDetails({ ...details, pincode: e.target.value.replace(/\D/g, "") })} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(1)}
                    disabled={!isStep1Valid}
                    className="w-full btn-primary justify-between disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Continue to Payment</span>
                    <ChevronRight size={16} />
                  </button>
                </motion.div>
              ) : (
                /* ── STEP 2: Payment ── */
                <motion.div key="step2"
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.28 }}
                  className="space-y-5"
                >
                  {/* Payment Mode Selector */}
                  <div className={cn("rounded-2xl border p-6", isDark ? "bg-[#141820] border-white/8" : "bg-white border-black/6")} style={{ boxShadow: "var(--shadow-luxe)" }}>
                    <h2 className={cn("font-bold text-lg mb-4", isDark ? "text-white" : "text-[#1a1d23]")}>Choose Payment Method</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {paymentModes.map((m) => (
                        <button key={m.id} onClick={() => setPaymentMode(m.id)}
                          className={cn(
                            "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 text-center",
                            paymentMode === m.id
                              ? "border-[#4a6fa5] bg-[#4a6fa5]/8 text-[#4a6fa5]"
                              : isDark ? "border-white/10 text-white/50 hover:border-white/30" : "border-black/8 text-black/50 hover:border-[#4a6fa5]/40"
                          )}>
                          {m.icon}
                          <span className="font-semibold text-sm">{m.label}</span>
                          <span className={cn("text-xs", paymentMode === m.id ? "text-[#4a6fa5]/70" : isDark ? "text-white/30" : "text-black/30")}>{m.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Details */}
                  <AnimatePresence mode="wait">
                    <motion.div key={paymentMode}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn("rounded-2xl border p-6", isDark ? "bg-[#141820] border-white/8" : "bg-white border-black/6")}
                      style={{ boxShadow: "var(--shadow-luxe)" }}
                    >
                      {paymentMode === "card" && (
                        <div className="space-y-4">
                          <h3 className={cn("font-bold text-base mb-2", isDark ? "text-white" : "text-[#1a1d23]")}>Card Details</h3>
                          <div>
                            <label className={labelCls}>Card Number</label>
                            <input className={inputCls} placeholder="1234 5678 9012 3456" maxLength={19} value={cardNumber}
                              onChange={(e) => { const v = e.target.value.replace(/\D/g, "").slice(0, 16); setCardNumber(v.replace(/(.{4})/g, "$1 ").trim()); }} />
                          </div>
                          <div>
                            <label className={labelCls}>Name on Card</label>
                            <input className={inputCls} placeholder="John Doe" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className={labelCls}>Expiry</label>
                              <input className={inputCls} placeholder="MM / YY" maxLength={7} value={expiry}
                                onChange={(e) => { const v = e.target.value.replace(/\D/g, "").slice(0, 4); setExpiry(v.length > 2 ? `${v.slice(0, 2)} / ${v.slice(2)}` : v); }} />
                            </div>
                            <div>
                              <label className={labelCls}>CVV</label>
                              <input className={inputCls} placeholder="•••" maxLength={3} type="password" value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))} />
                            </div>
                          </div>
                        </div>
                      )}
                      {paymentMode === "upi" && (
                        <div>
                          <h3 className={cn("font-bold text-base mb-4", isDark ? "text-white" : "text-[#1a1d23]")}>UPI Payment</h3>
                          <div className="flex gap-3 mb-4">
                            {["GPay", "PhonePe", "Paytm"].map((app) => (
                              <div key={app} className={cn("flex-1 py-3 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all hover:border-[#4a6fa5] hover:text-[#4a6fa5]", isDark ? "border-white/10 text-white/50" : "border-black/8 text-black/40")}>{app}</div>
                            ))}
                          </div>
                          <label className={labelCls}>Enter UPI ID</label>
                          <input className={inputCls} placeholder="yourname@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                        </div>
                      )}
                      {paymentMode === "cash" && (
                        <div className="text-center py-4">
                          <div className="w-14 h-14 rounded-full bg-[#4a6fa5]/10 flex items-center justify-center mx-auto mb-3">
                            <Banknote size={26} className="text-[#4a6fa5]" />
                          </div>
                          <h3 className={cn("font-bold text-base mb-2", isDark ? "text-white" : "text-[#1a1d23]")}>Cash on Delivery</h3>
                          <p className={cn("text-sm", isDark ? "text-white/50" : "text-black/40")}>Pay in cash when your order arrives. No prepayment needed.</p>
                          <div className={cn("mt-4 p-3 rounded-xl text-xs", isDark ? "bg-white/5 text-white/40" : "bg-blue-50 text-blue-700")}>
                            ₹50 COD handling fee may apply on orders below ₹999
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <button onClick={handleConfirm} disabled={placing}
                    className="w-full btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                    {placing ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Lock size={15} /> Confirm & Pay ₹{totalPrice.toLocaleString("en-IN")} <ChevronRight size={15} />
                      </span>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — Order Summary */}
          <div>
            <div className={cn("rounded-2xl border p-5 sticky top-28", isDark ? "bg-[#141820] border-white/8" : "bg-white border-black/6")} style={{ boxShadow: "var(--shadow-luxe)" }}>
              <h2 className={cn("font-bold text-base mb-4", isDark ? "text-white" : "text-[#1a1d23]")}>Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-xs font-medium line-clamp-1", isDark ? "text-white" : "text-[#1a1d23]")}>{item.product.name}</p>
                      <p className={cn("text-xs", isDark ? "text-white/40" : "text-black/40")}>Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-[#4a6fa5] flex-shrink-0">${(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>

              {/* Delivery address preview on step 2 */}
              {step === 1 && details.name && (
                <div className={cn("rounded-xl p-3 mb-4 text-xs space-y-0.5", isDark ? "bg-white/5" : "bg-blue-50")}>
                  <p className={cn("font-semibold flex items-center gap-1", isDark ? "text-white/80" : "text-[#1a1d23]")}><MapPin size={11} /> {details.name}</p>
                  <p className={isDark ? "text-white/40" : "text-black/50"}>{details.address}, {details.city} – {details.pincode}</p>
                  <p className={isDark ? "text-white/40" : "text-black/50"}><Phone size={10} className="inline mr-1" />{details.phone}</p>
                </div>
              )}

              <div className={cn("border-t pt-3 space-y-2 text-sm", isDark ? "border-white/10" : "border-black/6")}>
                <div className="flex justify-between">
                  <span className={isDark ? "text-white/50" : "text-black/40"}>Subtotal</span>
                  <span className={isDark ? "text-white" : "text-[#1a1d23]"}>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? "text-white/50" : "text-black/40"}>Delivery</span>
                  <span className="text-green-500 font-medium">Free</span>
                </div>
                <div className={cn("flex justify-between font-bold text-base pt-2 border-t", isDark ? "border-white/10 text-white" : "border-black/6 text-[#1a1d23]")}>
                  <span>Total</span>
                  <span className="text-[#4a6fa5]">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
