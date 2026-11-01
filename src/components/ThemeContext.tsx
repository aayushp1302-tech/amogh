"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "system" | "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  const applyTheme = (targetTheme: Theme) => {
    if (typeof window === "undefined") return;

    const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark =
      targetTheme === "dark" ||
      (targetTheme === "system" && systemIsDark);

    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
      document.body.style.backgroundColor = "#090b0e";
      document.body.style.color = "#f1f5f9";
      setResolvedTheme("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.setAttribute("data-theme", "light");
      root.style.colorScheme = "light";
      document.body.style.backgroundColor = "#f8fafc";
      document.body.style.color = "#0f172a";
      setResolvedTheme("light");
    }
  };

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("amogh_theme") as Theme) || "system";
    setThemeState(savedTheme);
    applyTheme(savedTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const current = (localStorage.getItem("amogh_theme") as Theme) || "system";
      if (current === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("amogh_theme", newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "system" as Theme,
      resolvedTheme: "dark" as "dark" | "light",
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
}
