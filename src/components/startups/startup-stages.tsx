import type { IconName } from "@/src/components/ui/icon";
import { Icon } from "@/src/components/ui/icon";
import { Container, Reveal, SectionHeading } from "@/src/components/ui/section";

const STAGES: {
  icon: IconName;
  title: string;
  description: string;
  meta: string;
}[] = [
  {
    icon: "pencil",
    title: "Idea",
    description:
      "Every venture starts in a notebook, a dorm room or a lab bench. The Startup Cell runs weekly ideation circles open to all departments.",
    meta: "Ideation circles · weekly",
  },
  {
    icon: "badge-check",
    title: "Registered",
    description:
      "A verified listing on Open Bazar gives a venture its stall page, contact card and first reviews — the visible step from idea to business.",
    meta: "IIC review · 1–2 days",
  },
  {
    icon: "trending-up",
    title: "Incubated",
    description:
      "Strong ventures enter the incubation center: mentor matching, prototype equipment and stall priority at fests like Open Bazaar 5.0.",
    meta: "Incubation center · by application",
  },
];

/** The venture lifecycle — how ideas become incubated startups. */
export function StartupStages() {
  return (
    <section aria-labelledby="startup-stages" className="bg-pine-950 py-20 text-paper-100 sm:py-24">
      <Container>
        <SectionHeading
          id="startup-stages"
          eyebrow="The venture lifecycle"
          title="From idea to incubated"
          description="Open Bazar is where the Startup Cell's pipeline becomes visible — every stage below is a real step a GGDSD venture can take."
          align="center"
          level={2}
        />
        <ol className="grid gap-5 md:grid-cols-3">
          {STAGES.map((stage, index) => (
            <Reveal key={stage.title} delay={index * 100}>
              <li className="relative h-full rounded-card border border-pine-900 bg-pine-900/60 p-6 transition-colors duration-200 hover:border-pine-800 sm:p-7">
                <span
                  aria-hidden="true"
                  className="absolute right-5 top-5 font-display text-5xl font-semibold text-pine-800/80 select-none"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brass-500/15 text-brass-300 ring-1 ring-brass-500/25">
                  <Icon name={stage.icon} size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-paper-50">
                  {stage.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-pine-200/80">
                  {stage.description}
                </p>
                <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-pine-900 px-3 py-1 text-[11px] font-semibold text-brass-300">
                  <Icon name="clock" size={12} />
                  {stage.meta}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
