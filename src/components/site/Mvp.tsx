import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Award, Star } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { players } from "./squad-data";
import { lastMatch } from "./next-match";

type Tally = { player_number: string; player_name: string; votes: number };

async function fetchMvp(): Promise<{ tallies: Tally[]; total: number }> {
  const res = await fetch("/api/mvp");
  if (!res.ok) throw new Error("Impossibile caricare le pagelle");
  return (await res.json()) as { tallies: Tally[]; total: number };
}

export function Mvp() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<string | null>(null);
  const [voter, setVoter] = useState("");

  const { data } = useQuery({ queryKey: ["mvp"], queryFn: fetchMvp });
  const tallies = data?.tallies ?? [];
  const total = data?.total ?? 0;
  const leader = tallies[0];

  const votesFor = (num: string) => tallies.find((t) => t.player_number === num)?.votes ?? 0;

  const vote = useMutation({
    mutationFn: async () => {
      const player = players.find((p) => p.number === selected);
      if (!player) throw new Error("Scegli un giocatore");
      if (voter.trim().length < 2) throw new Error("Inserisci il tuo nome");

      const res = await fetch("https://formspree.io/f/xdenkbko", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          match_label: lastMatch.label,
          player_number: player.number,
          player_name: player.name,
          voter_name: voter.trim(),
        }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error ?? "Impossibile salvare il voto");
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["mvp"] });
      setVoter("");
      toast.success("Voto registrato. Grazie!");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <section id="mvp" className="relative bg-background py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={`Pagelle · ${lastMatch.label} ${lastMatch.score}`}
          title={
            <>
              Il Migliore in <span className="text-primary">Campo</span>
            </>
          }
          intro="Dopo ogni partita la parola passa a voi: scegliete il vostro MVP e guardate la classifica aggiornarsi in diretta."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Scegli il tuo MVP · {lastMatch.date}
              </p>
            </Reveal>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {players.map((player, i) => {
                const active = selected === player.number;
                return (
                  <Reveal key={player.number} delay={0.05 * i}>
                    <motion.button
                      type="button"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => setSelected(player.number)}
                      aria-pressed={active}
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors ${
                        active
                          ? "border-primary bg-primary/10"
                          : "border-border bg-surface/70 hover:border-primary/40"
                      }`}
                    >
                      <span className="display grid size-11 shrink-0 place-items-center rounded-full border border-primary/40 text-base text-primary">
                        {player.number}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-foreground">
                          {player.name}
                        </span>
                        <span className="mt-0.5 block truncate text-[0.62rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                          {player.position}
                        </span>
                      </span>
                      <span className="ml-auto shrink-0 text-xs font-bold text-primary">
                        {votesFor(player.number)}
                      </span>
                    </motion.button>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.1}>
              <form
                className="mt-8 flex flex-col gap-3 sm:flex-row"
                onSubmit={(event) => {
                  event.preventDefault();
                  vote.mutate();
                }}
              >
                <label className="sr-only" htmlFor="mvp-voter">
                  Il tuo nome
                </label>
                <input
                  id="mvp-voter"
                  name="voter"
                  value={voter}
                  maxLength={60}
                  onChange={(event) => setVoter(event.target.value)}
                  placeholder="Il tuo nome"
                  className="w-full rounded-md border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-300 focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={vote.isPending}
                  className="shrink-0 rounded-full bg-primary px-7 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {vote.isPending ? "Invio…" : "Vota MVP"}
                </button>
              </form>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface/70">
              <div className="flex items-center gap-3 border-b border-border px-6 py-5">
                <Award className="size-4 text-primary" aria-hidden />
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-foreground">
                  Classifica voti · {total} voti
                </h3>
              </div>

              {leader ? (
                <div className="border-b border-border px-6 py-7">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-primary">
                    Migliore in campo
                  </p>
                  <p className="display mt-3 flex items-center gap-3 text-3xl">
                    <Star className="size-5 text-primary" aria-hidden />
                    {leader.player_name}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {leader.votes} {leader.votes === 1 ? "voto" : "voti"} ·{" "}
                    {total > 0 ? Math.round((leader.votes / total) * 100) : 0}%
                  </p>
                </div>
              ) : null}

              <ul className="divide-y divide-border/70">
                {tallies.length === 0 ? (
                  <li className="px-6 py-8 text-sm text-muted-foreground">
                    Nessun voto ancora. Apri le pagelle tu.
                  </li>
                ) : (
                  tallies.map((row) => {
                    const pct = total > 0 ? Math.round((row.votes / total) * 100) : 0;
                    return (
                      <li key={row.player_number} className="px-6 py-4">
                        <div className="flex items-center justify-between gap-4 text-sm">
                          <span className="truncate font-semibold text-foreground/85">
                            {row.player_name}
                          </span>
                          <span className="text-xs font-bold text-muted-foreground">
                            {row.votes} voti ({pct}%)
                          </span>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
