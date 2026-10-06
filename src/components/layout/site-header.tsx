"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/utils/cn";
import { announcements, navItems, siteConfig } from "@/src/data/site";
import { ButtonLink } from "@/src/components/ui/button";
import { Icon, type IconName } from "@/src/components/ui/icon";
import { Logo } from "@/src/components/ui/logo";
import { useMediaQuery } from "@/src/hooks";

const MOBILE_QUERY = "(min-width: 1024px)";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useMediaQuery(MOBILE_QUERY);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const announcement = announcements[0];

  return (
    <>
      {/* Utility bar */}
      <div className="bg-pine-950 text-paper-100">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 text-xs sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 truncate">
            <Icon name="graduation-cap" size={14} className="shrink-0 text-brass-300" />
            <span className="truncate">
              {siteConfig.council} · {siteConfig.institution}, {siteConfig.institutionCity}
            </span>
          </p>
          <div className="flex items-center gap-1.5">
            {announcement?.href && (
              <Link
                href={announcement.href}
                className="hidden items-center gap-1.5 rounded-full bg-brass-500/15 px-2.5 py-0.5 font-medium text-brass-200 transition-colors hover:bg-brass-500/25 sm:inline-flex"
              >
                <Icon name="sparkles" size={12} />
                <span className="max-w-52 truncate">{announcement.text}</span>
              </Link>
            )}
            <Link
              href="/admin"
              className="rounded-full px-2.5 py-0.5 font-medium text-ink-300 transition-colors hover:text-white"
            >
              Admin demo
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-sticky border-b transition-all duration-300",
          scrolled
            ? "border-paper-200 bg-paper-50/90 shadow-soft backdrop-blur-md"
            : "border-transparent bg-paper-50"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <Link href="/" aria-label="Open Bazar — home" className="shrink-0">
            <Logo size={34} />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? false
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150",
                    active
                      ? "text-pine-800"
                      : "text-ink-600 hover:bg-paper-100 hover:text-ink-900"
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-pine-700" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/directory"
              className="hidden h-10 w-10 items-center justify-center rounded-lg text-ink-600 transition-colors hover:bg-paper-100 hover:text-ink-900 sm:inline-flex"
              aria-label="Search the directory"
            >
              <Icon name="search" size={19} />
            </Link>
            <ButtonLink
              href="/register"
              size="sm"
              className="hidden sm:inline-flex"
              icon="plus"
            >
              Register business
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-paper-100 lg:hidden",
                menuOpen && "bg-paper-100"
              )}
            >
              <Icon name={menuOpen ? "x" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <MobileNav open={menuOpen} isDesktop={isDesktop} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function MobileNav({
  open,
  isDesktop,
  onClose,
}: {
  open: boolean;
  isDesktop: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  // Prevent the panel from lingering when switching to desktop
  const visible = open && !isDesktop;

  return (
    <div
      id="mobile-nav"
      aria-hidden={!visible}
      className={cn(
        "fixed inset-0 z-overlay lg:hidden",
        visible ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      {/* Scrim */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink-950/40 transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0"
        )}
      />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          "absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-pine-950 text-paper-100 shadow-float transition-transform duration-300 ease-out",
          visible ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-pine-900 px-4">
          <Logo size={30} inverse />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-paper-200 transition-colors hover:bg-pine-900 hover:text-white"
          >
            <Icon name="x" size={20} />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-1">
            {navItems.map((item, index) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-4 py-3.5 transition-colors",
                      active
                        ? "bg-pine-900 text-white"
                        : "text-paper-200 hover:bg-pine-900/60 hover:text-white"
                    )}
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <span>
                      <span className="block font-display text-lg font-medium">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="mt-0.5 block text-xs text-pine-300/80">
                          {item.description}
                        </span>
                      )}
                    </span>
                    <Icon
                      name="arrow-right"
                      size={18}
                      className={cn(
                        "transition-transform group-hover:translate-x-0.5",
                        active ? "text-brass-300" : "text-pine-400"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-pine-900 p-4">
          <ButtonLink
            href="/register"
            variant="primary"
            fullWidth
            icon="plus"
            className="bg-brass-500 text-brass-950 hover:bg-brass-400"
          >
            Register your business
          </ButtonLink>
          <p className="px-2 text-center text-xs text-pine-400">
            Demo prototype · fictional data
          </p>
        </div>
      </div>
    </div>
  );
}

/** Social icon link shared by header/footer */
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
        "inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-150 hover:-translate-y-0.5",
        className
      )}
    >
      <Icon name={icon} size={17} />
    </a>
  );
}
