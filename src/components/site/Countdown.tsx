import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CalendarDays, MapPin } from "lucide-react";
import { Reveal } from "./Reveal";
import { nextMatch } from "./next-match";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number): Parts {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

function Unit({ value, label, i }: { value: number; label: string; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-w-[4.5rem] flex-col items-center rounded-xl border border-border bg-surface/70 px-4 py-3 sm:min-w-[5.5rem] sm:px-6 sm:py-4"
    >
      <span className="display text-3xl leading-none text-primary sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </motion.div>
  );
}

export function Countdown() {
  const target = new Date(nextMatch.kickoff).getTime();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(diff(target));
    const id = window.setInterval(() => setParts(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <section id="countdown" className="relative border-y border-border bg-surface/40 py-14 sm:py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <Reveal>
          <div>
            <p className="eyebrow">Prossimo match</p>
            <h2 className="display mt-4 text-3xl sm:text-4xl">
              {nextMatch.home} <span className="text-primary">vs</span> {nextMatch.away}
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <CalendarDays className="size-3.5 text-primary/70" aria-hidden />
                {new Date(nextMatch.kickoff).toLocaleDateString("it-IT", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}{" "}
                · 18:30
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-3.5 text-primary/70" aria-hidden />
                {nextMatch.venue}
              </span>
            </div>
          </div>
        </Reveal>

        <div className="flex gap-3 sm:gap-4" aria-live="polite">
          {parts ? (
            <>
              <Unit value={parts.days} label="Giorni" i={0} />
              <Unit value={parts.hours} label="Ore" i={1} />
              <Unit value={parts.minutes} label="Minuti" i={2} />
              <Unit value={parts.seconds} label="Secondi" i={3} />
            </>
          ) : (
            <>
              <Unit value={0} label="Giorni" i={0} />
              <Unit value={0} label="Ore" i={1} />
              <Unit value={0} label="Minuti" i={2} />
              <Unit value={0} label="Secondi" i={3} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
