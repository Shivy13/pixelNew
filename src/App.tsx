import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import "lenis/dist/lenis.css";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Services from "./components/Services";
import Results from "./components/Results";
import Footer from "./components/Footer";
import { NAV_EVENT, prefersReducedMotion, wait } from "./lib/nav";
import { setLenis, getLenis } from "./lib/lenis";
import { SECTION_LABELS } from "./data";

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")";

type WipePhase = "idle" | "cover" | "exit";

export default function App() {
  const [ready, setReady] = useState(false);
  const [wipe, setWipe] = useState<{ phase: WipePhase; label: string }>({ phase: "idle", label: "" });
  const busy = useRef(false);

  const handleReady = useCallback(() => setReady(true), []);

  /* lock scroll behind the preloader */
  useEffect(() => {
    document.documentElement.style.overflow = ready ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [ready]);

  /* Lenis smooth scroll (skipped for prefers-reduced-motion) */
  useEffect(() => {
    if (!ready || prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.095, wheelMultiplier: 1 });
    setLenis(lenis);
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [ready]);

  /* curtain-wipe navigation */
  useEffect(() => {
    const handler = async (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const el = document.getElementById(id);
      if (!el || busy.current) return;

      if (prefersReducedMotion()) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }

      busy.current = true;
      const label = SECTION_LABELS[id] ?? id;
      setWipe({ phase: "cover", label });
      await wait(480);
      const l = getLenis();
      if (l) l.scrollTo(el, { immediate: true, offset: 0 });
      else el.scrollIntoView({ block: "start" });
      setWipe({ phase: "exit", label });
      await wait(540);
      setWipe({ phase: "idle", label: "" });
      busy.current = false;
    };
    window.addEventListener(NAV_EVENT, handler);
    return () => window.removeEventListener(NAV_EVENT, handler);
  }, []);

  return (
    <div className="relative min-h-screen bg-ink font-sans text-bone">
      <Cursor />

      {!ready && <Preloader onComplete={handleReady} />}

      <Nav />

      <main>
        <Hero ready={ready} />
        <About />
        <Work />
        <Services />
        <Results />
        <Footer />
      </main>

      {/* page-transition curtain */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-bone"
        animate={{ y: wipe.phase === "cover" ? "0%" : wipe.phase === "exit" ? "-100%" : "100%" }}
        transition={{ duration: 0.46, ease: [0.83, 0, 0.17, 1] }}
        aria-hidden="true"
      >
        <span className="absolute left-0 top-0 h-[3px] w-full bg-acid" />
        <span className="absolute bottom-0 left-0 h-[3px] w-full bg-acid" />
        <div className="text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-ink/50">PixelForge</p>
          <p className="font-display text-[15vw] uppercase leading-none text-ink md:text-[10vw]">
            {wipe.label || "\u00A0"}
          </p>
        </div>
      </motion.div>

      {/* film grain */}
      <div
        className="pointer-events-none fixed inset-0 z-[96] opacity-[0.05] mix-blend-soft-light"
        style={{ backgroundImage: NOISE_URI }}
        aria-hidden="true"
      />
    </div>
  );
}
