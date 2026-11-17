"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { remainingUntil, type Remaining } from "@/lib/dates";
import { pad2 } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Props = {
  startsAt: string;
  endsAt: string;
  className?: string;
  /** "display" for the big showcase, "compact" for cards and detail pages. */
  size?: "display" | "compact";
};

function Digit({ value, size }: { value: string; size: Props["size"] }) {
  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden tabular-nums",
        size === "display" ? "h-[0.92em] w-[0.58em]" : "h-[1em] w-[0.62em]",
      )}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-start justify-center leading-none"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Unit({ value, label, size }: { value: number | null; label: string; size: Props["size"] }) {
  const str = value === null ? "--" : value > 99 ? value.toString() : pad2(value);
  return (
    <div className="flex flex-col">
      <span
        className={cn(
          "flex font-display leading-none",
          size === "display" ? "text-[clamp(3.5rem,11vw,11rem)] tracking-[-0.04em]" : "text-[clamp(2rem,4vw,3rem)] tracking-[-0.03em]",
        )}
        aria-hidden
      >
        {str.split("").map((d, i) => (
          <Digit key={i} value={d} size={size} />
        ))}
      </span>
      <span className={cn("eyebrow mt-3 opacity-60", size === "compact" && "mt-2")}>{label}</span>
    </div>
  );
}

/**
 * Live countdown calculated from the event's real start time.
 * Renders dashes until hydrated so server and client markup match.
 */
export function Countdown({ startsAt, endsAt, className, size = "display" }: Props) {
  const [r, setR] = useState<Remaining | null>(null);
  const [status, setStatus] = useState<"before" | "live" | "ended">("before");

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const start = new Date(startsAt).getTime();
      const end = new Date(endsAt).getTime();
      if (now >= end) {
        setStatus("ended");
        setR(remainingUntil(endsAt, now));
      } else if (now >= start) {
        setStatus("live");
        setR(remainingUntil(endsAt, now));
      } else {
        setStatus("before");
        setR(remainingUntil(startsAt, now));
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [startsAt, endsAt]);

  const live = `${r?.days ?? "--"} days ${r?.hours ?? "--"} hours ${r?.minutes ?? "--"} minutes ${r?.seconds ?? "--"} seconds`;

  if (status === "ended") {
    return (
      <p className={cn("font-display text-display-sm", className)} role="status">
        This event has concluded.
      </p>
    );
  }

  return (
    <div className={className}>
      <p className="sr-only" role="timer" aria-live="off">
        {status === "live" ? "Happening now. Ends in " : "Starts in "}
        {live}
      </p>
      {status === "live" && (
        <p className="eyebrow mb-4 inline-flex items-center gap-2 text-ember">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
          Happening now · ends in
        </p>
      )}
      <div
        className={cn(
          "grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4",
          size === "display" && "sm:gap-x-10 md:gap-x-16",
        )}
        aria-hidden
      >
        <Unit value={r?.days ?? null} label="Days" size={size} />
        <Unit value={r?.hours ?? null} label="Hours" size={size} />
        <Unit value={r?.minutes ?? null} label="Minutes" size={size} />
        <Unit value={r?.seconds ?? null} label="Seconds" size={size} />
      </div>
    </div>
  );
}
