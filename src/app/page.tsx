import { getUpcomingEvents } from "@/content";
import { Hero } from "@/components/home/Hero";
import { PhotoStrip } from "@/components/home/PhotoStrip";
import { Directory } from "@/components/home/Directory";

/**
 * Home: gate intro (client), hero, where we come from, then four doors to
 * the inner pages. Upcoming / past is decided at build time (static
 * export); redeploy to refresh the "next event" in the hero.
 */
export default function HomePage() {
  const upcoming = getUpcomingEvents();
  return (
    <>
      <Hero next={upcoming[0] ?? null} />
      <PhotoStrip />
      <Directory />
    </>
  );
}
