import { Icon } from "@/src/components/ui/icon";
import { ButtonLink } from "@/src/components/ui/button";
import { Container, Reveal } from "@/src/components/ui/section";

/** Full-width invitation to explore the local-only seller form demo. */
export function CtaBanner() {
  return (
    <section aria-labelledby="cta-heading" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-pop bg-pine-950 px-6 py-14 text-center text-paper-100 sm:px-12 sm:py-20">
            {/* decorative arch rings */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full border-[26px] border-pine-900" />
              <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full border-[30px] border-pine-900/80" />
              <div className="absolute right-24 top-16 h-24 w-24 rounded-full bg-brass-500/10 blur-2xl" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brass-500 text-brass-950">
                <Icon name="store" size={22} />
              </span>
              <h2
                id="cta-heading"
                className="mt-6 font-display text-3xl font-medium tracking-heading text-paper-50 text-balance sm:text-4xl lg:text-5xl"
              >
                Have a venture to share?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pine-200">
                See how a campus listing could introduce a student venture,
                alumni business or independent stall. The form is a local demo;
                no application is sent or stored.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink
                  href="/register"
                  variant="primary"
                  size="lg"
                  className="bg-brass-500 text-brass-950 hover:bg-brass-400"
                  icon="plus"
                >
                  Try the seller form demo
                </ButtonLink>
                <ButtonLink
                  href="/explore-shops"
                  variant="outline"
                  size="lg"
                  className="border-pine-700 bg-transparent text-paper-100 hover:border-pine-500 hover:bg-pine-900"
                >
                  Explore sample listings
                </ButtonLink>
              </div>
              <p className="mt-6 text-xs text-pine-400">
                Demo prototype — registrations are validated locally and never stored.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
