"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLenis } from "@/components/layout/SmoothScroll";
import { categoryLabels, getEventYear } from "@/content";
import type { EventCategory, EventRecord } from "@/content/types";
import { home } from "@/content/home";
import { cn, pad2 } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { useTransition } from "@/components/layout/TransitionProvider";

/** Rhythm of card sizes and vertical offsets, repeated across the track. */
const layouts = [
  { w: "w-[78vw] md:w-[34vw]", h: "h-[58vh] md:h-[64vh]", off: "md:mt-0" },
  { w: "w-[72vw] md:w-[24vw]", h: "h-[52vh] md:h-[44vh]", off: "md:-mt-[18vh]" },
  { w: "w-[82vw] md:w-[42vw]", h: "h-[58vh] md:h-[70vh]", off: "md:mt-[6vh]" },
  { w: "w-[70vw] md:w-[26vw]", h: "h-[50vh] md:h-[50vh]", off: "md:mt-[14vh]" },
  { w: "w-[76vw] md:w-[30vw]", h: "h-[56vh] md:h-[58vh]", off: "md:-mt-[10vh]" },
];

export function ExperiencesArchive({ events }: { events: EventRecord[] }) {
  const root = useRef<HTMLElement>(null);
  const pinWrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const { navigate } = useTransition();
  const [filter, setFilter] = useState<EventCategory | "all">("all");

  const categories = useMemo(() => {
    const set = new Set(events.map((e) => e.category));
    return (Object.keys(categoryLabels) as EventCategory[]).filter((c) => set.has(c));
  }, [events]);

  const visible = useMemo(
    () => (filter === "all" ? events : events.filter((e) => e.category === filter)),
    [events, filter],
  );

  useGSAP(
    () => {
      const t = track.current;
      const wrap = pinWrap.current;
      if (!t || !wrap || reduced) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const distance = () => Math.max(0, t.scrollWidth - window.innerWidth);
        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
              if (counter.current) {
                const idx = Math.min(visible.length, Math.max(1, Math.round(self.progress * (visible.length - 1)) + 1));
                counter.current.textContent = pad2(idx);
              }
            },
          },
        });

        // Horizontal parallax inside each card, driven by the container animation.
        gsap.utils.toArray<HTMLElement>(t.querySelectorAll("[data-card]")).forEach((card) => {
          const img = card.querySelector("[data-card-img]");
          const title = card.querySelector("[data-card-title]");
          gsap.fromTo(
            img,
            { xPercent: -10 },
            {
              xPercent: 10,
              ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
          gsap.fromTo(
            title,
            { x: 60 },
            {
              x: -60,
              ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
        });

        // Drag to explore: dragging the track scrolls the page, keeping everything in sync.
        let startX = 0;
        let startScroll = 0;
        let dragging = false;
        let moved = false;
        const onDown = (e: PointerEvent) => {
          if (e.button !== 0) return;
          dragging = true;
          moved = false;
          startX = e.clientX;
          startScroll = lenis ? lenis.scroll : window.scrollY;
          t.setPointerCapture(e.pointerId);
        };
        const onMove = (e: PointerEvent) => {
          if (!dragging) return;
          const dx = startX - e.clientX;
          if (Math.abs(dx) > 6) moved = true;
          const target = startScroll + dx * 1.2;
          if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
          else window.scrollTo(0, target);
        };
        const onUp = (e: PointerEvent) => {
          dragging = false;
          try {
            t.releasePointerCapture(e.pointerId);
          } catch {}
        };
        const onClick = (e: MouseEvent) => {
          if (moved) {
            e.preventDefault();
            e.stopPropagation();
            moved = false;
          }
        };
        t.addEventListener("pointerdown", onDown);
        t.addEventListener("pointermove", onMove);
        t.addEventListener("pointerup", onUp);
        t.addEventListener("pointercancel", onUp);
        t.addEventListener("click", onClick, true);
        return () => {
          t.removeEventListener("pointerdown", onDown);
          t.removeEventListener("pointermove", onMove);
          t.removeEventListener("pointerup", onUp);
          t.removeEventListener("pointercancel", onUp);
          t.removeEventListener("click", onClick, true);
        };
      });

      // Small screens: cards rise in as they enter horizontally (native scroll).
      mm.add("(max-width: 767px)", () => {
        gsap.from(t.querySelectorAll("[data-card]"), {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: wrap, start: "top 80%", once: true },
        });
      });

      const id = window.setTimeout(() => ScrollTrigger.refresh(), 100);
      return () => {
        window.clearTimeout(id);
        mm.revert();
      };
    },
    { scope: root, dependencies: [visible, reduced, lenis], revertOnUpdate: true },
  );

  return (
    <section ref={root} id="experiences" className="relative theme-stage scroll-mt-16" aria-labelledby="archive-title">
      <div className="container-x pt-28 md:pt-40">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow>{home.archive.eyebrow}</Eyebrow>
            <TextReveal as="h2" id="archive-title" className="mt-6 font-display text-display-lg text-balance">
              {home.archive.title}
            </TextReveal>
          </div>
          <div className="md:col-span-4 md:text-right">
            <TextReveal as="p" className="max-w-sm text-bone/70 md:ml-auto" delay={0.2}>
              {home.archive.intro}
            </TextReveal>
            <TransitionLink href="/events#all" className="group mt-5 inline-flex items-center gap-2 text-sm font-medium">
              <span className="link-line">Browse everything</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" strokeWidth={1.75} />
            </TransitionLink>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2 md:mt-14" role="group" aria-label="Filter experiences">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
            All <span className="ml-1 text-ash">{events.length}</span>
          </FilterChip>
          {categories.map((c) => (
            <FilterChip key={c} active={filter === c} onClick={() => setFilter(c)}>
              {categoryLabels[c]}
              <span className="ml-1 text-ash">{events.filter((e) => e.category === c).length}</span>
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Horizontal track */}
      <div ref={pinWrap} className="relative mt-6 md:mt-0 md:h-[100svh] md:overflow-hidden">
        <div
          ref={track}
          key={filter}
          data-cursor="label"
          data-cursor-label="Drag"
          className={cn(
            "flex items-center gap-5 px-gutter py-10 md:h-full md:gap-[5vw] md:py-0 md:pr-[16vw]",
            "overflow-x-auto snap-x snap-mandatory scrollbar-none md:overflow-visible md:snap-none",
            "touch-pan-x md:touch-none md:will-change-transform md:select-none",
          )}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {visible.map((e, i) => {
            const L = layouts[i % layouts.length];
            return (
              <article
                key={e.slug}
                data-card
                className={cn("relative shrink-0 snap-start", L.w, L.off)}
              >
                <TransitionLink
                  href={`/events/${e.slug}`}
                  data-cursor="label"
                  data-cursor-label="View experience"
                  className="group block"
                  draggable={false}
                  onClick={(ev) => {
                    // Let the drag guard decide; TransitionLink handles routing otherwise.
                    if (ev.defaultPrevented) return;
                  }}
                >
                  <div className={cn("relative overflow-hidden bg-ink-2", L.h)}>
                    <div data-card-img className="absolute -inset-x-[12%] inset-y-0 will-change-transform">
                      <Image
                        src={e.cover.src}
                        alt={e.cover.alt}
                        fill
                        sizes="(min-width: 768px) 42vw, 82vw"
                        className="object-cover transition-transform duration-[1.6s] ease-out-expo group-hover:scale-[1.06]"
                        style={{ objectPosition: e.cover.position ?? "50% 50%" }}
                        draggable={false}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-60" />
                    <span className="absolute left-4 top-4 font-mono text-xs text-bone/80">{pad2(i + 1)}</span>
                    <span className="absolute right-4 top-4 eyebrow text-bone/80">{categoryLabels[e.category]}</span>
                  </div>
                  <div className="relative mt-4 md:mt-0">
                    <h3
                      data-card-title
                      className="font-display text-display-sm text-balance md:absolute md:bottom-4 md:left-[-6%] md:max-w-[120%] md:text-display-md md:leading-[0.9]"
                    >
                      {e.title}
                    </h3>
                    <p className="mt-2 flex flex-wrap gap-x-3 text-sm text-ash md:absolute md:left-0 md:top-3 md:mt-0">
                      <span className="text-bone">{getEventYear(e)}</span>
                      <span>{e.venue.city}</span>
                    </p>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone/60 md:hidden">{e.summary}</p>
                  </div>
                </TransitionLink>
              </article>
            );
          })}

          {/* End card */}
          <div className="relative flex w-[70vw] shrink-0 snap-start items-center md:w-[28vw]">
            <button
              type="button"
              onClick={() => navigate("/events#all")}
              data-cursor="label"
              data-cursor-label="Open archive"
              className="group flex aspect-square w-full flex-col items-start justify-between border border-smoke p-6 text-left transition-colors duration-500 hover:border-bone/50"
            >
              <span className="eyebrow text-ash">{events.length} experiences</span>
              <span className="font-display text-display-sm">
                Open the <br />
                full archive
              </span>
              <ArrowRight className="h-6 w-6 transition-transform duration-500 ease-out-expo group-hover:translate-x-2" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Progress (desktop) */}
        <div className="container-x pointer-events-none absolute inset-x-0 bottom-8 hidden items-center gap-6 md:flex">
          <span className="font-mono text-xs tabular-nums">
            <span ref={counter}>01</span>
            <span className="text-ash"> / {pad2(visible.length)}</span>
          </span>
          <div className="h-px flex-1 bg-smoke">
            <div ref={progress} className="h-full origin-left scale-x-0 bg-bone" />
          </div>
          <span className="eyebrow text-ash">Scroll or drag</span>
        </div>
      </div>
    </section>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-colors duration-500",
        active ? "border-bone bg-bone text-ink" : "border-smoke text-bone/80 hover:border-bone/60",
      )}
    >
      {children}
    </button>
  );
}
