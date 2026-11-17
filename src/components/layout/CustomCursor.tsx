"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useHasFinePointer } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CursorState = "default" | "link" | "label" | "hidden";

/**
 * Desktop-only cursor. Elements opt in via `data-cursor="label"` plus
 * `data-cursor-label="View experience"`; interactive elements get a
 * subtle enlargement automatically.
 */
export function CustomCursor() {
  const fine = useHasFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [state, setState] = useState<CursorState>("hidden");

  useEffect(() => {
    if (!enabled) return;
    const html = document.documentElement;
    html.dataset.cursorMode = "custom";

    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    let current: CursorState = "hidden";
    let currentLabel = "";
    const apply = (next: CursorState, text = "") => {
      if (next === current && text === currentLabel) return;
      current = next;
      currentLabel = text;
      setState(next);
      setLabel(text);
    };

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      if (current === "hidden") apply("default");
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || typeof t.closest !== "function") return;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        apply("label", labelled.dataset.cursorLabel || labelled.dataset.cursor || "");
        return;
      }
      if (t.closest("a, button, [role=button], input, textarea, select, label, summary")) {
        apply("link");
        return;
      }
      apply("default");
    };
    const onLeave = () => apply("hidden");
    const onDown = () => ring.current && gsap.to(ring.current, { scale: 0.85, duration: 0.2 });
    const onUp = () => ring.current && gsap.to(ring.current, { scale: 1, duration: 0.4 });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      delete html.dataset.cursorMode;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !ring.current) return;
    const size = state === "label" ? 104 : state === "link" ? 44 : 20;
    gsap.to(ring.current, {
      width: size,
      height: size,
      opacity: state === "hidden" ? 0 : 1,
      backgroundColor: state === "label" ? "rgba(228,85,43,1)" : "rgba(243,237,227,0)",
      borderColor: state === "label" ? "rgba(228,85,43,1)" : "rgba(243,237,227,0.9)",
      duration: 0.5,
      ease: "expo.out",
    });
    gsap.to(dot.current, {
      opacity: state === "hidden" || state === "label" ? 0 : 1,
      duration: 0.3,
    });
  }, [state, enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone opacity-0 mix-blend-difference"
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/90 opacity-0"
        style={{ mixBlendMode: state === "label" ? "normal" : "difference" }}
      >
        <span
          className={`eyebrow whitespace-nowrap text-center text-[0.6rem] text-ink transition-opacity duration-300 ${
            state === "label" ? "opacity-100 delay-150" : "opacity-0"
          }`}
        >
          {label}
        </span>
      </div>
    </>
  );
}
