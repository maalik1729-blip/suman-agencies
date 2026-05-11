"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCcw, AlertCircle, XCircle, CheckCircle, Mail } from "lucide-react";

export default function CancellationRefundPage() {
  return (
    <main className="min-h-screen bg-[#faf8f4] dark:bg-[#0d0d0d] pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#0d9488] hover:text-[#0f766e] transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d9488]/10 text-[#0d9488] text-xs font-bold tracking-widest uppercase mb-4">
            <RefreshCcw size={14} />
            Policy
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#1a1a1a] dark:text-white">
            Cancellation & Refund
          </h1>
          <p className="mt-4 text-lg text-black/50 dark:text-white/50">
            Simple, Fair & Transparent
          </p>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#0d9488] to-[#0f766e]" />
        </div>

        {/* Content */}
        <div className="space-y-6 text-[#1a1a1a]/70 dark:text-white/60">

          <p className="text-base leading-relaxed">
            At <strong className="text-[#1a1a1a] dark:text-white">Suman Agency</strong>, we take pride in delivering
            premium furniture and electronics with care. While we strive to ensure every order reaches you
            perfectly, we understand that cancellations or issues may occasionally arise. This policy outlines
            how we handle cancellations, returns, and refunds.
          </p>

          <Section icon={<XCircle size={18} />} title="Order Cancellations">
            <ul>
              <li><strong>Cancellation Window:</strong> Orders may be cancelled within <strong>2 hours</strong> of purchase, provided they have not yet been packed or dispatched.</li>
              <li>Once an order is processed or handed over to the courier, cancellations are no longer possible.</li>
              <li>Custom-made or assembled furniture orders cannot be cancelled once production has begun.</li>
              <li>Customers must share their <strong>Order ID</strong> when requesting cancellation.</li>
            </ul>
          </Section>

          <Section icon={<RefreshCcw size={18} />} title="Returns & Replacements">
            <p>Returns are accepted only in the following cases:</p>
            <ul>
              <li>Products are damaged or tampered during delivery.</li>
              <li>The wrong product was delivered.</li>
              <li>There is a verified quality or manufacturing defect.</li>
            </ul>
            <p className="font-semibold text-[#0d9488] mt-3">Conditions:</p>
            <ul>
              <li>Return requests must be raised within <strong>48 hours</strong> of delivery.</li>
              <li>The product must be unused and in original packaging.</li>
              <li>Customers must share clear photos/videos of the issue for verification.</li>
            </ul>
          </Section>

          <Section icon={<AlertCircle size={18} />} title="Non-Returnable Items">
            <p>For quality assurance, we cannot accept returns for:</p>
            <ul>
              <li>Products that have been assembled, used, or installed.</li>
              <li>Products damaged due to improper handling after delivery.</li>
              <li>Items returned without prior authorization from our support team.</li>
              <li>Bulk/wholesale orders, unless a verified defect is confirmed.</li>
              <li>Custom-made or personalised furniture items.</li>
            </ul>
          </Section>

          <Section icon={<CheckCircle size={18} />} title="Refunds">
            <ul>
              <li>Once a claim is verified and approved, refunds are initiated within <strong>3–5 business days</strong>.</li>
              <li>Refunds are processed via the original payment method (UPI, card, bank transfer, etc.).</li>
              <li>Depending on the payment provider, refunds may take <strong>5–10 business days</strong> to reflect in your account.</li>
              <li>Customers may also choose store credit or product replacement instead of a refund.</li>
            </ul>
          </Section>

          <Section icon={<AlertCircle size={18} />} title="Exceptions">
            <p>Refunds and cancellations will not apply in cases where:</p>
            <ul>
              <li>Delivery is delayed due to courier or logistics issues beyond our control.</li>
              <li>Incorrect or incomplete delivery details were provided by the customer.</li>
              <li>Natural variations in wood grain, texture, or colour occur (as furniture is made from natural materials).</li>
              <li>Minor cosmetic differences from product images due to screen display variations.</li>
            </ul>
          </Section>

          <ContactBox />
        </div>
      </div>
    </main>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-black/5 dark:border-white/8 p-7"
      style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-[#0d9488]/10 flex items-center justify-center text-[#0d9488]">
          {icon}
        </div>
        <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-white">{title}</h2>
      </div>
      <div className="text-sm leading-relaxed space-y-2 text-black/60 dark:text-white/55 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-[#1a1a1a] dark:[&_strong]:text-white">
        {children}
      </div>
    </div>
  );
}

function ContactBox() {
  return (
    <div className="rounded-2xl p-7 text-white" style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}>
      <div className="flex items-center gap-3 mb-4">
        <Mail size={20} />
        <h2 className="text-lg font-bold">Need Help?</h2>
      </div>
      <p className="text-white/80 text-sm mb-4">For cancellation or refund support, please contact us:</p>
      <div className="space-y-1.5 text-sm text-white/90">
        <p><strong>Suman Agency (Suman Tech Automation)</strong></p>
        <p>👤 Prop. RAJASINGH</p>
        <p>📍 No.7/1-3, West Street, Chellathayarpuram, Tirunelveli – 627808, Tamil Nadu</p>
        <p>📞 +91 98765 43210</p>
        <p>📧 hello@sumanagency.com</p>
        <p>🏛️ GSTIN: 33DVIPR5548Q1ZN</p>
      </div>
    </div>
  );
}
