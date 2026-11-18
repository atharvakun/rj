import { getPastEvents, getUpcomingEvents } from "@/content";
import { Hero } from "@/components/home/Hero";
import { PhotoStrip } from "@/components/home/PhotoStrip";
import { About } from "@/components/home/About";
import { UpcomingEvent } from "@/components/home/UpcomingEvent";
import { Awards } from "@/components/home/Awards";
import { Contact } from "@/components/home/Contact";

/**
 * The whole site on one page: hero, where we come from, about (with the
 * team), upcoming events, the awards, contact. Upcoming / past is decided at
 * build time (static export); redeploy to refresh it.
 */
export default function HomePage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <>
      <Hero next={upcoming[0] ?? null} />
      <PhotoStrip />
      <About />
      <UpcomingEvent events={upcoming} fallback={past[0] ?? null} />
      <Awards />
      <Contact />
    </>
  );
}
