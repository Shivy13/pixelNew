import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, CONTACT, SOCIALS } from "../data";
import { navigate } from "../lib/nav";
import { getLenis } from "../lib/lenis";
import { cn } from "../utils/cn";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function NavItem({ id, label }: { id: string; label: string }) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(id);
      }}
      className="group relative text-[12px] font-medium uppercase tracking-[0.18em] text-bone/65 transition-colors duration-300 hover:text-bone"
    >
      {label}
      <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-acid transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    navigate(id);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
          scrolled && !open
            ? "border-b border-bone/10 bg-ink/95 backdrop-blur-sm"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 md:h-20 md:px-10 lg:px-16">
          <button
            onClick={() => go("top")}
            className="group flex items-center gap-2.5 font-display text-lg uppercase tracking-[0.08em] text-bone md:text-xl"
            aria-label="PixelForge — back to top"
          >
            <span className="inline-block h-2.5 w-2.5 bg-acid transition-transform duration-500 ease-out group-hover:rotate-90 group-hover:scale-125" />
            Pixel<span className="text-acid">Forge</span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <NavItem key={l.id} id={l.id} label={l.label} />
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={`mailto:${CONTACT.email}`}
              className="hidden border border-acid px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-acid transition-colors duration-300 hover:bg-acid hover:text-ink lg:inline-flex"
            >
              Let&rsquo;s Talk
            </a>

            {/* burger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative flex h-10 w-10 flex-col items-center justify-center gap-[7px] lg:hidden"
            >
              <span
                className={cn(
                  "h-px w-6 bg-bone transition-all duration-400 ease-out",
                  open && "translate-y-1 rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-6 bg-bone transition-all duration-400 ease-out",
                  open && "-translate-y-1 -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-coal lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1] }}
          >
            <motion.nav
              className="flex flex-1 flex-col justify-center px-6 pt-20 md:px-10"
              aria-label="Mobile"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } } }}
            >
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.id);
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 44 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                  }}
                  className="group flex items-baseline gap-4 border-t border-bone/10 py-3 last:border-b"
                >
                  <span className="font-sans text-[11px] font-medium tracking-[0.2em] text-acid">
                    0{i + 1}
                  </span>
                  <span className="font-display text-[13.5vw] uppercase leading-[0.95] text-bone transition-all duration-300 group-hover:translate-x-3 group-hover:text-acid">
                    {l.label}
                  </span>
                </motion.a>
              ))}
            </motion.nav>

            <motion.div
              className="border-t border-bone/10 px-6 py-7 md:px-10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1 text-sm text-bone/65">
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-acid">
                    {CONTACT.email}
                  </a>
                  <a href={CONTACT.phoneHref} className="hover:text-acid">
                    {CONTACT.phone}
                  </a>
                </div>
                <div className="flex gap-5">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[12px] uppercase tracking-[0.18em] text-bone/65 hover:text-acid"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
