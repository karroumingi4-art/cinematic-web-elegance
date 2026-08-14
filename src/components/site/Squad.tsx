import { useState } from "react";
import { motion } from "motion/react";
import { Reveal, SectionHeading } from "./Reveal";
import { PlayerModal } from "./PlayerModal";
import { players, type Player } from "./squad-data"; // <-- importa da un solo file

export function Squad() {
  const [selected, setSelected] = useState<Player | null>(null);
  return (
    <section id="squad" className="relative bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Prima Squadra" title={<>I Nomi sulle <span className="text-[#95BFE5]">Maglie</span></>} intro="..." />
        <div className="mt-16 flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory">
          {players.map((player, i) => (
            <Reveal key={player.id} delay={0.02 * i} className="w-[220px] sm:w-[260px] shrink-0 snap-start">
              <motion.button type="button" onClick={() => setSelected(player)} whileHover={{ y: -8 }} className="group block w-full overflow-hidden rounded-lg border border-border bg-surface text-left">
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
                  <img src={player.image} alt={player.name} loading="lazy" onError={(e) => e.currentTarget.src = `https://picsum.photos/seed/${player.id}/400/500`} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="veil absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="display absolute -bottom-3 right-3 text-[#95BFE5] text-6xl opacity-80">{player.number}</span>
                </div>
                <div className="p-6">
                  <h3 className="display text-2xl">{player.name}</h3>
                  <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">{player.position}</p>
                  <span className="mt-6 inline-block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 transition-opacity">View profile</span>
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
