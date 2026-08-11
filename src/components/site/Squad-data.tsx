import { useState } from "react";
import { motion } from "motion/react";
import { Reveal, SectionHeading } from "./Reveal";
import { PlayerModal } from "./PlayerModal";
import { players } from "./squad-data";
import type { Player } from "./squad-data";

export function Squad() {
  const [selected, setSelected] = useState<Player | null>(null);

  return (
    <section id="squad" className="relative bg-background py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Prima Squadra"
          title={
            <>
              I Nomi sulle <span className="text-[#95BFE5]">Maglie</span>
            </>
          }
          intro="Scorri lateralmente per vedere la rosa completa e clicca su ciascuno per scoprirne il profilo dettagliato."
        />

        <div className="mt-16 flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary scrollbar-track-border">
          {players.map((player, i) => (
            <Reveal key={player.id} delay={0.02 * i} className="w- sm:w- shrink-0 snap-start">
              <motion.button
                type="button"
                onClick={() => setSelected(player)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative block h-full w-full overflow-hidden rounded-lg border border-border bg-surface text-left"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
                  <img
                    src={player.image}
                    alt={player.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <span className="display absolute -bottom-3 right-3 text-6xl leading-none text-[#95BFE5] opacity-80">
                    {player.number}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="display text-2xl">{player.name}</h3>
                  <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {player.position}
                  </p>
                  <span className="mt-6 inline-block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    View profile
                  </span>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      <PlayerModal player={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
