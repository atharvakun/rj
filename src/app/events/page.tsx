import type { Metadata } from "next";
import { allEvents, getCategoriesInUse, getPastEvents, getUpcomingEvents, getYearsInUse } from "@/content";
import { home } from "@/content/home";
import { PageHeader } from "@/components/layout/PageHeader";
import { ExperiencesArchive } from "@/components/home/ExperiencesArchive";
import { EventsIndex } from "@/components/events/EventsIndex";
import { TextReveal } from "@/components/motion/TextReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Experiences",
  description: "An archive of festivals, concerts, exhibitions and community gatherings, past and upcoming.",
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();
  const events = [...upcoming, ...past];
  const cities = new Set(allEvents.map((e) => e.venue.city)).size;
  const intro = `${allEvents.length} gatherings across ${getYearsInUse().length} years and ${cities} cities. Scroll the archive, or filter everything by kind and year.`;

  return (
    <div className="theme-stage">
      <PageHeader eyebrow={home.pages.events.eyebrow} title={home.pages.events.title} intro={intro} className="pb-0 md:pb-0" />
      <ExperiencesArchive events={past} />
      <section id="all" className="container-x scroll-mt-16 pb-32 pt-28 md:pt-40" aria-labelledby="all-title">
        <Eyebrow>{home.archive.allEyebrow}</Eyebrow>
        <TextReveal as="h2" id="all-title" className="mt-6 font-display text-display-md text-balance">
          {home.archive.allTitle}
        </TextReveal>
        <div className="mt-14">
          <EventsIndex events={events} categories={getCategoriesInUse()} years={getYearsInUse()} />
        </div>
      </section>
    </div>
  );
}
