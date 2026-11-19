import { ArrowUpRight } from "lucide-react";
import { home } from "@/content/home";
import { pad2 } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stagger } from "@/components/motion/Stagger";
import { TransitionLink } from "@/components/ui/TransitionLink";

/**
 * Four large doors beneath the home page, one per section of the site.
 * Each row is a link to its page.
 */
export function Directory() {
  return (
    <section className="theme-stage relative border-t border-smoke" aria-label={home.directory.eyebrow}>
      <div className="container-x pb-28 pt-20 md:pb-40 md:pt-28">
        <Eyebrow>{home.directory.eyebrow}</Eyebrow>
        <Stagger as="ul" className="mt-8 border-t border-smoke" selector=":scope > li" y={24} stagger={0.08}>
          {home.directory.items.map((item, i) => (
            <li key={item.href} className="border-b border-smoke">
              <TransitionLink
                href={item.href}
                data-cursor="label"
                data-cursor-label="Open"
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-6 py-8 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)_auto] md:gap-10 md:py-10"
              >
                <span className="font-mono text-xs text-ash">{pad2(i + 1)}</span>
                <span className="font-display text-display-md transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
                  {item.label}
                </span>
                <span className="col-span-3 col-start-2 max-w-md text-sm leading-relaxed text-ash md:col-span-1 md:col-start-auto">
                  {item.blurb}
                </span>
                <ArrowUpRight
                  className="hidden h-6 w-6 text-ash transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-bone md:block"
                  strokeWidth={1.5}
                />
              </TransitionLink>
            </li>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
