import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CursorSpotlight } from "@/components/effects/cursor-spotlight";

const sansDisplay = Inter({
  variable: "--font-sans-display",
  subsets: ["latin"],
  display: "swap",
});

const monoDisplay = JetBrains_Mono({
  variable: "--font-mono-display",
  subsets: ["latin"],
  display: "swap",
});

const displayGrotesk = Space_Grotesk({
  variable: "--font-display-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const SITE = {
  name: "Mr. Khatri",
  title: "Mr. Khatri · Software Engineer · Backend, Blockchain & AI Systems",
  description:
    "Full-stack software engineer building production backends (Python, .NET, Rust), blockchain protocols (EVM, Sui Move), and AI-powered agentic systems.",
  url: "https://khatri.dev",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s · Mr. Khatri",
  },
  description: SITE.description,
  keywords: [
    "Mr. Khatri",
    "Software Engineer",
    "Backend Engineer",
    "Python",
    "Django",
    ".NET",
    "Rust",
    "Distributed Systems",
    "PostgreSQL",
    "Blockchain Developer",
    "Smart Contract Engineer",
    "Solidity",
    "Sui Move",
    "DeFi",
    "AI Agents",
    "LLM Orchestration",
    "MCP",
  ],
  authors: [{ name: "Mr. Khatri" }],
  creator: "Mr. Khatri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: "@rsa2054",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mr. Khatri",
  jobTitle: "Software Engineer · Backend, Blockchain & AI Systems",
  description:
    "Software engineer with 7+ years of experience across scalable backends (Python, .NET, Rust), blockchain protocols (Solidity, Sui Move) and AI-powered agentic systems.",
  url: SITE.url,
  sameAs: [
    "https://github.com/rsa054",
    "https://www.linkedin.com/in/amit-k-6861261b1/",
    "https://x.com/rsa2054",
    "https://medium.com/@rsa054",
  ],
  knowsAbout: [
    "Python",
    "Django REST Framework",
    ".NET",
    "Rust",
    "Distributed Systems",
    "Solidity",
    "Sui Move",
    "DeFi Protocols",
    "Smart Contract Security",
    "AI Agentic Systems",
    "LLM Orchestration",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansDisplay.variable} ${monoDisplay.variable} ${displayGrotesk.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh noise selection:bg-[color:var(--accent-cyan-soft)] selection:text-white">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SmoothScrollProvider>
          <CursorSpotlight />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
