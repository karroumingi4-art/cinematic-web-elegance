import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
export const Route = createFileRoute("/matchday")({ component: MatchdayPage });

const SETTORI = [
  { id: "onore", name: "Tribuna d'Onore", price: 249, color: "bg-[#95BFE5]", seats: 20, left: 6, desc: "Seduta pelle, bar privato, vista centrale" },
  { id: "centrale", name: "Tribuna Centrale", price: 149, color: "bg-white", seats: 60, left: 18, desc: "Il cuore dello stadio, cuscino incluso" },
  { id: "distinti", name: "Distinti", price: 89, color: "bg-yellow-400", seats: 100, left: 42, desc: "Atmosfera calda, vicino alla Curva" },
  { id: "curva", name: "Curva Nord", price: 49, color: "bg-[#8B2C2C]", seats: 200, left: 97, desc: "Canta 90 minuti con noi" },
];

function MatchdayPage() {
  const [settore, setSettore] = useState("centrale");
  const sel = SETTORI.find(s => s.id === settore)!;

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-24">
      {/* HERO */}
      <div className="relative h- overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="display text-6xl sm:text-8xl font-black text-center leading-[0.85]">SCEGLI<br/>IL TUO<br/><span className="text-[#95BFE5]">POSTO.</span></h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-10">

        {/* SINISTRA - STADIO */}
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-[#95BFE5]">Mappa Stadio - 26/27</h2>
            <span className="text- bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full font-bold animate-pulse">{sel.left} POSTI RIMASTI IN {sel.name.toUpperCase()}</span>
          </div>

          {/* STADIO SVG SEMPLICE */}
          <div className="mt-6 bg-[#111] border border-white/10 rounded- p-6 sm:p-10">
            <div className="relative aspect-[16/10] bg-[#0c0c0c] rounded-xl border border-white/5 overflow-hidden flex flex-col">
              {/* Campo */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-[45%] border border-white/20 rounded-sm flex items-center justify-center"><span className="text- opacity-20 tracking-widest">CAMPO</span></div>

              {/* Settori cliccabili */}
              <div className="relative z-10 p-3 h-full flex flex-col gap-2">
                <button onClick={()=>setSettore("onore")} className={`w-full h-[22%] rounded-lg border-2 transition ${settore==="onore"? "border-[#95BFE5] bg-[#95BFE5]/20" : "border-white/10 bg-white/[0.03] hover:border-white/20"} flex items-center justify-center text- font-bold tracking-widest`}>TRIBUNA D'ONORE - {SETTORI[0].price}€</button>
                <button onClick={()=>setSettore("centrale")} className={`w-full h-[22%] rounded-lg border-2 transition ${settore==="centrale"? "border-white bg-white/20" : "border-white/10 bg-white/[0.03]"} flex items-center justify-center text- font-bold tracking-widest`}>CENTRALE - {SETTORI[1].price}€</button>
                <div className="flex gap-2 h-[22%]">
                  <button onClick={()=>setSettore("distinti")} className={`flex-1 rounded-lg border-2 text- font-bold ${settore==="distinti"? "border-yellow-400 bg-yellow-400/20" : "border-white/10"}`}>DISTINTI {SETTORI[2].price}€</button>
                  <button onClick={()=>setSettore("curva")} className={`flex-1 rounded-lg border-2 text- font-bold ${settore==="curva"? "border-[#8B2C2C] bg-[#8B2C2C]/30" : "border-white/10"}`}>CURVA {SETTORI[3].price}€</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
              {SETTORI.map(s => (
                <button key={s.id} onClick={()=>setSettore(s.id)} className={`text-left p-3 rounded-xl border text-xs ${settore===s.id? "bg-white text-black border-white" : "bg-black border-white/10 text-white/70"}`}>
                  <div className={`w-2 h-2 rounded-full ${s.color} inline-block mr-2`} />{s.name}<br/><span className="font-black text-sm">{s.price}€</span><span className="opacity-60"> • {s.left} rimasti</span>
                </button>
              ))}
            </div>
          </div>

          {/* TIMELINE */}
          <div className="mt-10">
            <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-[#95BFE5]">Il tuo Matchday include</h3>
            <div className="mt-6 border-l border-white/10 ml-3 space-y-8">
              {[
                { h: "14:00", t: "Tour Tunnel & Spogliatoio" },
                { h: "15:30", t: "Pranzo con Leggenda Gaston" },
                { h: "17:00", t: `Partita dal tuo posto: ${sel.name}` },
                { h: "19:00", t: "Cena con Giocatori + Maglia" },
              ].map(s => (
                <div key={s.h} className="relative pl-8"><div className="absolute -left- top-1 w-2.5 h-2.5 bg-[#95BFE5] rounded-full" /><p className="text-[#95BFE5] font-black text-xs">{s.h}</p><p className="font-bold text-sm mt-1">{s.t}</p></div>
              ))}
            </div>
          </div>
        </div>

        {/* DESTRA - CHECKOUT BIGLIETTO */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="bg-[#111] border border-white/10 rounded- p-7">
            <p className="text- tracking-widest uppercase text-white/40">Riepilogo</p>
            <h3 className="text-2xl font-black mt-1">{sel.name}</h3>
            <p className="text-sm text-white/60 mt-1">{sel.desc}</p>

            <div className="mt-6 bg-black rounded-xl p-4 flex justify-between items-center">
              <div><p className="text-xs text-white/50">Prezzo Matchday</p><p className="text-2xl font-black">{sel.price}€</p></div>
              <div className="text-right"><p className="text- text-white/40">Posti</p><div className="flex items-center gap-2 mt-1"><button className="w-7 h-7 rounded-full bg-white/10">-</button><span className="font-bold">1</span><button className="w-7 h-7 rounded-full bg-white text-black">+</button></div></div>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between text-white/60"><span>Biglietto {sel.name}</span><span>{sel.price}€</span></div>
              <div className="flex justify-between text-white/60"><span>Esperienza Matchday (pranzo, tour, cena)</span><span className="text-[#95BFE5]">Inclusa</span></div>
              <div className="flex justify-between font-black text-sm pt-3 border-t border-white/10"><span>Totale</span><span>{sel.price}€</span></div>
            </div>

            <form onSubmit={(e)=>{e.preventDefault(); window.open(`https://wa.me/393000000000?text=Voglio%20Matchday%20${sel.name}%20${sel.price}€%20per%20Sabato`)}} className="mt-6 space-y-3">
              <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm"><option>Sab 16 Ago vs Crotone - 17:00</option><option>Sab 23 Ago vs Catanzaro</option></select>
              <input required placeholder="Nome e Cognome" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm" />
              <input required placeholder="WhatsApp per invio biglietto" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm" />
              <button className="w-full bg-white text-black rounded-full py-4 font-black text-xs tracking-widest">PRENOTA ORA - {sel.price}€ →</button>
              <p className="text- text-center text-white/40">Ricevi QR del biglietto su WhatsApp in 5 minuti. Posto numerato: Fila {Math.floor(Math.random()*10)+1} Posto {Math.floor(Math.random()*20)+5}</p>
            </form>

            <a href="/modulo-abbonamento-2026-27.pdf" download className="block text-center mt-4 text- underline text-white/30">Scarica modulo cartaceo per abbonamento annuale</a>
          </div>
        </div>
      </div>
    </div>
  );
}
