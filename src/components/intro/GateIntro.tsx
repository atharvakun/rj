"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";
import { home } from "@/content/home";
import { useIntro } from "@/components/layout/IntroProvider";
import { useLenis } from "@/components/layout/SmoothScroll";
import { ARCH_PATH, archClip } from "@/components/ui/ArchDefs";
import { silhouettes } from "./silhouettes";

/* Scene palette: sandstone fort against a dusk sky. Local to the intro. */
const WALL = "#b86a45";
const WALL_DARK = "#8f4d31";
const GROUND = "#6e3a26";
const WOOD = "#3a2016";
const GOLD = "#d4a24c";

/* Gateway geometry, shared by the wall cut-out, the frame and the doors. */
const GATE_W = "min(80vw, 900px)";
const GATE_H = "min(54vh, 600px)";
const GATE_BOTTOM = "10vh";

/* The wall is masked with a real hole in the shape of the arch, so when the
   camera passes through the gate the page itself shows behind the doors. */
const archSvg = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' preserveAspectRatio='none'><path d='${ARCH_PATH}'/></svg>`,
)}")`;
const wallMask: React.CSSProperties = {
  maskImage: `linear-gradient(#000, #000), ${archSvg}`,
  WebkitMaskImage: `linear-gradient(#000, #000), ${archSvg}`,
  maskSize: `100% 100%, ${GATE_W} ${GATE_H}`,
  WebkitMaskSize: `100% 100%, ${GATE_W} ${GATE_H}`,
  maskPosition: `0 0, 50% calc(100% - ${GATE_BOTTOM})`,
  WebkitMaskPosition: `0 0, 50% calc(100% - ${GATE_BOTTOM})`,
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskComposite: "exclude",
  WebkitMaskComposite: "xor",
};

/**
 * Opening sequence, once per session: a fort wall with a cusped gateway rises
 * against the dusk, an elephant and a camel walk in to flank it, the doors
 * swing open on the greeting, then the camera passes through the gate into
 * the page. Skippable; never plays for reduced motion or deep links.
 */
export function GateIntro() {
  const { shouldPlay, release, finish } = useIntro();
  const lenis = useLenis();
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const done = useRef(false);

  useGSAP(
    () => {
      if (!shouldPlay || !root.current) return;
      lenis?.stop();
      window.scrollTo(0, 0);
      const q = gsap.utils.selector(root);

      // Zoom towards the centre of the gateway, wherever the viewport puts it.
      const scene = q<HTMLDivElement>("[data-scene]")[0];
      const gate = q<HTMLDivElement>("[data-gate]")[0];
      if (scene && gate) {
        const r = gate.getBoundingClientRect();
        gsap.set(scene, { transformOrigin: `${r.left + r.width / 2}px ${r.top + r.height * 0.55}px` });
      }

      const releaseOnce = () => {
        if (done.current) return;
        done.current = true;
        release();
      };

      const t = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          lenis?.start();
          releaseOnce();
          finish();
        },
      });
      tl.current = t;

      t.fromTo(q("[data-sky]"), { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.out" }, 0)
        .fromTo(q("[data-wall]"), { yPercent: 22 }, { yPercent: 0, duration: 1.5, ease: "power4.out" }, 0.1)
        .fromTo(q("[data-moon]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.6 }, 0.2)
        // The animals walk in from either side with a small bob in their step.
        .fromTo(q("[data-elephant]"), { xPercent: -70, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 2, ease: "power3.out" }, 0.4)
        .fromTo(q("[data-camel]"), { xPercent: 70, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 2, ease: "power3.out" }, 0.4)
        .fromTo(q("[data-elephant] svg"), { y: 0 }, { y: -5, duration: 0.32, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.4)
        .fromTo(q("[data-camel] svg"), { y: 0 }, { y: -7, duration: 0.28, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.5)
        // Doors swing inward.
        .fromTo(q("[data-door=left]"), { rotationY: 0 }, { rotationY: -108, duration: 1.8, ease: "power3.inOut" }, 1.6)
        .fromTo(q("[data-door=right]"), { rotationY: 0 }, { rotationY: 108, duration: 1.8, ease: "power3.inOut" }, 1.6)
        // The greeting rises line by line behind them.
        .fromTo(q("[data-line] > span"), { yPercent: 120 }, { yPercent: 0, duration: 1.1, stagger: 0.16 }, 2.3)
        .fromTo(q("[data-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, 2.8)
        // Pass through the gate: the page starts its own entrance underneath.
        .add(releaseOnce, 4.6)
        .to(q("[data-text]"), { opacity: 0, y: -24, duration: 0.5, ease: "power2.in" }, 4.5)
        .to(scene, { scale: 3.6, duration: 1.6, ease: "power3.in" }, 4.6)
        .to(q("[data-interior], [data-sky], [data-moon]"), { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 4.9)
        .to(q("[data-skip]"), { opacity: 0, duration: 0.3 }, 4.9)
        .to(root.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, 5.7);
    },
    { scope: root, dependencies: [shouldPlay, lenis], revertOnUpdate: true },
  );

  const skip = () => {
    tl.current?.kill();
    gsap.to(root.current, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.inOut",
      onComplete: () => {
        lenis?.start();
        if (!done.current) {
          done.current = true;
          release();
        }
        finish();
      },
    });
  };

  if (!shouldPlay) return null;

  const gateBox: React.CSSProperties = { width: GATE_W, height: GATE_H, bottom: GATE_BOTTOM };

  return (
    <div ref={root} className="theme-dark fixed inset-0 z-[95] text-bone" role="presentation">
      <div data-scene className="absolute inset-0 overflow-hidden will-change-transform">
        {/* Dusk sky */}
        <div
          data-sky
          className="absolute inset-0 opacity-0"
          style={{ background: "radial-gradient(120% 80% at 50% 100%, #3a1e3f 0%, #1b1226 48%, #0b0a09 100%)" }}
        />
        <div
          data-moon
          className="absolute right-[12vw] top-[12vh] h-[9vmin] w-[9vmin] rounded-full opacity-0"
          style={{ background: "radial-gradient(circle at 40% 40%, #fbf3dd, #d9c79a 70%)", boxShadow: "0 0 60px 20px rgba(251,243,221,0.12)" }}
        />

        {/* Fort wall: everything below rises together */}
        <div data-wall className="absolute inset-x-0 bottom-0 h-[74vh] will-change-transform">
          {/* Masonry, with the gateway cut out of it */}
          <div className="absolute inset-0" style={{ background: WALL, ...wallMask }}>
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: GOLD, opacity: 0.8 }}
            />
            <div aria-hidden className="absolute inset-x-0 top-[14px] h-px" style={{ background: WALL_DARK, opacity: 0.7 }} />
            {/* Niches flanking the gate */}
            <div
              aria-hidden
              className="absolute bottom-[34vh] left-[9vw] hidden h-[14vh] w-[7vw] md:block"
              style={{ ...archClip, background: WALL_DARK }}
            />
            <div
              aria-hidden
              className="absolute bottom-[34vh] right-[9vw] hidden h-[14vh] w-[7vw] md:block"
              style={{ ...archClip, background: WALL_DARK }}
            />
            {/* Ground */}
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-[10vh]" style={{ background: GROUND }} />
            <div aria-hidden className="absolute inset-x-0 bottom-[10vh] h-px" style={{ background: GOLD, opacity: 0.5 }} />
          </div>
          {/* Crenellations along the top of the wall */}
          <div
            aria-hidden
            className="absolute inset-x-0 -top-[26px] h-[26px]"
            style={{ background: `repeating-linear-gradient(90deg, ${WALL} 0 44px, transparent 44px 70px)` }}
          />

          {/* Gateway frame: a stroked arch, so nothing sits behind the opening */}
          <svg
            aria-hidden
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            className="absolute left-1/2 -translate-x-1/2 overflow-visible"
            style={gateBox}
          >
            <path d={ARCH_PATH} fill="none" stroke={WALL_DARK} strokeWidth={22} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            <path d={ARCH_PATH} fill="none" stroke={GOLD} strokeWidth={5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          </svg>

          {/* The opening */}
          <div data-gate className="absolute left-1/2 -translate-x-1/2" style={{ ...gateBox, ...archClip }}>
            {/* Inside the fort: dark until the camera passes through */}
            <div data-interior className="absolute inset-0 bg-ink" />

            {/* Greeting */}
            <div data-text className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-[6vh] text-center md:pb-0">
              <p data-line className="overflow-hidden pb-[0.15em]">
                <span className="block font-devanagari text-[clamp(1.6rem,5vw,3.4rem)] leading-tight text-gold">{site.greeting.native}</span>
              </p>
              <p data-line className="mt-4 overflow-hidden">
                <span className="eyebrow block text-bone/70">{home.intro.welcome}</span>
              </p>
              <p data-line className="mt-3 overflow-hidden pb-[0.12em]">
                <span className="block font-display text-[clamp(1.5rem,4.4vw,3.6rem)] leading-[1.05] tracking-[-0.02em] text-balance">
                  {site.name}
                </span>
              </p>
              <span data-rule className="mt-6 block h-px w-16 origin-left bg-gold" />
            </div>

            {/* Doors */}
            <div className="absolute inset-0" style={{ perspective: "1400px" }}>
              <Door side="left" />
              <Door side="right" />
            </div>
          </div>

          {/* Elephant (left) and camel (right), facing the gate */}
          <div data-elephant className="absolute bottom-[9.5vh] left-[2vw] z-10 h-[clamp(64px,13vh,250px)] opacity-0 md:left-[4vw] md:h-[clamp(120px,26vh,290px)]">
            <svg viewBox={silhouettes.elephant.viewBox} className="h-full w-auto" aria-hidden>
              <g transform={silhouettes.elephant.transform}>
                <path d={silhouettes.elephant.d} fill="#15100c" />
              </g>
            </svg>
          </div>
          <div data-camel className="absolute bottom-[9.5vh] right-[2vw] z-10 h-[clamp(72px,15vh,280px)] opacity-0 md:right-[4vw] md:h-[clamp(130px,29vh,320px)]">
            <svg viewBox={silhouettes.camel.viewBox} className="h-full w-auto -scale-x-100" aria-hidden>
              <path d={silhouettes.camel.d} fill="#15100c" />
            </svg>
          </div>
        </div>
      </div>

      <button
        type="button"
        data-skip
        onClick={skip}
        className="eyebrow absolute bottom-6 right-6 z-20 rounded-full border border-bone/30 px-4 py-2.5 text-bone/80 transition-colors hover:border-bone hover:text-bone"
      >
        {home.intro.skip}
      </button>
    </div>
  );
}

function Door({ side }: { side: "left" | "right" }) {
  const left = side === "left";
  return (
    <div
      data-door={side}
      className={left ? "absolute inset-y-0 left-0 w-1/2 origin-left" : "absolute inset-y-0 right-0 w-1/2 origin-right"}
      style={{
        backfaceVisibility: "hidden",
        background: [
          `radial-gradient(circle, ${GOLD} 1.6px, transparent 2.4px) 14px 18px / 34px 34px`,
          `repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 46px)`,
          `linear-gradient(${left ? "90deg" : "270deg"}, #2b170f, ${WOOD} 60%, #4a2a1c)`,
        ].join(", "),
        boxShadow: left ? "inset -12px 0 24px rgba(0,0,0,0.35)" : "inset 12px 0 24px rgba(0,0,0,0.35)",
        borderLeft: left ? undefined : `1px solid ${GOLD}`,
        borderRight: left ? `1px solid ${GOLD}` : undefined,
      }}
    >
      {/* Iron bands */}
      <span aria-hidden className="absolute inset-x-0 top-[28%] h-[6px]" style={{ background: "#1b100b", opacity: 0.85 }} />
      <span aria-hidden className="absolute inset-x-0 top-[62%] h-[6px]" style={{ background: "#1b100b", opacity: 0.85 }} />
      {/* Ring handle */}
      <span
        aria-hidden
        className={`absolute top-[46%] h-[4.5vmin] w-[4.5vmin] rounded-full border-[0.5vmin] ${left ? "right-[8%]" : "left-[8%]"}`}
        style={{ borderColor: GOLD }}
      />
    </div>
  );
}
