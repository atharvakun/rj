"use client";

import { useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP, motion as m } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIntro } from "@/components/layout/IntroProvider";

type Props = {
  as?: ElementType;
  children: React.ReactNode;
  className?: string;
  /** Split granularity. Lines are masked; words/chars rise within their line mask. */
  split?: "lines" | "words" | "chars";
  /** Play on mount rather than on scroll. */
  immediate?: boolean;
  /** With `immediate`, wait for the preloader to finish. */
  waitForIntro?: boolean;
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  id?: string;
};

/**
 * Masked line reveal. Uses SplitText with autoSplit so responsive re-wraps
 * re-split without breaking the layout. Degrades to plain text without JS
 * or with reduced motion.
 */
export function TextReveal({
  as = "p",
  children,
  className,
  split = "lines",
  immediate = false,
  waitForIntro = false,
  delay = 0,
  duration = m.duration.reveal,
  stagger,
  start = "top 85%",
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { ready } = useIntro();
  const gate = !waitForIntro || ready;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced) {
        el.classList.add("is-ready");
        return;
      }
      if (!gate) return;

      let instance: SplitText | undefined;
      let cancelled = false;
      const type = split === "lines" ? "lines" : split === "words" ? "lines,words" : "lines,words,chars";
      const stg = stagger ?? (split === "lines" ? m.stagger.lines : split === "words" ? 0.04 : 0.015);

      document.fonts.ready.then(() => {
        if (cancelled || !ref.current) return;
        instance = SplitText.create(el, {
          type,
          mask: "lines",
          autoSplit: true,
          linesClass: "split-line-inner",
          onSplit: (self) => {
            const targets = split === "lines" ? self.lines : split === "words" ? self.words : self.chars;
            return gsap.from(targets, {
              yPercent: 110,
              duration,
              delay,
              stagger: stg,
              ease: m.ease.out,
              scrollTrigger: immediate ? undefined : { trigger: el, start, once: true },
            });
          },
        });
        el.classList.add("is-ready");
      });

      return () => {
        cancelled = true;
        instance?.revert();
      };
    },
    { scope: ref, dependencies: [reduced, gate, split], revertOnUpdate: true },
  );

  const Tag = as as "p";
  return (
    <Tag ref={ref as React.Ref<HTMLParagraphElement>} className={className} data-reveal="" id={id}>
      {children}
    </Tag>
  );
}
