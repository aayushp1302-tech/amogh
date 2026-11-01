"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LiveAssayTicker from "@/components/LiveAssayTicker";
import ClientShowcase from "@/components/ClientShowcase";
import FlagshipMinerals from "@/components/FlagshipMinerals";
import ProcessingUnitsSection from "@/components/ProcessingUnitsSection";
import RfqCalculator from "@/components/RfqCalculator";
import TrustVerification from "@/components/TrustVerification";
import GeologicalMap from "@/components/GeologicalMap";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";

export default function Home() {
  const [selectedMineralForCalc, setSelectedMineralForCalc] = useState<string>("quartz-snow-white");

  const handleSelectProductForCalc = (productId: string) => {
    setSelectedMineralForCalc(productId);
    const calcSection = document.getElementById("calculator");
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <LiveAssayTicker />
        <FlagshipMinerals onSelectForCalculator={handleSelectProductForCalc} />
        <ProcessingUnitsSection />
        <ClientShowcase />
        <TrustVerification />
        <RfqCalculator initialProductId={selectedMineralForCalc} />
        <GeologicalMap />
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
}
