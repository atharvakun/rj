"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type IntroContextValue = {
  /** True once the page may start its own entrance animations (the gate is opening or done). */
  ready: boolean;
  /** True while the opening sequence should be mounted. */
  shouldPlay: boolean;
  /** Let the page animate in while the intro finishes its last beat. */
  release: () => void;
  /** Unmount the intro. */
  finish: () => void;
};

const IntroContext = createContext<IntroContextValue>({
  ready: false,
  shouldPlay: false,
  release: () => {},
  finish: () => {},
});

export const useIntro = () => useContext(IntroContext);

const KEY = "intro:seen";

/**
 * Decides, once per browser session, whether the opening sequence plays.
 * It plays on the home page only, never for deep links to a section, and
 * never when the visitor prefers reduced motion.
 */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = useState({ ready: false, shouldPlay: false });

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      seen = true;
    }
    const onHome = pathname === "/";
    const deepLink = Boolean(window.location.hash);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const play = !seen && onHome && !deepLink && !reduced;
    // Browser-only decision, made once after hydration to avoid a server/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ ready: !play, shouldPlay: play });
    // Decide on first mount only; later route changes never replay the intro.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const release = useCallback(() => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    setState((s) => ({ ...s, ready: true }));
  }, []);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    setState({ ready: true, shouldPlay: false });
  }, []);

  return (
    <IntroContext.Provider value={{ ready: state.ready, shouldPlay: state.shouldPlay, release, finish }}>
      {children}
    </IntroContext.Provider>
  );
}
