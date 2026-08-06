import { motion } from "motion/react";
import { Crown, Ticket, Trophy, Users } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const items = [
  {
    icon: Ticket,
    title: "Matchday",
    body: "posti a sedere premium, tour nel tunnel dello stadio e cena pre partita a tema dei 90 minuti.",
  },
  {
    icon: Crown,
    title: "Il Circolo",
    body: "Un'iscrizione premium che ti permette di accedere agli allenamenti a porte chiuse, entrare prima alle partite, avere priorità nelle prenotazioni.",
  },
  {
    icon: Users,
    title: "Accademia",
    body: "Sviluppo tecnico, tatticoe mentale dagli 8 anni in su, con studio, nutrizione e psicologo inclusi.",
  },
  {
    icon: Trophy,
    title: "Fondo Eredità",
    body: "Campi per le communità, sviluppo delle attrezature e strutture,costruzione zone pubbliche.",
  },
];

export function Programmes() {
  return (
    <section id="programmi" className="relative bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="programmi"
          title={
            <>
              Stai <span className="text-[#95BFE5]">con noi</span>
            </>
          }
          intro="Quattro strade dentro al club, ognuna costruita con la setssa cura usata con la prima squadra."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={0.08 * i}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-full overflow-hidden rounded-lg border border-border bg-surface p-8"
              >
                <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-primary transition-transform duration-700 group-hover:scale-x-100" />
                <item.icon className="size-7 text-primary" aria-hidden="true" />
                <h3 className="display mt-8 text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                <span className="mt-8 inline-block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Discover
                </span>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
