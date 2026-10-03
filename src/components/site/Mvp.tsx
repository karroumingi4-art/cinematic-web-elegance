import { useState, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Trophy, Star, Clock } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { players } from "./squad-data";
import { lastMatch } from "./next-match";

type Tally = { player_number: string; player_name: string; votes: number };

export function Mvp() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<string | null>(null);
  const [voter, setVoter] = useState("");

  const { data } = useQuery({
    queryKey: ["mvp", lastMatch.label],
    queryFn: async () => {
      const res = await fetch(`/api/mvp?label=${encodeURIComponent(lastMatch.label)}`);
      return (await res.json()) as { tallies: Tally[]; total: number };
    },
    refetchInterval: 30000,
  });

  const tallies = data?.tallies?? [];
  const total = data?.total?? 0;
  const leader = tallies[0];

  const isFridayReveal = useMemo(() => {
    const now = new Date();
    // Venerdì dalle 20 in poi svela il vincitore
    return now.getDay() === 5 && now.getHours() >= 20;
    // per provare subito metti: return true;
  }, []);

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
      if (!res.ok) throw new Error("Errore voto");
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["mvp"] });
      setVoter("");
      toast.success("Voto registrato!");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <section id="mvp" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={`Pagelle · ${lastMatch.label} ${lastMatch.score}`}
          title={<>Migliore in <span className="text-primary">Campo</span></>}
          intro={isFridayReveal? "Votazioni chiuse. Ecco chi ha vinto." : "Vota il tuo MVP. Il vincitore venerdì alle 20:00."}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal>
              <p className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                <Clock className="size-3.5" /> {isFridayReveal? "Chiuso" : `${total.toLocaleString()} voti`}
              </p>
            </Reveal>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {players.map((p, i) => (
                <Reveal key={p.number} delay={0.05 * i}>
                  <motion.button
                    disabled={isFridayReveal}
                    onClick={() => setSelected(p.number)}
                    whileHover={{ y: isFridayReveal? 0 : -4 }}
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left ${selected === p.number? "border-primary bg-primary/10" : "border-border bg-surface/70"}`}
                  >
                    <span className="grid size-11 place-items-center rounded-full border border-primary/40 text-primary">{p.number}</span>
                    <span><span className="block text-sm font-semibold">{p.name}</span><span className="text-[0.62rem] uppercase text-muted-foreground">{p.position}</span></span>
                  </motion.button>
                </Reveal>
              ))}
            </div>

            {!isFridayReveal && (
              <form className="mt-8 flex gap-3" onSubmit={(e) => { e.preventDefault(); vote.mutate(); }}>
                <input value={voter} onChange={(e) => setVoter(e.target.value)} placeholder="Il tuo nome" className="w-full rounded-md border border-input bg-surface px-4 py-3 text-sm" />
                <button type="submit" className="rounded-full bg-primary px-7 py-3 text-[0.7rem] font-bold uppercase text-primary-foreground">Vota MVP</button>
              </form>
            )}
          </div>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-border bg-surface/70">
              <div className="flex items-center gap-3 border-b border-border px-6 py-5"><Trophy className="size-4 text-primary" /><h3 className="text-[0.7rem] font-bold uppercase tracking-[0.22em]">{isFridayReveal? "Vincitore" : "Risultato in arrivo"}</h3></div>
              {isFridayReveal && leader? (
                <div className="px-6 py-12 text-center">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-primary">Migliore in campo</p>
                  <p className="display mt-4 flex justify-center gap-3 text-4xl"><Star className="size-6 text-primary" />{leader.player_name}</p>
                  <p className="mt-3 text-sm text-muted-foreground">Ha vinto con {leader.votes.toLocaleString()} voti</p>
                </div>
              ) : (
                <div className="px-6 py-12 text-center">
                  <Clock className="mx-auto size-8 text-muted-foreground" />
                  <p className="mt-6 text-sm font-semibold">Votazioni fino a venerdì 20:00</p>
                  <p className="mt-2 text-xs text-muted-foreground">{total.toLocaleString()} persone hanno votato. Classifica nascosta fino a venerdì.</p>
                  <div className="mt-6 h-2 w-full rounded-full bg-border"><motion.div className="h-full bg-primary" animate={{ width: `${Math.min(100, (total / 10000) * 100)}%` }} /></div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
