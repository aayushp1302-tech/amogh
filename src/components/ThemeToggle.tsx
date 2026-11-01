"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div
      className={`inline-flex items-center rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface-elevated)] p-1 transition-colors ${className}`}
      role="group"
      aria-label="Theme mode selector"
    >
      <button
        onClick={() => setTheme("light")}
        className={`px-2 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
          resolvedTheme === "light"
            ? "bg-[var(--bg-surface)] text-amber-600 dark:text-amber-400 shadow-sm font-semibold border border-[var(--border-hairline)]"
            : "text-[var(--text-muted)] hover:text-[var(--text-pure)] opacity-70 hover:opacity-100"
        }`}
        title="Switch to Light Mode"
        aria-label="Light mode"
      >
        <Sun className="w-3.5 h-3.5" />
        <span className="hidden sm:inline text-[11px]">Light</span>
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`px-2 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
          resolvedTheme === "dark"
            ? "bg-[var(--bg-surface)] text-[var(--text-pure)] shadow-sm font-semibold border border-[var(--border-hairline)]"
            : "text-[var(--text-muted)] hover:text-[var(--text-pure)] opacity-70 hover:opacity-100"
        }`}
        title="Switch to Dark Mode"
        aria-label="Dark mode"
      >
        <Moon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline text-[11px]">Dark</span>
      </button>
    </div>
  );
}
