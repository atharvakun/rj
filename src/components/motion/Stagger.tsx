"use client";

import { useRef, type ElementType } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  as?: ElementType;
  children: React.ReactNode;
  className?: string;
  /** Selector for children to stagger. Defaults to direct children. */
  selector?: string;
  y?: number;
  stagger?: number;
  start?: string;
  delay?: number;
};

/** Staggers direct children (or `selector` matches) upward into view. */
export function Stagger({
  as = "div",
  children,
  className,
  selector = ":scope > *",
  y = 40,
  stagger = 0.08,
  start = "top 85%",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = el.querySelectorAll(selector);
      el.classList.add("is-ready");
      if (reduced || !items.length) return;
      gsap.from(items, {
        y,
        opacity: 0,
        duration: 1.2,
        delay,
        stagger,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );

  const Tag = as as "div";
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
