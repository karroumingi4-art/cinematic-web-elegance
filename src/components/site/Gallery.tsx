import { motion } from "motion/react";
import { Reveal, SectionHeading } from "./Reveal";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";

const shots = [
  { src: g1, alt: "Silhouetted player sprinting under floodlights", caption: "Secondo tempo dell'amichevole, 71'", w: 1200, h: 1504, span: "lg:col-span-4 lg:row-span-2" },
  { src: g2, alt: "Aerial view of a full stadium at night", caption: "Un altro sold out", w: 1600, h: 1000, span: "lg:col-span-8" },
  { src: g3, alt: "Close-up of boot studs pressed into wet grass", caption: "Giardinaggio, 05:40", w: 1200, h: 1200, span: "lg:col-span-4" },
  { src: g4, alt: "Empty stand of dark stadium seats at dusk", caption: "Prima del Caos", w: 1200, h: 1500, span: "lg:col-span-4" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative bg-background py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title={
            <>
              The season, <span className="text-gradient-gold">frame by frame</span>
            </>
          }
        />

        <div className="mt-16 grid auto-rows-[16rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {shots.map((shot, i) => (
            <Reveal key={shot.caption} delay={0.07 * i} className={shot.span}>
              <motion.figure
                whileHover={{ scale: 0.985 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-full min-h-64 overflow-hidden rounded-lg"
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.w}
                  height={shot.h}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <div className="veil absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-95" />
                <figcaption className="absolute bottom-0 left-0 p-6 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-foreground/85 transition-transform duration-700 group-hover:-translate-y-1">
                  {shot.caption}
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
