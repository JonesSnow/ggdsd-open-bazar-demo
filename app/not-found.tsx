import { marketplaceService } from "@/src/services/marketplace";
import { BusinessRow } from "@/src/components/business/business-card";
import { Container, PageHeader } from "@/src/components/ui/section";
import { ButtonLink } from "@/src/components/ui/button";

export default async function NotFoundPage() {
  const businesses = await marketplaceService.listPublicBusinesses();
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="This stall doesn't exist (yet)"
        description="The page you're after has wandered off the bazar floor. Here are a few listings that definitely do exist."
        className="border-b border-paper-200 bg-paper-100/60"
      />
      <Container className="py-14">
        <div className="mx-auto max-w-2xl space-y-3">
          {businesses.slice(0, 3).map((business) => (
            <BusinessRow key={business.id} business={business} />
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="primary" icon="home">
            Back to home
          </ButtonLink>
          <ButtonLink href="/explore-shops" variant="outline" icon="store">
            Browse the directory
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
