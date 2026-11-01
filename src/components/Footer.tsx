"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  MessageSquare
} from "lucide-react";
import { AMOGH_COMPANY, AMOGH_PRODUCTS } from "@/data/minerals";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-surface-elevated)] border-t border-[var(--border-hairline)] pt-16 pb-24 md:pb-12 text-[var(--text-secondary)] text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[var(--border-hairline)]">
          
          {/* Brand & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative h-11 flex items-center">
                <Image
                  src="/images/amogh-logo.png"
                  alt="Amogh Supply - Industrial Minerals & Natural Stones"
                  width={180}
                  height={54}
                  className="h-10 w-auto object-contain dark:brightness-125 dark:contrast-110 drop-shadow-xs group-hover:scale-[1.02] transition-transform duration-200"
                />
              </div>
            </Link>

            <p className="text-[var(--text-secondary)] leading-relaxed text-xs">
              Direct-from-mine procurement, processing, and global export of high-purity industrial minerals. Based in Himatnagar, Gujarat — delivering certified chemical assays and calibrated particle distributions worldwide.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <Link
                href="/contact"
                className="btn-outline-white inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 opacity-80" />
                <span>Commercial Inquiry Desk</span>
              </Link>
            </div>
          </div>

          {/* Minerals Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-[var(--text-pure)] uppercase tracking-wider">
              Mineral Assortment
            </h4>
            <ul className="space-y-2">
              {AMOGH_PRODUCTS.slice(0, 6).map((prod) => (
                <li key={prod.id}>
                  <Link
                    href={`/products#${prod.id}`}
                    className="hover:text-[var(--text-pure)] transition-colors flex items-center justify-between"
                  >
                    <span>{prod.name}</span>
                    <span className="font-mono text-[11px] text-[var(--text-muted)]">{prod.formula}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Pages (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm text-[var(--text-pure)] uppercase tracking-wider">
              Company & QA
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[var(--text-pure)] transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[var(--text-pure)] transition-colors">
                  Technical Catalog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--text-pure)] transition-colors">
                  Mining Footprint
                </Link>
              </li>
              <li>
                <Link href="/quality" className="hover:text-[var(--text-pure)] transition-colors">
                  NABL Assays & Lab
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--text-pure)] transition-colors">
                  Mine Inspection Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Headquarters & Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-[var(--text-pure)] uppercase tracking-wider">
              Operational Office
            </h4>
            
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 text-[var(--text-secondary)]">
                <MapPin className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5" />
                <span className="leading-snug">{AMOGH_COMPANY.address}</span>
              </div>

              <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
                <Phone className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                <a href={`tel:${AMOGH_COMPANY.phone}`} className="hover:text-[var(--text-pure)] font-mono">
                  {AMOGH_COMPANY.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
                <Mail className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                <a href={`mailto:${AMOGH_COMPANY.email}`} className="hover:text-[var(--text-pure)] font-mono">
                  {AMOGH_COMPANY.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-[var(--text-muted)] text-[11px] pt-1">
                <Clock className="w-4 h-4 opacity-70 shrink-0" />
                <span>{AMOGH_COMPANY.operatingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Compliance & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[var(--text-muted)] text-[11px]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>NABL Assayed Chemical Purity • ISPM-15 Certified Export Pallets</span>
          </div>

          <div className="flex items-center gap-4">
            <span>© 2026 AMOGH SUPPLY. Himatnagar, Gujarat.</span>
            <span>All Rights Reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
