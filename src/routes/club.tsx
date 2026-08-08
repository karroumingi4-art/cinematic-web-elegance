import { createFileRoute } from "@tanstack/react-router";
import { Crown, ShieldCheck, Star, Download } from "lucide-react";
import { Reveal, SectionHeading } from "../components/site/Reveal";
export const Route = createFileRoute("/club")({
  component: ClubPage,
});
function ClubPage() {
  return (
    <section id="club" className="relative bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Premium Membership"
          title={<>Il <span className="text-[#95BFE5]">Circolo</span></>}
          intro="L'experience più esclusiva per vivere il Gaston Villa FC da protagonista. Un pass per entrare nel cuore pulsante del club."
        />
        
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-16">
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-border bg-surface p-8 shadow-elegant">
                <Crown className="size-6 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground">Porte Chiuse</h3>
                <p className="mt-2 text-sm text-muted-foreground">Accesso esclusivo per assistere alle sessioni di allenamento a porte chiuse della prima squadra e incontrare i giocatori a fine sessione.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-surface p-8 shadow-elegant">
                <Star className="size-6 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground">Prelazione VIP</h3>
                <p className="mt-2 text-sm text-muted-foreground">Priorità assoluta e garantita sull'acquisto dei biglietti per i match di cartello e accesso prioritario ai rinnovi degli abbonamenti stagionali.</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-border bg-surface p-8 shadow-elegant sm:col-span-2">
                <ShieldCheck className="size-6 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground">Vantaggi Esclusivi del Club</h3>
                <p className="mt-2 text-sm text-muted-foreground">Cene di gala annuali con lo staff tecnico, inviti a conferenze stampa straordinarie, kit di merchandising ufficiale in edizione limitata numerata e sconti speciali presso gli store del club.</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-elegant sm:p-10 sticky top-24">
              <h3 className="display text-2xl text-foreground">Modulo di Adesione</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Sei pronto a fare il grande passo ed entrare nel Circolo? Scarica il modulo ufficiale di iscrizione e inviacelo compilato per completare la tua adesione.
              </p>
              
              <div className="mt-8 flex justify-center">
                <a
                  href="/modulo-abbonamento-2026-2027.pdf"
                  download="MODULO_ABBONAMENTO_GASTON_VILLA_2026_2027.pdf"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Download className="size-4" />
                  Scarica il Modulo
                </a>
              </div>
              <p className="mt-4 text-[0.62rem] font-bold uppercase tracking-[0.15em] text-primary">
                Compila il modulo e invialo tramite il form nella pagina di iscrizione
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
