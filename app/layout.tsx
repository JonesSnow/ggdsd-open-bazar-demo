import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/src/components/layout/site-header";
import { SiteFooter } from "@/src/components/layout/site-footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "GGDSD Open Bazar — Student Business Directory",
    template: "%s | GGDSD Open Bazar",
  },
  description:
    "Discover student entrepreneurs, startups, alumni ventures and vendor stalls at GGDSD College, Chandigarh. A centralized business directory by the Institutions' Innovation Council (IIC).",
  keywords: [
    "GGDSD College",
    "Chandigarh",
    "student entrepreneurs",
    "startups",
    "alumni businesses",
    "business directory",
    "IIC",
    "Institutions Innovation Council",
    "student marketplace",
    "vendor stalls",
  ],
  authors: [{ name: "GGDSD College Institutions' Innovation Council" }],
  creator: "GGDSD College IIC",
  publisher: "GGDSD College",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://openbazar.ggdsd.ac.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "GGDSD Open Bazar",
    title: "GGDSD Open Bazar — Student Business Directory",
    description:
      "Discover student entrepreneurs, startups, alumni ventures and vendor stalls at GGDSD College.",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "GGDSD Open Bazar — Student Business Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GGDSD Open Bazar",
    description:
      "Discover student entrepreneurs, startups, alumni ventures and vendor stalls at GGDSD College.",
    images: ["/images/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#FBFAF7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-paper-50 font-sans text-ink-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-1/2 focus:top-3 focus:z-toast focus:-translate-x-1/2 focus:rounded-lg focus:bg-pine-700 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lift"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
