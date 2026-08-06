import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, SectionHeading } from "./Reveal";
import locker from "@/assets/about-locker.jpg";

const pillars = [
  { title: "Disciplina e Cura", body: "Ogni sessione curata, ogni dettaglio perfezioanto." },
  { title: "appartenenza", body: "Un club profondamente attaccato alle sue origini, ai suoi tifosi e al suo territorio." },
  { title: "LOngevità", body: "Lavorare ora per il futuro, l'idea di Gastone." },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="relative bg-background py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div ref={ref} className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-lg shadow-elegant">
            <motion.img
              src={locker}
              alt="Player lacing boots in a dim dressing room"
              width={1200}
              height={1504}
              loading="lazy"
              style={reduced ? {} : { y }}
              className="h-[28rem] w-full scale-110 object-cover sm:h-[36rem]"
            />
          </div>
          <Reveal delay={0.2}>
            <div className="glass absolute -bottom-8 left-4 right-4 rounded-lg p-6 sm:left-8 sm:right-auto sm:w-72">
              <p className="eyebrow">Our creed</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                “We do not chase moments. We build the conditions that make them inevitable.”
              </p>
            </div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="The club"
            title={
              <>
                Un attaccamento <span className="text-[#95BFE5]">Senza limiti</span>
              </>
            }
            intro="Gaston Villa nasce nel 2023 grazie a Gastone e Karim.Nato da idee nobili come la disciplina , la cura, ma soprattutto sempre concentrati sul futuro."
          />

          <ul className="mt-12 space-y-8">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.1 * i} className="flex gap-6">
                <span className="display shrink-0 text-sm text-primary">0{i + 1}</span>
                <div className="min-w-0">
                  <h3 className="display text-xl">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
