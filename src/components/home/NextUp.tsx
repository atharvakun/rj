import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import type { EventRecord } from "@/content/types";
import { categoryLabels } from "@/content";
import { home } from "@/content/home";
import { formatDateParts, formatDateRange, formatTimeRange } from "@/lib/dates";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { TextReveal } from "@/components/motion/TextReveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { Stagger } from "@/components/motion/Stagger";
import { Countdown } from "@/components/events/Countdown";
import { registrationHref } from "./UpcomingEvent";

/**
 * Home teaser for the next gathering: title, essentials, a compact live
 * countdown and the way through to the full Upcoming page.
 */
export function NextUp({ event, fallback }: { event: EventRecord | null; fallback: EventRecord | null }) {
  if (!event) return <NothingScheduled fallback={fallback} />;

  const start = formatDateParts(event.startsAt, event.timeZone);
  const poster = event.poster ?? event.cover;

  return (
    <section id="next" className="theme-stage relative scroll-mt-16 border-t border-smoke">
      <div className="container-x py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <div className="flex items-center justify-between">
              <Eyebrow>{home.next.eyebrow}</Eyebrow>
              <span className="eyebrow text-ash">{categoryLabels[event.category]}</span>
            </div>
            <TextReveal as="h2" className="mt-8 font-display text-display-lg text-balance">
              {event.title}
            </TextReveal>
            {event.strapline && (
              <TextReveal as="p" className="mt-6 max-w-xl text-lead text-bone/80" delay={0.15}>
                {event.strapline}
              </TextReveal>
            )}

            <Stagger className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-smoke pt-8" y={20}>
              <Fact icon={<CalendarDays className="h-4 w-4" strokeWidth={1.5} />} label="Date">
                {formatDateRange(event.startsAt, event.endsAt, event.timeZone)}
              </Fact>
              <Fact icon={<Clock className="h-4 w-4" strokeWidth={1.5} />} label="Time">
                {formatTimeRange(event.startsAt, event.endsAt, event.timeZone)}
              </Fact>
              <Fact icon={<MapPin className="h-4 w-4" strokeWidth={1.5} />} label="Where">
                {event.venue.name}, {event.venue.city}
              </Fact>
            </Stagger>

            <div className="mt-10">
              <Countdown startsAt={event.startsAt} endsAt={event.endsAt} size="compact" />
            </div>

            <Stagger className="mt-10 flex flex-wrap items-center gap-4" y={16}>
              <Button href={registrationHref(event)} size="lg" variant="ember">
                {event.registrationUrl ? "Register" : "Register interest"}
              </Button>
              <Button href="/upcoming" variant="outline" size="lg">
                {home.next.cta}
              </Button>
            </Stagger>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-4 lg:col-start-9">
            <div className="relative">
              <RevealImage image={poster} sizes="(min-width: 1024px) 32vw, 100vw" className="aspect-[4/5] w-full" parallax={0.2} reveal="up">
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 flex items-baseline gap-2 text-bone">
                  <span className="font-display text-5xl leading-none md:text-6xl">{start.day}</span>
                  <span className="eyebrow">
                    {start.month}
                    <br />
                    {start.year}
                  </span>
                </div>
              </RevealImage>
              <TransitionLink
                href={`/events/${event.slug}`}
                data-cursor="label"
                data-cursor-label="View event"
                className="absolute inset-0"
                aria-label={`View ${event.title}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow flex items-center gap-2 text-ash">
        {icon}
        {label}
      </p>
      <p className="mt-3 text-[0.95rem] leading-snug md:text-base">{children}</p>
    </div>
  );
}

function NothingScheduled({ fallback }: { fallback: EventRecord | null }) {
  return (
    <section id="next" className="theme-stage relative scroll-mt-16 border-t border-smoke">
      <div className="container-x py-24 md:py-32">
        <Eyebrow>{home.next.eyebrow}</Eyebrow>
        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <TextReveal as="h2" className="font-display text-display-lg text-balance">
              {home.upcoming.comingSoonTitle}
            </TextReveal>
            <TextReveal as="p" className="mt-6 max-w-xl text-lead text-bone/80" delay={0.15}>
              {home.upcoming.comingSoonBody}
            </TextReveal>
            <Stagger className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact" size="lg" variant="ember">
                Keep me posted
              </Button>
              <Button href="/events" variant="outline" size="lg">
                Past experiences
              </Button>
            </Stagger>
          </div>
          {fallback && (
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="eyebrow mb-4 text-ash">Most recently</p>
              <TransitionLink href={`/events/${fallback.slug}`} data-cursor="label" data-cursor-label="View experience" className="group block">
                <RevealImage image={fallback.cover} sizes="(min-width:1024px) 32vw, 100vw" className="aspect-[4/5]" parallax={0.2} hoverZoom />
                <p className="mt-4 flex items-center gap-2 font-display text-display-sm">
                  {fallback.title}
                  <ArrowRight className="h-5 w-5 text-ash transition-transform duration-500 ease-out-expo group-hover:translate-x-1" strokeWidth={1.5} />
                </p>
              </TransitionLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
