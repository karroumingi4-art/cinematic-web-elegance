import { Reveal, SectionHeading } from "./Reveal";

const quotes = [
  {
    quote:
      "I have sat in the same seat for thirty-one years. The club has grown enormously and somehow still feels like it belongs to us.",
    name: "Marta Ferrero",
    role: "Season member since 1994",
  },
  {
    quote:
      "The academy taught me how to train, but more than that it taught me how to carry myself when nobody is watching.",
    name: "Luca Bendini",
    role: "Academy graduate, first team",
  },
  {
    quote:
      "Working with Ardente is unlike any other partnership. Nothing leaves the building until it is genuinely finished.",
    name: "Rina Halvorsen",
    role: "Creative director, partner studio",
  },
];

export function Voices() {
  return (
    <section id="voices" className="relative bg-background py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Voices"
          title={
            <>
              What the club <span className="text-gradient-gold">sounds like</span>
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
