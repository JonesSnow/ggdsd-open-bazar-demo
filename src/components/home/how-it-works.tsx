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
      "Browse sample listings by category, location or rating to see how a campus directory can make stalls and services easier to find.",
  },
  {
    icon: "message-circle",
    title: "Connect",
    description:
      "Open a sample profile to preview the contact details and links a live directory could provide. This demo does not send enquiries.",
  },
  {
    icon: "trending-up",
    title: "Grow",
    description:
      "See one way student ventures could introduce their work. Real listings and support information will be added when confirmed.",
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
            A clearer way to explore campus ventures
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pine-200/85">
            This prototype brings sample stalls, student ventures and campus
            services into one place, so visitors can see how discovery could work.
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
