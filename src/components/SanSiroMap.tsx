import { useState } from "react";

export function SanSiroMap({ onSelect, selected }: any) {
  const tribune = [
    { id: "rossa", color: "#E53935" },
    { id: "blu", color: "#1E88E5" },
    { id: "verde", color: "#43A047" },
    { id: "arancio", color: "#FB8C00" },
  ];
  const livelli = ["alto", "medio", "basso"];

  return (
    <div className="bg-[#080808] rounded- border border-white/5 p-3 mx-8 my-6">
      <div className="space-y-1">
        {livelli.map((lv) => (
          <div key={lv} className="flex gap-1 justify-center">
            {Array.from({ length: 18 }).map((_, i) => (
              <button key={i} onClick={() => onSelect("rossa-" + lv)} className={`h-4 w-6 rounded text- font-black ${selected === "rossa-" + lv? "bg-white text-black" : "text-white"}`} style={{ background: selected === "rossa-" + lv? "white" : tribune[0].color, opacity: lv === "alto"? 0.5 : 1 }}>
                {201 + i}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-3">
        <div className="flex gap-1">
          {livelli.slice().reverse().map((lv) => (
            <div key={lv} className="flex flex-col gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <button key={i} onClick={() => onSelect("verde-" + lv)} className={`w-5 h-3 rounded text- ${selected === "verde-" + lv? "bg-white text-black" : "text-white"}`} style={{ background: selected === "verde-" + lv? "white" : tribune[2].color }}>
                  {100 + i}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="flex-1 aspect-[1.8/1] bg-[#4CAF50] rounded flex items-center justify-center">
          <span className="text- font-black text-black/40">CAMPO</span>
        </div>
        <div className="flex gap-1">
          {livelli.map((lv) => (
            <div key={lv} className="flex flex-col gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <button key={i} onClick={() => onSelect("arancio-" + lv)} className={`w-5 h-3 rounded text- ${selected === "arancio-" + lv? "bg-white text-black" : "text-black"}`} style={{ background: selected === "arancio-" + lv? "white" : tribune[3].color }}>
                  {130 + i}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-1 mt-3">
        {livelli.slice().reverse().map((lv) => (
          <div key={lv} className="flex gap-1 justify-center">
            {Array.from({ length: 18 }).map((_, i) => (
              <button key={i} onClick={() => onSelect("blu-" + lv)} className={`h-4 w-6 rounded text- font-black ${selected === "blu-" + lv? "bg-white text-black" : "text-white"}`} style={{ background: selected === "blu-" + lv? "white" : tribune[1].color, opacity: lv === "alto"? 0.5 : 1 }}>
                {170 + i}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
