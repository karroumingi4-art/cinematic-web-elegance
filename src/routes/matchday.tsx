import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/matchday")({
  component: MatchdayPage,
});

// --- QUI CAMBI I PREZZI QUANDO VUOI ---
const PREZZI = {
  "rossa-alto": 204,
  "rossa-medio": 229,
  "rossa-basso": 244,
  "blu-alto": 124,
  "blu-medio": 149,
  "blu-basso": 164,
  "verde-alto": 64,
  "verde-medio": 89,
  "verde-basso": 104,
  "arancio-alto": 24,
  "arancio-medio": 49,
  "arancio-basso": 64,
} as const;

type SettoreId = keyof typeof PREZZI;

const TRIBUNE = [
  {
    nome: "TRIBUNA ROSSA",
    color: "border-red-500/50",
    settori: ["rossa-alto", "rossa-medio", "rossa-basso"] as SettoreId[]
  },
  {
    nome: "TRIBUNA BLU",
    color: "border-blue-500/50",
    settori: ["blu-alto", "blu-medio", "blu-basso"] as SettoreId[]
  },
  {
    nome: "TRIBUNA VERDE",
    color: "border-green-500/50",
    settori: ["verde-alto", "verde-medio", "verde-basso"] as SettoreId[]
  },
  {
    nome: "CURVA ARANCIO",
    color: "border-orange-500/50",
    settori: ["arancio-alto", "arancio-medio", "arancio-basso"] as SettoreId[]
  },
];

function getLabel(id: SettoreId) {
  return id.replace("-", " ").toUpperCase();
}

function MatchdayPage() {
  const [settore, setSettore] = useState<SettoreId>("blu-medio");
  const [qty, setQty] = useState(2);

  const prezzoSingolo = PREZZI[settore];
  const totale = prezzoSingolo * qty;

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20">
      <div className="mx-auto max-w-6xl px-4 py-8 grid lg:grid-cols-2 gap-8">

        {/* SINISTRA - STADIO */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-4">
          <div className="bg-[#1a9a1a] h-16 rounded-xl flex items-center justify-center mb-6">
            <span className="font-black text-black/50 text-xs tracking-[0.3em]">CAMPO</span>
          </div>

          <div className="space-y-5">
            {TRIBUNE.map((tribuna) => (
              <div key={tribuna.nome}>
                <p className="text- tracking-widest opacity-40 mb-2 font-bold">{tribuna.nome}</p>
                <div className="grid grid-cols-3 gap-2">
                  {tribuna.settori.map((id) => {
                    const isActive = settore === id;
                    const fila = id.split("-")[1].toUpperCase();
                    return (
                      <button
                        key={id}
                        onClick={() => setSettore(id)}
                        className={`rounded-xl p-3 text-left border transition-all
                          ${isActive? "bg-white text-black border-white scale-[1.02]" : `bg-black border-white/10 hover:border-white/30 ${tribuna.color}`}`}
                      >
                        <div className="text- opacity-60">{fila}</div>
                        <div className="text- font-black mt-1">{PREZZI[id]}€</div>
                        <div className="text- opacity-60 truncate">{getLabel(id)}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESTRA - CARRELLO */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 h-fit sticky top-24">
          <h3 className="text-2xl font-black">{getLabel(settore)}</h3>
          <p className="text-sm opacity-50 mt-1">Ogni settore ha il suo prezzo</p>

          <div className="mt-6 bg-black rounded-xl p-4 flex justify-between items-center">
            <span className="text-xs opacity-60">PREZZO SINGOLO</span>
            <span className="font-black text-xl">{prezzoSingolo}€</span>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setQty(q => Math.max(1, q-1))} className="w-10 h-10 rounded-full bg-white/10">-</button>
              <span className="font-black w-6 text-center text-lg">{qty}</span>
              <button onClick={() => setQty(q => Math.min(4, q+1))} className="w-10 h-10 rounded-full bg-white text-black font-black">+</button>
            </div>
            <div className="text-right">
              <div className="text- opacity-50">TOTALE</div>
              <div className="text-2xl font-black">{totale}€</div>
            </div>
          </div>

          <button
            onClick={() => {
              const msg = `Ciao! Prenoto ${qty}x ${getLabel(settore)} a ${prezzoSingolo}€ cad. Totale ${totale}€`;
              window.open(`https://wa.me/393000000000?text=${encodeURIComponent(msg)}`);
            }}
            className="mt-6 w-full bg-white text-black rounded-full py-4 font-black text-xs tracking-widest"
          >
            PRENOTA PER {totale}€
          </button>
        </div>
      </div>
    </div>
  );
}
