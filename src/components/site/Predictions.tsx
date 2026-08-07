import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Vote } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { nextMatch } from "./next-match";

type Pick = "1" | "X" | "2";

type Data = {
  counts: Record<Pick, number>;
  total: number;
  recent: { voter_name: string; pick: string }[];
};

const options: { key: Pick; label: string; caption: string }[] = [
  { key: "1", label: "1", caption: nextMatch.home },
  { key: "X", label: "X", caption: "Pareggio" },
  { key: "2", label: "2", caption: nextMatch.away },
];

async function fetchPredictions(): Promise<Data> {
  const res = await fetch("/api/predictions");
  if (!res.ok) throw new Error("Impossibile caricare i pronostici");
  return (await res.json()) as Data;
}

export function Predictions() {
  const queryClient = useQueryClient();
  const [pick, setPick] = useState<Pick | null>(null);
  const [voter, setVoter] = useState("");

  const { data } = useQuery({ queryKey: ["predictions"], queryFn: fetchPredictions });
  const counts = data?.counts ?? { "1": 0, X: 0, "2": 0 };
  const total = data?.total ?? 0;

  const submit = useMutation({
    mutationFn: async () => {
      if (!pick) throw new Error("Scegli 1, X o 2");
      if (voter.trim().length < 2) throw new Error("Inserisci il tuo nome");

      const res = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match_label: nextMatch.label, pick, voter_name: voter.trim() }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error ?? "Impossibile salvare il pronostico");
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["predictions"] });
      setVoter("");
      toast.success("Pronostico registrato. In bocca al lupo!");
    },
    onError: (error: Error) => toast.error(error.message),
  });

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
                const pct = total > 0 ? Math.round((counts[option.key] / total) * 100) : 0;
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
                      <span className="mt-4 w-full">
                        <span className="block h-1.5 overflow-hidden rounded-full bg-foreground/10">
                          <motion.span
                            className="block h-full rounded-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </span>
                        <span className="mt-2 block text-center text-xs text-muted-foreground">{pct}%</span>
                      </span>
                    </motion.button>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.16}>
              <form
                className="mt-8 flex flex-col gap-3 sm:flex-row"
                onSubmit={(event) => {
                  event.preventDefault();
                  submit.mutate();
                }}
              >
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
                  disabled={submit.isPending}
                  className="shrink-0 rounded-full bg-primary px-7 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {submit.isPending ? "Invio…" : "Invia pronostico"}
                </button>
              </form>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface/70">
              <div className="flex items-center gap-3 border-b border-border px-6 py-5">
                <Vote className="size-4 text-primary" aria-hidden />
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-foreground">
                  {total} pronostici raccolti
                </h3>
              </div>
              <ul className="divide-y divide-border/70">
                {(data?.recent ?? []).length === 0 ? (
                  <li className="px-6 py-8 text-sm text-muted-foreground">
                    Nessun pronostico ancora. Sii il primo.
                  </li>
                ) : (
                  data!.recent.map((row, i) => (
                    <li key={`${row.voter_name}-${i}`} className="flex items-center justify-between px-6 py-4">
                      <span className="truncate text-sm font-semibold text-foreground/85">
                        {row.voter_name}
                      </span>
                      <span className="display grid size-9 shrink-0 place-items-center rounded-full border border-primary/40 text-sm text-primary">
                        {row.pick}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
