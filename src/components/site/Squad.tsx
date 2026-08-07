import { useState } from "react";
import { motion } from "motion/react";
import { Reveal, SectionHeading } from "./Reveal";
import { PlayerModal } from "./PlayerModal";

export type Player = {
  number: string;
  name: string;
  position: string;
  image: string;
};

const players: Player[] = [
  { number: "1", name: "Marco Fontana", position: "Portiere", image: "https://unsplash.com" },
  { number: "12", name: "Ahmed Al-Mansoori", position: "Portiere", image: "https://unsplash.com" },
  { number: "22", name: "Pierre Dubois", position: "Portiere", image: "https://unsplash.com" },
  { number: "2", name: "Alessandro Bianchi", position: "Difensore", image: "https://unsplash.com" },
  { number: "3", name: "John Smith", position: "Difensore", image: "https://unsplash.com" },
  { number: "4", name: "Youssef El Amrani", position: "Difensore", image: "https://unsplash.com" },
  { number: "5", name: "Carlos Mendoza", position: "Difensore", image: "https://unsplash.com" },
  { number: "6", name: "Matteo Esposito", position: "Difensore", image: "https://unsplash.com" },
  { number: "13", name: "Hans Müller", position: "Difensore", image: "https://unsplash.com" },
  { number: "14", name: "Tariq Al-Hassan", position: "Difensore", image: "https://unsplash.com" },
  { number: "25", name: "Luca Ricci", position: "Difensore", image: "https://unsplash.com" },
  { number: "8", name: "Zayd Rahal", position: "Centrocampista", image: "https://unsplash.com" },
  { number: "10", name: "Lorenzo Ferrari", position: "Centrocampista", image: "https://unsplash.com" },
  { number: "16", name: "Yuki Tanaka", position: "Centrocampista", image: "https://unsplash.com" },
  { number: "18", name: "Omar Farooq", position: "Centrocampista", image: "https://unsplash.com" },
  { number: "20", name: "Davide Bruno", position: "Centrocampista", image: "https://unsplash.com" },
  { number: "21", name: "Kevin De Bruyne", position: "Centrocampista", image: "https://unsplash.com" },
  { number: "23", name: "Ali Al-Saeed", position: "Centrocampista", image: "https://unsplash.com" },
  { number: "24", name: "Simone Gallo", position: "Centrocampista", image: "https://unsplash.com" },
  { number: "26", name: "Mustafa Jamil", position: "Centrocampista", image: "https://unsplash.com" },
  { number: "7", name: "Karim Benzema", position: "Attaccante", image: "https://unsplash.com" },
  { number: "9", name: "Andrea Belotti", position: "Attaccante", image: "https://unsplash.com" },
  { number: "11", name: "Mohamed Salah", position: "Attaccante", image: "https://unsplash.com" },
  { number: "17", name: "Filippo Inzaghi", position: "Attaccante", image: "https://unsplash.com" },
  { number: "19", name: "Kamil Al-Farsi", position: "Attaccante", image: "https://unsplash.com" },
  { number: "27", name: "Christian Vieri", position: "Attaccante", image: "https://unsplash.com" },
  { number: "28", name: "Tariq Mansoor", position: "Attaccante", image: "https://unsplash.com" },
  { number: "99", name: "Gabriele Rossi", position: "Attaccante", image: "https://unsplash.com" }
];

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
          intro="Scorri lateralmente per vedere la rosa completa di 28 giocatori e clicca su ciascuno per scoprirne il profilo dettagliato."
        />

        <div className="mt-16 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-primary scrollbar-track-border snap-x snap-mandatory flex gap-5">
          {players.map((player, i) => (
            <Reveal key={player.number} delay={0.02 * i} className="w-[18rem] sm:w-[22rem] shrink-0 snap-start">
              <motion.button
                type="button"
                onClick={() => setSelected(player)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative block h-full w-full overflow-hidden rounded-lg border border-border bg-surface text-left"
                aria-label={`Open details for ${player.name}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={player.image}
                    alt={`${player.name}, ${player.position}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="veil absolute inset-0" />
                  <span
                    aria-hidden="true"
                    className="display absolute -bottom-3 right-3 text-gradient-gold text-6xl leading-none opacity-80"
                  >
                    {player.number}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="display text-2xl">{player.name}</h3>
                  <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {player.position}
                  </p>
                  <span className="mt-6 inline-block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100">
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
