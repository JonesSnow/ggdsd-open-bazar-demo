import type { Metadata } from "next";
import { businesses } from "@/src/data/businesses";
import { getCategoryById } from "@/src/data/categories";
import { DirectoryExplorer } from "@/src/components/directory/directory-explorer";
import { PageHeader } from "@/src/components/ui/section";

export const metadata: Metadata = {
  title: "Business Directory",
  description:
    "Browse every registered student business, startup, alumni venture and independent stall at GGDSD College.",
};

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; featured?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";
  const category = params.category ?? undefined;
  const featuredOnly = params.featured === "1";

  const visible = featuredOnly
    ? businesses.filter((business) => business.featured)
    : businesses;

  const categoryName = category
    ? getCategoryById(category)?.name
    : undefined;

  return (
    <>
      <PageHeader
        eyebrow="The directory"
        title="Every business on the bazar floor"
        description={
          categoryName
            ? `Listings under “${categoryName}”.`
            : "Student entrepreneurs, alumni startups and independent stalls — verified by the Institutions' Innovation Council."
        }
        className="border-b border-paper-200 bg-paper-100/60"
      />
      <div className="pt-8">
        <DirectoryExplorer
          businesses={visible}
          initialQuery={query}
          initialCategory={category}
        />
      </div>
    </>
  );
}
