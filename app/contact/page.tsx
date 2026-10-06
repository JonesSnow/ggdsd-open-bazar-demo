import type { Metadata } from "next";
import { Icon } from "@/src/components/ui/icon";
import { Card } from "@/src/components/ui/card";
import { Container, PageHeader, Reveal, SectionHeading } from "@/src/components/ui/section";
import { ContactForm } from "@/src/components/contact/contact-form";
import { footerSections, siteConfig } from "@/src/data/site";
import { locations } from "@/src/data/locations";

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description: "Contact GGDSD Open Bazar, submit an enquiry, or find campus utilities.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the bazar team"
        description="Questions about listings, registrations or the IIC? Send an enquiry — a coordinator replies within two working days."
        className="border-b border-paper-200 bg-paper-100/60"
      />

      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Enquiry form */}
          <Reveal>
            <ContactForm />
          </Reveal>

          {/* Info rail */}
          <aside className="space-y-5 lg:sticky lg:top-40 lg:self-start">
            <Reveal delay={80}>
              <Card className="p-6">
                <h2 className="font-display text-lg font-semibold text-ink-950">
                  IIC Office
                </h2>
                <ul className="mt-4 space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pine-50 text-pine-700">
                      <Icon name="map-pin" size={17} />
                    </span>
                    <span>
                      <span className="block font-medium text-ink-800">
                        Innovation Block, 2nd Floor
                      </span>
                      <span className="text-ink-500">
                        GGDSD College, Sector 32-B, Chandigarh
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pine-50 text-pine-700">
                      <Icon name="clock" size={17} />
                    </span>
                    <span>
                      <span className="block font-medium text-ink-800">
                        Mon – Sat, 10 AM – 6 PM
                      </span>
                      <span className="text-ink-500">
                        Closed on Sundays and college holidays
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pine-50 text-pine-700">
                      <Icon name="mail" size={17} />
                    </span>
                    <span>
                      <a
                        href="mailto:hello@openbazar.example.com"
                        className="font-medium text-pine-700 hover:underline underline-offset-4"
                      >
                        hello@openbazar.example.com
                      </a>
                      <span className="block text-ink-500">
                        Demo inbox — reserved domain
                      </span>
                    </span>
                  </li>
                </ul>
              </Card>
            </Reveal>

            <Reveal delay={120}>
              <Card variant="outlined" className="p-6">
                <h2 className="font-display text-lg font-semibold text-ink-950">
                  Campus stall locations
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {locations.map((location) => (
                    <li key={location.id} className="flex items-start gap-2.5 text-sm">
                      <Icon name="dot" size={8} className="mt-2 shrink-0 text-brass-500" />
                      <span>
                        <span className="font-medium text-ink-800">{location.name}</span>
                        <span className="text-ink-500"> · {location.building}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-card bg-ink-900 p-6 text-paper-100">
                <h2 className="font-display text-lg font-semibold">
                  Quick links
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {footerSections
                    .flatMap((section) => section.links)
                    .slice(0, 6)
                    .map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="inline-flex items-center gap-1.5 text-paper-200 transition-colors hover:text-white hover:underline underline-offset-4"
                        >
                          <Icon name="arrow-right" size={13} className="text-brass-400" />
                          {link.label}
                        </a>
                      </li>
                    ))}
                </ul>
                <p className="mt-5 border-t border-ink-800 pt-4 text-xs text-ink-400">
                  {siteConfig.demoNotice}
                </p>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* Site map */}
        <div id="site-map" className="mt-20">
          <SectionHeading
            eyebrow="Utilities"
            title="Site map"
            align="left"
            level={2}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {footerSections.map((section) => (
              <Card key={section.title} variant="outlined" className="p-5">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-pine-700">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-ink-600 transition-colors hover:text-pine-700 hover:underline underline-offset-4"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
