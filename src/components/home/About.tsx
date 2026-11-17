"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { about } from "@/content";
import { home } from "@/content/home";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { Stagger } from "@/components/motion/Stagger";
import { Parallax } from "@/components/motion/Parallax";
import { pad2 } from "@/lib/utils";

export function About() {
  const root = useRef<HTMLElement>(null);
  const manifesto = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const m = manifesto.current;
      if (!m || reduced) return;
      const words = m.querySelectorAll("[data-word]");
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          words,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: { trigger: m, start: "top top+=15%", end: "+=90%", pin: true, scrub: 0.4 },
          },
        );
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          words,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: { trigger: m, start: "top 75%", end: "bottom 45%", scrub: 0.4 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section ref={root} id="about" className="theme-paper relative scroll-mt-16">
      {/* Manifesto */}
      <div ref={manifesto} className="container-x flex min-h-[70vh] flex-col justify-center py-24 lg:min-h-[85vh]">
        <Eyebrow className="text-clay">{home.about.eyebrow}</Eyebrow>
        <p className="mt-8 max-w-5xl font-display text-[clamp(1.9rem,4.6vw,4.6rem)] leading-[1.08] tracking-[-0.02em] text-balance">
          {about.manifesto.split(" ").map((w, i) => (
            <span key={i} data-word className="inline-block mr-[0.26em]">
              {w}
            </span>
          ))}
        </p>
      </div>

      {/* Story grid */}
      <div className="container-x grid gap-y-20 pb-28 lg:grid-cols-12 lg:gap-x-10 lg:pb-40">
        <div className="lg:col-span-7">
          <RevealImage
            image={about.images.primary}
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="aspect-[4/3]"
            parallax={0.2}
            scrollScale
          />
        </div>
        <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
          <Block index={1} title={about.who.title} body={about.who.body} />
          <div className="mt-16">
            <Block index={2} title={about.philosophy.title} body={about.philosophy.body} />
          </div>
        </div>

        <div className="lg:col-span-4 lg:pt-20">
          <Parallax distance={40} desktopOnly>
            <RevealImage image={about.images.secondary} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[3/4]" reveal="left" parallax={0.12} />
          </Parallax>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Block index={3} title={about.mission.title} body={about.mission.body} />
          <div className="mt-16">
            <p className="eyebrow text-clay">
              {pad2(4)} — {about.special.title}
            </p>
            <Stagger as="ul" className="mt-6 divide-y divide-ink/15 border-y border-ink/15" selector=":scope > li" y={20}>
              {about.special.points.map((p, i) => (
                <li key={p} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-5">
                  <span className="font-mono text-xs text-clay">{pad2(i + 1)}</span>
                  <span className="font-display text-display-sm leading-tight">{p}</span>
                </li>
              ))}
            </Stagger>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-2">
          <RevealImage image={about.images.tertiary} sizes="(min-width: 1024px) 36vw, 100vw" className="aspect-[5/4]" reveal="right" parallax={0.15} />
        </div>
        <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="eyebrow text-clay">The team</p>
          <Stagger className="mt-6" selector=":scope > div" y={20}>
            {about.team.map((m) => (
              <div key={m.name + m.role} className="flex items-baseline justify-between gap-6 border-t border-ink/15 py-4 last:border-b">
                <span className="font-medium">{m.name}</span>
                <span className="text-right text-sm text-clay">{m.role}</span>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function Block({ index, title, body }: { index: number; title: string; body: string }) {
  return (
    <div>
      <p className="eyebrow text-clay">
        {pad2(index)} — {title}
      </p>
      <TextReveal as="p" className="mt-5 text-pretty font-display text-[clamp(1.35rem,1.9vw,1.75rem)] leading-[1.3]">
        {body}
      </TextReveal>
    </div>
  );
}
