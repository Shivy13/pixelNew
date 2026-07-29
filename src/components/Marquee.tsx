import type { CSSProperties, ReactNode } from "react";
import { cn } from "../utils/cn";

export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 1.5l2.3 8.2 8.2 2.3-8.2 2.3L12 22.5l-2.3-8.2-8.2-2.3 8.2-2.3L12 1.5z" />
    </svg>
  );
}

interface MarqueeProps {
  items: ReactNode[];
  reverse?: boolean;
  duration?: number;
  separator?: boolean;
  className?: string;
  itemClassName?: string;
  /** pause on hover */
  pausable?: boolean;
}

/** Infinite horizontal ticker. Content is duplicated once for a seamless -50% loop. */
export default function Marquee({
  items,
  reverse = false,
  duration = 28,
  separator = true,
  className = "",
  itemClassName = "",
  pausable = false,
}: MarqueeProps) {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className={cn("flex items-center", itemClassName)}>
          {item}
          {separator && <Spark className="mx-5 h-[0.55em] w-[0.55em] shrink-0 text-acid md:mx-8" />}
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", pausable && "pf-pause-hover", className)}>
      <div
        className={cn("flex w-max", reverse ? "animate-pf-marquee-rev" : "animate-pf-marquee")}
        style={{ "--pf-duration": `${duration}s` } as CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
