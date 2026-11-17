"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLenis } from "./SmoothScroll";

type TransitionContextValue = {
  navigate: (href: string) => void;
  /** True while the curtain is covering the viewport. */
  covering: boolean;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
  covering: false,
});

export const useTransition = () => useContext(TransitionContext);

const CURTAIN_MS = 640;
const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** Compare routes ignoring the deployment base path and trailing slashes. */
function normalisePath(pathname: string) {
  let p = pathname;
  if (BASE_PATH && p.startsWith(BASE_PATH)) p = p.slice(BASE_PATH.length) || "/";
  return p.replace(/\/+$/, "") || "/";
}

/**
 * Page transitions: a curtain wipes up to cover the page, the route changes
 * underneath, then the curtain wipes away. Same-page anchors scroll smoothly
 * instead of transitioning.
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const [covering, setCovering] = useState(false);
  const pending = useRef<string | null>(null);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      const samePath = normalisePath(url.pathname) === normalisePath(window.location.pathname);

      if (samePath && url.hash) {
        const target = document.querySelector(url.hash) as HTMLElement | null;
        if (target) {
          if (url.search && url.search !== window.location.search) {
            // Same page, new query (e.g. ?event=slug#contact): update the URL without a transition.
            router.replace(url.pathname + url.search + url.hash, { scroll: false });
          } else {
            history.replaceState(null, "", url.hash);
          }
          if (lenis) lenis.scrollTo(target, { offset: -40, duration: 1.4 });
          else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
          return;
        }
      }
      if (samePath && !url.hash) {
        if (lenis) lenis.scrollTo(0, { duration: 1.2 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (reduced) {
        router.push(href);
        return;
      }
      pending.current = href;
      setCovering(true);
      lenis?.stop();
      window.setTimeout(() => router.push(href), CURTAIN_MS);
    },
    [lenis, reduced, router],
  );

  // Uncover once the new route has rendered.
  useEffect(() => {
    if (!pending.current) return;
    pending.current = null;
    const id = window.setTimeout(() => {
      setCovering(false);
      lenis?.start();
    }, 120);
    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

  // Prefetch likes a clean slate: pre-warm common routes.
  useEffect(() => {
    for (const href of ["/upcoming", "/events", "/about", "/testimonials", "/contact"]) router.prefetch(href);
  }, [router]);

  return (
    <TransitionContext.Provider value={{ navigate, covering }}>
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] bg-ink"
        initial={false}
        animate={{ clipPath: covering ? "inset(0% 0 0% 0)" : "inset(0% 0 100% 0)" }}
        transition={{ duration: CURTAIN_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
        style={{ clipPath: "inset(0% 0 100% 0)" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-ember/60" />
      </motion.div>
    </TransitionContext.Provider>
  );
}
