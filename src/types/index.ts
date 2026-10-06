/* ── Core domain types for the Open Bazar demo ─────────────────────────
 *
 * The data layer is intentionally mock-only. Every resolver in `src/data`
 * returns plain arrays so a future API can swap in without touching UI.
 * ---------------------------------------------------------------------- */

export type BusinessType =
  | "student-entrepreneur"
  | "startup"
  | "alumni-startup"
  | "independent-stall"
  | "iic-associated";

export type BusinessStatus = "active" | "pending" | "featured" | "inactive";

export type OwnerRole = "student" | "alumni" | "faculty" | "external";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  artSlug: string;
  businessCount: number;
  featured: boolean;
  order: number;
}

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface BusinessHours {
  day: Weekday;
  open: string;
  close: string;
  closed: boolean;
}

export interface Location {
  id: string;
  name: string;
  building: string;
  floor?: string;
  room?: string;
  landmark?: string;
  coordinates?: { lat: number; lng: number };
  hours: BusinessHours[];
  accessibility: string[];
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: "INR";
  category: string;
  tags: string[];
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: "INR";
  duration: string;
  category: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
}

export interface Review {
  id: string;
  authorName: string;
  authorRole: "student" | "faculty" | "alumni" | "visitor";
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
}

export interface BusinessOwner {
  name: string;
  role: OwnerRole;
  batch?: string;
  course?: string;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  type: BusinessType;
  status: BusinessStatus;
  categoryIds: string[];
  locationId: string;
  owner: BusinessOwner;
  contact: {
    phone: string;
    email: string;
  };
  social: SocialLinks;
  artVariant: number;
  establishedYear: number;
  tags: string[];
  highlights: string[];
  products: Product[];
  services: Service[];
  reviews: Review[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string;
  authorBatch?: string;
  content: string;
  rating: number;
  businessId?: string;
  featured: boolean;
  date: string;
}

export interface Announcement {
  id: string;
  text: string;
  href?: string;
}

export interface SearchFilters {
  query?: string;
  categoryIds?: string[];
  types?: BusinessType[];
  minRating?: number;
  locationId?: string;
  verifiedOnly?: boolean;
  openNow?: boolean;
}

export type SortKey = "name" | "rating" | "reviews" | "newest" | "oldest";

export interface DirectoryQuery {
  filters: SearchFilters;
  sort: SortKey;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

/* ── Admin demo types ─────────────────────────────────────────────────── */

export interface AdminStats {
  totalBusinesses: number;
  pendingRegistrations: number;
  featuredListings: number;
  totalCategories: number;
  totalReviews: number;
  profileViews: number;
}

export interface AdminRegistration {
  id: string;
  businessName: string;
  applicantName: string;
  applicantEmail: string;
  type: BusinessType;
  category: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected" | "under-review";
  notes?: string;
}

export interface AdminReviewReport {
  id: string;
  businessName: string;
  reviewer: string;
  rating: number;
  excerpt: string;
  reason: string;
  reportedAt: string;
  status: "pending" | "resolved" | "dismissed";
}

export interface RegistrationMonthly {
  month: string;
  count: number;
}
