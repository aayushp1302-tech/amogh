"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, Mail, Compass, Calculator } from "lucide-react";

export default function MobileBottomBar() {
  const pathname = usePathname();
  const [justClicked, setJustClicked] = useState<string | null>(null);

  const handleCalcClick = (e: React.MouseEvent) => {
    setJustClicked("calc");
    if (pathname === "/") {
      e.preventDefault();
      const calcEl = document.getElementById("calculator");
      if (calcEl) {
        calcEl.scrollIntoView({ behavior: "smooth" });
        // Subtle momentary highlight flash on the calculator card
        calcEl.classList.add("ring-2", "ring-cyan-500", "ring-offset-2");
        setTimeout(() => {
          calcEl.classList.remove("ring-2", "ring-cyan-500", "ring-offset-2");
        }, 1200);
      }
    }
  };

  const navItems = [
    {
      id: "catalog",
      label: "Catalog",
      href: "/products",
      icon: Compass,
      isActive: pathname === "/products",
    },
    {
      id: "calc",
      label: "RFQ Calc",
      href: "/#calculator",
      icon: Calculator,
      onClick: handleCalcClick,
      isActive: false, // momentary or on hash
    },
    {
      id: "call",
      label: "Call Desk",
      href: "tel:+917566512966",
      icon: Phone,
      isExternal: true,
      isActive: false,
    },
    {
      id: "inquire",
      label: "Inquire",
      href: "/contact",
      icon: Mail,
      isActive: pathname === "/contact",
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-canvas)]/92 backdrop-blur-2xl border-t border-[var(--border-hairline)] px-3 py-2 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-xl transition-colors">
      <div className="grid grid-cols-4 gap-1.5 items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isCurrent = item.isActive || justClicked === item.id;

          const content = (
            <motion.div
              whileTap={{ scale: 0.86 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              onClick={() => {
                setJustClicked(item.id);
                setTimeout(() => setJustClicked(null), 600);
              }}
              className="relative flex flex-col items-center justify-center py-2 px-1 rounded-xl cursor-pointer select-none"
            >
              {/* Active Animated Sliding Indicator Pill */}
              {isCurrent && (
                <motion.div
                  layoutId="mobileBottomIndicator"
                  className="absolute inset-0 bg-[var(--text-pure)] rounded-xl shadow-sm"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}

              {/* Icon & Label */}
              <div
                className={`relative z-10 flex flex-col items-center justify-center transition-colors duration-200 ${
                  isCurrent
                    ? "text-[var(--bg-canvas)] font-bold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-pure)]"
                }`}
              >
                <motion.div
                  animate={isCurrent ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <Icon className="w-4 h-4 mb-0.5" />
                </motion.div>
                <span className="text-[10px] tracking-tight leading-none mt-0.5">
                  {item.label}
                </span>
              </div>
            </motion.div>
          );

          if (item.isExternal) {
            return (
              <a key={item.id} href={item.href} className="focus:outline-none">
                {content}
              </a>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={item.onClick}
              className="focus:outline-none"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
