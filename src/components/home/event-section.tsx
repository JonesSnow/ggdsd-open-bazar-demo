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
          <div className="grid overflow-hidden rounded-pop bg-pine-950 text-paper-100 shadow-float lg:grid-cols-[1.1fr_1fr]">
            {/* Copy side */}
            <div className="relative p-7 sm:p-10 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full border-[22px] border-pine-900"
              />
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
              <p className="mt-4 max-w-lg text-base leading-relaxed text-pine-200/90">
                {upcomingEvent.description}
              </p>

              <ul className="mt-7 space-y-3">
                {upcomingEvent.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm text-pine-200/85">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pine-800 text-brass-300">
                      <Icon name="check" size={11} strokeWidth={3} />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={upcomingEvent.ctaPrimary.href}
                  variant="primary"
                  size="lg"
                  icon="store"
                  className="bg-brass-500 text-brass-950 hover:bg-brass-400"
                >
                  {upcomingEvent.ctaPrimary.label}
                </ButtonLink>
                <ButtonLink
                  href={upcomingEvent.ctaSecondary.href}
                  variant="outline"
                  size="lg"
                  icon="graduation-cap"
                  className="border-pine-700 text-paper-100 hover:border-pine-500 hover:bg-pine-900"
                >
                  {upcomingEvent.ctaSecondary.label}
                </ButtonLink>
              </div>
              <p className="mt-5 text-xs text-pine-400">
                Demo content — event date and programme are placeholders.
              </p>
            </div>

            {/* Art side */}
            <Link
              href={upcomingEvent.ctaPrimary.href}
              className="group relative block min-h-72 overflow-hidden lg:min-h-[420px]"
              aria-label={`${upcomingEvent.edition} — register a stall`}
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
              <div className="absolute inset-0 bg-linear-to-t from-pine-950/70 via-transparent to-transparent lg:bg-linear-to-r" />
              <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-paper-50/95 px-4 py-3 text-ink-900 backdrop-blur-sm lg:left-6 lg:right-6">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-pine-700">
                  <Icon name="map-pin" size={13} className="text-brass-600" />
                  {upcomingEvent.venue}
                </p>
                <p className="mt-1 font-display text-lg font-semibold">
                  {upcomingEvent.dateLabel}
                </p>
              </div>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
