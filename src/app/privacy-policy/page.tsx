"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Users, Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/data/site";

export default function PrivacyPolicyPage() {
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
            <Shield size={12} aria-hidden="true" />
            Policy
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold font-display tracking-tight text-()">
            Privacy Policy
          </h1>
          <p className="mt-3 text-base text-()">
            Your privacy is our priority.
          </p>
          <p className="mt-2 text-xs text-()">Last Updated: May 2026</p>
        </div>

        {/* Intro */}
        <div className="space-y-5">
          <p className="text-sm text-() leading-relaxed">
            At <strong className="text-()">{site.brand}</strong>, we value the trust you place in us when choosing our premium furniture and electronics. Protecting your personal information is as important to us as ensuring the quality of the products we deliver. This Privacy Policy explains what information we collect, how we use it, and your rights when engaging with our business.
          </p>

          <PolicySection icon={<Eye size={16} />} title="Information We Collect">
            <p>When you interact with us, we may collect:</p>
            <ul>
              <li>Full Name</li>
              <li>Email Address &amp; Phone Number</li>
              <li>Billing &amp; Shipping Address</li>
              <li>Order History &amp; Purchase Preferences</li>
              <li>Payment Details (via secure third-party gateways; we do not store card details)</li>
              <li>Business/Wholesale Information (for B2B clients)</li>
              <li>Device &amp; Browser Data (for website analytics)</li>
              <li>Cookies &amp; Tracking Data (for performance improvement)</li>
            </ul>
            <p>We collect only the information necessary to provide you with safe, reliable, and efficient service.</p>
          </PolicySection>

          <PolicySection icon={<Users size={16} />} title="Why We Collect Your Information">
            <p>We use your data solely for legitimate business purposes, including:</p>
            <ul>
              <li>Processing and fulfilling orders</li>
              <li>Managing deliveries and providing shipment updates</li>
              <li>Offering customer service and support</li>
              <li>Sending optional promotional updates (only if you opt in)</li>
              <li>Improving our product offerings and customer experience</li>
              <li>Wholesale/B2B account management</li>
              <li>Meeting legal, regulatory, and tax compliance requirements (including GST)</li>
            </ul>
          </PolicySection>

          <PolicySection icon={<Lock size={16} />} title="How We Protect Your Information">
            <p>We implement strict measures to ensure your data is secure and confidential:</p>
            <ul>
              <li>SSL Encryption for all online interactions</li>
              <li>Secure Payment Processing via PCI-compliant gateways</li>
              <li>Firewall &amp; Access Controls on servers and systems</li>
              <li>Restricted Staff Access to sensitive data</li>
              <li>Regular Reviews of security and privacy practices</li>
            </ul>
          </PolicySection>

          <PolicySection icon={<Shield size={16} />} title="Your Rights &amp; Choices">
            <p>As our valued customer, you have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request corrections or updates to your information</li>
              <li>Ask for deletion of your data (subject to legal requirements)</li>
              <li>Withdraw consent from promotional communication at any time</li>
              <li>Raise concerns about data misuse or handling</li>
            </ul>
            <p>We aim to process all verified requests within <strong>30 days</strong>.</p>
          </PolicySection>

          <PolicySection icon={<Users size={16} />} title="Third-Party Sharing">
            <p>We do not sell or rent your personal information. Data may be shared only with:</p>
            <ul>
              <li>Logistics partners (for delivery of orders)</li>
              <li>Payment processors (for secure transactions)</li>
              <li>Government or regulatory authorities (when legally required)</li>
            </ul>
          </PolicySection>

          <PolicySection icon={<Eye size={16} />} title="Policy Updates">
            <p>
              This Privacy Policy may be updated periodically to reflect changes in law, technology, or business
              practices. Updates will always be posted on our website with a revised &quot;Last Updated&quot; date. We
              encourage you to review this page periodically.
            </p>
          </PolicySection>

          {/* Contact card */}
          <ContactCard title="Contact us about privacy" />

          <p className="text-xs text-center text-()">
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
        <p className="text-xs text-() pt-1">GSTIN: <span className="font-mono">{site.gstin}</span></p>
      </div>
    </div>
  );
}
