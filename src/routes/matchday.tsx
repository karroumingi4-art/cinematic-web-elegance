import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/matchday")({
  component: MatchdayPage,
});

function MatchdayPage() {
  const [settore, setSettore] = useState("blu-medio");
  const [qty, setQty] = useState(2);

  function price() {
    if (settore === "rossa-alto") return 204;
    if (settore === "rossa-medio") return 229;
    if (settore === "rossa-basso") return 244;
    if (settore === "blu-alto") return 124;
    if (settore === "blu-medio") return 149;
    if (settore === "blu-basso") return 164;
    if (settore === "verde-alto") return 64;
    if (settore === "verde-medio") return 89;
    if (settore === "verde-basso") return 104;
    if (settore === "arancio-alto") return 24;
    if (settore === "arancio-medio") return 49;
    return 64;
  }

  function name() {
    if (settore === "rossa-alto") return "Rossa ALTO";
    if (settore === "rossa-medio") return "Rossa MEDIO";
    if (settore === "rossa-basso") return "Rossa BASSO";
    if (settore === "blu-alto") return "Blu ALTO";
    if (settore === "blu-medio") return "Blu MEDIO";
    if (settore === "blu-basso") return "Blu BASSO";
    if (settore === "verde-alto") return "Verde ALTO";
    if (settore === "verde-medio") return "Verde MEDIO";
    if (settore === "verde-basso") return "Verde BASSO";
    if (settore === "arancio-alto") return "Curva ALTO";
    if (settore === "arancio-medio") return "Curva MEDIO";
    return "Curva BASSO";
  }

  const p = price();
  const n = name();

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text- font-black tracking-widest text-[#95BFE5] uppercase">SAN SIRO - 12 SETTORI - 3 FILE - FIX BUILD</h2>
        <div className="mt-6 grid lg:grid-cols-2 gap-8">
          <div className="bg-[#111] border border-white/10 rounded- p-4">
            <div className="bg-[#0a0a0a] rounded-xl p-3">
              <div className="bg-[#2a9a2a] h-20 rounded flex items-center justify-center">
                <span className="font-black text-black/40 text-xs">CAMPO SAN SIRO - 4 TORRI</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <button onClick={() => setSettore("rossa-alto")} className="bg-black border border-white/10 p-3 rounded-xl text-left"><div className="text-">ALTO</div><div className="text- font-black">Rossa 204E</div></button>
                <button onClick={() => setSettore("rossa-medio")} className="bg-black border border-white/10 p-3 rounded-xl text-left"><div className="text-">MEDIO</div><div className="text- font-black">Rossa 229E</div></button>
                <button onClick={() => setSettore("rossa-basso")} className="bg-black border border-white/10 p-3 rounded-xl text-left"><div className="text-">BASSO</div><div className="text- font-black">Rossa 244E</div></button>

                <button onClick={() => setSettore("blu-alto")} className="bg-black border border-white/10 p-3 rounded-xl text-left"><div className="text-">ALTO</div><div className="text- font-black">Blu 124E</div></button>
                <button onClick={() => setSettore("blu-medio")} className="bg-white text-black p-3 rounded-xl text-left"><div className="text-">MEDIO</div><div className="text- font-black">Blu 149E</div></button>
                <button onClick={() => setSettore("blu-basso")} className="bg-black border border-white/10 p-3 rounded-xl text-left"><div className="text-">BASSO</div><div className="text- font-black">Blu 164E</div></button>

                <button onClick={() => setSettore("verde-alto")} className="bg-black border border-white/10 p-3 rounded-xl text-left"><div className="text-">ALTO</div><div className="text- font-black">Verde 64E</div></button>
                <button onClick={() => setSettore("verde-medio")} className="bg-black border border-white/10 p-3 rounded-xl text-left"><div className="text-">MEDIO</div><div className="text- font-black">Verde 89E</div></button>
                <button onClick={() => setSettore("verde-basso")} className="bg-black border border-white/10 p-3 rounded-xl text-left"><div className="text-">BASSO</div><div className="text- font-black">Verde 104E</div></button>

                <button onClick={() => setSettore("arancio-alto")} className="bg-black border border-white/10 p-3 rounded-xl text-left"><div className="text-">ALTO</div><div className="text- font-black">Curva 24E</div></button>
                <button onClick={() => setSettore("arancio-medio")} className="bg-black border border-white/10 p-3 rounded-xl text-left"><div className="text-">MEDIO</div><div className="text- font-black">Curva 49E</div></button>
                <button onClick={() => setSettore("arancio-basso")} className="bg-black border border-white/10 p-3 rounded-xl text-left"><div className="text-">BASSO</div><div className="text- font-black">Curva 64E</div></button>
              </div>
            </div>
          </div>
          <div className="bg-[#111] border border-white/10 rounded- p-6 h-fit">
            <h3 className="text-xl font-black">{n}</h3>
            <p className="text-2xl font-black mt-4">{p} euro x {qty} = {p * qty} euro</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setQty(qty > 1? qty - 1 : 1)} className="w-9 h-9 rounded-full bg-white/10">-</button>
              <span className="w-6 text-center font-black">{qty}</span>
              <button onClick={() => setQty(qty < 4? qty + 1 : 4)} className="w-9 h-9 rounded-full bg-white text-black">+</button>
            </div>
            <button onClick={() => window.open("https://wa.me/393000000000?text=" + n)} className="mt-6 w-full bg-white text-black rounded-full py-4 font-black text-xs">PRENOTA {p * qty} EURO</button>
          </div>
        </div>
      </div>
    </div>
  );
}
