import type { Business } from "@/src/types";
import { BusinessCard } from "@/src/components/business/business-card";
import { Container, SectionHeading, Reveal } from "@/src/components/ui/section";
import { ButtonLink } from "@/src/components/ui/button";

export function FeaturedBusinesses({
  businesses,
}: {
  businesses: Business[];
}) {
  const featured = businesses.filter((business) => business.featured);

  return (
    <section aria-labelledby="featured-heading" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="featured-heading"
          eyebrow="Featured this week"
          title="Standout listings"
          description="Hand-picked by the Startup Cell — businesses the community keeps coming back to."
          align="left"
          level={2}
          action={{ label: "Browse the directory", href: "/directory", icon: "arrow-right" }}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 6).map((business, index) => (
            <Reveal key={business.id} delay={(index % 3) * 90}>
              <BusinessCard business={business} priority={index < 3} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <ButtonLink variant="outline" href="/directory" icon="store" iconPosition="left">
            Explore all {businesses.length} listings
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
