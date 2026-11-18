"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";
import { TransitionLink } from "./TransitionLink";

type Variant = "primary" | "dark" | "outline" | "ember";
type Size = "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  icon?: "arrow" | "external" | "none";
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { href: string; target?: string; rel?: string; onClick?: never; type?: never; disabled?: never };
type AsButton = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

export type ButtonProps = AsLink | AsButton;

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-medium tracking-tight transition-[color,border-color] duration-500 ease-out-expo select-none disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-bone text-ink hover:text-bone border border-bone",
  dark: "bg-ink text-bone hover:text-bone border border-ink",
  ember: "bg-ember text-night hover:text-day border border-ember",
  outline: "bg-transparent text-current border border-current/40 hover:border-current",
};

const fills: Record<Variant, string> = {
  primary: "bg-ember",
  dark: "bg-ember",
  ember: "bg-night",
  outline: "bg-current opacity-[0.08]",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base md:h-16 md:px-9 md:text-lg",
};

function Inner({ children, icon }: { children: ReactNode; icon: Common["icon"] }) {
  const Icon = icon === "external" ? ArrowUpRight : ArrowRight;
  return (
    <>
      <span className="relative z-10 block overflow-hidden">
        <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-[110%]">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-[110%] transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      {icon !== "none" && (
        <span className="relative z-10 block h-[1.1em] w-[1.1em] overflow-hidden">
          <Icon
            className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out-expo group-hover:translate-x-[120%] group-hover:-translate-y-[120%]"
            strokeWidth={1.75}
          />
          <Icon
            className="absolute inset-0 h-full w-full -translate-x-[120%] translate-y-[120%] transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0"
            strokeWidth={1.75}
          />
        </span>
      )}
    </>
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon = "arrow",
    magnetic = true,
    className,
    children,
  } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const fill = (
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 translate-y-[101%] rounded-[50%_50%_0_0/40%_40%_0_0] transition-[transform,border-radius] duration-600 ease-out-expo group-hover:translate-y-0 group-hover:rounded-none",
        fills[variant],
      )}
    />
  );

  let el: ReactNode;
  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    const external = /^https?:\/\//.test(href);
    el = (
      <TransitionLink
        href={href}
        target={target ?? (external ? "_blank" : undefined)}
        rel={rel ?? (external ? "noopener noreferrer" : undefined)}
        className={classes}
      >
        {fill}
        <Inner icon={external && icon === "arrow" ? "external" : icon}>{children}</Inner>
      </TransitionLink>
    );
  } else {
    const b = props as AsButton;
    el = (
      <button
        type={b.type ?? "button"}
        onClick={b.onClick}
        disabled={b.disabled}
        aria-label={b["aria-label"]}
        aria-pressed={b["aria-pressed"]}
        form={b.form}
        className={classes}
      >
        {fill}
        <Inner icon={icon}>{children}</Inner>
      </button>
    );
  }

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
