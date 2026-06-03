"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Field";
import { site } from "@/data/site";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  enquiryType: "general" | "bulk" | "support" | "design" | "returns";
}

interface ContactErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(f: ContactForm): ContactErrors {
  const e: ContactErrors = {};
  if (!f.name.trim()) e.name = "Required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email";
  if (!f.subject.trim()) e.subject = "Required";
  if (f.message.trim().length < 10) e.message = "At least 10 characters";
  return e;
}

function ContactPageInner() {
  const searchParams = useSearchParams();
  const isBulk = searchParams.get("type") === "bulk";

  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: isBulk ? "Bulk enquiry" : "",
    message: isBulk ? "I would like to inquire about bulk pricing for…" : "",
    enquiryType: isBulk ? "bulk" : "general",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const showErr = (k: keyof ContactErrors) =>
    (submitAttempted || touched[k]) ? errors[k] : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!isValid) return;
    setSubmitting(true);
    // No backend yet — simulate, then show confirmation. Replace with real API.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubmitted(true);
  };

  const contactCards = [
    {
      icon: Phone,
      title: "Call us",
      details: site.contact.phones.map((p) => p.display).join(" · "),
      sub: "Mon–Sat, 9 AM–7 PM",
      href: `tel:${site.contact.phones[0].e164}`,
    },
    {
      icon: Mail,
      title: "Email us",
      details: site.contact.primaryEmail,
      sub: "Replies within 24 hours",
      href: `mailto:${site.contact.primaryEmail}`,
    },
    {
      icon: MapPin,
      title: "Showroom",
      details: site.contact.address.line1,
      sub: `${site.contact.address.city} – ${site.contact.address.pincode}`,
    },
    {
      icon: Clock,
      title: "Open hours",
      details: "Mon–Sat: 9 AM–7 PM",
      sub: "Sunday: closed",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-(--color-bg) pt-[calc(var(--header-height)+32px)] pb-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-semibold uppercase tracking-[0.08em] text-(--color-text-muted)"
          >
            Get in touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-2 font-display font-semibold text-3xl sm:text-4xl tracking-tight text-(--color-text-strong)"
          >
            {isBulk ? "Bulk &amp; commercial enquiries" : "Let's talk"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-sm sm:text-base text-(--color-text) max-w-xl mx-auto"
          >
            {isBulk
              ? "Tell us what you need. We'll come back with pricing tailored to your project."
              : "Questions, design advice, or a special order — we're here for it."}
          </motion.p>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-(--color-bg) px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactCards.map(({ icon: Icon, title, details, sub, href }) => {
            const inner = (
              <>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-(--color-brand-50) text-(--color-brand-700)">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-(--color-text-strong)">{title}</p>
                  <p className="mt-1 text-sm text-(--color-text) wrap-break-word">{details}</p>
                  <p className="mt-0.5 text-xs text-(--color-text-muted)">{sub}</p>
                </div>
              </>
            );
            const className =
              "block p-5 rounded-lg border border-(--color-border) bg-(--color-surface) hover:border-(--color-border-strong) transition-colors";
            return href ? (
              <a key={title} href={href} className={className}>
                {inner}
              </a>
            ) : (
              <div key={title} className={className}>
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* Form */}
      <section className="bg-(--color-bg) px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-lg border border-(--color-border) bg-(--color-surface) p-6 sm:p-8">
            <h2 className="font-display font-semibold text-2xl tracking-tight text-(--color-text-strong)">
              {isBulk ? "Bulk order request" : "Send us a message"}
            </h2>
            <p className="mt-1 text-sm text-(--color-text-muted)">
              We'll respond within 24 hours.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex flex-col items-center text-center gap-3 py-10"
                role="status"
              >
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-(--color-success-50) text-(--color-success-500)">
                  <CheckCircle size={28} aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-(--color-text-strong)">
                  Message sent
                </h3>
                <p className="text-sm text-(--color-text-muted) max-w-sm">
                  Thank you, {form.name.split(" ")[0] || "we"}. We'll get back to {form.email} shortly.
                </p>
              </motion.div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="mt-6 space-y-5">
                <Select
                  label="Enquiry type"
                  value={form.enquiryType}
                  onChange={(e) =>
                    setForm({ ...form, enquiryType: e.target.value as ContactForm["enquiryType"] })
                  }
                  options={[
                    { value: "general", label: "General enquiry" },
                    { value: "bulk", label: "Bulk / commercial order" },
                    { value: "support", label: "Product support" },
                    { value: "design", label: "Design consultation" },
                    { value: "returns", label: "Returns & warranty" },
                  ]}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Full name"
                    required
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    error={showErr("name")}
                    autoComplete="name"
                  />
                  <Input
                    label="Email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    error={showErr("email")}
                    autoComplete="email"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="+91 97155 90101"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    autoComplete="tel"
                    helper="Optional"
                  />
                  <Input
                    label="Subject"
                    required
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    onBlur={() => setTouched((t) => ({ ...t, subject: true }))}
                    error={showErr("subject")}
                  />
                </div>

                <Textarea
                  label="Message"
                  required
                  rows={5}
                  placeholder="Tell us about your requirements…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                  error={showErr("message")}
                  helper={`${form.message.trim().length} characters · minimum 10`}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={submitting}
                  rightIcon={!submitting && <Send size={15} />}
                >
                  Send message
                </Button>

                <p className="text-xs text-(--color-text-muted)">
                  Or call us directly at{" "}
                  <a
                    href={`tel:${site.contact.phones[0].e164}`}
                    className="text-(--color-brand-500) hover:text-(--color-brand-700) font-medium"
                  >
                    {site.contact.phones[0].display}
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageInner />
    </Suspense>
  );
}
