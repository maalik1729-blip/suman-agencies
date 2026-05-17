"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCcw, AlertCircle, XCircle, CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/data/site";

export default function CancellationRefundPage() {
  return (
    <main className="min-h-screen bg-() pt-[calc(var(--header-height)+32px)] pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-() hover:text-() transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-() bg-() text-() text-xs font-semibold uppercase tracking-[0.08em] mb-4">
            <RefreshCcw size={12} aria-hidden="true" />
            Policy
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold font-display tracking-tight text-()">
            Cancellation &amp; Refund
          </h1>
          <p className="mt-3 text-base text-()">
            Simple, fair &amp; transparent — just as it should be.
          </p>
          <p className="mt-2 text-xs text-()">Last Updated: May 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-5">
          <p className="text-sm text-() leading-relaxed">
            At <strong className="text-()">{site.brand}</strong>, we take pride in delivering
            premium furniture and electronics with care. While we strive to ensure every order reaches you
            perfectly, we understand that cancellations or issues may occasionally arise. This policy outlines
            how we handle cancellations, returns, and refunds.
          </p>

          <PolicySection icon={<XCircle size={16} />} title="Order Cancellations">
            <ul>
              <li><strong>Cancellation Window:</strong> Orders may be cancelled within <strong>2 hours</strong> of purchase, provided they have not yet been packed or dispatched.</li>
              <li>Once an order is processed or handed over to the courier, cancellations are no longer possible.</li>
              <li>Custom-made or assembled furniture orders cannot be cancelled once production has begun.</li>
              <li>To cancel, contact us with your <strong>Order ID</strong> via phone or email.</li>
            </ul>
          </PolicySection>

          <PolicySection icon={<RefreshCcw size={16} />} title="Returns &amp; Replacements">
            <p>Returns are accepted within <strong>30 days</strong> of delivery in the following cases:</p>
            <ul>
              <li>Products are damaged or tampered during delivery.</li>
              <li>The wrong product was delivered.</li>
              <li>There is a verified quality or manufacturing defect.</li>
            </ul>
            <p className="font-semibold text-() mt-2">Conditions:</p>
            <ul>
              <li>Return requests must be raised within <strong>48 hours</strong> of delivery for damage claims.</li>
              <li>The product must be unused and in original packaging.</li>
              <li>Customers must share clear photos/videos of the issue for verification.</li>
            </ul>
          </PolicySection>

          <PolicySection icon={<AlertCircle size={16} />} title="Non-Returnable Items">
            <p>For quality assurance, we cannot accept returns for:</p>
            <ul>
              <li>Products that have been assembled, used, or installed.</li>
              <li>Products damaged due to improper handling after delivery.</li>
              <li>Items returned without prior authorization from our support team.</li>
              <li>Bulk/wholesale orders, unless a verified defect is confirmed.</li>
              <li>Custom-made or personalised furniture items.</li>
            </ul>
          </PolicySection>

          <PolicySection icon={<CheckCircle size={16} />} title="Refunds">
            <ul>
              <li>Once a claim is verified and approved, refunds are initiated within <strong>3–5 business days</strong>.</li>
              <li>Refunds are processed via the original payment method (UPI, card, or bank transfer).</li>
              <li>Depending on the payment provider, refunds may take <strong>5–10 business days</strong> to reflect in your account.</li>
              <li>Customers may also choose store credit or product replacement instead of a refund.</li>
            </ul>
          </PolicySection>

          <PolicySection icon={<AlertCircle size={16} />} title="Exceptions">
            <p>Refunds and cancellations will not apply in cases where:</p>
            <ul>
              <li>Delivery is delayed due to courier or logistics issues beyond our control.</li>
              <li>Incorrect or incomplete delivery details were provided by the customer.</li>
              <li>Natural variations in wood grain, texture, or colour occur (as furniture is made from natural materials).</li>
              <li>Minor cosmetic differences from product images due to screen display variations.</li>
            </ul>
          </PolicySection>

          <ContactCard title="Need help with a return or refund?" />

          <p className="text-xs text-center text-()">
            © {new Date().getFullYear()} {site.brand}. All Rights Reserved.
          </p>
        </div>
      </div>
    </main>
  );
}

function PolicySection({
  icon, title, children,
}: {
  icon: React.ReactNode; title: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-() bg-() p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-() text-()">
          {icon}
        </span>
        <h2 className="text-base font-semibold text-()">{title}</h2>
      </div>
      <div className="text-sm leading-relaxed space-y-2 text-() [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-()">
        {children}
      </div>
    </div>
  );
}

function ContactCard({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-() bg-() p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-() text-white">
          <Mail size={16} aria-hidden="true" />
        </span>
        <h2 className="text-base font-semibold text-()">{title}</h2>
      </div>
      <div className="space-y-1.5 text-sm text-()">
        <p className="font-semibold text-()">{site.brand}</p>
        <p>{site.proprietor}</p>
        <div className="flex items-start gap-1.5">
          <MapPin size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{site.contact.address.line1}, {site.contact.address.city} – {site.contact.address.pincode}, {site.contact.address.state}</span>
        </div>
        {site.contact.phones.map((p) => (
          <a key={p.e164} href={`tel:${p.e164}`} className="flex items-center gap-1.5 hover:text-()">
            <Phone size={13} aria-hidden="true" />
            {p.display}
          </a>
        ))}
        <a href={`mailto:${site.contact.primaryEmail}`} className="flex items-center gap-1.5 hover:text-()">
          <Mail size={13} aria-hidden="true" />
          {site.contact.primaryEmail}
        </a>
        <p className="text-xs pt-1">GSTIN: <span className="font-mono">{site.gstin}</span></p>
      </div>
    </div>
  );
}
