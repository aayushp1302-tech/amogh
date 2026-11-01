"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ChevronRight,
  Layers,
  ShieldCheck,
  Sparkles,
  MapPin,
  Anchor
} from "lucide-react";

interface MineralChip {
  id: string;
  name: string;
  formula: string;
  image: string;
  spec: string;
}

const MINERAL_CHIPS: MineralChip[] = [
  { id: "quartz-snow-white", name: "Quartz", formula: "SiO₂", image: "/images/quartz.jpg", spec: "99.5%+ • Custom Cut" },
  { id: "feldspar-soda", name: "Soda Feldspar", formula: "Na-Feldspar", image: "/images/feldspar.jpg", spec: "Na₂O > 10% • Custom Cut" },
  { id: "bauxite-raw", name: "Bauxite", formula: "Al₂O₃", image: "/images/bauxite.jpg", spec: "Al₂O₃ > 48%" },
  { id: "bentonite-sodium", name: "Bentonite", formula: "API 13A", image: "/images/bentonite.jpg", spec: "Swelling > 30mL" },
  { id: "limestone-calcite", name: "Limestone", formula: "CaCO₃", image: "/images/limestone.jpg", spec: "Whiteness 96+" },
];

export default function HeroSection() {
  return (
    <section className="relative pt-8 pb-16 md:pt-20 md:pb-32 overflow-hidden border-b border-[var(--border-hairline)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Origin & Trust Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] text-xs text-[var(--text-secondary)] font-medium mb-4 sm:mb-6 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-[var(--text-pure)]">Direct Mine-Head Procurement</span>
              <span className="opacity-40">/</span>
              <span className="text-[var(--text-muted)] font-mono text-[11px]">Himatnagar, Gujarat</span>
            </motion.div>

            {/* Main Headline - Bold Architectural Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-bold text-3xl sm:text-5xl lg:text-7xl text-[var(--text-pure)] tracking-tight leading-[1.1] mb-4 sm:mb-6"
            >
              The Raw Materials of Modern Industry.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6"
            >
              Direct-from-mine industrial minerals connecting global manufacturing plants to Gujarat&apos;s primary deposits. Certified chemical assays, calibrated particle sizing, and dispatch via Mundra &amp; Kandla ports.
            </motion.p>

            {/* Mobile-Friendly Visual Mineral Chips (Visible on all screens, especially breaks up text on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="w-full mb-6"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span>Primary Calibrated Minerals:</span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                {MINERAL_CHIPS.map((chip) => (
                  <Link
                    key={chip.id}
                    href={`/products#${chip.id}`}
                    className="inline-flex items-center gap-2 p-1.5 pr-3 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] hover:border-[var(--border-medium)] transition-all shrink-0 shadow-xs group"
                  >
                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[var(--border-hairline)] shrink-0">
                      <Image
                        src={chip.image}
                        alt={chip.name}
                        fill
                        sizes="24px"
                        className="object-cover group-hover:scale-115 transition-transform duration-300"
                      />
                    </div>
                    <span className="font-display font-medium text-xs text-[var(--text-pure)]">
                      {chip.name}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">
                      {chip.spec}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-8"
            >
              <Link
                href="#vault"
                className="btn-solid-white inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold shadow-sm"
              >
                <span>Explore Mineral Vault</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#calculator"
                className="btn-outline-white inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-medium"
              >
                <span>Freight Calculator</span>
                <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
              </Link>
            </motion.div>

            {/* Visual Hero Specimen Card - ON MOBILE ONLY (Breaks up text right above stats) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="block lg:hidden w-full mb-8"
            >
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border-hairline)] bg-[var(--bg-surface)] shadow-lg group">
                <div className="aspect-[16/10] relative overflow-hidden bg-black/10">
                  <Image
                    src="/images/hero-mineral.jpg"
                    alt="Amogh Supply - Raw Industrial Minerals Specimen"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-canvas)] via-transparent to-transparent opacity-60" />
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[var(--bg-surface)]/95 backdrop-blur-md border border-[var(--border-hairline)] flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--text-pure)] shrink-0">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-xs text-[var(--text-pure)] leading-tight">
                        Raw Geological Specimens
                      </h4>
                      <p className="font-mono text-[10px] text-[var(--text-muted)]">
                        Himatnagar Processing Hub, Gujarat
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-medium flex items-center gap-1 shrink-0">
                    <ShieldCheck className="w-3 h-3" />
                    NABL Tested
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Key Operational Metrics - Styled as Frosted Micro-Cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-4 border-t border-[var(--border-hairline)] w-full"
            >
              <div className="p-3 sm:p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-2xs">
                <div className="font-display font-bold text-xl sm:text-3xl lg:text-4xl text-[var(--text-pure)]">
                  99.5<span className="text-[var(--text-muted)] text-sm sm:text-lg">%+</span>
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1 truncate">
                  SiO₂ Quartz Purity
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-2xs">
                <div className="font-display font-bold text-xl sm:text-3xl lg:text-4xl text-[var(--text-pure)]">
                  340<span className="text-[var(--text-muted)] text-sm sm:text-lg">km</span>
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1 truncate">
                  Mundra Port FCL
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-2xs">
                <div className="font-display font-bold text-xl sm:text-3xl lg:text-4xl text-[var(--text-pure)]">
                  100<span className="text-[var(--text-muted)] text-sm sm:text-lg">%</span>
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1 truncate">
                  Mine Traceability
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Visual Asset Card - ON DESKTOP ONLY */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[var(--border-hairline)] bg-[var(--bg-surface)] shadow-2xl group">
              <div className="aspect-[4/3] sm:aspect-[16/13] relative overflow-hidden bg-black/10">
                <Image
                  src="/images/hero-mineral.jpg"
                  alt="Amogh Supply - Raw Industrial Minerals Specimen"
                  fill
                  sizes="50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-canvas)] via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Bottom Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[var(--bg-surface)]/95 backdrop-blur-md border border-[var(--border-hairline)] flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--text-pure)]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-xs text-[var(--text-pure)] leading-tight">
                      Raw Geological Specimens
                    </h4>
                    <p className="font-mono text-[10px] text-[var(--text-muted)]">
                      Himatnagar Processing Hub, Gujarat
                    </p>
                  </div>
                </div>

                <span className="font-mono text-[11px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  NABL Tested
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
