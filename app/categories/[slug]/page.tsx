import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Business } from "@/src/types";
import { marketplaceService } from "@/src/services/marketplace";
import { artPath } from "@/src/utils/images";
import { pluralize } from "@/src/utils/format";
import { BusinessCard } from "@/src/components/business/business-card";
import { Container, Reveal, SectionHeading } from "@/src/components/ui/section";
import { Icon } from "@/src/components/ui/icon";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await marketplaceService.getCategoryBySlug(slug);
  return category
    ? { title: category.name, description: category.description }
    : { title: "Category not found" };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category, categories, publicBusinesses] = await Promise.all([
    marketplaceService.getCategoryBySlug(slug),
    marketplaceService.listCategories(),
    marketplaceService.listPublicBusinesses(),
  ]);

  if (!category) {
    notFound();
  }

  const businesses = publicBusinesses.filter((business) =>
    business.categoryIds.includes(category.id)
  );
  const siblings = categories
    .filter((item) => item.id !== category.id)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {/* Category hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artPath(category.artSlug, 0)}
            alt=""
            width={1200}
            height={900}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink-950/60" />
        </div>
        <Container className="relative py-20 sm:py-24">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-sm text-paper-200">
              <li>
                <Link href="/" className="hover:text-white hover:underline underline-offset-4">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/categories" className="hover:text-white hover:underline underline-offset-4">
                  Categories
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-white" aria-current="page">
                {category.name}
              </li>
            </ol>
          </nav>
          <Reveal>
            <h1 className="max-w-2xl font-display text-4xl font-semibold tracking-heading text-white text-balance sm:text-5xl">
              {category.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper-200">
              {category.longDescription ?? category.description}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-paper-100 backdrop-blur-sm">
              <Icon name="store" size={15} className="text-brass-300" />
              {pluralize(businesses.length, "public business")}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Listings */}
      <Container className="py-16">
        <SectionHeading
          eyebrow={`In ${category.name}`}
          title="Listings in this category"
          align="left"
          level={2}
          action={{ label: "Browse the full directory", href: "/explore-shops" }}
        />
        {businesses.length === 0 ? (
          <p className="rounded-card border border-dashed border-ink-200 bg-white px-8 py-14 text-center text-ink-500">
            No listings yet — check back soon, or browse the{" "}
            <Link href="/explore-shops" className="font-medium text-pine-700 hover:underline underline-offset-4">
              full directory
            </Link>
            .
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((business: Business, index: number) => (
              <Reveal key={business.id} delay={(index % 3) * 80}>
                <BusinessCard business={business} priority={index < 3} />
              </Reveal>
            ))}
          </div>
        )}

        {/* More categories */}
        <div className="mt-20">
          <SectionHeading
            eyebrow="Keep browsing"
            title="Other categories"
            align="left"
            level={2}
          />
          <div className="flex flex-wrap gap-2">
            {siblings.map((sibling) => (
              <Link
                key={sibling.id}
                href={`/categories/${sibling.slug}`}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3.5 text-sm font-medium text-ink-700 transition-all duration-150 active:scale-[0.97] hover:border-pine-400 hover:text-pine-700"
              >
                {sibling.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
