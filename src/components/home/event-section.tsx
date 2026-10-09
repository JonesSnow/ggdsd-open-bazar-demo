import Link from "next/link";
import { upcomingEvent } from "@/src/data/site";
import { eventArt } from "@/src/utils/images";
import { Icon } from "@/src/components/ui/icon";
import { ButtonLink } from "@/src/components/ui/button";
import { Container, Reveal } from "@/src/components/ui/section";

/**
 * Upcoming Open Bazar event band.
 *
 * DEMO CONTENT — dates and details are fictional
 * placeholders until the college confirms the real event.
 */
export function EventSection() {
  return (
    <section aria-labelledby="event-heading" id="event" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden rounded-pop bg-pine-950 text-paper-100 shadow-float lg:grid-cols-[1.05fr_0.95fr]">
            {/* Copy side */}
            <div className="relative p-7 sm:p-10 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 -top-24 z-0 h-64 w-64 rounded-full border-[22px] border-pine-900"
              />
              <div className="relative z-10">
                <p className="inline-flex items-center gap-2 rounded-full bg-brass-500/15 px-3.5 py-1.5 text-xs font-semibold text-brass-300 ring-1 ring-brass-500/25">
                  <Icon name="calendar" size={13} />
                  {upcomingEvent.tagline}
                </p>
                <h2
                  id="event-heading"
                  className="mt-5 font-display text-3xl font-medium tracking-heading text-paper-50 text-balance sm:text-4xl lg:text-[2.75rem]"
                >
                  {upcomingEvent.edition}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-pine-100/90 sm:text-lg">
                  {upcomingEvent.description}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink
                    href={upcomingEvent.ctaPrimary.href}
                    variant="primary"
                    size="lg"
                    icon="arrow-right"
                    className="bg-brass-500 text-brass-950 hover:bg-brass-400"
                  >
                    {upcomingEvent.ctaPrimary.label}
                  </ButtonLink>
                  <ButtonLink
                    href={upcomingEvent.ctaSecondary.href}
                    variant="ghost"
                    size="lg"
                    icon="info"
                    className="border border-pine-700 bg-transparent text-paper-100 hover:border-pine-500 hover:bg-pine-900 hover:text-white"
                  >
                    {upcomingEvent.ctaSecondary.label}
                  </ButtonLink>
                </div>
              </div>
            </div>

            {/* Art side */}
            <Link
              href={upcomingEvent.ctaPrimary.href}
              className="group relative block min-h-72 overflow-hidden lg:min-h-[420px]"
              aria-label={`${upcomingEvent.ctaPrimary.label} in the Open Bazar directory demo`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={eventArt()}
                alt=""
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-pine-950/80 via-pine-950/10 to-transparent lg:bg-linear-to-r lg:from-pine-950/45 lg:via-transparent lg:to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/70 bg-paper-50/95 px-4 py-3.5 text-ink-900 shadow-lg backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-6">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-pine-700">
                  <Icon name="calendar" size={13} className="text-brass-600" />
                  {upcomingEvent.dateLabel}
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm font-medium text-ink-700">
                  <Icon name="map-pin" size={13} className="text-brass-600" />
                  {upcomingEvent.venue}
                </p>
              </div>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
