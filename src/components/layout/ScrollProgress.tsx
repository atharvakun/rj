"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.4 },
    });
  });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-px">
      <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-ember" />
    </div>
  );
}
