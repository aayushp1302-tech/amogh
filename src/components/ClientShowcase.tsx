"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeContext";

interface ClientLogo {
  id: string;
  name: string;
  category: string;
  lightLogo: string;
  darkLogo: string;
  imageClass: string;
}

const CLIENTS: ClientLogo[] = [
  {
    id: "ariane",
    name: "Ariane Fine Porcelain",
    category: "Fine Tableware & Chinaware",
    lightLogo: "/images/clients/ariane.png",
    darkLogo: "/images/clients/ariane-dark-clean.png",
    imageClass: "h-13 sm:h-15 w-auto object-contain transition-all duration-300 group-hover:scale-105",
  },
  {
    id: "motto",
    name: "Motto Group",
    category: "Vitrified Tiles & Slabs",
    lightLogo: "/images/clients/motto-dark-text.png",
    darkLogo: "/images/clients/motto-transparent.png",
    imageClass: "h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105",
  },
  {
    id: "safayar",
    name: "Safayar Quartz Stone",
    category: "Engineered Surfaces",
    lightLogo: "/images/clients/safayar-transparent.png",
    darkLogo: "/images/clients/safayar-dark.png",
    imageClass: "h-9 sm:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105",
  },
  {
    id: "astron",
    name: "Astron Group",
    category: "Paper & Packaging",
    lightLogo: "/images/clients/astron.png",
    darkLogo: "/images/clients/astron-dark.png",
    imageClass: "h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105",
  },
  {
    id: "shivam",
    name: "Shivam Minerals",
    category: "Mineral Beneficiation",
    lightLogo: "/images/clients/shivam.svg",
    darkLogo: "/images/clients/shivam-dark.svg",
    imageClass: "h-7.5 sm:h-8.5 w-auto object-contain transition-all duration-300 group-hover:scale-105",
  },
];

export default function ClientShowcase() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Guarantee light mode during SSR and whenever theme is light to prevent any white-on-white display
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section className="py-14 sm:py-20 bg-[var(--bg-surface-elevated)] border-y border-[var(--border-hairline)] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Understated Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-mono text-[11px] font-semibold tracking-widest text-[var(--text-muted)] uppercase mb-2">
            Trusted Supply Ecosystem
          </p>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-pure)] tracking-tight">
            Supplying India&apos;s Leading Ceramic, Porcelain & Stone Manufacturers
          </h3>
        </div>

        {/* Infinite Seamless Marquee of Logo Pods (Scales gracefully to any number of partner logos) */}
        <div className="relative w-full overflow-hidden">
          {/* Subtle gradient fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[var(--bg-surface-elevated)] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[var(--bg-surface-elevated)] to-transparent z-10" />

          <div className="animate-continuous-ticker flex items-stretch gap-4 sm:gap-6 w-max py-2">
            {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, idx) => {
              const logoSrc = isDark ? client.darkLogo : client.lightLogo;

              return (
                <div
                  key={`${client.id}-${idx}`}
                  className="group relative rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] hover:border-[var(--border-medium)] p-5 sm:p-6 flex flex-col items-center justify-between min-h-[135px] sm:min-h-[155px] w-[210px] sm:w-[245px] shrink-0 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-default select-none"
                  title={`${client.name} — ${client.category}`}
                >
                  {/* Dedicated Optical Logo Stage */}
                  <div className="relative w-full h-16 sm:h-20 flex items-center justify-center">
                    <Image
                      src={logoSrc}
                      alt={client.name}
                      width={180}
                      height={60}
                      className={client.imageClass}
                      priority={idx < 5}
                    />
                  </div>

                  {/* Subtitle labels */}
                  <div className="text-center mt-3 pt-2.5 border-t border-[var(--border-hairline)] w-full">
                    <p className="font-display font-semibold text-[11px] sm:text-xs text-[var(--text-pure)] truncate">
                      {client.name}
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)] mt-0.5 truncate">
                      {client.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Minimal Footnote */}
        <div className="text-center mt-8">
          <span className="font-mono text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider">
            Direct Mineral Dispatch to Ceramic & Industrial Clusters Across Morbi, Gujarat & Export Corridors
          </span>
        </div>

      </div>
    </section>
  );
}
