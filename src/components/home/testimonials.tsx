"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/src/types";
import { getBusinessById } from "@/src/data/businesses";
import { Avatar } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Rating } from "@/src/components/ui/rating";
import { Icon } from "@/src/components/ui/icon";
import { Container, Reveal, SectionHeading } from "@/src/components/ui/section";
import { cn } from "@/src/utils/cn";

/**
 * Testimonial carousel with manual controls and auto-advance.
 */
export function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const featured = testimonials.filter((testimonial) => testimonial.featured);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = featured[index % featured.length];
  const activeIndex = index % featured.length;

  useEffect(() => {
    if (paused || featured.length < 2) return;
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % featured.length),
      7000
    );
    return () => window.clearInterval(timer);
  }, [paused, featured.length]);

  const business = current.businessId
    ? getBusinessById(current.businessId)
    : undefined;

  return (
    <section
      aria-labelledby="stories-heading"
      className="py-20 sm:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container>
        <SectionHeading
          id="stories-heading"
          eyebrow="Bazar Stories"
          title="Bazar Stories"
          description="Hear from our amazing sellers and visitors."
        />

        <Reveal>
          <div className="relative mx-auto max-w-4xl">
            <div
              aria-live="polite"
              className="relative overflow-hidden rounded-card bg-white p-8 shadow-soft ring-1 ring-paper-200 sm:p-12"
            >
              <Icon
                name="quote"
                size={44}
                className="absolute right-8 top-8 text-pine-100"
                aria-hidden="true"
              />
              <div key={current.id} className="animate-fade-in">
                <Rating value={current.rating} size={16} />
                <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed text-ink-900 text-balance sm:text-2xl">
                  “{current.content}”
                </blockquote>
                <figcaption className="mt-7 flex flex-wrap items-center gap-4">
                  <Avatar name={current.authorName} size={48} />
                  <div>
                    <p className="text-sm font-semibold text-ink-900">
                      {current.authorName}
                    </p>
                    <p className="text-sm text-ink-500">
                      {current.authorRole}
                      {current.authorBatch && ` · Batch of ${current.authorBatch}`}
                    </p>
                  </div>
                  {business && (
                    <Badge variant="pine" className="ml-auto">
                      {business.name}
                    </Badge>
                  )}
                </figcaption>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setIndex(
                    (value) => (value - 1 + featured.length) % featured.length
                  )
                }
                aria-label="Previous story"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-pine-400 hover:text-pine-700"
              >
                <Icon name="chevron-left" size={17} />
              </button>
              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Story selector"
              >
                {featured.map((testimonial, dotIndex) => (
                  <button
                    key={testimonial.id}
                    type="button"
                    role="tab"
                    aria-selected={dotIndex === activeIndex}
                    aria-label={`Story ${dotIndex + 1} from ${testimonial.authorName}`}
                    onClick={() => setIndex(dotIndex)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      dotIndex === activeIndex
                        ? "w-7 bg-pine-700"
                        : "w-2 bg-ink-200 hover:bg-ink-300"
                    )}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setIndex((value) => (value + 1) % featured.length)}
                aria-label="Next story"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-pine-400 hover:text-pine-700"
              >
                <Icon name="chevron-right" size={17} />
              </button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
