import type { Metadata } from "next";
import type { Testimonial } from "@/src/types";
import { marketplaceService } from "@/src/services/marketplace";
import { testimonials } from "@/src/data/testimonials";
import { Avatar } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Rating } from "@/src/components/ui/rating";
import { Icon } from "@/src/components/ui/icon";
import { Container, PageHeader, Reveal, SectionHeading } from "@/src/components/ui/section";

export const metadata: Metadata = {
  title: "Bazar Stories",
  description: "Stories from students, alumni and faculty about Open Bazar listings.",
};

export default async function StoriesPage() {
  const businesses = await marketplaceService.listPublicBusinesses();
  const businessNames = Object.fromEntries(
    businesses.map((business) => [business.id, business.name])
  );
  const featured = testimonials.filter((testimonial) => testimonial.featured);
  const rest = testimonials.filter((testimonial) => !testimonial.featured);

  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="Bazar Stories"
        description="Hear from our amazing sellers and visitors — students, alumni and faculty on the listings that became part of campus life."
        className="border-b border-paper-200 bg-paper-100/60"
      />

      <Container className="py-16">
        {/* Featured stories */}
        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 90}>
              <article className="relative flex h-full flex-col rounded-card bg-pine-950 p-7 text-paper-100">
                <Icon name="quote" size={36} className="absolute right-6 top-6 text-pine-800" aria-hidden="true" />
                <Rating value={testimonial.rating} size={15} />
                <blockquote className="mt-5 flex-1 font-display text-lg font-medium leading-relaxed text-paper-50 text-balance">
                  “{testimonial.content}”
                </blockquote>
                <footer className="mt-7 flex items-center gap-3.5 border-t border-pine-900 pt-5">
                  <Avatar name={testimonial.authorName} size={46} />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {testimonial.authorName}
                    </p>
                    <p className="text-xs text-pine-300">
                      {testimonial.authorRole}
                      {testimonial.authorBatch && ` · ${testimonial.authorBatch}`}
                    </p>
                  </div>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>

        {/* All stories */}
        <div className="mt-16">
          <SectionHeading
            eyebrow="All voices"
            title="More from the community"
            align="left"
            level={2}
          />
          <div className="grid gap-5 md:grid-cols-2">
            {rest.map((testimonial: Testimonial, index: number) => {
              const businessName = testimonial.businessId
                ? businessNames[testimonial.businessId]
                : undefined;
              return (
                <Reveal key={testimonial.id} delay={(index % 2) * 80}>
                  <article className="flex h-full flex-col rounded-card border border-paper-200 bg-white p-6 shadow-soft">
                    <div className="flex items-center justify-between gap-3">
                      <Rating value={testimonial.rating} size={14} />
                      {businessName && (
                        <Badge variant="pine" size="sm">
                          {businessName}
                        </Badge>
                      )}
                    </div>
                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                      “{testimonial.content}”
                    </blockquote>
                    <footer className="mt-5 flex items-center gap-3 border-t border-paper-200 pt-4">
                      <Avatar name={testimonial.authorName} size={40} />
                      <div>
                        <p className="text-sm font-semibold text-ink-900">
                          {testimonial.authorName}
                        </p>
                        <p className="text-xs text-ink-500">
                          {testimonial.authorRole}
                          {testimonial.authorBatch && ` · Batch of ${testimonial.authorBatch}`}
                        </p>
                      </div>
                    </footer>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Share your story */}
        <Reveal>
          <div className="mt-16 rounded-pop bg-paper-100/70 p-8 text-center sm:p-12">
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-pine-700 shadow-soft">
              <Icon name="message-circle" size={22} />
            </span>
            <h2 className="mt-5 font-display text-2xl font-semibold text-ink-950">
              Have a story about a listing?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-600">
              The production platform will collect community stories
              from verified buyers and collaborators.
            </p>
            <a
              href="mailto:hello@openbazar.example.com?subject=Story%20for%20Open%20Bazar"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-pine-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-pine-800"
            >
              Share your story
              <Icon name="arrow-right" size={16} />
            </a>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
