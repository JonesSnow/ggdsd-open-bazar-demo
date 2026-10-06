import Link from "next/link";
import { Container } from "@/src/components/ui/section";
import { SocialLink } from "./site-header";
import { Logo, LogoMark } from "@/src/components/ui/logo";
import { footerSections, siteConfig } from "@/src/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-pine-950 text-paper-200">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-5">
            <Logo size={38} inverse />
            <p className="max-w-sm text-sm leading-relaxed text-pine-200/80">
              A centralized digital business directory for student
              entrepreneurs, startups, alumni ventures and independent campus
              stalls — built by the {siteConfig.council}.
            </p>
            <div className="flex gap-2">
              <SocialLink
                href="https://instagram.com/openbazar.ggdsd"
                icon="instagram"
                label="Open Bazar on Instagram"
                className="bg-pine-900 text-paper-200 hover:bg-pine-800 hover:text-white"
              />
              <SocialLink
                href="https://linkedin.com/company/ggdsd-open-bazar"
                icon="linkedin"
                label="Open Bazar on LinkedIn"
                className="bg-pine-900 text-paper-200 hover:bg-pine-800 hover:text-white"
              />
              <SocialLink
                href="https://youtube.com/@ggdsdiic"
                icon="youtube"
                label="GGDSD IIC on YouTube"
                className="bg-pine-900 text-paper-200 hover:bg-pine-800 hover:text-white"
              />
              <SocialLink
                href="https://twitter.com/openbazar_ggdsd"
                icon="twitter"
                label="Open Bazar on Twitter"
                className="bg-pine-900 text-paper-200 hover:bg-pine-800 hover:text-white"
              />
            </div>
          </div>

          {/* Link sections */}
          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-brass-300">
                {section.title}
              </h2>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-pine-200/85 transition-colors hover:text-white hover:underline underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-pine-900 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-pine-300/70">
            © {new Date().getFullYear()} {siteConfig.institution} · {siteConfig.council}. All demo content is fictional.
          </p>
          <p className="flex items-center gap-2 text-xs text-pine-300/70">
            <LogoMark size={16} />
            <span>
              Frontend demonstration prototype — no real listings, orders or
              registrations are processed.
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
