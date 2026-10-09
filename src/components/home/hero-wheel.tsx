import type { Business } from "@/src/types";
import { businessCoverArt } from "@/src/utils/images";
import { getCategoryById } from "@/src/data/categories";
import { HeroWheelMotion, type HeroWheelItem } from "./hero-wheel-motion";

interface HeroWheelProps {
  businesses: Business[];
}
/**
 * Keep listing details and images rendered in the server response while sending
 * only the small card fields needed by the interactive stream to the client.
 */
export function HeroWheel({ businesses }: HeroWheelProps) {
  const items: HeroWheelItem[] = businesses.map((business) => ({
    id: business.id,
    name: business.name,
    slug: business.slug,
    tagline: business.tagline,
    type: business.type,
    categoryName: getCategoryById(business.categoryIds[0])?.name ?? "Campus business",
    rating: business.rating,
    reviewCount: business.reviewCount,
    coverArt: businessCoverArt(business),
  }));

  if (items.length === 0) return null;

  return <HeroWheelMotion items={items} />;
}
