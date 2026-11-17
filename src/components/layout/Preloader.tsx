"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";
import { useIntro } from "./IntroProvider";
import { useLenis } from "./SmoothScroll";

/**
 * A short, intentional opening: a counter runs to 100 while the wordmark
 * settles, then the curtain lifts to reveal the hero. Plays once per session.
 */
export function Preloader() {
  const { shouldPlay, finish } = useIntro();
  const lenis = useLenis();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!shouldPlay || !root.current) return;
      lenis?.stop();
      const counter = { v: 0 };
      const num = root.current.querySelector<HTMLElement>("[data-count]");
      const letters = root.current.querySelectorAll<HTMLElement>("[data-letter]");

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          lenis?.start();
          finish();
        },
      });

      tl.fromTo(
        letters,
        { yPercent: 120 },
        { yPercent: 0, duration: 1.1, stagger: 0.04 },
        0.1,
      )
        .to(
          counter,
          {
            v: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (num) num.textContent = Math.round(counter.v).toString().padStart(3, "0");
            },
          },
          0,
        )
        .to(letters, { yPercent: -120, duration: 0.8, stagger: 0.03, ease: "expo.in" }, 1.55)
        .to("[data-meta]", { opacity: 0, duration: 0.4 }, 1.6)
        .to(
          root.current,
          { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "power4.inOut" },
          1.85,
        );
    },
    { scope: root, dependencies: [shouldPlay, lenis], revertOnUpdate: true },
  );

  if (!shouldPlay) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[95] flex flex-col justify-between bg-ink px-gutter py-8 text-bone"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div data-meta className="flex items-center justify-between eyebrow text-ash">
        <span>{site.descriptor}</span>
        <span>{site.base}</span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <div className="font-display text-display-xl leading-[0.85] tracking-tight" aria-label={site.wordmark}>
          {site.wordmark.split("").map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
              <span data-letter className="inline-block">
                {ch}
              </span>
            </span>
          ))}
        </div>
        <div data-meta className="font-mono text-sm text-ash tabular-nums">
          <span data-count>000</span>
          <span className="ml-1">%</span>
        </div>
      </div>
    </div>
  );
}
