# GGDSD Open Bazar

An App Router directory for student, alumni and campus businesses. The current
site is a polished demo backed by local TypeScript data; it does not connect to
a live marketplace backend.

## Project structure

- `app/` contains server-rendered routes and metadata.
- `src/components/` contains shared route, business, layout and UI components.
- `src/types/` defines the marketplace domain types.
- `src/services/marketplace.ts` defines the async `MarketplaceReader` boundary
  used by public routes. `demoMarketplaceService` currently adapts the local
  records in `src/data/`.
- `src/hooks/` and `src/utils/` contain browser subscriptions and shared logic.

The app uses Next.js 16, React 19, TypeScript and Tailwind CSS 4. Public route
components retrieve listing/category records through the async service and pass
data into interactive client components. Some small presentation lookups
(including category/location labels and artwork mappings) still use local demo
catalogs and need to be passed through the service when replacing those catalogs.

## Public routes

- `/` — homepage and rotating business showcase
- `/explore-shops` — searchable and filterable public listings
- `/explore-shops/[slug]` — business details
- `/categories` and `/categories/[slug]` — category directory and listings
- `/startups`, `/stories`, `/about`, `/contact` and `/register` — supporting
  pages
- `/directory` and `/directory/[slug]` — redirects retained for old links

The admin pages and all example listings are demo content. No real registration,
review, order, payment or seller-dashboard workflow is connected.

## Motion and accessibility

The homepage wheel server-renders a five-card window over the complete public
listing set. A small client layer updates CSS transforms with `requestAnimationFrame`
and refs; it does not re-render React on each animation frame. It pauses when
the page is hidden, offscreen, or being dragged, and honors
`prefers-reduced-motion`. Keyboard users can focus the wheel and use the arrow
keys; cards remain links to their detail pages. The primary navigation stays
visible at mobile widths.

`useMediaQuerySnapshot` returns a stable server snapshot and subscribes to
browser media preferences after hydration. Keep browser-only reads in effects,
event handlers or external-store subscriptions, never in render-time markup.

## Connecting a backend

Implement the methods in `MarketplaceReader` for the chosen server/API client
and select that implementation in `src/services/marketplace.ts`. Keep access
rules in the service so public routes only receive active or featured listings.
When categories or locations become dynamic, pass those catalogs and their
artwork mappings through the same boundary instead of reading `src/data/`
inside UI components. Add authentication, server-side authorization,
validation and write operations before implementing seller or admin mutations.
The current “save listing” demo stores IDs in browser `localStorage`; it is not
an account-level feature.

## Public URL and search metadata

Set `NEXT_PUBLIC_SITE_URL` to the deployed HTTPS origin (for example,
`https://example.edu`) before release. It supplies the metadata base, canonical
social URLs and structured website data. Until it is configured, the site emits
`noindex` robots metadata so a local/demo deployment is not accidentally
indexed. Verify the chosen origin and social image on the deployed site.

## Local development and checks

```bash
npm install
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

The development server uses the first available port if port 3000 is occupied.
