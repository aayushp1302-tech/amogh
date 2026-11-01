"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Layers,
  FileText,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Filter,
  Scissors,
  ShieldCheck,
  X,
  Sliders,
  CheckCircle2
} from "lucide-react";
import { AMOGH_PRODUCTS, MineralProduct } from "@/data/minerals";
import AssaySpecDrawer from "./AssaySpecDrawer";

interface MineralCatalogProps {
  onSelectProductForCalc?: (productId: string) => void;
}

export default function MineralCatalog({ onSelectProductForCalc }: MineralCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeDrawerProduct, setActiveDrawerProduct] = useState<MineralProduct | null>(null);

  const categories = [
    { id: "all", label: "All Minerals & Stones", count: AMOGH_PRODUCTS.length },
    { id: "silica", label: "Silica & Quartz", count: AMOGH_PRODUCTS.filter(p => p.category === "silica").length },
    { id: "feldspar", label: "Feldspar & Flux", count: AMOGH_PRODUCTS.filter(p => p.category === "feldspar" || p.category === "flux").length },
    { id: "ores", label: "Bauxite & Laterite", count: AMOGH_PRODUCTS.filter(p => p.category === "ores").length },
    { id: "clays", label: "Bentonite Clays", count: AMOGH_PRODUCTS.filter(p => p.category === "clays").length },
    { id: "stones", label: "Natural Stones", count: AMOGH_PRODUCTS.filter(p => p.category === "stones").length },
  ];

  const filteredProducts = AMOGH_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "silica" && product.category === "silica") ||
      (selectedCategory === "feldspar" && (product.category === "feldspar" || product.category === "flux")) ||
      (selectedCategory === "ores" && product.category === "ores") ||
      (selectedCategory === "clays" && product.category === "clays") ||
      (selectedCategory === "stones" && product.category === "stones");

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.grades.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.applications.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleSelectForRfq = (productId: string) => {
    if (onSelectProductForCalc) {
      onSelectProductForCalc(productId);
    } else {
      const el = document.getElementById("calculator");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="catalog" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Filter Controls & Search Bar Bar */}
        <div className="bg-[var(--bg-surface)] p-4 sm:p-6 rounded-2xl border border-[var(--border-hairline)] shadow-xl mb-12 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 ${isSelected
                      ? "bg-[var(--text-pure)] text-[var(--bg-canvas)] border-[var(--text-pure)] font-semibold shadow-sm"
                      : "bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-pure)] border-[var(--border-hairline)]"
                      }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${isSelected
                      ? "bg-[var(--bg-canvas)]/20 text-current font-bold"
                      : "bg-[var(--bg-canvas)] text-[var(--text-muted)]"
                      }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search mineral, formula, grade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm text-[var(--text-pure)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--border-strong)] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-pure)] p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Results Counter Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border-hairline)] text-xs text-[var(--text-muted)] font-mono">
            <span>Showing {filteredProducts.length} of {AMOGH_PRODUCTS.length} technical mineral lines</span>
            <span className="hidden sm:inline">NABL Laboratory Chemical Assay &amp; Sieve Curves Attached</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const topAssay = product.assays[0];
              return (
                <motion.article
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] hover:border-[var(--border-medium)] shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Card Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/10">
                    <Image
                      src={product.heroImage}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent opacity-80" />

                    {/* Formula Pill Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[var(--bg-canvas)]/90 backdrop-blur-md border border-[var(--border-hairline)] font-mono text-xs font-bold text-[var(--text-pure)] shadow-xs">
                      {product.formula}
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[var(--bg-canvas)]/90 backdrop-blur-md border border-[var(--border-hairline)] text-[11px] font-medium text-[var(--text-secondary)] shadow-xs">
                      {product.categoryLabel}
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                      <span>{product.origin.split(",")[0]}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Lot Verified
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-display font-bold text-xl text-[var(--text-pure)] group-hover:opacity-85 transition-opacity">
                        {product.name}
                      </h3>
                      {product.customProcessing && (
                        <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 rounded-md font-semibold shrink-0">
                          Custom Cut
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-4">
                      {product.shortDesc}
                    </p>

                    {/* Custom Cut Tag */}
                    {product.customProcessing && (
                      <div className="mb-4 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <Scissors className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Custom sizing &amp; lump cutting to client spec</span>
                      </div>
                    )}

                    {/* Assay Progress Bar Strip */}
                    <div className="p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] mb-5">
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-[var(--text-secondary)] font-medium">{topAssay.element}</span>
                        <span className="font-mono font-bold text-[var(--text-pure)]">
                          {topAssay.value}{topAssay.unit}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--border-hairline)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--text-pure)] rounded-full"
                          style={{ width: `${Math.min(topAssay.value, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="mt-auto pt-4 border-t border-[var(--border-hairline)] grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setActiveDrawerProduct(product)}
                        className="btn-outline-white py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Inspect Assay</span>
                      </button>

                      <button
                        onClick={() => handleSelectForRfq(product.id)}
                        className="btn-solid-white py-2.5 px-3 rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>RFQ Quote</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-hairline)] p-8">
            <Layers className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3 opacity-60" />
            <h4 className="text-base font-semibold text-[var(--text-pure)] mb-1">
              No matching minerals found
            </h4>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto mb-4">
              We couldn&apos;t find any mineral matching &ldquo;{searchQuery}&rdquo;. Try clearing your search or switching categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="btn-outline-white text-xs px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Slide-over Specification Sheet Drawer */}
      <AssaySpecDrawer
        product={activeDrawerProduct}
        isOpen={Boolean(activeDrawerProduct)}
        onClose={() => setActiveDrawerProduct(null)}
        onSelectForRfq={handleSelectForRfq}
      />
    </section>
  );
}
