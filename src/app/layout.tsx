import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/nav/SiteNav";
import { Footer } from "@/components/site/Footer";
import { SITE_URL, profile } from "@/data/profile";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
  fallback: ["Iowan Old Style", "Palatino", "Georgia", "serif"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  fallback: ["SFMono-Regular", "Menlo", "monospace"],
});

const description =
  "Rajanee Shenkar — AI & Data Engineer in New York. LLM evaluation, agent tooling, data pipelines and GTM intelligence, with case studies on RagProbe, Market Radar, Playbook Forge and an MCP market-data agent.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rajanee Shenkar — AI & Data Engineer",
    template: "%s — Rajanee Shenkar",
  },
  description,
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: SITE_URL }],
  keywords: [
    "AI engineer",
    "data engineer",
    "LLM evaluation",
    "RAG",
    "MCP",
    "agent tooling",
    "data pipelines",
    "New York",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Rajanee Shenkar",
    title: "Rajanee Shenkar — AI & Data Engineer",
    description,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Rajanee Shenkar — systems that turn complex data into decisions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajanee Shenkar — AI & Data Engineer",
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF8F3" },
    { media: "(prefers-color-scheme: dark)", color: "#15141C" },
  ],
};

// Runs before first paint so the correct theme is painted once, with no flash.
const themeScript = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.theme=d?"dark":"light"}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="focus:bg-ink focus:text-ivory sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:px-4 focus:py-2 focus:font-mono focus:text-[0.75rem] focus:tracking-[0.08em] focus:uppercase"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
