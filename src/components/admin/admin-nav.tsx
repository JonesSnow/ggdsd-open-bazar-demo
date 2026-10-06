import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/utils/cn";
import { Icon, type IconName } from "@/src/components/ui/icon";
import { LogoMark } from "@/src/components/ui/logo";
import { siteConfig } from "@/src/data/site";

export const adminNav = [
  { label: "Dashboard", href: "/admin", icon: "home" as IconName },
  { label: "Vendors", href: "/admin/vendors", icon: "store" as IconName },
  {
    label: "Registrations",
    href: "/admin/registrations",
    icon: "inbox" as IconName,
    badge: "7",
  },
  { label: "Categories", href: "/admin/categories", icon: "layout-grid" as IconName },
  { label: "Featured", href: "/admin/featured", icon: "sparkles" as IconName },
  { label: "Reviews & reports", href: "/admin/reviews", icon: "flag" as IconName },
];

export function AdminNav({ mobileOpen, onNavigate }: { mobileOpen: boolean; onNavigate: () => void }) {
  const pathname = usePathname();

  const nav = (
    <nav aria-label="Admin">
      <ul className="space-y-1">
        {adminNav.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-pine-900 text-white"
                    : "text-paper-200 hover:bg-pine-900/60 hover:text-white"
                )}
              >
                <Icon
                  name={item.icon}
                  size={17}
                  className={active ? "text-brass-300" : "text-pine-400 group-hover:text-paper-100"}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-brass-500 px-2 py-0.5 text-[10px] font-bold text-brass-950">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-sticky hidden w-64 flex-col bg-pine-950 lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-pine-900 px-5">
          <LogoMark size={30} />
          <div className="leading-tight">
            <p className="font-display text-base font-semibold text-paper-50">
              Open Bazar
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brass-300">
              Admin demo
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-5">{nav}</div>
        <div className="border-t border-pine-900 p-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-paper-200 transition-colors hover:bg-pine-900/60 hover:text-white"
          >
            <Icon name="arrow-left" size={16} className="text-pine-400" />
            View live site
          </Link>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-overlay lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          aria-hidden="true"
          onClick={onNavigate}
          className={cn(
            "absolute inset-0 bg-ink-950/40 transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Admin navigation"
          className={cn(
            "absolute left-0 top-0 flex h-full w-72 flex-col bg-pine-950 shadow-float transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-pine-900 px-5">
            <div className="flex items-center gap-3">
              <LogoMark size={30} />
              <div className="leading-tight">
                <p className="font-display text-base font-semibold text-paper-50">
                  Open Bazar
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brass-300">
                  Admin demo
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onNavigate}
              aria-label="Close menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-paper-200 hover:bg-pine-900 hover:text-white"
            >
              <Icon name="x" size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-5">{nav}</div>
          <div className="border-t border-pine-900 p-4">
            <Link
              href="/"
              onClick={onNavigate}
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-paper-200 transition-colors hover:bg-pine-900/60 hover:text-white"
            >
              <Icon name="arrow-left" size={16} className="text-pine-400" />
              View live site
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export function AdminDemoNotice() {
  return (
    <p className="flex items-center gap-2 rounded-full bg-brass-100 px-3 py-1 text-xs font-semibold text-brass-800">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brass-600" aria-hidden="true" />
      Demo mode — no real data, {siteConfig.institution}
    </p>
  );
}
