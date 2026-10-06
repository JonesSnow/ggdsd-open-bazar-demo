import type { Metadata } from "next";
import { Icon } from "@/src/components/ui/icon";
import { ButtonLink } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Container, Reveal, SectionHeading } from "@/src/components/ui/section";
import { LogoMark } from "@/src/components/ui/logo";
import { FaqItem } from "@/src/components/about/faq-item";
import { campusArt } from "@/src/utils/images";
import { siteConfig } from "@/src/data/site";
import { faqs } from "@/src/data/site";

export const metadata: Metadata = {
  title: "About GGDSD & the IIC",
  description:
    "About GGDSD College, the Institutions' Innovation Council and the Startup Cell behind Open Bazar.",
};

const VALUES = [
  {
    icon: "graduation-cap" as const,
    title: "Student-first",
    description:
      "Every feature is designed for a campus audience — students building ventures between lectures, not full-time founders.",
  },
  {
    icon: "shield-check" as const,
    title: "Verified & moderated",
    description:
      "Listings are reviewed by the IIC before going live, and reviews are tied to real interactions.",
  },
  {
    icon: "leaf" as const,
    title: "Community over commerce",
    description:
      "The bazar is a shared floor, not a marketplace race. We highlight craft, sustainability and peer support.",
  },
  {
    icon: "compass" as const,
    title: "Open by default",
    description:
      "The directory is free for student ventures. Alumni and independent stalls join with a coordinator referral.",
  },
];

const IMPACT = [
  { value: "120+", label: "Student ventures supported since 2023" },
  { value: "₹4.2L", label: "Estimated peer-to-peer sales via listings" },
  { value: "6", label: "Campus stall locations mapped" },
  { value: "28", label: "IIC mentor hours per month" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-paper-200 bg-paper-100/60">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border-[42px] border-pine-100/70" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full border-[30px] border-brass-100/60" />
        </div>
        <Container className="relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-pine-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-pine-800">
              <LogoMark size={16} />
              {siteConfig.institution} · {siteConfig.institutionCity}
            </p>
            <h1 className="font-display text-4xl font-medium tracking-heading text-ink-950 text-balance sm:text-5xl">
              The campus marketplace, built by the{" "}
              <span className="text-pine-700">Institutions&rsquo; Innovation Council</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              Open Bazar is the {siteConfig.council}&rsquo;s directory for
              student entrepreneurs, alumni startups and independent
              campus stalls — one place where the community discovers
              what the college makes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/register" variant="primary" size="lg" icon="plus">
                Register your business
              </ButtonLink>
              <ButtonLink href="/directory" variant="outline" size="lg" icon="store">
                Explore the directory
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* The council */}
      <section aria-labelledby="iic" id="iic" className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="iic"
            eyebrow="The Institutions' Innovation Council"
            title="Where ideas get an address"
            description="The IIC is GGDSD's innovation body — part of the national network of councils that turn student ideas into working ventures. Open Bazar is one of its community projects."
            align="left"
            level={2}
          />
          {/* Campus scene */}
          <Reveal>
            <div className="relative mb-14 overflow-hidden rounded-pop shadow-soft ring-1 ring-paper-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={campusArt()}
                alt="Abstract illustration of the campus stall rows at GGDSD College"
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute bottom-5 left-5 rounded-xl bg-paper-50/95 px-4 py-2.5 shadow-soft">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-pine-700">
                  The bazar floor
                </p>
                <p className="font-display text-base font-semibold text-ink-950">
                  Where every stall has a story
                </p>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => (
              <Reveal key={value.title} delay={index * 80}>
                <Card hover className="h-full p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-pine-50 text-pine-700 ring-1 ring-pine-100">
                    <Icon name={value.icon} size={20} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink-950">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {value.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Startup cell */}
      <section aria-labelledby="startup-cell" id="startup-cell" className="bg-pine-950 py-20 text-paper-100 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brass-300">
                The Startup Cell
              </p>
              <h2
                id="startup-cell"
                className="font-display text-3xl font-medium tracking-heading text-paper-50 text-balance sm:text-4xl"
              >
                From stall to startup cell in three steps
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-pine-200">
                The Startup Cell runs the pipeline that turns a dorm-room
                idea into a registered campus venture — and Open Bazar is
                where that journey becomes visible.
              </p>
              <ol className="mt-8 space-y-5">
                {[
                  {
                    title: "Idea & validation",
                    description:
                      "Weekly ideation circles and a mentor matching desk in the incubation center.",
                  },
                  {
                    title: "Register on Open Bazar",
                    description:
                      "A listing gives you a stall page, contact card and review history from day one.",
                  },
                  {
                    title: "Grow with the IIC",
                    description:
                      "Strong ventures get incubation access, seed-grant guidance and fest stall priority.",
                  },
                ].map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brass-500/15 font-display text-base font-semibold text-brass-300 ring-1 ring-brass-500/30">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-paper-50">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-pine-200/85">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <Reveal delay={120}>
              <div className="relative">
                <div aria-hidden="true" className="absolute -inset-4 rounded-pop bg-pine-900/60" />
                <div className="relative overflow-hidden rounded-pop bg-pine-900 p-8 ring-1 ring-pine-800">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-300">
                    Incubation center
                  </p>
                  <p className="mt-2 font-display text-2xl font-semibold text-paper-50">
                    Innovation Block, 2nd Floor
                  </p>
                  <p className="mt-1 text-sm text-pine-300">
                    Rooms 201–210 · Open Mon–Sat, 10 AM – 6 PM
                  </p>
                  <div className="mt-6 space-y-3 border-t border-pine-800 pt-6">
                    {[
                      "Mentor matching desk",
                      "Prototype & craft equipment",
                      "Meeting rooms for client calls",
                      "Fest stall allocation support",
                    ].map((amenity) => (
                      <p key={amenity} className="flex items-center gap-2.5 text-sm text-pine-200">
                        <Icon name="check" size={15} className="text-brass-400" />
                        {amenity}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Impact */}
      <section aria-labelledby="impact" id="impact" className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="impact"
            eyebrow="Community impact"
            title="Small stalls, real numbers"
            description="What the directory has helped the campus community do since it opened."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 70}>
                <Card variant="outlined" className="h-full p-6 text-center">
                  <p className="font-display text-4xl font-semibold tracking-tight text-pine-700">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-ink-600">
                    {stat.label}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-xs text-ink-400">
            Figures are illustrative placeholders for the demo — the
            production platform will publish real impact reports each
            semester.
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="bg-paper-100/60 py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="faq-heading"
            eyebrow="Questions"
            title="Good to know"
            align="left"
            level={2}
          />
          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq, index) => (
              <Reveal key={faq.id} delay={index * 50}>
                <FaqItem question={faq.question} answer={faq.answer} defaultOpen={index === 0} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/contact" variant="outline" icon="mail">
              Still curious? Contact us
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
