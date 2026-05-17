"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard, Banknote, Smartphone, ChevronRight,
  Lock, ArrowLeft, CheckCircle, User, MapPin, Phone,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/EmptyState";
import { site } from "@/data/site";
import { orderId as generateOrderId } from "@/lib/id";
import { calcCodFeeINR, saveOrder, type Order, type OrderPayment } from "@/lib/orders";

type PaymentMode = "cod" | "card" | "upi";

interface DetailsForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface DetailsErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

const STEPS = ["Order Details", "Payment"];

function validateDetails(d: DetailsForm): DetailsErrors {
  const errors: DetailsErrors = {};
  if (!d.name.trim()) errors.name = "Required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) errors.email = "Enter a valid email";
  if (!/^\+?[\d\s-]{10,15}$/.test(d.phone)) errors.phone = "Enter a valid 10-digit phone";
  if (!d.address.trim()) errors.address = "Required";
  if (!d.city.trim()) errors.city = "Required";
  if (!d.state.trim()) errors.state = "Required";
  if (!/^\d{6}$/.test(d.pincode)) errors.pincode = "Enter a 6-digit pincode";
  return errors;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);

  // Step 1
  const [details, setDetails] = useState<DetailsForm>({
    name: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
  });
  const [detailsTouched, setDetailsTouched] = useState<Record<keyof DetailsForm, boolean>>({
    name: false, email: false, phone: false, address: false, city: false, state: false, pincode: false,
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Step 2
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("upi");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiApp, setUpiApp] = useState<"gpay" | "phonepe" | "paytm" | "other">("gpay");
  const [paymentErr, setPaymentErr] = useState<string | null>(null);

  const detailErrors = validateDetails(details);
  const isStep1Valid = Object.keys(detailErrors).length === 0;

  // Audit C-3: COD fee actually added to totals.
  const codFee = paymentMode === "cod" ? calcCodFeeINR(totalPrice) : 0;
  const grandTotalINR = totalPrice + codFee;

  const showErr = (k: keyof DetailsForm) =>
    (submitAttempted || detailsTouched[k]) && detailErrors[k];

  // Empty cart guard
  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-xl mx-auto py-20 px-4">
          <EmptyState
            title="Your cart is empty"
            description="Add some products to your cart before checking out."
            primaryCta={
              <Link href="/products">
                <Button variant="primary" size="md">Browse products</Button>
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  function paymentIsValid(): string | null {
    if (paymentMode === "cod") return null;
    if (paymentMode === "card") {
      const digits = cardNumber.replace(/\s/g, "");
      if (digits.length < 13 || digits.length > 19) return "Enter a valid card number";
      if (!cardName.trim()) return "Enter the name on card";
      if (!/^\d{2}\s\/\s\d{2}$/.test(expiry)) return "Enter expiry as MM / YY";
      if (cvv.length !== 3) return "Enter a 3-digit CVV";
      return null;
    }
    if (paymentMode === "upi") {
      if (!/^[\w.\-]{3,}@[a-z]{3,}$/i.test(upiId)) return "Enter a valid UPI ID, e.g. yourname@upi";
      return null;
    }
    return null;
  }

  const handleConfirm = async () => {
    const err = paymentIsValid();
    if (err) {
      setPaymentErr(err);
      return;
    }
    setPaymentErr(null);
    setPlacing(true);
    // Simulated processing — in production replace with real gateway.
    await new Promise((r) => setTimeout(r, 800));

    const payment: OrderPayment =
      paymentMode === "upi"
        ? { method: "upi", upiId, app: upiApp }
        : paymentMode === "card"
        ? { method: "card", cardLast4: cardNumber.replace(/\s/g, "").slice(-4) }
        : { method: "cod" };

    const id = generateOrderId();
    const order: Order = {
      id,
      placedAt: new Date().toISOString(),
      status: "confirmed",
      items: items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        image: i.product.images[0],
        unitPriceINR: i.product.price,
        quantity: i.quantity,
        variant: i.color,
      })),
      address: {
        name: details.name,
        email: details.email,
        phone: details.phone,
        line: details.address,
        city: details.city,
        state: details.state,
        pincode: details.pincode,
      },
      payment,
      totals: {
        subtotalINR: totalPrice,
        shippingINR: 0,
        codFeeINR: codFee,
        totalINR: grandTotalINR,
      },
      currency,
    };

    // Persist BEFORE navigation. clearCart runs on the order-status page once it has loaded.
    saveOrder(order);
    router.push(`/order-status?id=${id}`);
  };

  const paymentModes: { id: PaymentMode; label: string; icon: React.ReactNode; desc: string }[] = useMemo(
    () => [
      { id: "upi", label: "UPI", icon: <Smartphone size={20} />, desc: "GPay, PhonePe, Paytm" },
      { id: "card", label: "Card", icon: <CreditCard size={20} />, desc: "Credit / Debit card" },
      {
        id: "cod",
        label: "Cash on Delivery",
        icon: <Banknote size={20} />,
        desc: totalPrice < site.cod.feeThresholdINR
          ? `+${formatPrice(site.cod.feeINR)} handling fee`
          : "No extra fee",
      },
    ],
    [totalPrice, formatPrice]
  );

  return (
    <div className="min-h-screen bg-(--color-bg) pt-[calc(var(--header-height)+24px)] pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => (step === 0 ? router.back() : setStep(0))}
          className="inline-flex items-center gap-1.5 text-sm text-(--color-text-muted) hover:text-(--color-text-strong) mb-8 transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          {step === 0 ? "Back to cart" : "Back to order details"}
        </button>

        {/* Stepper */}
        <div
          className="flex items-center gap-0 mb-10 max-w-sm"
          aria-label={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step]}`}
        >
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full inline-flex items-center justify-center text-sm font-semibold border transition-colors",
                    i < step
                      ? "bg-(--color-brand-500) border-(--color-brand-500) text-white"
                      : i === step
                      ? "border-(--color-brand-500) text-(--color-brand-500) bg-(--color-brand-50)"
                      : "border-(--color-border) text-(--color-text-muted)"
                  )}
                  aria-current={i === step ? "step" : undefined}
                >
                  {i < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span
                  className={cn(
                    "text-xs whitespace-nowrap",
                    i === step ? "text-(--color-text-strong) font-medium" : "text-(--color-text-muted)"
                  )}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "h-px flex-1 mx-2 mb-5",
                    i < step ? "bg-(--color-brand-500)" : "bg-(--color-border)"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form column */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 0 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="rounded-lg border border-(--color-border) bg-(--color-surface) p-6 space-y-6"
                >
                  <h2 className="text-base font-semibold text-(--color-text-strong) flex items-center gap-2">
                    <User size={16} className="text-(--color-brand-500)" aria-hidden="true" />
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full name"
                      required
                      placeholder="John Doe"
                      value={details.name}
                      onChange={(e) => setDetails({ ...details, name: e.target.value })}
                      onBlur={() => setDetailsTouched((t) => ({ ...t, name: true }))}
                      error={showErr("name") ? detailErrors.name : undefined}
                      autoComplete="name"
                    />
                    <Input
                      label="Email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={details.email}
                      onChange={(e) => setDetails({ ...details, email: e.target.value })}
                      onBlur={() => setDetailsTouched((t) => ({ ...t, email: true }))}
                      error={showErr("email") ? detailErrors.email : undefined}
                      autoComplete="email"
                    />
                    <div className="sm:col-span-2">
                      <Input
                        label="Phone number"
                        type="tel"
                        required
                        placeholder="+91 97155 90101"
                        value={details.phone}
                        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                        onBlur={() => setDetailsTouched((t) => ({ ...t, phone: true }))}
                        error={showErr("phone") ? detailErrors.phone : undefined}
                        helper="We'll text you a delivery confirmation."
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className="border-t border-(--color-border) pt-5 space-y-4">
                    <h3 className="text-sm font-semibold text-(--color-text-strong) flex items-center gap-2">
                      <MapPin size={14} className="text-(--color-brand-500)" aria-hidden="true" />
                      Delivery address
                    </h3>

                    <Input
                      label="Street address"
                      required
                      placeholder="House no., street, area"
                      value={details.address}
                      onChange={(e) => setDetails({ ...details, address: e.target.value })}
                      onBlur={() => setDetailsTouched((t) => ({ ...t, address: true }))}
                      error={showErr("address") ? detailErrors.address : undefined}
                      autoComplete="street-address"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Input
                        label="City"
                        required
                        placeholder="Tirunelveli"
                        value={details.city}
                        onChange={(e) => setDetails({ ...details, city: e.target.value })}
                        onBlur={() => setDetailsTouched((t) => ({ ...t, city: true }))}
                        error={showErr("city") ? detailErrors.city : undefined}
                        autoComplete="address-level2"
                      />
                      <Input
                        label="State"
                        required
                        placeholder="State / Region"
                        value={details.state}
                        onChange={(e) => setDetails({ ...details, state: e.target.value })}
                        onBlur={() => setDetailsTouched((t) => ({ ...t, state: true }))}
                        error={showErr("state") ? detailErrors.state : undefined}
                        autoComplete="address-level1"
                      />
                      <Input
                        label="Pincode"
                        required
                        placeholder="627808"
                        inputMode="numeric"
                        maxLength={6}
                        value={details.pincode}
                        onChange={(e) =>
                          setDetails({ ...details, pincode: e.target.value.replace(/\D/g, "") })
                        }
                        onBlur={() => setDetailsTouched((t) => ({ ...t, pincode: true }))}
                        error={showErr("pincode") ? detailErrors.pincode : undefined}
                        autoComplete="postal-code"
                      />
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    rightIcon={<ChevronRight size={16} />}
                    onClick={() => {
                      setSubmitAttempted(true);
                      if (isStep1Valid) setStep(1);
                    }}
                  >
                    Continue to payment · {formatPrice(grandTotalINR)}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-5"
                >
                  {/* Payment selector */}
                  <fieldset className="rounded-lg border border-(--color-border) bg-(--color-surface) p-6">
                    <legend className="text-base font-semibold text-(--color-text-strong) px-1">
                      Choose payment method
                    </legend>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {paymentModes.map((m) => {
                        const active = paymentMode === m.id;
                        return (
                          <label
                            key={m.id}
                            className={cn(
                              "flex flex-col gap-1.5 p-4 rounded-md border cursor-pointer transition-colors",
                              active
                                ? "border-(--color-brand-500) bg-(--color-brand-50)"
                                : "border-(--color-border) bg-(--color-bg) hover:border-(--color-border-strong)"
                            )}
                          >
                            <input
                              type="radio"
                              name="payment"
                              value={m.id}
                              checked={active}
                              onChange={() => {
                                setPaymentMode(m.id);
                                setPaymentErr(null);
                              }}
                              className="sr-only"
                            />
                            <span className={cn("inline-flex items-center gap-2 text-sm font-medium", active ? "text-(--color-brand-700)" : "text-(--color-text-strong)")}>
                              {m.icon}
                              {m.label}
                            </span>
                            <span className={cn("text-xs", active ? "text-(--color-brand-700)" : "text-(--color-text-muted)")}>
                              {m.desc}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* Conditional payment details */}
                  <div className="rounded-lg border border-(--color-border) bg-(--color-surface) p-6">
                    {paymentMode === "card" && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-(--color-text-strong)">Card details</h3>
                        <Input
                          label="Card number"
                          placeholder="1234 5678 9012 3456"
                          inputMode="numeric"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                            setCardNumber(v.replace(/(.{4})/g, "$1 ").trim());
                          }}
                          autoComplete="cc-number"
                        />
                        <Input
                          label="Name on card"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          autoComplete="cc-name"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Expiry"
                            placeholder="MM / YY"
                            inputMode="numeric"
                            maxLength={7}
                            value={expiry}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                              setExpiry(v.length > 2 ? `${v.slice(0, 2)} / ${v.slice(2)}` : v);
                            }}
                            autoComplete="cc-exp"
                          />
                          <Input
                            label="CVV"
                            placeholder="•••"
                            type="password"
                            inputMode="numeric"
                            maxLength={3}
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                            autoComplete="cc-csc"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMode === "upi" && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-(--color-text-strong)">UPI payment</h3>
                        <fieldset>
                          <legend className="sr-only">Choose UPI app</legend>
                          <div className="grid grid-cols-3 gap-2">
                            {(["gpay", "phonepe", "paytm"] as const).map((app) => {
                              const active = upiApp === app;
                              return (
                                <label
                                  key={app}
                                  className={cn(
                                    "py-2.5 text-center rounded-md border text-xs font-semibold uppercase tracking-[0.06em] cursor-pointer transition-colors",
                                    active
                                      ? "border-(--color-brand-500) bg-(--color-brand-50) text-(--color-brand-700)"
                                      : "border-(--color-border) bg-(--color-bg) text-(--color-text) hover:border-(--color-border-strong)"
                                  )}
                                >
                                  <input
                                    type="radio"
                                    name="upi-app"
                                    value={app}
                                    checked={active}
                                    onChange={() => setUpiApp(app)}
                                    className="sr-only"
                                  />
                                  {app === "gpay" ? "GPay" : app === "phonepe" ? "PhonePe" : "Paytm"}
                                </label>
                              );
                            })}
                          </div>
                        </fieldset>
                        <Input
                          label="UPI ID"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          helper="Format: name@bank"
                        />
                      </div>
                    )}

                    {paymentMode === "cod" && (
                      <div className="text-sm text-(--color-text) space-y-3">
                        <h3 className="text-base font-semibold text-(--color-text-strong)">Cash on Delivery</h3>
                        <p>Pay in cash when your order arrives. No prepayment needed.</p>
                        {codFee > 0 && (
                          <div className="px-3 py-2 rounded-md bg-(--color-warning-50) text-(--color-warning-700) text-xs">
                            COD handling fee of {formatPrice(site.cod.feeINR)} applies on orders below {formatPrice(site.cod.feeThresholdINR)}.
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {paymentErr && (
                    <div role="alert" className="px-4 py-3 rounded-md bg-(--color-danger-50) text-(--color-danger-700) text-sm">
                      {paymentErr}
                    </div>
                  )}

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={placing}
                    onClick={handleConfirm}
                    leftIcon={!placing && <Lock size={15} />}
                  >
                    Confirm &amp; Pay · {formatPrice(grandTotalINR)}
                  </Button>

                  <p className="text-xs text-(--color-text-muted) text-center">
                    By placing this order, you agree to our{" "}
                    <Link href="/terms-conditions" className="underline">Terms</Link> and{" "}
                    <Link href="/cancellation-refund" className="underline">Refund Policy</Link>.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <aside>
            <div className="rounded-lg border border-(--color-border) bg-(--color-surface) p-5 sticky top-[calc(var(--header-height)+16px)]">
              <h2 className="text-base font-semibold text-(--color-text-strong) mb-4">Order Summary</h2>
              <ul className="space-y-3 mb-4">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-(--color-surface-2) shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-(--color-text-strong) line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-(--color-text-muted)">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold tabular text-(--color-text-strong) shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              {step === 1 && details.name && (
                <div className="rounded-md bg-(--color-bg) border border-(--color-border) p-3 mb-4 text-xs space-y-1">
                  <p className="font-semibold flex items-center gap-1 text-(--color-text-strong)">
                    <MapPin size={11} aria-hidden="true" /> {details.name}
                  </p>
                  <p className="text-(--color-text-muted)">
                    {details.address}, {details.city} – {details.pincode}
                  </p>
                  <p className="text-(--color-text-muted)">
                    <Phone size={10} className="inline mr-1" aria-hidden="true" />
                    {details.phone}
                  </p>
                </div>
              )}

              <div className="border-t border-(--color-border) pt-3 space-y-2 text-sm tabular">
                <div className="flex justify-between text-(--color-text)">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-(--color-text)">
                  <span>Delivery</span>
                  <span className="text-(--color-success-700) font-medium">Free</span>
                </div>
                {codFee > 0 && (
                  <div className="flex justify-between text-(--color-warning-700)">
                    <span>COD handling fee</span>
                    <span>{formatPrice(codFee)}</span>
                  </div>
                )}
                <div className="flex justify-between text-(--color-text-muted) text-xs">
                  <span>GST</span>
                  <span>Inclusive</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t border-(--color-border) text-(--color-text-strong)">
                  <span>Total</span>
                  <span>{formatPrice(grandTotalINR)}</span>
                </div>
              </div>

              <p className="mt-4 text-[11px] text-(--color-text-muted) flex items-center gap-1.5">
                <Lock size={11} aria-hidden="true" /> GSTIN <span className="font-mono">{site.gstin}</span>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
