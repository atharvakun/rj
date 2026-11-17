import { ArrowRight } from "lucide-react";
import { about } from "@/content";
import { home } from "@/content/home";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";
import { Stagger } from "@/components/motion/Stagger";
import { TransitionLink } from "@/components/ui/TransitionLink";

/** A single editorial statement on paper, leading to the About page. */
export function Statement() {
  return (
    <section className="theme-paper relative">
      <div className="container-x grid gap-10 py-24 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Eyebrow className="text-clay">{home.statement.eyebrow}</Eyebrow>
        </div>
        <div className="lg:col-span-9">
          <TextReveal as="p" className="max-w-4xl font-display text-[clamp(1.75rem,3.6vw,3.75rem)] leading-[1.1] tracking-[-0.02em] text-balance" split="words">
            {about.manifesto}
          </TextReveal>
          <Stagger className="mt-10" y={16}>
            <TransitionLink href="/about" className="group inline-flex items-center gap-2 text-sm font-medium">
              <span className="link-line">{home.statement.cta}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" strokeWidth={1.75} />
            </TransitionLink>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
