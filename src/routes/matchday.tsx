import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";


export const Route = createFileRoute("/matchday")({
  component: MatchdayPage,
});


type ColorKey = "Rosso" | "Arancio" | "Blu" | "Verde";
type Sector = { id: string; name: string; price: string; priceNum: number; color: ColorKey };


const COLORS: ColorKey[] = ["Rosso", "Arancio", "Blu", "Verde"];


const SECTORS: Sector[] = [
  { id: "red-1", name: "1° Anello Rosso - Tribuna VIP", price: "90,00 €", priceNum: 90, color: "Rosso" },
  { id: "red-2", name: "2° Anello Rosso - Centrale", price: "60,00 €", priceNum: 60, color: "Rosso" },
  { id: "red-3", name: "3° Anello Rosso - Alta", price: "40,00 €", priceNum: 40, color: "Rosso" },
  { id: "ora-1", name: "1° Anello Arancio - Distinti", price: "50,00 €", priceNum: 50, color: "Arancio" },
  { id: "ora-2", name: "2° Anello Arancio - Laterale", price: "35,00 €", priceNum: 35, color: "Arancio" },
  { id: "ora-3", name: "3° Anello Arancio - Alta", price: "25,00 €", priceNum: 25, color: "Arancio" },
  { id: "blu-1", name: "1° Anello Blu - Curva Sud", price: "30,00 €", priceNum: 30, color: "Blu" },
  { id: "blu-2", name: "2° Anello Blu - Tifo", price: "25,00 €", priceNum: 25, color: "Blu" },
  { id: "blu-3", name: "3° Anello Blu - Popolare", price: "18,00 €", priceNum: 18, color: "Blu" },
  { id: "grn-1", name: "1° Anello Verde - Curva Nord", price: "30,00 €", priceNum: 30, color: "Verde" },
  { id: "grn-2", name: "2° Anello Verde - Ospiti", price: "20,00 €", priceNum: 20, color: "Verde" },
  { id: "grn-3", name: "3° Anello Verde - Alta", price: "18,00 €", priceNum: 18, color: "Verde" },
];


function MatchdayPage() {
  const [activeColor, setActiveColor] = useState<ColorKey>("Rosso");
  const [selected, setSelected] = useState<Sector | null>(null);
  const [qty, setQty] = useState(1);


  const filtered = SECTORS.filter(s => s.color === activeColor);
  const total = selected? (selected.priceNum * qty).toFixed(2) : "0.00";


  const handleBuy = () => {
    if (!selected) return toast.error("Tocca un settore sulla mappa!");
    toast.success(`Hai selezionato ${selected.name} - Totale ${total}€`);
  };


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black uppercase tracking-widest text-center">Gaston Villa Park <span className="text-[#95BFE5]">Mappa</span></h1>
        <p className="text-center text-zinc-500 text-sm mt-2">Tocca un settore per vedere il prezzo - Stile San Siro</p>


        <div className="flex gap-2 justify-center mt-6">
          {COLORS.map(c => (
            <button key={c} onClick={() => { setActiveColor(c); setSelected(null); }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase border transition-all ${activeColor===c? 'bg-white text-black border-white' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>{c}</button>
          ))}
        </div>


        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 mt-10">
          {/* MAPPA */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-[24px] p-6 sm:p-10 flex items-center justify-center">
            <div className="relative w-full max-w-[480px] aspect-square">
              {/* campo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36%] h-[26%] bg-emerald-900/40 border border-emerald-500/30 rounded-[6px] flex items-center justify-center">
                <div className="w-[2px] h-full bg-emerald-500/20 absolute" />
                <div className="w-10 h-10 border border-emerald-500/20 rounded-full absolute" />
                <span className="text-[7px] tracking-[0.2em] text-emerald-300/50 font-bold uppercase">CAMPO</span>
              </div>


              {/* Anelli - 3 livelli */}
              {[3,2,1].map((ring) => {
                const sector = filtered.find(s => s.id.includes(`-${ring}`)) || filtered[0];
                const size = ring === 3? "100%" : ring === 2? "78%" : "56%";
                const isSelected = selected?.id === sector?.id;
                return (
                  <button key={ring}
                    onClick={() => setSelected(sector)}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 rounded-[22px] transition-all duration-200 flex items-center justify-center group
                      ${activeColor==="Rosso"? "border-red-500/30 bg-red-600/10 hover:bg-red-600/20" : ""}
                      ${activeColor==="Arancio"? "border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20" : ""}
                      ${activeColor==="Blu"? "border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20" : ""}
                      ${activeColor==="Verde"? "border-emerald-500/30 bg-emerald-600/10 hover:bg-emerald-600/20" : ""}
                      ${isSelected? "!border-white!bg-white/10 ring-2 ring-white scale-[1.02] z-10" : ""}`}
                    style={{ width: size, height: size }}
                  >
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-black/60 border ${isSelected? 'border-white text-white' : 'border-zinc-700 text-zinc-300'} group-hover:scale-110 transition-transform`}>
                      {ring}° ANELLO - {sector?.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>


          {/* RIEPILOGO */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-[20px] p-6 h-fit lg:sticky lg:top-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4">Riepilogo Biglietto</h3>
            {selected? (
              <>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
                  <p className="font-bold">{selected.name}</p>
                  <p className="text-sm text-zinc-400 mt-1">Settore {selected.color} - Posto a sedere numerato</p>
                  <p className="text-2xl font-black mt-3">{selected.price}</p>
                </div>
                <div className="flex gap-3 mb-4">
                  <select value={qty} onChange={e=>setQty(parseInt(e.target.value))} className="flex-1 bg-black border border-zinc-800 rounded-lg px-3 py-3 text-sm">
                    {[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n} biglietti</option>)}
                  </select>
                  <div className="flex-1 bg-zinc-800 rounded-lg px-3 py-3 text-center"><span className="text-xs text-zinc-500">Totale</span><p className="font-bold">{total} €</p></div>
                </div>
                <button onClick={handleBuy} className="w-full bg-[#95BFE5] text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-colors">Compra Ora</button>
              </>
            ) : (
              <div className="py-12 text-center border border-dashed border-zinc-800 rounded-xl">
                <p className="text-sm text-zinc-500">👆 Tocca un anello sulla mappa a sinistra per vedere il costo</p>
              </div>
            )}
            <div className="mt-6 grid grid-cols-2 gap-2 text-[10px] text-zinc-500">
              <div>🔴 Rosso: Tribuna Centrale</div><div>🔵 Blu: Curva Sud</div>
              <div>🟠 Arancio: Distinti</div><div>🟢 Verde: Curva Nord</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
