"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, MapPin } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { categoryLabels, getEventYear } from "@/content";
import type { EventRecord } from "@/content/types";
import { formatDateRange, formatTimeRange } from "@/lib/dates";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function EventHero({ event, upcoming }: { event: EventRecord; upcoming: boolean }) {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!root.current || reduced) return;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.2 });
      tl.fromTo(media.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.5, ease: "power4.inOut" }, 0)
        .fromTo(q("[data-img]"), { scale: 1.25 }, { scale: 1, duration: 2.2, ease: "power3.out" }, 0)
        .fromTo(q("[data-word] > span"), { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.05 }, 0.6)
        .fromTo(q("[data-fade]"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08 }, 0.9);

      gsap.to(q("[data-img]"), {
        yPercent: 18,
        scale: 1.1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q("[data-content]"), {
        yPercent: -20,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "80% top", scrub: true },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section ref={root} className="theme-dark relative flex h-[100svh] min-h-[640px] flex-col justify-end overflow-hidden bg-ink text-bone">
      <div ref={media} className="absolute inset-0" style={{ clipPath: reduced ? undefined : "inset(0 0 100% 0)" }}>
        <div data-img className="absolute inset-0 will-change-transform">
          <Image
            src={event.cover.src}
            alt={event.cover.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: event.cover.position ?? "50% 50%" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/30" />
        <div className="absolute inset-0 grain" />
      </div>

      <div className="container-x absolute inset-x-0 top-nav z-10 flex items-center justify-between pt-6">
        <TransitionLink href="/#events" data-fade className="group inline-flex items-center gap-2 text-sm opacity-0">
          <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" strokeWidth={1.75} />
          <span className="link-line">All events</span>
        </TransitionLink>
        <span data-fade className="eyebrow opacity-0">
          {upcoming ? "Upcoming" : getEventYear(event)} · {categoryLabels[event.category]}
        </span>
      </div>

      <div data-content className="container-x relative z-10 pb-10 md:pb-14">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div data-fade className="opacity-0">
              <Eyebrow>{event.strapline ?? categoryLabels[event.category]}</Eyebrow>
            </div>
            <h1 className="mt-6 font-display text-display-xl text-balance">
              {event.title.split(" ").map((w, i) => (
                <span key={i} data-word className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
                  <span className="inline-block">{w}</span>
                </span>
              ))}
            </h1>
          </div>
          <dl data-fade className="grid grid-cols-2 gap-6 text-sm opacity-0 lg:col-span-4 lg:pb-4">
            <div>
              <dt className="eyebrow text-ash">Date</dt>
              <dd className="mt-2">{formatDateRange(event.startsAt, event.endsAt, event.timeZone)}</dd>
              <dd className="text-ash">{formatTimeRange(event.startsAt, event.endsAt, event.timeZone)}</dd>
            </div>
            <div>
              <dt className="eyebrow flex items-center gap-1.5 text-ash">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} /> Venue
              </dt>
              <dd className="mt-2">{event.venue.name}</dd>
              <dd className="text-ash">
                {event.venue.city}
                {event.venue.country ? `, ${event.venue.country}` : ""}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
