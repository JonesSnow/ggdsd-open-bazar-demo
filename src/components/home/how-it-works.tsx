import type { ReactNode } from "react";
import { Icon, type IconName } from "@/src/components/ui/icon";
import { Container, Reveal } from "@/src/components/ui/section";

const STEPS: {
  icon: IconName;
  title: string;
  description: string;
}[] = [
  {
    icon: "compass",
    title: "Discover",
    description:
      "Browse the directory by category, location or rating — from the chai cart at the main gate to studios in the incubation center.",
  },
  {
    icon: "message-circle",
    title: "Connect",
    description:
      "Reach out directly through listed contacts, or drop an enquiry. Most campus vendors reply within a day, often faster.",
  },
  {
    icon: "trending-up",
    title: "Grow",
    description:
      "Student ventures earn visibility, reviews and their first real customers. The IIC mentors the strongest ideas forward.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="why-open-bazar" className="bg-pine-950 py-20 text-paper-100 sm:py-24">
      <Container>
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brass-300">
            Why Open Bazar
          </p>
          <h2
            id="why-open-bazar"
            className="font-display text-3xl font-medium tracking-heading text-paper-50 text-balance sm:text-4xl"
          >
            More than a directory — a campus habit
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pine-200/85">
            Students find their first customers here. Alumni stay connected
            to campus. And the IIC gets a front-row seat to the ideas
            worth backing.
          </p>
        </div>

        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 100}>
              <li className="relative h-full rounded-card border border-pine-900 bg-pine-900/60 p-6 transition-colors duration-200 hover:border-pine-800 sm:p-7">
                <span className="absolute right-5 top-5 font-display text-5xl font-semibold text-pine-800/80 select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brass-500/15 text-brass-300 ring-1 ring-brass-500/25">
                  <Icon name={step.icon} size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-paper-50">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-pine-200/80">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Stats band — the community impact numbers. */
export function StatsBand({
  stats,
}: {
  stats: { value: string; suffix?: string; label: string; icon: IconNode }[];
}) {
  return (
    <section aria-label="Community impact numbers" className="border-y border-paper-200 bg-white py-12">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
                {stat.icon}
              </span>
              <div>
                <dd className="font-display text-3xl font-semibold tracking-tight text-ink-950 tabular-nums sm:text-4xl">
                  {stat.value}
                  {stat.suffix && (
                    <span className="ml-0.5 text-2xl text-pine-700">{stat.suffix}</span>
                  )}
                </dd>
                <dt className="mt-1 text-sm text-ink-500">{stat.label}</dt>
              </div>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

type IconNode = ReactNode;
