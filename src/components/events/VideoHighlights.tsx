"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import type { VideoAsset } from "@/content/types";
import { useLenis } from "@/components/layout/SmoothScroll";
import { cn } from "@/lib/utils";
import { RevealImage } from "@/components/motion/RevealImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";

export function VideoHighlights({ videos }: { videos: VideoAsset[] }) {
  const [active, setActive] = useState<VideoAsset | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!active) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, lenis]);

  if (!videos.length) return null;

  return (
    <section className="theme-stage border-t border-smoke" aria-label="Video highlights">
      <div className="container-x py-24 md:py-36">
        <Eyebrow>Video highlights</Eyebrow>
        <TextReveal as="h2" className="mt-5 font-display text-display-md">
          In motion
        </TextReveal>

        <ul className={cn("mt-14 grid gap-8", videos.length > 1 ? "lg:grid-cols-2" : "")}>
          {videos.map((v) => (
            <li key={v.title}>
              <button
                type="button"
                onClick={() => setActive(v)}
                data-cursor="label"
                data-cursor-label="Play"
                className="group block w-full text-left"
                aria-label={`Play ${v.title}`}
              >
                <RevealImage image={v.poster} sizes="(min-width: 1024px) 60vw, 100vw" className="aspect-video w-full" hoverZoom parallax={0.1}>
                  <span className="theme-dark absolute inset-0 bg-ink/20 transition-colors duration-700 group-hover:bg-ink/10" />
                  <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center theme-dark rounded-full border border-bone/60 bg-ink/30 backdrop-blur-sm transition-transform duration-700 ease-out-expo group-hover:scale-110 md:h-24 md:w-24">
                    <Play className="ml-1 h-6 w-6 fill-bone text-bone" strokeWidth={1} />
                  </span>
                  {v.duration && <span className="absolute bottom-4 right-4 theme-dark font-mono text-xs text-bone">{v.duration}</span>}
                </RevealImage>
                <span className="mt-4 block font-display text-display-sm">{v.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            data-lenis-prevent
            className="theme-dark fixed inset-0 z-[85] flex items-center justify-center bg-ink/95 p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setActive(null)}
          >
            <button type="button" onClick={() => setActive(null)} aria-label="Close video" className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-smoke text-bone transition-colors hover:border-bone">
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <motion.div
              initial={{ scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 6 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-video w-full max-w-6xl overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              {active.src ? (
                <video src={active.src} poster={active.poster.src} controls autoPlay playsInline className="h-full w-full" />
              ) : active.embedUrl ? (
                <iframe
                  src={active.embedUrl}
                  title={active.title}
                  className="h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
