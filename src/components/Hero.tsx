import { motion, useReducedMotion } from "framer-motion";
import Marquee from "./Marquee";
import ScrambleText from "./ScrambleText";
import { MaskLines } from "./Reveal";
import { CONTACT, SHOWREEL_VIDEO } from "../data";
import { navigate } from "../lib/nav";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Props {
  ready: boolean;
}

function Meta({ ready, children, delay }: { ready: boolean; children: React.ReactNode; delay: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero({ ready }: Props) {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* showreel backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        {!reduced ? (
          <video
            className="h-full w-full object-cover opacity-[0.3]"
            src={SHOWREEL_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_50%_40%,rgba(198,241,53,0.07),transparent_62%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/25 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,10,10,0.75)_100%)]" />
      </div>

      {/* marquee ticker under the nav */}
      <div className="relative z-10 mt-16 border-b border-bone/10 py-3 md:mt-20">
        <Marquee
          duration={24}
          items={["PixelForge", "VFX", "Web", "SEO", "Design", "Motion"].map((w) => (
            <span key={w} className="font-display text-lg uppercase tracking-[0.12em] text-bone/85 md:text-2xl">
              {w}
            </span>
          ))}
        />
      </div>

      {/* headline block */}
      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-10 pt-14 md:px-10 md:pb-14 lg:px-16">
        <Meta ready={ready} delay={0.15}>
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-block h-2 w-2 animate-pulse bg-acid" />
            <ScrambleText
              text="SHOWREEL — BERLIN, 2026"
              className="font-sans text-[11px] font-medium uppercase tracking-[0.35em] text-bone/60"
              delay={300}
            />
          </div>
        </Meta>

        <MaskLines
          as="h1"
          play={ready}
          delay={0.25}
          stagger={0.1}
          className="font-display uppercase leading-[0.9] tracking-[-0.01em] text-bone text-[clamp(2.9rem,10.4vw,9.4rem)]"
          lines={[
            <>
              The{" "}
              <em className="font-serifit lowercase italic tracking-normal text-bone">creative</em>
            </>,
            <>engine your</>,
            <>brand has been</>,
            <>
              waiting to{" "}
              <em className="font-serifit lowercase italic tracking-normal text-bone">meet.</em>
            </>,
          ]}
        />

        <div className="mt-9 flex flex-wrap items-end justify-between gap-6">
          <Meta ready={ready} delay={0.85}>
            <p className="max-w-sm text-sm leading-relaxed text-bone/65 md:text-base">
              {CONTACT.cityLine}. Cinematic VFX, high-performance websites and rankings that
              compound.
            </p>
          </Meta>
          <Meta ready={ready} delay={0.95}>
            <div className="hidden flex-col items-end gap-1.5 font-sans text-[10px] uppercase tracking-[0.28em] text-bone/40 md:flex">
              <span>{CONTACT.coords}</span>
              <span>Est. 2019 — {new Date().getFullYear()} reel live</span>
            </div>
          </Meta>
        </div>
      </div>

      {/* scroll cue */}
      <Meta ready={ready} delay={1.15}>
        <button
          onClick={() => navigate("studio")}
          data-cursor="Info"
          aria-label="Scroll to studio intro"
          className="group absolute bottom-10 right-6 z-10 flex flex-col items-center gap-3 md:right-10 lg:right-16"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-bone/55 transition-colors duration-300 [writing-mode:vertical-rl] group-hover:text-acid">
            Info
          </span>
          <span className="block h-14 w-px overflow-hidden bg-bone/15">
            <span className="block h-full w-full animate-pf-scrollcue bg-acid" />
          </span>
          <svg
            viewBox="0 0 12 12"
            className="h-3 w-3 text-bone/55 transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-acid"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M6 1v9M2.5 6.5L6 10l3.5-3.5" />
          </svg>
        </button>
      </Meta>
    </section>
  );
}
