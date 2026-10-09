import Link from "next/link";
import type { Business } from "@/src/types";
import { businessCoverArt } from "@/src/utils/images";
import { businessTypeLabels } from "@/src/data/site";
import { Icon } from "@/src/components/ui/icon";
import { Badge } from "@/src/components/ui/badge";
import { RatingSummary } from "@/src/components/ui/rating";
import { ButtonLink } from "@/src/components/ui/button";
import { Container, Reveal, SectionHeading } from "@/src/components/ui/section";

/**
 * The startup ecosystem — a gateway band from the homepage
 * into the Startups experience. Shows one venture per
 * venture type as a teaser strip.
 */
export function StartupEcosystem({ ventures }: { ventures: Business[] }) {
  const picks = ["student-entrepreneur", "startup", "alumni-startup", "iic-associated"]
    .map((type) =>
      ventures
        .filter((business) => business.type === type)
        .sort((a, b) => b.rating - a.rating)[0]
    )
    .filter((business): business is Business => Boolean(business));

  return (
    <section aria-labelledby="ecosystem" className="bg-paper-100/60 py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="ecosystem"
          eyebrow="Sample venture profiles"
          title="Meet campus ventures"
          description="Explore sample profiles showing how student ventures, alumni startups and campus businesses could be presented in one directory."
          align="center"
          level={2}
          action={{ label: "Explore startups", href: "/startups", icon: "arrow-right" }}
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {picks.map((business, index) => (
            <Reveal key={business.id} delay={index * 90}>
              <Link
                href={`/explore-shops/${business.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-paper-200 bg-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-pine-300 hover:shadow-lift"
              >
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={businessCoverArt(business)}
                    alt=""
                    width={640}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge variant="pine" size="sm">
                      {businessTypeLabels[business.type]}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-ink-950 transition-colors group-hover:text-pine-700">
                      {business.name}
                    </h3>
                    <RatingSummary
                      rating={business.rating}
                      reviewCount={business.reviewCount}
                      size={11}
                    />
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-600">
                    {business.tagline}
                  </p>
                  <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-semibold text-pine-700">
                    View venture
                    <Icon
                      name="arrow-right"
                      size={13}
                      className="transition-transform duration-150 group-hover:translate-x-0.5"
                    />
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-pop border border-pine-900 bg-pine-950 px-6 py-8 text-paper-100 sm:flex-row sm:px-10">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brass-500/15 text-brass-300 ring-1 ring-brass-500/25">
                <Icon name="leaf" size={20} />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-paper-50">
                  Have a venture of your own?
                </h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-pine-200/85">
                  Preview how a listing could introduce your venture. This demo
                  validates the form locally and does not send or store details.
                </p>
              </div>
            </div>
            <ButtonLink
              href="/register"
              variant="primary"
              size="lg"
              icon="plus"
              className="shrink-0 bg-brass-500 text-brass-950 hover:bg-brass-400"
            >
              Try the seller form demo
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
