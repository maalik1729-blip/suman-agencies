"use client";

import Link from "next/link";
import { ArrowLeft, FileText, ShoppingCart, Package, Shield, Scale, Mail } from "lucide-react";

export default function TermsConditionsPage() {
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
            <FileText size={14} />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#1a1a1a] dark:text-white">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-lg text-black/50 dark:text-white/50">
            Please read these terms carefully before using our services
          </p>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#0d9488] to-[#0f766e]" />
        </div>

        <div className="space-y-6 text-[#1a1a1a]/70 dark:text-white/60">
          <p className="text-base leading-relaxed">
            Welcome to <strong className="text-[#1a1a1a] dark:text-white">Suman Tech Automation</strong>. By accessing our
            website, making a purchase, or engaging with our services, you agree to comply with and be bound
            by the following Terms & Conditions. These terms govern all orders, sales, and interactions with
            Suman Tech Automation. If you do not agree with these terms, we request you to discontinue using our services.
          </p>

          <NumberedSection number="1" icon={<FileText size={18} />} title="General Use of Website & Services">
            <ul>
              <li>By shopping with us, you confirm that you are at least <strong>18 years old</strong>, or using our services under the supervision of a parent/guardian.</li>
              <li>You agree to provide accurate and complete details when placing orders.</li>
              <li>Any misuse, fraudulent activity, or violation of these terms may result in suspension of service.</li>
            </ul>
          </NumberedSection>

          <NumberedSection number="2" icon={<Package size={18} />} title="Products & Pricing">
            <ul>
              <li>We specialize in premium furniture and electronics for homes and offices.</li>
              <li>All product descriptions are provided as accurately as possible. Minor variations in colour, texture, or wood grain may occur as products use natural materials.</li>
              <li>Prices are listed in the <strong>currency of your selected region</strong> and may change due to market fluctuations or business policy.</li>
              <li>We reserve the right to correct any errors in product listings or pricing, and may cancel affected orders with full refunds.</li>
            </ul>
          </NumberedSection>

          <NumberedSection number="3" icon={<ShoppingCart size={18} />} title="Orders & Payments">
            <ul>
              <li>Orders are confirmed only after successful payment.</li>
              <li>We accept UPI, debit/credit cards, net banking, and wallets via secure, PCI-compliant gateways.</li>
              <li>Suman Tech Automation does not store your payment card details.</li>
              <li>In the event of duplicate charges or transaction errors, customers should contact our support team immediately.</li>
            </ul>
          </NumberedSection>

          <NumberedSection number="4" icon={<Package size={18} />} title="Shipping & Delivery">
            <ul>
              <li>Orders are shipped worldwide via trusted courier/logistics partners.</li>
              <li>Delivery timelines vary based on location and will be shared at checkout.</li>
              <li>Tracking details are provided once the order is dispatched.</li>
              <li>We are not liable for courier delays, force majeure events, or customer unavailability during delivery.</li>
            </ul>
          </NumberedSection>

          <NumberedSection number="5" icon={<Shield size={18} />} title="Cancellations & Returns">
            <ul>
              <li>Orders may be cancelled within <strong>2 hours</strong> of purchase, provided they have not been packed or shipped.</li>
              <li>Custom/assembled furniture orders cannot be cancelled once production has begun.</li>
              <li>Returns are accepted only in cases of damaged/tampered products on delivery, wrong items shipped, or verified quality concerns.</li>
              <li>For details, please refer to our <Link href="/cancellation-refund" className="text-[#0d9488] underline underline-offset-2">Cancellation & Refund Policy</Link>.</li>
            </ul>
          </NumberedSection>

          <NumberedSection number="6" icon={<FileText size={18} />} title="Customer Responsibilities">
            <p>By engaging with us, you agree not to:</p>
            <ul>
              <li>Provide false or incomplete order/delivery details</li>
              <li>Resell our products without prior written approval</li>
              <li>Misuse our brand name, content, or product images</li>
              <li>Raise fraudulent claims or chargebacks</li>
            </ul>
          </NumberedSection>

          <NumberedSection number="7" icon={<Shield size={18} />} title="Intellectual Property">
            <p>
              All product images, content, designs, and branding are the intellectual property of Suman Tech Automation.
              Unauthorized use, reproduction, or distribution is strictly prohibited.
            </p>
          </NumberedSection>

          <NumberedSection number="8" icon={<Shield size={18} />} title="Limitation of Liability">
            <p>Suman Tech Automation shall not be liable for:</p>
            <ul>
              <li>Natural variations in wood grain, texture, or colour of furniture products</li>
              <li>Delays caused by courier or logistics providers</li>
              <li>Indirect or incidental damages arising from product use beyond its intended purpose</li>
            </ul>
            <p>Our liability is limited strictly to the value of the product purchased.</p>
          </NumberedSection>

          <NumberedSection number="9" icon={<Scale size={18} />} title="Governing Law & Jurisdiction">
            <p>
              These Terms &amp; Conditions are governed by applicable international trade laws. Any disputes relating to orders shall be resolved through mutual negotiation or appropriate legal channels in the jurisdiction of <strong>Tirunelveli, Tamil Nadu, India</strong>.
            </p>
          </NumberedSection>

          <ContactBox />

          <p className="text-xs text-center text-black/30 dark:text-white/25">
            © {new Date().getFullYear()} Suman Tech Automation. All Rights Reserved.
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
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-black/5 dark:border-white/8 p-7"
      style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-[#0d9488]/10 flex items-center justify-center text-[#0d9488]">
          {icon}
        </div>
        <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-white">
          <span className="text-[#0d9488] mr-2">{number}.</span>{title}
        </h2>
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
      <p className="text-white/80 text-sm mb-4">For assistance or queries related to these terms:</p>
      <div className="space-y-1.5 text-sm text-white/90">
        <p><strong>Suman Tech Automation</strong></p>
        <p>👤 Prop. RAJASINGH</p>
        <p>📍 No.7/1-3, West Street, Chellathayarpuram, Tirunelveli – 627808, Tamil Nadu</p>
        <p>📞 +91 97155 90101</p>
        <p>📧 sumantechautomation@gmail.com | sumanagency4@gmail.com</p>
        <p>🏛️ GSTIN: 33DVIPR5548Q1ZN</p>
      </div>
    </div>
  );
}
