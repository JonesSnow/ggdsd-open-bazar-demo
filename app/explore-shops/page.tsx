import type { Metadata } from "next";
import { marketplaceService } from "@/src/services/marketplace";
import { ExploreShopsExplorer } from "@/src/components/explore-shops/explore-shops-explorer";
import { PageHeader } from "@/src/components/ui/section";

export const metadata: Metadata = {
  title: "Explore Shops",
  description:
    "Browse every registered student business, startup, alumni venture and independent stall at GGDSD College.",
};

export default async function ExploreShopsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string | string[];
    category?: string | string[];
    featured?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const [businesses, categories] = await Promise.all([
    marketplaceService.listPublicBusinesses(),
    marketplaceService.listCategories(),
  ]);
  const query = Array.isArray(params.q) ? (params.q[0] ?? "") : (params.q ?? "");
  const requestedCategoryIds = Array.isArray(params.category)
    ? params.category
    : params.category
      ? [params.category]
      : [];
  const selectedCategories = requestedCategoryIds
    .map((id) => categories.find((category) => category.id === id))
    .filter((category): category is NonNullable<typeof category> => Boolean(category));
  const featuredOnly = Array.isArray(params.featured)
    ? params.featured.includes("1")
    : params.featured === "1";

  const categoryCounts = Object.fromEntries(
    categories.map((category) => [
      category.id,
      businesses.filter((business) => business.categoryIds.includes(category.id)).length,
    ])
  );

  const categoryName = selectedCategories.map((category) => category.name).join(", ") || undefined;

  return (
    <>
      <PageHeader
        eyebrow="Explore shops"
        title="Every business on the bazar floor"
        description={
          categoryName
            ? `Listings under “${categoryName}”.`
            : "Student entrepreneurs, alumni startups and independent stalls — verified by the Institutions' Innovation Council."
        }
        className="border-b border-paper-200 bg-paper-100/60"
      />
      <div className="pt-8">
        <ExploreShopsExplorer
          key={[query, selectedCategories.map((category) => category.id).join(","), featuredOnly].join(":")}
          businesses={businesses}
          initialQuery={query}
          initialCategories={selectedCategories.map((category) => category.id)}
          initialFeaturedOnly={featuredOnly}
          categoryCounts={categoryCounts}
        />
      </div>
    </>
  );
}
