"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type LenisContextValue = { lenis: Lenis | null };
const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext).lenis;
}

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger and
 * Lenis share a single clock. Disabled for reduced-motion users.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("js");
    if (reduced) return;

    const instance = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      autoRaf: false,
      anchors: false,
    });
    lenisRef.current = instance;
    // The Lenis instance only exists in the browser; publishing it to context must happen here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.off("scroll", onScroll);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reduced]);

  // Keep ScrollTrigger measurements honest: late font swaps, lazy media and
  // pin spacers all change document height after the first refresh.
  useEffect(() => {
    let id: number | undefined;
    const refresh = () => {
      window.clearTimeout(id);
      id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", refresh);
      window.clearTimeout(id);
    };
  }, []);

  // Scroll to top (or to a hash) on route change, then refresh triggers.
  useEffect(() => {
    const hash = window.location.hash;
    const target = hash ? document.querySelector(hash) : null;
    const l = lenisRef.current;
    if (target) {
      if (l) l.scrollTo(target as HTMLElement, { immediate: true, offset: -40 });
      else (target as HTMLElement).scrollIntoView();
    } else {
      if (l) l.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    }
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>;
}
