import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Background treatment, matching the section that follows. */
  tone?: "stage" | "paper";
  /** Extra classes for the inner container (e.g. to tighten bottom padding). */
  className?: string;
  /** Rendered beneath the intro, right-aligned on desktop. */
  children?: React.ReactNode;
};

/**
 * Shared opening for every inner page: eyebrow, oversized title and a short
 * right-aligned intro. Plays immediately on load rather than on scroll.
 */
export function PageHeader({ eyebrow, title, intro, tone = "stage", className, children }: Props) {
  const paper = tone === "paper";
  return (
    <header className={paper ? "theme-paper" : "theme-stage"}>
      <div className={cn("container-x pb-16 pt-32 md:pb-24 md:pt-44", className)}>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow className={paper ? "text-clay" : undefined}>{eyebrow}</Eyebrow>
            <TextReveal as="h1" className="mt-6 font-display text-display-xl text-balance" split="words" immediate>
              {title}
            </TextReveal>
          </div>
          {(intro || children) && (
            <div className="md:col-span-4 md:ml-auto md:text-right">
              {intro && (
                <TextReveal
                  as="p"
                  className={cn("max-w-sm text-pretty md:ml-auto", paper ? "text-clay" : "text-bone/70")}
                  immediate
                  delay={0.3}
                >
                  {intro}
                </TextReveal>
              )}
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
