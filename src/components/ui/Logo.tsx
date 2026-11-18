import Image from "next/image";
import { site } from "@/content/site";
import { asset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { ArchOutline } from "./ArchDefs";
import { TransitionLink } from "./TransitionLink";

/**
 * Brand mark: the Samiti's medallion when `site.logo.src` is set, otherwise
 * the cusped-arch fallback. Size it with a height class (`h-10`); the width
 * follows the image's aspect ratio.
 */
export function Mark({ className, priority = false }: { className?: string; priority?: boolean }) {
  if (site.logo.src) {
    return (
      <Image
        src={asset(site.logo.src)}
        alt=""
        aria-hidden
        width={site.logo.width}
        height={site.logo.height}
        className={cn("h-10 w-auto select-none", className)}
        draggable={false}
        priority={priority}
      />
    );
  }
  return <ArchOutline className={cn("h-6 w-6", className)} strokeWidth={1.5} />;
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Mark className="h-10 sm:h-11" priority />
      <span className="font-display whitespace-nowrap text-[0.95rem] leading-none tracking-[-0.01em] sm:text-[1.1rem]">
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
