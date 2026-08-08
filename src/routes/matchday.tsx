import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/matchday")({
  component: MatchdayPage,
});

function MatchdayPage() {
  const [settore, setSettore] = useState("blu-basso");
  const [qty, setQty] = useState(2);

  const livelli = [
    { id: "alto", label: "ALTO 3° ANELLO", priceAdd: -30, colorOp: "0.45" },
    { id: "medio", label: "MEDIO 2° ANELLO", priceAdd: 0, colorOp: "0.75" },
    { id: "basso", label: "BASSO 1° ANELLO", priceAdd: 25, colorOp: "1" },
  ];

  const tribune = [
    { id: "rossa", name: "TRIBUNA ROSSA", color: "#E53935", base: 229 },
    { id: "blu", name: "TRIBUNA BLU", color: "#1E88E5", base: 149 },
    { id: "verde", name: "TRIBUNA VERDE", color: "#43A047", base: 89 },
    { id: "arancio", name: "CURVA NORD", color: "#FB8C00", base: 49 },
  ];

  const allSettori = tribune.flatMap(t => livelli.map(l => ({
    id: `${t.id}-${l.id}`,
    name: `${t.name} ${l.label}`,
    tribuna: t.id,
    livello: l.id,
    price: t.base + l.priceAdd,
    color: t.color,
    op: l.colorOp,
    left: Math.floor(Math.random()*15)+3
  })));

  const sel = allSettori.find(s=>s.id===settore)!;

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20">
      <div className="mx-auto max-w- px-4 py-8 grid lg:grid-cols-[1.4fr_0.6fr] gap-8">

        {/* SAN SIRO SQUADRATO */}
        <div>
          <h2 className="text- font-black tracking-[0.3em] text-[#95BFE5] uppercase">SAN SIRO - 4 TORRI - 3 ANELLI - 360 POSTI</h2>

          <div className="mt-4 bg-[#0F0F0F] border border-white/10 rounded- p-3 sm:p-5 relative">

            {/* 4 TORRI */}
            <div className="absolute top-0 left-0 w-12 h-12 bg-[#1E1E1E] border border-white/20 rounded-xl flex items-center justify-center z-30 shadow-2xl">
              <div className="text-center leading-none"><p className="text- font-black">TORRE</p><p className="text- font-black">1</p></div>
            </div>
            <div className="absolute top-0 right-0 w-12 h-12 bg-[#1E1E1E] border border-white/20 rounded-xl flex items-center justify-center z-30 shadow-2xl">
              <div className="text-center leading-none"><p className="text- font-black">TORRE</p><p className="text- font-black">2</p></div>
            </div>
            <div className="absolute bottom-0 left-0 w-12 h-12 bg-[#1E1E1E] border border-white/20 rounded-xl flex items-center justify-center z-30 shadow-2xl">
              <div className="text-center leading-none"><p className="text- font-black">TORRE</p><p className="text- font-black">3</p></div>
            </div>
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-[#1E1E1E] border border-white/20 rounded-xl flex items-center justify-center z-30 shadow-2xl">
              <div className="text-center leading-none"><p className="text- font-black">TORRE</p><p className="text- font-black">4</p></div>
            </div>

            <div className="bg-[#080808] rounded- border border-white/5 p-2 sm:p-3 mx-8 my-8">

              {/* NORD ROSSA - 3 FILE */}
              <div className="space-y-">
                {livelli.map(l=>{
                  const id = `rossa-${l.id}`;
                  return (
                    <div key={id} className="flex gap- justify-center items-center">
                      <span className="text- font-black w-10 text-right text-[#E53935] opacity-60">{l.label}</span>
                      <div className="flex gap-">
                        {Array.from({length:22}).map((_,i)=><button key={i} onClick={()=>setSettore(id)} className={`w- h- sm:w- sm:h- rounded- text- font-black border transition-all ${settore===id?"bg-[#95BFE5] text-black border-[#95BFE5] scale-110 shadow-lg":"text-white border-black/20"}`} style={{background:tribune[0].color, opacity: settore===id?1:l.colorOp}}>{201+i}</button>)}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-2 mt-3">
                {/* OVEST VERDE - 3 COLONNE */}
                <div className="flex gap-">
                  {livelli.slice().reverse().map(l=>{
                    const id = `verde-${l.id}`;
                    return (
                      <div key={id} className="flex flex-col gap-">
                        {Array.from({length:14}).map((_,i)=><button key={i} onClick={()=>setSettore(id)} className={`w- sm:w- h- rounded- text- font-bold border ${settore===id?"bg-[#95BFE5] text-black border-[#95BFE5] scale-110":"text-white border-black/20"}`} style={{background:tribune[2].color, opacity: settore===id?1:l.colorOp}}>{100+i}</button>)}
                      </div>
                    )
                  })}
                </div>

                {/* CAMPO SAN SIRO SQUADRATO */}
                <div className="flex-1 aspect-[1.8/1] bg-gradient-to-b from-[#5DBB4B] to-[#3A9A2E] rounded- border-2 border-white/15 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-[6%] border-[1.2px] border-white/70"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 border border-white/70 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[18%] h-[44%] border border-white/70 border-l-0"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[18%] h-[44%] border border-white/70 border-r-0"></div>
                  <div className="text-center z-10"><p className="text- font-black tracking-[0.3em] text-black/30">SAN SIRO</p><p className="text- font-bold text-black/20">105 x 68</p></div>
                </div>

                {/* EST ARANCIO - 3 COLONNE */}
                <div className="flex gap
