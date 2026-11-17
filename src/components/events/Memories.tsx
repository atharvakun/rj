import type { Memory } from "@/content/types";
import { cn, pad2 } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";
import { Stagger } from "@/components/motion/Stagger";

export function Memories({ memories }: { memories: Memory[] }) {
  if (!memories.length) return null;
  return (
    <section className="theme-paper" aria-label="Audience memories">
      <div className="container-x py-24 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="text-clay">Audience memories</Eyebrow>
            <TextReveal as="h2" className="mt-5 font-display text-display-md text-balance">
              What stayed with people
            </TextReveal>
          </div>
          <Stagger as="ul" className="space-y-16 lg:col-span-7 lg:col-start-6" selector=":scope > li" y={30} stagger={0.15}>
            {memories.map((m, i) => (
              <li key={i} className={cn("grid grid-cols-[2.5rem_1fr] gap-4", i % 2 === 1 && "lg:ml-24")}>
                <span className="font-mono text-xs text-clay">{pad2(i + 1)}</span>
                <blockquote>
                  <p className="font-display text-[clamp(1.5rem,2.6vw,2.6rem)] leading-[1.15] tracking-[-0.01em] text-balance">
                    “{m.quote}”
                  </p>
                  <footer className="mt-5 text-sm text-clay">
                    <span className="text-ink">{m.name}</span>
                    {m.role && <span> · {m.role}</span>}
                  </footer>
                </blockquote>
              </li>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
