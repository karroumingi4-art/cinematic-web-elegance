import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SanSiroMap } from "../components/SanSiroMap";

export const Route = createFileRoute("/matchday")({ component: MatchdayPage });

function MatchdayPage() {
  const [settore, setSettore] = useState("blu-medio");
  const [qty, setQty] = useState(2);
  const settori = [
    { id: "rossa-alto", name: "Rossa Alto", price: 204 },
    { id: "rossa-medio", name: "Rossa Medio", price: 229 },
    { id: "rossa-basso", name: "Rossa Basso", price: 244 },
    { id: "blu-alto", name: "Blu Alto", price: 124 },
    { id: "blu-medio", name: "Blu Medio", price: 149 },
    { id: "blu-basso", name: "Blu Basso", price: 164 },
    { id: "verde-alto", name: "Verde Alto", price: 64 },
    { id: "verde-medio", name: "Verde Medio", price: 89 },
    { id: "verde-basso", name: "Verde Basso", price: 104 },
    { id: "arancio-alto", name: "Curva Alto", price: 24 },
    { id: "arancio-medio", name: "Curva Medio", price: 49 },
    { id: "arancio-basso", name: "Curva Basso", price: 64 },
  ];
  const sel = settori.find((s) => s.id === settore)!;
  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text- font-black tracking-widest text-[#95BFE5] uppercase">SAN SIRO - 4 TORRI - 12 SETTORI - 3 FILE</h2>
          <div className="mt-4 bg-[#111] border border-white/10 rounded- p-4">
            <SanSiroMap selected={settore} onSelect={setSettore} />
            <div className="grid grid-cols-3 gap-2 mt-4">
              {settori.map((s) => (
                <button key={s.id} onClick={() => setSettore(s.id)} className={`p-2 rounded-xl border text-left ${settore === s.id? "bg-white text-black" : "bg-black border-white/10 text-white/60"}`}>
                  <div className="text-">{s.id}</div>
                  <div className="text- font-black">{s.name} {s.price}E</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#111] border border-white/10 rounded- p-6 h-fit">
          <h3 className="text-xl font-black">{sel.name}</h3>
          <p className="text-2xl font-black mt-3">{sel.price * qty}E</p>
          <div className="flex gap-2 mt-4">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 rounded-full bg-white/10">-</button>
            <span className="w-6 text-center font-black">{qty}</span>
            <button onClick={() => setQty((q) => Math.min(4, q + 1))} className="w-9 h-9 rounded-full bg-white text-black">+</button>
          </div>
          <button onClick={() => window.open("https://wa.me/393000000000?text=" + sel.name)} className="mt-6 w-full bg-white text-black rounded-full py-4 font-black text-xs">PRENOTA {sel.price * qty}E</button>
        </div>
      </div>
    </div>
  );
}
