"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIntro } from "@/components/layout/IntroProvider";
import { home } from "@/content/home";
import { site } from "@/content/site";
import type { EventRecord } from "@/content/types";
import { formatDateParts, remainingUntil } from "@/lib/dates";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Hero({ next }: { next: EventRecord | null }) {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const mediaInner = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { ready } = useIntro();

  const { hero } = home;
  const words = hero.headline.split(" ");
  const plain = words.slice(0, words.length - hero.emphasisWords);
  const emph = words.slice(words.length - hero.emphasisWords);

  useGSAP(
    () => {
      if (!root.current) return;
      const q = gsap.utils.selector(root);
      if (reduced) {
        gsap.set([media.current, ...q("[data-hero]")], { clearProps: "all", opacity: 1, visibility: "visible" });
        return;
      }
      if (!ready) return;

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(
        media.current,
        { clipPath: "inset(42% 0 42% 0)" },
        { clipPath: "inset(0% 0 0% 0)", duration: 1.6, ease: "power4.inOut" },
        0,
      )
        .fromTo(mediaInner.current, { scale: 1.25 }, { scale: 1.05, duration: 2.2, ease: "power3.out" }, 0)
        .fromTo(
          q("[data-hero=word] > span"),
          { yPercent: 110, rotate: 2 },
          { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.07 },
          0.7,
        )
        .fromTo(q("[data-hero=fade]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.1 }, 1.2)
        .fromTo(q("[data-hero=line]"), { scaleY: 0 }, { scaleY: 1, duration: 1, ease: "power3.inOut" }, 1.6);

      // Scroll choreography: media scales and drifts, copy lifts away faster.
      gsap.to(mediaInner.current, {
        scale: 1.2,
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(content.current, {
        yPercent: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: true },
      });
      gsap.to(q("[data-hero=scrim]"), {
        opacity: 0.9,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root, dependencies: [ready, reduced], revertOnUpdate: true },
  );

  const nextParts = next ? formatDateParts(next.startsAt, next.timeZone) : null;
  const daysToNext = next ? remainingUntil(next.startsAt).days : null;

  return (
    <section
      ref={root}
      id="top"
      className="theme-dark relative flex h-[100svh] min-h-[640px] flex-col justify-end overflow-hidden bg-ink text-bone"
      aria-label="Introduction"
    >
      {/* Media */}
      <div
        ref={media}
        className="absolute inset-0"
        style={{ clipPath: reduced ? undefined : "inset(42% 0 42% 0)" }}
      >
        <div ref={mediaInner} className="absolute inset-0 will-change-transform">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: hero.image.position }}
          />
          {hero.video?.src && !reduced && (
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000 [&.is-playing]:opacity-100"
              src={hero.video.src}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              aria-hidden
              onPlaying={(e) => e.currentTarget.classList.add("is-playing")}
              style={{ objectPosition: hero.image.position }}
            />
          )}
        </div>
        <div
          data-hero="scrim"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/20 opacity-80"
        />
        <div className="absolute inset-0 grain" />
      </div>

      {/* Top meta row */}
      <div className="container-x absolute inset-x-0 top-nav z-10 hidden items-start justify-between pt-6 text-xs md:flex">
        <p data-hero="fade" className="eyebrow opacity-0">
          {site.base}
        </p>
        {next && nextParts && (
          <TransitionLink
            href="/#events"
            data-hero="fade"
            className="group flex items-center gap-4 opacity-0"
          >
            <span className="eyebrow text-ash">Next</span>
            <span className="font-mono text-xs">
              {next.title} · {nextParts.day} {nextParts.monthShort}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-ember transition-transform duration-500 group-hover:scale-150" />
          </TransitionLink>
        )}
      </div>

      {/* Content */}
      <div ref={content} className="container-x relative z-10 pb-10 md:pb-14">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div data-hero="fade" className="opacity-0">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,6.3vw,6.6rem)] leading-[0.95] tracking-[-0.03em] text-balance">
              {plain.map((w, i) => (
                <span key={i} data-hero="word" className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
                  <span className="inline-block">{w}</span>
                </span>
              ))}
              {emph.map((w, i) => (
                <span key={`e${i}`} data-hero="word" className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
                  <span className="inline-block italic text-ember">{w}</span>
                </span>
              ))}
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p data-hero="fade" className="max-w-md text-pretty text-[0.95rem] leading-relaxed text-bone/80 opacity-0 md:text-base">
              {hero.intro}
            </p>
            <div data-hero="fade" className="mt-7 flex flex-wrap items-center gap-4 opacity-0">
              <Button href={hero.cta.href} size="md" variant="ember">
                {hero.cta.label}
              </Button>
              <Button href={hero.secondary.href} size="md" variant="outline">
                {hero.secondary.label}
              </Button>
            </div>
            {next && daysToNext !== null && (
              <p data-hero="fade" className="mt-5 text-sm text-bone/70 opacity-0 lg:hidden">
                <TransitionLink href="/#events" className="link-line">
                  Next event in {daysToNext} days
                </TransitionLink>
              </p>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 flex items-center justify-between border-t border-bone/15 pt-5">
          <p data-hero="fade" className="eyebrow text-ash opacity-0">
            {site.descriptor}
          </p>
          <TransitionLink
            href="/#origins"
            data-hero="fade"
            aria-label="Scroll to the next section"
            className="group flex items-center gap-3 opacity-0"
          >
            <span className="eyebrow text-ash transition-colors group-hover:text-bone">Scroll</span>
            <span className="relative h-10 w-px overflow-hidden bg-bone/20">
              <span data-hero="line" className="absolute inset-0 origin-top bg-bone" />
              <span className="absolute inset-x-0 top-0 h-full origin-top animate-[scrollhint_2.2s_ease-in-out_infinite] bg-ember" />
            </span>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
