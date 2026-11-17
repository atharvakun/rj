"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type IntroContextValue = {
  /** True once the preloader has finished (or was skipped). Hero animations wait for this. */
  ready: boolean;
  /** True if the preloader should play for this page view. */
  shouldPlay: boolean;
  finish: () => void;
};

const IntroContext = createContext<IntroContextValue>({
  ready: false,
  shouldPlay: false,
  finish: () => {},
});

export const useIntro = () => useContext(IntroContext);

const KEY = "intro:seen";

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState({ ready: false, shouldPlay: false });

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      seen = true;
    }
    const onHome = window.location.pathname === "/";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const play = !seen && onHome && !reduced;
    // Browser-only decision, made once after hydration to avoid a server/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ ready: !play, shouldPlay: play });
  }, []);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    setState({ ready: true, shouldPlay: false });
  }, []);

  return (
    <IntroContext.Provider value={{ ready: state.ready, shouldPlay: state.shouldPlay, finish }}>
      {children}
    </IntroContext.Provider>
  );
}
