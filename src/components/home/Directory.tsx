import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { home } from "@/content/home";
import { pad2 } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";
import { Stagger } from "@/components/motion/Stagger";
import { TransitionLink } from "@/components/ui/TransitionLink";

/**
 * Index of the site's pages: large editorial rows with a photograph that
 * slides into view on hover.
 */
export function Directory() {
  return (
    <section id="explore" className="theme-stage relative scroll-mt-16" aria-labelledby="directory-title">
      <div className="container-x py-28 md:py-40">
        <Eyebrow>{home.directory.eyebrow}</Eyebrow>
        <TextReveal as="h2" id="directory-title" className="mt-6 font-display text-display-md text-balance">
          {home.directory.title}
        </TextReveal>

        <Stagger as="ul" className="mt-14 md:mt-20" selector=":scope > li" y={24}>
          {home.directory.items.map((item, i) => (
            <li key={item.href} className="border-t border-smoke last:border-b">
              <TransitionLink
                href={item.href}
                data-cursor="label"
                data-cursor-label="Open"
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-5 py-7 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,20rem)_9rem_3rem] md:gap-8 md:py-6"
              >
                <span className="font-mono text-xs text-ash">{pad2(i + 1)}</span>
                <span className="min-w-0">
                  <span className="block font-display text-display-sm transition-transform duration-700 ease-out-expo group-hover:translate-x-3 md:text-display-md">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-sm text-ash md:hidden">{item.blurb}</span>
                </span>
                <span className="hidden text-sm leading-relaxed text-ash transition-colors duration-500 group-hover:text-bone/80 md:block">
                  {item.blurb}
                </span>
                <span className="relative hidden h-[5.5rem] w-full overflow-hidden bg-ink-2 md:block">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="160px"
                    className="object-cover opacity-0 scale-110 transition-[opacity,transform] duration-700 ease-out-expo group-hover:scale-100 group-hover:opacity-100"
                  />
                </span>
                <ArrowUpRight
                  className="h-6 w-6 justify-self-end text-ash transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ember"
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
