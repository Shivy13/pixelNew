import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Custom cursor: a small dot that tracks instantly + a spring-driven ring.
 * Scales up over links/buttons; shows a label (bg acid) over [data-cursor] elements.
 * Disabled on touch devices and for prefers-reduced-motion.
 */
export default function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [seen, setSeen] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.55 });
  const raf = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!seen) setSeen(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const el = t?.closest?.("a, button, [data-cursor]") as HTMLElement | null;
      if (el) {
        setHover(true);
        setLabel(el.getAttribute("data-cursor"));
      } else {
        setHover(false);
        setLabel(null);
      }
    };
    const onLeave = () => setSeen(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled, x, y, seen]);

  if (!enabled) return null;

  const labeled = label !== null;

  return (
    <>
      {/* dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[110] hidden md:block"
        style={{ x, y, opacity: seen ? 1 : 0 }}
        aria-hidden="true"
      >
        <div className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-bone mix-blend-difference" />
      </motion.div>
      {/* ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[110] hidden md:block"
        style={{ x: ringX, y: ringY, opacity: seen ? 1 : 0 }}
        aria-hidden="true"
      >
        <div
          className={[
            "flex items-center justify-center rounded-full transition-all duration-300 ease-out",
            labeled
              ? "-ml-9 -mt-9 h-[72px] w-[72px] bg-acid"
              : hover
                ? "-ml-8 -mt-8 h-16 w-16 border border-bone/70 bg-bone/10 mix-blend-difference"
                : "-ml-[18px] -mt-[18px] h-9 w-9 border border-bone/50 mix-blend-difference",
          ].join(" ")}
        >
          {labeled && (
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
              {label}
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
}
