import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const GLYPHS = "!<>-_\\/[]{}=+*^?#·";

interface Props {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

/** Decodes text from scrambled glyphs once it enters the viewport. */
export default function ScrambleText({ text, className = "", duration = 900, delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [out, setOut] = useState(reduced ? text : "");

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setOut(text);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const timer = setTimeout(() => {
      const tick = (t: number) => {
        if (start === null) start = t;
        const p = Math.min(1, (t - start) / duration);
        const reveal = Math.floor(p * text.length);
        let s = "";
        for (let i = 0; i < text.length; i++) {
          const c = text[i];
          if (c === " ") s += " ";
          else if (i < reveal) s += c;
          else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOut(p >= 1 ? text : s);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [inView, reduced, text, duration, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {out || "\u00A0"}
    </span>
  );
}
