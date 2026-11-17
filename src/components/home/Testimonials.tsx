"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { testimonials as data } from "@/content";
import { home } from "@/content/home";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn, pad2 } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";

const AUTOPLAY_MS = 7000;
const kindLabel = { attendee: "Attendee", client: "Client", partner: "Partner" } as const;

export function Testimonials({ heading = true }: { heading?: boolean }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const count = data.length;
  const t = data[index];

  const go = useCallback(
    (next: number, direction: number) => {
      setDir(direction);
      setIndex(((next % count) + count) % count);
      setProgressKey((k) => k + 1);
    },
    [count],
  );

  // Autoplay only while visible and playing.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView || reduced) return;
    const id = window.setTimeout(() => go(index + 1, 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, playing, inView, reduced, go, progressKey]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(index + 1, 1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(index - 1, -1);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1, 1);
    if (e.key === "ArrowLeft") go(index - 1, -1);
  };

  return (
    <section
      ref={root}
      id="people"
      className={cn("theme-stage relative overflow-hidden", heading ? "py-28 md:py-40" : "pb-28 pt-4 md:pb-40 md:pt-8")}
      aria-roledescription="carousel"
      aria-label="Testimonials"
    >
      <div className="container-x">
        {heading && (
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow>{home.testimonials.eyebrow}</Eyebrow>
              <TextReveal as="h2" className="mt-6 font-display text-display-md text-balance">
                {home.testimonials.title}
              </TextReveal>
            </div>
            <span className="hidden font-mono text-xs text-ash md:block">
              {pad2(index + 1)} / {pad2(count)}
            </span>
          </div>
        )}

        <div
          className={cn("relative select-none", heading ? "mt-14 md:mt-20" : "mt-10 md:mt-16")}
          tabIndex={0}
          onKeyDown={onKey}
          onMouseEnter={() => setPlaying(false)}
          onMouseLeave={() => setPlaying(true)}
          onFocus={() => setPlaying(false)}
          onBlur={() => setPlaying(true)}
        >
          <span aria-hidden className="pointer-events-none absolute -left-2 -top-10 font-display text-[12rem] leading-none text-ember/30 md:-left-6 md:-top-16 md:text-[20rem]">
            “
          </span>

          <motion.div
            drag={reduced ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={onDragEnd}
            className="relative min-h-[22rem] cursor-grab active:cursor-grabbing md:min-h-[24rem]"
            data-cursor="label"
            data-cursor-label="Drag"
          >
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: reduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-10 lg:grid-cols-12"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
              >
                <blockquote className="relative lg:col-span-9">
                  <p className="font-display text-display-sm text-balance leading-[1.08] md:text-[clamp(2rem,3.6vw,3.6rem)]">
                    {t.quote}
                  </p>
                </blockquote>
                <figcaption className="flex items-start gap-4 lg:col-span-3 lg:pt-2">
                  {t.photo ? (
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-ink-2">
                      <Image src={t.photo.src} alt={t.photo.alt} fill sizes="56px" className="object-cover" />
                    </span>
                  ) : (
                    <span className="mt-1 h-px w-8 shrink-0 bg-ember" aria-hidden />
                  )}
                  <span>
                    <span className="block font-medium">{t.name}</span>
                    {t.role && <span className="mt-1 block text-sm text-ash">{t.role}</span>}
                    <span className="eyebrow mt-3 block text-ember">{kindLabel[t.kind]}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>

          {/* Controls */}
          <div className="mt-12 flex items-center gap-4 border-t border-smoke pt-6">
            <button
              type="button"
              onClick={() => go(index - 1, -1)}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-smoke transition-colors duration-500 hover:border-bone"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1, 1)}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-smoke transition-colors duration-500 hover:border-bone"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </button>

            <div className="mx-4 hidden h-px flex-1 bg-smoke sm:block">
              <div
                key={progressKey}
                className={cn("h-full origin-left bg-bone", playing && inView && !reduced ? "animate-[fill_7s_linear_forwards]" : "scale-x-0")}
              />
            </div>

            <div className="ml-auto flex items-center gap-3 sm:ml-0">
              <span className={cn("font-mono text-xs text-ash", heading && "md:hidden")}>
                {pad2(index + 1)} / {pad2(count)}
              </span>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-pressed={!playing}
                aria-label={playing ? "Pause autoplay" : "Resume autoplay"}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-smoke transition-colors duration-500 hover:border-bone"
              >
                {playing ? <Pause className="h-4 w-4" strokeWidth={1.75} /> : <Play className="h-4 w-4" strokeWidth={1.75} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
