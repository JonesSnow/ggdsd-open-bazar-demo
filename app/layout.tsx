import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/src/components/layout/site-header";
import { SiteFooter } from "@/src/components/layout/site-footer";
import { PageCurtain } from "@/src/components/layout/page-curtain";
import { marketplaceService } from "@/src/services/marketplace";

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

function getConfiguredSiteUrl(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return undefined;

  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.hostname === "localhost") return url;
  } catch {
    return undefined;
  }

  return undefined;
}

const siteUrl = getConfiguredSiteUrl();
const socialImage = siteUrl
  ? new URL("/images/brand/og-image.svg", siteUrl).toString()
  : undefined;

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
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl?.toString(),
    siteName: "GGDSD Open Bazar",
    title: "GGDSD Open Bazar — Student Business Directory",
    description:
      "Discover student entrepreneurs, startups, alumni ventures and vendor stalls at GGDSD College.",
    images: socialImage
      ? [
          {
            url: socialImage,
            width: 1200,
            height: 630,
            alt: "GGDSD Open Bazar — Student Business Directory",
          },
        ]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "GGDSD Open Bazar",
    description:
      "Discover student entrepreneurs, startups, alumni ventures and vendor stalls at GGDSD College.",
    images: socialImage ? [socialImage] : undefined,
  },
  icons: {
    icon: "/images/brand/favicon.svg",
  },
  robots: {
    index: Boolean(siteUrl),
    follow: Boolean(siteUrl),
    googleBot: {
      index: Boolean(siteUrl),
      follow: Boolean(siteUrl),
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const announcementItems = await marketplaceService.listAnnouncements();

  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-paper-50 font-sans text-ink-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-1/2 focus:top-3 focus:z-toast focus:-translate-x-1/2 focus:rounded-lg focus:bg-pine-700 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lift"
        >
          Skip to main content
        </a>
        <PageCurtain />
        <SiteHeader announcementItems={announcementItems} />
        <main id="main-content" className="page-enter flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
