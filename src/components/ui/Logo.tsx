import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { TransitionLink } from "./TransitionLink";

/**
 * Brand mark — three overlapping rings: people, place, moment.
 * Replace with the final mark, or set `site.logo.src` to use an image instead.
 */
export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 24"
      fill="none"
      aria-hidden
      className={cn("h-5 w-auto", className)}
    >
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="28" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
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
      <span className="font-display text-[1.45rem] leading-none tracking-[-0.02em]">
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
