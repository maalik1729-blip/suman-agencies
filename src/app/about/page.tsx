"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, Heart, Globe, Leaf, Users, Target } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";



const values = [
  { icon: Award, title: "Solid Craftsmanship", desc: "Every bed, cot, sofa, and wardrobe we sell is built to last — sturdy joints, quality wood, and finishes that don't fade with time." },
  { icon: Heart, title: "Designed for Every Home", desc: "Our range is thoughtfully curated for homes worldwide — the right sizes, the right materials, and the right price for every household." },
  { icon: Globe, title: "Complete Home Range", desc: "From the living room sofa to the bedroom cot, dining table to decorative vessels — find everything your home needs, all in one place." },
  { icon: Leaf, title: "Honest Pricing", desc: "No hidden costs, no inflated prices. You get premium quality furniture and appliances at fair, transparent prices — always." },
  { icon: Users, title: "Worldwide Delivery", desc: "We ship globally and ensure products arrive safely at your doorstep — wherever you are in the world." },
  { icon: Target, title: "After-Sales Support", desc: "Our relationship doesn't end at delivery. We're here for warranty claims, replacements, and any questions you have after purchase." },
];

export default function AboutPage() {
  const [theme, setTheme] = useState("light");

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

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1920&q=80"
            alt="Suman Agency workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: isDark ? "rgba(13,13,13,0.85)" : "rgba(250,248,244,0.88)" }} />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            className="inline-block text-xs font-semibold tracking-widest uppercase text-[#4a6fa5] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Story
          </motion.span>
          <motion.h1
            className={cn("text-5xl sm:text-7xl font-bold font-serif", isDark ? "text-white" : "text-[#1a1a1a]")}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Furnishing Every
            <br />
            <span className="gradient-text italic">Home Worldwide</span>
          </motion.h1>
          <motion.p
            className={cn("mt-6 text-lg max-w-2xl mx-auto leading-relaxed", isDark ? "text-white/65" : "text-black/55")}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            From a cosy bedroom cot to a grand dining set — Suman Agency is your complete destination for home furniture and smart appliances, trusted by families around the world since 2020.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section id="story" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-[#4a6fa5]">Our Mission</span>
            <h2 className={cn("text-4xl sm:text-5xl font-bold font-serif mt-3 mb-6", isDark ? "text-white" : "text-[#1a1a1a]")}>
              Everything Your Home Needs, Under One Roof
            </h2>
            <p className={cn("leading-relaxed mb-4", isDark ? "text-white/60" : "text-black/55")}>
              At Suman Agency, we don't just sell sofas. We outfit entire homes — from the bedroom cot you sleep on every night, to the dining table where your family gathers, to the ceiling fan that keeps you cool through summer. We carry sofas, beds, cots, wardrobes (bureau), dining sets, accent chairs, decorative vessels, and much more.
            </p>
            <p className={cn("leading-relaxed mb-8", isDark ? "text-white/60" : "text-black/55")}>
              Pair your furniture with our smart electronics range — fans, air purifiers, smart lamps, and televisions — all curated to match the aesthetic of your home. Every piece is quality-tested, backed by warranty, and delivered with care to your doorstep — wherever you are in the world.
            </p>
            <Link href="/products" className="btn-primary group inline-flex">
              <span>Explore Full Collection</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <img
                src="/showroom-collection.png"
                alt="Suman Agency full furniture collection — sofas, beds, dining, fans and more"
                className="rounded-3xl object-cover w-full h-auto shadow-2xl"
                style={{ boxShadow: "var(--shadow-luxe-xl)", aspectRatio: "4/3" }}
              />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { label: "Sofas & Chairs", emoji: "🛋️" },
                { label: "Beds & Cots", emoji: "🛏️" },
                { label: "Wardrobes", emoji: "🚪" },
                { label: "Dining Sets", emoji: "🍽️" },
                { label: "Vessels & Décor", emoji: "🏺" },
                { label: "Fans & Appliances", emoji: "🌀" },
              ].map(({ label, emoji }) => (
                <div
                  key={label}
                  className={cn(
                    "rounded-xl p-3 text-center text-xs font-medium border transition-all hover:scale-105 duration-200",
                    isDark ? "bg-[#1a1a1a] border-white/8 text-white/70" : "bg-white border-black/5 text-[#1a1a1a]/70"
                  )}
                  style={{ boxShadow: "var(--shadow-luxe)" }}
                >
                  <div className="text-2xl mb-1">{emoji}</div>
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* Values */}
      <section className="py-24 px-4 sm:px-6" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-[#4a6fa5]">Our Values</span>
            <h2 id="values-heading" className={cn("text-4xl sm:text-5xl font-bold font-serif mt-3", isDark ? "text-white" : "text-[#1a1a1a]")}>
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className={cn("p-8 rounded-2xl border hover:scale-[1.02] transition-transform duration-300", isDark ? "bg-[#1a1a1a] border-white/8" : "bg-white border-black/5")}
                style={{ boxShadow: "var(--shadow-luxe)" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#4a6fa5]/10 flex items-center justify-center mb-5">
                  <Icon size={24} className="text-[#4a6fa5]" />
                </div>
                <h3 className={cn("font-bold text-lg mb-2", isDark ? "text-white" : "text-[#1a1a1a]")}>{title}</h3>
                <p className={cn("text-sm leading-relaxed", isDark ? "text-white/50" : "text-black/50")}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={cn("text-4xl sm:text-5xl font-bold font-serif mb-6", isDark ? "text-white" : "text-[#1a1a1a]")}>
              Ready to Transform
              <br />
              <span className="gradient-text italic">Your Space?</span>
            </h2>
            <p className={cn("text-lg mb-10", isDark ? "text-white/60" : "text-black/50")}>
              Explore our full collection and find pieces that speak to your personal style.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products" className="btn-primary group">
                <span>Shop Now</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="btn-outline" style={isDark ? { borderColor: "#4a6fa540", color: "#4a6fa5" } : {}}>
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
