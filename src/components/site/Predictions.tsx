import { useState, useMemo } from "react";
import { fixtures } from "./Matches";

const FORMSPREE_ID = "xovqknln";

function getVoti(idx: number) {
  const seed = (idx * 37 + 13) % 100;
  let p1 = 58 + (seed % 22);
  let pX = 14 + ((seed * 2) % 12);
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
  const stats = useMemo(()=>getVoti(idx),[idx]);

  const invia = async (e:any) => {
    e.preventDefault();
    if(!voto||!nome) return alert("Nome e pronostico!");
    setStatus("sending");
    await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ partita:`${match.home} vs ${match.away}`, data:match.date, pronostico:voto, nome }) });
    setStatus("ok");
    setTimeout(()=>setStatus("idle"),3000);
  };

  return (
    <section id="matchday" className="py-20 bg-[#080600] border-t border-white/10">
      <div className="mx-auto max-w-5xl px-5">
        <h2 className="text-3xl font-black text-white">Pronostico Giornata</h2>
        <p className="text-white/50 text-sm mt-1">{match.competition} · {match.date} ore {match.time}</p>

        <select value={idx} onChange={e=>setIdx(parseInt(e.target.value))} className="mt-6 w-full bg-black border border-white/20 rounded-full px-5 py-4 text-white text-sm font-bold">
          {fixtures.map((p,i)=><option key={i} value={i}>{p.date} - {p.home} vs {p.away}</option>)}
        </select>

        <div className="mt-8 grid grid-cols-3 items-center bg-white/[0.03] border border-white/10 rounded- p-8">
          <div className="text-center"><div className="text-white font-black text-xl leading-tight">{match.home.toUpperCase()}</div><div className="text-[#d6b45a] font-black text-3xl mt-2">{stats.p1}%</div><div className="text-white/40 text- mt-1">{stats.c1} voti</div></div>
          <div className="text-center"><div className="text-white/30 text-sm tracking-widest">PAREGGIO</div><div className="text-white font-black text-3xl mt-2">{stats.pX}%</div><div className="text-white/40 text- mt-1">{stats.cX} voti</div></div>
          <div className="text-center"><div className="text-white font-black text-xl leading-tight">{match.away.toUpperCase()}</div><div className="text-white font-black text-3xl mt-2">{stats.p2}%</div><div className="text-white/40 text- mt-1">{stats.c2} voti</
