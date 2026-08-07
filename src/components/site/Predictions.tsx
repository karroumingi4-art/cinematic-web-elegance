import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Vote } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { nextMatch } from "./next-match";

type Pick = "1" | "X" | "2";

const options: { key: Pick; label: string; caption: string }[] = [
  { key: "1", label: "1", caption: nextMatch.home },
  { key: "X", label: "X", caption: "Pareggio" },
  { key: "2", label: "2", caption: nextMatch.away },
];

export function Predictions() {
  const [pick, setPick] = useState<Pick | null>(null);
  const [voter, setVoter] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!pick) {
      toast.error("Scegli 1, X o 2 prima di inviare!");
      return;
    }
    if (voter.trim().length < 2) {
      toast.error("Inserisci il tuo nome");
      return;
    }

    setIsPending(true);

    // Prepariamo i dati da spedire a Formspree
    const formData = new FormData();
    formData.append("Partita", `${nextMatch.home} vs ${nextMatch.away}`);
    formData.append("Competizione", nextMatch.competition);
    formData.append("Nome Tifoso", voter.trim());
    formData.append("Segno Pronosticato", pick);

    try {
      const res = await fetch("https://formspree.io", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        toast.success("Pronostico inviato con successo! In bocca al lupo!");
        setVoter("");
        setPick(null);
      } else {
        throw new Error("Errore durante l'invio del modulo");
      }
    } catch (error) {
      toast.error("Impossibile salvare il pronostico. Riprova più tardi.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section id="predictions" className="relative bg-surface/30 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={`Pronostici · ${nextMatch.competition}`}
          title={
            <>
              1 · X · <span className="text-primary">2</span>
            </>
          }
          intro={`Chi indovina il risultato di ${nextMatch.home} — ${nextMatch.away}? Vota prima del fischio d'inizio e confronta il tuo pronostico con quello degli altri.`}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {options.map((option, i) => {
                const active = pick === option.key;
                return (
                  <Reveal key={option.key} delay={0.08 * i}>
                    <motion.button
                      type="button"
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => setPick(option.key)}
                      aria-pressed={active}
                      className={`flex h-full w-full flex-col items-center rounded-2xl border px-4 py-7 transition-colors ${
                        active
                          ? "border-primary bg-primary/10"
                          : "border-border bg-surface/70 hover:border-primary/40"
                      }`}
                    >
                      <span className="display text-5xl leading-none text-primary">{option.label}</span>
                      <span className="mt-4 text-center text-[0.62rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        {option.caption}
                      </span>
                    </motion.button>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.16}>
              <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="prediction-voter">
                  Il tuo nome
                </label>
                <input
                  id="prediction-voter"
                  name="voter"
                  value={voter}
                  maxLength={60}
                  onChange={(event) => setVoter(event.target.value)}
                  placeholder="Il tuo nome"
                  className="w-full rounded-md border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-300 focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="shrink-0 rounded-full bg-primary px-7 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {isPending ? "Invio…" : "Invia pronostico"}
                </button>
              </form>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface/70">
              <div className="flex items-center gap-3 border-b border-border px-6 py-5">
                <Vote className="size-4 text-primary" aria-hidden />
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-foreground">
                  Info Pronostico
                </h3>
              </div>
              <div className="px-6 py-8 text-sm text-muted-foreground">
                <p>I voti inviati tramite questo modulo vengono raccolti ed elaborati dalla dirigenza del Gaston Villa.</p>
                <p className="mt-2 text-xs text-primary">Seleziona 1, X o 2 qui a sinistra, scrivi il tuo nome e clicca su Invia!</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

