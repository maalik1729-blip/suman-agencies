"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Award, Heart, Globe, Leaf, Users, Target,
  Phone, MapPin, Mail, Shield,
} from "lucide-react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";

const values = [
  {
    icon: Award,
    title: "Solid Craftsmanship",
    desc: "Every bed, cot, sofa, and wardrobe we sell is built to last — sturdy joints, quality wood, and finishes that don't fade with time.",
  },
  {
    icon: Heart,
    title: "Designed for Every Home",
    desc: "Our range is curated for homes across the world — the right sizes, the right materials, and the right price for every household.",
  },
  {
    icon: Globe,
    title: "Complete Home Range",
    desc: "From the living room sofa to the bedroom cot, dining table to office desk — find everything your home needs, all in one place.",
  },
  {
    icon: Leaf,
    title: "Honest Pricing",
    desc: "No hidden costs, no inflated prices. You get premium quality furniture and electronics at fair, transparent prices — always.",
  },
  {
    icon: Users,
    title: "Worldwide Delivery",
    desc: "We ship globally and ensure products arrive safely at your doorstep — wherever you are in the world.",
  },
  {
    icon: Target,
    title: "After-Sales Support",
    desc: "Our relationship doesn't end at delivery. We're here for warranty claims, replacements, and any questions you have after purchase.",
  },
];

const categories = [
  { label: "Sofas & Chairs", emoji: "🛋️" },
  { label: "Beds & Cots", emoji: "🛏️" },
  { label: "Wardrobes", emoji: "🚪" },
  { label: "Dining Sets", emoji: "🍽️" },
  { label: "Cables & Networking", emoji: "🔌" },
  { label: "Office Desks", emoji: "💻" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-(--header-height)">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(11,13,18,0.82) 0%, rgba(11,13,18,0.6) 55%, rgba(11,13,18,0.15) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.12em] text-white/80"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-3 font-display font-semibold text-white tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl max-w-2xl"
          >
            Furnishing every home worldwide.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-5 text-base sm:text-lg text-white/80 max-w-xl"
          >
            From a cosy bedroom cot to a grand dining set — {site.brand} is your complete destination for home furniture and essential electronics, trusted by families around the world since 2020.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Link href="/products">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={16} />}
              >
                Shop now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50"
              >
                Get in touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-(--color-surface) border-y border-(--color-border)">
        <ul className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4">
          {[
            { emoji: "📍", text: "Tirunelveli, Tamil Nadu" },
            { emoji: "🏛️", text: `GSTIN: ${site.gstin}` },
            { emoji: "🚚", text: "Worldwide Delivery" },
            { emoji: "🔄", text: "30-day hassle-free returns" },
          ].map(({ emoji, text }) => (
            <li key={text} className="flex items-center gap-2 py-4 text-xs sm:text-sm text-(--color-text)">
              <span aria-hidden="true">{emoji}</span>
              <span className="truncate">{text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Mission */}
      <section className="bg-(--color-bg) py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-(--color-text-muted)">
              Our Mission
            </p>
            <h2 className="mt-2 font-display font-semibold text-3xl sm:text-4xl tracking-tight text-(--color-text-strong)">
              Everything your home needs, under one roof.
            </h2>
            <p className="mt-4 text-sm text-(--color-text) leading-relaxed">
              At {site.brand}, we don't just sell sofas. We outfit entire homes — from the bedroom cot you sleep on every night, to the dining table where your family gathers, to the study desk where you work from home.
            </p>
            <p className="mt-3 text-sm text-(--color-text) leading-relaxed">
              Pair your furniture with our electronics range — cables, networking gear, and accessories — all curated to work seamlessly in a modern home. Every piece is quality-tested, backed by warranty, and delivered with care to your doorstep.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map(({ label, emoji }) => (
                <div
                  key={label}
                  className="rounded-lg border border-(--color-border) bg-(--color-surface) p-3 text-center text-xs font-medium text-(--color-text) hover:border-(--color-border-strong) transition-colors"
                >
                  <div className="text-xl mb-1" aria-hidden="true">{emoji}</div>
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/products">
                <Button variant="primary" size="md" rightIcon={<ArrowRight size={14} />}>
                  Explore full collection
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-4/3 rounded-lg overflow-hidden bg-(--color-surface-2)"
          >
            <Image
              src="/showroom-collection.png"
              alt="Suman Tech Automation full furniture collection — sofas, beds, dining sets and more"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-(--color-surface) py-20 px-4 sm:px-6" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-(--color-text-muted)">
              Our Values
            </p>
            <h2
              id="values-heading"
              className="mt-2 font-display font-semibold text-3xl sm:text-4xl tracking-tight text-(--color-text-strong)"
            >
              What we stand for.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="rounded-lg border border-(--color-border) bg-(--color-bg) p-6 hover:border-(--color-border-strong) transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ delay: i * 0.07 }}
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-(--color-brand-50) text-(--color-brand-700)">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-(--color-text-strong)">{title}</h3>
                <p className="mt-2 text-sm text-(--color-text) leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="bg-(--color-bg) py-20 px-4 sm:px-6" aria-labelledby="about-cta">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: CTA */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-(--color-text-muted)">
              Ready to furnish your home?
            </p>
            <h2
              id="about-cta"
              className="mt-2 font-display font-semibold text-3xl tracking-tight text-(--color-text-strong)"
            >
              Come visit us or browse online.
            </h2>
            <p className="mt-3 text-sm text-(--color-text) leading-relaxed">
              Visit our showroom in Tirunelveli or browse our full catalog online. Our team is available Mon–Sat, 9 AM–7 PM to help you find the right piece for your home.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/products">
                <Button variant="primary" size="md" rightIcon={<ArrowRight size={14} />}>
                  Shop online
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="md">
                  Contact us
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Contact card */}
          <div className="rounded-lg border border-(--color-border) bg-(--color-surface) p-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-(--color-border) bg-(--color-bg)">
              <Shield size={12} className="text-(--color-brand-500)" aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-(--color-text-muted)">
                GST: {site.gstin}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              {site.contact.phones.map((p) => (
                <a
                  key={p.e164}
                  href={`tel:${p.e164}`}
                  className="flex items-center gap-2 text-(--color-text) hover:text-(--color-text-strong) transition-colors"
                >
                  <Phone size={14} className="text-(--color-text-muted) shrink-0" aria-hidden="true" />
                  {p.display}
                </a>
              ))}
              <a
                href={`mailto:${site.contact.primaryEmail}`}
                className="flex items-center gap-2 text-(--color-text) hover:text-(--color-text-strong) transition-colors"
              >
                <Mail size={14} className="text-(--color-text-muted) shrink-0" aria-hidden="true" />
                {site.contact.primaryEmail}
              </a>
              <address className="flex items-start gap-2 not-italic text-(--color-text)">
                <MapPin size={14} className="mt-0.5 text-(--color-text-muted) shrink-0" aria-hidden="true" />
                <span>
                  {site.contact.address.line1},<br />
                  {site.contact.address.city} – {site.contact.address.pincode},{" "}
                  {site.contact.address.state}
                </span>
              </address>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
