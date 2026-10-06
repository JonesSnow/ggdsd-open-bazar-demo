import Link from "next/link";
import type { Business } from "@/src/types";
import { BusinessCard } from "./business-card";
import { Container, SectionHeading, Reveal } from "@/src/components/ui/section";
import { Button } from "@/src/components/ui/button";
import { getRelatedBusinesses } from "@/src/data/businesses";

export function RelatedBusinesses({
  business,
  limit = 4,
}: {
  business: Business;
  limit?: number;
}) {
  const related = getRelatedBusinesses(business, limit);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-20">
      <Container>
        <SectionHeading
          id="related-heading"
          eyebrow="Keep exploring"
          title="Similar listings"
          align="left"
          level={2}
          action={{ label: "Browse the directory", href: "/directory" }}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((relatedBusiness, index) => (
            <Reveal key={relatedBusiness.id} delay={index * 80}>
              <BusinessCard business={relatedBusiness} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button variant="outline" icon="layout-grid" iconPosition="left">
            <Link href="/directory">View all listings</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
