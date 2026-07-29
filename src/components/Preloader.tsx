import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const WORD = "PIXELFORGE";

interface Props {
  onComplete: () => void;
}

/** Full-screen preloader: % counter, wordmark materialising, curtain wipe out. */
export default function Preloader({ onComplete }: Props) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    let raf = 0;
    if (reduced) {
      setProgress(100);
      timers.current.push(window.setTimeout(onComplete, 300));
      return () => () => timers.current.forEach(clearTimeout);
    }
    const DUR = 1750;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / DUR);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timers.current.push(window.setTimeout(() => setExiting(true), 430));
        timers.current.push(window.setTimeout(onComplete, 430 + 820));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      timers.current.forEach(clearTimeout);
    };
  }, [reduced, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col bg-ink"
      initial={{ y: "0%" }}
      animate={exiting ? { y: "-100%" } : { y: "0%" }}
      transition={{ duration: 0.78, ease: [0.83, 0, 0.17, 1] }}
      aria-hidden="true"
    >
      {/* leading edge of the curtain */}
      <span className="absolute bottom-0 left-0 h-[3px] w-full bg-acid" />

      <div className="flex items-center justify-between px-6 py-6 font-sans text-[10px] uppercase tracking-[0.3em] text-bone/40 md:px-10 lg:px-16">
        <span>PixelForge — Studio</span>
        <span className="hidden sm:block">VFX · Web · SEO · Design</span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="flex select-none" aria-label="PixelForge">
          {WORD.split("").map((ch, i) => {
            const lit = progress > 10 + i * 7.5;
            return (
              <span
                key={i}
                className="font-display text-[10.5vw] uppercase leading-none tracking-[0.03em] text-bone transition-all duration-500 ease-out md:text-8xl"
                style={{
                  opacity: lit ? 1 : 0.12,
                  transform: lit ? "translateY(0)" : "translateY(0.32em)",
                  filter: lit ? "blur(0px)" : "blur(4px)",
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
        <p className="mt-7 font-sans text-[10px] uppercase tracking-[0.4em] text-bone/40">
          Forging pixels since 2019
        </p>
      </div>

      <div className="flex items-end justify-between px-6 pb-8 md:px-10 lg:px-16">
        <div className="w-44 md:w-72">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-bone/40">
            Loading assets
          </p>
          <div className="mt-3 h-px w-full bg-bone/15">
            <div
              className="h-full bg-acid transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <p className="font-display text-6xl leading-none text-bone tabular-nums md:text-8xl">
          {progress}
          <span className="text-acid">%</span>
        </p>
      </div>
    </motion.div>
  );
}
