import { Reveal } from "./Reveal";

const partners = [
  "Iliad",
  "Tecnocasa",
  "Terra Mineral",
  "Unieuro",
  "Bancomat",
  "Ridgeline Air",
];

export function Partners() {
  return (
    <section aria-labelledby="partners-heading" className="border-y border-border bg-ink py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2
            id="partners-heading"
            className="text-center text-[0.65rem] font-bold uppercase tracking-[0.32em] text-muted-foreground"
          >
            Official partners of Ardente FC
          </h2>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((p, i) => (
            <Reveal as="li" key={p} delay={0.05 * i}>
              <span className="display block text-center text-sm tracking-[0.14em] text-foreground/45 transition-colors duration-500 hover:text-primary sm:text-base">
                {p}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
