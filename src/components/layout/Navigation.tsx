"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { useIntro } from "./IntroProvider";
import { useLenis } from "./SmoothScroll";

const overlayEase = [0.76, 0, 0.24, 1] as const;
const NOMINATE = { label: "Nominate", href: "/?purpose=nomination#contact" };

const sectionOf = (href: string) => (href.includes("#") ? href.split("#")[1] : null);

/**
 * Persistent top menu. Transparent over the opening of a page, condensing
 * onto a translucent bar once scrolled. On the home page the links are
 * section anchors and the current section is underlined.
 */
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const { ready } = useIntro();
  const lenis = useLenis();

  // Condense once the page has scrolled past the opening.
  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setScrolled(self.scroll() > 40),
    });
    return () => st.kill();
  });

  // Entrance after the intro.
  useGSAP(
    () => {
      if (!ready || !header.current) return;
      gsap.fromTo(
        header.current.querySelectorAll("[data-nav-item]"),
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.06, ease: "expo.out", delay: 0.2 },
      );
    },
    { scope: header, dependencies: [ready], revertOnUpdate: true },
  );

  // Section spy on the home page.
  useEffect(() => {
    if (pathname !== "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSection(null);
      return;
    }
    const ids = site.nav.map((n) => sectionOf(n.href)).filter((id): id is string => Boolean(id));
    const onScroll = () => {
      const line = window.scrollY + window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= line) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Close on route change, lock scroll while open.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => {
    const section = sectionOf(href);
    if (section) return pathname === "/" && activeSection === section;
    if (href === "/") return pathname === "/" && activeSection === null;
    return pathname === href || pathname.startsWith(href + "/");
  };
  const condensed = scrolled && !open;
  // Pages that open on a full-bleed dark hero get light nav text until the bar condenses.
  const darkOpening = pathname === "/" || pathname.startsWith("/events/");
  const menuItems = [{ label: "Home", href: "/" }, ...site.nav];

  return (
    <>
      <header ref={header} className={cn("fixed inset-x-0 top-0 z-[70]", !condensed && darkOpening && "theme-dark")}>
        <div
          className={cn(
            "transition-[background-color,border-color,backdrop-filter] duration-500",
            condensed ? "border-b border-smoke/70 bg-ink/85 backdrop-blur-md" : "border-b border-transparent",
          )}
        >
          <div
            className={cn(
              "container-x flex items-center justify-between text-bone transition-[height] duration-500",
              condensed ? "h-16" : "h-nav",
            )}
          >
            <div data-nav-item className="opacity-0">
              <Logo />
            </div>

            <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
              {site.nav.map((item) => (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  data-nav-item
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "link-line text-[0.9rem] font-medium tracking-tight opacity-0 transition-colors duration-500",
                    !isActive(item.href) && "text-bone/75 hover:text-bone",
                  )}
                >
                  {item.label}
                </TransitionLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div data-nav-item className="hidden opacity-0 lg:block">
                <Magnetic strength={0.25}>
                  <TransitionLink
                    href={NOMINATE.href}
                    className="group inline-flex h-10 items-center gap-2 rounded-full border border-current/40 px-5 text-[0.85rem] font-medium transition-colors duration-500 hover:border-current"
                  >
                    {NOMINATE.label}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
                  </TransitionLink>
                </Magnetic>
              </div>
              <button
                type="button"
                data-nav-item
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative flex h-11 w-11 items-center justify-center rounded-full opacity-0 lg:hidden"
              >
                <span
                  className={cn(
                    "absolute h-px w-6 bg-current transition-transform duration-500 ease-out-expo",
                    open ? "rotate-45" : "-translate-y-[4px]",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-6 bg-current transition-transform duration-500 ease-out-expo",
                    open ? "-rotate-45" : "translate-y-[4px]",
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="theme-dark fixed inset-0 z-[65] flex flex-col bg-ink text-bone"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: overlayEase }}
          >
            <div className="container-x flex flex-1 flex-col justify-end pb-12 pt-nav">
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                {[...menuItems, NOMINATE].map((item, i) => (
                  <div key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.06 }}
                    >
                      <TransitionLink
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "group flex items-baseline justify-between py-2 font-display text-display-md",
                          isActive(item.href) ? "text-ember" : "text-bone",
                        )}
                      >
                        <span>{item.label}</span>
                        <span className="font-mono text-xs text-ash">0{i + 1}</span>
                      </TransitionLink>
                    </motion.div>
                  </div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-12 flex flex-wrap justify-between gap-6 border-t border-smoke pt-6 text-sm text-ash"
              >
                <a href={`mailto:${site.contact.email}`} className="link-line">
                  {site.contact.email}
                </a>
                <div className="flex gap-5">
                  {site.socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-line">
                      {s.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
