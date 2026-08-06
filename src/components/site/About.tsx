import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, SectionHeading } from "./Reveal";
import locker from "@/assets/about-locker.jpg";

const pillars = [
  { title: "Discipline", body: "Every session measured, every detail rehearsed until it disappears." },
  { title: "Belonging", body: "A club shaped by the city that fills it, from the terraces inward." },
  { title: "Longevity", body: "Decisions made for the next generation, not the next headline." },
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
                A quiet obsession with <span className="text-gradient-gold">getting it right</span>
              </>
            }
            intro="Ardente began as eleven dockworkers on a floodless pitch. More than a century later the ambition is unchanged: play with courage, treat people well, and leave the shirt heavier with meaning than we found it."
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
