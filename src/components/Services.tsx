import { FadeUp, MaskLines } from "./Reveal";
import ScrambleText from "./ScrambleText";
import { PROCESS, SERVICES, type ServiceColumn } from "../data";

function ServiceIcon({ kind }: { kind: ServiceColumn["icon"] }) {
  const common = "h-9 w-9 text-bone/80";
  if (kind === "vfx") {
    return (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className={common}>
        <rect x="3" y="6" width="26" height="20" rx="1.5" />
        <path d="M13.5 12.5l7 3.5-7 3.5z" fill="currentColor" stroke="none" />
        <path d="M3 10.5h4M3 21.5h4M25 10.5h4M25 21.5h4" strokeWidth="1.1" />
      </svg>
    );
  }
  if (kind === "web") {
    return (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className={common}>
        <path d="M10.5 10L5 16l5.5 6M21.5 10L27 16l-5.5 6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 7.5l-4 17" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className={common}>
      <path d="M4 27h24" strokeLinecap="round" />
      <path d="M7 27v-8M13.5 27V12M20 27v-5.5M26.5 27V8" strokeLinecap="round" />
      <path d="M5 14l6.5-5.5 5 3.5L26 5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.5 5.5H26V10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative border-t border-bone/10 px-6 py-24 md:px-10 md:py-36 lg:px-16">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
        {/* sticky intro + process */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <FadeUp>
              <p className="flex items-center gap-3 font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-bone/50">
                <span className="inline-block h-2 w-2 bg-acid" />
                <ScrambleText text="(03) — CAPABILITIES" />
              </p>
            </FadeUp>
            <MaskLines
              as="h2"
              delay={0.1}
              className="mt-7 font-display uppercase leading-[0.98] text-bone text-[clamp(2rem,4vw,3.7rem)]"
              lines={[
                <>We help brands</>,
                <>
                  look,{" "}
                  <em className="font-serifit lowercase italic tracking-normal text-acid">move</em>
                </>,
                <>& rank better.</>,
              ]}
            />
            <FadeUp delay={0.2} className="mt-8 max-w-sm">
              <p className="text-base leading-relaxed text-bone/55">
                Three disciplines, one pipeline. Everything below ships from the same room —
                which is exactly why it ships fast.
              </p>
            </FadeUp>

            {/* process */}
            <FadeUp delay={0.25} className="mt-12">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-bone/40">
                How we work
              </p>
              <ul className="mt-4">
                {PROCESS.map((s) => (
                  <li
                    key={s.step}
                    className="group flex items-baseline gap-5 border-t border-bone/10 py-4 transition-all duration-400 last:border-b hover:pl-2"
                  >
                    <span className="font-sans text-[11px] font-medium tracking-[0.2em] text-bone/35 transition-colors duration-300 group-hover:text-acid">
                      {s.step}
                    </span>
                    <div>
                      <p className="font-display text-xl uppercase tracking-[0.03em] text-bone">
                        {s.name}
                      </p>
                      <p className="mt-1 text-sm text-bone/50">{s.line}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>

        {/* three columns */}
        <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3 lg:gap-8">
          {SERVICES.map((col, i) => (
            <FadeUp key={col.id} delay={i * 0.1}>
              <div id={col.id} className="group/col h-full scroll-mt-28 border-t border-bone/25 pt-6 transition-colors duration-500 hover:border-acid">
                <div className="flex items-start justify-between">
                  <ServiceIcon kind={col.icon} />
                  <span className="font-sans text-[11px] font-medium tracking-[0.2em] text-bone/35 transition-colors duration-300 group-hover/col:text-acid">
                    ({col.index})
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl uppercase leading-tight tracking-[0.02em] text-bone md:text-[1.7rem]">
                  {col.title}
                </h3>
                <ul className="mt-6">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="group/item flex items-center justify-between gap-3 border-b border-bone/10 py-3.5 text-[15px] text-bone/65 transition-all duration-300 hover:translate-x-1.5 hover:text-bone"
                    >
                      {item}
                      <span className="font-sans text-acid opacity-0 transition-opacity duration-300 group-hover/item:opacity-100">
                        +
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.28em] text-bone/35">
                  {col.footnote}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
