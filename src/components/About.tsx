import { FadeUp, MaskLines } from "./Reveal";
import ScrambleText from "./ScrambleText";
import { TEAM } from "../data";
import { navigate } from "../lib/nav";

function InlineLink({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(id);
      }}
      className="group inline-flex items-baseline gap-1.5 text-bone underline decoration-acid/70 decoration-1 underline-offset-4 transition-colors duration-300 hover:text-acid"
    >
      {children}
      <svg viewBox="0 0 10 10" className="h-2 w-2 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M1 9L9 1M3 1h6v6" />
      </svg>
    </a>
  );
}

export default function About() {
  return (
    <section id="studio" className="relative border-t border-bone/10 px-6 py-24 md:px-10 md:py-36 lg:px-16">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
        {/* sticky left */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <FadeUp>
              <p className="flex items-center gap-3 font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-bone/50">
                <span className="inline-block h-2 w-2 bg-acid" />
                <ScrambleText text="(01) — THE STUDIO" />
              </p>
            </FadeUp>

            <MaskLines
              as="h2"
              delay={0.1}
              className="mt-7 font-display uppercase leading-[0.95] text-bone text-[clamp(2.1rem,4.6vw,4.3rem)]"
              lines={[
                <>We are</>,
                <span key="pf" className="text-outline">
                  PixelForge—
                </span>,
                <>a VFX, web &</>,
                <>
                  design <em className="font-serifit lowercase italic tracking-normal">studio.</em>
                </>,
              ]}
            />

            <FadeUp delay={0.2} className="mt-12">
              <div className="group relative overflow-hidden border border-bone/10">
                <div className="overflow-hidden">
                  <img
                    src="/images/studio.jpg"
                    alt="The PixelForge studio at night — monitors glowing with timelines and renders"
                    className="aspect-[4/3] w-full animate-pf-breathe object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 font-sans text-[10px] uppercase tracking-[0.28em] text-bone/60">
                  The forge — Torstraße, Berlin. 02:14 AM
                </p>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* right column */}
        <div className="lg:col-span-6 lg:col-start-7">
          <FadeUp>
            <p className="text-2xl font-light leading-[1.25] text-bone md:text-4xl md:leading-[1.2]">
              We craft <span className="text-acid">cinematic VFX</span>, high-performance
              websites, and SEO-driven visibility for brands that want to stand out.
            </p>
          </FadeUp>

          <FadeUp delay={0.12} className="mt-9 max-w-xl">
            <p className="text-base leading-relaxed text-bone/60 md:text-lg">
              <InlineLink id="services">What we do</InlineLink> — we help businesses build a
              striking digital identity from the ground up, handling everything from motion and
              visuals to the code and rankings behind them. One team, one pipeline, no
              hand-offs between agencies that don&rsquo;t talk to each other.{" "}
              <InlineLink id="team">Meet the team</InlineLink>
            </p>
          </FadeUp>

          <FadeUp delay={0.18} className="mt-9 max-w-xl">
            <p className="text-base leading-relaxed text-bone/60 md:text-lg">
              The studio was founded on a simple observation: the film, the site and the
              campaign are the same idea wearing three different outfits. So we forge all
              three under one roof — and measure ourselves on what moves: views, rankings,
              revenue.
            </p>
          </FadeUp>

          {/* team */}
          <div id="team" className="mt-20 scroll-mt-28">
            <FadeUp>
              <div className="flex items-baseline justify-between border-t border-bone/15 pt-6">
                <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-bone md:text-3xl">
                  The team
                </h3>
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-bone/40">
                  (04) humans
                </span>
              </div>
            </FadeUp>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TEAM.map((m, i) => (
                <FadeUp key={m.name} delay={i * 0.07}>
                  <div className="group flex items-center gap-5 border border-bone/10 bg-coal/60 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-acid/50 hover:bg-coal">
                    <span className="text-outline font-display text-3xl leading-none transition-colors duration-500 md:text-4xl">
                      {m.initials}
                    </span>
                    <div>
                      <p className="font-medium text-bone transition-colors duration-300 group-hover:text-acid">
                        {m.name}
                      </p>
                      <p className="mt-0.5 font-sans text-[10px] uppercase tracking-[0.22em] text-bone/45">
                        {m.role} — {m.focus}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
