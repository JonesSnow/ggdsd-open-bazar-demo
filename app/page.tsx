import { marketplaceService } from "@/src/services/marketplace";
import { testimonials } from "@/src/data/testimonials";
import { Hero } from "@/src/components/home/hero";
import { CategoryShowcase } from "@/src/components/home/category-showcase";
import { StartupEcosystem } from "@/src/components/home/startup-ecosystem";
import { EventSection } from "@/src/components/home/event-section";
import { HowItWorks } from "@/src/components/home/how-it-works";
import { TestimonialCarousel } from "@/src/components/home/testimonials";
import { CtaBanner } from "@/src/components/home/cta-banner";
import { serializeJsonLd } from "@/src/utils/json-ld";

export default async function HomePage() {
  const [publicBusinesses, categories] = await Promise.all([
    marketplaceService.listPublicBusinesses(),
    marketplaceService.listCategories(),
  ]);
  const categoryCounts = Object.fromEntries(
    categories.map((category) => [
      category.id,
      publicBusinesses.filter((business) =>
        business.categoryIds.includes(category.id)
      ).length,
    ])
  );

  return (
    <>
      <Hero businesses={publicBusinesses} />
      <CategoryShowcase categories={categories} categoryCounts={categoryCounts} />
      <StartupEcosystem ventures={publicBusinesses} />
      <HowItWorks />
      <EventSection />
      <TestimonialCarousel
        testimonials={testimonials}
        businessNames={Object.fromEntries(
          publicBusinesses.map((business) => [business.id, business.name])
        )}
      />
      <CtaBanner />
      <JsonLd />
    </>
  );
}

/** Structured data is emitted only when an approved public origin is configured. */
function JsonLd() {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredOrigin) return null;

  let siteUrl: URL;
  try {
    siteUrl = new URL(configuredOrigin);
    if (siteUrl.protocol !== "https:" && siteUrl.hostname !== "localhost") {
      return null;
    }
  } catch {
    return null;
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GGDSD Open Bazar",
    description:
      "Student business directory of GGDSD College, Chandigarh, run by the Institutions' Innovation Council.",
    url: siteUrl.toString(),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          new URL("/explore-shops?q={search_term_string}", siteUrl).toString(),
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
}
