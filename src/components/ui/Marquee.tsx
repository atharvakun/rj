import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
  trackClassName?: string;
};

/** CSS-driven marquee. Content is duplicated for a seamless loop. */
export function Marquee({ children, duration = 40, className, trackClassName }: Props) {
  return (
    <div className={cn("marquee overflow-hidden", className)}>
      <div
        className={cn("marquee-track flex w-max items-center", trackClassName)}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
