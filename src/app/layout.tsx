import React, { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import PageTopLoader from "@/components/PageTopLoader";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AMOGH SUPPLY | Premium Industrial Minerals & Natural Stones | Gujarat, India",
  description: "Direct-from-mine procurement of Quartz, Soda Feldspar, Bauxite, Laterite, Bentonite, Limestone & Silica Sand. Laboratory certified assays, precision mesh sizing, and global container export from Himatnagar, Gujarat.",
  keywords: [
    "Amogh Supply",
    "Quartz supplier India",
    "Snow White Quartz lumps",
    "Soda Feldspar Himatnagar",
    "Bauxite ore Gujarat",
    "API Bentonite clay",
    "Limestone Calcite powder",
    "Laterite cement grade",
    "Sabarkantha mining minerals",
    "Mundra port mineral export"
  ],
  authors: [{ name: "Amogh Supply" }],
  creator: "Amogh Supply",
  publisher: "Amogh Supply",
  metadataBase: new URL("https://www.amoghsupply.com"),
  openGraph: {
    title: "AMOGH SUPPLY | High-Purity Industrial Minerals & Direct Mine Sourcing",
    description: "Sourcing verified high-purity industrial minerals directly from Gujarat and Rajasthan's premier mining belts. 99.5% SiO₂ Quartz, 10.5% Na₂O Feldspar, Alumina Bauxite & API Bentonite.",
    url: "https://www.amoghsupply.com",
    siteName: "AMOGH SUPPLY",
    images: [
      {
        url: "/images/hero-mineral.jpg",
        width: 1200,
        height: 630,
        alt: "Amogh Supply Industrial Minerals"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#090b0e" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} ${syne.variable} ${jetbrainsMono.variable} antialiased scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('amogh_theme');
                  var isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches) || (saved === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  var root = document.documentElement;
                  if (isDark) {
                    root.classList.add('dark');
                    root.classList.remove('light');
                    root.setAttribute('data-theme', 'dark');
                    root.style.colorScheme = 'dark';
                  } else {
                    root.classList.remove('dark');
                    root.classList.add('light');
                    root.setAttribute('data-theme', 'light');
                    root.style.colorScheme = 'light';
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] font-sans selection:bg-[var(--text-pure)] selection:text-[var(--bg-canvas)] flex flex-col relative transition-colors duration-200">
        <ThemeProvider>
          <Suspense fallback={null}>
            <PageTopLoader />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
