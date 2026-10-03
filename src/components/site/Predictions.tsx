import { useState, useMemo } from "react";
import { fixtures } from "./Matches";

const FORMSPREE_ID = "xovqknln";

function getFintiVoti(idx: number) {
  const seed = (idx * 37 + 13) % 100;
  let p1 = 55 + (seed % 25); // Gaston favorita
  let pX = 15 + ((seed * 2) % 15);
  let p2 = 100 - p1 - pX;
  const tot = 134 + idx * 7 + (seed % 23);
  return { p1, pX, p2, tot, c1: Math.round(tot*p1/100), cX: Math.round(tot*pX/100), c2: Math.round(tot*p2/100) };
}

export function Pronostico() {
  const [idx, setIdx] = useState(0);
  const [voto, setVoto] = useState<string|null>(null);
  const [nome, setNome] = useState("");
  const [status, setStatus] = useState<"idle"|"sending"|"ok">("idle");
  const match = fixtures[idx];
  const stats = useMemo(()=>getFintiVoti(idx),[idx]);

  const invia = async (e:any) => {
    e.preventDefault();
    if(!voto||!nome) return alert("Nome e pronostico!");
    setStatus("sending");
    await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ partita:`${match.home} vs ${match.away}`, data:match.date, pronostico:voto, nome }) });
    setStatus("ok");
    setTimeout(()=>setStatus("idle"),3000);
  };

  return (
    <section id="matchday" className="py-16 bg-[#080600] border-t border-white/10">
      <div className="mx-auto max-w-5xl px-5">
        <h2 className="text-3xl font-black text-white">Pronostico Giornata</h2>
        <p className="text-white/50 text-sm mt-1">{match.competition} · {match.date} {match.time}</p>

        <select value={idx} onChange={e=>setIdx(parseInt(e.target.value))} className="mt-6 w-full bg-black border border-white/20 rounded-full px-4 py-3 text-white text-sm">
          {fixtures.map((p,i)=><option key={i} value={i}>{p.date} - {p.home} vs {p.away}</option>)}
        </select>

        <div className="mt-6 bg-white/[0.03] border border-white/10 rounded- p-5">
          <div className="flex h-3 rounded-full overflow-hidden bg-white/10">
            <div style={{width:`${stats.p1}%`}} className="bg-[#d6b45a]" />
            <div style={{width:`${stats.pX}%`}} className="bg-white/40" />
            <div style={{width:`${stats.p2}%`}} className="bg-white/10" />
          </div>
          <div className="mt-3 grid grid-cols-3 text- text-white/60">
            <div><b className="text-[#d6b45a]">{stats.p1}%</b> ({stats.c1}) - {match.home}</div>
            <div className="text-center"><b className="text-white">{stats.pX}%</b> ({stats.cX}) - X</div>
            <div className="text-right"><b>{stats.p2}%</b> ({stats.c2}) - {match.away}</div>
          </div>
          <p className="text- text-white/20 mt-2 text-center">{stats.tot} voti totali · dati inventati per estetica</p>
        </div>

        <form onSubmit={invia} className="mt-6 bg-black border border-white/10 rounded- p-6">
          <div className="grid grid-cols-3 gap-3">
            <button type="button" onClick={()=>setVoto("1")} className={`py-4 rounded-full border font-black text-sm ${voto==="1"?"bg-[#d6b45a] border-[#d6b45a] text-black":"bg-white/5 border-white/10 text-white"}`}>1</button>
            <button type="button" onClick={()=>setVoto("X")} className={`py-4 rounded-full border font-black text-sm ${voto==="X"?"bg-[#d6b45a] border-[#d6b45a] text-black":"bg-white/5 border-white/10 text-white"}`}>X</button>
            <button type="button" onClick={()=>setVoto("2")} className={`py-4 rounded-full border font-black text-sm ${voto==="2"?"bg-[#d6b45a] border-[#d6b45a] text-black":"bg-white/5 border-white/10 text-white"}`}>2</button>
          </div>
          <input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Il tuo nome" className="mt-4 w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-white text-sm" />
          <button className="mt-4 w-full bg-[#d6b45a] text-black font-black rounded-full py-3 text-sm">{status==="sending"?"Invio...":status==="ok"?"Votato ✅":"VOTA"}</button>
        </form>
      </div>
    </section>
  );
}
export const Predictions = Pronostico;
