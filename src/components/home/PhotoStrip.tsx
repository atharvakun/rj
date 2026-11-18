"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { home } from "@/content/home";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";
import { Marquee } from "@/components/ui/Marquee";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cn } from "@/lib/utils";

/**
 * Two slow rows of Rajasthan photographs moving in opposite directions,
 * nudged by scroll for depth. Hover pauses a row so captions can be read.
 */
export function PhotoStrip() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = root.current;
      if (!el || reduced) return;
      el.querySelectorAll<HTMLElement>("[data-row]").forEach((row, i) => {
        const dir = i % 2 ? 1 : -1;
        gsap.fromTo(
          row,
          { xPercent: -4 * dir },
          { xPercent: 4 * dir, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
      gsap.from(el.querySelectorAll("[data-tile]"), {
        yPercent: 18,
        opacity: 0,
        duration: 1.3,
        stagger: 0.03,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section ref={root} id="origins" className="theme-stage relative scroll-mt-16 overflow-hidden py-20 md:py-28" aria-label={home.strip.eyebrow}>
      <div className="container-x mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>{home.strip.eyebrow}</Eyebrow>
          <TextReveal as="h2" className="mt-5 max-w-2xl font-display text-display-sm text-balance">
            {home.strip.title}
          </TextReveal>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-ash">
          Placeholder photographs from Rajasthan and its celebrations, until the Samaj&apos;s own.{" "}
          <TransitionLink href="/credits" className="link-line text-bone/70">
            Credits
          </TransitionLink>
        </p>
      </div>

      <div className="space-y-3 md:space-y-4">
        {home.strip.rows.map((row, i) => (
          <div key={i} data-row className="will-change-transform">
            <Marquee duration={i % 2 ? 95 : 80} className={cn("mask-fade-x", i % 2 && "marquee-reverse")}>
              {row.map((img) => (
                <figure
                  key={img.src}
                  data-tile
                  className={cn(
                    "relative mx-1.5 shrink-0 overflow-hidden bg-ink-2 md:mx-2",
                    "h-[190px] w-[270px] md:h-[250px] md:w-[360px] lg:h-[300px] lg:w-[430px]",
                  )}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 430px, (min-width: 768px) 360px, 270px"
                    className="object-cover"
                    style={{ objectPosition: img.position ?? "50% 50%" }}
                  />
                  <figcaption className="theme-dark absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-3 pb-2.5 pt-8">
                    <span className="eyebrow block truncate text-[0.6rem] text-bone/85">{img.alt}</span>
                  </figcaption>
                </figure>
              ))}
            </Marquee>
          </div>
        ))}
      </div>
    </section>
  );
}
