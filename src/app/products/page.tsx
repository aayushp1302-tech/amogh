"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import MineralCatalog from "@/components/MineralCatalog";
import ProcessingUnitsSection from "@/components/ProcessingUnitsSection";
import RfqCalculator from "@/components/RfqCalculator";
import LiveAssayTicker from "@/components/LiveAssayTicker";
import { Sparkles, FileDown, ShieldCheck, Mail, MessageSquare } from "lucide-react";

export default function ProductsPage() {
  const [selectedMineralForCalc, setSelectedMineralForCalc] = useState<string>("quartz-snow-white");

  const handleSelectProductForCalc = (productId: string) => {
    setSelectedMineralForCalc(productId);
    const calcEl = document.getElementById("calculator");
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* Page Hero Header */}
        <div className="pt-16 pb-12 bg-gradient-to-b from-[var(--bg-surface-elevated)] to-[var(--bg-canvas)] border-b border-[var(--border-hairline)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              <span>Technical Data & Chemical Assays</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[var(--text-pure)] tracking-tight mb-4">
              Industrial Minerals & Natural Stones
            </h1>

            <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
              Full technical specifications, chemical compositions, and particle sizing for Quartz, Feldspar, Bauxite, Bentonite, Limestone, Laterite, and Silica Sand.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5 bg-[var(--bg-surface)] px-3 py-1.5 rounded-lg border border-[var(--border-hairline)]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                NABL Laboratory Assay Included
              </span>
              <span className="flex items-center gap-1.5 bg-[var(--bg-surface)] px-3 py-1.5 rounded-lg border border-[var(--border-hairline)]">
                <FileDown className="w-4 h-4 text-[var(--text-muted)]" />
                TDS & Sieve Curves Available
              </span>
            </div>
          </div>
        </div>

        <LiveAssayTicker />

        {/* Master Filterable & Searchable Mineral Catalog */}
        <MineralCatalog onSelectProductForCalc={handleSelectProductForCalc} />

        {/* Processing Units & Refining Infrastructure */}
        <ProcessingUnitsSection />

        {/* Integrated Freight Calculator */}
        <RfqCalculator initialProductId={selectedMineralForCalc} />

        {/* Sample Request & Custom Sieve Section */}
        <div className="py-20 bg-[var(--bg-surface-elevated)] border-t border-[var(--border-hairline)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-pure)] mb-3">
                Need a Custom Mesh Fraction or Laboratory Sample?
              </h3>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
                We dispatch physical mineral specimens (1 kg to 5 kg sample bags) via express air courier for your laboratory verification and trial batch formulation.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact?sample=kit"
                  className="btn-solid-white inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold shadow-sm cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Request Mineral Sample Kit</span>
                </Link>

                <a
                  href="mailto:info@amoghsupply.com?subject=Custom%20Mesh%20%26%20Sample%20Request"
                  className="btn-outline-white inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4 opacity-70" />
                  <span>Email Technical Specification</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomBar />
    </div>
  );
}
