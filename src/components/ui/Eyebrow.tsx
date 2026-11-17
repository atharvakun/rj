import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  line = true,
}: {
  children: React.ReactNode;
  className?: string;
  line?: boolean;
}) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-3 opacity-70", className)}>
      {line && <span aria-hidden className="h-px w-6 bg-current" />}
      <span>{children}</span>
    </span>
  );
}
