import type { Announcement, FooterSection, NavItem } from "@/src/types";

export const siteConfig = {
  name: "GGDSD Open Bazar",
  shortName: "Open Bazar",
  tagline: "The campus business directory",
  edition: "Open Bazaar 5.0",
  institution: "GGDSD College",
  institutionCity: "Chandigarh",
  council: "Institutions' Innovation Council",
  councilShort: "IIC",
  cell: "Startup Cell",
  demoNotice:
    "Frontend demonstration prototype. All listings, people, events and contacts are fictional placeholder data.",
};

/** Primary navigation — the public-facing IA. */
export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    description: "The Open Bazar story",
  },
  {
    label: "Explore Shops",
    href: "/explore-shops",
    description: "Every registered stall and venture",
  },
  {
    label: "Startups",
    href: "/startups",
    description: "Student, alumni and IIC ventures",
  },
  {
    label: "Bazar Stories",
    href: "/stories",
    description: "Sellers and visitors on the floor",
  },
  {
    label: "Seller form demo",
    href: "/register",
    description: "Join the bazar floor",
  },
  {
    label: "About Us",
    href: "/about",
    description: "GGDSD, the IIC and the Startup Cell",
  },
];

export const footerSections: FooterSection[] = [
  {
    title: "Explore",
    links: [
      { label: "Explore shops", href: "/explore-shops" },
      { label: "Startups", href: "/startups" },
      { label: "Categories", href: "/categories" },
      { label: "Featured listings", href: "/explore-shops?featured=1" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Seller form demo", href: "/register" },
      { label: "Bazar Stories", href: "/stories" },
      { label: "Community impact", href: "/about#impact" },
      { label: "Upcoming event", href: "/#event" },
    ],
  },
  {
    title: "Institution",
    links: [
      { label: "About GGDSD", href: "/about" },
      { label: "Innovation Council (IIC)", href: "/about#iic" },
      { label: "Startup Cell", href: "/about#startup-cell" },
      { label: "Contact & enquiries", href: "/contact" },
    ],
  },
];

/**
 * Demo-only announcements kept outside the ticker UI. Once backed by an API,
 * the public reader should return ordered active entries; authenticated admin
 * mutations can then create, edit, reorder, activate, and deactivate them.
 */
export const announcements: Announcement[] = [
  {
    id: "ann-1",
    text: "Open Bazaar 5.0 — event details to be announced",
    href: "/#event",
  },
  {
    id: "ann-2",
    text: "Browse sample student ventures",
    href: "/explore-shops",
  },
  {
    id: "ann-3",
    text: "Learn about GGDSD College IIC",
    href: "/about#iic",
  },
];

/**
 * Upcoming Open Bazar event.
 *
 * DEMO CONTENT — every field below is fictional placeholder
 * copy for the prototype. Replace with the real event details
 * (dates, venue, ticketing) before any institutional launch.
 */
export const upcomingEvent = {
  id: "open-bazaar-5",
  edition: "Open Bazaar 5.0",
  tagline: "Campus event details to be announced",
  dateLabel: "Date to be announced",
  venue: "Location to be announced",
  description:
    "Open Bazaar is designed as a place to explore campus ventures, browse stalls and discover student-made products and services. The date, location and programme will be shared once confirmed.",
  ctaPrimary: { label: "Browse sample stalls", href: "/explore-shops" },
  ctaSecondary: { label: "About the IIC", href: "/about#iic" },
} as const;

export const businessTypeLabels = {
  "student-entrepreneur": "Student Entrepreneur",
  startup: "Startup",
  "alumni-startup": "Alumni Startup",
  "independent-stall": "Independent Stall",
  "iic-associated": "IIC Associated",
} as const;

export const businessTypeDescriptions = {
  "student-entrepreneur": "Run by current students",
  startup: "Student-founded venture",
  "alumni-startup": "Founded by GGDSD alumni",
  "independent-stall": "Independent campus stall",
  "iic-associated": "Associated with the IIC",
} as const;

export const faqs = [
  {
    id: "faq-1",
    question: "Is Open Bazar a real marketplace?",
    answer:
      "This is a demonstration prototype of the directory experience. Listings, people and contacts are fictional placeholders. The production platform will connect directly with the IIC registration process.",
  },
  {
    id: "faq-2",
    question: "Who can list a business on Open Bazar?",
    answer:
      "Current students, alumni, and IIC-associated ventures. Independent campus stalls can register with a faculty or IIC coordinator referral. Listings are reviewed before they go live.",
  },
  {
    id: "faq-3",
    question: "How are reviews moderated?",
    answer:
      "Reviews are tied to verified interactions in the production version, and a moderation queue exists for reports. On this demo, all reviews are illustrative samples.",
  },
  {
    id: "faq-4",
    question: "What happens to my registration on the demo?",
    answer:
      "Nothing is stored or transmitted. The register form validates your entry locally and shows a confirmation — it is a front-end simulation for institutional review.",
  },
];
