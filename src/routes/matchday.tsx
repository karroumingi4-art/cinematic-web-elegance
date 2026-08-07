import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";


export const Route = createFileRoute("/matchday")({
  component: MatchdayPage,
});


type TribuneType = "Rosso" | "Blu" | "Arancio" | "Verde";
type Sector = {
  id: string; name: string; tribune: TribuneType; anello: 1|2|3; label: string; price: number; available: number; accent: string; fill: string; x: number; y: number; w: number; h: number; rx?: number;
};


const sectors: Sector[] = [
  { id: "rosso-1", name: "Tribuna Rossa Nord", tribune: "Rosso", anello: 1, label: "Primo Anello - Centrale", price: 90, available: 184, accent: "#ef4444", fill: "#dc2626", x: 210, y: 158, w: 380, h: 28, rx: 6 },
  { id: "rosso-2", name: "Tribuna Rossa Nord", tribune: "Rosso", anello: 2, label: "Secondo Anello - Distinti", price: 60, available: 312, accent: "#f87171", fill: "#991b1b", x: 190, y: 118, w: 420, h: 30, rx: 8 },
  { id: "rosso-3", name: "Tribuna Rossa Nord", tribune: "Rosso", anello: 3, label: "Terzo Anello - Superiore", price: 40, available: 428, accent: "#fca5a5", fill: "#7f1d1d", x: 165, y: 72, w: 470, h: 36, rx: 12 },
  { id: "blu-1", name: "Tribuna Blu Sud", tribune: "Blu", anello: 1, label: "Primo Anello - Centrale", price: 30, available: 203, accent: "#3b82f6", fill: "#2563eb", x: 210, y: 414, w: 380, h: 28, rx: 6 },
  { id: "blu-2", name: "Tribuna Blu Sud", tribune: "Blu", anello: 2, label: "Secondo Anello - Distinti", price: 25, available: 298, accent: "#60a5fa", fill: "#1d4ed8", x: 190, y: 452, w: 420, h: 30, rx: 8 },
  { id: "blu-3", name: "Tribuna Blu Sud", tribune: "Blu", anello: 3, label: "Terzo Anello - Superiore", price: 18, available: 512, accent: "#93c5fd", fill: "#1e3a8a", x: 165, y: 492, w: 470, h: 36, rx: 12 },
  { id: "arancio-1", name: "Tribuna Arancio Est", tribune: "Arancio", anello: 1, label: "Primo Anello - Laterale", price: 50, available: 96, accent: "#fb923c", fill: "#ea580c", x: 532, y: 210, w: 28, h: 180, rx: 6 },
  { id: "arancio-2", name: "Tribuna Arancio Est", tribune: "Arancio", anello: 2, label: "Secondo Anello - Distinti Est", price: 35, available: 176, accent: "#fdba74", fill: "#c2410c", x: 570, y: 185, w: 30, h: 230, rx: 8 },
  { id: "arancio-3", name: "Tribuna Arancio Est", tribune: "Arancio", anello: 3, label: "Terzo Anello - Superiore Est", price: 25, available: 324, accent: "#fed7aa", fill: "#9a3412", x: 610, y: 155, w: 36, h: 290, rx: 12 },
  { id: "verde-1", name: "Tribuna Verde Ovest", tribune: "Verde", anello: 1, label: "Primo Anello - Tribuna d'Onore", price: 30, available: 72, accent: "#34d399", fill: "#059669", x: 240, y: 210, w: 28, h: 180, rx: 6 },
  { id: "verde-2", name: "Tribuna Verde Ovest", tribune: "Verde", anello: 2, label: "Secondo Anello - Centrale Ovest", price: 20, available: 145, accent: "#6ee7b7", fill: "#047857", x: 200, y: 185, w: 30, h: 230, rx: 8 },
  { id: "verde-3", name: "Tribuna Verde Ovest", tribune: "Verde", anello: 3, label: "Terzo Anello - Superiore Ovest", price: 18, available: 267, accent: "#a7f3d0", fill: "#065f46", x: 154, y: 155, w: 36, h: 290, rx: 12 },
];


function MatchdayPage() {
  const [selectedId, setSelectedId] = useState<string>("rosso-1");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const selected = sectors.find(s => s.id === selectedId) || sectors[0];


  const total = (selected.price * qty).toFixed(2);


  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name ||!email) return toast.error("Inserisci nome ed email");
    const formData = new FormData();
    formData.append("Settore", selected.name);
    formData.append("Anello", selected.label);
    formData.append("Prezzo", `${selected.price} €`);
    formData.append("Quantità", String(qty));
    formData.append("Totale", `${total} €`);
    formData.append("Nome", name);
    formData.append("Email", email);
    try {
      await fetch("https://formspree.io/f/xaewngbr", { method: "POST", body: formData, headers: { Accept: "application/json" } });
      toast.success(`Prenotato! ${selected.name} - Totale ${total}€`);
    } catch { toast.error("Errore invio"); }
  };


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 p-4 sm:p-8">
      <div className="max-w-[1280px] mx-auto">
        <h1 className="text-3xl font-black tracking-tight text-center">Gaston Villa Park <span className="text-[#95BFE5]">Map</span></h1>
        <p className="text-center text-zinc-500 text-sm mt-2">Mappa interattiva stile San Siro - tocca un settore per vedere il costo</p>


        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 mt-8">
          {/* MAPPA SVG */}
          <div className="bg-[#111] border border-white/[0.06] rounded-[20px] p-4">
            <svg viewBox="0 0 800 600" className="w-full h-auto">
              {/* campo */}
              <rect x={300} y={240} width={200} height={120} rx={6} fill="#052e1a" stroke="#14532d" strokeWidth={1.5} />
              <line x1={400} y1={240} x2={400} y2={360} stroke="#14532d" strokeWidth={1} strokeDasharray="6 6" />
              <circle cx={400} cy={300} r={30} fill="none" stroke="#14532d" strokeWidth={1} />
              <text x={400} y={304} textAnchor="middle" fontSize={10} fill="#22c55e" opacity={0.5} fontWeight={700}>CAMPO</text>


              {sectors.map(s => {
                const isSel = s.id === selectedId;
                const isHover = s.id === hoveredId;
                return (
                  <g key={s.id} onMouseEnter={() => setHoveredId(s.id)} onMouseLeave={() => setHoveredId(null)} onClick={() => setSelectedId(s.id)} className="cursor-pointer">
                    <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx} fill={s.fill} opacity={isSel? 1 : isHover? 0.85 : 0.6} stroke={isSel? "#fff" : s.accent} strokeWidth={isSel? 2.5 : 1.2} style={{ transition: "all 0.15s" }} />
                    {isSel && <rect x={s.x-2} y={s.y-2} width={s.w+4} height={s.h+4} rx={(s.rx||6)+2} fill="none" stroke="#fff" strokeWidth={1} opacity={0.5} />}
                  </g>
                );
              })}
            </svg>
            <div className="flex gap-2 mt-3 justify-center flex-wrap">
              <span className="text-[10px] px-2 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">Rosso Nord</span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">Blu Sud</span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">Arancio Est</span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Verde Ovest</span>
            </div>
          </div>


          {/* DETTAGLIO */}
          <div className="space-y-4">
            <div className="bg-[#111] border border-white/[0.06] rounded-[20px] p-5">
              <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full" style={{ background: selected.accent }} /><span className="text-[11px] uppercase tracking-widest text-zinc-500 font-semibold">{selected.tribune} • {selected.anello}° Anello</span></div>
              <h2 className="text-[18px] font-bold leading-tight">{selected.name}</h2>
              <p className="text-[12px] text-zinc-500 mt-1">{selected.label}</p>
              <div className="mt-4 p-4 rounded-[14px] bg-white/[0.04] border border-white/[0.06]">
                <div className="flex justify-between items-end"><span className="text-[11px] text-zinc-500 uppercase">Prezzo</span><span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">Disponibile</span></div>
                <div className="text-[32px] font-bold tracking-tight mt-1">{selected.price}€</div>
                <div className="text-[11px] text-zinc-500">{selected.available} posti liberi • Visibilità {selected.anello===1?"Eccellente":selected.anello===2?"Ottima":"Panoramica"}</div>
              </div>
              <form onSubmit={handleBuy} className="mt-4 space-y-3">
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome e Cognome" className="w-full bg-black border border-white/10 rounded-[12px] px-3 h-11 text-[13px] focus:border-white/20 outline-none" />
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="w-full bg-black border border-white/10 rounded-[12px] px-3 h-11 text-[13px] focus:border-white/20 outline-none" />
                <div className="flex gap-2">
                  <select value={qty} onChange={e=>setQty(parseInt(e.target.value))} className="flex-1 bg-black border border-white/10 rounded-[12px] h-11 px-3 text-[13px]">{[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n} biglietti</option>)}</select>
                  <div className="flex-1 bg-white text-black rounded-[12px] h-11 grid place-items-center font-bold text-[13px]">{total} €</div>
                </div>
                <button type="submit" className="w-full h-11 rounded-[12px] bg-white text-black font-semibold text-[13px] hover:bg-zinc-200 transition-colors">Conferma • {total}€</button>
              </form>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {sectors.filter(s=>s.tribune===selected.tribune).map(s=>(
                <button key={s.id} onClick={()=>setSelectedId(s.id)} className={`h-14 rounded-[12px] border text-left px-2.5 py-2 ${selectedId===s.id?"bg-white text-black border-white":"bg-[#181818] border-white/[0.06] text-zinc-300"}`}>
                  <div className="text-[10px] opacity-70">{s.anello}° ANELLO</div><div className="text-[13px] font-bold">{s.price}€</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
