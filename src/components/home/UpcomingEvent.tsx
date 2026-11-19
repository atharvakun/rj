import { ArrowUpRight, MapPin, CalendarDays, Clock } from "lucide-react";
import type { EventRecord } from "@/content/types";
import { home } from "@/content/home";
import { categoryLabels } from "@/content";
import { formatDateParts, formatDateRange, formatTimeRange } from "@/lib/dates";
import { cn, pad2 } from "@/lib/utils";
import { TextReveal } from "@/components/motion/TextReveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { Stagger } from "@/components/motion/Stagger";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Countdown } from "@/components/events/Countdown";

export function registrationHref(event: EventRecord) {
  return event.registrationUrl ?? `/contact?event=${encodeURIComponent(event.slug)}`;
}

type Props = {
  events: EventRecord[];
  fallback: EventRecord | null;
  className?: string;
  /** Render as a page: h1 heading and room for the nav. */
  standalone?: boolean;
};

export function UpcomingEvent({ events, fallback, className, standalone = false }: Props) {
  const next = events[0];
  const padding = className ?? (standalone ? "pt-32 md:pt-44" : "pt-24 md:pt-32");

  if (!next) {
    return <ComingSoon fallback={fallback} className={padding} standalone={standalone} />;
  }

  const start = formatDateParts(next.startsAt, next.timeZone);
  const poster = next.poster ?? next.cover;

  return (
    <section id="events" className="relative theme-stage scroll-mt-16">
      <div className={cn("container-x pb-28 md:pb-40", padding)}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="order-2 flex flex-col lg:order-1 lg:col-span-7">
            <div className="flex items-center justify-between">
              <Eyebrow>
                {home.events.eyebrow} · {pad2(1)}/{pad2(events.length)}
              </Eyebrow>
              <span className="eyebrow text-ash">{categoryLabels[next.category]}</span>
            </div>

            <TextReveal as={standalone ? "h1" : "h2"} className="mt-8 font-display text-display-lg text-balance" split="lines">
              {next.title}
            </TextReveal>
            {next.strapline && (
              <TextReveal as="p" className="mt-6 max-w-xl text-lead text-bone/80" delay={0.2}>
                {next.strapline}
              </TextReveal>
            )}

            <Stagger className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-smoke pt-8 md:grid-cols-4" y={24}>
              <Meta icon={<CalendarDays className="h-4 w-4" strokeWidth={1.5} />} label="Date">
                {formatDateRange(next.startsAt, next.endsAt, next.timeZone)}
              </Meta>
              <Meta icon={<Clock className="h-4 w-4" strokeWidth={1.5} />} label="Time">
                {formatTimeRange(next.startsAt, next.endsAt, next.timeZone)}
                <span className="block text-xs text-ash">{start.weekday} start</span>
              </Meta>
              <Meta icon={<MapPin className="h-4 w-4" strokeWidth={1.5} />} label="Venue">
                {next.venue.name}
              </Meta>
              <Meta label="City">
                {next.venue.city}
                {next.venue.country ? `, ${next.venue.country}` : ""}
              </Meta>
            </Stagger>

            <TextReveal as="p" className="mt-10 max-w-2xl text-pretty text-base leading-relaxed text-bone/75 md:text-lg" delay={0.1}>
              {next.summary}
            </TextReveal>

            <Stagger className="mt-10 flex flex-wrap items-center gap-4" y={16}>
              <Button href={registrationHref(next)} size="lg" variant="ember">
                {next.registrationUrl ? "Register" : home.events.registerCta}
              </Button>
              <Button href={`/events/${next.slug}`} variant="outline" size="lg">
                Event details
              </Button>
            </Stagger>
          </div>

          {/* Poster */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative lg:sticky lg:top-24">
              <RevealImage
                image={poster}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/5] w-full"
                parallax={0.25}
                reveal="up"
              >
                <div className="theme-dark absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="theme-dark absolute left-5 top-5 flex items-baseline gap-2 text-bone">
                  <span className="font-display text-5xl leading-none md:text-6xl">{start.day}</span>
                  <span className="eyebrow">
                    {start.month}
                    <br />
                    {start.year}
                  </span>
                </div>
              </RevealImage>
              <TransitionLink
                href={`/events/${next.slug}`}
                data-cursor="label"
                data-cursor-label="View event"
                className="absolute inset-0"
                aria-label={`View ${next.title}`}
              />
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-20 border-t border-smoke pt-10 md:mt-28">
          <div className="mb-8 flex items-center justify-between">
            <Eyebrow>{home.events.countdown}</Eyebrow>
            <span className="hidden font-mono text-xs text-ash md:block">
              {start.weekday}, {start.day} {start.month} {start.year} · {start.time}
            </span>
          </div>
          <Countdown startsAt={next.startsAt} endsAt={next.endsAt} />
        </div>

        {/* Other upcoming */}
        {events.length > 1 && (
          <div className="mt-20 border-t border-smoke md:mt-28">
            <p className="eyebrow py-6 text-ash">{home.events.alsoComing}</p>
            <ul>
              {events.slice(1).map((e, i) => {
                const p = formatDateParts(e.startsAt, e.timeZone);
                return (
                  <li key={e.slug} className="border-t border-smoke">
                    <TransitionLink
                      href={`/events/${e.slug}`}
                      className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6 md:grid-cols-[6rem_1fr_1fr_auto] md:gap-10"
                    >
                      <span className="font-mono text-xs text-ash">{pad2(i + 2)}</span>
                      <span className="min-w-0">
                        <span className="block font-display text-display-sm transition-transform duration-700 ease-out-expo group-hover:translate-x-2">
                          {e.title}
                        </span>
                        <span className="mt-1 block text-sm text-ash md:hidden">
                          {p.day} {p.month} · {e.venue.city}
                        </span>
                      </span>
                      <span className="hidden text-sm text-ash md:block">
                        {p.weekday}, {p.day} {p.month} {p.year}
                        <span className="block">
                          {e.venue.name}, {e.venue.city}
                        </span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-ash transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-bone" strokeWidth={1.5} />
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function Meta({ icon, label, children }: { icon?: React.ReactNode; label: string; children: React.ReactNode }) {
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

function ComingSoon({ fallback, className, standalone }: { fallback: EventRecord | null; className: string; standalone: boolean }) {
  return (
    <section id="events" className="relative theme-stage">
      <div className={cn("container-x pb-28 md:pb-40", className)}>
        <Eyebrow>{home.events.eyebrow}</Eyebrow>
        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <TextReveal as={standalone ? "h1" : "h2"} className="font-display text-display-lg text-balance">
              {home.events.comingSoonTitle}
            </TextReveal>
            <TextReveal as="p" className="mt-6 max-w-xl text-lead text-bone/80" delay={0.15}>
              {home.events.comingSoonBody}
            </TextReveal>
            <Stagger className="mt-10 flex gap-4">
              <Button href="/contact" size="lg" variant="ember">
                Keep me posted
              </Button>
            </Stagger>
          </div>
          {fallback && (
            <div className="lg:col-span-5">
              <p className="eyebrow mb-4 text-ash">Most recently</p>
              <TransitionLink href={`/events/${fallback.slug}`} data-cursor="label" data-cursor-label="View event" className="block">
                <RevealImage image={fallback.cover} sizes="(min-width:1024px) 40vw, 100vw" className="aspect-[4/5]" parallax={0.2} hoverZoom />
                <p className="mt-4 font-display text-display-sm">{fallback.title}</p>
                <p className="mt-1 text-sm text-ash">
                  {fallback.venue.city} · {new Date(fallback.startsAt).getFullYear()}
                </p>
              </TransitionLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
