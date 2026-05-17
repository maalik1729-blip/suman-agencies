"use client";

import Link from "next/link";
import { ArrowLeft, Truck, Package, MapPin, Clock, AlertCircle, Mail, Phone } from "lucide-react";
import { site } from "@/data/site";

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-(--color-bg) pt-[calc(var(--header-height)+32px)] pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-(--color-text-muted) hover:text-(--color-text-strong) transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-(--color-border) bg-(--color-surface) text-(--color-brand-700) text-xs font-semibold uppercase tracking-[0.08em] mb-4">
            <Truck size={12} aria-hidden="true" />
            Policy
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold font-display tracking-tight text-(--color-text-strong)">
            Shipping Policy
          </h1>
          <p className="mt-3 text-base text-(--color-text)">
            Quality delivered with care, worldwide.
          </p>
          <p className="mt-2 text-xs text-(--color-text-muted)">Last Updated: May 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-5">
          <p className="text-sm text-(--color-text) leading-relaxed">
            At <strong className="text-(--color-text-strong)">{site.brand}</strong>, we are committed to ensuring
            that your premium furniture and electronics reach you in perfect condition. This Shipping Policy
            explains how we process orders, handle packaging, and manage deliveries.
          </p>

          <PolicySection icon={<Clock size={16} />} title="Order Processing Time">
            <ul>
              <li>Orders are processed within <strong>2–4 business days</strong> of payment confirmation.</li>
              <li>Orders placed on Sundays or public holidays will be processed on the next working day.</li>
              <li>Bulk/wholesale orders may require longer preparation time depending on quantity and product availability. Customers will be informed in advance.</li>
              <li>Furniture items with customisation requests may take 7–14 additional business days.</li>
            </ul>
          </PolicySection>

          <PolicySection icon={<MapPin size={16} />} title="Delivery Destinations &amp; Timelines">
            <p className="font-semibold text-(--color-brand-700)">Worldwide Delivery</p>
            <ul>
              <li><strong>Major Cities &amp; Urban Areas:</strong> 5–8 business days after dispatch</li>
              <li><strong>Standard International:</strong> 8–14 business days after dispatch</li>
              <li><strong>Remote or Island Regions:</strong> 14–21 business days after dispatch</li>
            </ul>
            <p className="mt-3 text-(--color-text-muted) text-xs">
              Note: We ship worldwide. Shipping costs and delivery times for wholesale orders depend on the destination country.
            </p>
          </PolicySection>

          <PolicySection icon={<Package size={16} />} title="Shipping Charges">
            <ul>
              <li><strong>Free delivery</strong> on eligible orders based on your region.</li>
              <li>Shipping costs will be displayed clearly at checkout based on location and weight.</li>
              <li>Large furniture items (beds, wardrobes, sofas) may require scheduled delivery — our team will coordinate a convenient time.</li>
            </ul>
          </PolicySection>

          <PolicySection icon={<Package size={16} />} title="Packaging &amp; Handling">
            <ul>
              <li>All products are packed in protective, tamper-proof packaging to prevent damage in transit.</li>
              <li>Furniture items are bubble-wrapped, foam-padded, and secured in sturdy cardboard or wooden crates.</li>
              <li>Electronics and accessories are packed in original manufacturer packaging with additional outer protection.</li>
            </ul>
          </PolicySection>

          <PolicySection icon={<Truck size={16} />} title="Tracking Your Order">
            <p>Once dispatched, you will receive:</p>
            <ul>
              <li>A tracking ID via SMS/email</li>
              <li>A contact from our delivery partner to schedule delivery</li>
            </ul>
            <p>Please allow 24–48 hours for tracking details to update after dispatch.</p>
          </PolicySection>

          <PolicySection icon={<AlertCircle size={16} />} title="Delays &amp; Exceptions">
            <p>While we strive for timely delivery, certain factors may cause delays, including:</p>
            <ul>
              <li>Courier or logistics partner disruptions</li>
              <li>Extreme weather conditions</li>
              <li>Regional holidays or strikes</li>
            </ul>
            <p>In such cases, our support team will provide updates and assistance promptly.</p>
          </PolicySection>

          <ContactCard title="Shipping queries?" />

          <p className="text-xs text-center text-(--color-text-muted)">
            © {new Date().getFullYear()} {site.brand}. All Rights Reserved.
          </p>
        </div>
      </div>
    </main>
  );
}

function PolicySection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-(--color-border) bg-(--color-surface) p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-(--color-brand-50) text-(--color-brand-700)">
          {icon}
        </span>
        <h2 className="text-base font-semibold text-(--color-text-strong)">{title}</h2>
      </div>
      <div className="text-sm leading-relaxed space-y-2 text-(--color-text) [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-(--color-text-strong)">
        {children}
      </div>
    </div>
  );
}

function ContactCard({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-(--color-brand-100) bg-(--color-brand-50) p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-(--color-brand-500) text-white">
          <Mail size={16} aria-hidden="true" />
        </span>
        <h2 className="text-base font-semibold text-(--color-brand-900)">{title}</h2>
      </div>
      <div className="space-y-1.5 text-sm text-(--color-brand-700)">
        <p className="font-semibold text-(--color-brand-900)">{site.brand}</p>
        <p>{site.proprietor}</p>
        <div className="flex items-start gap-1.5">
          <MapPin size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{site.contact.address.line1}, {site.contact.address.city} – {site.contact.address.pincode}, {site.contact.address.state}</span>
        </div>
        {site.contact.phones.map((p) => (
          <a key={p.e164} href={`tel:${p.e164}`} className="flex items-center gap-1.5 hover:text-(--color-brand-900)">
            <Phone size={13} aria-hidden="true" />
            {p.display}
          </a>
        ))}
        <a href={`mailto:${site.contact.primaryEmail}`} className="flex items-center gap-1.5 hover:text-(--color-brand-900)">
          <Mail size={13} aria-hidden="true" />
          {site.contact.primaryEmail}
        </a>
      </div>
    </div>
  );
}
