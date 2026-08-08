import { motion } from "motion/react";
import { Crown, Ticket, Trophy, Users } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { useNavigate } from "@tanstack/react-router";

const items = [
  { icon: Ticket, title: "Matchday", body: "posti a sedere premium, tour nel tunnel dello stadio e cena pre partita.", to: "/matchday" },
  { icon: Crown, title: "Il Circolo", body: "Accesso agli allenamenti a porte chiuse, entrata anticipata e priorità prenotazioni.", to: "/circolo" },
  { icon: Users, title: "Accademia", body: "Sviluppo tecnico, tattico e mentale dagli 8 anni in su.", to: "/accademia" },
  { icon: Trophy, title: "Shop", body: "Le maglie ufficiali Gaston Villa 25/26.", to: "/shop" },
];

export function Programmes() {
  const navigate = useNavigate();
  return (
    <section id="programmi" className="relative bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="programmi" title={<>Stai <span className="text-[#95BFE5]">con noi</span></>} intro="Quattro strade dentro al club." />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={0.08 * i}>
              <motion.article onClick={() => navigate({ to: item.to })} whileHover={{ y: -8 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="group relative h-full overflow-hidden rounded-lg border border-border bg-surface p-8 cursor-pointer">
                <item.icon className="size-7 text-primary" />
                <h3 className="display mt-8 text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                <span className="mt-8 inline-block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100">Discover →</span>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
