import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Clock, Armchair } from "lucide-react";


export const Route = createFileRoute("/matchday")({ component: MatchdayPage });


const SETTORI = [
  { id: "onore", name: "Tribuna d'Onore", price: 249, rows: 4, cols: 5, left: 6 },
  { id: "centrale", name: "Tribuna Centrale", price: 149, rows: 6, cols: 10, left: 18 },
  { id: "distinti", name: "Distinti", price: 89, rows: 10, cols: 10, left: 42 },
  { id: "curva", name: "Curva Nord", price: 49, rows: 10, cols: 12, left: 97 },
];


function MatchdayPage() {
  const [settore, setSettore] = useState("centrale");
  const [selected, setSelected] = useState<string[]>(["C-5"]);
  const sel = SETTORI.find(s => s.id === settore)!;


  // posti occupati casuali
  const occupied = useMemo(() => {
    const arr = new Set<string>();
    for(let i=0;i<sel.rows*sel.cols*0.35;i++) arr.add(`${String.fromCharCode(65+Math.floor(Math.random()*sel.rows))}-${Math.floor(Math.random()*sel.cols)+1}`);
    return arr;
  }, [sel.id]);


  const toggleSeat = (id: string) => {
    if (occupied.has(id)) return;
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(s=>s!==id);
      if (prev.length >= 4) return [id]; // max 4, reset se superi
      return [...prev, id];
    });
  };


  const total = selected.length * sel.price;


  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 py-6 grid lg:grid-cols-[1.25fr_0.75fr] gap-6">


        {/* STADIO */}
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#95BFE5]">MAPPA STADIO - 26/27</h2>
            <span className="text-[10px] bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-black border border-red-500/20">{sel.left} POSTI RIMASTI IN {sel.name.toUpperCase()}</span>
          </div>


          <div className="mt-4 bg-[#111] border border-white/10 rounded-[20px] p-4 sm:p-6">
            <div className="flex gap-2 mb-4">
              {SETTORI.map(s => (
                <button key={s.id} onClick={()=>{setSettore(s.id); setSelected([]);}} className={`flex-1 py-2.5 rounded-full text-[10px] font-black tracking-widest border ${settore===s.id? "bg-white text-black border-white" : "bg-black text-white/60 border-white/10"}`}>{s.name.split(" ")[0].toUpperCase()} {s.price}€</button>
              ))}
            </div>


            <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/5">
              <div className="flex justify-between text-[9px] text-white/30 uppercase tracking-widest mb-3">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-white rounded-sm" /> Libero</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#95BFE5] rounded-sm" /> Selezionato</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-white/10 rounded-sm" /> Occupato</span>
              </div>


              {/* LEGENDA FILE */}
              <div className="flex gap-1.5">
                <div className="flex flex-col gap-1.5 pt-1">
                  {Array.from({length: sel.rows}).map((_,r) => <div key={r} className="h-7 w-5 flex items-center justify-center text-[9px] text-white/30 font-bold">{String.fromCharCode(65+r)}</div>)}
                </div>
                <div className="flex-1">
                  <div className="grid gap-1.5" style={{gridTemplateColumns: `repeat(${sel.cols}, minmax(0,1fr))`}}>
                    {Array.from({length: sel.rows}).map((_,r) =>
                      Array.from({length: sel.cols}).map((_,c) => {
                        const id = `${String.fromCharCode(65+r)}-${c+1}`;
                        const isOcc = occupied.has(id);
                        const isSel = selected.includes(id);
                        return (
                          <button key={id} disabled={isOcc} onClick={()=>toggleSeat(id)}
                            className={`h-7 rounded-[6px] flex items-center justify-center transition text-[10px] font-bold
                              ${isOcc? "bg-white/10 text-white/20 cursor-not-allowed" : isSel? "bg-[#95BFE5] text-black scale-110 shadow-lg" : "bg-white/10 hover:bg-white/20 text-white/60"}`}>
                            <Armchair className="w-3.5 h-3.5" />
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>


              <div className="mt-5 h-14 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center">
                <span className="text-[11px] tracking-[0.3em] text-white/20 font-black">CAMPO - TRIBUNA {sel.name.toUpperCase()}</span>
              </div>
            </div>


            <p className="mt-3 text-[11px] text-white/40 text-center">Selezionati: {selected.length>0? selected.join(", ") : "Nessun posto"} • Max 4 persone • Tocca per selezionare</p>
          </div>


          <div className="mt-8">
            <h3 className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#95BFE5]">IL TUO MATCHDAY INCLUDE</h3>
            <div className="mt-5 relative">
              <div className="absolute left-3 top-1 bottom-1 w-px bg-white/10" />
              {[
                {h:"14:00", t:"Tour Tunnel & Spogliatoio"},
                {h:"15:30", t:"Pranzo con Leggenda Pulisic"},
                {h:"17:00", t:`Partita - ${sel.name} ${selected.join(", ")}`},
                {h:"19:00", t:"Cena con Giocatori + Maglia"},
              ].map(s=>(
                <div key={s.h} className="relative pl-10 pb-6">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#111] border border-[#95BFE5] flex items-center justify-center"><Clock className="w-3 h-3 text-[#95BFE5]" /></div>
                  <p className="text-[#95BFE5] font-black text-xs tracking-widest">{s.h}</p>
                  <p className="font-bold text-sm mt-1">{s.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* CHECKOUT */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-[#111] border border-white/10 rounded-[24px] p-6">
            <p className="text-[11px] tracking-widest uppercase text-white/40">RIEPILOGO</p>
            <h3 className="text-xl font-black mt-1">{sel.name} • {selected.length} posti</h3>
            <p className="text-xs text-white/50 mt-1">{selected.length>0? `Fila ${selected.join(", ")}` : "Seleziona i posti sulla mappa"}</p>


            <div className="mt-5 bg-black rounded-xl p-4 border border-white/10">
              <div className="flex justify-between text-xs text-white/60"><span>Biglietto x{selected.length}</span><span>{total}€</span></div>
              <div className="flex justify-between text-xs text-white/60 mt-2"><span>Esperienza Matchday</span><span className="text-[#95BFE5] font-bold">Inclusa</span></div>
              <div className="flex justify-between font-black text-base pt-3 mt-3 border-t border-white/10"><span>Totale</span><span>{total}€</span></div>
            </div>


            <form onSubmit={(e)=>{e.preventDefault(); if(selected.length===0) return alert("Seleziona almeno 1 posto!"); window.open(`https://wa.me/393000000000?text=Matchday%20${sel.name}%20Posti%20${selected.join(",")}%20Totale%20${total}€`)}} className="mt-5 space-y-3">
              <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm"><option>Sab 16 Ago vs Crotone 17:00</option><option>Sab 23 Ago vs Catanzaro 17:00</option></select>
              <input required placeholder="Nome e Cognome" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm" />
              <input required placeholder="WhatsApp" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm" />
              <button disabled={selected.length===0} className="w-full bg-white text-black rounded-full py-4 font-black text-xs tracking-widest disabled:opacity-30 hover:bg-[#95BFE5] transition">PRENOTA ORA - {total}€ →</button>
            </form>


            <p className="text-[10px] text-center text-white/30 mt-3">QR biglietto su WhatsApp in 5 min • Posti numerati garantiti</p>
          </div>
        </div>
      </div>
    </div>
  );
}
