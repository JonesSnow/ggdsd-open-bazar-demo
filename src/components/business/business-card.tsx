import Link from "next/link";
import type { Business } from "@/src/types";
import { getCategoryById } from "@/src/data/categories";
import { getLocationById } from "@/src/data/locations";
import { businessTypeLabels } from "@/src/data/site";
import { businessCoverArt } from "@/src/utils/images";
import { getOpenStatus } from "@/src/utils/hours";
import { cn } from "@/src/utils/cn";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { Icon } from "@/src/components/ui/icon";
import { RatingSummary } from "@/src/components/ui/rating";

/** Business-type pill used across cards and profiles. */
export function TypeBadge({
  type,
  variant,
  className,
}: {
  type: Business["type"];
  variant?: "pine" | "brass" | "outline" | "ink";
  className?: string;
}) {
  const resolved =
    variant ??
    (type === "iic-associated"
      ? "brass"
      : type === "alumni-startup"
        ? "ink"
        : type === "startup"
          ? "pine"
          : "outline");
  return (
    <Badge variant={resolved} className={cn("font-medium", className)}>
      {businessTypeLabels[type]}
    </Badge>
  );
}

export function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-pine-700">
      <Icon name="badge-check" size={15} className="text-pine-600" />
      Verified
    </span>
  );
}

export function OpenStatus({ locationId, className }: { locationId: string; className?: string }) {
  const location = getLocationById(locationId);
  if (!location) return null;
  const { open, label } = getOpenStatus(location);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        open ? "text-success-700" : "text-ink-500",
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          open ? "bg-success-500" : "bg-ink-300"
        )}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

/**
 * The standard directory card. Used on the home page,
 * directory, category pages and related listings.
 */
export function BusinessCard({ business, priority = false }: { business: Business; priority?: boolean }) {
  const categories = business.categoryIds
    .map((id) => getCategoryById(id))
    .filter((category): category is NonNullable<typeof category> => Boolean(category));
  const location = getLocationById(business.locationId);
  const cover = businessCoverArt(business);

  return (
    <Card
      hover
      className="group flex h-full flex-col overflow-hidden transition-shadow duration-200"
    >
      <Link
        href={`/directory/${business.slug}`}
        className="block overflow-hidden"
        aria-label={`View ${business.name}`}
        tabIndex={-1}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt=""
          width={1200}
          height={900}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <TypeBadge type={business.type} />
            {business.verified && <VerifiedBadge />}
          </div>
        </div>

        <h3 className="font-display text-xl font-semibold tracking-tight text-ink-950">
          <Link
            href={`/directory/${business.slug}`}
            className="transition-colors hover:text-pine-700"
          >
            {business.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-600">
          {business.tagline}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
          <RatingSummary rating={business.rating} reviewCount={business.reviewCount} size={13} />
          {location && (
            <span className="inline-flex items-center gap-1">
              <Icon name="map-pin" size={13} className="text-ink-400" />
              {location.name}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="rounded-full bg-paper-100 px-2.5 py-1 text-[11px] font-medium text-ink-600 transition-colors hover:bg-pine-100 hover:text-pine-800"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-paper-200 pt-4">
          <OpenStatus locationId={business.locationId} />
          <span className="inline-flex items-center gap-1 text-sm font-medium text-pine-700 transition-colors group-hover:text-pine-800">
            View listing
            <Icon
              name="arrow-right"
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Card>
  );
}

/** Compact row variant for lists and search results. */
export function BusinessRow({ business }: { business: Business }) {
  const location = getLocationById(business.locationId);
  return (
    <Link
      href={`/directory/${business.slug}`}
      className="group flex items-center gap-4 rounded-card border border-paper-200 bg-white p-4 transition-all duration-150 hover:border-pine-300 hover:shadow-soft"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={businessCoverArt(business)}
        alt=""
        width={160}
        height={120}
        loading="lazy"
        decoding="async"
        className="h-16 w-16 shrink-0 rounded-lg object-cover sm:h-20 sm:w-20"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-display text-lg font-semibold text-ink-950 transition-colors group-hover:text-pine-700">
            {business.name}
          </h3>
          {business.verified && <VerifiedBadge />}
        </div>
        <p className="mt-0.5 truncate text-sm text-ink-600">
          {business.tagline}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
          <RatingSummary rating={business.rating} reviewCount={business.reviewCount} size={12} />
          {location && (
            <span className="inline-flex items-center gap-1">
              <Icon name="map-pin" size={12} />
              {location.name}
            </span>
          )}
        </div>
      </div>
      <Icon
        name="chevron-right"
        size={18}
        className="shrink-0 text-ink-300 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-pine-600"
      />
    </Link>
  );
}
