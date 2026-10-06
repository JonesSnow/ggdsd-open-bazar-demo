import type { Testimonial } from "@/src/types";

export const testimonials: Testimonial[] = [
  {
    id: "tst-1",
    authorName: "Simran Kaur",
    authorRole: "Final-year student",
    authorBatch: "2026",
    content:
      "I started selling hand-painted cards from a hostel table. Open Bazar gave me a stall, a listing, and my first wholesale enquiry from a society — all in one semester.",
    rating: 5,
    businessId: "biz-paper-trails",
    featured: true,
    date: "2026-08-18",
  },
  {
    id: "tst-2",
    authorName: "Rohit Banerjee",
    authorRole: "Alumnus",
    authorBatch: "2022",
    content:
      "My repair stall was a word-of-mouth thing. Listing it here turned it into a proper appointment system. Half my customers now say they found me on the directory.",
    rating: 5,
    businessId: "biz-bytecraft",
    featured: true,
    date: "2026-07-22",
  },
  {
    id: "tst-3",
    authorName: "Aisha Begum",
    authorRole: "Student",
    authorBatch: "2027",
    content:
      "The peer tutoring section got me through organic chemistry. My tutor was a third-year who had aced the same paper. That kind of matching is rare.",
    rating: 5,
    businessId: "biz-mentor-mesh",
    featured: true,
    date: "2026-06-14",
  },
  {
    id: "tst-4",
    authorName: "Prof. Deepak Sharma",
    authorRole: "Faculty",
    content:
      "What I appreciate is the honesty of it — student-run stalls, real reviews, verified listings. It reads like what a campus marketplace should be.",
    rating: 5,
    featured: false,
    date: "2026-05-30",
  },
  {
    id: "tst-5",
    authorName: "Meera Krishnan",
    authorRole: "Alumna",
    authorBatch: "2024",
    content:
      "I found a farewell gift box, a calligrapher for our certificates, and a photographer — all before noon. The directory is genuinely useful, not decorative.",
    rating: 4,
    featured: false,
    date: "2026-04-19",
  },
  {
    id: "tst-6",
    authorName: "Yash Thakur",
    authorRole: "Student",
    authorBatch: "2028",
    content:
      "The chai stall listing told me about the seasonal specials. Rose cardheim in December is now a ritual. Small thing, big campus happiness.",
    rating: 5,
    businessId: "biz-chai-cartel",
    featured: false,
    date: "2026-08-02",
  },
  {
    id: "tst-7",
    authorName: "Ananya Rao",
    authorRole: "Student entrepreneur",
    authorBatch: "2027",
    content:
      "Registering took ten minutes and the verification badge within a week. My skincare stall's enquiries tripled. The IIC mentors helped me price properly.",
    rating: 5,
    businessId: "biz-botanica",
    featured: true,
    date: "2026-07-08",
  },
  {
    id: "tst-8",
    authorName: "Kabir Mehta",
    authorRole: "Student",
    authorBatch: "2026",
    content:
      "I needed a portrait session for internships and found a student photographer with a proper portfolio. Booked on Monday, shot on Friday.",
    rating: 4,
    businessId: "biz-frame-field",
    featured: false,
    date: "2026-06-25",
  },
];

export const getFeaturedTestimonials = (): Testimonial[] =>
  testimonials.filter((testimonial) => testimonial.featured);

export const getTestimonialsByBusiness = (businessId: string): Testimonial[] =>
  testimonials.filter((testimonial) => testimonial.businessId === businessId);
