import type { Metadata } from "next";
import { businesses } from "@/src/data/businesses";
import { siteConfig } from "@/src/data/site";
import { StartupExplorer } from "@/src/components/startups/startup-explorer";
import { StartupStages } from "@/src/components/startups/startup-stages";
import { Icon } from "@/src/components/ui/icon";
import { ButtonLink } from "@/src/components/ui/button";
import { Container, PageHeader, Reveal, SectionHeading } from "@/src/components/ui/section";

export const metadata: Metadata = {
  title: "Startups",
  description:
        "Student startups, alumni ventures and IIC-associated businesses at GGDSD College — explore the ventures behind Open Bazar.",
};

const VENTURE_STATS: { type: string; label: string; note: string }[] = [
  {
    type: "student-entrepreneur",
    label: "Student-run ventures",
    note: "Current students building between lectures",
  },
  {
    type: "startup",
    label: "Student-founded startups",
    note: "Ventures with a team and a roadmap",
  },
  {
    type: "alumni-startup",
    label: "Alumni-founded",
    note: "Founded by GGDSD alumni, still on campus",
  },
];

export default function StartupsPage() {
  const ventures = businesses.filter((business) =>
    ["student-entrepreneur", "startup", "alumni-startup", "iic-associated"].includes(
      business.type
    )
  );

  const countBy = (type: string) =>
    ventures.filter((business) => business.type === type).length;

  return (
    <>
      <PageHeader
        eyebrow="Startups"
        title="The ventures behind the bazar"
        description="Student entrepreneurs, alumni founders and IIC-associated ventures — the startups that make GGDSD's campus economy. Every listing below is demo data."
        className="border-b border-paper-200 bg-paper-100/60"
      />

      <Container className="py-12">
        {/* Venture mix */}
        <Reveal>
          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            {VENTURE_STATS.map((item) => (
              <div
                key={item.type}
                className="rounded-card border border-paper-200 bg-white p-5 shadow-soft"
              >
                <p className="font-display text-4xl font-semibold tracking-tight text-pine-700 tabular-nums">
                  {countBy(item.type)}
                </p>
                <p className="mt-1 text-sm font-semibold text-ink-900">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs text-ink-500">{item.note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <StartupExplorer all={ventures} />
      </Container>

      <StartupStages />

      {/* IIC support band */}
      <section aria-labelledby="iic-support" className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="iic-support"
            eyebrow="Backed by the IIC"
            title="Not every startup starts in a garage"
            description="The Institutions' Innovation Council reviews every listing, mentors the strongest ventures and opens the incubation center to early-stage ideas."
            align="left"
            level={2}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "shield-check" as const,
                title: "Verified listings",
                description:
                  "Every venture on Open Bazar is reviewed by a coordinator before it goes live.",
              },
              {
                icon: "users" as const,
                title: "Mentor network",
                description:
                  "Faculty mentors and alumni founders meet ventures every week at the incubation center.",
              },
              {
                icon: "megaphone" as const,
                title: "Fest exposure",
                description:
                  "Registered ventures get stall priority at Open Bazaar and other campus fests.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <div className="h-full rounded-card border border-paper-200 bg-white p-6 shadow-soft">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/register" variant="primary" size="lg" icon="plus">
                Register your venture
              </ButtonLink>
              <ButtonLink href="/about#iic" variant="outline" size="lg" icon="graduation-cap">
                Meet the {siteConfig.councilShort}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
