import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content";
import { home } from "@/content/home";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";
import { Stagger } from "@/components/motion/Stagger";
import { Magnetic } from "@/components/ui/Magnetic";
import { EnquiryForm } from "./EnquiryForm";

export function Contact() {
  return (
    <section id="contact" className="theme-stage relative scroll-mt-16 border-t border-smoke">
      <div className="container-x pb-28 pt-28 md:pb-40 md:pt-40">
        <Eyebrow>{home.contact.eyebrow}</Eyebrow>
        <TextReveal as="h2" className="mt-8 max-w-6xl font-display text-display-lg text-balance lg:text-display-xl" split="words">
          {home.contact.title}
        </TextReveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <TextReveal as="p" className="max-w-md text-lead text-bone/75">
              {home.contact.body}
            </TextReveal>

            <Stagger className="mt-14 space-y-10" y={20}>
              <div>
                <p className="eyebrow text-ash">Email</p>
                <Magnetic strength={0.15} className="block w-fit">
                  <a href={`mailto:${site.contact.email}`} className="group mt-3 inline-flex items-center gap-2 font-display text-display-sm">
                    <span className="link-line">{site.contact.email}</span>
                    <ArrowUpRight
                      className="h-6 w-6 text-ash transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ember"
                      strokeWidth={1.25}
                    />
                  </a>
                </Magnetic>
              </div>
              <div className="grid gap-10 sm:grid-cols-2">
                <div>
                  <p className="eyebrow text-ash">Phone</p>
                  <a href={site.contact.phoneHref} className="link-line mt-3 inline-block">
                    {site.contact.phone}
                  </a>
                  <p className="mt-2 text-sm text-ash">{site.contact.hours}</p>
                </div>
                <div>
                  <p className="eyebrow text-ash">Office</p>
                  <address className="mt-3 not-italic leading-relaxed">
                    {site.contact.address.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </div>
              </div>
              <div>
                <p className="eyebrow text-ash">Follow</p>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-1">
                        {s.label}
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Stagger>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Suspense fallback={<div className="min-h-[24rem]" />}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
