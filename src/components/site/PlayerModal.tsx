import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Trophy, X } from "lucide-react";
import type { Player } from "./squad-data";

const ease = [0.16, 1, 0.3, 1] as const;

const labelClass = "text-[0.6rem] font-bold uppercase tracking-[0.24em] text-muted-foreground";

export function PlayerModal({ player, onClose }: { player: Player | null; onClose: () => void }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!player) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [player, onClose]);

  const step = (i: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: 0.16 + i * 0.07, ease },
  });

  return (
    <AnimatePresence>
      {player ? (
        <motion.div
          className="fixed inset-0 z-[120]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          role="dialog"
          aria-modal="true"
          aria-label={`${player.name}, number ${player.number}`}
        >
          <button
            type="button"
            aria-label="Close player details"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/85 backdrop-blur-sm"
          />

          <motion.div
            className="relative flex h-full w-full flex-col overflow-y-auto bg-background lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:overflow-hidden"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.985, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.99, y: 12 }}
            transition={{ duration: 0.65, ease }}
          >
            <button
              type="button"
              onClick={onClose}
              className="glass absolute right-4 top-4 z-20 inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors duration-300 hover:text-primary sm:right-6 sm:top-6"
              aria-label="Close player details"
            >
              <X className="size-5" aria-hidden="true" />
            </button>

            {/* Left: portrait + giant number */}
            <div className="relative min-h-[58vh] overflow-hidden lg:min-h-full">
              <motion.img
                src={player.image}
                alt={`${player.name}, ${player.position}`}
                className="absolute inset-0 h-full w-full object-cover"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, ease }}
              />
              <div className="veil absolute inset-0" />
              <motion.span
                aria-hidden="true"
                className="display pointer-events-none absolute -bottom-8 right-3 text-gradient-gold text-[9rem] leading-none opacity-90 sm:text-[13rem] lg:-bottom-12 lg:text-[16rem]"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease }}
              >
                {player.number}
              </motion.span>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <motion.p className="eyebrow" {...step(0)}>
                  {player.position}
                </motion.p>
                <motion.h2 className="display mt-3 text-4xl sm:text-5xl" {...step(1)}>
                  {player.name}
                </motion.h2>
              </div>
            </div>

            {/* Right: detail rail */}
            <div className="relative px-6 py-12 sm:px-10 lg:h-full lg:overflow-y-auto lg:py-16">
              <motion.dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4" {...step(2)}>
                {[
                  ["Age", player.vitals.age],
                  ["Height", player.vitals.height],
                  ["Foot", player.vitals.foot],
                  ["Joined", player.vitals.joined],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className={labelClass}>{label}</dt>
                    <dd className="display mt-2 text-2xl">{value}</dd>
                  </div>
                ))}
              </motion.dl>

              <motion.div
                className="mt-10 rounded-lg border border-border bg-surface p-6 shadow-elegant sm:p-8"
                {...step(3)}
              >
                <p className={labelClass}>Season 2025/26</p>
                <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {player.season.map((stat) => (
                    <div key={stat.label}>
                      <p className="display text-3xl text-gradient-gold">{stat.value}</p>
                      <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.blockquote
                className="mt-10 border-l border-primary/50 pl-6 font-serif text-lg italic leading-relaxed text-foreground/85 sm:text-xl"
                {...step(4)}
              >
                {player.bio}
              </motion.blockquote>

              <motion.p className={`mt-12 ${labelClass}`} {...step(5)}>
                Career
              </motion.p>
              <ol className="relative mt-6 border-l border-border pl-8">
                {player.timeline.map((item, i) => (
                  <motion.li key={item.year} className="relative pb-8 last:pb-0" {...step(6 + i)}>
                    <span
                      aria-hidden="true"
                      className="absolute -left-[2.15rem] top-1.5 size-3 rounded-full bg-primary shadow-glow"
                    />
                    <p className="display text-sm text-primary">{item.year}</p>
                    <p className="mt-2 text-base text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                  </motion.li>
                ))}
              </ol>

              <motion.p className={`mt-4 ${labelClass}`} {...step(6 + player.timeline.length)}>
                Honours
              </motion.p>
              <ul className="mt-5 flex flex-wrap gap-3 pb-4">
                {player.honours.map((honour, i) => (
                  <motion.li
                    key={honour}
                    className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-foreground/90"
                    {...step(7 + player.timeline.length + i)}
                  >
                    <Trophy className="size-3.5 text-primary" aria-hidden="true" />
                    {honour}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
