"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ArrowUpRight
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "/" },
    { label: "Mineral Catalog", href: "/products" },
    { label: "Mining Footprint", href: "/about" },
    { label: "Laboratory & QA", href: "/quality" },
    { label: "Mine Visit & Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Minimal Industrial Announcement Bar */}
      <div className="bg-[var(--bg-surface-elevated)] border-b border-[var(--border-hairline)] text-xs text-[var(--text-secondary)] py-2 px-4 hidden md:block transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-[var(--text-pure)]">Dispatch Active:</span>
              <span className="text-[var(--text-secondary)]">Himatnagar Hub, Gujarat</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-[var(--text-secondary)]">
              <MapPin className="w-3.5 h-3.5 opacity-70" />
              <span>Tulsi Complex, Motipura, Himatnagar (383001)</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="tel:+917566512966" 
              className="flex items-center gap-1.5 hover:text-[var(--text-pure)] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 opacity-70" />
              <span className="font-mono text-[var(--text-primary)] font-medium">+91 75665 12966</span>
            </a>
            <a 
              href="mailto:info@amoghsupply.com" 
              className="flex items-center gap-1.5 hover:text-[var(--text-pure)] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 opacity-70" />
              <span className="font-mono text-[var(--text-primary)]">info@amoghsupply.com</span>
            </a>
            <span className="opacity-30">|</span>
            <span className="font-mono text-[11px] text-[var(--text-secondary)] bg-[var(--bg-surface)] px-2.5 py-0.5 rounded border border-[var(--border-hairline)]">
              Mundra Port: 340 km
            </span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Header */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled 
            ? "glass-nav py-3 shadow-md" 
            : "bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo with Official Emblem */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative h-9 sm:h-10 flex items-center">
              <Image
                src="/images/amogh-logo.png"
                alt="Amogh Supply - Industrial Minerals"
                width={170}
                height={50}
                priority
                className="h-8 sm:h-9.5 w-auto object-contain dark:brightness-125 dark:contrast-110 drop-shadow-xs group-hover:scale-[1.02] transition-transform duration-200"
              />
            </div>
            <div className="hidden lg:flex flex-col border-l border-[var(--border-hairline)] pl-3 py-0.5">
              <span className="font-display font-semibold text-[11px] uppercase tracking-wider text-[var(--text-pure)] leading-none">
                Industrial Minerals
              </span>
              <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-wider uppercase mt-1">
                Direct Mines • Gujarat
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive 
                      ? "text-[var(--text-pure)] font-semibold" 
                      : "text-[var(--text-secondary)] hover:text-[var(--text-pure)]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--text-pure)] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/#calculator"
              className="text-xs font-semibold px-3.5 py-2 rounded-lg border border-[var(--border-hairline)] hover:border-[var(--border-medium)] text-[var(--text-secondary)] hover:text-[var(--text-pure)] transition-all bg-[var(--bg-surface)]"
            >
              Freight Calc
            </Link>
            <Link
              href="/contact"
              className="btn-solid-white inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm"
            >
              <span>Direct RFQ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Right Bar: Theme Toggle + Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--text-pure)] focus:outline-none cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay with 0.5s Smooth Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 md:hidden bg-[var(--bg-canvas)]/98 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-[var(--border-hairline)]">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
                  <Image
                    src="/images/amogh-logo.png"
                    alt="Amogh Supply Logo"
                    width={150}
                    height={44}
                    className="h-8 w-auto object-contain dark:brightness-125"
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[var(--text-muted)] hover:text-[var(--text-pure)] cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-2 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                      pathname === link.href 
                        ? "bg-[var(--bg-surface-elevated)] text-[var(--text-pure)] font-semibold border border-[var(--border-hairline)]" 
                        : "text-[var(--text-secondary)] hover:text-[var(--text-pure)] bg-[var(--bg-surface)]/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile Drawer Footer Contacts */}
            <div className="pt-6 border-t border-[var(--border-hairline)] space-y-4">
              <div className="flex flex-col gap-2 text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span>Tulsi Complex, Motipura, Himatnagar, Gujarat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span>+91 75665 12966</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span>info@amoghsupply.com</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:+917566512966"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--bg-surface-elevated)] text-[var(--text-pure)] font-medium text-sm border border-[var(--border-hairline)] cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Desk</span>
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-solid-white flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm shadow-md"
                >
                  <span>Request RFQ</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
