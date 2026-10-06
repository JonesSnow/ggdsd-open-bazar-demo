import type { Announcement, FooterSection, NavItem } from "@/src/types";

export const siteConfig = {
  name: "GGDSD Open Bazar",
  shortName: "Open Bazar",
  tagline: "The campus business directory",
  institution: "GGDSD College",
  institutionCity: "Chandigarh",
  council: "Institutions' Innovation Council",
  cell: "Startup Cell",
  demoNotice:
    "Frontend demonstration prototype. All listings, people and contacts are fictional placeholder data.",
  domain: "openbazar.ggdsd.ac.in",
};

export const navItems: NavItem[] = [
  {
    label: "Directory",
    href: "/directory",
    description: "Browse every registered business",
  },
  {
    label: "Categories",
    href: "/categories",
    description: "Shop by what you're looking for",
  },
  {
    label: "About",
    href: "/about",
    description: "GGDSD, the IIC and the Startup Cell",
  },
  {
    label: "Testimonials",
    href: "/testimonials",
    description: "Stories from the community",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Enquiries and utilities",
  },
];

export const footerSections: FooterSection[] = [
  {
    title: "Explore",
    links: [
      { label: "Business directory", href: "/directory" },
      { label: "Categories", href: "/categories" },
      { label: "Featured listings", href: "/directory?featured=1" },
      { label: "Register your business", href: "/register" },
    ],
  },
  {
    title: "Institution",
    links: [
      { label: "About GGDSD", href: "/about" },
      { label: "Innovation Council (IIC)", href: "/about#iic" },
      { label: "Startup Cell", href: "/about#startup-cell" },
      { label: "Community impact", href: "/about#impact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact & enquiries", href: "/contact" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Demo admin panel", href: "/admin" },
      { label: "Site map", href: "/contact#site-map" },
    ],
  },
];

export const announcements: Announcement[] = [
  {
    id: "ann-1",
    text: "Annual campus fest registrations are open for vendor stalls",
    href: "/register",
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
