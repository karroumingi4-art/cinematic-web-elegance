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
    date: "11 SET",
    time: "18:30",
    competition: "Campionato · G1",
    home: "Gaston Villa",
    away: "KUNG FU PANDEV",
    venue: "Gaston Villa Park",
  },
  {
    date: "18 SEP",
    time: "18:30",
    competition: "Campionato · G2",
    home: "Tottingham Forest",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },
  {
    date: "10 OTT",
    time: "21:00",
    competition: "Campionato · G3",
    home: "Gaston Villa ",
    away: "Forza PCI",
    venue: "Gaston Villa Park",
  },
  {
    date: "17 OTT",
    time: "15:00",
    competition: "Campionato · G4",
    home: "Gaston Villa ",
    away: "Aura Jacquet",
    venue: "Gaston Villa Park",
  },
  {
    date: "24 OTT",
    time: "20:45",
    competition: "Campionato · G5",
    home: "Como Stai",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },
  {
    date: "27 OTT",
    time: "20:45",
    competition: "Campionato · G6",
    home: "Deportivo Aperitivo",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },
  {
    date: "31 OTT",
    time: "20:45",
    competition: "Campionato · G7",
    home: "Urbe Eterna",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },
  {
    date: "07 NOV",
    time: "20:45",
    competition: "Campionato · G8",
    home: "Team Crack",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },
  {
    date: "21 NOV",
    time: "20:45",
    competition: "Campionato · G9",
    home: "BORUSSIA PORCMUND",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },
  {
    date: "28 NOV",
    time: "20:45",
    competition: "Campionato · G10",
    home: "BORUSSIA PORCMUND",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },
   {
    date: "05 DIC",
    time: "20:45",
    competition: "Campionato · G8",
    home: "Team Crack",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },
   {
    date: "12 DIC",
    time: "20:45",
    competition: "Campionato · G7",
    home: "Urbe Eterna",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },
 {
    date: "27 OTT",
    time: "20:45",
    competition: "Campionato · G6",
    home: "Deportivo Aperitivo",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },
  {
    date: "24 OTT",
    time: "20:45",
    competition: "Campionato · G5",
    home: "Como Stai",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },
   {
    date: "17 OTT",
    time: "15:00",
    competition: "Campionato · G4",
    home: "Gaston Villa ",
    away: "Aura Jacquet",
    venue: "Gaston Villa PArk",
  },

{
    date: "09 GEN",
    time: "20:45",
    competition: "Campionato · G16",
    home: "Forza PCI",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "16 GEN",
    time: "20:45",
    competition: "Campionato · G17",
    home: "Tottingham Forest",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "23 GEN",
    time: "20:45",
    competition: "Campionato · G18",
    home: "KUNG FU PANDEV",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "30 GEN",
    time: "20:45",
    competition: "Campionato · G19",
    home: "KUNG FU PANDEV",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "6 FEB",
    time: "20:45",
    competition: "Campionato · G20",
    home: "Tottingham Forest",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "13 FEB",
    time: "20:45",
    competition: "Campionato · G21",
    home: "Forza PCI",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "20 FEB",
    time: "20:45",
    competition: "Campionato · G22",
    home: "Aura Jacquet",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "27 FEB",
    time: "20:45",
    competition: "Campionato · G23",
    home: "Como Stai",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "6 MAR",
    time: "20:45",
    competition: "Campionato · G24",
    home: "Deportivo Aperitivo",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "13 MAR",
    time: "20:45",
    competition: "Campionato · G25",
    home: "Urbe Eterna",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "20 MAR",
    time: "20:45",
    competition: "Campionato · G26",
    home: "Team Crack",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "03 APR",
    time: "20:45",
    competition: "Campionato · G27",
    home: "BORUSSIA PORCMUND",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "10 APR",
    time: "20:45",
    competition: "Campionato · G28",
    home: "BORUSSIA PORCMUND",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "17 APR",
    time: "20:45",
    competition: "Campionato · G29",
    home: "Team Crack",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "24 APR",
    time: "20:45",
    competition: "Campionato · G30",
    home: "Urbe Eterna",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "1 MAG",
    time: "20:45",
    competition: "Campionato · G31",
    home: "Deportivo Aperitivo",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "24 OTT",
    time: "20:45",
    competition: "Campionato · G32",
    home: "Como Stai",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "8 MAG",
    time: "20:45",
    competition: "Campionato · G33",
    home: "Aura Jacquet",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "15 MAG",
    time: "20:45",
    competition: "Campionato · G34",
    home: "Forza PCI",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },{
    date: "22 MAG",
    time: "20:45",
    competition: "Campionato · G35",
    home: "Tottingham Forest",
    away: "Gaston Villa ",
    venue: "Gaston Villa Park",
  },
];
const results: Fixture[] = [
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
  { pos: 1, team: "Gaston Villa", pg: 0, v: 0, n: 0, p: 0, gf: 0, gs: 0, pts: 0 },
  { pos: 2, team: "Aura Jacquet", pg: 0, v: 0, n: 0, p: 0, gf: 0, gs: 0, pts: 0 },
  { pos: 3, team: "Urbe Eterna", pg: 0, v: 0, n: 0, p: 0, gf: 0, gs: 0, pts: 0 },
  { pos: 4, team: "Deportivo Aperitivo", pg: 0, v: 6, n: 0, p: 0, gf: 0, gs: 0, pts: 0 },
  { pos: 5, team: "Forza PCI", pg: 0, v: 0, n: 0, p: 0, gf: 0, gs: 0, pts: 0 },
  { pos: 6, team: "BORUSSIA PORCMUND", pg: 0, v: 0, n: 0, p: 0, gf: 0, gs: 0, pts: 0 },
  { pos: 7, team: "Team Crack", pg: 0, v: 0, n: 0, p: 0, gf: 0, gs: 0, pts: 0 },
  { pos: 8, team: "Tottingham Forest", pg: 0, v: 0, n: 0, p: 0, gf: 0, gs: 0, pts: 0 },
  { pos: 9, team: "KUNG FU PANDEV", pg: 0, v: 0, n: 0, p: 0, gf: 0, gs: 0, pts: 0 },
  { pos: 10, team: "Como Stai", pg: 0, v: 0, n: 0, p: 0, gf: 0, gs: 0, pts: 6 },
];

const resultTone: Record<NonNullable<Fixture["result"]>, string> = {
  V: "border-primary/50 text-primary",
  N: "border-border text-muted-foreground",
  P: "border-destructive/40 text-destructive",
};

function FixtureCard({ match, i }: { match: Fixture; i: number }) {
  const isHome = match.home === "Gaston Villa ";

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

const INITIAL_VISIBLE = 4;

export function Matches() {
  const [tab, setTab] = useState<"fixtures" | "results">("fixtures");
  const [expanded, setExpanded] = useState(false);
  const list = tab === "fixtures" ? fixtures : results;
  const visible = expanded ? list : list.slice(0, INITIAL_VISIBLE);

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

        <div className="mt-16 grid gap-0 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
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
                {visible.map((match, i) => (
                  <FixtureCard key={`${match.competition}-${match.date}-${i}`} match={match} i={i} />
                ))}
              </motion.div>
            </AnimatePresence>

            {list.length > INITIAL_VISIBLE ? (
              <Reveal delay={0.1}>
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/60 px-6 py-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <CalendarDays className="size-4" aria-hidden />
                  {expanded
                    ? "Mostra meno"
                    : `Vedi tutte le gare (${list.length - INITIAL_VISIBLE} in più)`}
                </button>
              </Reveal>
            ) : null}

          </div>

          <Reveal delay={0.0}>
            <div className="overflow-hidden rounded-0xl border border-border bg-surface/70">
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
                      const own = row.team === "Gaston Villa ";
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

              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
