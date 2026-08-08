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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [player, onClose]);

  if (!player) return null; // <-- guardia principale

  const vitals = player.vitals?? { age: "—", height: "—", foot: "—", joined: "—" };
  const season = player.season?? [];
  const timeline = player.timeline?? [];
  const honours = player.honours?? [];

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[120]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true">
        <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-ink/85 backdrop-blur-sm" />
        <motion.div className="relative flex h-full w-full flex-col overflow-y-auto bg-background lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:overflow-hidden" initial={reduced? { opacity: 0 } : { opacity: 0, scale: 0.985, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.65, ease }}>
          {/*... resto del tuo JSX uguale ma usa vitals.age, season, timeline, honours */}
          <button type="button" onClick={onClose} className="glass absolute right-4 top-4 z-20 inline-flex size-11 items-center justify-center rounded-full"><X className="size-5" /></button>

          <div className="relative min-h- lg:min-h-full overflow-hidden">
            <img src={player.image} alt={player.name} className="absolute inset-0 h-full w-full object-cover" onError={(e) => e.currentTarget.src = `https://picsum.photos/seed/${player.id}/800/1000`} />
            <div className="veil absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="display absolute -bottom-8 right-3 text-[#95BFE5] text- leading-none opacity-90">{player.number}</span>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <p className="eyebrow">{player.position}</p>
              <h2 className="display mt-3 text-4xl sm:text-5xl">{player.name}</h2>
            </div>
          </div>

          <div className="relative px-6 py-12 sm:px-10 lg:overflow-y-auto lg:py-16">
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {Object.entries(vitals).map(([k, v]) => (
                <div key={k}><dt className={labelClass}>{k}</dt><dd className="display mt-2 text-2xl">{v}</dd></div>
              ))}
            </dl>

            <div className="mt-10 rounded-lg border border-border bg-surface p-6">
              <p className={labelClass}>Season 2025/26</p>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {season.map((s) => (
                  <div key={s.label}><p className="display text-3xl text-[#95BFE5]">{s.value}</p><p className="mt-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground">{s.label}</p></div>
                ))}
              </div>
            </div>

            {player.bio && <blockquote className="mt-10 border-l border-primary/50 pl-6 font-serif text-lg italic">{player.bio}</blockquote>}

            {timeline.length > 0 && (
              <>
                <p className={`mt-12 ${labelClass}`}>Career</p>
                <ol className="mt-6 border-l border-border pl-8">
                  {timeline.map((item) => (
                    <li key={item.year + item.title} className="relative pb-8"><span className="absolute -left-[2.15rem] top-1.5 size-3 rounded-full bg-primary" /><p className="display text-sm text-primary">{item.year}</p><p className="mt-2">{item.title}</p><p className="mt-1 text-sm text-muted-foreground">{item.detail}</p></li>
                  ))}
                </ol>
              </>
            )}

            {honours.length > 0 && (
              <>
                <p className={`mt-8 ${labelClass}`}>Honours</p>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {honours.map((h) => (
                    <li key={h} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"><Trophy className="size-3.5 text-primary" />{h}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
