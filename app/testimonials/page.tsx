import { redirect } from "next/navigation";

/**
 * The community stories page moved to /stories.
 * Old links and bookmarks keep working via this redirect.
 */
export default function TestimonialsRedirect() {
  redirect("/stories");
}
