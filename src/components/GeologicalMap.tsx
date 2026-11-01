"use client";

import React from "react";
import { MapPin, Anchor, Compass, Truck } from "lucide-react";
import { AMOGH_COMPANY } from "@/data/minerals";

export default function GeologicalMap() {
  const mineralHubs = [
    { name: "Himatnagar Operations Hub", role: "Central Yard & Processing", coords: "23.5979° N, 72.9698° E", distance: "0 km" },
    { name: "Sabarkantha & Aravalli Belts", role: "High-Silica Quartz & Feldspar Veins", coords: "Aravalli Range", distance: "25 - 60 km" },
    { name: "Morbi Vitrified Cluster", role: "World's 2nd Largest Ceramic Hub", coords: "Saurashtra Highway", distance: "190 km" },
    { name: "Kutch Geological Basin", role: "Montmorillonite Bentonite Reserves", coords: "Western Gujarat", distance: "280 km" },
    { name: "Mundra Port Terminal", role: "Deep-Water Container Berth", coords: "Gulf of Kutch", distance: "340 km" },
    { name: "Kandla (Deendayal) Port", role: "Dry Bulk & Breakbulk Vessels", coords: "Kutch Highway", distance: "310 km" },
  ];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            <span>Strategic Mining Footprint</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[var(--text-pure)] tracking-tight leading-tight mb-4">
            Western India Mineral Corridors
          </h2>

          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            Headquartered in Himatnagar, Sabarkantha — positioned directly at the intersection of Gujarat’s rich mineral geology and express 4-lane export corridors to Mundra & Kandla sea ports.
          </p>
        </div>

        {/* Map Layout Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Coordinates Overview */}
          <div className="lg:col-span-5 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-hairline)] p-7 sm:p-9 space-y-7 shadow-xl">
            <div className="border-b border-[var(--border-hairline)] pb-5">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-1 font-semibold">
                Central Operations Headquarters
              </span>
              <h3 className="font-display font-bold text-2xl text-[var(--text-pure)]">
                {AMOGH_COMPANY.name}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-mono mt-2 leading-relaxed">
                {AMOGH_COMPANY.address}
              </p>
            </div>

            <div className="space-y-3.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                Major Export Shipping Routes
              </h4>
              {AMOGH_COMPANY.ports.map((port, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-hairline)] flex items-center justify-center">
                      <Anchor className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-xs text-[var(--text-pure)] leading-tight">
                        {port.name}
                      </h5>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono">
                        Highway Transit: {port.roadTime}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[var(--text-pure)] bg-[var(--bg-surface)] border border-[var(--border-hairline)] px-2.5 py-1 rounded">
                    {port.distance}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] text-xs text-[var(--text-secondary)] flex items-start gap-3">
              <Truck className="w-5 h-5 text-[var(--text-muted)] shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                Dedicated heavy tipper contracts ensure guaranteed 24 to 48-hour container stuffing and port gate-in for urgent export consignments.
              </span>
            </div>
          </div>

          {/* Sourcing Hubs Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mineralHubs.map((hub, idx) => (
              <div
                key={idx}
                className="minimal-card p-6 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--text-pure)]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[11px] text-[var(--text-primary)] bg-[var(--bg-surface-elevated)] px-2.5 py-1 rounded border border-[var(--border-hairline)] font-semibold">
                      {hub.distance}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-[var(--text-pure)] mb-1">
                    {hub.name}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] font-medium mb-3">
                    {hub.role}
                  </p>
                </div>

                <span className="text-[11px] font-mono text-[var(--text-muted)] pt-2 border-t border-[var(--border-hairline)] block">
                  {hub.coords}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
