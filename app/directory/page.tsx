import { redirect } from "next/navigation";

/**
 * The Explore Shops experience moved to /explore-shops.
 * Old links and bookmarks keep working via this redirect.
 */
export default function DirectoryRedirect() {
  redirect("/explore-shops");
}