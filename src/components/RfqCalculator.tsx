"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calculator, 
  Truck, 
  Container, 
  Package, 
  MessageSquare, 
  Mail, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { AMOGH_PRODUCTS } from "@/data/minerals";

interface RfqCalculatorProps {
  initialProductId?: string;
}

export default function RfqCalculator({ initialProductId }: RfqCalculatorProps) {
  const [selectedMineralId, setSelectedMineralId] = useState<string>(
    initialProductId || AMOGH_PRODUCTS[0].id
  );
  const [quantityMt, setQuantityMt] = useState<number>(100);
  const [packagingType, setPackagingType] = useState<string>("jumbo-1250");
  const [incoterm, setIncoterm] = useState<string>("fob-mundra");
  const [destinationPort, setDestinationPort] = useState<string>("");

  const currentMineral =
    AMOGH_PRODUCTS.find((p) => p.id === selectedMineralId) || AMOGH_PRODUCTS[0];

  // Logistics & container estimations
  const containersCount = Math.max(1, Math.ceil(quantityMt / 27)); // ~27 MT per 20' FCL
  
  let packagingDescription = "";
  let unitsCount = 0;
  if (packagingType === "jumbo-1250") {
    unitsCount = Math.ceil(quantityMt / 1.25);
    packagingDescription = `${unitsCount.toLocaleString()} Jumbo Bags (1.25 MT with PE Liner)`;
  } else if (packagingType === "jumbo-1000") {
    unitsCount = Math.ceil(quantityMt / 1.0);
    packagingDescription = `${unitsCount.toLocaleString()} Jumbo Bags (1.0 MT with PE Liner)`;
  } else if (packagingType === "hdpe-50") {
    unitsCount = quantityMt * 20;
    packagingDescription = `${unitsCount.toLocaleString()} HDPE/PP Bags (50 kg)`;
  } else {
    unitsCount = Math.ceil(quantityMt / 35);
    packagingDescription = `${unitsCount} Bulk Tipper / Dumper Loads (~35 MT each)`;
  }

  let routeEstimate = "FOB Mundra Port, Gujarat (340 km • 12-14 hrs highway transit)";
  if (incoterm === "fob-kandla") {
    routeEstimate = "FOB Kandla / Deendayal Port (310 km • 11-13 hrs highway transit)";
  } else if (incoterm === "ex-works") {
    routeEstimate = "Ex-Works Dispatch: Himatnagar Yard, Gujarat (Ready in 48-72 hrs)";
  } else if (incoterm === "cif") {
    const dest = destinationPort.trim() || "Overseas Discharge Port";
    routeEstimate = `CIF Delivery to ${dest} (Container Stuffing via Mundra Port)`;
  }

  // Pre-formatted messages
  const rfqSummaryText = `*AMOGH SUPPLY - INDUSTRIAL MINERAL RFQ*
• Mineral: ${currentMineral.name} (${currentMineral.formula})
• Quantity: ${quantityMt} Metric Tonnes (MT)
• Packaging: ${packagingDescription}
• Estimated FCL: ${containersCount} x 20' Sea Containers
• Terms: ${incoterm.toUpperCase()}
• Destination: ${destinationPort || "To be confirmed"}
• Sourcing Hub: Himatnagar, Gujarat

Please confirm current spot price per MT and latest Certificate of Analysis (COA).`;

  const whatsappLink = `https://wa.me/919586978999?text=${encodeURIComponent(rfqSummaryText)}`;
  const mailtoLink = `mailto:info@amoghsupply.com?subject=${encodeURIComponent(
    `Formal RFQ: ${quantityMt} MT ${currentMineral.name}`
  )}&body=${encodeURIComponent(rfqSummaryText)}`;

  return (
    <section id="calculator" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            <span>Multimodal Shipping Configurator</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[var(--text-pure)] tracking-tight leading-tight mb-4">
            Freight & Container Calculator
          </h2>

          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            Estimate 20&apos; FCL container requirements, export bag counts, and road transit times from our Himatnagar logistics hub directly to Mundra or Kandla port.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] p-6 sm:p-10 lg:p-12 shadow-xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Form Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Mineral Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-semibold">
                  1. Select Mineral Line
                </label>
                <select
                  value={selectedMineralId}
                  onChange={(e) => setSelectedMineralId(e.target.value)}
                  className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-xl px-4 py-3 text-sm text-[var(--text-pure)] font-medium focus:outline-none focus:border-[var(--border-strong)] transition-colors"
                >
                  {AMOGH_PRODUCTS.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name} ({prod.formula}) — {prod.categoryLabel} {prod.customProcessing ? "★ Custom Cut" : ""}
                    </option>
                  ))}
                </select>
                {currentMineral.customProcessing && (
                  <p className="mt-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Custom manufacturing &amp; lump cutting available to client requirement.</span>
                  </p>
                )}
              </div>

              {/* Quantity Slider & Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] font-semibold">
                    2. Order Volume (Metric Tonnes)
                  </label>
                  <span className="font-mono text-base font-bold text-[var(--text-pure)]">
                    {quantityMt} MT
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="20"
                    max="2500"
                    step="10"
                    value={quantityMt}
                    onChange={(e) => setQuantityMt(Number(e.target.value))}
                    className="flex-1 h-2 bg-[var(--bg-surface-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--text-pure)]"
                  />
                  <input
                    type="number"
                    min="10"
                    max="10000"
                    value={quantityMt}
                    onChange={(e) => setQuantityMt(Math.max(10, Number(e.target.value)))}
                    className="w-28 bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-xl px-3 py-2 text-sm font-mono font-bold text-[var(--text-pure)] text-center focus:outline-none focus:border-[var(--border-strong)]"
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-[var(--text-muted)] mt-1">
                  <span>Min: 20 MT (1 FCL)</span>
                  <span>500 MT</span>
                  <span>Max: 2,500+ MT Vessel Rake</span>
                </div>
              </div>

              {/* Packaging Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-semibold">
                    3. Packaging Configuration
                  </label>
                  <select
                    value={packagingType}
                    onChange={(e) => setPackagingType(e.target.value)}
                    className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-xl px-4 py-3 text-sm text-[var(--text-pure)] focus:outline-none focus:border-[var(--border-strong)]"
                  >
                    <option value="jumbo-1250">1.25 MT Jumbo Bag (PE Liner)</option>
                    <option value="jumbo-1000">1.0 MT Jumbo Bag (Spout)</option>
                    <option value="hdpe-50">50 kg HDPE / PP Bags</option>
                    <option value="bulk-tipper">Loose Bulk in Tippers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-semibold">
                    4. Trade Incoterms
                  </label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value)}
                    className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-xl px-4 py-3 text-sm text-[var(--text-pure)] focus:outline-none focus:border-[var(--border-strong)]"
                  >
                    <option value="fob-mundra">FOB Mundra Port (Gujarat)</option>
                    <option value="fob-kandla">FOB Kandla / Deendayal Port</option>
                    <option value="cif">CIF Destination Sea Port</option>
                    <option value="ex-works">Ex-Works Himatnagar Yard</option>
                  </select>
                </div>
              </div>

              {/* Destination Port (Conditional) */}
              {incoterm === "cif" && (
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-semibold">
                    Destination Discharge Port & Country
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jebel Ali (UAE), Chittagong (BD), Genoa (IT)"
                    value={destinationPort}
                    onChange={(e) => setDestinationPort(e.target.value)}
                    className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-xl px-4 py-3 text-sm text-[var(--text-pure)] focus:outline-none focus:border-[var(--border-strong)]"
                  />
                </div>
              )}

            </div>

            {/* Right Column: Real-Time Results & Direct RFQ Dispatch */}
            <div className="lg:col-span-5 bg-[var(--bg-surface-elevated)] rounded-xl border border-[var(--border-hairline)] p-6 sm:p-7 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--border-hairline)]">
                  <h3 className="font-display font-semibold text-base text-[var(--text-pure)]">
                    Estimated Shipment Logistics
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-hairline)] font-medium">
                    Calculated
                  </span>
                </div>

                {/* Logistics Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-[var(--bg-surface)] p-3.5 rounded-xl border border-[var(--border-hairline)]">
                    <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-xs mb-1">
                      <Container className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                      <span>Sea Freight</span>
                    </div>
                    <div className="font-display font-bold text-2xl text-[var(--text-pure)]">
                      {containersCount} <span className="text-xs font-mono text-[var(--text-muted)]">x 20&apos; FCL</span>
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                      ~27 MT payload/container
                    </div>
                  </div>

                  <div className="bg-[var(--bg-surface)] p-3.5 rounded-xl border border-[var(--border-hairline)]">
                    <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-xs mb-1">
                      <Package className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                      <span>Units</span>
                    </div>
                    <div className="font-display font-bold text-2xl text-[var(--text-pure)]">
                      {unitsCount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5 truncate">
                      {packagingType.includes("jumbo") ? "Jumbo Bags" : packagingType.includes("50") ? "50kg Bags" : "Truckloads"}
                    </div>
                  </div>
                </div>

                {/* Transit Route Info */}
                <div className="bg-[var(--bg-surface)] p-3.5 rounded-xl border border-[var(--border-hairline)] space-y-2 mb-6 text-xs">
                  <div className="flex items-start gap-2 text-[var(--text-secondary)]">
                    <Truck className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{routeEstimate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-muted)] text-[11px] pt-1.5 border-t border-[var(--border-hairline)]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>ISPM-15 Heat Treated Export Palletization Standard</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <Link
                  href={`/contact?rfq=${encodeURIComponent(`${currentMineral.name} - ${quantityMt} MT (${incoterm})`)}`}
                  className="w-full btn-solid-white py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 text-center cursor-pointer shadow-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Submit Commercial RFQ</span>
                </Link>

                <a
                  href={mailtoLink}
                  className="w-full btn-outline-white py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-colors text-center cursor-pointer"
                >
                  <Mail className="w-4 h-4 opacity-70" />
                  <span>Send Email RFQ</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
