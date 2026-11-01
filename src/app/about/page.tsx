"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import ClientShowcase from "@/components/ClientShowcase";
import { 
  Building2, 
  Pickaxe, 
  Truck, 
  Anchor
} from "lucide-react";
import { AMOGH_COMPANY } from "@/data/minerals";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="pt-16 pb-16 bg-gradient-to-b from-[var(--bg-surface-elevated)] to-[var(--bg-canvas)] border-b border-[var(--border-hairline)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              <span>Corporate Profile & Origin</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[var(--text-pure)] tracking-tight mb-6 max-w-3xl">
              Rooted in Gujarat’s Premier Mineral Corridor
            </h1>

            <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
              Founded in 2021 in Himatnagar, Sabarkantha — Amogh Supply operates as a direct bridge between primary geological mine-heads and global industrial manufacturers.
            </p>
          </div>
        </div>

        {/* Corporate Story & Operations Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
              <div className="lg:col-span-6 space-y-6">
                <span className="font-mono text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  The Sourcing Philosophy
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-pure)]">
                  Direct Mine-Head Procurement with Zero Unverified Intermediaries
                </h2>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                  The global industrial minerals trade is frequently compromised by multi-tier brokers, uncalibrated batch mixing, and inaccurate chemical assay claims. Amogh Supply was established to replace ambiguity with strict geological provenance.
                </p>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                  Headquartered at <strong className="text-[var(--text-pure)] font-semibold">Tulsi Complex, Motipura, Himatnagar</strong>, our procurement teams supervise mine-head extraction across Sabarkantha, the Aravalli range, and coastal Gujarat deposits. Buyers are granted direct access to inspect raw lot stockpiles before processing and packing.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-sm">
                    <div className="font-display font-bold text-2xl text-[var(--text-pure)]">
                      2021
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">
                      Year Established in Gujarat
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-sm">
                    <div className="font-display font-bold text-2xl text-[var(--text-pure)]">
                      100%
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">
                      Mine-Head Lot Traceability
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo Showcase */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl overflow-hidden border border-[var(--border-hairline)] aspect-[4/3] shadow-xl">
                  <Image
                    src="/images/logistics.jpg"
                    alt="Amogh Supply Logistics Yard and Mundra Container Operations"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[var(--bg-surface)]/95 backdrop-blur-md border border-[var(--border-hairline)] shadow-lg">
                    <span className="font-mono text-xs text-[var(--text-primary)] font-semibold block mb-0.5">
                      Operational Logistics
                    </span>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Multi-modal bulk transport & container stuffing for Mundra & Kandla port export.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Sourcing Advantage */}
            <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] p-8 sm:p-12 mb-20 shadow-xl">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-pure)] mb-8 text-center">
                Geological & Geographic Advantages of Himatnagar
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] space-y-3">
                  <Pickaxe className="w-7 h-7 text-[var(--text-pure)]" />
                  <h4 className="font-display font-bold text-lg text-[var(--text-pure)]">
                    Aravalli Mineral Veins
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Sabarkantha sits adjacent to the ancient Aravalli range, known globally for high-silica crystalline quartz veins and high-alkali soda feldspar deposits with exceptionally low iron impurities.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] space-y-3">
                  <Truck className="w-7 h-7 text-[var(--text-pure)]" />
                  <h4 className="font-display font-bold text-lg text-[var(--text-pure)]">
                    Morbi Ceramic Proximity
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Just 190 km from the world-famous Morbi ceramic and vitrified tile cluster, allowing Amogh Supply to supply bulk daily dumper loads of calibrated feldspar, quartz powder, and limestone flux.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] space-y-3">
                  <Anchor className="w-7 h-7 text-[var(--text-pure)]" />
                  <h4 className="font-display font-bold text-lg text-[var(--text-pure)]">
                    Deep-Water Port Corridor
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Direct 4-lane highway access to Mundra Port (340 km) and Kandla Port (310 km), enabling seamless 20&apos; FCL stuffing, breakbulk vessel chartering, and fast international transit times.
                  </p>
                </div>
              </div>
            </div>

            {/* Company Coordinates Card */}
            <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
              <div>
                <span className="font-mono text-xs text-[var(--text-muted)] uppercase block mb-1 font-semibold">
                  Registered Headquarters
                </span>
                <h4 className="font-display font-bold text-xl text-[var(--text-pure)]">
                  AMOGH SUPPLY
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {AMOGH_COMPANY.address}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`tel:${AMOGH_COMPANY.phone}`}
                  className="btn-outline-white px-5 py-3 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Call: {AMOGH_COMPANY.phoneFormatted}
                </a>

                <a
                  href="/contact"
                  className="btn-solid-white px-5 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold cursor-pointer shadow-sm"
                >
                  Schedule Yard Visit
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Industrial Client Network */}
        <ClientShowcase />
      </main>

      <Footer />
      <MobileBottomBar />
    </div>
  );
}
