"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  ChevronRight, 
  Scissors, 
  FlaskConical,
  Layers,
  FileText
} from "lucide-react";
import { AMOGH_PRODUCTS } from "@/data/minerals";

interface FlagshipMineralsProps {
  onSelectForCalculator?: (productId: string) => void;
}

export default function FlagshipMinerals({ onSelectForCalculator }: FlagshipMineralsProps) {
  // 4 flagship industrial mineral commodities for executive overview
  const flagshipIds = ["quartz-snow-white", "soda-feldspar", "bauxite-ore", "bentonite-clay"];
  const flagships = flagshipIds
    .map((id) => AMOGH_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof AMOGH_PRODUCTS;

  const handleCalcClick = (id: string) => {
    if (onSelectForCalculator) {
      onSelectForCalculator(id);
    } else {
      const el = document.getElementById("calculator");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="minerals" className="py-20 md:py-28 relative border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Core Mineral Assets</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-5xl text-[var(--text-pure)] tracking-tight leading-tight mb-3">
              Flagship Industrial Minerals
            </h2>

            <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
              Mined directly from high-purity geological formations across Gujarat &amp; Rajasthan. Each lot is optically sorted, laboratory tested, and custom sized for global industrial manufacturing.
            </p>
          </div>

          <Link
            href="/products"
            className="btn-outline-white inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold shrink-0"
          >
            <span>Browse Full 8-Mineral Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Flagship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {flagships.map((mineral) => {
            const topAssay = mineral.assays[0];
            return (
              <div
                key={mineral.id}
                className="minimal-card rounded-2xl p-5 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Photo & Badges */}
                  <div className="relative aspect-[16/11] rounded-xl overflow-hidden mb-4 bg-black/10 border border-[var(--border-hairline)]">
                    <Image
                      src={mineral.heroImage}
                      alt={mineral.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-[var(--bg-canvas)]/90 backdrop-blur-md border border-[var(--border-hairline)] font-mono text-xs font-bold text-[var(--text-pure)] shadow-xs">
                      {mineral.formula}
                    </div>

                    {mineral.customProcessing && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-500/15 backdrop-blur-md border border-emerald-500/25 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                        Custom Cut
                      </div>
                    )}

                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                      <span>{mineral.origin.split(",")[0]}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">NABL Verified</span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display font-bold text-lg text-[var(--text-pure)] mb-1 group-hover:opacity-85 transition-opacity">
                    {mineral.name}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-4">
                    {mineral.tagline}
                  </p>

                  {/* Primary Assay Pill Strip */}
                  <div className="p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] mb-4">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-[var(--text-muted)] font-mono text-[11px] truncate">{topAssay.element.split("(")[0]}</span>
                      <strong className="font-mono text-xs font-bold text-[var(--text-pure)]">
                        {topAssay.value}{topAssay.unit}
                      </strong>
                    </div>
                    <div className="w-full h-1 bg-[var(--border-hairline)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--text-pure)] rounded-full"
                        style={{ width: `${Math.min(topAssay.value, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between gap-2">
                  <Link
                    href={`/products#${mineral.id}`}
                    className="text-xs font-semibold text-[var(--text-pure)] hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                  >
                    <span>Full Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleCalcClick(mineral.id)}
                    className="text-[11px] font-mono uppercase font-semibold text-[var(--text-muted)] hover:text-[var(--text-pure)] transition-colors cursor-pointer"
                  >
                    Freight RFQ →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Master Catalog Banner Invitation */}
        <div className="rounded-2xl bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] p-7 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Complete Mineral Portfolio</span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-pure)]">
              Need Sieve Curves &amp; Assays for All 8 Mineral Lines?
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Explore Limestone Calcite, Cement Laterite, Washing Silica Sand, and Ceramic Fluxes with comprehensive XRF chemistry tables, Tyler screen curves, and express sample kit dispatches.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/products"
              className="btn-solid-white w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Open Mineral Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact?sample=kit"
              className="btn-outline-white w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-medium text-center"
            >
              Request Lab Samples
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

