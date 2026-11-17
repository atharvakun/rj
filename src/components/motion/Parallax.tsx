"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  /** Positive moves slower than scroll (lags), negative moves faster. In px at full travel. */
  distance?: number;
  className?: string;
  /** Only run on desktop widths. */
  desktopOnly?: boolean;
};

export function Parallax({ children, distance = 80, className, desktopOnly = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      const mm = gsap.matchMedia();
      mm.add(desktopOnly ? "(min-width: 1024px)" : "all", () => {
        gsap.fromTo(
          el,
          { y: -distance },
          {
            y: distance,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [reduced, distance], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
