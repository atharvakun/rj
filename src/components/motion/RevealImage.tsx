"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIntro } from "@/components/layout/IntroProvider";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/content/types";

type Props = {
  image: ImageAsset;
  sizes: string;
  priority?: boolean;
  /** Wrapper classes: set aspect ratio / size here. */
  className?: string;
  imgClassName?: string;
  /** 0 disables. 0.15 ≈ gentle, 0.3 ≈ pronounced. */
  parallax?: number;
  /** Clip-path reveal direction. */
  reveal?: "up" | "down" | "left" | "right" | "center" | "none";
  /** Play on mount (hero) rather than on scroll. */
  immediate?: boolean;
  waitForIntro?: boolean;
  delay?: number;
  /** Scale image subtly as it scrolls through the viewport. */
  scrollScale?: boolean;
  /** Zoom on hover (for cards). */
  hoverZoom?: boolean;
  children?: React.ReactNode;
};

const clips = {
  up: "inset(100% 0 0 0)",
  down: "inset(0 0 100% 0)",
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  center: "inset(50% 0 50% 0)",
  none: "inset(0 0 0 0)",
};

export function RevealImage({
  image,
  sizes,
  priority,
  className,
  imgClassName,
  parallax = 0,
  reveal = "up",
  immediate = false,
  waitForIntro = false,
  delay = 0,
  scrollScale = false,
  hoverZoom = false,
  children,
}: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { ready } = useIntro();
  const gate = !waitForIntro || ready;

  useGSAP(
    () => {
      const o = outer.current;
      const i = inner.current;
      if (!o || !i) return;
      if (reduced) {
        o.classList.add("is-ready");
        gsap.set(o, { clipPath: clips.none });
        return;
      }
      if (!gate) return;

      const baseScale = 1 + parallax * 0.6;
      o.classList.add("is-ready");

      if (reveal !== "none") {
        gsap.fromTo(
          o,
          { clipPath: clips[reveal] },
          {
            clipPath: clips.none,
            duration: 1.5,
            delay,
            ease: "power4.inOut",
            scrollTrigger: immediate ? undefined : { trigger: o, start: "top 88%", once: true },
          },
        );
        gsap.fromTo(
          i,
          { scale: baseScale + 0.25 },
          {
            scale: baseScale,
            duration: 1.9,
            delay,
            ease: "power3.out",
            scrollTrigger: immediate ? undefined : { trigger: o, start: "top 88%", once: true },
          },
        );
      } else {
        gsap.set(i, { scale: baseScale });
      }

      if (parallax > 0) {
        gsap.fromTo(
          i,
          { yPercent: -parallax * 22 },
          {
            yPercent: parallax * 22,
            ease: "none",
            scrollTrigger: { trigger: o, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }

      if (scrollScale) {
        gsap.fromTo(
          i,
          { scale: baseScale + 0.12 },
          {
            scale: baseScale,
            ease: "none",
            scrollTrigger: { trigger: o, start: "top bottom", end: "center center", scrub: true },
          },
        );
      }
    },
    { scope: outer, dependencies: [reduced, gate], revertOnUpdate: true },
  );

  return (
    <div
      ref={outer}
      data-reveal=""
      className={cn("relative overflow-hidden bg-ink-2", hoverZoom && "group/img", className)}
      style={{ clipPath: reduced ? undefined : clips[reveal] }}
    >
      <div ref={inner} className="absolute inset-0 will-change-transform">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover",
            hoverZoom && "transition-transform duration-[1.4s] ease-out-expo group-hover/img:scale-[1.06]",
            imgClassName,
          )}
          style={{ objectPosition: image.position ?? "50% 50%" }}
        />
      </div>
      {children}
    </div>
  );
}
