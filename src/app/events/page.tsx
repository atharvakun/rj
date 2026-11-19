import type { Metadata } from "next";
import { getPastEvents, getUpcomingEvents } from "@/content";
import { home } from "@/content/home";
import { UpcomingEvent } from "@/components/home/UpcomingEvent";
import { EventCard } from "@/components/events/EventCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";
import { Stagger } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: home.pages.events.title,
  description: home.pages.events.description,
};

/**
 * Events: the next gathering in full (countdown, venue, registration), the
 * rest of the calendar, then the archive. Upcoming / past is decided at
 * build time; redeploy after an event to move it into the archive.
 */
export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <>
      <UpcomingEvent standalone events={upcoming} fallback={past[0] ?? null} />

      {past.length > 0 && (
        <section className="theme-paper relative" aria-label={home.pages.events.pastEyebrow}>
          <div className="container-x pb-28 pt-20 md:pb-40 md:pt-28">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <Eyebrow className="text-clay">{home.pages.events.pastEyebrow}</Eyebrow>
                <TextReveal as="h2" className="mt-5 font-display text-display-md text-balance">
                  {home.pages.events.pastTitle}
                </TextReveal>
              </div>
            </div>
            <Stagger as="ul" className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3" selector=":scope > li" y={28} stagger={0.08}>
              {past.map((event, i) => (
                <li key={event.slug}>
                  <EventCard event={event} index={i + 1} aspect="landscape" sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw" />
                </li>
              ))}
            </Stagger>
          </div>
        </section>
      )}
    </>
  );
}
