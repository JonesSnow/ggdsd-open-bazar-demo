import type { Category } from "@/src/types";

export const categories: Category[] = [
  {
    id: "cat-fashion",
    name: "Fashion & Accessories",
    slug: "fashion-accessories",
    description: "Hand-block prints, upcycled denim, and handcrafted jewellery by student designers.",
    longDescription:
      "From hand-block printed scarves to restyled denim and studio jewellery, this corner of the bazar is run by student designers who sketch, draft and stitch between lectures. Every piece is made in small batches on campus.",
    artSlug: "fashion-accessories",
    featured: true,
    order: 1,
  },
  {
    id: "cat-food",
    name: "Food & Beverages",
    slug: "food-beverages",
    description: "Artisanal chai, small-batch bakes, homemade sauces and healthy meal boxes.",
    longDescription:
      "The aroma section of the bazar. Student-run chai carts, sourdough bakers, homemade sauce makers and tiffin services — everything here is cooked, brewed or baked by hand, usually the same morning you buy it.",
    artSlug: "food-beverages",
    featured: true,
    order: 2,
  },
  {
    id: "cat-gifts",
    name: "Gifts & Home Decor",
    slug: "gifts-home-decor",
    description: "Curated gift boxes, planters, candles and handmade decor for dorm rooms.",
    longDescription:
      "Thoughtful objects for rooms and people. Curated gift boxes, hand-poured candles, macramé planters and paper crafts — ideal for birthdays, festivals, or making your dorm feel slightly less like a dorm.",
    artSlug: "gifts-home-decor",
    featured: true,
    order: 3,
  },
  {
    id: "cat-care",
    name: "Personal Care & Skincare",
    slug: "personal-care-skincare",
    description: "Cold-process soaps, natural skincare and small-batch wellness products.",
    longDescription:
      "Gentle, honest products made in tiny batches. Cold-process soaps, botanical face oils and balms formulated by students who read the ingredient lists so you don't have to. Most recipes started as chemistry projects.",
    artSlug: "personal-care-skincare",
    featured: true,
    order: 4,
  },
  {
    id: "cat-stationery",
    name: "Stationery & Art",
    slug: "stationery-art",
    description: "Custom calligraphy, art prints, planners and paper goods made on campus.",
    longDescription:
      "Paper, ink and patience. Hand-lettered calligraphy commissions, riso-style art prints, stitched planners and custom illustrations — much of it produced in the fine arts studio between classes.",
    artSlug: "stationery-art",
    featured: false,
    order: 5,
  },
  {
    id: "cat-tech",
    name: "Technology",
    slug: "technology",
    description: "Custom PC builds, device repair, web services and digital products.",
    longDescription:
      "The fix-it and build-it counter. Alumni-run repair stalls, custom PC builds, student web studios and digital services — from portfolio sites to automation scripts, priced for a student budget.",
    artSlug: "technology",
    featured: false,
    order: 6,
  },
  {
    id: "cat-photo",
    name: "Photography & Videography",
    slug: "photography-videography",
    description: "Event coverage, portrait sessions and creative content production.",
    longDescription:
      "Campus stories, framed. Student photographers and editors offering event coverage, portrait sessions, reel edits and content packages for societies, fests and personal portfolios.",
    artSlug: "photography-videography",
    featured: false,
    order: 7,
  },
  {
    id: "cat-health",
    name: "Health & Fitness",
    slug: "health-fitness",
    description: "Yoga sessions, personal training and nutrition guidance by certified students.",
    longDescription:
      "Movement and recovery on campus. Certified student trainers and yoga instructors offering small-group sessions, personal training and practical nutrition guidance — booked by the pack or the semester.",
    artSlug: "health-fitness",
    featured: false,
    order: 8,
  },
  {
    id: "cat-education",
    name: "Education & Tutoring",
    slug: "education-tutoring",
    description: "Peer tutoring, skill workshops and language classes run by top students.",
    longDescription:
      "Learn from the person who just aced the course. Peer tutoring across core subjects, weekend skill workshops and language conversation circles — structured, affordable and run by students who've been there.",
    artSlug: "education-tutoring",
    featured: false,
    order: 9,
  },
  {
    id: "cat-events",
    name: "Event Services",
    slug: "event-services",
    description: "Decoration, sound, photography and planning for campus celebrations.",
    longDescription:
      "Make it memorable. Student crews offering decoration, sound, lighting and full planning for society events, farewells, birthdays and cultural nights — priced for campus budgets, built for campus crowds.",
    artSlug: "event-services",
    featured: false,
    order: 10,
  },
];

export const getCategoryById = (id: string): Category | undefined =>
  categories.find((category) => category.id === id);

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((category) => category.slug === slug);

export const getFeaturedCategories = (): Category[] =>
  categories
    .filter((category) => category.featured)
    .sort((a, b) => a.order - b.order);

export const getAllCategories = (): Category[] =>
  [...categories].sort((a, b) => a.order - b.order);
