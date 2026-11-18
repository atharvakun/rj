import { awards } from "@/content";
import { site } from "@/content/site";
import { pad2 } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { Stagger } from "@/components/motion/Stagger";
import { ArchOutline } from "@/components/ui/ArchDefs";

/** The Puraskar: categories, who can be nominated, how it works. */
export function Awards() {
  return (
    <section id="awards" className="theme-paper relative scroll-mt-16 border-t border-ink/10">
      <div className="container-x pb-28 pt-24 md:pb-40 md:pt-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Sticky intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow className="text-clay">{awards.eyebrow}</Eyebrow>
              <TextReveal as="h2" className="mt-8 font-display text-display-lg text-balance" split="words">
                {awards.title}
              </TextReveal>
              <TextReveal as="p" className="mt-8 max-w-md text-pretty text-lead text-ink/75" delay={0.15}>
                {awards.intro}
              </TextReveal>
              <Stagger className="mt-10 flex flex-wrap items-center gap-8" y={16}>
                <Button href={awards.cta.href} variant="dark" size="lg">
                  {awards.cta.label}
                </Button>
                <Seal />
              </Stagger>
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-7">
            <p className="eyebrow text-clay">Categories</p>
            <Stagger as="ol" className="mt-4 border-t border-ink/15" selector=":scope > li" y={24} stagger={0.07}>
              {awards.categories.map((c, i) => (
                <li
                  key={c.key}
                  className="group grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 border-b border-ink/15 py-6 md:grid-cols-[3rem_1fr_minmax(0,17rem)] md:items-baseline md:gap-x-8"
                >
                  <span className="font-mono text-xs text-clay">{pad2(i + 1)}</span>
                  <div>
                    <span className="font-devanagari text-[1.05rem] leading-none text-ember-deep">{c.native}</span>
                    <h3 className="mt-1.5 font-display text-display-sm transition-transform duration-700 ease-out-expo group-hover:translate-x-2">
                      {c.title}
                    </h3>
                  </div>
                  <p className="col-start-2 text-sm leading-relaxed text-clay md:col-start-3">{c.body}</p>
                </li>
              ))}
            </Stagger>

            {/* Eligibility + process */}
            <div className="mt-20 grid gap-14 md:grid-cols-2">
              <div>
                <p className="eyebrow text-clay">{awards.eligibility.title}</p>
                <Stagger as="ul" className="mt-6 space-y-5" selector=":scope > li" y={16}>
                  {awards.eligibility.points.map((p, i) => (
                    <li key={p} className="grid grid-cols-[2rem_1fr] gap-3">
                      <span className="font-mono text-xs text-clay">{pad2(i + 1)}</span>
                      <span className="text-[0.95rem] leading-relaxed">{p}</span>
                    </li>
                  ))}
                </Stagger>
              </div>
              <div>
                <p className="eyebrow text-clay">{awards.process.title}</p>
                <Stagger as="ol" className="mt-6 space-y-7" selector=":scope > li" y={16}>
                  {awards.process.steps.map((s, i) => (
                    <li key={s.step} className="grid grid-cols-[2rem_1fr] gap-3">
                      <span className="font-display text-2xl leading-none text-ember-deep">{i + 1}</span>
                      <div>
                        <p className="font-medium">{s.step}</p>
                        <p className="mt-1 text-sm leading-relaxed text-clay">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </Stagger>
              </div>
            </div>

            {/* Honourees */}
            <div className="mt-20 border-t border-ink/15 pt-8">
              <p className="eyebrow text-clay">{awards.honourees.eyebrow}</p>
              <TextReveal as="p" className="mt-4 max-w-xl font-display text-[clamp(1.25rem,1.8vw,1.6rem)] leading-[1.3] text-ink/80">
                {awards.honourees.note}
              </TextReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Rotating circular text with the arch mark at its centre. Decorative. */
function Seal() {
  const text = `${site.name} · Maharashtra · `.toUpperCase();
  return (
    <span className="relative inline-flex h-28 w-28 items-center justify-center text-ink" aria-hidden>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-[rotate-slow_28s_linear_infinite]">
        <defs>
          <path id="seal-circle" d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0" />
        </defs>
        <text className="fill-current font-mono text-[8.2px] tracking-[0.2em]">
          <textPath href="#seal-circle">{text}</textPath>
        </text>
      </svg>
      <ArchOutline className="h-10 w-10 text-ember-deep" strokeWidth={1.5} />
    </span>
  );
}
