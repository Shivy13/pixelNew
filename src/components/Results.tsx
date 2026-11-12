import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import Marquee, { Spark } from "./Marquee";
import { FadeUp, MaskLines } from "./Reveal";
import ScrambleText from "./ScrambleText";
import { CLIENTS, STATS, TESTIMONIALS } from "../data";

function Stat({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(v),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <div ref={ref} className="group border-b border-r border-bone/10 p-6 transition-colors duration-500 hover:bg-coal/70 md:p-9">
      <p className="font-display text-4xl leading-none text-bone tabular-nums md:text-6xl">
        {prefix}
        {n.toFixed(decimals)}
        <span className="text-acid">{suffix}</span>
      </p>
      <p className="mt-4 font-sans text-[11px] uppercase leading-relaxed tracking-[0.2em] text-bone/45">
        {label}
      </p>
    </div>
  );
}

export default function Results() {
  const clientStyles: Record<string, string> = {
    display: "font-display uppercase tracking-[0.06em] text-2xl md:text-3xl",
    serif: "font-serifit italic text-2xl md:text-3xl",
    wide: "font-sans font-light uppercase tracking-[0.3em] text-xl md:text-2xl",
  };

  return (
    <section id="results" className="relative border-t border-bone/10 px-6 py-24 md:px-10 md:py-36 lg:px-16">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <FadeUp>
            <p className="flex items-center gap-3 font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-bone/50">
              <span className="inline-block h-2 w-2 bg-acid" />
              <ScrambleText text="(04) — PROOF" />
            </p>
          </FadeUp>
          <MaskLines
            as="h2"
            delay={0.1}
            className="mt-7 font-display uppercase leading-[0.95] text-bone text-[clamp(2.4rem,6vw,5.6rem)]"
            lines={[
              <>Numbers over</>,
              <em key="p" className="font-serifit lowercase italic tracking-normal">
                promises.
              </em>,
            ]}
          />
        </div>
        <FadeUp delay={0.2}>
          <p className="max-w-xs pb-2 text-sm leading-relaxed text-bone/50">
            No award shelf yet — on purpose. We&rsquo;d rather show you what moved for the
            people who paid the invoices.
          </p>
        </FadeUp>
      </div>

      {/* stats */}
      <div className="mt-14 grid grid-cols-1 border-l border-t border-bone/10 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
        {STATS.map((s) => (
          <Stat key={s.label} value={s.value} prefix={"prefix" in s ? (s as { prefix?: string }).prefix : ""} suffix={s.suffix} decimals={s.decimals} label={s.label} />
        ))}
      </div>

      {/* client wordmarks */}
      <FadeUp className="mt-16 md:mt-24">
        <p className="mb-5 font-sans text-[10px] uppercase tracking-[0.3em] text-bone/40">
          Brands in the forge
        </p>
        <div className="border-y border-bone/10 py-7">
          <Marquee
            reverse
            duration={36}
            items={CLIENTS.map((c) => (
              <span key={c.name} className={`${clientStyles[c.style]} text-bone/70 transition-colors duration-300 hover:text-acid`}>
                {c.name}
              </span>
            ))}
          />
        </div>
      </FadeUp>

      {/* testimonials */}
      <div className="mt-16 md:mt-24">
        <FadeUp>
          <div className="mb-6 flex items-baseline justify-between">
            <h3 className="font-display text-2xl uppercase tracking-[0.03em] text-bone md:text-3xl">
              What clients say
            </h3>
            <span className="hidden font-sans text-[10px] uppercase tracking-[0.25em] text-bone/35 sm:block">
              ( pause on hover )
            </span>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <Marquee
            pausable
            duration={52}
            separator={false}
            itemClassName="mx-3 items-stretch"
            items={TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="flex w-[280px] shrink-0 flex-col border border-bone/12 bg-coal/80 p-5 transition-colors duration-500 hover:border-acid/50 sm:w-[340px] sm:p-6 lg:w-[380px] lg:p-7"
              >
                {/* icon */}
                <Spark className="mb-4 h-3.5 w-3.5 shrink-0 text-acid" />

                {/* quote — 4-line clamp, never bleeds the card */}
                <blockquote className="flex-1 font-serifit text-base italic leading-snug text-bone/90 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:5] overflow-hidden lg:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* attribution — always pinned at the bottom */}
                <figcaption className="mt-5 shrink-0 border-t border-bone/10 pt-4">
                  <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-bone">
                    {t.name}
                  </p>
                  <p className="mt-1.5 font-sans text-[10px] uppercase tracking-[0.18em] text-bone/40">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          />
        </FadeUp>
      </div>
    </section>
  );
}
