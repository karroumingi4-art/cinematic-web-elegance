import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";


export const Route = createFileRoute("/matchday")({
  component: MatchdayPage,
});


function MatchdayPage() {
  const [settore, setSettore] = useState("centrale");
  const [qty, setQty] = useState(2);


  const settori = [
    { id: "onore", name: "Tribuna d'Onore", price: 249, left: 6 },
    { id: "centrale", name: "Tribuna Centrale", price: 149, left: 18 },
    { id: "distinti", name: "Distinti", price: 89, left: 42 },
    { id: "curva", name: "Curva Nord", price: 49, left: 97 },
  ];


  const sel = settori.find((s) => s.id === settore)!;


  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-[11px] font-bold tracking-[0.3em] text-[#95BFE5] uppercase">MAPPA STADIO - 120 ZONE</h2>
          <div className="mt-4 bg-[#111] border border-white/10 rounded-[20px] p-3">
            <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-2">
              <div className="flex flex-wrap gap-1 justify-center">
                {Array.from({ length: 20 }).map((_, i) => (
                  <button key={i} onClick={() => setSettore("onore")} className={`h-6 w-8 rounded text-[7px] font-black ${settore === "onore"? "bg-[#95BFE5] text-black" : "bg-[#FF6B2B] text-black"}`}>{310 + i}</button>
                ))}
              </div>
              <div className="flex gap-2 my-2">
                <div className="flex flex-col gap-1">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <button key={i} onClick={() => setSettore("distinti")} className={`h-5 w-7 rounded text-[6px] font-bold ${settore === "distinti"? "bg-[#95BFE5] text-black" : "bg-[#60B7E8] text-black"}`}>{90 + i}</button>
                  ))}
                </div>
                <div className="flex-1 bg-[#4CAF50] rounded-lg flex items-center justify-center"><span className="text-[10px] font-black text-black/40">CAMPO</span></div>
                <div className="flex flex-col gap-1">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <button key={i} onClick={() => setSettore("curva")} className={`h-5 w-7 rounded text-[6px] font-bold ${settore === "curva"? "bg-[#95BFE5] text-black" : "bg-[#8FB996] text-black"}`}>{120 + i}</button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {Array.from({ length: 20 }).map((_, i) => (
                  <button key={i} onClick={() => setSettore("centrale")} className={`h-6 w-8 rounded text-[7px] font-black ${settore === "centrale"? "bg-[#95BFE5] text-black" : "bg-[#FF8A3D] text-black"}`}>{170 + i}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {settori.map((s) => (
                <button key={s.id} onClick={() => setSettore(s.id)} className={`p-2 rounded-xl border text-left ${settore === s.id? "bg-white text-black" : "bg-black border-white/10 text-white/60"}`}>
                  <div className="text-[8px]">{s.id}</div><div className="font-black text-[11px]">{s.name}</div><div className="text-xs">{s.price}€</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-[24px] p-6 h-fit">
          <h3 className="font-black text-xl">{sel.name} - {sel.price}€</h3>
          <div className="mt-4 flex gap-3">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded-full bg-white/10">-</button>
            <span className="font-black">{qty}</span>
            <button onClick={() => setQty((q) => Math.min(4, q + 1))} className="w-8 h-8 rounded-full bg-white text-black">+</button>
          </div>
          <p className="mt-4 font-black">Totale: {sel.price * qty}€</p>
          <button onClick={() => window.open(`https://wa.me/393000000000?text=${sel.name} x${qty}`)} className="mt-4 w-full bg-white text-black rounded-full py-4 font-black text-xs">PRENOTA {sel.price * qty}€</button>
        </div>
      </div>
    </div>
  );
}
