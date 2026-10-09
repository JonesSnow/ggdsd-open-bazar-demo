"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/utils/cn";
import { navItems, siteConfig } from "@/src/data/site";
import { ButtonLink } from "@/src/components/ui/button";
import { Icon, type IconName } from "@/src/components/ui/icon";
import { Logo } from "@/src/components/ui/logo";
import { AnnouncementTicker } from "@/src/components/layout/announcement-ticker";
import type { Announcement } from "@/src/types";

function isCurrentPage(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(href + "/");
}

/**
 * Keep the complete public navigation visible at every breakpoint. On narrow
 * screens the links wrap into a compact second row instead of a hidden menu.
 */
export function SiteHeader({
  announcementItems,
}: {
  announcementItems: Announcement[];
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-pine-950 text-paper-100">
        <div className="mx-auto flex min-h-9 max-w-7xl items-center gap-3 px-3 py-1 text-xs sm:gap-4 sm:px-6 lg:px-8">
          <p className="hidden min-w-0 shrink-0 items-center gap-2 truncate lg:flex">
            <Icon name="graduation-cap" size={14} className="shrink-0 text-brass-300" />
            <span className="truncate">
              {siteConfig.council} · {siteConfig.institution}, {siteConfig.institutionCity}
            </span>
          </p>
          <AnnouncementTicker items={announcementItems} />
          <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
            <Link
              href="/admin"
              className="rounded-full px-2.5 py-0.5 font-medium text-ink-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300"
            >
              Admin demo
            </Link>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-sticky border-b transition-[background-color,border-color,box-shadow] duration-200",
          scrolled
            ? "border-paper-200 bg-paper-50/95 shadow-soft backdrop-blur-md"
            : "border-transparent bg-paper-50"
        )}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] grid-rows-[64px_auto] items-center px-3 sm:px-6 lg:px-8 xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:grid-rows-[72px]">
          <Link
            href="/"
            aria-label="Open Bazar — home"
            className="min-w-0 justify-self-start rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-600"
          >
            <Logo size={34} />
          </Link>

          <nav
            aria-label="Primary"
            className="col-span-2 row-start-2 grid grid-cols-3 border-t border-paper-200/80 py-1 min-[480px]:grid-cols-6 xl:col-span-1 xl:col-start-2 xl:row-start-1 xl:border-0 xl:py-0"
          >
            {navItems.map((item) => {
              const active = isCurrentPage(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex min-h-10 items-center justify-center rounded-lg px-1 text-center text-[clamp(0.68rem,2.35vw,0.78rem)] font-medium transition-colors duration-150 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-pine-600 min-[480px]:text-[clamp(0.68rem,1.65vw,0.8rem)] xl:min-h-11 xl:whitespace-nowrap xl:px-2.5 xl:text-[13px]",
                    active
                      ? "text-pine-800"
                      : "text-ink-600 hover:bg-paper-100 hover:text-ink-950"
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-pine-700 xl:inset-x-3"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-self-end gap-1.5 sm:gap-2">
            <Link
              href="/explore-shops"
              aria-label="Search the directory"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 transition-colors hover:bg-paper-100 hover:text-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine-600 sm:h-10 sm:w-10"
            >
              <Icon name="search" size={19} />
            </Link>
            <ButtonLink
              href="/register"
              size="sm"
              icon="plus"
              className="!hidden sm:!inline-flex"
            >
              Seller form demo
            </ButtonLink>
          </div>
        </div>
      </header>
    </>
  );
}

/** Social icon link shared by the footer. */
export function SocialLink({
  href,
  icon,
  label,
  className,
}: {
  href: string;
  icon: IconName;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine-600",
        className
      )}
    >
      <Icon name={icon} size={17} />
    </a>
  );
}
