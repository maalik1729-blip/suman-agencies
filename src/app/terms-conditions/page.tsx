"use client";

import Link from "next/link";
import { ArrowLeft, FileText, ShoppingCart, Package, Shield, Scale, Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/data/site";

export default function TermsConditionsPage() {
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
            <FileText size={12} aria-hidden="true" />
            Legal
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold font-display tracking-tight text-(--color-text-strong)">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-base text-(--color-text)">
            Please read these terms carefully before using our services.
          </p>
          <p className="mt-2 text-xs text-(--color-text-muted)">Last Updated: May 2026</p>
        </div>

        <div className="space-y-5">
          <p className="text-sm text-(--color-text) leading-relaxed">
            Welcome to <strong className="text-(--color-text-strong)">{site.brand}</strong>. By accessing our
            website, making a purchase, or engaging with our services, you agree to comply with and be bound
            by the following Terms &amp; Conditions. These terms govern all orders, sales, and interactions with
            {site.brand}. If you do not agree with these terms, we request you to discontinue using our services.
          </p>

          <NumberedSection number="1" icon={<FileText size={16} />} title="General Use of Website &amp; Services">
            <ul>
              <li>By shopping with us, you confirm that you are at least <strong>18 years old</strong>, or using our services under the supervision of a parent/guardian.</li>
              <li>You agree to provide accurate and complete details when placing orders.</li>
              <li>Any misuse, fraudulent activity, or violation of these terms may result in suspension of service.</li>
            </ul>
          </NumberedSection>

          <NumberedSection number="2" icon={<Package size={16} />} title="Products &amp; Pricing">
            <ul>
              <li>We specialise in premium furniture and electronics for homes and offices.</li>
              <li>All product descriptions are provided as accurately as possible. Minor variations in colour, texture, or wood grain may occur as products use natural materials.</li>
              <li>All prices are listed in your selected currency, inclusive of applicable taxes, unless otherwise stated.</li>
              <li>We reserve the right to correct any errors in product listings or pricing, and may cancel affected orders with full refunds.</li>
            </ul>
          </NumberedSection>

          <NumberedSection number="3" icon={<ShoppingCart size={16} />} title="Orders &amp; Payments">
            <ul>
              <li>Orders are confirmed only after successful payment or, for COD, at delivery.</li>
              <li>We accept UPI, debit/credit cards, and Cash on Delivery.</li>
              <li>{site.brand} does not store your payment card details.</li>
              <li>A COD handling fee of ₹{site.cod.feeINR} applies on orders below ₹{site.cod.feeThresholdINR}.</li>
              <li>In the event of duplicate charges or transaction errors, customers should contact our support team immediately.</li>
            </ul>
          </NumberedSection>

          <NumberedSection number="4" icon={<Package size={16} />} title="Shipping &amp; Delivery">
            <ul>
              <li>Free standard delivery is available on eligible orders worldwide.</li>
              <li>Delivery timelines are 5–21 business days depending on your destination country and region.</li>
              <li>Tracking details are provided once the order is dispatched.</li>
              <li>We are not liable for courier delays, force majeure events, or customer unavailability during delivery.</li>
            </ul>
          </NumberedSection>

          <NumberedSection number="5" icon={<Shield size={16} />} title="Cancellations &amp; Returns">
            <ul>
              <li>Orders may be cancelled within <strong>2 hours</strong> of purchase, provided they have not been packed or shipped.</li>
              <li>Custom/assembled furniture orders cannot be cancelled once production has begun.</li>
              <li>Returns are accepted within 30 days for damaged, wrong, or defective items.</li>
              <li>For details, please refer to our <Link href="/cancellation-refund" className="text-(--color-brand-500) hover:text-(--color-brand-700) underline underline-offset-2">Cancellation &amp; Refund Policy</Link>.</li>
            </ul>
          </NumberedSection>

          <NumberedSection number="6" icon={<FileText size={16} />} title="Customer Responsibilities">
            <p>By engaging with us, you agree not to:</p>
            <ul>
              <li>Provide false or incomplete order/delivery details</li>
              <li>Resell our products without prior written approval</li>
              <li>Misuse our brand name, content, or product images</li>
              <li>Raise fraudulent claims or chargebacks</li>
            </ul>
          </NumberedSection>

          <NumberedSection number="7" icon={<Shield size={16} />} title="Intellectual Property">
            <p>
              All product images, content, designs, and branding are the intellectual property of {site.brand}.
              Unauthorized use, reproduction, or distribution is strictly prohibited.
            </p>
          </NumberedSection>

          <NumberedSection number="8" icon={<Shield size={16} />} title="Limitation of Liability">
            <p>{site.brand} shall not be liable for:</p>
            <ul>
              <li>Natural variations in wood grain, texture, or colour of furniture products</li>
              <li>Delays caused by courier or logistics providers</li>
              <li>Indirect or incidental damages arising from product use beyond its intended purpose</li>
            </ul>
            <p>Our liability is limited strictly to the value of the product purchased.</p>
          </NumberedSection>

          <NumberedSection number="9" icon={<Scale size={16} />} title="Governing Law &amp; Jurisdiction">
            <p>
              These Terms &amp; Conditions are governed by applicable international trade laws. Any disputes shall be resolved through mutual
              negotiation or appropriate legal channels in the jurisdiction of <strong>Tirunelveli, Tamil Nadu, India</strong>.
            </p>
          </NumberedSection>

          <ContactCard title="Contact us about these terms" />

          <p className="text-xs text-center text-(--color-text-muted)">
            © {new Date().getFullYear()} {site.brand}. All Rights Reserved.
          </p>
        </div>
      </div>
    </main>
  );
}

function NumberedSection({
  number, icon, title, children,
}: {
  number: string; icon: React.ReactNode; title: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-(--color-border) bg-(--color-surface) p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-(--color-brand-50) text-(--color-brand-700)">
          {icon}
        </span>
        <h2 className="text-base font-semibold text-(--color-text-strong)">
          <span className="text-(--color-brand-500) mr-1.5">{number}.</span>{title}
        </h2>
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
        <p className="text-xs pt-1">GSTIN: <span className="font-mono">{site.gstin}</span></p>
      </div>
    </div>
  );
}
