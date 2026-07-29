import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}

/** Fade + slide up when entering the viewport (stagger-friendly). */
export function FadeUp({ children, className, delay = 0, y = 32, duration = 0.8 }: FadeUpProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -6% 0px" }}
      transition={{ duration: reduced ? 0.01 : duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface MaskLinesProps {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** true = play on mount via `animate`; false/undefined = play when scrolled into view */
  play?: boolean;
  as?: "h1" | "h2" | "h3" | "div" | "p";
}

/** Editorial line-mask reveal — each line slides up from behind a clipping mask. */
export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.09,
  play,
  as = "div",
}: MaskLinesProps) {
  const reduced = useReducedMotion();
  const Tag = as as "div";
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block will-change-transform ${lineClassName}`}
            initial={{ y: reduced ? "0%" : "112%" }}
            {...(play !== undefined
              ? { animate: play ? { y: "0%" } : { y: reduced ? "0%" : "112%" } }
              : {
                  whileInView: { y: "0%" },
                  viewport: { once: true, margin: "-8% 0px" },
                })}
            transition={{ duration: reduced ? 0.01 : 0.9, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
