import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { ArchOutline } from "./ArchDefs";
import { TransitionLink } from "./TransitionLink";

/**
 * Brand mark — a cusped Rajput arch within an arch: the gateway motif that
 * opens the site. Replace with the final mark, or set `site.logo.src`.
 */
export function Mark({ className }: { className?: string }) {
  return <ArchOutline className={cn("h-6 w-6", className)} strokeWidth={1.5} />;
}

export function Wordmark({ className }: { className?: string }) {
  if (site.logo.src) {
    return (
      <Image
        src={site.logo.src}
        alt={site.name}
        width={site.logo.width}
        height={site.logo.height}
        className={cn("h-7 w-auto", className)}
        priority
      />
    );
  }
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark />
      <span className="font-display whitespace-nowrap text-[1rem] leading-none tracking-[-0.01em] sm:text-[1.15rem]">
        {site.wordmark}
      </span>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <TransitionLink
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("inline-flex items-center text-current", className)}
    >
      <Wordmark />
    </TransitionLink>
  );
}
