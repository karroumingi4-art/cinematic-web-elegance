import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
export const Route = createFileRoute("/matchday")({ component: MatchdayPage });

function MatchdayPage() {
  const [settore, setSettore] = useState("blu-medio");
  const [qty, setQty] = useState(2);

  const tribune = [
    { id: "rossa", name: "Tribuna Rossa", color: "#E53935", base: 229 },
    { id: "blu", name: "Tribuna Blu", color: "#1E88E5", base: 149 },
    { id: "verde", name: "Tribuna Verde", color: "#43A047", base: 89 },
    { id: "arancio", name: "Curva Nord", color: "#FB8C00", base: 49 },
  ];

  const livelli = [
    { id: "alto", label: "ALTO", tag: "3 ANELLO", mod: -25 },
    { id: "medio", label: "MEDIO", tag: "2 ANELLO", mod: 0 },
    { id: "basso", label: "BASSO", tag: "1 ANELLO", mod: 15 },
  ];

  const all: any[] = [];
  tribune.forEach((t) => {
    livelli.forEach((l) => {
      all.push({
        id: t.id + "-" + l.id,
        name: t.name + " " + l.label,
        t: t.id,
        l: l.id,
        tag: l.tag,
        price: t.base + l.mod,
        color: t.color,
        left: Math.floor(Math.random() * 12) + 4,
      });
    });
  });

  const sel = all.find((s) => s.id === settore)!;

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20">
      <div className="mx-auto max-w- px-4 py-8 grid lg:grid-cols-[1.4fr_0.6fr] gap-8">
        <div>
          <div className="flex justify-between">
            <h2 className="text- font-black tracking-[0.3em] text-[#95BFE5] uppercase">SAN SIRO - 4 TORRI - 12 SETTORI</h2>
            <span className="text- bg-white text-black px-3 py-1 rounded-full font-black">{sel.left} LIBERI</span>
          </div>

          <div className="mt-4 bg-[#0F0F0F] border border-white/10 rounded- p-4 relative">
            <div className="absolute top-2 left-2 w-10 h-10 bg-[#1E1E1E] border border-white/20 rounded-lg flex items-center justify-center text- font-black z-10">T1</div>
            <div className="absolute top-2 right-2 w-10 h-10 bg-[#1E1E1E] border border-white/20 rounded-lg flex items-center justify-center text- font-black z-10">T2</div>
            <div className="absolute bottom-2 left-2 w-10 h-10 bg-[#1E1E1E] border border-white/20 rounded-lg flex items-center justify-center text- font-black z-10">T3</div>
            <div className="absolute bottom-2 right-2 w-10 h-10 bg-[#1E1E1E] border border-white/20 rounded-lg flex items-center justify-center text- font-black z-10">T4</div>

            <div className="bg-[#080808] rounded- border border-white/5 p-3 mx-8 my-6">
              <div className="space-y-">
                {livelli.map((lv) => {
                  const id = "rossa-" + lv.id;
                  return (
                    <div key={id} className="flex gap-1 justify-center">
                      {Array.from({ length: 18 }).map((_, i) => (
                        <button key={i} onClick={() => setSettore(id)} className={`h- w- rounded- text- font-black border ${settore === id? "bg-[#95BFE5] text-black border-[#95BFE5] scale-110" : "border-black/20 text-white"}`} style={{ background: tribune[0].color, opacity: lv.id === "alto"? 0.5 : lv.id === "medio"? 0.85 : 1 }}>
                          {201 + i}
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2 mt-3">
                <div className="flex gap-">
                  {livelli.slice().reverse().map((lv) => {
                    const id = "verde-" + lv.id;
                    return (
                      <div key={id} className="flex flex-col gap-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <button key={i} onClick={() => setSettore(id)} className={`w- h- rounded- text- font-bold border ${settore === id? "bg-[#95BFE5] text-black border-[#95BFE5] scale-110" : "border-black/20 text-white"}`} style={{ background: tribune[2].color, opacity: lv.id === "alto"? 0.5 : lv.id === "medio"? 0.85 : 1 }}>
                            {100 + i}
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>

                <div className="flex-1 aspect-[1.8/1] bg-gradient-to-b from-[#5DBB4B] to-[#3A9A2E] rounded- border border-white/15 relative flex items-center justify-center">
                  <div className="absolute inset-[7%] border border-white/60"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border border-white/60 rounded-full"></div>
                  <span className="text- font-black text-black/40 tracking-widest">GASTON ARENA - SAN SIRO</span>
                </div>

                <div className="flex gap-">
                  {livelli.map((lv) => {
                    const id = "arancio-" + lv.id;
                    return (
                      <div key={id} className="flex flex-col gap-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <button key={i} onClick={() => setSettore(id)} className={`w- h- rounded- text- font-bold border ${settore === id? "bg-[#95BFE5] text-black border-[#95BFE5] scale-110" : "border-black/20 text-black"}`} style={{ background: tribune[3].color, opacity: lv.id === "alto"? 0.5 : lv.id === "medio"? 0.85 : 1 }}>
                            {130 + i}
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y- mt-3">
                {livelli.slice().reverse().map((lv) => {
                  const id = "blu-" + lv.id;
                  return (
                    <div key={id} className="flex gap-1 justify-center">
                      {Array.from({ length: 18 }).map((_, i) => (
                        <button key={i} onClick={() => setSettore(id)} className={`h- w- rounded- text- font-black border ${settore === id? "bg-[#95BFE5] text-black border-[#95BFE5] scale-110" : "border-black/20 text-white"}`} style={{ background: tribune[1].color, opacity: lv.id === "alto"?
