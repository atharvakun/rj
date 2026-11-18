/**
 * Shared SVG clip path for the cusped Rajput arch used across the site
 * (gate intro, team portraits). Rendered once in the layout; apply it with
 * `style={{ clipPath: "url(#arch-clip)" }}` on any box: the path is defined in
 * object-bounding-box units so it stretches to the element.
 */
export const ARCH_PATH =
  "M0,1 L0,0.45 Q0.002,0.293 0.15,0.24 Q0.187,0.102 0.33,0.11 Q0.45,0.09 0.5,0 Q0.55,0.09 0.67,0.11 Q0.813,0.102 0.85,0.24 Q0.998,0.293 1,0.45 L1,1 Z";

export const archClip = { clipPath: "url(#arch-clip)" } as const;

export function ArchDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
          <path d={ARCH_PATH} />
        </clipPath>
      </defs>
    </svg>
  );
}

/** The same arch as a stroked outline, for marks and decoration. `viewBox="0 0 100 100"`. */
export function ArchOutline({ className, strokeWidth = 4 }: { className?: string; strokeWidth?: number }) {
  const d = ARCH_PATH.replace(/-?\d*\.?\d+/g, (n) => String(Math.round(parseFloat(n) * 1000) / 10)).replace(/ Z$/, "");
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden className={className}>
      <path d={d} stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <g transform="translate(22 34) scale(0.56)">
        <path d={d} stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}
