"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  CheckCircle2, 
  Package, 
  FileSpreadsheet, 
  Mail, 
  Layers,
  ArrowRight,
  Scissors,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { MineralProduct } from "@/data/minerals";

interface AssaySpecDrawerProps {
  product: MineralProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectForRfq: (productId: string) => void;
}

export default function AssaySpecDrawer({
  product,
  isOpen,
  onClose,
  onSelectForRfq,
}: AssaySpecDrawerProps) {
  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        />

        {/* Drawer Content */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 260 }}
          className="relative w-full max-w-2xl bg-[var(--bg-canvas)] border-l border-[var(--border-hairline)] shadow-2xl flex flex-col h-full z-10 overflow-y-auto transition-colors"
        >
          {/* Header */}
          <div className="sticky top-0 bg-[var(--bg-canvas)]/95 backdrop-blur-md border-b border-[var(--border-hairline)] p-6 flex items-start justify-between z-20 transition-colors">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] text-[var(--text-secondary)] text-xs font-mono font-semibold mb-2">
                <span>{product.formula}</span>
                <span>•</span>
                <span>{product.categoryLabel}</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-pure)] tracking-tight">
                {product.name}
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">
                Sourcing Origin: {product.origin}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--text-pure)] transition-colors cursor-pointer"
              aria-label="Close specification sheet"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-7 flex-1">
            {/* Visual & Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center bg-[var(--bg-surface)] p-4 sm:p-5 rounded-2xl border border-[var(--border-hairline)] shadow-sm">
              <div className="sm:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border-hairline)] bg-black/10">
                <Image
                  src={product.heroImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="sm:col-span-7 space-y-2">
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                  Material Overview
                </span>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {product.shortDesc}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.grades.map((grade, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-hairline)]">
                      {grade}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Manufacturing & Cutting Banner (When available for Quartz / Feldspar) */}
            {product.customProcessing && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[var(--bg-surface-elevated)] to-[var(--bg-surface)] border border-emerald-500/30 space-y-3 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--text-pure)] uppercase">
                    <Scissors className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Custom Manufacturing &amp; Cutting</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-semibold uppercase">
                    Cut &amp; Sized to Order
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-semibold text-sm text-[var(--text-pure)] mb-1">
                    {product.customProcessing.headline}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {product.customProcessing.summary}
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  {product.customProcessing.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chemical Assays Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-base text-[var(--text-pure)] flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Certified Chemical Assay Breakdown (XRF)</span>
                </h3>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                  NABL Laboratory Assay
                </span>
              </div>

              <div className="border border-[var(--border-hairline)] rounded-xl overflow-hidden bg-[var(--bg-surface)]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[var(--bg-surface-elevated)] border-b border-[var(--border-hairline)] font-mono text-[var(--text-muted)] uppercase text-[10px]">
                      <th className="py-2.5 px-4">Chemical Constituent</th>
                      <th className="py-2.5 px-4">Typical Content</th>
                      <th className="py-2.5 px-4">Guaranteed Limit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-hairline)]">
                    {product.assays.map((assay, idx) => (
                      <tr key={idx} className="hover:bg-[var(--bg-surface-elevated)]/50 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-[var(--text-pure)]">
                          {assay.element}
                        </td>
                        <td className="py-2.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {assay.value}{assay.unit}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-[var(--text-secondary)]">
                          {assay.minMax}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Physical Properties */}
            <div>
              <h3 className="font-display font-bold text-base text-[var(--text-pure)] flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-cyan-500" />
                <span>Physical &amp; Mineralogical Properties</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(product.physicalProperties).map(([key, val]) => {
                  const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
                  return (
                    <div key={key} className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)]">
                      <span className="block text-[10px] text-[var(--text-muted)] uppercase font-mono mb-0.5">{label}</span>
                      <span className="font-mono text-xs font-semibold text-[var(--text-pure)]">{val}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Industrial Applications */}
            <div>
              <h3 className="font-display font-bold text-base text-[var(--text-pure)] mb-3">
                Target Industrial Applications
              </h3>
              <ul className="grid grid-cols-1 gap-2">
                {product.applications.map((app, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-hairline)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Export Packaging & Logistics */}
            <div>
              <h3 className="font-display font-bold text-base text-[var(--text-pure)] flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-cyan-500" />
                <span>Standard Packaging Configurations</span>
              </h3>
              <div className="space-y-2">
                {product.packaging.map((pkg, idx) => (
                  <div key={idx} className="text-xs text-[var(--text-secondary)] p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-hairline)] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{pkg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Drawer Footer Actions */}
          <div className="sticky bottom-0 bg-[var(--bg-canvas)] border-t border-[var(--border-hairline)] p-5 flex flex-col sm:flex-row gap-3 z-20 transition-colors">
            <button
              onClick={() => {
                onClose();
                onSelectForRfq(product.id);
              }}
              className="flex-1 btn-outline-white py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Load in Freight Calc</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <Link
              href={`/contact?mineral=${encodeURIComponent(product.id)}`}
              className="flex-1 btn-solid-white py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Request TDS &amp; Sample</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
