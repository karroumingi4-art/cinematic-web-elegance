import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CalendarDays, MapPin, Trophy } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";


export type Fixture = {
  date: string;
  time: string;
  competition: string;
  home: string;
  away: string;
  venue: string;
  homePts?: number;
  awayPts?: number;
  score?: string;
  result?: "V" | "N" | "P";
};


// TUTTE LE GIORNATE - DA G3 A G35
export const fixtures: Fixture[] = [
  { date: "10 OTT", time: "21:00", competition: "Campionato · G3", home: "Gaston Villa", away: "Forza PCI", venue: "Gaston Villa Park" },
  { date: "17 OTT", time: "15:00", competition: "Campionato · G4", home: "Gaston Villa", away: "Aura Jacquet", venue: "Gaston Villa Park" },
  { date: "24 OTT", time: "20:45", competition: "Campionato · G5", home: "Como Stai", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "27 OTT", time: "20:45", competition: "Campionato · G6", home: "Deportivo Aperitivo", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "31 OTT", time: "20:45", competition: "Campionato · G7", home: "Urbe Eterna", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "07 NOV", time: "20:45", competition: "Campionato · G8", home: "Team Crack", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "21 NOV", time: "20:45", competition: "Campionato · G9", home: "BORUSSIA PORCMUND", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "28 NOV", time: "20:45", competition: "Campionato · G10", home: "BORUSSIA PORCMUND", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "05 DIC", time: "20:45", competition: "Campionato · G11", home: "Team Crack", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "12 DIC", time: "20:45", competition: "Campionato · G12", home: "Urbe Eterna", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "19 DIC", time: "20:45", competition: "Campionato · G13", home: "Deportivo Aperitivo", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "26 DIC", time: "20:45", competition: "Campionato · G14", home: "Como Stai", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "02 GEN", time: "15:00", competition: "Campionato · G15", home: "Gaston Villa", away: "Aura Jacquet", venue: "Gaston Villa Park" },
  { date: "09 GEN", time: "20:45", competition: "Campionato · G16", home: "Forza PCI", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "16 GEN", time: "20:45", competition: "Campionato · G17", home: "Tottingham Forest", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "23 GEN", time: "20:45", competition: "Campionato · G18", home: "KUNG FU PANDEV", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "30 GEN", time: "20:45", competition: "Campionato · G19", home: "KUNG FU PANDEV", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "06 FEB", time: "20:45", competition: "Campionato · G20", home: "Tottingham Forest", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "13 FEB", time: "20:45", competition: "Campionato · G21", home: "Forza PCI", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "20 FEB", time: "20:45", competition: "Campionato · G22", home: "Aura Jacquet", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "27 FEB", time: "20:45", competition: "Campionato · G23", home: "Como Stai", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "06 MAR", time: "20:45", competition: "Campionato · G24", home: "Deportivo Aperitivo", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "13 MAR", time: "20:45", competition: "Campionato · G25", home: "Urbe Eterna", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "20 MAR", time: "20:45", competition: "Campionato · G26", home: "Team Crack", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "03 APR", time: "20:45", competition: "Campionato · G27", home: "BORUSSIA PORCMUND", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "10 APR", time: "20:45", competition: "Campionato · G28", home: "BORUSSIA PORCMUND", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "17 APR", time: "20:45", competition: "Campionato · G29", home: "Team Crack", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "24 APR", time: "20:45", competition: "Campionato · G30", home: "Urbe Eterna", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "01 MAG", time: "20:45", competition: "Campionato · G31", home: "Deportivo Aperitivo", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "04 MAG", time: "20:45", competition: "Campionato · G32", home: "Como Stai", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "08 MAG", time: "20:45", competition: "Campionato · G33", home: "Aura Jacquet", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "15 MAG", time: "20:45", competition: "Campionato · G34", home: "Forza PCI", away: "Gaston Villa", venue: "Gaston Villa Park" },
  { date: "22 MAG", time: "20:45", competition: "Campionato · G35", home: "Tottingham Forest", away: "Gaston Villa", venue: "Gaston Villa Park" },
];


function puntiToGol(punti: number): number {
  if (punti < 66) return 0;
  return Math.floor((punti - 66) / 4) + 1;
}


export const results: Fixture[] = [
  { date: "11 SET", time: "18:30", competition: "Campionato · G1", home: "Gaston Villa", away: "KUNG FU PANDEV", venue: "Gaston Villa Park", homePts: 65, awayPts: 71 },
  { date: "18 SET", time: "18:30", competition: "Campionato · G2", home: "Tottingham Forest", away: "Gaston Villa", venue: "Gaston Villa Park", homePts: 64, awayPts: 69 },
];


const BASE_TABLE: Record<string, { pg: number; v: number; n: number; p: number; gf: number; gs: number; pts: number; tot: number; avg: number }> = {
  "Deportivo Aperitivo": { pg: 2, v: 2, n: 0, p: 0, gf: 6, gs: 1, pts: 6, tot: 149, avg: 74.5 },
  "KUNG FU PANDEV": { pg: 2, v: 2, n: 0, p: 0, gf: 5, gs: 1, pts: 6, tot: 147.5, avg: 73.8 },
  "young girls": { pg: 2, v: 1, n: 0, p: 1, gf: 7, gs: 2, pts: 3, tot: 156.5, avg: 78.3 },
  "Urbe Eterna": { pg: 2, v: 1, n: 0, p: 1, gf: 5, gs: 4, pts: 3, tot: 149.5, avg: 74.8 },
  "Aura Jacquet": { pg: 2, v: 1, n: 0, p: 1, gf: 5, gs: 6, pts: 3, tot: 147, avg: 73.5 },
  "Gaston Villa": { pg: 2, v: 1, n: 0, p: 1, gf: 2, gs: 3, pts: 3, tot: 137.5, avg: 68.8 },
  "forza PCI": { pg: 2, v: 1, n: 0, p: 1, gf: 2, gs: 3, pts: 3, tot: 135, avg: 67.5 },
  "BLUELOCK": { pg: 2, v: 1, n: 0, p: 1, gf: 3, gs: 1, pts: 3, tot: 75.5, avg: 37.8 },
  "BORUSSIA PORCMUND": { pg: 2, v: 0, n: 0, p: 2, gf: 2, gs: 9, pts: 0, tot: 135.5, avg: 67.8 },
  "Como stai": { pg: 2, v: 0, n: 0, p: 2, gf: 0, gs: 7, pts: 0, tot: 123.5, avg: 61.8 },
};


function FixtureCard({ match, i }: { match: any; i: number }) {
  const isHome = match.home.trim() === "Gaston Villa";
  return (
    <Reveal delay={0.06 * i}>
      <motion.article whileHover={{ y: -6 }} className="group grid gap-6 rounded-2xl border border-border bg-surface/70 p-6 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:p-7">
        <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-1">
          <span className="display text-2xl leading-none text-foreground">{match.date}</span>
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{match.score? "FT" : match.time}</span>
        </div>
        <div className="min-w-0">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-primary">{match.competition}</p>
          <p className="display mt-2 truncate text-xl sm:text-2xl">
            <span className={isHome? "text-foreground" : "text-foreground/60"}>{match.home} {match.homePts? `(${match.homePts})` : ""}</span>
            <span className="mx-3 text-primary">{match.score?? "vs"}</span>
            <span className={!isHome? "text-foreground" : "text-foreground/60"}>{match.away} {match.awayPts? `(${match.awayPts})` : ""}</span>
          </p>
          <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="size-3.5 shrink-0 text-primary/70" />{match.venue}</p>
        </div>
        {match.result && <span className={`grid size-11 place-items-center rounded-full border text-sm font-bold ${match.result==="V"?"border-primary/50 text-primary":match.result==="P"?"border-destructive/40 text-destructive":"border-border"}`}>{match.result}</span>}
      </motion.article>
    </Reveal>
  );
}


const INITIAL_VISIBLE = 4;


export function Matches() {
  const [tab, setTab] = useState<"fixtures" | "results">("fixtures");
  const [expanded, setExpanded] = useState(false);


  const enrichedResults = useMemo(() => {
    return results.map(m => {
      if (m.homePts == null || m.awayPts == null) return m;
      const homeGol = puntiToGol(m.homePts);
      const awayGol = puntiToGol(m.awayPts);
      const isGastonHome = m.home.trim() === "Gaston Villa";
      const gastonGol = isGastonHome? homeGol : awayGol;
      const avversarioGol = isGastonHome? awayGol : homeGol;
      let res: "V"|"N"|"P" = "N";
      if (gastonGol > avversarioGol) res = "V";
      else if (gastonGol < avversarioGol) res = "P";
      return {...m, score: `${homeGol} - ${awayGol}`, result: res, _homeGol: homeGol, _awayGol: awayGol };
    });
  }, []);


  const table = useMemo(() => {
    const stats = JSON.parse(JSON.stringify(BASE_TABLE)) as typeof BASE_TABLE;
    const extra = enrichedResults.filter((r: any) =>!r.competition.includes("G1") &&!r.competition.includes("G2"));
    extra.forEach((m: any)=>{
      const home=m.home.trim(), away=m.away.trim();
      if(!stats[home]) stats[home]={pg:0,v:0,n:0,p:0,gf:0,gs:0,pts:0,tot:0,avg:0};
      if(!stats[away]) stats[away]={pg:0,v:0,n:0,p:0,gf:0,gs:0,pts:0,tot:0,avg:0};
      stats[home].pg++; stats[away].pg++;
      stats[home].gf+=m._homeGol; stats[home].gs+=m._awayGol;
      stats[away].gf+=m._awayGol; stats[away].gs+=m._homeGol;
      stats[home].tot+=m.homePts; stats[away].tot+=m.awayPts;
      if(m._homeGol>m._awayGol){ stats[home].v++; stats[home].pts+=3; stats[away].p++; }
      else if(m._homeGol<m._awayGol){ stats[away].v++; stats[away].pts+=3; stats[home].p++; }
      else { stats[home].n++; stats[away].n++; stats[home].pts++; stats[away].pts++; }
    });
    Object.values(stats).forEach((s: any) => { if(s.pg>0) s.avg = Math.round((s.tot / s.pg)*10)/10; });
    return Object.entries(stats).map(([team,s]: any)=>({team,...s})).sort((x:any,y:any)=> y.pts!==x.pts? y.pts-x.pts : y.tot-x.tot).map((r:any,i)=>({pos:i+1,...r}));
  }, [enrichedResults]);


  const list = tab==="fixtures"? fixtures : enrichedResults;
  const visible = expanded? list : list.slice(0, INITIAL_VISIBLE);


  return (
    <section id="matches" className="relative bg-background py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Stagione 2026 / 2027" title={<>Calendario e <span className="text-primary">Classifica</span></>} intro="Tutte le 35 giornate. Metti i punti fantacalcio e i gol si calcolano da soli: 66=1 gol, 70=2, 74=3..." />
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <Reveal><div className="inline-flex rounded-full border border-border bg-surface/60 p-1">
              <button onClick={()=>{setTab("fixtures"); setExpanded(false)}} className={`rounded-full px-5 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] ${tab==="fixtures"?"bg-primary text-primary-foreground":"text-muted-foreground"}`}>Prossime gare ({fixtures.length})</button>
              <button onClick={()=>{setTab("results"); setExpanded(false)}} className={`rounded-full px-5 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] ${tab==="results"?"bg-primary text-primary-foreground":"text-muted-foreground"}`}>Risultati ({enrichedResults.length})</button>
            </div></Reveal>
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="mt-8 flex flex-col gap-4">
                {visible.map((match:any,i)=><FixtureCard key={`${match.competition}-${match.date}-${i}`} match={match} i={i} />)}
              </motion.div>
            </AnimatePresence>
            {list.length>INITIAL_VISIBLE&&<button onClick={()=>setExpanded(v=>!v)} className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/60 px-6 py-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-primary-foreground"><CalendarDays className="size-4"/>{expanded?"Mostra meno":`Vedi tutte (${list.length-INITIAL_VISIBLE} in più)`}</button>}
          </div>
          <Reveal delay={0.0}>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface/70">
              <div className="flex items-center gap-3 border-b border-border px-6 py-5"><Trophy className="size-4 text-primary"/><h3 className="text-[0.7rem] font-bold uppercase tracking-[0.22em]">Classifica · Campionato</h3></div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[42rem] text-sm">
                  <thead><tr className="text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground"><th className="px-4 py-3 text-left">#</th><th className="py-3 text-left">Squadra</th><th className="px-2 py-3 text-center">PG</th><th className="px-2 py-3 text-center">PT</th><th className="px-2 py-3 text-center">TOT</th><th className="px-2 py-3 text-center">MEDIA</th><th className="px-2 py-3 text-center">GF</th><th className="px-2 py-3 text-center">GS</th></tr></thead>
                  <tbody>{table.map((row:any)=>{const own=row.team==="Gaston Villa"; return <tr key={row.team} className={`border-t border-border/70 ${own?"bg-primary/10":""}`}><td className="px-4 py-3">{row.pos}</td><td className={`py-3 font-semibold ${own?"text-primary":""}`}>{row.team}</td><td className="px-2 py-3 text-center text-muted-foreground">{row.pg}</td><td className={`px-2 py-3 text-center font-bold ${own?"text-primary":""}`}>{row.pts}</td><td className="px-2 py-3 text-center text-muted-foreground">{row.tot}</td><td className="px-2 py-3 text-center text-muted-foreground">{row.avg}</td><td className="px-2 py-3 text-center text-muted-foreground">{row.gf}</td><td className="px-2 py-3 text-center text-muted-foreground">{row.gs}</td></tr>})}</tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
