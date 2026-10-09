import Link from "next/link";
import type { Business } from "@/src/types";
import { heroArt } from "@/src/utils/images";
import { categories } from "@/src/data/categories";
import { Button } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { LogoMark } from "@/src/components/ui/logo";
import { HeroWheel } from "./hero-wheel";

/**
 * Editorial hero: headline + search on the left,
 * a continuous 3D listing stream on the right.
 * Desktop: automatic travel with a subtle cursor parallax
 * Mobile: automatic travel with touch dragging
 * Reduced motion: static cards with manual navigation
 */
export function Hero({
  businesses,
}: {
  businesses: Business[];
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-20">
      {/* Ambient background depth layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border-[36px] border-pine-100/70 float-orb slow" />
        <div className="absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full border-[24px] border-brass-100/60 float-orb" />
        <div className="absolute -bottom-56 -left-56 h-[480px] w-[480px] rounded-full border-[32px] border-pine-100/50 float-orb slow" />
        {/* Editorial bazaar scene, softly washed behind the wheel */}
        <div className="absolute inset-y-0 right-0 hidden w-[58%] opacity-[0.35] [mask-image:linear-gradient(to_right,transparent,black_35%)] lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroArt()}
            alt=""
            width={1600}
            height={1000}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
            style={{ transform: "scale(1.15)" }}
          />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 xl:grid-cols-[0.95fr_1.05fr] xl:gap-14">
        {/* Copy + search */}
        <div>
          <p className="animate-fade-up inline-flex max-w-full items-center gap-2 rounded-full border border-pine-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-pine-800 shadow-sm">
            <LogoMark size={16} />
            A GGDSD College IIC initiative
            <span className="hidden h-3 w-px bg-pine-200 sm:block" aria-hidden="true" />
            <span className="font-normal text-ink-500">Chandigarh</span>
          </p>

          <h1
            className="animate-fade-up mt-6 font-display text-[clamp(2.5rem,7.5vw,4.25rem)] font-medium leading-[1.05] tracking-heading text-ink-950 text-balance"
            style={{ animationDelay: "80ms" }}
          >
            Campus ventures.{" "}
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

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Explore sample student ventures, products and services in this
            campus-directory prototype.
          </p>

          {/* Search */}
          <form
            action="/explore-shops"
            method="get"
            role="search"
            aria-label="Search the business directory"
            className="animate-fade-up mt-8"
            style={{ animationDelay: "240ms" }}
          >
            <div className="relative max-w-xl">
              <Icon
                name="search"
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
              />
              <input
                type="search"
                name="q"
                placeholder="Try &ldquo;chai&rdquo;, &ldquo;calligraphy&rdquo; or &ldquo;web design&rdquo;&hellip;"
                aria-label="Search businesses, products and services"
                className="h-14 w-full rounded-xl border border-ink-200 bg-white pl-12 pr-24 text-[15px] text-ink-900 shadow-soft transition-all placeholder:text-ink-400 hover:border-ink-300 focus:border-pine-500 focus:outline-none focus:ring-4 focus:ring-pine-500/10 sm:pr-32"
              />
              <Button
                variant="dark"
                size="md"
                type="submit"
                className="absolute right-1.5 top-1/2 h-11 -translate-y-1/2 rounded-lg px-3.5 sm:px-4"
              >
                Search
              </Button>
            </div>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-ink-500">
              <span className="font-medium">Popular:</span>
              {["chai", "skincare", "tutoring", "prints"].map((term) => (
                <Link
                  key={term}
                  href={`/explore-shops?q=${term}`}
                  className="rounded-full border border-ink-200 bg-white px-2.5 py-0.5 font-medium text-ink-600 transition-colors hover:border-pine-400 hover:text-pine-700"
                >
                  {term}
                </Link>
              ))}
            </p>
          </form>

        </div>

        {/* Continuous 3D listing stream */}
        <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
          <HeroWheel businesses={businesses} />
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
