"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Factory, 
  Cpu, 
  FlaskConical, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  Layers,
  Sparkles,
  Building2
} from "lucide-react";

export default function ProcessingUnitsSection() {
  const quartzSpecs = [
    { property: "SiO₂ (Silicon Dioxide)", q1: "99.9% (± 0.2)", q2: "99.0% (± 0.25)", highlight: true },
    { property: "Al₂O₃ (Alumina)", q1: "0.2% (± 0.1)", q2: "0.4% (± 0.2)" },
    { property: "K₂O (Potassium Oxide)", q1: "0.001% (± 0.5)", q2: "0.10% (± 0.1)" },
    { property: "Na₂O (Sodium Oxide)", q1: "0.1% (± 0.1)", q2: "0.1% (± 0.5)" },
    { property: "Fe₂O₃ (Ferric Oxide)", q1: "0.01% max", q2: "0.04% (± 0.02)", highlight: true },
  ];

  const feldsparSpecs = [
    { formula: "SiO₂ (Silicon Dioxide)", range: "65.00 – 68.00%" },
    { formula: "Al₂O₃ (Alumina)", range: "18.00 – 20.00%" },
    { formula: "Fe₂O₃ (Ferric Oxide)", range: "0.15% max (Ultra-Low Iron)", highlight: true },
    { formula: "TiO₂ (Titanium Dioxide)", range: "0.10 – 0.15%" },
    { formula: "Na₂O (Sodium Oxide)", range: "9.00 – 11.00% (High Flux)", highlight: true },
    { formula: "K₂O (Potassium Oxide)", range: "1.00% max" },
    { formula: "CaO (Calcium Oxide)", range: "1.00% max" },
    { formula: "Whiteness (L* Value)", range: "78% min (Pristine White)", highlight: true },
  ];

  return (
    <section id="processing-units" className="py-20 md:py-28 bg-[var(--bg-canvas)] border-t border-[var(--border-hairline)] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-4">
            <Factory className="w-3.5 h-3.5 text-emerald-500" />
            <span>Industrial Infrastructure</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[var(--text-pure)] tracking-tight leading-tight mb-4">
            Processing &amp; Refining Units
          </h2>

          <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed">
            Our state-of-the-art Himatnagar milling facilities house high-capacity continuous ball mills, magnetic air classifiers, and optical sorters engineered for customized sizing and ultra-pure mineral specifications.
          </p>
        </div>

        {/* Facility Primary Banner */}
        <div className="mb-14 rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:h-[380px] bg-black/10 overflow-hidden">
              <img
                src="/images/hero-mineral.jpg"
                alt="Amogh Supply Processing Facility"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent opacity-80 lg:hidden" />
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-canvas)]/90 backdrop-blur-md border border-[var(--border-hairline)] text-xs font-mono font-semibold text-[var(--text-pure)]">
                <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Himatnagar Operational Hub, Gujarat</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 space-y-6">
              <div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                  Primary Infrastructure
                </span>
                <h3 className="font-display font-bold text-2xl text-[var(--text-pure)] mb-2">
                  Integrated Crushing, Milling &amp; Optical Sizing
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Equipped with ceramic-lined continuous ball mills that eliminate iron cross-contamination, ensuring pure snow-white brightness and custom grain distributions for quartz surfaces, glass, and vitrified tiles.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--border-hairline)]">
                <div className="p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] block uppercase">Monthly Capacity</span>
                  <strong className="text-sm sm:text-base font-bold font-mono text-[var(--text-pure)]">15,000+ MT</strong>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] block uppercase">Fe₂O₃ Control</span>
                  <strong className="text-sm sm:text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">&lt; 0.01% Iron</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Processing Units Grid (Quartz & Soda Feldspar) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* QUARTZ PROCESSING UNIT */}
          <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] text-xs font-mono font-semibold text-[var(--text-pure)]">
                  <Cpu className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Unit 01: Silica Refining</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                  SiO₂ &gt; 99.5%
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl text-[var(--text-pure)] mb-2">
                Quartz Processing Unit
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                Continuous high-alumina ball mill circuit and multi-stage air classification for manufacturing optical Snow White Quartz in custom cuts (25–150 mm lumps, calibrated grits, and 100–500 mesh micro powders).
              </p>

              {/* Chemical Properties of Quartz Table */}
              <div className="mb-6 rounded-xl overflow-hidden border border-[var(--border-hairline)] bg-[var(--bg-surface-elevated)]">
                <div className="px-4 py-2.5 bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)] flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[var(--text-pure)] uppercase">
                    Chemical Properties of Quartz
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">Certified Assay</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[var(--bg-surface)] border-b border-[var(--border-hairline)] text-[10px] font-mono uppercase text-[var(--text-muted)]">
                        <th className="py-2.5 px-3">Grade Constituent</th>
                        <th className="py-2.5 px-3 text-cyan-600 dark:text-cyan-400 font-bold">Grade Q1</th>
                        <th className="py-2.5 px-3 text-[var(--text-primary)]">Grade Q2</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-hairline)] font-mono text-[11px]">
                      {quartzSpecs.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[var(--bg-surface)]/60 transition-colors">
                          <td className="py-2 px-3 font-sans font-medium text-[var(--text-pure)]">{row.property}</td>
                          <td className={`py-2 px-3 ${row.highlight ? "text-cyan-600 dark:text-cyan-400 font-bold" : "text-[var(--text-secondary)]"}`}>{row.q1}</td>
                          <td className="py-2 px-3 text-[var(--text-secondary)]">{row.q2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Custom Cutting & Capability Highlights */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>Custom Cut Lumps &amp; Blocks manufactured to client dimensions</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>Calibrated mesh sizing: 16–30, 24–60, 30–80, and 100–500 mesh</span>
                </div>
              </div>
            </div>

            <Link
              href="/contact?mineral=quartz-snow-white"
              className="w-full py-3 px-4 rounded-xl btn-solid-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Inquire for Quartz Unit Lots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* SODA FELDSPAR PROCESSING UNIT */}
          <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] text-xs font-mono font-semibold text-[var(--text-pure)]">
                  <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Unit 02: Ceramic Flux Refining</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                  Na₂O &gt; 10.5%
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl text-[var(--text-pure)] mb-2">
                Soda Feldspar Processing Unit
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                Specialized jaw crushing, vibrating screening, and air-swept micro-grinding circuit. Tailored specifically for ceramic vitrification, sanitaryware, and container glass batch compounding.
              </p>

              {/* Chemical Properties of Soda Feldspar Table */}
              <div className="mb-6 rounded-xl overflow-hidden border border-[var(--border-hairline)] bg-[var(--bg-surface-elevated)]">
                <div className="px-4 py-2.5 bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)] flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[var(--text-pure)] uppercase">
                    Chemical Properties of Soda Feldspar
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">NABL Analyzed</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[var(--bg-surface)] border-b border-[var(--border-hairline)] text-[10px] font-mono uppercase text-[var(--text-muted)]">
                        <th className="py-2.5 px-3">Chemical Formula</th>
                        <th className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">Typical Range (%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-hairline)] font-mono text-[11px]">
                      {feldsparSpecs.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[var(--bg-surface)]/60 transition-colors">
                          <td className="py-2 px-3 font-sans font-medium text-[var(--text-pure)]">{row.formula}</td>
                          <td className={`py-2 px-3 ${row.highlight ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-[var(--text-secondary)]"}`}>{row.range}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Custom Sizing Highlights */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Custom sized lumps (10–120 mm) &amp; ceramic granulates (0.5–3 mm)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>200 &amp; 300 mesh fine ceramic powders with L* whiteness ≥ 78%</span>
                </div>
              </div>
            </div>

            <Link
              href="/contact?mineral=soda-feldspar"
              className="w-full py-3 px-4 rounded-xl btn-solid-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Inquire for Feldspar Unit Lots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

