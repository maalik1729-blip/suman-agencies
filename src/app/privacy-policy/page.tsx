"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Users, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            <Shield size={14} />
            Policy
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#1a1a1a] dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-black/50 dark:text-white/50">
            Your Privacy is Our Priority
          </p>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#0d9488] to-[#0f766e]" />
          <p className="mt-4 text-xs text-black/40 dark:text-white/30">Last Updated: August 2025</p>
        </div>

        {/* Intro */}
        <div className="space-y-6 text-[#1a1a1a]/70 dark:text-white/60">
          <p className="text-base leading-relaxed">
            At <strong className="text-[#1a1a1a] dark:text-white">Suman Agency</strong>, we value the trust you place
            in us when choosing our premium furniture and electronics. Protecting your personal information is
            as important to us as ensuring the quality of the products we deliver. This Privacy Policy explains
            what information we collect, how we use it, and your rights when engaging with our business.
          </p>

          <Section icon={<Eye size={18} />} title="Information We Collect">
            <p>When you interact with us, we may collect:</p>
            <ul>
              <li>Full Name</li>
              <li>Email Address & Phone Number</li>
              <li>Billing & Shipping Address</li>
              <li>Order History & Purchase Preferences</li>
              <li>Payment Details (via secure third-party gateways; we do not store card details)</li>
              <li>Business/Wholesale Information (for B2B clients)</li>
              <li>Device & Browser Data (for website analytics)</li>
              <li>Cookies & Tracking Data (for performance improvement)</li>
            </ul>
            <p>We collect only the information necessary to provide you with safe, reliable, and efficient service.</p>
          </Section>

          <Section icon={<Users size={18} />} title="Why We Collect Your Information">
            <p>We use your data solely for legitimate business purposes, including:</p>
            <ul>
              <li>Processing and fulfilling orders</li>
              <li>Managing deliveries and providing shipment updates</li>
              <li>Offering customer service and support</li>
              <li>Sending optional promotional updates (only if you opt in)</li>
              <li>Improving our product offerings and customer experience</li>
              <li>Wholesale/B2B account management</li>
              <li>Meeting legal, regulatory, and tax compliance requirements</li>
            </ul>
          </Section>

          <Section icon={<Lock size={18} />} title="How We Protect Your Information">
            <p>We implement strict measures to ensure your data is secure and confidential:</p>
            <ul>
              <li>SSL Encryption for all online interactions</li>
              <li>Secure Payment Processing via PCI-compliant gateways</li>
              <li>Firewall & Access Controls on servers and systems</li>
              <li>Restricted Staff Access to sensitive data</li>
              <li>Regular Reviews of security and privacy practices</li>
            </ul>
          </Section>

          <Section icon={<Shield size={18} />} title="Your Rights & Choices">
            <p>As our valued customer, you have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request corrections or updates to your information</li>
              <li>Ask for deletion of your data (subject to legal requirements)</li>
              <li>Withdraw consent from promotional communication at any time</li>
              <li>Raise concerns about data misuse or handling</li>
            </ul>
            <p>We aim to process all verified requests within <strong>30 days</strong>.</p>
          </Section>

          <Section icon={<Users size={18} />} title="Third-Party Sharing">
            <p>We do not sell or rent your personal information. Data may be shared only with:</p>
            <ul>
              <li>Logistics partners (for delivery of orders)</li>
              <li>Payment processors (for secure transactions)</li>
              <li>Government or regulatory authorities (when legally required)</li>
            </ul>
          </Section>

          <Section icon={<Eye size={18} />} title="Policy Updates">
            <p>
              This Privacy Policy may be updated periodically to reflect changes in law, technology, or business
              practices. Updates will always be posted on our website with a revised "Last Updated" date. We
              encourage you to review this page periodically.
            </p>
          </Section>

          <ContactBox />

          <p className="text-xs text-center text-black/30 dark:text-white/25">
            © {new Date().getFullYear()} Suman Agency. All Rights Reserved.
          </p>
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
        <h2 className="text-lg font-bold">Contact Us</h2>
      </div>
      <p className="text-white/80 text-sm mb-4">For privacy requests or concerns, please contact us:</p>
      <div className="space-y-1.5 text-sm text-white/90">
        <p><strong>Suman Agency (Suman Tech Automation)</strong></p>
        <p>👤 Prop. RAJASINGH</p>
        <p>📍 No.7/1-3, West Street, Chellathayarpuram, Tirunelveli – 627808, Tamil Nadu</p>
        <p>📞 +91 97155 90101</p>
        <p>📧 sumanagency4@gmail.com</p>
        <p>🏛️ GSTIN: 33DVIPR5548Q1ZN</p>
      </div>
    </div>
  );
}
