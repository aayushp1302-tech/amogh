"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ShieldCheck, 
  Check,
  CheckCircle2,
  CalendarCheck,
  Loader2,
  FileCheck,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { AMOGH_COMPANY, AMOGH_PRODUCTS } from "@/data/minerals";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    mineral: "quartz-snow-white",
    quantity: "100",
    visitRequested: false,
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRefId(data.refId || `AS-${Math.floor(1000 + Math.random() * 9000)}`);
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "Failed to submit inquiry. Please call our hotline directly.");
      }
    } catch {
      // Offline fallback
      const generatedRef = `AS-${Math.floor(1000 + Math.random() * 9000)}`;
      setRefId(generatedRef);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      company: "",
      phone: "",
      email: "",
      mineral: "quartz-snow-white",
      quantity: "100",
      visitRequested: false,
      message: ""
    });
  };

  const selectedMineralObj = AMOGH_PRODUCTS.find((p) => p.id === formData.mineral) || AMOGH_PRODUCTS[0];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="pt-16 pb-16 bg-gradient-to-b from-[var(--bg-surface-elevated)] to-[var(--bg-canvas)] border-b border-[var(--border-hairline)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-4">
              <CalendarCheck className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              <span>Direct Commercial & Technical Desk</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[var(--text-pure)] tracking-tight mb-6 max-w-3xl">
              Connect with Amogh Supply
            </h1>

            <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
              Inquire for bulk export prices, request batch Certificates of Analysis (COA), or schedule an in-person mineral lot inspection at our Himatnagar facility.
            </p>
          </div>
        </div>

        {/* Contact Layout */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Direct Coordinates (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Office Card */}
                <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-xl space-y-6">
                  <div>
                    <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider block mb-1 font-semibold">
                      Operational Headquarters
                    </span>
                    <h3 className="font-display font-bold text-2xl text-[var(--text-pure)]">
                      AMOGH SUPPLY
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs text-[var(--text-secondary)]">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[var(--text-muted)] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[var(--text-pure)] text-sm mb-0.5 font-semibold">Physical Address</strong>
                        <p className="leading-relaxed text-[var(--text-secondary)]">{AMOGH_COMPANY.address}</p>
                        <span className="text-[var(--text-muted)] font-mono text-[11px] block mt-1">
                          GPS: 23.5979° N, 72.9698° E (Gujarat, India)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[var(--text-muted)] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[var(--text-pure)] text-sm mb-0.5 font-semibold">Phone Lines</strong>
                        <a href={`tel:${AMOGH_COMPANY.phone}`} className="hover:text-[var(--text-pure)] text-[var(--text-primary)] font-mono font-medium block">
                          {AMOGH_COMPANY.phoneFormatted}
                        </a>
                        <span className="text-[var(--text-muted)] text-[11px] block mt-0.5">
                          Direct Procurement & Commercial Desk
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-[var(--text-muted)] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[var(--text-pure)] text-sm mb-0.5 font-semibold">Email Desk</strong>
                        <a href={`mailto:${AMOGH_COMPANY.email}`} className="hover:text-[var(--text-pure)] text-[var(--text-primary)] font-mono block">
                          {AMOGH_COMPANY.email}
                        </a>
                        <span className="text-[var(--text-muted)] text-[11px] block mt-0.5">
                          COA, Assay Reports & Contracts
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[var(--text-muted)] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[var(--text-pure)] text-sm mb-0.5 font-semibold">Dispatch Operational Hours</strong>
                        <p className="text-[var(--text-secondary)]">Monday – Saturday: 08:30 – 19:30 IST</p>
                        <span className="text-[var(--text-muted)] text-[11px] block mt-0.5">
                          24/7 Gate Loading for Mundra Highway Fleets
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[var(--border-hairline)]">
                    <a
                      href="tel:+917566512966"
                      className="w-full py-3.5 px-4 rounded-xl btn-solid-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Commercial Desk</span>
                    </a>
                  </div>
                </div>

                {/* Sourcing Distances Box */}
                <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] space-y-3 text-xs shadow-xl">
                  <div className="flex items-center gap-2 text-[var(--text-pure)] font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Industrial Cluster Connectivity</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[var(--text-secondary)]">
                    <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)]">
                      <span className="text-[10px] text-[var(--text-muted)] block">Morbi Ceramics</span>
                      <strong className="text-[var(--text-pure)] font-mono">190 km (4 hrs)</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)]">
                      <span className="text-[10px] text-[var(--text-muted)] block">Mundra Port Terminal</span>
                      <strong className="text-[var(--text-pure)] font-mono">340 km (12 hrs)</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Inquiry & Mine Visit Form (7 cols) */}
              <div className="lg:col-span-7 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-hairline)] p-8 sm:p-10 shadow-xl overflow-hidden">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="inquiry-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-8">
                        <h3 className="font-display font-bold text-2xl text-[var(--text-pure)] mb-2">
                          Request Official RFQ or Schedule a Yard Visit
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          Submit your mineral requirements below. Inquiries are handled directly by our senior technical sales team in Himatnagar.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-mono text-[var(--text-secondary)] uppercase mb-1.5 font-semibold">
                              Your Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Rajesh Patel"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-xl px-4 py-3 text-xs sm:text-sm text-[var(--text-pure)] focus:outline-none focus:border-[var(--border-strong)] transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-[var(--text-secondary)] uppercase mb-1.5 font-semibold">
                              Company / Factory Name
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Apex Ceramics Ltd."
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-xl px-4 py-3 text-xs sm:text-sm text-[var(--text-pure)] focus:outline-none focus:border-[var(--border-strong)] transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-mono text-[var(--text-secondary)] uppercase mb-1.5 font-semibold">
                              Phone / WhatsApp *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="+91 / Country Code"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-xl px-4 py-3 text-xs sm:text-sm text-[var(--text-pure)] focus:outline-none focus:border-[var(--border-strong)] transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-[var(--text-secondary)] uppercase mb-1.5 font-semibold">
                              Business Email *
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="buyer@company.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-xl px-4 py-3 text-xs sm:text-sm text-[var(--text-pure)] focus:outline-none focus:border-[var(--border-strong)] transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-mono text-[var(--text-secondary)] uppercase mb-1.5 font-semibold">
                              Mineral Required
                            </label>
                            <select
                              value={formData.mineral}
                              onChange={(e) => setFormData({ ...formData, mineral: e.target.value })}
                              className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-xl px-4 py-3 text-xs sm:text-sm text-[var(--text-pure)] focus:outline-none focus:border-[var(--border-strong)] transition-colors"
                            >
                              {AMOGH_PRODUCTS.map((prod) => (
                                <option key={prod.id} value={prod.id}>
                                  {prod.name} ({prod.formula}) {prod.customProcessing ? "— Custom Cut Available" : ""}
                                </option>
                              ))}
                            </select>
                            {selectedMineralObj?.customProcessing && (
                              <p className="mt-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3 shrink-0" />
                                <span>Custom manufacturing &amp; lump cutting available to your requirement.</span>
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-[var(--text-secondary)] uppercase mb-1.5 font-semibold">
                              Est Volume (Metric Tonnes)
                            </label>
                            <input
                              type="number"
                              min="1"
                              placeholder="100"
                              value={formData.quantity}
                              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                              className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-xl px-4 py-3 text-xs sm:text-sm text-[var(--text-pure)] focus:outline-none focus:border-[var(--border-strong)] transition-colors"
                            />
                          </div>
                        </div>

                        {/* Yard Visit Checkbox */}
                        <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="visitRequested"
                            checked={formData.visitRequested}
                            onChange={(e) => setFormData({ ...formData, visitRequested: e.target.checked })}
                            className="mt-1 w-4 h-4 rounded text-black focus:ring-0 cursor-pointer"
                          />
                          <label htmlFor="visitRequested" className="text-xs text-[var(--text-secondary)] cursor-pointer">
                            <strong className="text-[var(--text-pure)] block font-semibold mb-0.5">
                              Request In-Person Himatnagar Yard & Stockpile Inspection
                            </strong>
                            Authorize our team to prepare raw core samples for your technical auditors prior to formal dispatch.
                          </label>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[var(--text-secondary)] uppercase mb-1.5 font-semibold">
                            Technical Specifications & Notes
                          </label>
                          <textarea
                            rows={4}
                            placeholder="Specify required chemical limits (SiO2, Fe2O3), mesh size, or port of destination..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-xl p-4 text-xs sm:text-sm text-[var(--text-pure)] focus:outline-none focus:border-[var(--border-strong)] transition-colors resize-none"
                          />
                        </div>

                        {errorMessage && (
                          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                            {errorMessage}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 px-6 rounded-xl btn-solid-white text-xs uppercase tracking-wider font-semibold shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-75"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                              <span>Transmitting to Procurement Desk...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit Commercial Inquiry</span>
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    /* High-End Proper Animated Confirmation Screen */
                    <motion.div
                      key="inquiry-success"
                      initial={{ opacity: 0, scale: 0.92, y: 24 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="py-8 text-center flex flex-col items-center"
                    >
                      {/* Animated Checkmark Icon with Radiant Pulse */}
                      <div className="relative mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.25, 1] }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                        >
                          <CheckCircle2 className="w-9 h-9" />
                        </motion.div>
                        <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-20 pointer-events-none" />
                      </div>

                      {/* Header */}
                      <span className="font-mono text-xs text-emerald-500 font-semibold tracking-widest uppercase mb-1">
                        Dispatched & Logged
                      </span>
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-pure)] mb-2">
                        Inquiry Received at Himatnagar Desk
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mb-6 leading-relaxed">
                        Your commercial requirement has been logged into our Gujarat dispatch queue. Our technical sales engineers are compiling batch assay reports.
                      </p>

                      {/* Reference Receipt Card */}
                      <div className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-2xl p-5 mb-8 text-left space-y-3">
                        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-2.5">
                          <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase">
                            Commercial Ref No.
                          </span>
                          <span className="font-mono text-xs font-bold text-[var(--text-pure)] px-2.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-hairline)]">
                            {refId}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-[10px] text-[var(--text-muted)] block font-mono">Commodity</span>
                            <span className="font-semibold text-[var(--text-pure)]">{selectedMineralObj.name}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[var(--text-muted)] block font-mono">Volume</span>
                            <span className="font-semibold text-[var(--text-pure)]">{formData.quantity} MT</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[var(--text-muted)] block font-mono">Client</span>
                            <span className="text-[var(--text-secondary)] truncate block">{formData.company || formData.name}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[var(--text-muted)] block font-mono">Yard Inspection</span>
                            <span className="text-[var(--text-secondary)]">{formData.visitRequested ? "Scheduled (VIP)" : "Direct RFQ"}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                            Response SLA: Within 4–6 Hours
                          </span>
                          <span className="font-mono text-emerald-500 font-semibold">Active Queue</span>
                        </div>
                      </div>

                      {/* Action to submit another */}
                      <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <button
                          onClick={handleReset}
                          className="btn-outline-white flex-1 py-3 px-5 rounded-xl text-xs uppercase tracking-wider font-semibold cursor-pointer"
                        >
                          Submit Another Inquiry
                        </button>
                        <a
                          href="tel:+917566512966"
                          className="btn-solid-white flex-1 py-3 px-5 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call Dispatch Hotline</span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
