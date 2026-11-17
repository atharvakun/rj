import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import {
  getAdjacentEvents,
  getAllSlugs,
  getEventBySlug,
  getRelatedEvents,
  isUpcoming,
  site,
} from "@/content";
import { formatDateRange, formatLongDate, formatTimeRange } from "@/lib/dates";
import { EventHero } from "@/components/events/EventHero";
import { Gallery } from "@/components/events/Gallery";
import { VideoHighlights } from "@/components/events/VideoHighlights";
import { Memories } from "@/components/events/Memories";
import { RelatedEvents } from "@/components/events/RelatedEvents";
import { Countdown } from "@/components/events/Countdown";
import { TextReveal } from "@/components/motion/TextReveal";
import { Stagger } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { registrationHref } from "@/components/home/UpcomingEvent";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  const title = `${event.title} — ${event.venue.city}`;
  return {
    title,
    description: event.summary,
    openGraph: {
      title,
      description: event.summary,
      images: [{ url: event.cover.src, alt: event.cover.alt }],
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description: event.summary, images: [event.cover.src] },
  };
}

export default async function EventPage({ params }: { params: Params }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const upcoming = isUpcoming(event);
  const related = getRelatedEvents(event, 3);
  const { older, newer } = getAdjacentEvents(event);
  const next = older ?? newer;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary,
    startDate: event.startsAt,
    endDate: event.endsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [event.cover.src],
    location: {
      "@type": "Place",
      name: event.venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.venue.address,
        addressLocality: event.venue.city,
        addressCountry: event.venue.country,
      },
    },
    organizer: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/events/${event.slug}`,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EventHero event={event} upcoming={upcoming} />

      {/* Introduction */}
      <section className="theme-stage container-x py-24 md:py-36">
        <div className="grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Stagger as="dl" className="space-y-7 border-t border-smoke pt-7" y={16}>
                <div>
                  <dt className="eyebrow text-ash">When</dt>
                  <dd className="mt-2">{formatLongDate(event.startsAt, event.timeZone)}</dd>
                  <dd className="text-sm text-ash">
                    {formatDateRange(event.startsAt, event.endsAt, event.timeZone)} · {formatTimeRange(event.startsAt, event.endsAt, event.timeZone)}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-ash">Where</dt>
                  <dd className="mt-2">{event.venue.name}</dd>
                  {event.venue.address && <dd className="text-sm text-ash">{event.venue.address}</dd>}
                  <dd className="text-sm text-ash">
                    {event.venue.city}
                    {event.venue.country ? `, ${event.venue.country}` : ""}
                  </dd>
                  {event.venue.mapUrl && (
                    <dd className="mt-2">
                      <a href={event.venue.mapUrl} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-1 text-sm">
                        Open map <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </a>
                    </dd>
                  )}
                </div>
                {event.facts && event.facts.length > 0 && (
                  <div>
                    <dt className="eyebrow text-ash">At a glance</dt>
                    <dd className="mt-3 grid grid-cols-3 gap-4">
                      {event.facts.map((f) => (
                        <span key={f.label}>
                          <span className="block font-display text-3xl leading-none">{f.value}</span>
                          <span className="mt-1.5 block text-xs text-ash">{f.label}</span>
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </Stagger>
            </div>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <Eyebrow>{upcoming ? "About the event" : "The story"}</Eyebrow>
            <TextReveal as="p" className="mt-6 font-display text-[clamp(1.6rem,2.8vw,2.75rem)] leading-[1.15] text-balance">
              {event.summary}
            </TextReveal>
            <div className="mt-10 space-y-6 text-pretty text-base leading-relaxed text-bone/75 md:text-lg">
              {event.body.map((p, i) => (
                <TextReveal key={i} as="p" delay={0.05 * i}>
                  {p}
                </TextReveal>
              ))}
            </div>

            {upcoming && (
              <div className="mt-14 border-t border-smoke pt-10">
                <Eyebrow>Doors open in</Eyebrow>
                <Countdown startsAt={event.startsAt} endsAt={event.endsAt} size="compact" className="mt-6" />
                <Stagger className="mt-10 flex flex-wrap gap-4">
                  <Button href={registrationHref(event)} size="lg" variant="ember">
                    {event.registrationUrl ? "Register" : "Register interest"}
                  </Button>
                  <Button href="/contact" variant="outline" size="lg">
                    Ask a question
                  </Button>
                </Stagger>
              </div>
            )}
          </div>
        </div>
      </section>

      <Gallery images={event.gallery} title={event.title} />
      <VideoHighlights videos={event.videos} />
      <Memories memories={event.memories} />
      <RelatedEvents related={related} next={next} />
    </article>
  );
}
