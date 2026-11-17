/**
 * Single GSAP entry point. Import `gsap`, `ScrollTrigger`, `SplitText` from here
 * so plugins are registered exactly once and tree-shaking stays predictable.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Motion language — shared constants so sections feel choreographed together. */
export const motion = {
  ease: {
    out: "expo.out",
    inOut: "power3.inOut",
    soft: "power2.out",
  },
  duration: {
    micro: 0.4,
    reveal: 1.1,
    scene: 1.4,
  },
  stagger: {
    lines: 0.09,
    items: 0.08,
  },
  /** Matches `prefers-reduced-motion` and is used inside gsap.matchMedia. */
  mm: {
    motion: "(prefers-reduced-motion: no-preference)",
    reduced: "(prefers-reduced-motion: reduce)",
    desktop: "(min-width: 1024px)",
    mobile: "(max-width: 1023px)",
  },
} as const;

export { gsap, ScrollTrigger, SplitText, useGSAP };
