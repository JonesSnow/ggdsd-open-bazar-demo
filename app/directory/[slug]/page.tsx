import { permanentRedirect } from "next/navigation";

/** Keep previously shared business profile links working after the route move. */
export default async function LegacyBusinessProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/explore-shops/${encodeURIComponent(slug)}`);
}
