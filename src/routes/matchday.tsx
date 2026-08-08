import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/matchday")({
  component: MatchdayPage,
});

function MatchdayPage() {
  const [settore, setSettore] = useState("centrale-medio");
  const [qty, setQty] = useState(2);

  const tribune = [
    { base: "onore", name: "Onore", color: "#FF6B2B" },
    { base: "centrale", name: "Centrale", color: "#FF8A3D" },
    { base: "distinti", name: "Distinti", color: "#60B7E8" },
    { base: "curva", name: "Curva", color: "#8FB996" },
  ];

  const livelli = [
    { id: "alto", label: "ALTO" },
    { id: "medio", label: "MEDIO" },
    { id: "basso", label: "BASSO" },
  ];

  const allSettori: any[] = [];
  tribune.forEach((t) => {
    livelli.forEach((l) => {
      const basePrice = t.base === "onore"? 249 : t.base === "centrale"? 149 : t.base === "distinti"? 89 : 49;
      const mod = l.id === "alto"? -20 : l.id === "basso"? -10 : 0;
      allSettori.push({
        id: t.base + "-" + l.id,
        base: t.base,
        livello: l.id,
        name: t.name + " " + l.label,
        price: basePrice + mod,
        left: 12,
        color: t.color,
      });
    });
  });

  const sel = allSettori.find((s) => s.id === settore)!;

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text- font-black tracking-widest text-[#95BFE5] uppercase">
            MAPPA - 12 SETTORI - 3 FILE
          </h2>
          <div className="mt-4 bg-[#111] border border-white/10 rounded- p-4">
            <div className="bg-[#0a0a0a] rounded- border border-white/5 p-4">
              <div className="bg-[#2a9a2a] h-24 rounded-lg flex items-center justify-center mb-4">
                <span className="font-black text-black/40">CAMPO</span>
              </div>
              <div className="space-y-2">
                {tribune.map((t) => (
                  <div key={t.base} className="grid grid-cols-3 gap-2">
                    {allSettori
                     .filter((s) => s.base === t.base)
                     .map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSettore(s.id)}
                          className={`p-2 rounded-xl border text-left ${
                            settore === s.id? "bg-white text-black border-white" : "bg-black border-white/10 text-white/60"
                          }`}
                        >
                          <div className="text- uppercase">{s.livello}</div>
                          <div className="font-black text-">{t.name}</div>
                          <div className="text-">{s.price} euro</div>
                        </button>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#111] border border-white/10 rounded- p-6 h-fit">
          <h3 className="text-xl font-black">{sel.name}</h3>
          <p className="text-2xl font-black mt-3">
            {sel.price} euro x {qty} = {sel.price * qty} euro
          </p>
          <div className="flex gap-2 mt-4">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 rounded-full bg-white/10">
              -
            </button>
            <span className="font-black w-6 text-center">{qty}</span>
            <button onClick={() => setQty((q) => Math.min(4, q + 1))} className="w-9 h-9 rounded-full bg-white text-black">
              +
            </button>
          </div>
          <button
            onClick={() => window.open("https://wa.me/393000000000?text=" + sel.name + " x" + qty)}
            className="mt-6 w-full bg-white text-black rounded-full py-4 font-black text-xs"
          >
            PRENOTA {sel.price * qty} EURO
          </button>
        </div>
      </div>
    </div>
  );
}
