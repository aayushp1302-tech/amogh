"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function PageTopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  };

  const startProgress = () => {
    clearAllTimers();
    setVisible(true);
    setProgress(15);

    // YouTube-style staggered acceleration
    timerRef.current.push(
      setTimeout(() => {
        setProgress(45);
      }, 80)
    );

    timerRef.current.push(
      setTimeout(() => {
        setProgress(75);
      }, 200)
    );

    timerRef.current.push(
      setTimeout(() => {
        setProgress(92);
      }, 350)
    );
  };

  const completeProgress = () => {
    clearAllTimers();
    setProgress(100);

    timerRef.current.push(
      setTimeout(() => {
        setVisible(false);
        timerRef.current.push(
          setTimeout(() => {
            setProgress(0);
          }, 200)
        );
      }, 250)
    );
  };

  // Trigger on route changes (pathname or search params)
  useEffect(() => {
    startProgress();
    const completeTimer = setTimeout(() => {
      completeProgress();
    }, 450);

    return () => {
      clearTimeout(completeTimer);
      clearAllTimers();
    };
  }, [pathname, searchParams]);

  // Intercept internal link clicks for immediate responsive tactile start (like YouTube)
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      // Check if it's an internal route link and not an anchor/hash on same page or external
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("/#") &&
        !href.startsWith("#") &&
        !target.getAttribute("target") &&
        href !== pathname
      ) {
        startProgress();
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, [pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease-out",
      }}
    >
      {/* Top progress bar track */}
      <div
        className="h-[3px] bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 relative"
        style={{
          width: `${progress}%`,
          transition: progress === 100 
            ? "width 0.15s ease-out" 
            : "width 0.35s cubic-bezier(0.1, 0.7, 0.1, 1)",
          boxShadow: "0 0 12px rgba(6, 182, 212, 0.8), 0 0 4px rgba(16, 185, 129, 0.6)",
        }}
      >
        {/* Glowing Head at the leading edge (YouTube effect) */}
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-r from-transparent via-white/70 to-white shadow-[0_0_8px_#ffffff] -translate-y-[1px] h-[5px] rounded-full" />
      </div>
    </div>
  );
}
