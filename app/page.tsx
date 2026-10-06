import { businesses, getFeaturedBusinesses } from "@/src/data/businesses";
import { categories } from "@/src/data/categories";
import { testimonials } from "@/src/data/testimonials";
import { announcements } from "@/src/data/site";
import { Hero } from "@/src/components/home/hero";
import { CategoryShowcase } from "@/src/components/home/category-showcase";
import { FeaturedBusinesses } from "@/src/components/home/featured-businesses";
import { StartupEcosystem } from "@/src/components/home/startup-ecosystem";
import { EventSection } from "@/src/components/home/event-section";
import { HowItWorks, StatsBand } from "@/src/components/home/how-it-works";
import { TestimonialCarousel } from "@/src/components/home/testimonials";
import { CtaBanner, Ticker } from "@/src/components/home/cta-banner";
import { Icon } from "@/src/components/ui/icon";

const STATS = [
  {
    value: "19",
    suffix: "+",
    label: "Registered businesses",
    icon: <Icon name="store" size={20} />,
  },
  {
    value: "10",
    suffix: "",
    label: "Active categories",
    icon: <Icon name="layout-grid" size={20} />,
  },
  {
    value: "6",
    suffix: "",
    label: "Campus locations",
    icon: <Icon name="map-pin" size={20} />,
  },
  {
    value: "4.8",
    suffix: "/5",
    label: "Average rating",
    icon: <Icon name="star" size={20} />,
  },
];

/**
 * Homepage flow:
 * 1. Hero / Open Bazar introduction
 * 2. Announcements ticker
 * 3. Explore shops (categories)
 * 4. Featured businesses
 * 5. Startup ecosystem
 * 6. Why Open Bazar
 * 7. Community impact numbers
 * 8. Upcoming Open Bazaar event
 * 9. Student & community experiences
 * 10. Become a seller CTA
 */
export default function HomePage() {
  const featured = getFeaturedBusinesses();
  const heroBusinesses = featured.slice(0, 3);

  return (
    <>
      <Hero featured={heroBusinesses} />
      <Ticker items={announcements} />
      <CategoryShowcase categories={categories} />
      <FeaturedBusinesses businesses={businesses} />
      <StartupEcosystem ventures={businesses} />
      <HowItWorks />
      <StatsBand stats={STATS} />
      <EventSection />
      <TestimonialCarousel testimonials={testimonials} />
      <CtaBanner />
      <JsonLd />
    </>
  );
}

/** Structured data for search engines. */
function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GGDSD Open Bazar",
    description:
      "Student business directory of GGDSD College, Chandigarh, run by the Institutions' Innovation Council.",
    url: "https://openbazar.ggdsd.ac.in",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://openbazar.ggdsd.ac.in/directory?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
