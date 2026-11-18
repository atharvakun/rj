"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { ImageAsset } from "@/content/types";
import { useLenis } from "@/components/layout/SmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn, pad2 } from "@/lib/utils";
import { RevealImage } from "@/components/motion/RevealImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";

/** Editorial rhythm for the gallery grid (12 columns on desktop). */
const slots = [
  { col: "lg:col-span-7", aspect: "aspect-[4/3]", off: "" },
  { col: "lg:col-span-4 lg:col-start-9", aspect: "aspect-[3/4]", off: "lg:mt-28" },
  { col: "lg:col-span-5 lg:col-start-2", aspect: "aspect-square", off: "lg:-mt-10" },
  { col: "lg:col-span-6 lg:col-start-7", aspect: "aspect-[5/4]", off: "lg:mt-20" },
  { col: "lg:col-span-12", aspect: "aspect-[21/9]", off: "" },
  { col: "lg:col-span-4", aspect: "aspect-[4/5]", off: "" },
  { col: "lg:col-span-7 lg:col-start-6", aspect: "aspect-[16/10]", off: "lg:mt-24" },
];

export function Gallery({ images, title }: { images: ImageAsset[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? null : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step, lenis]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70) step(1);
    else if (info.offset.x > 70) step(-1);
  };

  if (!images.length) return null;

  return (
    <section className="theme-stage container-x py-24 md:py-36" aria-label="Photography">
      <div className="flex items-end justify-between">
        <div>
          <Eyebrow>Photography</Eyebrow>
          <TextReveal as="h2" className="mt-5 font-display text-display-md">
            In pictures
          </TextReveal>
        </div>
        <span className="font-mono text-xs text-ash">{pad2(images.length)} frames</span>
      </div>

      <ul className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-4">
        {images.map((img, i) => {
          const s = slots[i % slots.length];
          return (
            <li key={img.src + i} className={cn(s.col, s.off)}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                data-cursor="label"
                data-cursor-label="View"
                className="group block w-full text-left"
                aria-label={`Open image ${i + 1}: ${img.alt}`}
              >
                <RevealImage
                  image={img}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className={cn("w-full", s.aspect)}
                  hoverZoom
                  parallax={0.12}
                  reveal={i % 3 === 0 ? "up" : i % 3 === 1 ? "left" : "right"}
                />
                <span className="mt-3 flex items-center justify-between font-mono text-xs text-ash">
                  <span>{pad2(i + 1)}</span>
                  <span className="hidden max-w-[70%] truncate sm:block">{img.alt}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery`}
            data-lenis-prevent
            className="theme-dark fixed inset-0 z-[85] flex flex-col bg-ink/95 text-bone backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.4 }}
          >
            <div className="container-x flex h-16 items-center justify-between">
              <span className="font-mono text-xs">
                {pad2(open + 1)} <span className="text-ash">/ {pad2(images.length)}</span>
              </span>
              <button type="button" onClick={close} aria-label="Close" className="flex h-11 w-11 items-center justify-center rounded-full border border-smoke transition-colors hover:border-bone">
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4 pb-20 md:px-20">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open}
                  drag={reduced ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={onDragEnd}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: reduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-full w-full cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={images[open].src}
                    alt={images[open].alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    draggable={false}
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-smoke bg-ink/60 transition-colors hover:border-bone md:flex"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-smoke bg-ink/60 transition-colors hover:border-bone md:flex"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            <p className="container-x absolute inset-x-0 bottom-6 text-center text-sm text-ash">{images[open].alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
