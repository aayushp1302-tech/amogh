"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeContext";
import { ClientLogo, DEFAULT_CLIENTS, resolveWixMediaUrl } from "@/lib/wix-cms";

export default function ClientShowcase() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [clients, setClients] = useState<ClientLogo[]>(DEFAULT_CLIENTS);
  const [isWixLive, setIsWixLive] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Fetch dynamic client logos from Wix CMS API (via internal Next.js route)
    const fetchDynamicClients = async () => {
      try {
        const res = await fetch("/api/wix/clients", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.clients) && data.clients.length > 0) {
            setClients(data.clients);
            setIsWixLive(Boolean(data.isWixConnected));
          }
        }
      } catch {
        // Fallback gracefully to DEFAULT_CLIENTS if offline
      }
    };

    fetchDynamicClients();
  }, []);

  // Guarantee light mode during SSR and whenever theme is light to prevent any white-on-white display
  const isDark = mounted && resolvedTheme === "dark";

  // Build infinite ticker loop list
  const activeList = clients.length > 0 ? clients : DEFAULT_CLIENTS;
  const repeatCount = Math.max(3, Math.ceil(12 / activeList.length));
  const tickerItems = Array.from({ length: repeatCount }).flatMap(() => activeList);

  return (
    <section className="py-14 sm:py-20 bg-[var(--bg-surface-elevated)] border-y border-[var(--border-hairline)] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Understated Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">
            <span className={`w-1.5 h-1.5 rounded-full ${isWixLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
            <span>{isWixLive ? "Wix CMS Connected" : "Trusted Supply Ecosystem"}</span>
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-pure)] tracking-tight">
            Supplying India&apos;s Leading Ceramic, Porcelain &amp; Stone Manufacturers
          </h3>
        </div>

        {/* Infinite Seamless Marquee of Logo Pods */}
        <div className="relative w-full overflow-hidden">
          {/* Subtle gradient fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[var(--bg-surface-elevated)] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[var(--bg-surface-elevated)] to-transparent z-10" />

          <div className="animate-continuous-ticker flex items-stretch gap-4 sm:gap-6 w-max py-2">
            {tickerItems.map((client, idx) => {
              const rawLogoSrc = isDark ? client.darkLogo : client.lightLogo;
              const logoSrc = resolveWixMediaUrl(rawLogoSrc) || "/images/clients/shivam.svg";

              return (
                <div
                  key={`${client.id}-${idx}`}
                  className="group relative rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] hover:border-[var(--border-medium)] p-5 sm:p-6 flex flex-col items-center justify-between min-h-[135px] sm:min-h-[155px] w-[210px] sm:w-[245px] shrink-0 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-default select-none"
                  title={`${client.name} — ${client.category}`}
                >
                  {/* Dedicated Optical Logo Stage (Dynamic Target Div) */}
                  <div className="relative w-full h-16 sm:h-20 flex items-center justify-center">
                    <Image
                      src={logoSrc}
                      alt={client.name}
                      width={180}
                      height={60}
                      className={client.imageClass || "h-7.5 sm:h-8.5 w-auto object-contain transition-all duration-300 group-hover:scale-105"}
                      priority={idx < 5}
                      unoptimized={true}
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
            Direct Mineral Dispatch to Ceramic &amp; Industrial Clusters Across Morbi, Gujarat &amp; Export Corridors
          </span>
        </div>

      </div>
    </section>
  );
}
