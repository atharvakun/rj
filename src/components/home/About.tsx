"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { about } from "@/content";
import { home } from "@/content/home";
import type { TeamMember } from "@/content/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { Stagger } from "@/components/motion/Stagger";
import { Parallax } from "@/components/motion/Parallax";
import { archClip } from "@/components/ui/ArchDefs";
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
            <span key={i} data-word className="mr-[0.26em] inline-block">
              {w}
            </span>
          ))}
        </p>
      </div>

      {/* Story grid */}
      <div className="container-x grid gap-y-20 pb-24 lg:grid-cols-12 lg:gap-x-10 lg:pb-32">
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
        </div>

        <div className="lg:col-span-4 lg:pt-20">
          <Parallax distance={40} desktopOnly>
            <RevealImage image={about.images.secondary} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[3/4]" reveal="left" parallax={0.12} />
          </Parallax>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Block index={2} title={about.mission.title} body={about.mission.body} />
          <div className="mt-16">
            <p className="eyebrow text-clay">
              {pad2(3)} — {about.values.title}
            </p>
            <Stagger as="ul" className="mt-6 divide-y divide-ink/15 border-y border-ink/15" selector=":scope > li" y={20}>
              {about.values.points.map((p, i) => (
                <li key={p} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-5">
                  <span className="font-mono text-xs text-clay">{pad2(i + 1)}</span>
                  <span className="font-display text-[clamp(1.25rem,1.8vw,1.75rem)] leading-tight">{p}</span>
                </li>
              ))}
            </Stagger>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-2">
          <RevealImage image={about.images.tertiary} sizes="(min-width: 1024px) 36vw, 100vw" className="aspect-[5/4]" reveal="right" parallax={0.15} />
        </div>
      </div>

      {/* Team */}
      <div id="team" className="container-x scroll-mt-16 border-t border-ink/15 pb-28 pt-20 lg:pb-40 lg:pt-28">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="text-clay">{about.team.eyebrow}</Eyebrow>
            <TextReveal as="h3" className="mt-5 font-display text-display-md text-balance">
              {about.team.title}
            </TextReveal>
          </div>
          <TextReveal as="p" className="max-w-md self-end text-sm leading-relaxed text-clay lg:col-span-5 lg:col-start-8" delay={0.15}>
            {about.team.note}
          </TextReveal>
        </div>
        <Stagger as="ul" className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4" selector=":scope > li" y={28} stagger={0.06}>
          {about.team.members.map((m) => (
            <TeamCard key={m.role} member={m} />
          ))}
        </Stagger>
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

function initials(text: string) {
  return text
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <li className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand" style={archClip}>
        {member.photo ? (
          <Image
            src={member.photo.src}
            alt={member.photo.alt}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw"
            className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.05]"
            style={{ objectPosition: member.photo.position ?? "50% 30%" }}
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_100%,rgba(212,162,76,0.45),transparent_70%)] transition-opacity duration-700 group-hover:opacity-80" />
            <span className="absolute inset-0 flex items-center justify-center font-display text-[clamp(2.5rem,5vw,4.5rem)] text-ink/15 transition-transform duration-700 ease-out-expo group-hover:scale-105">
              {initials(member.name ?? member.role)}
            </span>
          </>
        )}
      </div>
      <p className="mt-4 text-[0.95rem] font-medium leading-snug">
        {member.name ?? <span className="font-display italic font-normal text-clay">Name to be confirmed</span>}
      </p>
      <p className="mt-1 text-sm text-clay">{member.role}</p>
      {member.blurb && <p className="mt-2 hidden text-xs leading-relaxed text-clay/80 sm:block">{member.blurb}</p>}
    </li>
  );
}
