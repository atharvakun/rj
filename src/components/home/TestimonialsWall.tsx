import Image from "next/image";
import { testimonials } from "@/content";
import { home } from "@/content/home";
import { cn, pad2 } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";
import { Stagger } from "@/components/motion/Stagger";

const kindLabel = { attendee: "Attendee", client: "Client", partner: "Partner" } as const;

/** Every quote at once, in a three-column editorial wall. */
export function TestimonialsWall() {
  return (
    <section className="theme-paper relative" aria-labelledby="wall-title">
      <div className="container-x py-28 md:py-40">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow className="text-clay">{home.testimonialsWall.eyebrow}</Eyebrow>
            <TextReveal as="h2" id="wall-title" className="mt-6 font-display text-display-md text-balance">
              {home.testimonialsWall.title}
            </TextReveal>
          </div>
          <p className="text-sm text-clay md:col-span-4 md:text-right">{home.testimonialsWall.note}</p>
        </div>

        <Stagger as="ul" className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3" selector=":scope > li" y={28}>
          {testimonials.map((t, i) => (
            <li
              key={t.name + t.role}
              className={cn("flex flex-col border-t border-ink/15 pt-6", i % 3 === 1 && "lg:mt-16", i % 3 === 2 && "lg:mt-32")}
            >
              <span className="font-mono text-xs text-clay">{pad2(i + 1)}</span>
              <blockquote className="mt-6 flex-1">
                <p className="font-display text-[clamp(1.3rem,1.7vw,1.6rem)] leading-[1.25] text-pretty">{t.quote}</p>
              </blockquote>
              <figcaption className="mt-8 flex items-start gap-4">
                {t.photo ? (
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-sand">
                    <Image src={t.photo.src} alt={t.photo.alt} fill sizes="44px" className="object-cover" />
                  </span>
                ) : (
                  <span className="mt-2 h-px w-8 shrink-0 bg-ember" aria-hidden />
                )}
                <span>
                  <span className="block font-medium">{t.name}</span>
                  {t.role && <span className="mt-1 block text-sm text-clay">{t.role}</span>}
                  <span className="eyebrow mt-3 block text-ember">{kindLabel[t.kind]}</span>
                </span>
              </figcaption>
            </li>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
