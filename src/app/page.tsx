"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  ChevronDown,
  Star,
  Quote,
  Truck,
  Shield,
  Headphones,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { products, testimonials, stats, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useScrollReveal, useCountUp } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

// =================== HERO SECTION ===================
function HeroSection({ theme }: { theme?: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt="Suman Agency luxury furniture showroom"
          className="w-full h-full object-cover"
        />
        {/* Cool-toned dark overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(15,20,32,0.85) 0%, rgba(45,79,124,0.22) 55%, rgba(10,15,28,0.72) 100%)",
          }}
        />
        {/* Bottom fade into page background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: theme === "dark"
              ? "linear-gradient(to top, #0d1017, transparent)"
              : "linear-gradient(to top, #f8fafc, transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">

        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white font-serif leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          Live in
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #6b8fc4 0%, #a8c4e2 50%, #4a6fa5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            className="italic"
          >Luxury</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          Discover curated furniture and smart electronics that transform houses
          into extraordinary homes.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <Link href="/products" className="btn-primary group">
            <span>Shop Collection</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/about" className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}>
            <Play size={14} />
            <span>Our Story</span>
          </Link>
        </motion.div>

        {/* Hero Stats */}
        <motion.div
          className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {[
            { value: "50K+", label: "Customers" },
            { value: "1200+", label: "Products" },
            { value: "48", label: "Cities" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-white font-serif">{s.value}</p>
              <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="text-[#4a6fa5] animate-bounce" />
      </motion.div>
    </section>
  );
}


function MarqueeBand() {
  const items = [
    "Premium Quality",
    "Free Delivery",
    "Easy Returns",
    "5-Year Warranty",
    "Expert Support",
    "Customizable",
    "Eco-Friendly",
    "Award Winning",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="py-5 overflow-hidden bg-gradient-to-r from-[#4a6fa5] to-[#2d4f7c]">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-6 text-white font-medium text-sm">
            <span className="w-1 h-1 rounded-full bg-white/50" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// =================== FEATURED FURNITURE ===================
function FeaturedFurniture({ theme }: { theme?: string }) {
  const isDark = theme === "dark";
  const ref = useScrollReveal();
  const furniture = products.filter((p) => p.category === "furniture").slice(0, 4);

  return (
    <section className="py-24 px-4 sm:px-6" aria-labelledby="furniture-heading">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="reveal-up text-center mb-14">
          <span className={cn("text-xs font-semibold tracking-widest uppercase", "text-[#4a6fa5]")}>
            Furniture Collection
          </span>
          <h2
            id="furniture-heading"
            className={cn("text-4xl sm:text-5xl font-bold font-serif mt-3 mb-4", isDark ? "text-white" : "text-[#1a1a1a]")}
          >
            Crafted for Living
          </h2>
          <p className={cn("max-w-xl mx-auto text-base", isDark ? "text-white/60" : "text-black/50")}>
            Each piece is carefully selected for its craftsmanship, materials, and timeless aesthetic that elevates any space.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {furniture.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ProductCard product={product} theme={theme || "light"} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products?category=furniture" className="btn-outline" style={isDark ? { borderColor: "#4a6fa540", color: "#4a6fa5" } : {}}>
            View All Furniture
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// =================== FEATURED ELECTRONICS ===================
function FeaturedElectronics({ theme }: { theme?: string }) {
  const isDark = theme === "dark";
  const electronics = products.filter((p) => p.category === "electronics").slice(0, 4);

  return (
    <section
      className="py-24 px-4 sm:px-6"
      style={{ background: isDark ? "#111" : "#1a1a1a" }}
      aria-labelledby="electronics-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#4a6fa5]">
            Electronics
          </span>
          <h2
            id="electronics-heading"
            className="text-4xl sm:text-5xl font-bold font-serif mt-3 mb-4 text-white"
          >
            Smart Living
          </h2>
          <p className="max-w-xl mx-auto text-base text-white/50">
            Cutting-edge technology that seamlessly integrates with your lifestyle — intuitive, powerful, and beautifully designed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {electronics.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ProductCard product={product} theme="dark" />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products?category=electronics" className="btn-outline" style={{ borderColor: "#4a6fa540", color: "#4a6fa5" }}>
            Explore Electronics
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// =================== TRENDING CAROUSEL ===================
function TrendingCarousel({ theme }: { theme?: string }) {
  const isDark = theme === "dark";
  const [current, setCurrent] = useState(0);
  const trending = products.filter((p) => p.badge === "trending" || p.badge === "bestseller");

  const prev = () => setCurrent((c) => (c - 1 + trending.length) % trending.length);
  const next = () => setCurrent((c) => (c + 1) % trending.length);

  return (
    <section className="py-24 px-4 sm:px-6 overflow-hidden" aria-labelledby="trending-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#4a6fa5]">
              Trending Now
            </span>
            <h2
              id="trending-heading"
              className={cn("text-4xl sm:text-5xl font-bold font-serif mt-2", isDark ? "text-white" : "text-[#1a1a1a]")}
            >
              Most Loved
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-110",
                isDark
                  ? "border-white/15 text-white/70 hover:border-[#4a6fa5] hover:text-[#4a6fa5]"
                  : "border-black/15 text-black/50 hover:border-[#4a6fa5] hover:text-[#4a6fa5]"
              )}
              aria-label="Previous product"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-110",
                isDark
                  ? "border-white/15 text-white/70 hover:border-[#4a6fa5] hover:text-[#4a6fa5]"
                  : "border-black/15 text-black/50 hover:border-[#4a6fa5] hover:text-[#4a6fa5]"
              )}
              aria-label="Next product"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                <img
                  src={trending[current]?.images[0]}
                  alt={trending[current]?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Product Info */}
              <div>
                <span className={cn("text-xs font-medium uppercase tracking-wider", "text-[#4a6fa5]")}>
                  {trending[current]?.subcategory}
                </span>
                <h3 className={cn("text-3xl sm:text-4xl font-bold font-serif mt-2", isDark ? "text-white" : "text-[#1a1a1a]")}>
                  {trending[current]?.name}
                </h3>
                <p className={cn("mt-4 leading-relaxed", isDark ? "text-white/60" : "text-black/50")}>
                  {trending[current]?.description.substring(0, 160)}…
                </p>

                <div className="flex items-center gap-3 mt-6">
                  <span className="text-3xl font-bold text-[#4a6fa5]">
                    ${trending[current]?.price.toLocaleString()}
                  </span>
                  {trending[current]?.originalPrice && (
                    <span className={cn("text-lg line-through", isDark ? "text-white/30" : "text-black/30")}>
                      ${trending[current]?.originalPrice?.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <Link href={`/products/${trending[current]?.id}`} className="btn-primary group">
                    <span>View Details</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/products" className={cn("text-sm font-medium hover:text-[#4a6fa5] transition-colors", isDark ? "text-white/60" : "text-black/50")}>
                    Browse More →
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {trending.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === current ? "w-6 h-2 bg-[#4a6fa5]" : "w-2 h-2 bg-gray-300 dark:bg-white/20"
                )}
                aria-label={`Go to product ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =================== WHY CHOOSE US ===================
function WhyChooseUs({ theme }: { theme?: string }) {
  const isDark = theme === "dark";
  const features = [
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "Every product undergoes rigorous quality checks. We stand behind everything we sell with comprehensive warranties.",
    },
    {
      icon: Truck,
      title: "Free White-Glove Delivery",
      description: "Complimentary delivery and professional in-home setup on all orders above ₹25,000. No hidden charges.",
    },
    {
      icon: RotateCcw,
      title: "30-Day Easy Returns",
      description: "Not satisfied? Return any product within 30 days for a full refund — no questions asked.",
    },
    {
      icon: Headphones,
      title: "Expert Concierge Support",
      description: "Our design consultants are available 7 days a week to help you create your perfect space.",
    },
  ];

  return (
    <section
      className="py-24 px-4 sm:px-6"
      style={{ background: isDark ? "rgba(255,255,255,0.02)" : "#f5f0e8" }}
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#4a6fa5]">
            Why Suman Agency
          </span>
          <h2
            id="why-heading"
            className={cn("text-4xl sm:text-5xl font-bold font-serif mt-3 mb-4", isDark ? "text-white" : "text-[#1a1a1a]")}
          >
            The Suman Agency Difference
          </h2>
          <p className={cn("max-w-xl mx-auto", isDark ? "text-white/60" : "text-black/50")}>
            We don't just sell products — we create experiences that last a lifetime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              className={cn(
                "p-8 rounded-2xl border flex flex-col gap-5 hover:scale-[1.02] transition-transform duration-300",
                isDark ? "bg-[#1a1a1a] border-white/8" : "bg-white border-black/5"
              )}
              style={{ boxShadow: "var(--shadow-luxe)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a6fa5]/20 to-[#4a6fa5]/5 flex items-center justify-center">
                <Icon size={24} className="text-[#4a6fa5]" />
              </div>
              <div>
                <h3 className={cn("font-bold text-lg mb-2", isDark ? "text-white" : "text-[#1a1a1a]")}>
                  {title}
                </h3>
                <p className={cn("text-sm leading-relaxed", isDark ? "text-white/50" : "text-black/50")}>
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =================== SINGLE STAT COUNTER ===================
function StatCounter({ value, suffix, label, delay, visible }: { value: number; suffix: string; label: string; delay: number; visible: boolean }) {
  const countRef = useCountUp(value, 2200, visible);
  return (
    <motion.div
      className="text-center text-white"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <p className="text-5xl sm:text-6xl font-bold font-serif">
        <span ref={countRef}>0</span>
        {suffix}
      </p>
      <p className="text-white/70 text-sm mt-2 font-medium">{label}</p>
    </motion.div>
  );
}

// =================== STATS ===================
function StatsSection({ theme }: { theme?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-24 px-4 sm:px-6 bg-gradient-to-br from-[#4a6fa5] to-[#2d4f7c]"
      aria-label="Company statistics"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 0.1}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// =================== TESTIMONIALS ===================
function TestimonialsSection({ theme }: { theme?: string }) {
  const isDark = theme === "dark";

  return (
    <section className="py-24 px-4 sm:px-6" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#4a6fa5]">
            Testimonials
          </span>
          <h2
            id="testimonials-heading"
            className={cn("text-4xl sm:text-5xl font-bold font-serif mt-3", isDark ? "text-white" : "text-[#1a1a1a]")}
          >
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((t, i) => (
            <motion.div
              key={t.id}
              className={cn(
                "p-7 rounded-2xl border relative",
                isDark ? "bg-[#1a1a1a] border-white/8" : "bg-white border-black/5"
              )}
              style={{ boxShadow: "var(--shadow-luxe)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Quote size={24} className="text-[#4a6fa5]/30 mb-4" />
              <p className={cn("text-sm leading-relaxed mb-6", isDark ? "text-white/70" : "text-black/60")}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className={cn("font-semibold text-sm", isDark ? "text-white" : "text-[#1a1a1a]")}>
                    {t.name}
                  </p>
                  <p className={cn("text-xs", isDark ? "text-white/40" : "text-black/40")}>
                    {t.role}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={12} className="text-[#4a6fa5] fill-[#4a6fa5]" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =================== HOME PAGE ===================
export default function HomePage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("suman-agency-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(stored || (prefersDark ? "dark" : "light"));

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <HeroSection theme={theme} />
      <MarqueeBand />
      <FeaturedFurniture theme={theme} />
      <FeaturedElectronics theme={theme} />
      <TrendingCarousel theme={theme} />
      <WhyChooseUs theme={theme} />
      <StatsSection theme={theme} />
      <TestimonialsSection theme={theme} />
    </>
  );
}
