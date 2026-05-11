"use client";

import Link from "next/link";
import { ArrowLeft, Truck, Package, MapPin, Clock, AlertCircle, Mail } from "lucide-react";

export default function ShippingPolicyPage() {
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
            <Truck size={14} />
            Policy
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#1a1a1a] dark:text-white">
            Shipping Policy
          </h1>
          <p className="mt-4 text-lg text-black/50 dark:text-white/50">
            Quality Delivered with Care
          </p>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#0d9488] to-[#0f766e]" />
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none space-y-10 text-[#1a1a1a]/70 dark:text-white/60">

          <p className="text-base leading-relaxed">
            At <strong className="text-[#1a1a1a] dark:text-white">Suman Agency</strong>, we are committed to ensuring
            that your premium furniture and electronics reach you in perfect condition. This Shipping Policy
            explains how we process orders, handle packaging, and manage deliveries for both retail and
            wholesale customers.
          </p>

          {/* Section */}
          <Section icon={<Clock size={18} />} title="Order Processing Time">
            <ul>
              <li>Orders are processed within <strong>2–4 business days</strong> of payment confirmation.</li>
              <li>Orders placed on Sundays or public holidays will be processed on the next working day.</li>
              <li>Bulk/wholesale orders may require longer preparation time depending on quantity and product availability. Customers will be informed in advance.</li>
              <li>Furniture items with customisation requests may take 7–14 additional business days.</li>
            </ul>
          </Section>

          <Section icon={<MapPin size={18} />} title="Shipping Destinations & Delivery Timelines">
            <p className="font-semibold text-[#0d9488] mt-2">Domestic Shipping (India)</p>
            <ul>
              <li><strong>Metro Cities:</strong> 3–6 business days after dispatch</li>
              <li><strong>Non-Metro Cities & Semi-Urban Areas:</strong> 5–10 business days after dispatch</li>
              <li><strong>Remote/Rural Areas:</strong> 7–12 business days after dispatch</li>
            </ul>
            <p className="font-semibold text-[#0d9488] mt-4">International Shipping</p>
            <ul>
              <li>International delivery may be available for wholesale/B2B orders.</li>
              <li>Timelines depend on the destination country, customs clearance, and shipping partner schedules.</li>
              <li>Customers will be informed of estimated timelines during order confirmation.</li>
            </ul>
          </Section>

          <Section icon={<Package size={18} />} title="Shipping Charges">
            <ul>
              <li>Charges are calculated based on order weight, dimensions, packaging type, and delivery location.</li>
              <li>Shipping costs will be displayed clearly at checkout before payment.</li>
              <li>Free shipping offers may apply during promotions or for orders above a certain value.</li>
              <li>Large furniture items (beds, wardrobes, sofas) may carry additional handling charges.</li>
            </ul>
          </Section>

          <Section icon={<Package size={18} />} title="Packaging & Handling">
            <ul>
              <li>All products are packed in protective, tamper-proof packaging to prevent damage in transit.</li>
              <li>Furniture items are bubble-wrapped, foam-padded, and secured in sturdy cardboard or wooden crates.</li>
              <li>Electronics are packed in original manufacturer packaging with additional outer protection.</li>
              <li>Bulk/wholesale orders are carefully palletized and secured for safe long-distance transit.</li>
            </ul>
          </Section>

          <Section icon={<Truck size={18} />} title="Tracking Your Order">
            <p>Once dispatched, customers will receive:</p>
            <ul>
              <li>A tracking ID via SMS/email</li>
              <li>A real-time tracking link to monitor shipment progress</li>
            </ul>
            <p>Please allow 24–48 hours for tracking details to update after dispatch.</p>
          </Section>

          <Section icon={<AlertCircle size={18} />} title="Delays & Exceptions">
            <p>While we strive for timely delivery, certain factors may cause delays, including:</p>
            <ul>
              <li>Courier or logistics partner disruptions</li>
              <li>Extreme weather conditions</li>
              <li>Regional holidays or strikes</li>
              <li>Customs delays for international orders</li>
            </ul>
            <p>In such cases, our support team will provide updates and assistance promptly.</p>
          </Section>

          {/* Contact */}
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
      <p className="text-white/80 text-sm mb-4">For shipping-related questions or support, please contact us:</p>
      <div className="space-y-1.5 text-sm text-white/90">
        <p><strong>Suman Agency (Suman Tech Automation)</strong></p>
        <p>👤 Prop. RAJASINGH</p>
        <p>📍 No.7/1-3, West Street, Chellathayarpuram, Tirunelveli – 627808, Tamil Nadu</p>
        <p>📞 +91 97155 90101</p>
        <p>📧 hello@sumanagency.com</p>
        <p>🏛️ GSTIN: 33DVIPR5548Q1ZN</p>
      </div>
    </div>
  );
}
