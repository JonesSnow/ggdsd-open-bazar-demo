# Image Guide — GGDSD Open Bazar

This document is the source of truth for every image in the demo:
where it lives, where it appears, why it exists, and what should
replace it when the college supplies real assets.

**All artwork is currently demo/placeholder content.** It is
generated locally by `node scripts/generate-images.mjs` into
`public/images/` — the demo is fully self-contained and makes no
external image requests. When official GGDSD / IIC / Open Bazar
photography becomes available, drop the real files into the paths
below (matching the recommended dimensions) and the site will use
them with no code changes.

## Folder structure

```
public/images/
├── brand/          Logos, favicon, OG/social share card
├── hero/           Homepage hero backdrop
├── events/         Open Bazaar event artwork
├── campus/         Campus scenes (about, institutional sections)
├── categories/     Category tiles (directory, filters, categories pages)
└── vendors/        Business covers, galleries and product imagery
```

## Brand assets

| Image | File path | Appears | Purpose | Recommended size | Status |
|---|---|---|---|---|---|
| Favicon | `public/images/brand/favicon.svg` | Browser tab (via `app/layout.tsx` metadata) | Site icon — bazaar arch mark in pine/brass | 64×64 (SVG, scales) | Demo — replace with official IIC mark |
| OG / social card | `public/images/brand/og-image.svg` | Link previews (Facebook, LinkedIn, WhatsApp) | "Open Bazar" wordmark on pine with arch illustration | 1200×630 (1.91:1) | Demo — replace with official card |

## Hero

| Image | File path | Appears | Purpose | Recommended size | Status |
|---|---|---|---|---|---|
| Hero scene | `public/images/hero/hero-open-bazaar.svg` | Homepage hero, washed behind the listing collage | Editorial bazaar scene — arch, bunting, stalls | 1600×1000 (16:10) | Demo/stock illustration — replace with official campus photo |

## Events

| Image | File path | Appears | Purpose | Recommended size | Status |
|---|---|---|---|---|---|
| Open Bazaar 5.0 band | `public/images/events/open-bazaar-5.svg` | Homepage "Upcoming event" section | Event artwork — stage, bunting, crowd | 1600×900 (16:9) | Demo — replace with official event poster/photo |

## Campus

| Image | File path | Appears | Purpose | Recommended size | Status |
|---|---|---|---|---|---|
| Campus stalls | `public/images/campus/campus-stalls.svg` | About page, IIC section | Institutional scene — stall rows on campus | 1200×900 (4:3) | Demo/stock illustration — replace with official GGDSD campus photo |

## Categories

One canonical tile per category, used by the homepage category
showcase, category pages and directory filter counts.

| Image | File path | Appears | Purpose | Recommended size | Status |
|---|---|---|---|---|---|
| Fashion & Accessories | `public/images/categories/fashion-accessories.svg` | Category tile, `/categories/fashion-accessories` | Category visual | 1200×900 (4:3) | Demo illustration |
| Food & Beverages | `public/images/categories/food-beverages.svg` | Category tile, `/categories/food-beverages` | Category visual | 1200×900 (4:3) | Demo illustration |
| Gifts & Home Decor | `public/images/categories/gifts-home-decor.svg` | Category tile, `/categories/gifts-home-decor` | Category visual | 1200×900 (4:3) | Demo illustration |
| Personal Care & Skincare | `public/images/categories/personal-care-skincare.svg` | Category tile, `/categories/personal-care-skincare` | Category visual | 1200×900 (4:3) | Demo illustration |
| Stationery & Art | `public/images/categories/stationery-art.svg` | Category tile, `/categories/stationery-art` | Category visual | 1200×900 (4:3) | Demo illustration |
| Technology | `public/images/categories/technology.svg` | Category tile, `/categories/technology` | Category visual | 1200×900 (4:3) | Demo illustration |
| Photography & Videography | `public/images/categories/photography-videography.svg` | Category tile, `/categories/photography-videography` | Category visual | 1200×900 (4:3) | Demo illustration |
| Health & Fitness | `public/images/categories/health-fitness.svg` | Category tile, `/categories/health-fitness` | Category visual | 1200×900 (4:3) | Demo illustration |
| Education & Tutoring | `public/images/categories/education-tutoring.svg` | Category tile, `/categories/education-tutoring` | Category visual | 1200×900 (4:3) | Demo illustration |
| Event Services | `public/images/categories/event-services.svg` | Category tile, `/categories/event-services` | Category visual | 1200×900 (4:3) | Demo illustration |

## Vendors

Each fictional business maps to a category art slug plus a
deterministic variant (0–5). The same mapping produces:

- **Cover image** — `vendors/<slug>-<artVariant>.svg` (business cards, profile hero)
- **Gallery** — `vendors/<slug>-<artVariant+1..3>.svg` (profile gallery)
- **Product imagery** — `vendors/<slug>-<artVariant+index+1>.svg` (product cards)

Example: a fashion business with `artVariant: 2` uses
`vendors/fashion-accessories-2.svg` as its cover, `-3/-4/-5` in
its gallery, and `-4/-5/-0` for its first three products.

| Image | File path | Appears | Purpose | Recommended size | Status |
|---|---|---|---|---|---|
| Vendor cover / gallery / products | `public/images/vendors/<category-slug>-<0-5>.svg` | Business cards, listing profiles, product cards | Fictional vendor and product imagery | 1200×900 (4:3) | Demo illustration — replace with real vendor/product photos (4:3 covers, 1:1 optional for products) |

> **Replacing vendor imagery:** swap the generated SVG at a given
> path for a real photograph of the same name, or extend
> `src/utils/images.ts` to point at a photo folder. Covers render
> at 4:3; products currently share the 4:3 frame.

## Sourcing policy

1. **Official first** — GGDSD College / IIC / Open Bazaar public
   imagery for institutional sections (hero, about, event).
2. **Licensed stock** (Unsplash / Pexels) for fictional vendor and
   product cards.
3. No scraping of random sites; no identifiable private individuals
   without a release.
4. Keep the demo self-contained: assets are downloaded into
   `public/images/`, never hot-linked.

## Regenerating the demo artwork

```bash
node scripts/generate-images.mjs
```

The script is seeded and deterministic — it always produces the
same 75 SVG files. Delete `public/images/` subfolders first if you
want a clean regeneration.
