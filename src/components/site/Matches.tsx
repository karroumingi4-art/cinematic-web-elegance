import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CalendarDays, MapPin, Trophy } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

type Fixture = {
  date: string;
  time: string;
  competition: string;
  home: string;
  away: string;
  venue: string;
  score?: string;
  result?: "V" | "N" | "P";
};

const fixtures: Fixture[] = [
  {
    date: "16 AGO",
    time: "20:45",
    competition: "Campionato · G1",
    home: "Ardente FC",
    away: "Verona Nord",
    venue: "Stadio delle Aurore",
  },
  {
    date: "23 AGO",
    time: "18:30",
    competition: "Campionato · G2",
    home: "Sestola 1912",
    away: "Ardente FC",
    venue: "Arena del Cimone",
  },
  {
    date: "27 AGO",
    time: "21:00",
    competition: "Coppa · Ottavi",
    home: "Ardente FC",
    away: "Lido Marittima",
    venue: "Stadio delle Aurore",
  },
  {
    date: "31 AGO",
    time: "15:00",
    competition: "Campionato · G3",
    home: "Ardente FC",
    away: "Aquile Brune",
    venue: "Stadio delle Aurore",
  },
  {
    date: "14 SET",
    time: "20:45",
    competition: "Campionato · G4",
    home: "Foschia Adriatica",
    away: "Ardente FC",
    venue: "Stadio del Faro",
  },
];

const results: Fixture[] = [
  {
    date: "02 AGO",
    time: "20:45",
    competition: "Amichevole",
    home: "Ardente FC",
    away: "Selva Alta",
    venue: "Stadio delle Aurore",
    score: "3 — 0",
    result: "V",
  },
  {
    date: "27 LUG",
    time: "19:00",
    competition: "Trofeo Estivo",
    home: "Ponente Calcio",
    away: "Ardente FC",
    venue: "Stadio Ponente",
    score: "1 — 2",
    result: "V",
  },
  {
    date: "20 LUG",
    time: "18:30",
    competition: "Amichevole",
    home: "Ardente FC",
    away: "Borgo Ferrata",
    venue: "Centro Sportivo Ardente",
    score: "1 — 1",
    result: "N",
  },
  {
    date: "12 LUG",
    time: "17:00",
    competition: "Amichevole",
    home: "Monti Chiari",
    away: "Ardente FC",
    venue: "Stadio Chiari",
    score: "2 — 1",
    result: "P",
  },
];

type Row = {
  pos: number;
  team: string;
  pg: number;
  v: number;
  n: number;
  p: number;
  gf: number;
  gs: number;
  pts: number;
};

const table: Row[] = [
  { pos: 1, team: "Ardente FC", pg: 12, v: 9, n: 2, p: 1, gf: 27, gs: 9, pts: 29 },
  { pos: 2, team: "Verona Nord", pg: 12, v: 8, n: 3, p: 1, gf: 24, gs: 11, pts: 27 },
  { pos: 3, team: "Aquile Brune", pg: 12, v: 7, n: 3, p: 2, gf: 21, gs: 13, pts: 24 },
  { pos: 4, team: "Foschia Adriatica", pg: 12, v: 6, n: 4, p: 2, gf: 19, gs: 12, pts: 22 },
  { pos: 5, team: "Sestola 1912", pg: 12, v: 5, n: 4, p: 3, gf: 17, gs: 15, pts: 19 },
  { pos: 6, team: "Lido Marittima", pg: 12, v: 4, n: 4, p: 4, gf: 15, gs: 16, pts: 16 },
  { pos: 7, team: "Ponente Calcio", pg: 12, v: 3, n: 4, p: 5, gf: 13, gs: 18, pts: 13 },
  { pos: 8, team: "Borgo Ferrata", pg: 12, v: 2, n: 3, p: 7, gf: 11, gs: 22, pts: 9 },
  { pos: 9, team: "Monti Chiari", pg: 12, v: 2, n: 2, p: 8, gf: 10, gs: 24, pts: 8 },
  { pos: 10, team: "Selva Alta", pg: 12, v: 1, n: 3, p: 8, gf: 8, gs: 25, pts: 6 },
];

const resultTone: Record<NonNullable<Fixture["result"]>, string> = {
  V: "border-primary/50 text-primary",
  N: "border-border text-muted-foreground",
  P: "border-destructive/40 text-destructive",
};

function FixtureCard({ match, i }: { match: Fixture; i: number }) {
  const isHome = match.home === "Ardente FC";

  return (
    <Reveal delay={0.06 * i}>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="group grid gap-6 rounded-2xl border border-border bg-surface/70 p-6 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:p-7"
      >
        <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-1">
          <span className="display text-2xl leading-none text-foreground">{match.date}</span>
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {match.score ? "FT" : match.time}
          </span>
        </div>

        <div className="min-w-0">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-primary">
            {match.competition}
          </p>
          <p className="display mt-2 truncate text-xl sm:text-2xl">
            <span className={isHome ? "text-foreground" : "text-foreground/60"}>{match.home}</span>
            <span className="mx-3 text-primary">{match.score ?? "vs"}</span>
            <span className={!isHome ? "text-foreground" : "text-foreground/60"}>{match.away}</span>
          </p>
          <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0 text-primary/70" aria-hidden />
            <span className="truncate">{match.venue}</span>
          </p>
        </div>

        {match.result ? (
          <span
            className={`grid size-11 place-items-center rounded-full border text-sm font-bold ${resultTone[match.result]}`}
            aria-label={`Risultato: ${match.result}`}
          >
            {match.result}
          </span>
        ) : (
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-primary/60 px-5 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Biglietti
          </a>
        )}
      </motion.article>
    </Reveal>
  );
}

export function Matches() {
  const [tab, setTab] = useState<"fixtures" | "results">("fixtures");
  const list = tab === "fixtures" ? fixtures : results;

  return (
    <section id="matches" className="relative bg-background py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Stagione 2026 / 2027"
          title={
            <>
              Calendario e <span className="text-primary">Classifica</span>
            </>
          }
          intro="Ogni novanta minuti è un capitolo. Segui il cammino della prima squadra, gara per gara, punto per punto."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <div
                role="tablist"
                aria-label="Calendario"
                className="inline-flex rounded-full border border-border bg-surface/60 p-1"
              >
                {(
                  [
                    ["fixtures", "Prossime gare"],
                    ["results", "Risultati"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={tab === key}
                    onClick={() => setTab(key)}
                    className={`rounded-full px-5 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] transition-colors ${
                      tab === key
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-col gap-4"
              >
                {list.map((match, i) => (
                  <FixtureCard key={`${match.date}-${match.away}`} match={match} i={i} />
                ))}
              </motion.div>
            </AnimatePresence>

            <Reveal delay={0.1}>
              <a
                href="#contact"
                className="link-underline mt-8 inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-primary"
              >
                <CalendarDays className="size-4" aria-hidden /> Calendario completo
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface/70">
              <div className="flex items-center gap-3 border-b border-border px-6 py-5">
                <Trophy className="size-4 text-primary" aria-hidden />
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-foreground">
                  Classifica · Campionato
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[30rem] text-sm">
                  <caption className="sr-only">Classifica del campionato 2026/2027</caption>
                  <thead>
                    <tr className="text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                      <th scope="col" className="px-4 py-3 text-left font-semibold">
                        #
                      </th>
                      <th scope="col" className="py-3 text-left font-semibold">
                        Squadra
                      </th>
                      <th scope="col" className="px-2 py-3 text-center font-semibold">
                        PG
                      </th>
                      <th scope="col" className="px-2 py-3 text-center font-semibold">
                        V
                      </th>
                      <th scope="col" className="px-2 py-3 text-center font-semibold">
                        N
                      </th>
                      <th scope="col" className="px-2 py-3 text-center font-semibold">
                        P
                      </th>
                      <th scope="col" className="px-2 py-3 text-center font-semibold">
                        DR
                      </th>
                      <th scope="col" className="px-4 py-3 text-center font-semibold">
                        PT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.map((row) => {
                      const own = row.team === "Ardente FC";
                      return (
                        <tr
                          key={row.team}
                          className={`border-t border-border/70 transition-colors ${
                            own ? "bg-primary/10" : "hover:bg-foreground/5"
                          }`}
                        >
                          <td className="px-4 py-3">
                            <span
                              className={`display text-base ${own ? "text-primary" : "text-muted-foreground"}`}
                            >
                              {row.pos}
                            </span>
                          </td>
                          <td
                            className={`py-3 pr-2 font-semibold ${own ? "text-primary" : "text-foreground/85"}`}
                          >
                            {row.team}
                          </td>
                          <td className="px-2 py-3 text-center text-muted-foreground">{row.pg}</td>
                          <td className="px-2 py-3 text-center text-muted-foreground">{row.v}</td>
                          <td className="px-2 py-3 text-center text-muted-foreground">{row.n}</td>
                          <td className="px-2 py-3 text-center text-muted-foreground">{row.p}</td>
                          <td className="px-2 py-3 text-center text-muted-foreground">
                            {row.gf - row.gs > 0 ? `+${row.gf - row.gs}` : row.gf - row.gs}
                          </td>
                          <td
                            className={`px-4 py-3 text-center font-bold ${own ? "text-primary" : "text-foreground"}`}
                          >
                            {row.pts}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="border-t border-border px-6 py-4 text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                Aggiornata dopo la 12ª giornata
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
