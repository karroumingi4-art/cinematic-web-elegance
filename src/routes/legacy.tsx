import { useState } from "react";
import { toast } from "sonner";
import { Trophy, Heart, Construction, DollarSign, ArrowRight } from "lucide-react";
import { Reveal, SectionHeading } from "../components/site/Reveal";

export default function LegacyPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.trim().length < 2 || email.trim().length < 5) {
      toast.error("Per favore, compila tutti i campi obbligatori.");
      return;
    }

    setIsPending(true);

    const formData = new FormData();
    formData.append("Progetto", "Contributo Fondo Eredità");
    formData.append("Nome Sostenitore", name.trim());
    formData.append("Email Sostenitore", email.trim());
    formData.append("Intenzione di Donazione (€)", amount || "Non specificato");

    try {
      const res = await fetch("https://formspree.io", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        toast.success("Richiesta inviata! Ti risponderemo con i dettagli bancari per la donazione.");
        setName("");
        setEmail("");
        setAmount("");
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Impossibile inviare la richiesta. Riprova più tardi.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section id="legacy" className="relative bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 grid">
        <div>
          <SectionHeading
            eyebrow="Community & Social"
            title={<>Fondo <span className="text-[#95BFE5]">Eredità</span></>}
            intro="Il cuore sociale del Gaston Villa FC. Una fondazione nata per fare in modo che il calcio sia uno strumento di crescita, inclusione e miglioramento per tutto il territorio."
          />
          
          <div className="mt-8 space-y-6 text-base text-muted-foreground leading-relaxed">
            <p>
              Il <strong>Fondo Eredità</strong> non è solo un progetto sportivo, ma un patto generazionale con la nostra comunità. Crediamo che il Gaston Villa FC abbia il dovere di restituire valore al territorio che sostiene la squadra ogni giorno. 
            </p>
            <p>
              Ogni euro raccolto attraverso le donazioni spontanee e i contributi dei nostri partner viene interamente reinvestito in tre pilastri fondamentali: la riqualificazione dei campetti di quartiere abbandonati, il finanziamento di borse di studio sportive per le famiglie in difficoltà economica e la creazione di strutture ricreative gratuite per i giovani.
            </p>
          </div>

          <ul className="mt-12 space-y-7">
            <Reveal as="li" className="flex items-start gap-5">
              <Construction className="mt-1 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">Infrastrutture Pubbliche</p>
                <p className="mt-1 text-sm text-foreground/85">Ammodernamento dei centri sportivi comunali e costruzione di zone pubbliche ad accesso gratuito per lo sport.</p>
              </div>
            </Reveal>
            <Reveal as="li" className="flex items-start gap-5">
              <Heart className="mt-1 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">Inclusione Sociale</p>
                <p className="mt-1 text-sm text-foreground/85">Borse di studio per coprire interamente le spese della scuola calcio ai ragazzi meritevoli o a basso reddito.</p>
              </div>
            </Reveal>
          </ul>
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-lg border border-border bg-surface p-7 shadow-elegant sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="size-5 text-primary" />
              <h3 className="display text-2xl">Sostieni il Progetto</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Compila il modulo inserendo l'importo indicativo che desideri donare. Il nostro team ti contatterà via e-mail fornendoti le coordinate bancarie protette per eseguire il bonifico.
            </p>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div>
                <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">Nome e Cognome</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Il tuo nome" className="mt-2 w-full rounded-md border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">Indirizzo Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="mt-2 w-full rounded-md border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">Importo del Contributo (€)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Es. 50" className="mt-2 w-full rounded-md border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
              </div>

              <button type="submit" disabled={isPending} className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-primary-foreground hover:shadow-glow disabled:opacity-60">
                {isPending ? "Invio..." : "Richiedi Dati per Donazione"}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
