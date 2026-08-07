import { createFileRoute } from "@tanstack/react-router";
import { Download, ShieldCheck, Calendar, Wallet } from "lucide-react";
import { Reveal, SectionHeading } from "../components/site/Reveal";

export const Route = createFileRoute("/academy")({
  component: AcademyPage,
});

function AcademyPage() {
  return (
    <section id="academy" className="relative bg-surface/20 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Scuola Calcio"
          title={
            <>
              Gaston Villa <span className="text-[#95BFE5]">Academy</span>
            </>
          }
          intro="Iscrivi i piccoli campioni alla nostra scuola calcio ufficiale. Allenamenti professionali, crescita e tanto divertimento sotto i colori del Gaston Villa FC."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
          <div className="space-y-8">
            <Reveal delay={0.05}>
              <div className="flex gap-4">
                <Wallet className="size-6 shrink-0 text-primary" />
                <div>
                  <h3 className="text-base font-semibold text-foreground">Quota di Iscrizione</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    L'importo intero è di <strong>euro 450,00 €</strong> per l'intera stagione sportiva.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex gap-4">
                <ShieldCheck className="size-6 shrink-0 text-primary" />
                <div>
                  <h3 className="text-base font-semibold text-foreground">Cosa Comprende</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    La quota include tutti gli allenamenti, il tesseramento ufficiale F.I.G.C. e la copertura assicurativa completa.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex gap-4">
                <Calendar className="size-6 shrink-0 text-primary" />
                <div>
                  <h3 className="text-base font-semibold text-foreground">Inizio Attività</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    I ragazzi sono ammessi agli allenamenti nel periodo che intercorre tra l'iscrizione e il completamento del tesseramento.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-elegant sm:p-10">
              <h3 className="display text-2xl text-foreground">Modulo di Iscrizione</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Scarica, compila in stampatello in ogni sua parte e firma il documento ufficiale per formalizzare l'iscrizione alla scuola calcio.
              </p>
              
              <div className="mt-8 flex justify-center">
                <a
                  href="/modulo-iscrizione.png"
                  download="Modulo_Iscrizione_Gaston_Villa.png"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-500 hover:shadow-glow"
                >
                  <Download className="size-4" />
                  Scarica il Modulo
                </a>
              </div>
              <p className="mt-4 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                Formato PNG · Pronto per la stampa
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
