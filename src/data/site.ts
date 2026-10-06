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
  domain: "openbazar.ggdsd.ac.in",
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
    href: "/directory",
    description: "Every registered stall and venture",
  },
  {
    label: "Startups",
    href: "/startups",
    description: "Student, alumni and IIC ventures",
  },
  {
    label: "Become Sellers",
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
      { label: "Explore shops", href: "/directory" },
      { label: "Startups", href: "/startups" },
      { label: "Categories", href: "/categories" },
      { label: "Featured listings", href: "/directory?featured=1" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Become a seller", href: "/register" },
      { label: "Testimonials", href: "/testimonials" },
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

export const announcements: Announcement[] = [
  {
    id: "ann-1",
    text: "Open Bazaar 5.0 — the annual campus edition is coming to the main lawn",
    href: "/#event",
  },
  {
    id: "ann-2",
    text: "New: peer tutoring listings now show verified department vetting",
  },
  {
    id: "ann-3",
    text: "IIC incubation center now accepting early-stage ideas",
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
  tagline: "The annual campus edition",
  dateLabel: "Date to be announced",
  venue: "Main Lawn · GGDSD College, Chandigarh",
  description:
    "One lawn, a hundred stalls. Open Bazaar 5.0 gathers every student venture, alumni startup and independent campus vendor for a full day of demos, live making, tasting counters and pitch corners — the largest student-run marketplace at GGDSD.",
  highlights: [
    "100+ student and alumni stalls across all ten categories",
    "Live product demos and make-it-yourself counters",
    "Pitch corner hosted by the Institutions' Innovation Council",
    "Food court featuring campus chefs and tiffin services",
    "Networking hour for founders, mentors and buyers",
  ],
  ctaPrimary: { label: "Register a stall", href: "/register" },
  ctaSecondary: { label: "Meet the IIC", href: "/about#iic" },
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
