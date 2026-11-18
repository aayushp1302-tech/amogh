"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  FlaskConical, 
  MapPin, 
  Eye, 
  FileCheck,
  Building2
} from "lucide-react";

export default function TrustVerification() {
  const pillars = [
    {
      icon: FlaskConical,
      title: "Certified Laboratory Assays",
      subtitle: "XRF & Spectroscopic Quantification",
      desc: "Every batch is analyzed for SiO₂, Al₂O₃, Fe₂O₃, and trace impurities down to parts-per-million precision. A batch-specific Certificate of Analysis (COA) is issued with every dispatch."
    },
    {
      icon: MapPin,
      title: "Direct Mine-Head Sourcing",
      subtitle: "Gujarat & Rajasthan Geological Belts",
      desc: "Zero intermediary traders. We source raw quartz, bauxite, and bentonite directly from verified mine heads in Sabarkantha and Saurashtra to guarantee lot traceability."
    },
    {
      icon: FileCheck,
      title: "Laser Particle Calibration",
      subtitle: "ISO 13320 Mesh Compliance",
      desc: "Particle size distributions (PSD) are calibrated through multi-deck screening and laser diffraction, ensuring exact fractions from coarse 16-mesh grits down to 500-mesh micro powders."
    },
    {
      icon: Eye,
      title: "In-Person Lot Inspection",
      subtitle: "Open Himatnagar Yard Audits",
      desc: "We invite your technical auditors and procurement teams to physically inspect raw mineral stacks, draw random core samples, and test moisture in Himatnagar prior to shipping."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[var(--bg-surface-elevated)] border-y border-[var(--border-hairline)] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            <span>Quality Verification</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[var(--text-pure)] tracking-tight leading-tight mb-4">
            Engineered Quality & Traceable Supply
          </h2>

          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            Industrial mineral contracts succeed on verifiable chemical consistency, not marketing promises. Discover the four pillars of Amogh Supply&apos;s quality architecture.
          </p>
        </div>

        {/* 4 Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="minimal-card p-6 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--text-pure)] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="font-mono text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1 block">
                    {pillar.subtitle}
                  </span>

                  <h3 className="font-display font-semibold text-base text-[var(--text-pure)] mb-2">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-3">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mine Inspection Visit Invitation Banner */}
        <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] p-7 sm:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
              <Building2 className="w-4 h-4 text-[var(--text-muted)]" />
              <span>Himatnagar Procurement & Processing Yard</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-[var(--text-pure)]">
              Schedule a Mine-Head Lot Inspection
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              We welcome institutional procurement managers, ceramic factory executives, and export buyers to visit our facility in Himatnagar, Gujarat. Inspect physical mineral stock, observe screening, and draw independent lab assay samples before finalizing your contract.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/contact"
              className="btn-solid-white w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold text-center cursor-pointer shadow-sm"
            >
              Book Inspection Visit
            </Link>

            <a
              href="tel:+917566512966"
              className="btn-outline-white w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-medium text-center transition-colors cursor-pointer"
            >
              Call Procurement Desk
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
