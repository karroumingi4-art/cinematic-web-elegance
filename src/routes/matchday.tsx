import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Ticket, Armchair, CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading } from "../components/site/Reveal";

export const Route = createFileRoute("/matchday")({
  component: MatchdayPage,
});

type Sector = { id: string; name: string; price: string; color: string; ring: string };

const SECTORS: Sector[] = [
  { id: "red-1", name: "1° Anello Rosso (Poltroncine VIP)", price: "85,00 €", color: "border-red-500/50 bg-red-500/10 hover:bg-red-500/30 text-red-400", ring: "Primo Anello" },
  { id: "red-2", name: "2° Anello Rosso (Tribuna Centrale)", price: "55,00 €", color: "border-red-400/40 bg-red-400/5 hover:bg-red-400/20 text-red-300", ring: "Secondo Anello" },
  { id: "ora-1", name: "1° Anello Arancio (Distinti)", price: "45,00 €", color: "border-orange-500/50 bg-orange-500/10 hover:bg-orange-500/30 text-orange-400", ring: "Primo Anello" },
  { id: "ora-2", name: "2° Anello Arancio (Laterale)", price: "35,00 €", color: "border-orange-400/40 bg-orange-400/5 hover:bg-orange-400/20 text-orange-300", ring: "Secondo Anello" },
  { id: "grn-1", name: "1° Anello Verde (Curva Locali)", price: "25,00 €", color: "border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-400", ring: "Primo Anello" },
  { id: "grn-2", name: "2° Anello Verde (Curva Ospiti)", price: "20,00 €", color: "border-emerald-400/40 bg-emerald-400/5 hover:bg-emerald-400/20 text-emerald-300", ring: "Secondo Anello" },
];

function MatchdayPage() {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketsCount, setTicketsCount] = useState("1");
  const [isPending, setIsPending] = useState(false);

  const handleBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedSector) {
      toast.error("Seleziona un settore dello stadio sulla mappa concentrica prima di inviare!");
      return;
    }
    if (name.trim().length < 2 || email.trim().length < 5) {
      toast.error("Inserisci un nome e una e-mail validi.");
      return;
    }

    setIsPending(true);

    const formData = new FormData();
    formData.append("Servizio", "Prenotazione Biglietti San Siro Style");
    formData.append("Nome Tifoso", name.trim());
    formData.append("Email Tifoso", email.trim());
    formData.append("Fascia Stadio", selectedSector.ring);
    formData.append("Settore Selezionato", selectedSector.name);
    formData.append("Prezzo Singolo", selectedSector.price);
    formData.append("Numero Biglietti", ticketsCount);
    
    const totale = parseFloat(selectedSector.price.replace(",", ".")) * parseInt(ticketsCount);
    formData.append("Totale Stimato", `${totale.toFixed(2)} €`);

    try {
      const res = await fetch("https://formspree.io", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        toast.success(`Richiesta inviata! Riceverai i biglietti via e-mail. Totale: ${totale.toFixed(2)} €.`);
        setName("");
        setEmail("");
        setTicketsCount("1");
        setSelectedSector(null);
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Errore nell'invio della prenotazione. Riprova più tardi.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="relative bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Biglietteria San Siro Layout"
          title={
            <>
              Seleziona il tuo <span className="text-[#95BFE5]">Anello e Settore</span>
            </>
          }
          intro="Mappa a settori concentrici ispirata ai grandi stadi. Clicca sull'anello desiderato, compila i dati e prenota i biglietti."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-16">
          
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface/40 p-6 text-center shadow-elegant">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">Mappa Grafica ad Anelli Concentrici</h3>
              
              <div className="relative mx-auto flex max-w-lg flex-col items-center justify-center rounded-full border-4 border-double border-border/40 bg-black/60 aspect-square p-4 sm:p-8">
                
                <div className="absolute inset-2 sm:inset-4 rounded-full border border-dashed border-border/20 pointer-events-none" />
                <div className="w-full h-full flex flex-col justify-between items-center relative p-2">
                  
                  <div className="w-full flex justify-between gap-2 px-6">
                    <button type="button" onClick={() => setSelectedSector(SECTORS[1])} className={`px-3 py-1.5 rounded-lg border text-[0.65rem] font-bold uppercase tracking-wider transition-all duration-300 ${SECTORS[1].color} ${selectedSector?.id === "red-2" ? "ring-2 ring-primary scale-105" : ""}`}>2° Rosso</button>
                    <button type="button" onClick={() => setSelectedSector(SECTORS[3])} className={`px-3 py-1.5 rounded-lg border text-[0.65rem] font-bold uppercase tracking-wider transition-all duration-300 ${SECTORS[3].color} ${selectedSector?.id === "ora-2" ? "ring-2 ring-primary scale-105" : ""}`}>2° Arancio</button>
                  </div>

                  <div className="w-[82%] h-[82%] rounded-full border border-border/40 flex flex-col justify-between items-center p-3 relative bg-zinc-950/40">
                    
                    <div className="w-full flex justify-between gap-2 px-4">
                      <button type="button" onClick={() => setSelectedSector(SECTORS[0])} className={`px-3 py-1.5 rounded-lg border text-[0.65rem] font-bold uppercase tracking-wider transition-all duration-300 ${SECTORS[0].color} ${selectedSector?.id === "red-1" ? "ring-2 ring-primary scale-105" : ""}`}>1° Rosso VIP</button>
                      <button type="button" onClick={() => setSelectedSector(SECTORS[2])} className={`px-3 py-1.5 rounded-lg border text-[0.65rem] font-bold uppercase tracking-wider transition-all duration-300 ${SECTORS[2].color} ${selectedSector?.id === "ora-1" ? "ring-2 ring-primary scale-105" : ""}`}>1° Arancio</button>
                    </div>

                    <div className="w-[62%] h-[40%] rounded-xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col items-center justify-center p-2 border-dashed my-2">
                      <div className="w-full h-px bg-emerald-500/20 relative top-1/2" />
                      <div className="size-8 rounded-full border border-emerald-500/20 flex items-center justify-center">
                        <div className="size-1.5 rounded-full bg-emerald-500/40" />
                      </div>
                      <span className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-emerald-400/40 z-10">PITCH</span>
                    </div>

                    <div className="w-full flex justify-center">
                      <button type="button" onClick={() => setSelectedSector(SECTORS[4])} className={`w-3/4 py-1.5 rounded-lg border text-[0.65rem] font-bold uppercase tracking-wider transition-all duration-300 ${SECTORS[4].color} ${selectedSector?.id === "grn-1" ? "ring-2 ring-primary scale-105" : ""}`}>1° Verde Curva</button>
                    </div>

                  </div>

                  <div className="w-full flex justify-center">
                    <button type="button" onClick={() => setSelectedSector(SECTORS[5])} className={`w-1/2 py-1.5 rounded-lg border text-[0.65rem] font-bold uppercase tracking-wider transition-all duration-300 ${SECTORS[5].color} ${selectedSector?.id === "grn-2" ? "ring-2 ring-primary scale-105" : ""}`}>2° Verde Curva</button>
                  </div>

                </div>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">La mappa rappresenta la divisione a gironi concentrici. Seleziona una zona per calcolare il prezzo complessivo.</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="rounded-lg border border-border bg-surface p-7 shadow-elegant sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <Ticket className="size-5 text-primary" />
                <h3 className="display text-2xl">Prenotazione Posto</h3>
              </div>

              <form onSubmit={handleBooking} noValidate className="flex flex-col gap-5">
                <div className={`p-4 rounded-xl border transition-all ${selectedSector ? "border-primary/40 bg-primary/5 text-primary" : "border-dashed border-border bg-transparent text-muted-foreground"}`}>
                  {selectedSector ? (
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="size-5 shrink-0 text-primary" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider">{selectedSector.ring}</p>
                        <p className="text-sm font-semibold text-white">{selectedSector.name} — {selectedSector.price}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 py-1">
                      <Armchair className="size-5 shrink-0" />
                      <p className="text-sm font-medium">Seleziona un anello colorato sulla pianta dello stadio</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">Nome e Cognome</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Es. Luca Bianchi" className="mt-2 w-full rounded-md border border-input bg-surface px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none" />
                </div>

                <div>
                  <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">E-mail di Spedizione</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="mt-2 w-full rounded-md border border-input bg-surface px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none" />
                </div>

                <div>
                  <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">Quantità Biglietti</label>
                  <select value={ticketsCount} onChange={(e) => setTicketsCount(e.target.value)} className="mt-2 w-full rounded-md border border-input bg-surface px-4 py-3 text-sm text-white focus:border-primary focus:outline-none bg-slate-900">
                    <option value="1">1 Biglietto</option>
                    <option value="2">2 Biglietti</option>
                    <option value="3">3 Biglietti</option>
                    <option value="4">4 Biglietti</option>
                  </select>
                </div>

                <button type="submit" disabled={isPending || !selectedSector} className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-primary-foreground hover:shadow-glow disabled:opacity-40 disabled:cursor-not-allowed">
                  {isPending ? "Elaborazione..." : selectedSector ? `Acquista (${(parseFloat(selectedSector.price.replace(",", ".")) * parseInt(ticketsCount)).toFixed(2)} €)` : "Seleziona un Anello"}
                </button>
              </form>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
