"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useTransition } from "@/components/layout/TransitionProvider";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children?: ReactNode;
  prefetch?: LinkProps["prefetch"];
  scroll?: boolean;
};

/** next/link with the curtain transition. Falls back to default behaviour for modified clicks. */
export function TransitionLink({ href, onClick, children, prefetch, scroll, ...rest }: Props) {
  const { navigate } = useTransition();
  const external = /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || external) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (rest.target && rest.target !== "_self") return;
    e.preventDefault();
    navigate(href);
  };

  if (external) {
    return (
      <a href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href as unknown as LinkProps["href"]} onClick={handle} prefetch={prefetch} scroll={scroll} {...rest}>
      {children}
    </Link>
  );
}
