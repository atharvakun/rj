"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { stats } from "@/content";
import { home } from "@/content/home";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Marquee } from "@/components/ui/Marquee";
import { TextReveal } from "@/components/motion/TextReveal";
import { Counter } from "@/components/motion/Counter";

export function Impact() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      const q = gsap.utils.selector(root);
      gsap.from(q("[data-stat]"), {
        y: 80,
        opacity: 0,
        duration: 1.4,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: q("[data-stats]")[0], start: "top 80%", once: true },
      });
      gsap.from(q("[data-rule]"), {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.6,
        stagger: 0.12,
        ease: "power3.inOut",
        scrollTrigger: { trigger: q("[data-stats]")[0], start: "top 80%", once: true },
      });
      // The marquee drifts faster as the section scrolls through.
      gsap.to(q("[data-marquee]"), {
        xPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section ref={root} id="impact" className="theme-paper relative overflow-hidden py-28 md:py-40">
      <div data-marquee className="pointer-events-none select-none">
        <Marquee duration={60} className="opacity-100">
          {home.impact.marquee.map((w, i) => (
            <span key={w} className="flex items-center">
              <span className="font-display text-[clamp(4rem,14vw,14rem)] leading-none tracking-[-0.04em] text-ink/[0.06]">
                {w}
              </span>
              <span className="mx-[3vw] h-3 w-3 rounded-full bg-ember/40" aria-hidden />
              {i === home.impact.marquee.length - 1 && null}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-x mt-16 grid gap-16 md:mt-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow className="text-clay">{home.impact.eyebrow}</Eyebrow>
          <TextReveal as="h2" className="mt-6 font-display text-display-md text-balance">
            {home.impact.title}
          </TextReveal>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-clay">{home.impact.note}</p>
        </div>

        <div data-stats className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:col-span-8">
          {stats.map((s, i) => (
            <div key={s.label} data-stat className={i % 2 === 1 ? "sm:mt-20" : ""}>
              <div data-rule className="h-px w-full bg-ink/20" />
              <p className="mt-6 font-display text-[clamp(4rem,9vw,9.5rem)] leading-none tracking-[-0.04em]">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-4 max-w-[16rem] text-base text-clay">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
