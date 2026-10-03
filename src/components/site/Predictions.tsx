import { useState } from "react";

// IL TUO CALENDARIO
const PARTITE = [
  { date: "10 OTT", time: "21:00", competition: "Campionato · G3", home: "Gaston Villa ", away: "Forza PCI", venue: "Gaston Villa Park" },
  { date: "17 OTT", time: "15:00", competition: "Campionato · G4", home: "Gaston Villa ", away: "Aura Jacquet", venue: "Gaston Villa Park" },
  { date: "24 OTT", time: "20:45", competition: "Campionato · G5", home: "Como Stai", away: "Gaston Villa ", venue: "Gaston Villa Park" },
  { date: "27 OTT", time: "20:45", competition: "Campionato · G6", home: "Deportivo Aperitivo", away: "Gaston Villa ", venue: "Gaston Villa Park" },
  { date: "31 OTT", time: "20:45", competition: "Campionato · G7", home: "Urbe Eterna", away: "Gaston Villa ", venue: "Gaston Villa Park" },
  { date: "07 NOV", time: "20:45", competition: "Campionato · G8", home: "Team Crack", away: "Gaston Villa ", venue: "Gaston Villa Park" },
  { date: "21 NOV", time: "20:45", competition: "Campionato · G9", home: "BORUSSIA PORCMUND", away: "Gaston Villa ", venue: "Gaston Villa Park" },
  { date: "28 NOV", time: "20:45", competition: "Campionato · G10", home: "BORUSSIA PORCMUND", away: "Gaston Villa ", venue: "Gaston Villa Park" },
  { date: "05 DIC", time: "20:45", competition: "Campionato · G11", home: "Team Crack", away: "Gaston Villa ", venue: "Gaston Villa Park" },
  { date: "12 DIC", time: "20:45", competition: "Campionato · G12", home: "Urbe Eterna", away: "Gaston Villa ", venue: "Gaston Villa Park" },
  { date: "19 DIC", time: "20:45", competition: "Campionato · G13", home: "Deportivo Aperitivo", away: "Gaston Villa ", venue: "Gaston Villa Park" },
  { date: "26 DIC", time: "20:45", competition: "Campionato · G14", home: "Como Stai", away: "Gaston Villa ", venue: "Gaston Villa Park" },
  { date: "02 GEN", time: "15:00", competition: "Campionato · G15", home: "Gaston Villa ", away: "Aura Jacquet", venue: "Gaston Villa PArk" },
  { date: "09 GEN", time: "20:45", competition: "Campionato · G16", home: "Forza PCI", away: "Gaston Villa ", venue: "Gaston Villa Park" },
  { date: "16 GEN", time: "20:45", competition: "Campionato · G17", home: "Tottingham Forest", away: "Gaston Villa ", venue: "Gaston Villa Park" },
  { date: "23 GEN", time: "20:45", competition: "Campionato · G18", home: "KUNG FU PANDEV", away: "Gaston Villa ", venue: "Gaston Villa Park" },
];

const MESI: any = { GEN: 0, FEB: 1, MAR: 2, APR: 3, MAG: 4, GIU: 5, LUG: 6, AGO: 7, SET: 8, OTT: 9, NOV: 10, DIC: 11 };

function parseData(str: string) {
  const [giorno, meseStr] = str.split(" ");
  const mese = MESI[meseStr.toUpperCase()];
  const anno = mese >= 8? 2025 : 2026;
  return new Date(anno, mese, parseInt(giorno));
}

export function Pronostico() {
  const [indexSelezionato, setIndexSelezionato] = useState<number>(() => {
    const oggi = new Date();
    const idx = PARTITE.findIndex(p => parseData(p.date) >= oggi);
    return idx >= 0? idx : 0;
  });

  const match = PARTITE[indexSelezionato];
  const avversario = match.home.trim() === "Gaston Villa"? match.away.trim() : match.home.trim();

  return (
    <section className="py-16 bg-[#080600] border-t border-white/10">
      <div className="mx-auto max-w-5xl px-5">
        <h2 className="text-3xl font-black text-white">Pronostico Giornata</h2>
        <p className="text-white/50 text-sm mt-1">{match.competition} - {match.date} ore {match.time}</p>

        <div className="mt-8 grid grid-cols-12 gap-4">
          <select
            value={indexSelezionato}
            onChange={e => setIndexSelezionato(parseInt(e.target.value))}
            className="col-span-12 bg-black border border-white/20 rounded-full px-4 py-3 text-white text-sm"
          >
            {PARTITE.map((p, i) => (
              <option key={i} value={i}>{p.date} - {p.home.trim()} vs {p.away.trim()}</option>
            ))}
          </select>

          <div className="col-span-12 mt-4 grid grid-cols-3 items-center bg-white/[0.03] border border-white/10 rounded- p-8">
            <div className="text-center">
              <div className="text-white font-black text-xl">GASTON VILLA</div>
              <div className="text- tracking-widest text-[#d6b45a] mt-1">FISSA</div>
            </div>
            <div className="text-center">
              <div className="text-white/20 text-2xl font-black">VS</div>
              <div className="text- text-white/40 mt-2">{match.venue}</div>
            </div>
            <div className="text-center">
              <div className="text-white font-black text-xl">{avversario.toUpperCase()}</div>
              <div className="text- tracking-widest text-white/40 mt-1">DA CALENDARIO</div>
            </div>
          </div>

          <div className="col-span-12 text-center mt-2 text- text-white/30">
            L'avversario cambia automaticamente in base alla giornata selezionata. Gaston Villa resta sempre.
          </div>
        </div>
      </div>
    </section>
  );
}

// FIX PER IL BUILD: esporta anche con il nome che usa index.tsx
export const Predictions = Pronostico;
