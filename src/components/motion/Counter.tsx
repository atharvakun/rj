"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  locale?: string;
};

/** Counts from 0 to `value` when scrolled into view. */
export function Counter({ value, prefix = "", suffix = "", duration = 2.2, className, locale = "en-US" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const fmt = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced) {
        el.textContent = fmt.format(value);
        return;
      }
      const obj = { v: 0 };
      gsap.to(obj, {
        v: value,
        duration,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = fmt.format(Math.round(obj.v));
        },
      });
    },
    { scope: ref, dependencies: [value, reduced], revertOnUpdate: true },
  );

  return (
    <span className={className}>
      {prefix}
      <span ref={ref} className="tabular-nums">
        {reduced ? fmt.format(value) : "0"}
      </span>
      {suffix}
    </span>
  );
}
