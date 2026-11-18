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
/** Space left above a section when scrolled to, so the condensed bar never covers its heading. */
const ANCHOR_OFFSET = -40;

/** Compare routes ignoring the deployment base path and trailing slashes. */
function normalisePath(pathname: string) {
  let p = pathname;
  if (BASE_PATH && p.startsWith(BASE_PATH)) p = p.slice(BASE_PATH.length) || "/";
  return p.replace(/\/+$/, "") || "/";
}

/**
 * Page transitions: a curtain wipes up to cover the page, the route changes
 * underneath, then the curtain wipes away. Same-page anchors scroll smoothly
 * instead of transitioning; anchors on another page scroll once it has loaded.
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const [covering, setCovering] = useState(false);
  const pending = useRef<string | null>(null);

  const scrollToHash = useCallback(
    (hash: string, duration = 1.4) => {
      let target: HTMLElement | null = null;
      try {
        target = document.querySelector(hash);
      } catch {
        target = null;
      }
      if (!target) return false;
      // `force` lets the scroll run even while Lenis is paused (menu open, curtain up).
      if (lenis) lenis.scrollTo(target, { offset: ANCHOR_OFFSET, duration, force: true });
      else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      return true;
    },
    [lenis, reduced],
  );

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      const samePath = normalisePath(url.pathname) === normalisePath(window.location.pathname);

      if (samePath && url.hash) {
        if (url.search && url.search !== window.location.search) {
          // Same page, new query (e.g. ?purpose=nomination#contact): update the URL without a transition.
          router.replace(url.pathname + url.search + url.hash, { scroll: false });
        } else {
          history.replaceState(null, "", url.hash);
        }
        if (scrollToHash(url.hash)) return;
      }
      if (samePath && !url.hash) {
        if (lenis) lenis.scrollTo(0, { duration: 1.2, force: true });
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
    [lenis, reduced, router, scrollToHash],
  );

  // Uncover once the new route has rendered, then honour any hash in the URL.
  useEffect(() => {
    const hadPending = Boolean(pending.current);
    pending.current = null;
    const id = window.setTimeout(
      () => {
        if (hadPending) {
          setCovering(false);
          lenis?.start();
        }
        if (window.location.hash) scrollToHash(window.location.hash, hadPending ? 1.2 : 0.8);
      },
      hadPending ? 120 : 400,
    );
    return () => window.clearTimeout(id);
  }, [pathname, lenis, scrollToHash]);

  // Event pages link back to the home page sections; keep it warm.
  useEffect(() => {
    router.prefetch("/");
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
