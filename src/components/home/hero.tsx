"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Business } from "@/src/types";
import { businessCoverArt } from "@/src/utils/images";
import { categories, getCategoryById } from "@/src/data/categories";
import { cn } from "@/src/utils/cn";
import { ButtonLink } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { LogoMark } from "@/src/components/ui/logo";
import { RatingSummary } from "@/src/components/ui/rating";
import { TypeBadge } from "@/src/components/business/business-card";
import { useMediaQuery } from "@/src/hooks";

/**
 * Editorial hero: headline + search on the left,
 * a layered collage of real featured listings on the right
 * with a subtle mouse-parallax.
 */
export function Hero({
  featured,
  onSearch,
}: {
  featured: Business[];
  onSearch?: (query: string) => void;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const collage = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersMotion = useMediaQuery("(prefers-reduced-motion: no-preference)");

  const heroCards = featured.slice(0, 3);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDesktop || !prefersMotion || !collage.current) return;
    const rect = collage.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: y * 8 });
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (onSearch) {
      onSearch(trimmed);
      return;
    }
    router.push(trimmed ? `/directory?q=${encodeURIComponent(trimmed)}` : "/directory");
  };

  return (
    <section className="relative overflow-hidden pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-20">
      {/* faint background texture: concentric arch rings */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border-[36px] border-pine-100/70" />
        <div className="absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full border-[24px] border-brass-100/60" />
        <div className="absolute -bottom-56 -left-56 h-[480px] w-[480px] rounded-full border-[32px] border-pine-100/50" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8">
        {/* Copy + search */}
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-pine-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-pine-800 shadow-sm">
            <LogoMark size={16} />
            A GGDSD College IIC initiative
            <span className="h-3 w-px bg-pine-200" aria-hidden="true" />
            <span className="font-normal text-ink-500">Chandigarh</span>
          </p>

          <h1 className="mt-6 font-display text-[2.75rem] font-medium leading-[1.06] tracking-heading text-ink-950 text-balance sm:text-6xl lg:text-[4.25rem]">
            Every stall on campus.{" "}
            <span className="relative inline-block text-pine-700">
              One directory.
              <svg
                aria-hidden="true"
                viewBox="0 0 220 12"
                className="absolute -bottom-1 left-0 w-full text-brass-400"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 9 C 60 3, 160 3, 217 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
            Open Bazar is the digital home of student entrepreneurs,
            alumni startups and independent campus stalls — discover
            what the community makes, sells and services.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            role="search"
            aria-label="Search the business directory"
            className="mt-8"
          >
            <div className="relative max-w-xl">
              <Icon
                name="search"
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try “chai”, “calligraphy” or “web design”…"
                aria-label="Search businesses, products and services"
                className="h-14 w-full rounded-xl border border-ink-200 bg-white pl-12 pr-32 text-[15px] text-ink-900 shadow-soft transition-all placeholder:text-ink-400 hover:border-ink-300 focus:border-pine-500 focus:outline-none focus:ring-4 focus:ring-pine-500/10"
              />
              <ButtonLink
                href={`/directory${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`}
                variant="dark"
                size="md"
                className="absolute right-1.5 top-1/2 h-11 -translate-y-1/2 rounded-lg px-4"
              >
                Search
              </ButtonLink>
            </div>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-ink-500">
              <span className="font-medium">Popular:</span>
              {["chai", "skincare", "tutoring", "prints"].map((term) => (
                <Link
                  key={term}
                  href={`/directory?q=${term}`}
                  className="rounded-full border border-ink-200 bg-white px-2.5 py-0.5 font-medium text-ink-600 transition-colors hover:border-pine-400 hover:text-pine-700"
                >
                  {term}
                </Link>
              ))}
            </p>
          </form>

          {/* Trust strip */}
          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-ink-100 pt-6">
            {[
              { value: "19+", label: "Registered businesses" },
              { value: "10", label: "Categories" },
              { value: "4.8", label: "Average rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
                  {stat.value}
                </dd>
                <dd className="mt-0.5 text-xs text-ink-500 sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Collage */}
        <div
          ref={collage}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
          style={{
            transform: prefersMotion
              ? `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`
              : undefined,
            transition: "transform 200ms ease-out",
          }}
        >
          <div className="relative grid grid-cols-2 gap-4 sm:gap-5">
            {heroCards.map((business, index) => {
              const category = getCategoryById(business.categoryIds[0]);
              return (
                <Link
                  key={business.id}
                  href={`/directory/${business.slug}`}
                  className={cn(
                    "group overflow-hidden rounded-card bg-white shadow-lift ring-1 ring-ink-950/5 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-float",
                    index === 0 && "col-span-2 sm:rotate-[-1deg]",
                    index === 1 && "sm:mt-8 sm:rotate-[1.5deg]",
                    index === 2 && "col-span-2 sm:-mt-4 sm:rotate-[-0.5deg]"
                  )}
                  style={{
                    animationDelay: `${200 + index * 120}ms`,
                  }}
                  aria-label={`Visit ${business.name}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={businessCoverArt(business)}
                    alt=""
                    width={1200}
                    height={900}
                    loading="eager"
                    decoding="async"
                    className={cn(
                      "w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]",
                      index === 1 ? "aspect-square" : "aspect-[16/10]"
                    )}
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <TypeBadge type={business.type} />
                      <RatingSummary
                        rating={business.rating}
                        reviewCount={business.reviewCount}
                        size={11}
                      />
                    </div>
                    <h2 className="mt-2 font-display text-lg font-semibold text-ink-950 transition-colors group-hover:text-pine-700">
                      {business.name}
                    </h2>
                    <p className="mt-0.5 line-clamp-1 text-xs text-ink-500">
                      {category?.name} · {business.tagline}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Floating badge */}
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-5 hidden rotate-[-4deg] rounded-xl bg-brass-500 px-4 py-2.5 shadow-float sm:block"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brass-950">
              Student-run
            </p>
            <p className="font-display text-sm font-semibold text-brass-950/80">
              since 2023
            </p>
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-6 right-2 hidden animate-fade-in rounded-xl bg-ink-900 px-4 py-3 shadow-float sm:block"
          >
            <p className="flex items-center gap-1.5 text-xs font-semibold text-paper-100">
              <Icon name="shield-check" size={14} className="text-brass-400" />
              IIC verified listings
            </p>
          </div>
        </div>
      </div>

      {/* Category quick chips */}
      <div className="relative mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group inline-flex items-center gap-2 rounded-full border border-ink-200/80 bg-white px-4 py-2 text-sm font-medium text-ink-700 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-pine-300 hover:text-pine-800 hover:shadow-soft"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: category.featured ? "#2C6B4C" : "#C99B3E" }}
                aria-hidden="true"
              />
              {category.name}
              <Icon
                name="arrow-up-right"
                size={13}
                className="text-ink-300 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-pine-600"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
