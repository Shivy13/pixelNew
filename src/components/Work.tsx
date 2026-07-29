import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeUp, MaskLines } from "./Reveal";
import ScrambleText from "./ScrambleText";
import { PROJECTS, type Project } from "../data";
import { navigate } from "../lib/nav";
import { getLenis } from "../lib/lenis";
import { cn } from "../utils/cn";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-12",
];

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M1.5 10.5l9-9M3 1.5h7.5V9" />
    </svg>
  );
}

function CaseModal({ project, onClose, onNext }: { project: Project; onClose: () => void; onNext: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[84] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <div className="absolute inset-0 bg-ink/85" />
      <motion.div
        className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto border border-bone/12 bg-coal"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={project.image} alt={`${project.name} — ${project.client}`} className="aspect-[16/9] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-bone/30 bg-ink/50 text-bone transition-colors duration-300 hover:border-acid hover:bg-acid hover:text-ink"
          >
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" />
            </svg>
          </button>
          <p className="absolute bottom-4 left-5 font-sans text-[10px] uppercase tracking-[0.3em] text-bone/60">
            CASE {project.index} — {project.year}
          </p>
        </div>

        <div className="grid gap-10 p-6 md:grid-cols-3 md:p-10">
          <div className="md:col-span-2">
            <h3 className="font-display text-4xl uppercase leading-none text-bone md:text-5xl">
              {project.name}
            </h3>
            <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.25em] text-bone/45">
              {project.client} — {project.year}
            </p>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-bone/65 md:text-lg">
              {project.detail}
            </p>
            <div className="mt-9 border-l-2 border-acid pl-5">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-bone/40">Result</p>
              <p className="mt-2 font-serifit text-2xl italic leading-snug text-bone md:text-3xl">
                {project.outcome}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-bone/40">Services</p>
            <ul className="mt-3">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="flex items-center justify-between border-t border-bone/10 py-3 text-sm text-bone/75 last:border-b"
                >
                  {t}
                  <span className="h-1.5 w-1.5 bg-acid" />
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3 pt-8">
              <button
                onClick={() => {
                  onClose();
                  navigate("contact");
                }}
                className="group flex items-center justify-between border border-acid px-5 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-acid transition-colors duration-300 hover:bg-acid hover:text-ink"
              >
                Start a similar project
                <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={onNext}
                className="flex items-center justify-between border border-bone/20 px-5 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-bone/70 transition-colors duration-300 hover:border-bone/60 hover:text-bone"
              >
                Next case
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M1 6h10M7 2l4 4-4 4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Work() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="work" className="relative border-t border-bone/10 px-6 py-24 md:px-10 md:py-36 lg:px-16">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <FadeUp>
            <p className="flex items-center gap-3 font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-bone/50">
              <span className="inline-block h-2 w-2 bg-acid" />
              <ScrambleText text="(02) — SELECTED WORK" />
            </p>
          </FadeUp>
          <MaskLines
            as="h2"
            delay={0.1}
            className="mt-7 font-display uppercase leading-[0.9] text-bone text-[clamp(2.6rem,7vw,6.6rem)]"
            lines={[
              <>Featured</>,
              <>
                work<span className="text-acid">.</span>
              </>,
            ]}
          />
        </div>
        <FadeUp delay={0.2}>
          <div className="flex flex-col items-start gap-1.5 pb-2 font-sans text-[11px] uppercase tracking-[0.25em] text-bone/40 md:items-end">
            <span>(05) cases — 2024 → 2026</span>
            <span className="text-bone/30">Hover to preview · click to open</span>
          </div>
        </FadeUp>
      </div>

      {/* grid */}
      <div className="mt-14 grid grid-cols-12 gap-5 md:mt-20 md:gap-6">
        {PROJECTS.map((p, i) => (
          <FadeUp key={p.id} delay={(i % 2) * 0.08} className={cn("col-span-12", SPANS[i])}>
            <button
              onClick={() => setActive(i)}
              data-cursor="Open"
              aria-label={`Open case study: ${p.name} for ${p.client}`}
              className={cn(
                "group relative block w-full overflow-hidden border border-bone/10 bg-coal text-left",
                i === PROJECTS.length - 1 ? "aspect-[16/10] sm:aspect-[21/9]" : "aspect-[4/3]"
              )}
            >
              <img
                src={p.image}
                alt={`${p.name} — ${p.tags.join(", ")} for ${p.client}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-ink/35 transition-opacity duration-700 group-hover:via-ink/5" />

              {/* index */}
              <span className="text-outline absolute left-5 top-4 font-display text-4xl leading-none md:left-6 md:top-5 md:text-5xl">
                {p.index}
              </span>

              {/* hover arrow */}
              <span className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full border border-bone/35 bg-ink/40 text-bone opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:border-acid group-hover:text-acid md:right-6">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>

              {/* bottom info */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-2xl uppercase leading-none text-bone transition-transform duration-500 group-hover:translate-x-1.5 md:text-4xl">
                    {p.name}
                  </h3>
                  <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-bone/50">
                    {p.client} · {p.year}
                  </span>
                </div>
                {/* hover-reveal tags */}
                <div className="mt-3 flex flex-wrap gap-2 opacity-0 translate-y-3 transition-all duration-500 [transition-delay:80ms] group-hover:translate-y-0 group-hover:opacity-100">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-bone/25 bg-ink/50 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.16em] text-bone/85"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-12">
        <p className="font-sans text-sm text-bone/50">
          Full archive available on request —{" "}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              navigate("contact");
            }}
            className="text-bone underline decoration-acid/70 underline-offset-4 transition-colors hover:text-acid"
          >
            write us
          </a>
          .
        </p>
      </FadeUp>

      <AnimatePresence>
        {active !== null && (
          <CaseModal
            project={PROJECTS[active]}
            onClose={() => setActive(null)}
            onNext={() => setActive((a) => (a === null ? a : (a + 1) % PROJECTS.length))}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
