import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";


export const Route = createFileRoute("/matchday")({ component: MatchdayPage });


const SETTORI = [
  { id: "onore", name: "Tribuna d'Onore", price: 249, left: 6, color: "#FF6B2B", type: "Long Side" },
  { id: "centrale", name: "Tribuna Centrale", price: 149, left: 18, color: "#FF8A3D", type: "Long Side" },
  { id: "distinti", name: "Distinti", price: 89, left: 42, color: "#5EB6E4", type: "Short Side" },
  { id: "curva", name: "Curva Nord", price: 49, left: 97, color: "#8FA68E", type: "Corners" },
];


function MatchdayPage() {
  const [settore, setSettore] = useState("centrale");
  const [qty, setQty] = useState(1);
  const sel = SETTORI.find(s => s.id === settore)!;


  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20">
      <div className="mx-auto max-w-6xl px-5 py-8 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-[11px] tracking-[0.3em] text-[#95BFE5] font-bold uppercase">MAPPA STADIO - Come da screenshot</h2>
          <div className="mt-4 bg-[#111] border border-white/10 rounded-[20px] p-4">
            <div className="bg-[#0a0a0a] rounded-xl border border-white/5 aspect-[1.4/1] relative overflow-hidden flex flex-col justify-between p-3">
              <div className="flex gap-1.5 justify-center">
                {["322","323","324","325","326","327","328","330"].map(n=>(
                  <button key={n} onClick={()=>setSettore("onore")} className={`w-8 h-6 rounded text-[8px] font-black ${settore==="onore"?"bg-[#95BFE5] text-black":"bg-[#FF6B2B]/70 text-black"}`}>{n}</button>
                ))}
              </div>
              <div className="flex justify-between items-center flex-1 my-2">
                <div className="flex flex-col gap-1">
                  {["101","102","103","104","105"].map(n=><button key={n} onClick={()=>setSettore("distinti")} className={`w-10 h-6 rounded text-[8px] font-black ${settore==="distinti"?"bg-[#95BFE5] text-black":"bg-[#5EB6E4]/70 text-black"}`}>{n}</button>)}
                </div>
                <div className="flex-1 mx-3 bg-[#5FAF4B]/80 border-white/20 rounded flex items-center justify-center"><span className="text-[10px] font-black tracking-widest text-black/40">CAMPO</span></div>
                <div className="flex flex-col gap-1">
                  {["137","138","140","141","142"].map(n=><button key={n} onClick={()=>setSettore("curva")} className={`w-10 h-6 rounded text-[8px] font-black ${settore==="curva"?"bg-[#95BFE5] text-black":"bg-[#8FA68E]/70 text-black"}`}>{n}</button>)}
                </div>
              </div>
              <div className="flex gap-1.5 justify-center">
                {["155","157","159","161","163","165","167"].map(n=>(
                  <button key={n} onClick={()=>setSettore("centrale")} className={`w-8 h-6 rounded text-[8px] font-black ${settore==="centrale"?"bg-[#95BFE5] text-black":"bg-[#FF8A3D]/70 text-black"}`}>{n}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {SETTORI.map(s=>(
                <button key={s.id} onClick={()=>setSettore(s.id)} className={`p-2.5 rounded-xl border text-left ${settore===s.id?"bg-white text-black":"bg-black border-white/10 text-white/60"}`}>
                  <div className="text-[9px] uppercase">{s.type}</div><div className="font-black text-xs">{s.name}</div><div className="text-xs">{s.price}€</div>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 space-y-3 text-sm">
            <div><span className="text-[#95BFE5] font-black">14:00</span> — Tour Tunnel & Spogliatoio</div>
            <div><span className="text-[#95BFE5] font-black">15:30</span> — Pranzo con Leggenda</div>
            <div><span className="text-[#95BFE5] font-black">17:00</span> — Partita in {sel.name}</div>
            <div><span className="text-[#95BFE5] font-black">19:00</span> — Cena con Giocatori</div>
          </div>
        </div>


        <div className="bg-[#111] border border-white/10 rounded-[24px] p-6 h-fit lg:sticky lg:top-24">
          <h3 className="font-black text-xl">{sel.name} — {sel.price}€</h3>
          <p className="text-xs text-white/50 mt-1">{qty} posti • Totale {sel.price * qty}€</p>
          <div className="flex items-center gap-3 mt-4">
            <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="w-8 h-8 rounded-full bg-white/10">-</button>
            <span className="font-black">{qty}</span>
            <button onClick={()=>setQty(q=>Math.min(4,q+1))} className="w-8 h-8 rounded-full bg-white text-black">+</button>
            <span className="text-xs text-white/50 ml-2">Max 4 persone</span>
          </div>
          <form onSubmit={(e)=>{e.preventDefault(); window.open(`https://wa.me/393000000000?text=Matchday%20${sel.name}%20x${qty}%20${sel.price*qty}€`)}} className="mt-6 space-y-3">
            <input required placeholder="Nome e Cognome" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm" />
            <input required placeholder="WhatsApp" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm" />
            <button className="w-full bg-white text-black rounded-full py-4 font-black text-xs">PRENOTA {sel.price*qty}€ →</button>
          </form>
        </div>
      </div>
    </div>
  );
}
