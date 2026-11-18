import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Mark } from "@/components/ui/Logo";
import { TransitionLink } from "@/components/ui/TransitionLink";

/**
 * Sticky-reveal footer: the preceding section scrolls up over this element,
 * which sits fixed to the bottom until uncovered.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="theme-dark theme-stage sticky bottom-0 z-0">
      <div className="container-x relative flex min-h-[70vh] flex-col justify-between overflow-hidden pb-6 pt-16 md:min-h-[80vh]">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Mark className="h-16" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ash">{site.description}</p>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <p className="eyebrow text-ash">Explore</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {site.nav.map((n) => (
                    <li key={n.href}>
                      <TransitionLink href={n.href} className="link-line">
                        {n.label}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-ash">Follow</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-line inline-flex items-center gap-1"
                      >
                        {s.label}
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-ash">Contact</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <a href={`mailto:${site.contact.email}`} className="link-line">
                      {site.contact.email}
                    </a>
                  </li>
                  <li>
                    <a href={site.contact.phoneHref} className="link-line">
                      {site.contact.phone}
                    </a>
                  </li>
                  <li className="text-ash">{site.base}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <p
            aria-hidden
            className="pointer-events-none select-none font-devanagari text-[clamp(3rem,13vw,15rem)] leading-[1.1] text-bone/[0.08]"
          >
            {site.greeting.native}
          </p>
          <div className="mt-6 flex flex-col gap-2 border-t border-smoke pt-5 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.name}. {site.legal}{" "}
              <TransitionLink href="/credits" className="link-line">
                Photo credits
              </TransitionLink>
            </p>
            <p className="font-mono">{site.motto}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
