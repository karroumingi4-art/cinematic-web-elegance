import { Reveal, SectionHeading } from "./Reveal";

const quotes = [
  {
    quote:
      "Mi sono sempre seduta nello stesso posto per gli ultimi 4 anni. Sebbene il club sia cresciuto, lo sento ancora mio.",
    name: "Marta Ferrero",
    role: "Abbonata dal 2022",
  },
  {
    quote:
      "Questa squadra è pazzesca e non la lascierei mai e poi mai.",
    name: "Christian Pulisic",
    role: "Prima Squadra",
  },
  {
    quote:
      "Lavorare per Gaston Villa, ma soprattutto per Gaston è un vero onore.",
    name: "Ezio Sella",
    role: "Vice Allenatore, Piima Squadra",
  },
];

export function Voices() {
  return (
    <section id="voices" className="relative bg-background py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
         <SectionHeading
          eyebrow="VOCI"
          title={
            <>
              LE PAROLE <span className="text-[#95BFE5]">DEL CLUB</span>
            </>
          }
          align="center"
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={0.09 * i}>
              <figure className="flex h-full flex-col justify-between rounded-lg border border-border bg-surface p-8 transition-colors duration-500 hover:border-primary/40">
                <blockquote className="text-base leading-relaxed text-foreground/85">
                  <span aria-hidden="true" className="display block text-4xl text-primary">
                    &ldquo;
                  </span>
                  <p className="mt-2">{q.quote}</p>
                </blockquote>
                <figcaption className="mt-8 border-t border-border pt-6">
                  <p className="display text-lg">{q.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {q.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
