import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import hero from "@/assets/hero-stadium.jpg";

const stats = [
  { value: "1907", label: "Founded" },
  { value: "62,400", label: "Seats" },
  { value: "31", label: "Honours" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.35], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);

  return (
    <section id="hero" className="relative min-h-dvh overflow-hidden">
      <motion.div className="absolute inset-0 -z-10" style={reduced ? {} : { y: imageY }}>
        <img
          src={hero}
          alt="Floodlit stadium tunnel before kick-off"
          width={1920}
          height={1088}
          className="h-[114%] w-full object-cover object-center"
        />
        <div className="veil absolute inset-0" />
      </motion.div>

      <motion.div
        style={reduced ? {} : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-dvh max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
        >
          Ardente Football Club — Est. 1907
        </motion.p>

        <h1 className="display mt-6 max-w-4xl text-[clamp(2.75rem,11vw,7.5rem)]">
          {["Built in the", "dark. Forged", "for the light."].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.25 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                {i === 2 ? <span className="text-gradient-gold">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg"
        >
          A century of craft, discipline and belonging. Step inside the club where every
          matchday is written like a chapter and every supporter carries the flame.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <a
            href="#about"
            className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-8 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-primary-foreground transition-all duration-500 hover:gap-5 hover:shadow-glow"
          >
            Enter the club
            <ArrowDown className="size-4 transition-transform duration-500 group-hover:translate-y-1" />
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 grid grid-cols-3 gap-6 border-t border-border pt-8 sm:max-w-2xl"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                {s.label}
              </dt>
              <dd className="display mt-2 text-2xl sm:text-4xl">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
