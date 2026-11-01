"use client";

import React from "react";
import { Activity } from "lucide-react";

export default function LiveAssayTicker() {
  const tickerItems = [
    { mineral: "Snow White Quartz", formula: "SiO₂", assay: "99.52% Purity", detail: "Fe₂O₃ < 0.018%" },
    { mineral: "Soda Feldspar", formula: "NaAlSi₃O₈", assay: "Na₂O 10.45%", detail: "Al₂O₃ 17.80%" },
    { mineral: "Industrial Bauxite", formula: "Al₂O₃·2H₂O", assay: "Al₂O₃ 48.60%", detail: "Reactive SiO₂ < 2.5%" },
    { mineral: "Sodium Bentonite", formula: "API 13A", assay: "Swelling > 30 mL", detail: "Yield > 90 bbl/ton" },
    { mineral: "Limestone Calcite", formula: "CaCO₃", assay: "CaO 53.40%", detail: "Whiteness L* > 96.5" },
    { mineral: "Industrial Laterite", formula: "Fe-Al Ore", assay: "Fe₂O₃ 44.80%", detail: "Al₂O₃ 20.40%" },
    { mineral: "Washed Silica Sand", formula: "Triple-Washed", assay: "SiO₂ 99.10%", detail: "Uniformity 1.4" },
    { mineral: "Export Dispatch Hub", formula: "Gujarat", assay: "Mundra 340 km", detail: "Kandla 310 km" },
  ];

  return (
    <div className="w-full bg-[var(--ticker-bg)] border-y border-[var(--ticker-border)] py-2.5 overflow-hidden select-none transition-colors">
      <div className="flex items-center">
        <div className="px-4 py-0.5 bg-[var(--bg-surface)] border-r border-[var(--border-hairline)] text-[var(--text-secondary)] text-xs font-mono font-medium tracking-wider uppercase flex items-center gap-2 shrink-0 z-10">
          <Activity className="w-3.5 h-3.5 text-[var(--text-pure)]" />
          <span>Assayed Lines</span>
        </div>

        <div className="overflow-hidden flex-1 relative">
          <div className="animate-continuous-ticker flex items-center gap-10 whitespace-nowrap">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
                <span className="font-medium text-[var(--text-pure)]">{item.mineral}</span>
                <span className="font-mono text-[11px] bg-[var(--bg-surface)] border border-[var(--border-hairline)] px-1.5 py-0.5 rounded text-[var(--text-secondary)]">
                  {item.formula}
                </span>
                <span className="font-mono font-semibold text-[var(--text-primary)]">{item.assay}</span>
                <span className="opacity-70 font-mono text-[11px]">({item.detail})</span>
                <span className="opacity-40 text-xs">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
