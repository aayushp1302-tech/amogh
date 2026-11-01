"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import { 
  ShieldCheck, 
  FileSpreadsheet,
  CheckCircle
} from "lucide-react";

export default function QualityPage() {
  const qualityProtocols = [
    {
      step: "01",
      title: "Geological Mine-Head Core Sampling",
      desc: "Before any block or bulk lump is excavated, geological core samples are drawn across different strata of the mine face to establish vein consistency and eliminate localized contamination."
    },
    {
      step: "02",
      title: "X-Ray Fluorescence (XRF) Spectroscopy",
      desc: "Quantitative elemental analysis confirms accurate percentages of SiO₂, Al₂O₃, Fe₂O₃, CaO, MgO, Na₂O, and K₂O down to parts-per-million limits. Samples with iron oxide exceeding tolerance are automatically rejected."
    },
    {
      step: "03",
      title: "Laser Particle Size Distribution (PSD)",
      desc: "Calibrated on ISO 13320 compliant laser diffraction particle analyzers to measure d10, d50, and d90 micron curves, guaranteeing precise mesh repeatability for engineered stone, ceramics, and paints."
    },
    {
      step: "04",
      title: "Loss on Ignition (LOI) & Moisture Testing",
      desc: "Gravimetric muffle furnace testing at 1,000°C determines total volatile matter, carbonates, and combined moisture, ensuring stable thermal behavior in high-temperature kilns and glass furnaces."
    },
    {
      step: "05",
      title: "Heavy-Duty Export Packaging & Liners",
      desc: "All powders and grains are bagged in UV-stabilized woven polypropylene bags with inner polyethylene heat-sealed liners to prevent ambient moisture absorption during ocean transit."
    },
    {
      step: "06",
      title: "Batch-Wise Certificate of Analysis (COA)",
      desc: "Every export consignment is sealed with unique lot numbers and accompanied by an official Certificate of Analysis matching the container seal numbers and shipping documents."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="pt-16 pb-16 bg-gradient-to-b from-[var(--bg-surface-elevated)] to-[var(--bg-canvas)] border-b border-[var(--border-hairline)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              <span>Analytical Chemistry & Inspection Standards</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[var(--text-pure)] tracking-tight mb-6 max-w-3xl">
              Laboratory Assays & Quality Architecture
            </h1>

            <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
              Industrial minerals must perform reliably inside automated manufacturing systems. Learn how Amogh Supply maintains rigorous analytical standards from quarry to port.
            </p>
          </div>
        </div>

        {/* 6 Step Protocol Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {qualityProtocols.map((protocol, idx) => (
                <div
                  key={idx}
                  className="minimal-card p-8 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-xs font-bold text-[var(--text-muted)] mb-4 flex items-center justify-between">
                      <span>PHASE {protocol.step}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-pure)]" />
                    </div>

                    <h3 className="font-display font-bold text-xl text-[var(--text-pure)] mb-3">
                      {protocol.title}
                    </h3>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {protocol.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Packaging & Standards Card */}
            <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] p-8 sm:p-12 mb-20 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="font-mono text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Export Packing Compliance
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-pure)]">
                    ISPM-15 Fumigated Pallets & Heavy-Duty Jumbo Bags
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    Ocean voyages subject minerals to high humidity and container condensation. Amogh Supply enforces multi-layer packaging standards:
                  </p>

                  <ul className="space-y-2.5 pt-2">
                    <li className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>1,000 kg & 1,250 kg UV-stabilized woven polypropylene Jumbo Bags with cross-corner lifting loops.</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Inner high-density polyethylene (HDPE) liner preventing moisture ingress.</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Heat-treated wooden pallets stamped with official ISPM-15 certification marks.</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Tight stretch-wrapping and polyester strapping to prevent shifting inside 20&apos; FCL containers.</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-5 bg-[var(--bg-surface-elevated)] p-6 rounded-xl border border-[var(--border-hairline)] space-y-4 text-xs">
                  <div className="flex items-center gap-2 text-[var(--text-pure)] font-display font-bold text-base">
                    <FileSpreadsheet className="w-5 h-5 text-[var(--text-muted)]" />
                    <span>Documentation Supplied</span>
                  </div>

                  <div className="space-y-2 text-[var(--text-secondary)]">
                    <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-hairline)] flex justify-between">
                      <span>Certificate of Analysis (COA)</span>
                      <strong className="text-[var(--text-pure)]">Batch-Specific</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-hairline)] flex justify-between">
                      <span>Particle Size Distribution (PSD)</span>
                      <strong className="text-[var(--text-pure)]">Laser Curve</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-hairline)] flex justify-between">
                      <span>ISPM-15 Fumigation Certificate</span>
                      <strong className="text-[var(--text-pure)]">Govt. Approved</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-hairline)] flex justify-between">
                      <span>Commercial Invoice & Packing List</span>
                      <strong className="text-[var(--text-pure)]">GST Verified</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mine Inspection CTA */}
            <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-center max-w-3xl mx-auto space-y-4 shadow-xl">
              <h3 className="font-display font-bold text-2xl text-[var(--text-pure)]">
                Inspect Lots at our Himatnagar Facility
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">
                Witness laboratory assay testing and sieve analysis in person. We provide full facility access to institutional clients and export inspectors.
              </p>
              <div className="pt-2">
                <a
                  href="/contact"
                  className="btn-solid-white inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold cursor-pointer shadow-sm"
                >
                  Schedule Technical Audit
                </a>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomBar />
    </div>
  );
}
