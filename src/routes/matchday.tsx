import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
export const Route = createFileRoute("/matchday")({ component: MatchdayPage });

const ZONES = [
  { id: "tribuna-onore", name: "Tribuna d'Onore", type: "Long Side", price: 249, color: "#FF6B2B", zones: ["322","323","324","325","326","327","328","330"], left: 6 },
  { id: "tribuna-centrale", name: "Tribuna Centrale", type: "Long Side", price: 149, color: "#FF6B2B", zones: ["155","157","159","161","163","165","167"], left: 18 },
  { id: "distinti", name: "Distinti Est", type: "Short Side", price: 89, color: "#5EB6E4", zones: ["101","102","103","104","105","107","108","110","111"], left: 42 },
  { id: "curva", name: "Curva Nord", type: "Corners", price: 49, color: "#8FA68E", zones: ["137","138","140","141","142","143","145","147","148"], left: 97 },
];

function MatchdayPage() {
  const [selectedZone, setSelectedZone] = useState("tribuna-centrale");
  const [selectedSeats, setSelectedSeats] = useState<string[]>(["161"]);
  const sel = ZONES.find(z=>z.id===selectedZone)!;

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20">
      <div className="mx-auto max-w-7xl px-4 py-6 grid lg:grid-cols-[1.3fr_0.7fr] gap-6">

        <div>
          <div className="flex justify-between items-center">
            <h2 className="text- font-bold tracking-[0.3em] text-[#95BFE5] uppercase">MAPPA STADIO - 26/27 • Capacity 12.500</h2>
            <span className="text- bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-black">{sel.left} POSTI IN {sel.name.toUpperCase()}</span>
          </div>

          <div className="mt-4 bg-[#111] border border-white/10 rounded- p-3 sm:p-6">

            {/* STADIO COME SCREENSHOT */}
            <div className="relative aspect-[1.4/1] bg-[#0c0c0c] rounded-xl overflow-hidden border border-white/5 p-2">
              <svg viewBox="0 0 500 340" className="w-full h-full">
                {/* Campo */}
                <g>
                  <rect x="150" y="90" width="200" height="160" fill="#5FAF4B" stroke="white" strokeWidth="0.5" opacity="0.9"/>
                  <rect x="150" y="90" width="200" height="160" fill="none" stroke="white" strokeWidth="0.3" />
                  <circle cx="250" cy="170" r="22" fill="none" stroke="white" strokeWidth="0.3"/>
                  <circle cx="250" cy="170" r="1" fill="white"/>
                  <rect x="150" y="125" width="35" height="90" fill="none" stroke="white" strokeWidth="0.3"/>
                  <rect x="315" y="125" width="35" height="90" fill="none" stroke="white" strokeWidth="0.3"/>
                </g>

                {/* Anello interno - zone basse */}
                {/* Top - Tribuna Stampa / Onore */}
                <g>
                  {Array.from({length: 12}).map((_,i)=>{
                    const x = 125 + i*22;
                    const isSel = ZONES[0].zones.includes(`${322+i}`);
                    const isActive = selectedZone === "tribuna-onore";
                    return <g key={i} onClick={()=>setSelectedZone("tribuna-onore")} className="cursor-pointer">
                      <rect x={x} y="38" width="20" height="18" rx="2" fill={isActive && isSel? "#95BFE5" : isActive? "#FF6B2B" : "#FF6B2B"} opacity={isActive?1:0.6} stroke="black" strokeWidth="0.5"/>
                      <text x={x+10} y="48" fontSize="6" textAnchor="middle" fill="black" fontWeight="bold">{322+i}</text>
                    </g>
                  })}
                </g>

                {/* Bottom - Centrale */}
                <g>
                  {Array.from({length: 10}).map((_,i)=>{
                    const x = 145 + i*21;
                    const isActive = selectedZone === "tribuna-centrale";
                    return <g key={i} onClick={()=>setSelectedZone("tribuna-centrale")} className="cursor-pointer">
                      <rect x={x} y="258" width="19" height="16" rx="2" fill={isActive? "#95BFE5" : "#FF8A3D"} opacity={isActive?1:0.7} stroke="black" strokeWidth="0.5"/>
                      <text x={x+9.5} y="268" fontSize="5.5" textAnchor="middle" fill="black" fontWeight="bold">{159+i}</text>
                    </g>
                  })}
                </g>

                {/* Left - Distinti */}
                <g>
                  {Array.from({length: 10}).map((_,i)=>{
                    const y = 95 + i*16;
                    const isActive = selectedZone === "distinti";
                    return <g key={i} onClick={()=>setSelectedZone("distinti")} className="cursor-pointer">
                      <rect x="82" y={y} width="28" height="14" rx="2" fill={isActive? "#95BFE5" : "#5EB6E4"} opacity={isActive?1:0.7} stroke="black" strokeWidth="0.5"/>
                      <text x="96" y={y+9} fontSize="5.5" textAnchor="middle" fill="black" fontWeight="bold">{101+i}</text>
                    </g>
                  })}
                </g>

                {/* Right - Curva */}
                <g>
                  {Array.from({length: 10}).map((_,i)=>{
                    const y = 95 + i*16;
                    const isActive = selectedZone === "curva";
                    return <g key={i} onClick={()=>setSelectedZone("curva")} className="cursor-pointer">
                      <rect x="390" y={y} width="28" height="14" rx="2" fill={isActive? "#95BFE5" : "#8FA68E"} opacity={isActive?1:0.7} stroke="black" strokeWidth="0.5"/>
                      <text x="404" y={y+9} fontSize="5.5" textAnchor="middle" fill="black" fontWeight="bold">{137+i}</text>
                    </g>
                  })}
                </g>

                {/* Corners grigi */}
                <rect x="82" y="38" width="30" height="45" rx="4" fill="#6B6B6B" opacity="0.5" />
                <rect x="388" y="38" width="30" height="45" rx="4" fill="#6B6B6B" opacity="0.5" />
                <rect x="82" y="258" width="30" height="45" rx="4" fill="#6B6B6B" opacity="0.5" />
                <rect x="388" y="258" width="30" height="45" rx="4" fill="#6B6B6B" opacity="0.5" />
              </svg>
            </div>

            <div className="flex gap-4 mt-4 text- font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#FF6B2B] rounded-sm" /> Long Side</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#5EB6E4] rounded-sm" /> Short Side</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#8FA68E] rounded-sm" /> Corners</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#95BFE5] rounded-sm" /> Selezionato</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              {ZONES.map(z=>(
                <button key={z.id} onClick={()=>setSelectedZone(z.id)} className={`p-3 rounded-xl border text-left transition ${selectedZone===z.id? "bg-white text-black border-white" : "bg-black border-white/10 text-white/60"}`}>
                  <p className="text- uppercase tracking-widest opacity-60">{z.type}</p>
                  <p className="font-black text-xs mt-1">{z.name}</p>
                  <p className="font-black text-sm mt-1">{z.price}€ <span className="text- font-normal">• {z.left} rimasti</span></p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CHECKOUT */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-[#111] border border-white/10 rounded- p-6">
            <p className="text- uppercase tracking-widest text-white/40">RIEPILOGO - ZONA {sel.zones[0]}</p>
            <h3 className="text-xl font-black mt-1">{sel.name} - {sel.type}</h3>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {sel.zones.map(zone=>(
                <button key={zone} onClick={()=>{setSelectedSeats([zone]);}} className={`px-3 py-1.5 rounded-full text-xs font-bold border ${selectedSeats.includes(zone)? "bg-[#95BFE5] text-black border-[#95BFE5]" : "bg-black text-white/60 border-white/10"}`}>Zona {zone}</button>
              ))}
            </div>

            <div className="mt-5 bg-black rounded-xl p-4 border border-white/10">
              <div className="flex justify-between text-xs text-white/60"><span>Biglietto {sel.name} Zona {selectedSeats[0]}</span><span>{sel.price}€</span></div>
              <div className="flex justify-between font-black text-base pt-3 mt-3 border-t border-white/10"><span>Totale</span><span>{sel.price}€</span></div>
            </div>

            <form onSubmit={(e)=>{e.preventDefault(); window.open(`https://wa.me/393000000000?text=Matchday%20${sel.name}%20Zona%20${selectedSeats[0]}%20${sel.price}€`)}} className="mt-5 space-y-3">
              <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm"><option>Sab 16 Ago vs Crotone 17:00</option></select>
              <input required placeholder="Nome e Cognome" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm" />
              <input required placeholder="WhatsApp" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm" />
              <button className="w-full bg-white text-black rounded-full py-4 font-black text-xs tracking-widest">PRENOTA ORA - {sel.price}€ →</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}v
