import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { EventRecord } from "@/content/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { RevealImage } from "@/components/motion/RevealImage";
import { EventCard } from "./EventCard";

export function RelatedEvents({
  related,
  next,
}: {
  related: EventRecord[];
  next: EventRecord | null;
}) {
  return (
    <section className="theme-stage border-t border-smoke" aria-label="Related events">
      {related.length > 0 && (
        <div className="container-x py-24 md:py-36">
          <div className="flex items-end justify-between">
            <div>
              <Eyebrow>Related</Eyebrow>
              <TextReveal as="h2" className="mt-5 font-display text-display-md">
                More like this
              </TextReveal>
            </div>
            <TransitionLink href="/#events" className="group hidden items-center gap-2 text-sm md:inline-flex">
              <span className="link-line">All events</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" strokeWidth={1.75} />
            </TransitionLink>
          </div>
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {related.map((e, i) => (
              <li key={e.slug} className={i === 1 ? "md:mt-16" : ""}>
                <EventCard event={e} aspect={i === 1 ? "portrait" : "landscape"} sizes="(min-width: 768px) 33vw, 100vw" />
              </li>
            ))}
          </ul>
        </div>
      )}

      {next && (
        <TransitionLink
          href={`/events/${next.slug}`}
          data-cursor="label"
          data-cursor-label="Next"
          className="group relative block overflow-hidden border-t border-smoke"
        >
          <RevealImage image={next.cover} sizes="100vw" className="h-[70vh] min-h-[28rem] w-full" parallax={0.3} reveal="none" hoverZoom>
            <div className="theme-dark absolute inset-0 bg-ink/55 transition-colors duration-700 group-hover:bg-ink/40" />
          </RevealImage>
          <div className="theme-dark container-x absolute inset-0 flex flex-col justify-between py-10 text-bone">
            <span className="eyebrow">Next event</span>
            <div className="flex items-end justify-between gap-6">
              <span className="font-display text-display-lg text-balance transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
                {next.title}
              </span>
              <ArrowUpRight className="h-10 w-10 shrink-0 transition-transform duration-700 ease-out-expo group-hover:translate-x-2 group-hover:-translate-y-2 md:h-16 md:w-16" strokeWidth={1} />
            </div>
          </div>
        </TransitionLink>
      )}
    </section>
  );
}
