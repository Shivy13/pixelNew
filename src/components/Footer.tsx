import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeUp, MaskLines } from "./Reveal";
import ScrambleText from "./ScrambleText";
import { CONTACT, LEGAL, SOCIALS } from "../data";
import { navigate } from "../lib/nav";
import { getLenis } from "../lib/lenis";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function RotatingBadge() {
  return (
    <a
      href={`mailto:${CONTACT.email}`}
      data-cursor="Say hi"
      aria-label="Email PixelForge"
      className="group relative hidden h-32 w-32 shrink-0 items-center justify-center md:flex lg:h-40 lg:w-40"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full animate-pf-spin">
        <defs>
          <path id="pf-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-bone/65 font-sans uppercase" style={{ fontSize: "8.2px", letterSpacing: "0.24em" }}>
          <textPath href="#pf-circle">let&rsquo;s talk — let&rsquo;s talk — </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 12 12"
          className="h-4 w-4 text-acid transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <path d="M1.5 10.5l9-9M3 1.5h7.5V9" />
        </svg>
      </span>
    </a>
  );
}

function LegalModal({ kind, onClose }: { kind: "privacy" | "cookies"; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const lenis = getLenis();
    lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [onClose]);

  const data = LEGAL[kind];
  return (
    <motion.div
      className="fixed inset-0 z-[86] flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={data.title}
    >
      <div className="absolute inset-0 bg-ink/85" />
      <motion.div
        className="relative w-full max-w-lg border border-bone/12 bg-coal p-7 md:p-9"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6">
          <h4 className="font-display text-3xl uppercase text-bone">{data.title}</h4>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-bone/25 text-bone transition-colors duration-300 hover:border-acid hover:bg-acid hover:text-ink"
          >
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" />
            </svg>
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {data.body.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-bone/60">
              {p}
            </p>
          ))}
        </div>
        <p className="mt-7 font-sans text-[10px] uppercase tracking-[0.25em] text-bone/35">
          Last updated — January 2026
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Footer() {
  const [legal, setLegal] = useState<null | "privacy" | "cookies">(null);

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-bone/10">
      {/* CTA band */}
      <div className="px-6 pb-20 pt-24 md:px-10 md:pt-36 lg:px-16">
        <FadeUp>
          <p className="flex items-center gap-3 font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-bone/50">
            <span className="inline-block h-2 w-2 bg-acid" />
            <ScrambleText text="(05) — CONTACT" />
          </p>
        </FadeUp>

        <div className="mt-8 flex items-end justify-between gap-10">
          <div>
            <MaskLines
              as="h2"
              delay={0.1}
              className="font-display uppercase leading-[0.92] text-bone text-[clamp(2.7rem,8vw,7.5rem)]"
              lines={[
                <>Got a project</>,
                <>in mind?</>,
              ]}
            />
            <FadeUp delay={0.35}>
              <p className="mt-6 font-serifit text-2xl italic text-bone/80 md:text-4xl">
                Let&rsquo;s bring it to life.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.4} className="pb-2">
            <RotatingBadge />
          </FadeUp>
        </div>

        <FadeUp delay={0.45} className="mt-12">
          <a
            href={`mailto:${CONTACT.email}`}
            data-cursor="Say hi"
            className="group inline-flex items-center gap-5 border border-acid px-8 py-5 transition-colors duration-400 hover:bg-acid md:px-12 md:py-6"
          >
            <span className="font-display text-2xl uppercase tracking-[0.05em] text-acid transition-colors duration-400 group-hover:text-ink md:text-4xl">
              Let&rsquo;s Talk
            </span>
            <svg
              viewBox="0 0 12 12"
              className="h-4 w-4 text-acid transition-all duration-400 group-hover:translate-x-1 group-hover:text-ink md:h-5 md:w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M1 6h10M7 2l4 4-4 4" />
            </svg>
          </a>
        </FadeUp>
      </div>

      {/* contact grid */}
      <div className="grid grid-cols-1 gap-px border-t border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Email",
            node: (
              <a href={`mailto:${CONTACT.email}`} className="text-lg text-bone transition-colors duration-300 hover:text-acid md:text-xl">
                {CONTACT.email}
              </a>
            ),
          },
          {
            label: "Phone",
            node: (
              <a href={CONTACT.phoneHref} className="text-lg text-bone transition-colors duration-300 hover:text-acid md:text-xl">
                {CONTACT.phone}
              </a>
            ),
          },
          {
            label: "Studio",
            node: (
              <span className="text-lg leading-snug text-bone/85 md:text-xl">
                {CONTACT.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </span>
            ),
          },
          {
            label: "Follow",
            node: (
              <span className="flex flex-wrap gap-x-5 gap-y-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-lg text-bone transition-colors duration-300 hover:text-acid md:text-xl"
                  >
                    {s.label}
                    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <path d="M1 9L9 1M3 1h6v6" />
                    </svg>
                  </a>
                ))}
              </span>
            ),
          },
        ].map((b, i) => (
          <FadeUp key={b.label} delay={i * 0.06}>
            <div className="flex h-full flex-col gap-4 bg-ink p-6 md:p-8">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-bone/40">{b.label}</p>
              {b.node}
            </div>
          </FadeUp>
        ))}
      </div>

      {/* watermark */}
      <div className="select-none overflow-hidden border-t border-bone/15 px-2 pt-10" aria-hidden="true">
        <p className="text-outline-faint whitespace-nowrap text-center font-display text-[19vw] uppercase leading-[0.85]">
          PixelForge<span className="align-super text-[0.25em]">®</span>
        </p>
      </div>

      {/* bottom bar */}
      <div className="border-t border-bone/10 px-6 py-6 md:px-10 lg:px-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-bone/40">
            © 2026 PixelForge — All pixels reserved
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setLegal("privacy")}
              className="font-sans text-[11px] uppercase tracking-[0.2em] text-bone/40 underline-offset-4 transition-colors duration-300 hover:text-acid hover:underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setLegal("cookies")}
              className="font-sans text-[11px] uppercase tracking-[0.2em] text-bone/40 underline-offset-4 transition-colors duration-300 hover:text-acid hover:underline"
            >
              Cookie Policy
            </button>
            <button
              onClick={() => navigate("top")}
              data-cursor="Up"
              className="group inline-flex items-center gap-2 border border-bone/20 px-4 py-2.5 font-sans text-[11px] uppercase tracking-[0.2em] text-bone/60 transition-colors duration-300 hover:border-acid hover:text-acid"
            >
              Back to top
              <svg viewBox="0 0 12 12" className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M6 11V1M2 5l4-4 4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>{legal && <LegalModal kind={legal} onClose={() => setLegal(null)} />}</AnimatePresence>
    </footer>
  );
}
