"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useHasFinePointer } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  children: React.ReactNode;
  /** 0–1. How far the element travels toward the pointer. */
  strength?: number;
  className?: string;
};

/** Pulls its child gently toward the pointer. Pointer-fine devices only. */
export function Magnetic({ children, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useHasFinePointer();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !fine || reduced) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "elastic.out(1, 0.45)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "elastic.out(1, 0.45)" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref, dependencies: [fine, reduced, strength], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={className ?? "inline-block"}>
      {children}
    </div>
  );
}
