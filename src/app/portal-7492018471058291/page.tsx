"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Layers,
  Sparkles,
  Database,
  KeyRound,
  ArrowRight,
  Sliders,
  Eye,
  LogOut,
  Copy,
  Check,
} from "lucide-react";
import { ClientLogo, resolveWixMediaUrl } from "@/lib/wix-cms";

interface WixTestResult {
  connected: boolean;
  status?: number;
  message: string;
  itemsFound?: number;
  error?: string;
}

export default function SecretPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [isWixConnected, setIsWixConnected] = useState<boolean>(false);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [source, setSource] = useState<string>("");

  const [testingWix, setTestingWix] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<WixTestResult | null>(null);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Check stored session
  useEffect(() => {
    const session = sessionStorage.getItem("amogh_portal_auth");
    if (session === "granted") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch current client data from Next.js Wix API
  const refreshData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/wix/clients", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setClients(data.clients || []);
        setIsWixConnected(Boolean(data.isWixConnected));
        setIsConfigured(Boolean(data.isConfigured));
        setSource(data.source || "default-fallback");
      }
    } catch (e) {
      console.error("Failed to load clients:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple secure PIN or passcode
    if (passcode === "7492018471058291" || passcode === "admin" || passcode === "amogh2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("amogh_portal_auth", "granted");
      setAuthError("");
    } else {
      setAuthError("Invalid access passcode. Please check and try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("amogh_portal_auth");
  };

  const handleTestWixConnection = async () => {
    setTestingWix(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/wix/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setTestResult(data);
      if (data.connected) {
        refreshData();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setTestResult({
        connected: false,
        message: `Connection attempt failed: ${msg}`,
      });
    } finally {
      setTestingWix(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // If not authenticated, render the secret lock screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[var(--bg-canvas)] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-2xl relative overflow-hidden">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-500 mb-3 border border-amber-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-display font-bold text-2xl text-[var(--text-pure)]">
              Amogh Wix CMS Console
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-mono">
              Portal Path: /portal-7492018471058291
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                Passcode / Secret PIN
              </label>
              <input
                type="password"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] focus:outline-none focus:border-amber-500 text-sm text-[var(--text-pure)] font-mono"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Wix CMS Console</span>
            </button>

            <p className="text-[11px] text-center text-[var(--text-muted)] pt-2">
              Default passcode: <code className="font-mono text-amber-500">7492018471058291</code> or <code className="font-mono text-amber-500">admin</code>
            </p>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-pure)] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Navbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-sm">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <Database className="w-4 h-4" />
              </span>
              <h1 className="font-display font-bold text-xl text-[var(--text-pure)]">
                Wix Headless CMS Integration Console
              </h1>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Decoupled Next.js Frontend &bull; Powered by Wix Content Collections
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-hairline)] hover:border-[var(--border-medium)] text-xs font-mono text-[var(--text-secondary)] flex items-center gap-1.5 transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Console</span>
            </button>
          </div>
        </div>

        {/* Status Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Connection Status */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-sm">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
              Wix Data API Status
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-3 h-3 rounded-full ${isWixConnected ? "bg-emerald-500 animate-pulse" : isConfigured ? "bg-amber-500" : "bg-zinc-500"}`} />
              <strong className="text-lg font-display font-bold text-[var(--text-pure)]">
                {isWixConnected ? "Connected to Wix CMS" : isConfigured ? "Keys Set (Check Site)" : "Demo Fallback Mode"}
              </strong>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              {isWixConnected
                ? "Live data sync active. Changes in Wix Dashboard update immediately."
                : "Serving verified default client logos. Set WIX_API_KEY and WIX_SITE_ID to enable live sync."}
            </p>
          </div>

          {/* Card 2: CMS Source */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-sm">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
              Active Logos Source
            </span>
            <div className="flex items-center gap-2 mt-1">
              <Layers className="w-5 h-5 text-cyan-500" />
              <strong className="text-lg font-mono font-bold text-[var(--text-pure)]">
                {source === "wix-cms" ? "Wix Collection: Clients" : "Built-in Defaults (5)"}
              </strong>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              Currently displaying {clients.length} active client logos in the ticker carousel.
            </p>
          </div>

          {/* Card 3: Backend Status */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-sm">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
              Architecture Status
            </span>
            <div className="flex items-center gap-2 mt-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <strong className="text-lg font-display font-bold text-[var(--text-pure)]">
                Pure Next.js + Wix
              </strong>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              Django backend removed. Zero external Python servers or SQLite databases needed!
            </p>
          </div>

        </div>

        {/* Live Wix Sync Diagnostic & Test Box */}
        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-display font-bold text-lg text-[var(--text-pure)] flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-500" />
                <span>Wix CMS API Connectivity Test</span>
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Test real-time authentication with Wix Data REST API v2 using current environment settings.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={refreshData}
                disabled={loading}
                className="px-3.5 py-2 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] hover:border-[var(--border-medium)] text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={handleTestWixConnection}
                disabled={testingWix}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testingWix ? "animate-spin" : ""}`} />
                <span>{testingWix ? "Testing Wix API..." : "Test Wix Connection"}</span>
              </button>
            </div>
          </div>

          {testResult && (
            <div
              className={`p-4 rounded-xl border text-xs ${
                testResult.connected
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                {testResult.connected ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
                <span>{testResult.connected ? "Connection Successful" : "Connection Test Failed"}</span>
              </div>
              <p className="leading-relaxed">{testResult.message}</p>
              {testResult.error && (
                <pre className="mt-2 p-2 rounded bg-black/40 font-mono text-[11px] overflow-x-auto">
                  {testResult.error}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Dynamic Logos Preview */}
        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-lg text-[var(--text-pure)] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-500" />
                <span>Active Dynamic Client Logos</span>
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                These are the logos rendered inside the dynamic div in the Client Showcase section.
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              {clients.length} Items Loaded
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((c, i) => {
              const previewSrc = resolveWixMediaUrl(c.lightLogo) || "/images/clients/shivam.svg";

              return (
                <div
                  key={c.id || i}
                  className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Active
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      Order: {c.order ?? i + 1}
                    </span>
                  </div>

                  {/* Target Div Preview */}
                  <div className="relative w-full h-16 sm:h-20 flex items-center justify-center bg-[var(--bg-surface)] rounded-lg p-2 border border-[var(--border-hairline)]">
                    <Image
                      src={previewSrc}
                      alt={c.name}
                      width={180}
                      height={60}
                      className={c.imageClass || "h-7.5 sm:h-8.5 w-auto object-contain transition-all duration-300 group-hover:scale-105"}
                      unoptimized={true}
                    />
                  </div>

                  <div>
                    <strong className="block font-display text-sm text-[var(--text-pure)] truncate">
                      {c.name}
                    </strong>
                    <span className="text-[11px] text-[var(--text-secondary)] truncate block">
                      {c.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wix CMS Setup Blueprint & Step-by-Step Instructions */}
        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-sm space-y-6">
          <div>
            <h2 className="font-display font-bold text-lg text-[var(--text-pure)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span>How Client Sets Up &amp; Manages Content in Wix CMS</span>
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Give these exact specifications to the client to set up their CMS in Wix Studio or Wix Dashboard:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            {/* Step 1: Collection Setup */}
            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] space-y-3">
              <div className="flex items-center justify-between">
                <strong className="font-display text-sm text-cyan-400">Step 1: Create Wix CMS Collection</strong>
                <span className="font-mono text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded">Collection ID</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                In Wix Dashboard &rarr; <strong>CMS</strong> &rarr; <strong>Your Collections</strong> &rarr; click <strong>&quot;Create Collection&quot;</strong>.
              </p>
              <div className="p-2.5 rounded bg-[var(--bg-surface)] border border-[var(--border-hairline)] flex items-center justify-between font-mono text-[11px]">
                <span>Collection Name: <strong className="text-cyan-400">Clients</strong></span>
                <button
                  onClick={() => copyToClipboard("Clients", "collection")}
                  className="p-1 hover:text-white"
                  title="Copy"
                >
                  {copiedField === "collection" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Step 2: Collection Fields */}
            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] space-y-3">
              <strong className="font-display text-sm text-cyan-400 block">Step 2: Add Fields in the Table</strong>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between border-b border-[var(--border-hairline)] pb-1">
                  <span className="text-[var(--text-pure)]">name (or title)</span>
                  <span className="text-[var(--text-muted)]">Text (e.g. Shivam Minerals)</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border-hairline)] pb-1">
                  <span className="text-[var(--text-pure)]">category</span>
                  <span className="text-[var(--text-muted)]">Text (e.g. Mineral Beneficiation)</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border-hairline)] pb-1">
                  <span className="text-[var(--text-pure)]">lightLogo</span>
                  <span className="text-[var(--text-muted)]">Image or URL (Wix Media)</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border-hairline)] pb-1">
                  <span className="text-[var(--text-pure)]">darkLogo</span>
                  <span className="text-[var(--text-muted)]">Image or URL (Wix Media)</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border-hairline)] pb-1">
                  <span className="text-[var(--text-pure)]">isActive</span>
                  <span className="text-[var(--text-muted)]">Boolean (Check to show, uncheck to hide)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-pure)]">order</span>
                  <span className="text-[var(--text-muted)]">Number (Display order 1, 2, 3...)</span>
                </div>
              </div>
            </div>

            {/* Step 3: API Key */}
            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] space-y-3">
              <strong className="font-display text-sm text-amber-400 block">Step 3: Generate Wix API Key</strong>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                In Wix Dashboard &rarr; <strong>Settings</strong> &rarr; <strong>API Keys</strong> &rarr; click <strong>Generate API Key</strong>. Give it read/write permissions for <strong>Wix Data</strong>.
              </p>
            </div>

            {/* Step 4: Environment Variables */}
            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] space-y-3">
              <strong className="font-display text-sm text-amber-400 block">Step 4: Add to .env.local</strong>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Add these values in your Next.js <code className="text-amber-400">.env.local</code>:
              </p>
              <pre className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-hairline)] font-mono text-[10px] text-zinc-300 overflow-x-auto">
{`WIX_API_KEY=your_wix_api_key_here
WIX_SITE_ID=your_wix_site_id_here
WIX_CLIENTS_COLLECTION_ID=Clients`}
              </pre>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
