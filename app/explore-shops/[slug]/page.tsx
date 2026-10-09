import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Business, Location } from "@/src/types";
import { marketplaceService } from "@/src/services/marketplace";
import { businessCoverArt } from "@/src/utils/images";
import { formatDate } from "@/src/utils/format";
import { Badge } from "@/src/components/ui/badge";
import { Container, Reveal } from "@/src/components/ui/section";
import { Icon } from "@/src/components/ui/icon";
import { ButtonLink } from "@/src/components/ui/button";
import { Rating } from "@/src/components/ui/rating";
import {
  TypeBadge,
  VerifiedBadge,
} from "@/src/components/business/business-card";
import { ProductCard, ServiceCard } from "@/src/components/business/product-card";
import { ReviewCard, ReviewSummary } from "@/src/components/business/review-card";
import { Gallery } from "@/src/components/business/gallery";
import {
  HoursTable,
  LocationCard,
  MiniMap,
} from "@/src/components/business/location-card";
import { ContactPanel } from "@/src/components/business/contact-panel";
import { RelatedBusinesses } from "@/src/components/business/related-businesses";
import { serializeJsonLd } from "@/src/utils/json-ld";
import { SaveButton } from "./save-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const business = await marketplaceService.getBusinessBySlug(slug);
  return business
    ? { title: business.name, description: business.tagline }
    : { title: "Business listing not found" };
}

export default async function BusinessProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = await marketplaceService.getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  const [location, relatedBusinesses, categories] = await Promise.all([
    marketplaceService.getLocationById(business.locationId),
    marketplaceService.getRelatedBusinesses(business),
    Promise.all(business.categoryIds.map((id) => marketplaceService.getCategoryById(id))),
  ]);
  const businessCategories = categories
    .filter((category): category is NonNullable<typeof category> => Boolean(category));
  const cover = businessCoverArt(business);

  return (
    <>
      {/* Cover hero */}
      <section className="relative">
        <div className="relative h-56 overflow-hidden sm:h-72 lg:h-80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover}
            alt=""
            width={1200}
            height={900}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink-950/70 via-ink-950/10 to-transparent" />
        </div>

        <Container className="relative -mt-20 sm:-mt-24">
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-start gap-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cover}
                  alt=""
                  width={160}
                  height={160}
                  className="h-24 w-24 shrink-0 rounded-2xl object-cover shadow-lift ring-4 ring-paper-50 sm:h-28 sm:w-28"
                />
                <div className="min-w-0">
                  <nav aria-label="Breadcrumb" className="mb-2">
                    <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-500">
                      <li>
                        <Link href="/" className="hover:text-pine-700 hover:underline underline-offset-4">
                          Home
                        </Link>
                      </li>
                      <li aria-hidden="true">/</li>
                      <li>
                        <Link href="/explore-shops" className="hover:text-pine-700 hover:underline underline-offset-4">
                          Explore shops
                        </Link>
                      </li>
                      <li aria-hidden="true">/</li>
                      {businessCategories[0] && (
                        <>
                          <li>
                            <Link
                              href={`/categories/${businessCategories[0].slug}`}
                              className="hover:text-pine-700 hover:underline underline-offset-4"
                            >
                              {businessCategories[0].name}
                            </Link>
                          </li>
                          <li aria-hidden="true">/</li>
                        </>
                      )}
                      <li className="font-medium text-ink-800" aria-current="page">
                        {business.name}
                      </li>
                    </ol>
                  </nav>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-950 text-balance sm:text-4xl sm:text-white">
                      {business.name}
                    </h1>
                    {business.verified && <VerifiedBadge />}
                  </div>
                  <p className="mt-2 max-w-xl text-base text-ink-600 xl:text-paper-200">
                    {business.tagline}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Rating value={business.rating} size={14} />
                      <span className="font-semibold text-ink-900 tabular-nums">
                        {business.rating.toFixed(1)}
                      </span>
                      <span className="text-ink-500">
                        ({business.reviewCount} reviews)
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="calendar" size={14} className="text-brass-600" />
                      Since {business.establishedYear}
                    </span>
                    <TypeBadge type={business.type} variant="brass" />
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2.5">
                <SaveButton businessId={business.id} />
                <ButtonLink
                  href={`mailto:${business.contact.email}?subject=${encodeURIComponent(`Enquiry for ${business.name}`)}`}
                  variant="primary"
                  size="lg"
                  icon="mail"
                >
                  Enquire now
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Body */}
      <Container className="mt-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Main column */}
          <div className="min-w-0 space-y-14">
            {/* About */}
            <Reveal>
              <section aria-labelledby="about-heading">
                <h2
                  id="about-heading"
                  className="mb-4 flex items-center gap-2.5 font-display text-2xl font-semibold text-ink-950"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-pine-50 text-pine-700">
                    <Icon name="info" size={16} />
                  </span>
                  About
                </h2>
                <p className="text-lg leading-relaxed text-ink-700">
                  {business.description}
                </p>
                <p className="mt-4 leading-relaxed text-ink-600">
                  {business.longDescription}
                </p>

                {business.highlights.length > 0 && (
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {business.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 rounded-xl bg-paper-100/70 px-4 py-3 text-sm text-ink-700"
                      >
                        <Icon name="check" size={16} className="mt-0.5 shrink-0 text-pine-600" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {businessCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                    >
                      <Badge variant="pine" size="md">
                        {category.name}
                      </Badge>
                    </Link>
                  ))}
                  {business.tags.map((tag) => (
                    <Badge key={tag} variant="outline" size="md">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* Products & services */}
            {(business.products.length > 0 || business.services.length > 0) && (
              <Reveal>
                <section aria-labelledby="offerings-heading">
                  <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                    <h2
                      id="offerings-heading"
                      className="flex items-center gap-2.5 font-display text-2xl font-semibold text-ink-950"
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-pine-50 text-pine-700">
                        <Icon name="tag" size={16} />
                      </span>
                      Products & services
                    </h2>
                    <p className="text-sm text-ink-500">
                      {business.products.length + business.services.length} listed
                    </p>
                  </div>

                  {business.products.length > 0 && (
                    <>
                      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Products
                      </h3>
                      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {business.products.map((product, index) => (
                          <ProductCard
                            key={product.id}
                            business={business}
                            product={product}
                            index={index}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {business.services.length > 0 && (
                    <>
                      <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Services
                      </h3>
                      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {business.services.map((service) => (
                          <ServiceCard key={service.id} service={service} />
                        ))}
                      </div>
                    </>
                  )}
                </section>
              </Reveal>
            )}

            {/* Gallery */}
            <Reveal>
              <section aria-labelledby="gallery-heading">
                <h2
                  id="gallery-heading"
                  className="mb-5 flex items-center gap-2.5 font-display text-2xl font-semibold text-ink-950"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-pine-50 text-pine-700">
                    <Icon name="eye" size={16} />
                  </span>
                  Around the stall
                </h2>
                <Gallery business={business} />
              </section>
            </Reveal>

            {/* Reviews */}
            <Reveal>
              <section aria-labelledby="reviews-heading">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <h2
                    id="reviews-heading"
                    className="flex items-center gap-2.5 font-display text-2xl font-semibold text-ink-950"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-pine-50 text-pine-700">
                      <Icon name="star" size={16} />
                    </span>
                    Reviews
                  </h2>
                  <p className="text-sm text-ink-500">
                    Updated {formatDate(business.updatedAt)}
                  </p>
                </div>
                <ReviewSummary
                  rating={business.rating}
                  reviewCount={business.reviewCount}
                  reviews={business.reviews}
                />
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {business.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
                <p className="mt-5 rounded-xl bg-paper-100/70 px-4 py-3 text-sm text-ink-500">
                  Reviews are illustrative in this demo. On the live platform,
                  only verified interactions can leave a review.
                </p>
              </section>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="min-w-0 space-y-6 lg:sticky lg:top-40 lg:self-start">
            <Reveal>
              <ContactPanel business={business} />
            </Reveal>
            {location && (
              <>
                <Reveal delay={80}>
                  <HoursTable location={location} />
                </Reveal>
                <Reveal delay={120}>
                  <LocationCard location={location} />
                </Reveal>
                <Reveal delay={160}>
                  <MiniMap location={location} />
                </Reveal>
              </>
            )}
          </aside>
        </div>
      </Container>

      <RelatedBusinesses related={relatedBusinesses} />
      <ProfileJsonLd business={business} location={location} />
    </>
  );
}
function ProfileJsonLd({
  business,
  location,
}: {
  business: Business;
  location?: Location;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    telephone: business.contact.phone,
    email: business.contact.email,
    address: location
      ? {
          "@type": "PostalAddress",
          streetAddress: location.landmark,
          addressLocality: "Chandigarh",
          addressCountry: "IN",
        }
      : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
