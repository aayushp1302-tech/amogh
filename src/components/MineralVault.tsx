"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  FlaskConical, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  ShieldCheck, 
  Sliders, 
  Mail,
  Scissors,
  Ruler
} from "lucide-react";
import { AMOGH_PRODUCTS } from "@/data/minerals";

interface MineralVaultProps {
  onSelectForCalculator?: (productId: string) => void;
}

export default function MineralVault({ onSelectForCalculator }: MineralVaultProps) {
  const [activeMineralId, setActiveMineralId] = useState<string>("quartz-snow-white");
  const [activeMeshSize, setActiveMeshSize] = useState<string>("lumps");

  const currentMineral =
    AMOGH_PRODUCTS.find((p) => p.id === activeMineralId) || AMOGH_PRODUCTS[0];

  const meshOptions = [
    { id: "lumps", label: "Mine-Run Lumps (25-150mm)", desc: "Optically sorted bulk lumps for crushing & melting" },
    { id: "grits", label: "Calibrated Grits (16-30 Mesh)", desc: "Controlled granular distribution for casting & stone" },
    { id: "powder", label: "Micronized Powder (300-500 Mesh)", desc: "Ultra-fine fluid-bed milled filler with high surface area" },
  ];

  const handleCalculatorTrigger = (id: string) => {
    if (onSelectForCalculator) {
      onSelectForCalculator(id);
    } else {
      const el = document.getElementById("calculator");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const whatsappSampleUrl = `https://wa.me/919586978999?text=${encodeURIComponent(
    `Hello Amogh Supply, I would like to request an official physical laboratory sample kit for ${currentMineral.name} (${currentMineral.formula}) in ${activeMeshSize.toUpperCase()} grade.`
  )}`;

  return (
    <section id="vault" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            <span>The Mineral Catalog</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[var(--text-pure)] tracking-tight leading-tight mb-4">
            Mineral Specifications & Assays
          </h2>

          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            Select a raw mineral line below to examine laboratory chemical assays, physical parameters, and mesh sizing available directly from our Himatnagar facility.
          </p>
        </div>

        {/* Horizontal Mineral Selector Pill Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none justify-start lg:justify-center">
          {AMOGH_PRODUCTS.map((prod) => {
            const isSelected = prod.id === activeMineralId;
            return (
              <button
                key={prod.id}
                onClick={() => setActiveMineralId(prod.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-[var(--text-pure)] text-[var(--bg-canvas)] border-[var(--text-pure)] font-semibold shadow-md"
                    : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-pure)] border-[var(--border-hairline)] hover:border-[var(--border-medium)]"
                }`}
              >
                <span>{prod.name}</span>
                <span className={`font-mono text-[11px] px-1.5 py-0.2 rounded ${
                  isSelected 
                    ? "bg-[var(--bg-canvas)]/20 text-current font-bold" 
                    : "bg-[var(--bg-surface-elevated)] text-[var(--text-muted)]"
                }`}>
                  {prod.formula}
                </span>
                {prod.customProcessing && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold tracking-tight ${
                    isSelected
                      ? "bg-[var(--bg-canvas)] text-[var(--text-pure)]"
                      : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25"
                  }`}>
                    Custom Cut
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Grand Specimen Stage Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMineral.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] p-6 sm:p-9 lg:p-10 mb-16 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Macro Image Showcase & Particle Mesh Switcher */}
              <div className="lg:col-span-6 space-y-5">
                
                {/* Mineral Photo Card */}
                <div className="relative rounded-xl overflow-hidden border border-[var(--border-hairline)] bg-black/10 aspect-[4/3] shadow-lg group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentMineral.heroImage}
                    alt={`${currentMineral.name} Specimen - Amogh Supply`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-canvas)]/90 via-transparent to-transparent opacity-60" />

                  {/* Badges Over Image */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[var(--bg-surface)]/90 text-[var(--text-pure)] border border-[var(--border-hairline)] backdrop-blur-md">
                      {currentMineral.formula}
                    </span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded bg-[var(--bg-surface)]/90 text-[var(--text-secondary)] border border-[var(--border-hairline)] backdrop-blur-md">
                      {currentMineral.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[var(--bg-surface)]/95 backdrop-blur-md border border-[var(--border-hairline)] flex items-center justify-between text-xs shadow-md">
                    <div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] block">Sourcing Origin</span>
                      <strong className="text-[var(--text-pure)]">{currentMineral.origin}</strong>
                    </div>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Export Lot Ready
                    </span>
                  </div>
                </div>

                {/* Particle Sizing & Mesh Fraction Selector */}
                <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold">
                      <Sliders className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span>Calibrated Mesh & Fraction Selector</span>
                    </div>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">Tyler Screens</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    {meshOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setActiveMeshSize(opt.id)}
                        className={`p-2.5 rounded-lg text-left border transition-all cursor-pointer ${
                          activeMeshSize === opt.id
                            ? "bg-[var(--text-pure)] text-[var(--bg-canvas)] border-[var(--text-pure)] shadow-sm font-semibold"
                            : "bg-[var(--bg-surface)] border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--text-pure)]"
                        }`}
                      >
                        <span className="block text-xs leading-tight mb-0.5">
                          {opt.label.split("(")[0]}
                        </span>
                        <span className="block font-mono text-[10px] opacity-75">
                          {opt.label.includes("(") ? `(${opt.label.split("(")[1]}` : ""}
                        </span>
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] text-[var(--text-muted)] pt-1 leading-relaxed">
                    Selected: <strong className="text-[var(--text-primary)] font-medium">{meshOptions.find(o => o.id === activeMeshSize)?.desc}</strong>
                  </p>
                </div>

                {/* Custom Manufacturing & Cutting Banner for Quartz / Feldspar */}
                {currentMineral.customProcessing && (
                  <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--text-pure)] uppercase">
                        <Scissors className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Custom Processing</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold uppercase">
                        Cut &amp; Milled to Order
                      </span>
                    </div>

                    <div>
                      <h4 className="font-display font-semibold text-xs text-[var(--text-pure)] mb-1">
                        {currentMineral.customProcessing.headline}
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                        {currentMineral.customProcessing.summary}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {currentMineral.customProcessing.capabilities.map((cap, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-[var(--text-secondary)]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Chemical Assays, Physical Metrics & Commercial Desk */}
              <div className="lg:col-span-6 space-y-5">
                
                {/* Title & Tagline */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                      Grade Reference: {currentMineral.grades[0]}
                    </span>

                    {currentMineral.customProcessing && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                        <Scissors className="w-3 h-3" />
                        <span>Custom Sizing &amp; Cutting Available</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-pure)] tracking-tight">
                    {currentMineral.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-2">
                    {currentMineral.shortDesc}
                  </p>
                </div>

                {/* XRF Chemical Assay Table & Bars */}
                <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--text-pure)] uppercase">
                      <FlaskConical className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span>Certified Laboratory Assay (XRF)</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                      NABL Certified
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {currentMineral.assays.map((assay, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="text-[var(--text-secondary)] font-medium">{assay.element}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] text-[var(--text-muted)]">{assay.minMax}</span>
                            <span className="font-mono font-bold text-[var(--text-pure)] text-xs">
                              {assay.value}{assay.unit}
                            </span>
                          </div>
                        </div>
                        <div className="w-full h-1 bg-[var(--border-hairline)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[var(--text-pure)] rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(assay.value, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Physical Properties Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  {Object.entries(currentMineral.physicalProperties).slice(0, 4).map(([key, val]) => {
                    const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
                    return (
                      <div key={key} className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)]">
                        <span className="block text-[10px] text-[var(--text-muted)] mb-0.5">{label}</span>
                        <strong className="font-mono text-xs text-[var(--text-pure)]">{val}</strong>
                      </div>
                    );
                  })}
                </div>

                {/* Target Industrial Applications */}
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    Target Industrial Applications
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentMineral.applications.map((app, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-hairline)]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 opacity-60" />
                        <span>{app}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleCalculatorTrigger(currentMineral.id)}
                    className="flex-1 btn-solid-white py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Load in Freight Calc</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href={`/contact?mineral=${encodeURIComponent(currentMineral.id)}`}
                    className="flex-1 btn-outline-white py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 text-center"
                  >
                    <Mail className="w-3.5 h-3.5 opacity-70" />
                    <span>Request Sample Kit</span>
                  </Link>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Minimal Bento Gallery of All 8 Minerals */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-bold text-xl text-[var(--text-pure)]">
                All 8 Industrial Mineral Lines
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Click any card to load its laboratory assay above
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--text-secondary)] bg-[var(--bg-surface-elevated)] px-2.5 py-0.5 rounded border border-[var(--border-hairline)]">
              8 Lines Mined & Processed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AMOGH_PRODUCTS.map((prod) => {
              const isSelected = prod.id === activeMineralId;
              const topAssay = prod.assays[0];
              return (
                <div
                  key={prod.id}
                  onClick={() => {
                    setActiveMineralId(prod.id);
                    document.getElementById("vault")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`minimal-card p-4 rounded-xl cursor-pointer flex flex-col justify-between ${
                    isSelected ? "ring-2 ring-[var(--text-pure)]" : ""
                  }`}
                >
                  <div>
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-3 bg-black/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={prod.heroImage}
                        alt={prod.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-[var(--bg-surface)]/90 text-[var(--text-pure)] border border-[var(--border-hairline)] backdrop-blur-md">
                        {prod.formula}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-display font-semibold text-sm text-[var(--text-pure)] hover:opacity-80 transition-opacity">
                        {prod.name}
                      </h4>
                      {prod.customProcessing && (
                        <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 shrink-0">
                          Custom Cut
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-3">
                      {prod.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)] font-mono text-[11px]">
                      {topAssay.element.split("(")[1]?.replace(")", "") || topAssay.element}
                    </span>
                    <strong className="font-mono text-[var(--text-pure)]">
                      {topAssay.value}{topAssay.unit}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
