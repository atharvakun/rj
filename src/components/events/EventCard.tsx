import { categoryLabels, getEventYear, isUpcoming } from "@/content";
import type { EventRecord } from "@/content/types";
import { cn } from "@/lib/utils";
import { RevealImage } from "@/components/motion/RevealImage";
import { TransitionLink } from "@/components/ui/TransitionLink";

type Props = {
  event: EventRecord;
  aspect?: "portrait" | "landscape" | "square" | "wide";
  className?: string;
  titleClassName?: string;
  index?: number;
  showSummary?: boolean;
  priority?: boolean;
  reveal?: "up" | "left" | "right" | "none";
  sizes?: string;
};

const aspects = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

export function EventCard({
  event,
  aspect = "landscape",
  className,
  titleClassName,
  index,
  showSummary = false,
  priority,
  reveal = "up",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: Props) {
  const upcoming = isUpcoming(event);
  return (
    <TransitionLink
      href={`/events/${event.slug}`}
      data-cursor="label"
      data-cursor-label={upcoming ? "View event" : "View experience"}
      className={cn("group block", className)}
    >
      <RevealImage
        image={event.cover}
        sizes={sizes}
        priority={priority}
        className={cn("w-full", aspects[aspect])}
        hoverZoom
        reveal={reveal}
        parallax={0.1}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-40" />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between text-bone">
          {typeof index === "number" ? (
            <span className="font-mono text-xs">{index.toString().padStart(2, "0")}</span>
          ) : (
            <span />
          )}
          <span className={cn("eyebrow", upcoming && "rounded-full bg-ember px-2.5 py-1.5 text-ink")}>
            {upcoming ? "Upcoming" : categoryLabels[event.category]}
          </span>
        </div>
      </RevealImage>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className={cn("font-display text-display-sm text-balance transition-transform duration-700 ease-out-expo group-hover:translate-x-1", titleClassName)}>
            {event.title}
          </h3>
          <p className="mt-2 flex flex-wrap gap-x-3 text-sm opacity-60">
            <span>{getEventYear(event)}</span>
            <span>{event.venue.city}</span>
            <span>{categoryLabels[event.category]}</span>
          </p>
          {showSummary && <p className="mt-3 max-w-md text-sm leading-relaxed opacity-70">{event.summary}</p>}
        </div>
      </div>
    </TransitionLink>
  );
}
