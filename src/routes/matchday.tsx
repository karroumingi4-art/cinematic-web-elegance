```tsx
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Ticket, Armchair, CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading } from "../components/site/Reveal";

export const Route = createFileRoute("/matchday")({
  component: MatchdayPage,
});

type Sector = { id: string; name: string; price: string; bgClass: string; borderClass: string; textClass: string };

const SECTORS_DATA: Record<string, Sector[]> = {
  Rosso: [
    { id: "red-1", name: "1° Anello Rosso (VIP)", price: "90,00 €", bgClass: "bg-red-600/10 hover:bg-red-600/30", borderClass: "border-red-600/50", textClass: "text-red-400" },
    { id: "red-2", name: "2° Anello Rosso (Centrale)", price: "60,00 €", bgClass: "bg-red-500/10 hover:bg-red-500/30", borderClass: "border-red-500/40", textClass: "text-red-300" },
    { id: "red-3", name: "3° Anello Rosso (Alta)", price: "40,00 €", bgClass: "bg-red-400/5 hover:bg-red-400/20", borderClass: "border-red-400/30", textClass: "text-red-200" },
  ],
  Arancio: [
    { id: "ora-1", name: "1° Anello Arancio (Distinti)", price: "50,00 €", bgClass: "bg-orange-600/10 hover:bg-orange-600/30", borderClass: "border-orange-600/50", textClass: "text-orange-400" },
    { id: "ora-2", name: "2° Anello Arancio (Laterale)", price: "35,00 €", bgClass: "bg-orange-500/10 hover:bg-orange-500/30", borderClass: "border-orange-500/40", textClass: "text-orange-300" },
    { id: "ora-3", name: "3° Anello Arancio (Alta)", price: "25,00 €", bgClass: "bg-orange-400/5 hover:bg-orange-400/20", borderClass: "border-orange-400/30", textClass: "text-orange-200" },
  ],
  Blu: [
    { id: "blu-1", name: "1° Anello Blu (Curva Sud)", price: "30,00 €", bgClass: "bg-blue-600/10 hover:bg-blue-600/30", borderClass: "border-blue-600/50", textClass: "text-blue-400" },
    { id: "blu-2", name: "2° Anello Blu (Tifo)", price: "25,00 €", bgClass: "bg-blue-500/10 hover:bg-blue-500/30", borderClass: "border-blue-500/40", textClass: "text-blue-300" },
    { id: "blu-3", name: "3° Anello Blu (Popolare)", price: "18,00 €", bgClass: "bg-blue-400/5 hover:bg-blue-400/20", borderClass: "border-blue-400/30", textClass: "text-blue-200" },
  ],
  Verde: [
    { id: "grn-1", name: "1° Anello Verde (Curva Nord)", price: "30,00 €", bgClass: "bg-emerald-600/10 hover:bg-emerald-600/30", borderClass: "border-emerald-600/50", textClass: "text-emerald-400" },
    { id: "grn-2", name: "2° Anello Verde (Ospiti)", price: "20,00 €", bgClass: "bg-emerald-500/10 hover:bg-emerald-500/30", borderClass: "border-emerald-500/40", textClass: "text-emerald-300" },
    { id: "grn-3", name: "3° Anello Verde (Alta)", price: "18,00 €", bgClass: "bg-emerald-400/5 hover:bg-emerald-400/20", borderClass: "border-emerald-400/30", textClass: "text-emerald-200" },
  ],
};

function MatchdayPage() {
  const [activeColor, setActiveColor] = useState<"Rosso" | "Arancio" | "Blu" | "Verde">("Rosso");
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketsCount, setTicketsCount] = useState("1");
  const [isPending, setIsPending] = useState(false);

  const handleBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedSector) {
      toast.error("Seleziona prima l'Anello desiderato per l'acquisto!");
      return;
    }
    if (name.trim().length < 2 || email.trim().length < 5) {
      toast.error("Inserisci informazioni di contatto valide.");
      return;
    }

    setIsPending(true);

    const formData = new FormData();
    formData.append("Servizio", "Biglietteria Gaston Villa Park Layout Ufficiale");
    formData.append("Nome Tifoso", name.trim());
    formData.append("Email Tifoso", email.trim());
    formData.append("Settore Gaston Villa Park", activeColor);
    formData.append("Anello e Dettaglio", selectedSector.name);
    formData.append("Prezzo Singolo", selectedSector.price);
    formData.append("Quantità", ticketsCount);

    const totale = parseFloat(selectedSector.price.replace(",", ".")) * parseInt(ticketsCount);
    formData.append("Totale Ordine", `${totale.toFixed(2)} €`);

    try {
      const res = await fetch("https://formspree.io", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        toast.success(`Richiesta inviata! Riepilogo inviato alla mail. Totale: ${totale.toFixed(2)} €.`);
        setName("");
        setEmail("");
        setTicketsCount("1");
        setSelectedSector(null);
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Errore di connessione durante la prenotazione.");
    } finally {
      setIsPending(false);
    }
  };

  const totaleCorrente = selectedSector
    ? (parseFloat(selectedSector.price.replace(",", ".")) * (parseInt(ticketsCount) || 0)).toFixed(2)
    : "0.00";

  return (
    <section className="relative bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Biglietteria Gaston Villa Park"
          title={<>Gaston Villa Park <span className="text-[#95BFE5]">Stadium Map</span></>}
          intro="Scegli il tuo biglietto selezionando i quattro storici settori dello stadio: Rosso, Arancio, Blu o Verde e seleziona l'anello ideale."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-16">

          {/* Colonna sinistra: mappa dello stadio */}
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface/40 p-6 text-center shadow-elegant">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Seleziona il Settore e l'Anello
              </h3>

              <div className="grid grid-cols-4 gap-2 mb-8 max-w-md mx-auto">
                {(["Rosso", "Arancio", "Blu", "Verde"] as const).map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => { setActiveColor(color); setSelectedSector(null); }}
                    className={`py-2 text-xs font-bold uppercase rounded-lg border transition-all ${
                      activeColor === color
                        ? color === "Rosso" ? "bg-red-600/20 border-red-500 text-red-400 ring-1 ring-red-500" :
                          color === "Arancio" ? "bg-orange-500/20 border-orange-500 text-orange-400 ring-1 ring-orange-500" :
                          color === "Blu" ? "bg-blue-600/20 border-blue-500 text-blue-400 ring-1 ring-blue-500" :
                          "bg-emerald-600/20 border-emerald-500 text-emerald-400 ring-1 ring-emerald-500"
                        : "border-border bg-zinc-900/40 text-muted-foreground hover:text-white"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>

              <div className="relative mx-auto flex max-w-sm flex-col items-center justify-center rounded-3xl border-4 border-double border-border/40 bg-black/60 aspect-square p-6 sm:p-10">
                <div className="w-full h-full flex flex-col justify-between items-center relative">

                  <button
                    type="button"
                    onClick={() => setSelectedSector(SECTORS_DATA[activeColor][2])}
                    className={`w-full py-2.5 rounded-xl border text-[0.65rem] font-bold uppercase tracking-wider transition-all duration-300 ${SECTORS_DATA[activeColor][2].bgClass} ${SECTORS_DATA[activeColor][2].borderClass} ${SECTORS_DATA[activeColor][2].textClass} ${selectedSector?.id === SECTORS_DATA[activeColor][2].id ? "ring-2 ring-primary scale-[1.03]" : ""}`}
                  >
                    3° Anello {activeColor} ({SECTORS_DATA[activeColor][2].price})
                  </button>

                  <div className="w-[86%] h-[80%] rounded-2xl border border-border/40 flex flex-col justify-between items-center p-3 relative bg-zinc-950/30">
                    <button
                      type="button"
                      onClick={() => setSelectedSector(SECTORS_DATA[activeColor][1])}
                      className={`w-full py-2.5 rounded-xl border text-[0.65rem] font-bold uppercase tracking-wider transition-all duration-300 ${SECTORS_DATA[activeColor][1].bgClass} ${SECTORS_DATA[activeColor][1].borderClass} ${SECTORS_DATA[activeColor][1].textClass} ${selectedSector?.id === SECTORS_DATA[activeColor][1].id ? "ring-2 ring-primary scale-[1.03]" : ""}`}
                    >
                      2° Anello {activeColor} ({SECTORS_DATA[activeColor][1].price})
                    </button>

                    <div className="w-[84%] h-[74%] rounded-xl border border-border/40 flex flex-col justify-between items-center p-3 relative bg-zinc-950/60">
                      <button
                        type="button"
                        onClick={() => setSelectedSector(SECTORS_DATA[activeColor][0])}
                        className={`w-full py-2.5 rounded-xl border text-[0.65rem] font-bold uppercase tracking-wider transition-all duration-300 ${SECTORS_DATA[activeColor][0].bgClass} ${SECTORS_DATA[activeColor][0].borderClass} ${SECTORS_DATA[activeColor][0].textClass} ${selectedSector?.id === SECTORS_DATA[activeColor][0].id ? "ring-2 ring-primary scale-[1.03]" : ""}`}
                      >
                        1° Anello {activeColor} ({SECTORS_DATA[activeColor][0].price})
                      </button>

                      <div className="w-full h-[40%] rounded-lg border border-emerald-500/20 bg-emerald-950/20 flex flex-col items-center justify-center border-dashed">
                        <span className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-emerald-400/40">
                          Campo Gaston Villa Park
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Colonna destra: riepilogo e form di prenotazione */}
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface/40 p-6 shadow-elegant lg:sticky lg:top-24">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6 flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                Riepilogo Ordine
              </h3>

              {selectedSector ? (
                <div className="mb-6 rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Armchair className={`h-4 w-4 ${selectedSector.textClass}`} />
                    <span className={`text-sm font-semibold ${selectedSector.textClass}`}>
                      {selectedSector.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Settore {activeColor} · {selectedSector.price} a biglietto
                  </p>
                </div>
              ) : (
                <div className="mb-6 rounded-xl border border-dashed border-border/60 p-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Nessun anello selezionato. Scegli un settore sulla mappa a sinistra.
                  </p>
                </div>
              )}

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">
                    Nome e Cognome
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mario Rossi"
                    className="w-full rounded-lg border border-border bg-zinc-900/40 px-3 py-2 text-sm text-white placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mario.rossi@email.com"
                    className="w-full rounded-lg border border-border bg-zinc-900/40 px-3 py-2 text-sm text-white placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">
                    Numero Biglietti
                  </label>
                  <select
                    value={ticketsCount}
                    onChange={(e) => setTicketsCount(e.target.value)}
                    className="w-full rounded-lg border border-border bg-zinc-900/40 px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border/60 bg-zinc-900/30 px-4 py-3">
                  <span className="text-xs font-medium text-muted-foreground">Totale</span>
                  <span className="text-lg font-bold text-white">{totaleCorrente} €</span>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPending ? (
                    "Invio in corso..."
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Conferma Prenotazione
                    </>
                  )}
                </button>
              </form>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
```
