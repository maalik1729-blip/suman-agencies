"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    details: "+91 97155 90101",
    sub: "Mon–Sat, 9 AM–7 PM",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: "hello@sumanagency.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Our Address",
    details: "No.7/1-3, West Street",
    sub: "Chellathayarpuram, Tirunelveli – 627808",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Mon–Sat: 9 AM–7 PM",
    sub: "Sunday: Closed",
  },
];


export default function ContactPage() {
  const searchParams = useSearchParams();
  const isBulk = searchParams.get("type") === "bulk";
  const [theme, setTheme] = useState("light");
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: isBulk ? "Bulk Enquiry" : "",
    message: isBulk ? "I would like to inquire about bulk pricing for..." : "",
    enquiryType: isBulk ? "bulk" : "general",
  });

  useEffect(() => {
    const stored = localStorage.getItem("suman-agency-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(stored || (prefersDark ? "dark" : "light"));

    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass = cn(
    "w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none focus:border-[#4a6fa5] transition-colors",
    isDark ? "bg-white/5 border-white/10 text-white placeholder-white/30" : "bg-white border-black/10 text-[#1a1a1a] placeholder-black/30"
  );

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: isDark
              ? "radial-gradient(ellipse at 70% 30%, rgba(74, 111, 165,0.08) 0%, transparent 60%)"
              : "radial-gradient(ellipse at 70% 30%, rgba(74, 111, 165,0.15) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            className="inline-block text-xs font-semibold tracking-widest uppercase text-[#4a6fa5] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Get In Touch
          </motion.span>
          <motion.h1
            className={cn("text-5xl sm:text-7xl font-bold font-serif", isDark ? "text-white" : "text-[#1a1a1a]")}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {isBulk ? "Bulk Enquiries" : "Let's Talk"}
          </motion.h1>
          <motion.p
            className={cn("mt-5 text-lg max-w-xl mx-auto", isDark ? "text-white/60" : "text-black/50")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isBulk
              ? "Get exclusive pricing and tailored packages for your commercial or bulk requirements."
              : "Have a question, need design advice, or want to discuss a special order? We'd love to hear from you."}
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map(({ icon: Icon, title, details, sub }, i) => (
            <motion.div
              key={title}
              className={cn("p-6 rounded-2xl border flex flex-col gap-4", isDark ? "bg-[#1a1a1a] border-white/8" : "bg-white border-black/5")}
              style={{ boxShadow: "var(--shadow-luxe)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-11 h-11 rounded-xl bg-[#4a6fa5]/10 flex items-center justify-center">
                <Icon size={22} className="text-[#4a6fa5]" />
              </div>
              <div>
                <p className={cn("font-semibold text-sm mb-1", isDark ? "text-white" : "text-[#1a1a1a]")}>{title}</p>
                <p className={cn("text-sm font-medium", isDark ? "text-white/80" : "text-[#1a1a1a]/80")}>{details}</p>
                <p className={cn("text-xs mt-0.5", isDark ? "text-white/40" : "text-black/40")}>{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={cn("p-8 rounded-3xl border", isDark ? "bg-[#1a1a1a] border-white/8" : "bg-white border-black/5")} style={{ boxShadow: "var(--shadow-luxe-lg)" }}>
              <h2 className={cn("text-2xl font-bold font-serif mb-2", isDark ? "text-white" : "text-[#1a1a1a]")}>
                {isBulk ? "Bulk Order Request" : "Send Us a Message"}
              </h2>
              <p className={cn("text-sm mb-8", isDark ? "text-white/50" : "text-black/40")}>
                Fill in the form below and our team will get back to you within 24 hours.
              </p>

              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className={cn("text-xl font-bold", isDark ? "text-white" : "text-[#1a1a1a]")}>Message Sent!</h3>
                  <p className={cn("text-sm", isDark ? "text-white/50" : "text-black/40")}>
                    Thank you for reaching out. We'll respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Enquiry Type */}
                  <div>
                    <label htmlFor="enquiryType" className={cn("block text-sm font-medium mb-2", isDark ? "text-white/80" : "text-[#1a1a1a]/80")}>
                      Enquiry Type
                    </label>
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      value={form.enquiryType}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="general">General Enquiry</option>
                      <option value="bulk">Bulk / Commercial Order</option>
                      <option value="support">Product Support</option>
                      <option value="design">Design Consultation</option>
                      <option value="returns">Returns & Warranty</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className={cn("block text-sm font-medium mb-2", isDark ? "text-white/80" : "text-[#1a1a1a]/80")}>
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClass}
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={cn("block text-sm font-medium mb-2", isDark ? "text-white/80" : "text-[#1a1a1a]/80")}>
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={inputClass}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className={cn("block text-sm font-medium mb-2", isDark ? "text-white/80" : "text-[#1a1a1a]/80")}>
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 97155 90101"
                        className={inputClass}
                        autoComplete="tel"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className={cn("block text-sm font-medium mb-2", isDark ? "text-white/80" : "text-[#1a1a1a]/80")}>
                        Subject *
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={cn("block text-sm font-medium mb-2", isDark ? "text-white/80" : "text-[#1a1a1a]/80")}>
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your requirements..."
                      className={cn(inputClass, "resize-none")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center gap-2 group"
                    style={{ background: "linear-gradient(135deg, #4a6fa5, #2d4f7c)", color: "white" }}
                  >
                    <span>Send Message</span>
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
