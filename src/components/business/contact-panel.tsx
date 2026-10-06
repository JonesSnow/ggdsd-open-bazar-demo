import type { Business, SocialLinks } from "@/src/types";
import { businessTypeLabels } from "@/src/data/site";
import { formatINR } from "@/src/utils/format";
import { cn } from "@/src/utils/cn";
import { Card } from "@/src/components/ui/card";
import { Icon, type IconName } from "@/src/components/ui/icon";
import { SocialLink } from "@/src/components/layout/site-header";
import { VerifiedBadge } from "./business-card";

const SOCIAL_ICONS: Record<keyof SocialLinks, { icon: IconName; label: string }> = {
  instagram: { icon: "instagram", label: "Instagram" },
  facebook: { icon: "facebook", label: "Facebook" },
  linkedin: { icon: "linkedin", label: "LinkedIn" },
  youtube: { icon: "youtube", label: "YouTube" },
  website: { icon: "globe", label: "Website" },
};

export function SocialLinksList({ social }: { social: SocialLinks }) {
  const entries = (Object.keys(social) as (keyof SocialLinks)[]).filter(
    (key) => social[key]
  );
  if (entries.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {entries.map((key) => {
        const href = social[key]!;
        const meta = SOCIAL_ICONS[key];
        return (
          <SocialLink
            key={key}
            href={href}
            icon={meta.icon}
            label={`${meta.label} (opens in a new tab)`}
            className="border border-ink-200 bg-white text-ink-500 hover:border-pine-300 hover:bg-pine-50 hover:text-pine-700"
          />
        );
      })}
    </div>
  );
}

/** Sticky contact / enquiry card on profile pages. */
export function ContactPanel({ business }: { business: Business }) {
  const items: { icon: IconName; label: string; value: string; href?: string }[] = [
    {
      icon: "phone",
      label: "Phone",
      value: business.contact.phone,
      href: `tel:${business.contact.phone.replace(/\s/g, "")}`,
    },
    { icon: "mail", label: "Email", value: business.contact.email, href: `mailto:${business.contact.email}` },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2">
        <h2 className="font-display text-lg font-semibold text-ink-950">
          Contact
        </h2>
        {business.verified && <VerifiedBadge />}
      </div>

      <dl className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pine-50 text-pine-700">
              <Icon name={item.icon} size={17} />
            </span>
            <div className="min-w-0">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
                {item.label}
              </dt>
              <dd className="truncate text-sm font-medium text-ink-800">
                {item.href ? (
                  <a
                    href={item.href}
                    className="transition-colors hover:text-pine-700 hover:underline underline-offset-4"
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-5 border-t border-paper-200 pt-5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
          Follow
        </p>
        <SocialLinksList social={business.social} />
      </div>

      <div className="mt-5 border-t border-paper-200 pt-5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
          About the owner
        </p>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-pine-700 font-display text-base font-semibold text-white">
            {business.owner.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </span>
          <div>
            <p className="text-sm font-semibold text-ink-900">
              {business.owner.name}
            </p>
            <p className="text-xs text-ink-500">
              {businessTypeLabels[business.owner.role === "external" ? "independent-stall" : business.owner.role === "student" ? "student-entrepreneur" : business.owner.role === "alumni" ? "alumni-startup" : "iic-associated"]}
              {business.owner.course && ` · ${business.owner.course}`}
              {business.owner.batch && ` · Batch of ${business.owner.batch}`}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-pine-950 p-5 text-center">
        <p className="font-display text-lg font-semibold text-paper-50">
          Enquiry CTA
        </p>
        <p className="mt-1 text-xs leading-relaxed text-pine-300">
          Send a message to {business.name}. They typically reply within a day on campus.
        </p>
        <a
          href={`mailto:${business.contact.email}?subject=${encodeURIComponent(`Enquiry about ${business.name}`)}`}
          className={cn(
            "mt-4 inline-flex h-10 w-full items-center justify-center rounded-lg bg-brass-500 px-4 text-sm font-semibold text-brass-950 transition-colors hover:bg-brass-400"
          )}
        >
          Send an enquiry
        </a>
      </div>

      {business.products.length > 0 && (
        <p className="mt-4 text-center text-xs text-ink-400">
          Prices start at{" "}
          <span className="font-semibold text-ink-600">
            {formatINR(Math.min(...business.products.map((p) => p.price)))}
          </span>
        </p>
      )}
    </Card>
  );
}
