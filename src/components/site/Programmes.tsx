import { motion } from "motion/react";
import { Crown, Ticket, Trophy, Users } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const items = [
  {
    icon: Ticket,
    title: "Matchday",
    body: "Curated seating tiers, tunnel-side hospitality and pre-match dining designed around the ninety minutes.",
  },
  {
    icon: Crown,
    title: "The Gold Circle",
    body: "A limited membership with year-round access to training sessions, archives and members-only evenings.",
  },
  {
    icon: Users,
    title: "Academy",
    body: "Technical development from age eight upward, with schooling, nutrition and mentorship built in.",
  },
  {
    icon: Trophy,
    title: "Legacy fund",
    body: "Community pitches, coaching bursaries and stadium restoration financed directly by supporters.",
  },
];

export function Programmes() {
  return (
    <section id="programmes" className="relative bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Programmes"
          title={
            <>
              Ways to stand <span className="text-gradient-gold">with us</span>
            </>
          }
          intro="Four routes into the club, each built with the same attention we give the first team."
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
