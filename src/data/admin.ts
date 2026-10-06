import type {
  AdminRegistration,
  AdminReviewReport,
  AdminStats,
  RegistrationMonthly,
} from "@/src/types";
import { businesses } from "./businesses";
import { categories } from "./categories";

export const adminStats: AdminStats = {
  totalBusinesses: businesses.length,
  pendingRegistrations: 7,
  featuredListings: businesses.filter((business) => business.featured).length,
  totalCategories: categories.length,
  totalReviews: businesses.reduce(
    (sum, business) => sum + business.reviewCount,
    0
  ),
  profileViews: 18420,
};

export const registrationMonthly: RegistrationMonthly[] = [
  { month: "Apr", count: 3 },
  { month: "May", count: 5 },
  { month: "Jun", count: 4 },
  { month: "Jul", count: 8 },
  { month: "Aug", count: 11 },
  { month: "Sep", count: 7 },
];

export const adminRegistrations: AdminRegistration[] = [
  {
    id: "reg-001",
    businessName: "Copper Kettle Coffee",
    applicantName: "Devansh Rana",
    applicantEmail: "devansh.rana@student.example.com",
    type: "independent-stall",
    category: "Food & Beverages",
    submittedAt: "2026-09-04",
    status: "pending",
    notes: "Applicant has attached a menu and hygiene certificate scan.",
  },
  {
    id: "reg-002",
    businessName: "Loom & Leaf",
    applicantName: "Tara Oberoi",
    applicantEmail: "tara.oberoi@student.example.com",
    type: "student-entrepreneur",
    category: "Personal Care & Skincare",
    submittedAt: "2026-09-03",
    status: "pending",
  },
  {
    id: "reg-003",
    businessName: "Fretboard Repairs",
    applicantName: "Arnav Verma",
    applicantEmail: "arnav.v@student.example.com",
    type: "student-entrepreneur",
    category: "Technology",
    submittedAt: "2026-09-02",
    status: "under-review",
    notes: "Confirm whether instrument repair falls under Technology or Event Services.",
  },
  {
    id: "reg-004",
    businessName: "Petal Press",
    applicantName: "Ishaan Kapoor",
    applicantEmail: "ishaan.k@student.example.com",
    type: "student-entrepreneur",
    category: "Stationery & Art",
    submittedAt: "2026-08-30",
    status: "approved",
  },
  {
    id: "reg-005",
    businessName: "Midnight Munchies",
    applicantName: "Sana Qureshi",
    applicantEmail: "sana.q@student.example.com",
    type: "independent-stall",
    category: "Food & Beverages",
    submittedAt: "2026-08-28",
    status: "pending",
    notes: "Late-night stall — needs hostel warden endorsement.",
  },
  {
    id: "reg-006",
    businessName: "Atlas Cartography",
    applicantName: "Rohan Das",
    applicantEmail: "rohan.das@student.example.com",
    type: "startup",
    category: "Technology",
    submittedAt: "2026-08-25",
    status: "under-review",
  },
  {
    id: "reg-007",
    businessName: "Woolgather Knits",
    applicantName: "Meher Singh",
    applicantEmail: "meher.s@student.example.com",
    type: "alumni-startup",
    category: "Fashion & Accessories",
    submittedAt: "2026-08-21",
    status: "approved",
  },
  {
    id: "reg-008",
    businessName: "Campus Cravings",
    applicantName: "Unknown applicant",
    applicantEmail: "campus.cravings@example.com",
    type: "independent-stall",
    category: "Food & Beverages",
    submittedAt: "2026-08-18",
    status: "rejected",
    notes: "Incomplete contact details; applicant asked to resubmit.",
  },
];

export const adminReviewReports: AdminReviewReport[] = [
  {
    id: "rep-001",
    businessName: "Chai Cartel",
    reviewer: "Anonymous visitor",
    rating: 1,
    excerpt:
      "Queue was long and my order was wrong. Very disappointed with the…",
    reason: "Suspected spam / unverified purchase",
    reportedAt: "2026-09-02",
    status: "pending",
  },
  {
    id: "rep-002",
    businessName: "Bytecraft Labs",
    reviewer: "Rahul S.",
    rating: 3,
    excerpt:
      "Quoted price changed after repair. Asked for the printed list and…",
    reason: "Pricing dispute",
    reportedAt: "2026-08-30",
    status: "pending",
  },
  {
    id: "rep-003",
    businessName: "Bunting & Beats",
    reviewer: "Event committee",
    rating: 2,
    excerpt:
      "Sound arrived 40 minutes late for our induction ceremony. The…",
    reason: "Service complaint",
    reportedAt: "2026-08-26",
    status: "resolved",
  },
  {
    id: "rep-004",
    businessName: "The Gifted Few",
    reviewer: "Ishani D.",
    rating: 5,
    excerpt:
      "The farewell box made her cry, then hug me, then complain I…",
    reason: "Duplicate review",
    reportedAt: "2026-08-20",
    status: "dismissed",
  },
];
